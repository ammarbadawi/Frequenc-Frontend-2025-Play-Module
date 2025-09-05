import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../libs/shared/src/prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserNotifications(userId: string) {
    const notifications = await this.prisma.notification.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    });

    return notifications;
  }

  async markAsRead(notificationId: string, userId: string) {
    const notification = await this.prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId
      }
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    const updatedNotification = await this.prisma.notification.update({
      where: { id: notificationId },
      data: { read: true }
    });

    return updatedNotification;
  }

  async markAllAsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true }
    });
    return { success: true };
  }

  async deleteNotification(userId: string, notificationId: string) {
    const existing = await this.prisma.notification.findFirst({ where: { id: notificationId, userId } });
    if (!existing) {
      throw new NotFoundException('Notification not found');
    }
    await this.prisma.notification.delete({ where: { id: notificationId } });
    return { success: true };
  }

  async getUnreadCount(userId: string) {
    const count = await this.prisma.notification.count({ where: { userId, read: false } });
    return { count };
  }

  async sendEmail(to: string, subject: string, content: string) {
    // This would integrate with a service like SendGrid, AWS SES, or Nodemailer
    // For now, return a mock response
    console.log(`Sending email to ${to}: ${subject}`);
    
    return {
      success: true,
      messageId: `email_${Date.now()}`,
      to,
      subject
    };
  }

  async sendPushNotification(userId: string, title: string, body: string) {
    // This would integrate with Firebase Cloud Messaging or similar
    // For now, return a mock response
    console.log(`Sending push notification to user ${userId}: ${title}`);
    
    return {
      success: true,
      messageId: `push_${Date.now()}`,
      userId,
      title
    };
  }

  async createNotification(userId: string, type: string, title: string, message: string, metadata?: any) {
    const notification = await this.prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        metadata: metadata || {},
        read: false
      }
    });

    return notification;
  }

  async sendBookingConfirmation(userId: string, bookingData: any) {
    const notification = await this.createNotification(
      userId,
      'BOOKING_CONFIRMED',
      'Booking Confirmed',
      `Your booking for ${bookingData.venueName} on ${bookingData.date} has been confirmed.`,
      { bookingId: bookingData.id }
    );

    // Send email notification
    await this.sendEmail(
      bookingData.userEmail,
      'Booking Confirmed',
      `Your booking has been confirmed. Venue: ${bookingData.venueName}, Date: ${bookingData.date}, Time: ${bookingData.startTime} - ${bookingData.endTime}`
    );

    return notification;
  }

  async sendGameInvitation(userId: string, gameData: any) {
    const notification = await this.createNotification(
      userId,
      'GAME_INVITATION',
      'Game Invitation',
      `You've been invited to join a ${gameData.sportType} game at ${gameData.venueName}.`,
      { gameId: gameData.id }
    );

    return notification;
  }

  async sendPaymentReminder(userId: string, paymentData: any) {
    const notification = await this.createNotification(
      userId,
      'PAYMENT_REMINDER',
      'Payment Reminder',
      `Please complete your payment of $${paymentData.amount} for your upcoming booking.`,
      { paymentId: paymentData.id }
    );

    return notification;
  }
} 