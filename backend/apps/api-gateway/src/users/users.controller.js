import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: ClientProxy,
  ) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  @ApiBearerAuth()
  async getProfile(@Req() req: any): Promise<any> {
    return firstValueFrom(
      this.usersService.send('users.get-profile', { userId: req.user.id }),
    );
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'User profile updated successfully' })
  @ApiBearerAuth()
  async updateProfile(@Req() req: any, @Body() updateData: any): Promise<any> {
    return firstValueFrom(
      this.usersService.send('users.update-profile', { 
        userId: req.user.id, 
        ...updateData 
      }),
    );
  }

  @Get('friends')
  @ApiOperation({ summary: 'Get user friends' })
  @ApiResponse({ status: 200, description: 'Friends list retrieved successfully' })
  @ApiBearerAuth()
  async getFriends(@Req() req: any): Promise<any> {
    return firstValueFrom(
      this.usersService.send('users.get-friends', { userId: req.user.id }),
    );
  }

  @Get('search')
  @ApiOperation({ summary: 'Search users' })
  @ApiResponse({ status: 200, description: 'Users search results' })
  @ApiBearerAuth()
  async searchUsers(@Req() req: any, @Body() searchData: any): Promise<any> {
    return firstValueFrom(
      this.usersService.send('users.search', { 
        userId: req.user.id,
        ...searchData 
      }),
    );
  }
} 