import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@frequenc/shared';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAvailableGames(filters?: any) {
    const where: any = {
      status: 'OPEN',
    };

    if (filters?.sport) {
      where.sportType = filters.sport;
    }

    if (filters?.skillLevel) {
      where.skillLevel = filters.skillLevel;
    }

    const games = await this.prisma.game.findMany({
      where,
      include: {
        venue: true,
        court: true,
        participants: {
          include: {
            user: {
              select: {
                id: true,
                profile: true,
              },
            },
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return games;
  }

  async createGame(userId: string, gameData: any) {
    const {
      venueId,
      courtId,
      date,
      startTime,
      endTime,
      sportType,
      skillLevel,
      maxPlayers,
      gameType,
    } = gameData;

    const game = await this.prisma.game.create({
      data: {
        venueId,
        courtId,
        date: new Date(date),
        startTime,
        endTime,
        sportType,
        skillLevel,
        maxPlayers,
        gameType,
        status: 'OPEN',
        createdBy: userId,
      },
      include: {
        venue: true,
        court: true,
        participants: {
          include: {
            user: {
              select: {
                id: true,
                profile: true,
              },
            },
          },
        },
      },
    });

    // Add creator as first participant
    await this.prisma.gameParticipant.create({
      data: {
        gameId: game.id,
        userId: userId,
        role: 'ORGANIZER',
      },
    });

    return game;
  }

  async joinGame(gameId: string, userId: string) {
    const game = await this.prisma.game.findUnique({
      where: { id: gameId },
      include: {
        participants: true,
      },
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    if (game.status !== 'OPEN') {
      throw new BadRequestException('Game is not open for joining');
    }

    if (game.participants.length >= game.maxPlayers) {
      throw new BadRequestException('Game is full');
    }

    const existingParticipant = game.participants.find(
      (p) => p.userId === userId,
    );
    if (existingParticipant) {
      throw new BadRequestException('Already joined this game');
    }

    const participant = await this.prisma.gameParticipant.create({
      data: {
        gameId,
        userId,
        role: 'PLAYER',
      },
      include: {
        user: {
          select: {
            id: true,
            profile: true,
          },
        },
      },
    });
    // Keep counts and booking players in sync
    try {
      await this.prisma.game.update({
        where: { id: gameId },
        data: { currentPlayers: { increment: 1 } },
      });
      if ((game as any).bookingId) {
        const booking = await this.prisma.booking.findUnique({
          where: { id: (game as any).bookingId },
        });
        const arr = Array.isArray((booking as any).playerIds)
          ? (booking as any).playerIds
          : [];
        if (!arr.includes(userId)) {
          arr.push(userId);
          await this.prisma.booking.update({
            where: { id: (game as any).bookingId },
            data: { playerIds: arr },
          });
        }
      }
    } catch {}

    return participant;
  }

  async leaveGame(gameId: string, userId: string) {
    const participant = await this.prisma.gameParticipant.findFirst({
      where: {
        gameId,
        userId,
      },
    });

    if (!participant) {
      throw new NotFoundException('Not a participant in this game');
    }

    await this.prisma.gameParticipant.delete({
      where: { id: participant.id },
    });
    // Keep counts and booking players in sync
    try {
      await this.prisma.game.update({
        where: { id: gameId },
        data: { currentPlayers: { decrement: 1 } },
      });
      const game = await this.prisma.game.findUnique({ where: { id: gameId } });
      if ((game as any).bookingId) {
        const booking = await this.prisma.booking.findUnique({
          where: { id: (game as any).bookingId },
        });
        const arr = Array.isArray((booking as any).playerIds)
          ? (booking as any).playerIds
          : [];
        const updated = arr.filter((pid: string) => pid !== userId);
        if (updated.length !== arr.length) {
          await this.prisma.booking.update({
            where: { id: (game as any).bookingId },
            data: { playerIds: updated },
          });
        }
      }
    } catch {}

    return { success: true };
  }

  async getGameParticipants(gameId: string) {
    const participants = await this.prisma.gameParticipant.findMany({
      where: { gameId },
      include: {
        user: {
          select: {
            id: true,
            profile: true,
          },
        },
      },
    });

    return participants;
  }

  async updateGameStatus(gameId: string, status: string) {
    const game = await this.prisma.game.findUnique({
      where: { id: gameId },
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    const updatedGame = await this.prisma.game.update({
      where: { id: gameId },
      data: { status },
      include: {
        venue: true,
        court: true,
        participants: {
          include: {
            user: {
              select: {
                id: true,
                profile: true,
              },
            },
          },
        },
      },
    });

    return updatedGame;
  }

  async getGameDetails(gameId: string) {
    const game = await this.prisma.game.findUnique({
      where: { id: gameId },
      include: {
        venue: true,
        court: true,
        participants: {
          include: {
            user: {
              select: {
                id: true,
                profile: true,
              },
            },
          },
        },
      },
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return game;
  }

  async createGameFromBooking(
    userId: string,
    bookingId: string,
    isPublic: boolean = true,
    maxPlayers: number = 4,
  ) {
    // Ensure booking exists
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    // Create a game linked to the booking
    const game = await this.prisma.game.create({
      data: {
        bookingId,
        title: `Game for booking ${bookingId}`,
        description: null,
        maxPlayers,
        isPublic,
        status: 'UPCOMING',
      },
      include: { participants: true },
    });

    // Add host as organizer
    await this.prisma.gameParticipant.create({
      data: { gameId: game.id, userId, role: 'HOST' },
    });

    // Add invited booking players as participants
    try {
      const invitedIds = Array.isArray((booking as any).playerIds)
        ? (booking as any).playerIds.filter(
            (pid: string) => pid && pid !== userId,
          )
        : [];
      for (const pid of invitedIds) {
        try {
          await this.prisma.gameParticipant.create({
            data: { gameId: game.id, userId: pid, role: 'PLAYER' },
          });
        } catch {}
      }
    } catch {}

    return game;
  }

  async syncInvitesFromBooking(userId: string, bookingId: string) {
    const game = await this.prisma.game.findFirst({ where: { bookingId } });
    if (!game) {
      throw new NotFoundException('Game not found for booking');
    }
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    const invitedIds = Array.isArray((booking as any).playerIds)
      ? (booking as any).playerIds
      : [];
    for (const pid of invitedIds) {
      try {
        await this.prisma.gameParticipant.create({
          data: { gameId: game.id, userId: pid, role: 'PLAYER' },
        });
      } catch {}
    }
    return { success: true };
  }
}
