import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateNotificationDto, NotificationDto } from '@frequenc/shared';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private readonly notificationsService: ClientProxy,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user notifications' })
  @ApiResponse({ status: 200, description: 'Notifications retrieved successfully', type: [NotificationDto] })
  async getUserNotifications(@Request() req, @Query() query: { page?: number; limit?: number; read?: boolean }) {
    return firstValueFrom(
      this.notificationsService.send('notifications.get-user-notifications', { userId: req.user.id, ...query })
    );
  }

  @Put(':id/read')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiResponse({ status: 200, description: 'Notification marked as read successfully' })
  async markAsRead(@Request() req, @Param('id') id: string) {
    return firstValueFrom(
      this.notificationsService.send('notifications.mark-as-read', { userId: req.user.id, notificationId: id })
    );
  }

  @Put('read-all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark all notifications as read' })
  @ApiResponse({ status: 200, description: 'All notifications marked as read successfully' })
  async markAllAsRead(@Request() req) {
    return firstValueFrom(
      this.notificationsService.send('notifications.mark-all-as-read', { userId: req.user.id })
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete notification' })
  @ApiResponse({ status: 200, description: 'Notification deleted successfully' })
  async deleteNotification(@Request() req, @Param('id') id: string) {
    return firstValueFrom(
      this.notificationsService.send('notifications.delete', { userId: req.user.id, notificationId: id })
    );
  }

  @Get('count')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get unread notification count' })
  @ApiResponse({ status: 200, description: 'Count retrieved successfully' })
  async getNotificationCount(@Request() req) {
    return firstValueFrom(
      this.notificationsService.send('notifications.get-count', { userId: req.user.id })
    );
  }

  @Post('send-email')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send email notification' })
  @ApiResponse({ status: 200, description: 'Email sent successfully' })
  async sendEmail(@Request() req, @Body() emailDto: { to: string; subject: string; content: string }) {
    return firstValueFrom(
      this.notificationsService.send('notifications.send-email', { userId: req.user.id, ...emailDto })
    );
  }

  @Post('send-push')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send push notification' })
  @ApiResponse({ status: 200, description: 'Push notification sent successfully' })
  async sendPushNotification(@Request() req, @Body() pushDto: { title: string; body: string; userId?: string }) {
    return firstValueFrom(
      this.notificationsService.send('notifications.send-push', { senderId: req.user.id, ...pushDto })
    );
  }
} 