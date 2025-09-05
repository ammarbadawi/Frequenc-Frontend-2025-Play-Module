import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsSseController } from './notifications.sse.controller';
import { NotificationsSseService } from './notifications.sse.service';

@Module({
  controllers: [NotificationsController, NotificationsSseController],
  providers: [NotificationsSseService],
})
export class NotificationsModule {}
