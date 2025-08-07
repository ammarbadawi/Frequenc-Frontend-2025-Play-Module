import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern('notifications.get-user-notifications')
  async getUserNotifications(@Payload() data: { userId: string }) {
    return this.notificationsService.getUserNotifications(data.userId);
  }

  @MessagePattern('notifications.mark-read')
  async markAsRead(@Payload() data: { notificationId: string; userId: string }) {
    return this.notificationsService.markAsRead(data.notificationId, data.userId);
  }

  @MessagePattern('notifications.send-email')
  async sendEmail(@Payload() data: { to: string; subject: string; content: string }) {
    return this.notificationsService.sendEmail(data.to, data.subject, data.content);
  }

  @MessagePattern('notifications.send-push')
  async sendPushNotification(@Payload() data: { userId: string; title: string; body: string }) {
    return this.notificationsService.sendPushNotification(data.userId, data.title, data.body);
  }

  @MessagePattern('notifications.create')
  async createNotification(@Payload() data: { userId: string; type: string; title: string; message: string; metadata?: any }) {
    return this.notificationsService.createNotification(data.userId, data.type, data.title, data.message, data.metadata);
  }
} 