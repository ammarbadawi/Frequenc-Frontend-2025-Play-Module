import { Controller, Get, Post, Put, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private readonly notificationsService: ClientProxy,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get user notifications' })
  @ApiResponse({ status: 200, description: 'Notifications retrieved successfully' })
  @ApiBearerAuth()
  async getUserNotifications(@Req() req: any): Promise<any> {
    return firstValueFrom(
      this.notificationsService.send('notifications.get-user-notifications', { 
        userId: req.user.id 
      }),
    );
  }

  @Put(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiResponse({ status: 200, description: 'Notification marked as read' })
  @ApiBearerAuth()
  async markAsRead(@Param('id') id: string, @Req() req: any): Promise<any> {
    return firstValueFrom(
      this.notificationsService.send('notifications.mark-read', { 
        notificationId: id,
        userId: req.user.id 
      }),
    );
  }

  @Post('send-email')
  @ApiOperation({ summary: 'Send email notification' })
  @ApiResponse({ status: 200, description: 'Email sent successfully' })
  @ApiBearerAuth()
  async sendEmail(@Body() emailData: any): Promise<any> {
    return firstValueFrom(
      this.notificationsService.send('notifications.send-email', emailData),
    );
  }
} 