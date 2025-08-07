import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../libs/shared/src/prisma/prisma.service';

@Injectable()
export class VenuesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllVenues(filters?: any, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (filters?.sport) {
      where.courts = {
        some: {
          sportType: filters.sport
        }
      };
    }
    
    if (filters?.location) {
      where.address = {
        contains: filters.location,
        mode: 'insensitive'
      };
    }

    const venues = await this.prisma.venue.findMany({
      where,
      include: {
        courts: true,
        reviews: {
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
            reviews: true
          }
        }
      },
      skip,
      take: limit,
    });

    const total = await this.prisma.venue.count({ where });

    return {
      venues,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getVenueById(id: string) {
    const venue = await this.prisma.venue.findUnique({
      where: { id },
      include: {
        courts: {
          include: {
            timeSlots: true
          }
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                profile: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      }
    });

    if (!venue) {
      throw new NotFoundException('Venue not found');
    }

    return venue;
  }

  async searchVenues(query: string, filters?: any) {
    const where: any = {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { address: { contains: query, mode: 'insensitive' } }
      ]
    };

    if (filters?.lat && filters?.lng) {
      // Add geospatial search logic here
      // This would require additional setup for PostGIS or similar
    }

    const venues = await this.prisma.venue.findMany({
      where,
      include: {
        courts: true,
        reviews: {
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
      take: 20
    });

    return venues;
  }

  async getAvailability(venueId: string, date: string, courtId?: string) {
    const where: any = {
      date: new Date(date),
      court: {
        venueId: venueId
      }
    };

    if (courtId) {
      where.courtId = courtId;
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

    return {
      date,
      venueId,
      timeSlots: timeSlots.map(slot => ({
        id: slot.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isAvailable: !slot.booking,
        court: slot.court,
        booking: slot.booking
      }))
    };
  }

  async getVenueCourts(venueId: string) {
    const courts = await this.prisma.court.findMany({
      where: { venueId },
      include: {
        timeSlots: {
          where: {
            date: new Date()
          }
        }
      }
    });

    return courts;
  }

  async getVenueReviews(venueId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const reviews = await this.prisma.review.findMany({
      where: { venueId },
      include: {
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

    const total = await this.prisma.review.count({
      where: { venueId }
    });

    return {
      reviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async addVenueReview(venueId: string, userId: string, reviewData: any) {
    const review = await this.prisma.review.create({
      data: {
        venueId,
        userId,
        rating: reviewData.rating,
        comment: reviewData.comment
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

    return review;
  }

  async uploadVenueImage(venueId: string, imageFile: any) {
    // This would integrate with AWS S3 or similar file storage
    // For now, return a mock response
    return {
      success: true,
      imageUrl: `https://example.com/venues/${venueId}/images/${Date.now()}.jpg`
    };
  }
} 