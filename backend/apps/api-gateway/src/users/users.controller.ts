import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateUserDto, UpdateUserDto, UserProfileDto } from '@frequenc/shared';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: ClientProxy,
  ) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully', type: UserProfileDto })
  async getProfile(@Request() req) {
    return firstValueFrom(
      this.usersService.send('users.get-profile', { userId: req.user.id })
    );
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully', type: UserProfileDto })
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return firstValueFrom(
      this.usersService.send('users.update-profile', { 
        userId: req.user.id, 
        ...updateUserDto 
      })
    );
  }

  @Get('friends')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user friends' })
  @ApiResponse({ status: 200, description: 'Friends list retrieved successfully' })
  async getFriends(@Request() req) {
    return firstValueFrom(
      this.usersService.send('users.get-friends', { userId: req.user.id })
    );
  }

  @Post('friends/:friendId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add friend' })
  @ApiResponse({ status: 200, description: 'Friend added successfully' })
  async addFriend(@Request() req, @Param('friendId') friendId: string) {
    return firstValueFrom(
      this.usersService.send('users.add-friend', { 
        userId: req.user.id, 
        friendId 
      })
    );
  }

  @Delete('friends/:friendId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove friend' })
  @ApiResponse({ status: 200, description: 'Friend removed successfully' })
  async removeFriend(@Request() req, @Param('friendId') friendId: string) {
    return firstValueFrom(
      this.usersService.send('users.remove-friend', { 
        userId: req.user.id, 
        friendId 
      })
    );
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Search users' })
  @ApiResponse({ status: 200, description: 'Users found successfully' })
  async searchUsers(@Request() req, @Body() searchDto: { query: string }) {
    return firstValueFrom(
      this.usersService.send('users.search', { 
        userId: req.user.id, 
        ...searchDto 
      })
    );
  }

  @Get('favorites')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user favorites' })
  @ApiResponse({ status: 200, description: 'Favorites retrieved successfully' })
  async getFavorites(@Request() req) {
    return firstValueFrom(
      this.usersService.send('users.get-favorites', { userId: req.user.id })
    );
  }

  @Post('favorites/:venueId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add to favorites' })
  @ApiResponse({ status: 200, description: 'Added to favorites successfully' })
  async addToFavorites(@Request() req, @Param('venueId') venueId: string) {
    return firstValueFrom(
      this.usersService.send('users.add-favorite', { 
        userId: req.user.id, 
        venueId 
      })
    );
  }

  @Delete('favorites/:venueId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove from favorites' })
  @ApiResponse({ status: 200, description: 'Removed from favorites successfully' })
  async removeFromFavorites(@Request() req, @Param('venueId') venueId: string) {
    return firstValueFrom(
      this.usersService.send('users.remove-favorite', { 
        userId: req.user.id, 
        venueId 
      })
    );
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user stats' })
  @ApiResponse({ status: 200, description: 'User stats retrieved successfully' })
  async getUserStats(@Request() req) {
    return firstValueFrom(
      this.usersService.send('users.get-stats', { userId: req.user.id })
    );
  }

  @Get('achievements')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user achievements' })
  @ApiResponse({ status: 200, description: 'User achievements retrieved successfully' })
  async getUserAchievements(@Request() req) {
    return firstValueFrom(
      this.usersService.send('users.get-achievements', { userId: req.user.id })
    );
  }
} 