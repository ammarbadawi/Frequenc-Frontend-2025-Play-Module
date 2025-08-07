import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../libs/shared/src/prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserBookings(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const bookings = await this.prisma.booking.findMany({
      where: { userId },
      include: {
        timeSlot: {
          include: {
            court: {
              include: {
                venue: true
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            profile: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    });

    const total = await this.prisma.booking.count({
      where: { userId }
    });

    return {
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async createBooking(userId: string, bookingData: any) {
    const { courtId, date, startTime, endTime, gameType, players } = bookingData;

    // Check availability
    const isAvailable = await this.checkAvailability(courtId, date, startTime, endTime);
    if (!isAvailable.available) {
      throw new BadRequestException('Selected time slot is not available');
    }

    // Create time slot if it doesn't exist
    let timeSlot = await this.prisma.timeSlot.findFirst({
      where: {
        courtId,
        date: new Date(date),
        startTime,
        endTime
      }
    });

    if (!timeSlot) {
      timeSlot = await this.prisma.timeSlot.create({
        data: {
          courtId,
          date: new Date(date),
          startTime,
          endTime
        }
      });
    }

    // Create booking
    const booking = await this.prisma.booking.create({
      data: {
        userId,
        timeSlotId: timeSlot.id,
        gameType,
        status: 'PENDING',
        totalPrice: bookingData.totalPrice || 0
      },
      include: {
        timeSlot: {
          include: {
            court: {
              include: {
                venue: true
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            profile: true
          }
        }
      }
    });

    // Add players if provided
    if (players && players.length > 0) {
      await this.prisma.gameParticipant.createMany({
        data: players.map((playerId: string) => ({
          gameId: booking.id,
          userId: playerId,
          role: 'PLAYER'
        }))
      });
    }

    return booking;
  }

  async updateBooking(bookingId: string, updateData: any) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const updatedBooking = await this.prisma.booking.update({
      where: { id: bookingId },
      data: updateData,
      include: {
        timeSlot: {
          include: {
            court: {
              include: {
                venue: true
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            profile: true
          }
        }
      }
    });

    return updatedBooking;
  }

  async cancelBooking(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.status === 'CANCELLED') {
      throw new BadRequestException('Booking is already cancelled');
    }

    const cancelledBooking = await this.prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CANCELLED' },
      include: {
        timeSlot: {
          include: {
            court: {
              include: {
                venue: true
              }
            }
          }
        }
      }
    });

    return cancelledBooking;
  }

  async getTimeSlots(courtId: string, date?: string) {
    const where: any = { courtId };
    
    if (date) {
      where.date = new Date(date);
    }

    const timeSlots = await this.prisma.timeSlot.findMany({
      where,
      include: {
        court: true,
        booking: {
          include: {
            user: {
              select: {
                id: true,
                profile: true
              }
            }
          }
        }
      },
      orderBy: {
        startTime: 'asc'
      }
    });

    return timeSlots.map(slot => ({
      id: slot.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      isAvailable: !slot.booking,
      court: slot.court
    }));
  }

  async checkAvailability(courtId: string, date: string, startTime: string, endTime: string) {
    const conflictingBooking = await this.prisma.booking.findFirst({
      where: {
        timeSlot: {
          courtId,
          date: new Date(date),
          OR: [
            {
              AND: [
                { startTime: { lte: startTime } },
                { endTime: { gt: startTime } }
              ]
            },
            {
              AND: [
                { startTime: { lt: endTime } },
                { endTime: { gte: endTime } }
              ]
            },
            {
              AND: [
                { startTime: { gte: startTime } },
                { endTime: { lte: endTime } }
              ]
            }
          ]
        }
      }
    });

    return {
      available: !conflictingBooking,
      conflictingBooking: conflictingBooking || null
    };
  }

  async confirmBooking(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const confirmedBooking = await this.prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CONFIRMED' },
      include: {
        timeSlot: {
          include: {
            court: {
              include: {
                venue: true
              }
            }
          }
        }
      }
    });

    return confirmedBooking;
  }
} 