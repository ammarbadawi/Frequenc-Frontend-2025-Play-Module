import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@frequenc/shared';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        stats: true,
        achievements: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(userId: string, updateData: any) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        profile: {
          upsert: {
            create: updateData,
            update: updateData,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return user;
  }

  async getFriends(userId: string) {
    const friendships = await this.prisma.friendship.findMany({
      where: {
        OR: [
          { userId: userId, status: 'ACCEPTED' },
          { friendId: userId, status: 'ACCEPTED' },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
        friend: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
      },
    });

    return friendships.map((friendship) => {
      const friend =
        friendship.userId === userId ? friendship.friend : friendship.user;
      return {
        id: friend.id,
        email: friend.email,
        profile: friend.profile,
        friendshipId: friendship.id,
      };
    });
  }

  async searchUsers(userId: string, query: string, filters?: any) {
    const users = await this.prisma.user.findMany({
      where: {
        AND: [
          {
            OR: [
              { email: { contains: query, mode: 'insensitive' } },
              {
                profile: {
                  firstName: { contains: query, mode: 'insensitive' },
                },
              },
              {
                profile: { lastName: { contains: query, mode: 'insensitive' } },
              },
            ],
          },
          { id: { not: userId } },
        ],
      },
      include: {
        profile: true,
      },
      take: 20,
    });

    return users;
  }

  async addFriend(userId: string, friendId: string) {
    const existingFriendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { userId: userId, friendId: friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    });

    if (existingFriendship) {
      throw new Error('Friendship already exists');
    }

    const friendship = await this.prisma.friendship.create({
      data: {
        userId: userId,
        friendId: friendId,
        status: 'PENDING',
      },
    });

    return friendship;
  }

  async removeFriend(userId: string, friendId: string) {
    const friendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { userId: userId, friendId: friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    });

    if (!friendship) {
      throw new NotFoundException('Friendship not found');
    }

    await this.prisma.friendship.delete({
      where: { id: friendship.id },
    });

    return { success: true };
  }

  async getFavorites(userId: string) {
    const favorites = await this.prisma.favorite.findMany({
      where: { userId: userId },
      include: {
        venue: {
          include: {
            courts: true,
            reviews: true,
          },
        },
      },
    });

    return favorites.map((favorite) => favorite.venue);
  }

  async addFavorite(userId: string, venueId: string) {
    const existingFavorite = await this.prisma.favorite.findFirst({
      where: {
        userId: userId,
        venueId: venueId,
      },
    });

    if (existingFavorite) {
      throw new Error('Venue already in favorites');
    }

    const favorite = await this.prisma.favorite.create({
      data: {
        userId: userId,
        venueId: venueId,
      },
    });

    return favorite;
  }

  async removeFavorite(userId: string, venueId: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: {
        userId: userId,
        venueId: venueId,
      },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    await this.prisma.favorite.delete({
      where: { id: favorite.id },
    });

    return { success: true };
  }

  async getUserStats(userId: string) {
    const stats = await this.prisma.userStats.findUnique({
      where: { userId },
    });

    // Provide sane defaults if missing
    return (
      stats || {
        userId,
        gamesPlayed: 0,
        gamesWon: 0,
        totalHours: 0,
        averageRating: 0,
      }
    );
  }

  async getUserAchievements(userId: string) {
    const achievements = await this.prisma.userAchievement.findMany({
      where: { userId },
      orderBy: { unlockedAt: 'desc' },
    });
    return achievements;
  }
}
