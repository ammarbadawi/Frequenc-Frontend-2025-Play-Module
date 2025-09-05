import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.get-profile')
  async getProfile(@Payload() data: { userId: string }) {
    return this.usersService.getProfile(data.userId);
  }

  @MessagePattern('users.update-profile')
  async updateProfile(@Payload() data: { userId: string; [key: string]: any }) {
    const { userId, ...updateData } = data;
    return this.usersService.updateProfile(userId, updateData);
  }

  @MessagePattern('users.get-friends')
  async getFriends(@Payload() data: { userId: string }) {
    return this.usersService.getFriends(data.userId);
  }

  @MessagePattern('users.search')
  async searchUsers(@Payload() data: { userId: string; query: string; filters?: any }) {
    return this.usersService.searchUsers(data.userId, data.query, data.filters);
  }

  @MessagePattern('users.add-friend')
  async addFriend(@Payload() data: { userId: string; friendId: string }) {
    return this.usersService.addFriend(data.userId, data.friendId);
  }

  @MessagePattern('users.remove-friend')
  async removeFriend(@Payload() data: { userId: string; friendId: string }) {
    return this.usersService.removeFriend(data.userId, data.friendId);
  }

  @MessagePattern('users.get-favorites')
  async getFavorites(@Payload() data: { userId: string }) {
    return this.usersService.getFavorites(data.userId);
  }

  @MessagePattern('users.add-favorite')
  async addFavorite(@Payload() data: { userId: string; venueId: string }) {
    return this.usersService.addFavorite(data.userId, data.venueId);
  }

  @MessagePattern('users.remove-favorite')
  async removeFavorite(@Payload() data: { userId: string; venueId: string }) {
    return this.usersService.removeFavorite(data.userId, data.venueId);
  }

  @MessagePattern('users.get-stats')
  async getStats(@Payload() data: { userId: string }) {
    return this.usersService.getUserStats(data.userId);
  }

  @MessagePattern('users.get-achievements')
  async getAchievements(@Payload() data: { userId: string }) {
    return this.usersService.getUserAchievements(data.userId);
  }
} 