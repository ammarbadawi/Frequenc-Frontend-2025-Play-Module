import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@frequenc/shared';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getCart(userId: string) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: { userId },
      include: {
        venue: true,
        court: true,
      },
    });

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    return {
      items: cartItems,
      subtotal,
      tax,
      total,
    };
  }

  async addToCart(userId: string, itemData: any) {
    const {
      venueId,
      courtId,
      date,
      startTime,
      endTime,
      quantity = 1,
    } = itemData;

    // Calculate price based on duration
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    const pricePerHour = 50; // This should come from court/venue pricing
    const price = durationHours * pricePerHour;

    const cartItem = await this.prisma.cartItem.create({
      data: {
        userId,
        venueId,
        courtId,
        date: new Date(date),
        startTime,
        endTime,
        quantity,
        price,
      },
      include: {
        venue: true,
        court: true,
      },
    });

    return cartItem;
  }

  async updateCartItem(itemId: string, updateData: any) {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    const updatedItem = await this.prisma.cartItem.update({
      where: { id: itemId },
      data: updateData,
      include: {
        venue: true,
        court: true,
      },
    });

    return updatedItem;
  }

  async removeFromCart(itemId: string) {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.prisma.cartItem.delete({
      where: { id: itemId },
    });

    return { success: true };
  }

  async applyCoupon(userId: string, couponCode: string) {
    // This would integrate with a coupon system
    // For now, return a mock response
    const validCoupons = {
      WELCOME10: { discount: 0.1, type: 'PERCENTAGE' },
      SAVE20: { discount: 0.2, type: 'PERCENTAGE' },
      FLAT50: { discount: 50, type: 'FIXED' },
    };

    const coupon = validCoupons[couponCode];
    if (!coupon) {
      throw new BadRequestException('Invalid coupon code');
    }

    return {
      success: true,
      coupon: {
        code: couponCode,
        discount: coupon.discount,
        type: coupon.type,
      },
    };
  }

  async processPayment(userId: string, paymentData: any) {
    const { method, cardToken, billingAddress } = paymentData;

    // Get cart items
    const cart = await this.getCart(userId);

    // This would integrate with Stripe or other payment processor
    // For now, create a mock payment
    const payment = await this.prisma.payment.create({
      data: {
        userId,
        amount: cart.total,
        currency: 'USD',
        method,
        status: 'PENDING',
        metadata: {
          cardToken,
          billingAddress,
        },
      },
    });

    // Process payment (mock)
    const processedPayment = await this.prisma.payment.update({
      where: { id: payment.id },
      data: { status: 'COMPLETED' },
    });

    // Clear cart after successful payment
    await this.prisma.cartItem.deleteMany({
      where: { userId },
    });

    return {
      success: true,
      payment: processedPayment,
      transactionId: `txn_${Date.now()}`,
    };
  }

  async getPaymentHistory(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    const payments = await this.prisma.payment.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const total = await this.prisma.payment.count({
      where: { userId },
    });

    return {
      payments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async requestRefund(paymentId: string, reason: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (payment.status !== 'COMPLETED') {
      throw new BadRequestException('Payment cannot be refunded');
    }

    // This would integrate with payment processor for refund
    const refund = await this.prisma.payment.create({
      data: {
        userId: payment.userId,
        amount: -payment.amount, // Negative amount for refund
        currency: payment.currency,
        method: payment.method,
        status: 'PENDING',
        metadata: {
          originalPaymentId: paymentId,
          reason,
        },
      },
    });

    return {
      success: true,
      refund,
      refundId: `ref_${Date.now()}`,
    };
  }
}
