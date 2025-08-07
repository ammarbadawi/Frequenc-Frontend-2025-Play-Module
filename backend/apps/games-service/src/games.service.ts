import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../libs/shared/src/prisma/prisma.service';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAvailableGames(filters?: any) {
    const where: any = {
      status: 'OPEN'
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
                profile: true
              }
            }
          }
        },
        _count: {
          select: {
            participants: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return games;
  }

  async createGame(userId: string, gameData: any) {
    const { venueId, courtId, date, startTime, endTime, sportType, skillLevel, maxPlayers, gameType } = gameData;

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
        createdBy: userId
      },
      include: {
        venue: true,
        court: true,
        participants: {
          include: {
            user: {
              select: {
                id: true,
                profile: true
              }
            }
          }
        }
      }
    });

    // Add creator as first participant
    await this.prisma.gameParticipant.create({
      data: {
        gameId: game.id,
        userId: userId,
        role: 'ORGANIZER'
      }
    });

    return game;
  }

  async joinGame(gameId: string, userId: string) {
    const game = await this.prisma.game.findUnique({
      where: { id: gameId },
      include: {
        participants: true
      }
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

    const existingParticipant = game.participants.find(p => p.userId === userId);
    if (existingParticipant) {
      throw new BadRequestException('Already joined this game');
    }

    const participant = await this.prisma.gameParticipant.create({
      data: {
        gameId,
        userId,
        role: 'PLAYER'
      },
      include: {
        user: {
          select: {
            id: true,
            profile: true
          }
        }
      }
    });

    return participant;
  }

  async leaveGame(gameId: string, userId: string) {
    const participant = await this.prisma.gameParticipant.findFirst({
      where: {
        gameId,
        userId
      }
    });

    if (!participant) {
      throw new NotFoundException('Not a participant in this game');
    }

    await this.prisma.gameParticipant.delete({
      where: { id: participant.id }
    });

    return { success: true };
  }

  async getGameParticipants(gameId: string) {
    const participants = await this.prisma.gameParticipant.findMany({
      where: { gameId },
      include: {
        user: {
          select: {
            id: true,
            profile: true
          }
        }
      }
    });

    return participants;
  }

  async updateGameStatus(gameId: string, status: string) {
    const game = await this.prisma.game.findUnique({
      where: { id: gameId }
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
                profile: true
              }
            }
          }
        }
      }
    });

    return updatedGame;
  }
} 