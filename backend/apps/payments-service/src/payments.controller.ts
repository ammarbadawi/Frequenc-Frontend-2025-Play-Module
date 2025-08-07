import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('payments.get-cart')
  async getCart(@Payload() data: { userId: string }) {
    return this.paymentsService.getCart(data.userId);
  }

  @MessagePattern('payments.add-to-cart')
  async addToCart(@Payload() data: { userId: string; itemData: any }) {
    return this.paymentsService.addToCart(data.userId, data.itemData);
  }

  @MessagePattern('payments.update-cart-item')
  async updateCartItem(@Payload() data: { itemId: string; updateData: any }) {
    return this.paymentsService.updateCartItem(data.itemId, data.updateData);
  }

  @MessagePattern('payments.remove-from-cart')
  async removeFromCart(@Payload() data: { itemId: string }) {
    return this.paymentsService.removeFromCart(data.itemId);
  }

  @MessagePattern('payments.apply-coupon')
  async applyCoupon(@Payload() data: { userId: string; couponCode: string }) {
    return this.paymentsService.applyCoupon(data.userId, data.couponCode);
  }

  @MessagePattern('payments.process')
  async processPayment(@Payload() data: { userId: string; paymentData: any }) {
    return this.paymentsService.processPayment(data.userId, data.paymentData);
  }

  @MessagePattern('payments.get-history')
  async getPaymentHistory(@Payload() data: { userId: string; page?: number; limit?: number }) {
    return this.paymentsService.getPaymentHistory(data.userId, data.page, data.limit);
  }

  @MessagePattern('payments.request-refund')
  async requestRefund(@Payload() data: { paymentId: string; reason: string }) {
    return this.paymentsService.requestRefund(data.paymentId, data.reason);
  }
} 