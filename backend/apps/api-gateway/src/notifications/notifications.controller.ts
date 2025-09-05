import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateNotificationDto, NotificationDto } from '@frequenc/shared';
import { NotificationsSseService } from './notifications.sse.service';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE')
    private readonly notificationsService: ClientProxy,
    private readonly sse: NotificationsSseService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user notifications' })
  @ApiResponse({
    status: 200,
    description: 'Notifications retrieved successfully',
    type: [NotificationDto],
  })
  async getUserNotifications(
    @Request() req,
    @Query() query: { page?: number; limit?: number; read?: boolean },
  ) {
    return firstValueFrom(
      this.notificationsService.send('notifications.get-user-notifications', {
        userId: req.user.id,
        ...query,
      }),
    );
  }

  @Put(':id/read')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiResponse({
    status: 200,
    description: 'Notification marked as read successfully',
  })
  async markAsRead(@Request() req, @Param('id') id: string) {
    const res = await firstValueFrom(
      this.notificationsService.send('notifications.mark-read', {
        userId: req.user.id,
        notificationId: id,
      }),
    );
    this.sse.emit(req.user.id, { type: 'notifications:update' });
    return res;
  }

  @Put('read-all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark all notifications as read' })
  @ApiResponse({
    status: 200,
    description: 'All notifications marked as read successfully',
  })
  async markAllAsRead(@Request() req) {
    const res = await firstValueFrom(
      this.notificationsService.send('notifications.mark-all-as-read', {
        userId: req.user.id,
      }),
    );
    this.sse.emit(req.user.id, { type: 'notifications:update' });
    return res;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete notification' })
  @ApiResponse({
    status: 200,
    description: 'Notification deleted successfully',
  })
  async deleteNotification(@Request() req, @Param('id') id: string) {
    const res = await firstValueFrom(
      this.notificationsService.send('notifications.delete', {
        userId: req.user.id,
        notificationId: id,
      }),
    );
    this.sse.emit(req.user.id, { type: 'notifications:update' });
    return res;
  }

  @Get('count')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get unread notification count' })
  @ApiResponse({ status: 200, description: 'Count retrieved successfully' })
  async getNotificationCount(@Request() req) {
    return firstValueFrom(
      this.notificationsService.send('notifications.get-count', {
        userId: req.user.id,
      }),
    );
  }

  @Post('send-email')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send email notification' })
  @ApiResponse({ status: 200, description: 'Email sent successfully' })
  async sendEmail(
    @Request() req,
    @Body() emailDto: { to: string; subject: string; content: string },
  ) {
    const res = await firstValueFrom(
      this.notificationsService.send('notifications.send-email', {
        userId: req.user.id,
        ...emailDto,
      }),
    );
    // Notify sender their email has been sent
    this.sse.emit(req.user.id, { type: 'notifications:email-sent' });
    return res;
  }

  @Post('send-push')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send push notification' })
  @ApiResponse({
    status: 200,
    description: 'Push notification sent successfully',
  })
  async sendPushNotification(
    @Request() req,
    @Body() pushDto: { title: string; body: string; userId?: string },
  ) {
    const res = await firstValueFrom(
      this.notificationsService.send('notifications.send-push', {
        senderId: req.user.id,
        ...pushDto,
      }),
    );
    // If a target userId is provided, emit to target; otherwise to sender
    const target = (pushDto as any).userId || req.user.id;
    this.sse.emit(target, { type: 'notifications:push-sent' });
    return res;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create notification' })
  @ApiResponse({
    status: 201,
    description: 'Notification created successfully',
    type: NotificationDto,
  })
  async create(
    @Request() req,
    @Body()
    body: {
      userId: string;
      type: string;
      title: string;
      message: string;
      metadata?: any;
    },
  ) {
    const created = await firstValueFrom(
      this.notificationsService.send('notifications.create', {
        senderId: req.user.id,
        userId: body.userId,
        type: body.type,
        title: body.title,
        message: body.message,
        metadata: body.metadata || {},
      }),
    );
    // Emit to target user
    this.sse.emit(body.userId, {
      type: 'notifications:new',
      notification: created,
    });
    return created;
  }
}
