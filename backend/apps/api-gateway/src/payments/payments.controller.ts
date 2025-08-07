import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreatePaymentDto, PaymentDto, CartDto } from '@frequenc/shared';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject('PAYMENTS_SERVICE') private readonly paymentsService: ClientProxy,
  ) {}

  @Get('cart')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user cart' })
  @ApiResponse({ status: 200, description: 'Cart retrieved successfully', type: CartDto })
  async getCart(@Request() req) {
    return firstValueFrom(
      this.paymentsService.send('payments.get-cart', { userId: req.user.id })
    );
  }

  @Post('cart/add')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 200, description: 'Item added to cart successfully' })
  async addToCart(@Request() req, @Body() itemDto: { venueId: string; courtId: string; date: string; timeSlot: string }) {
    return firstValueFrom(
      this.paymentsService.send('payments.add-to-cart', { userId: req.user.id, ...itemDto })
    );
  }

  @Put('cart/:itemId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update cart item' })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully' })
  async updateCartItem(@Request() req, @Param('itemId') itemId: string, @Body() updateDto: { quantity?: number }) {
    return firstValueFrom(
      this.paymentsService.send('payments.update-cart-item', { userId: req.user.id, itemId, ...updateDto })
    );
  }

  @Delete('cart/:itemId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiResponse({ status: 200, description: 'Item removed from cart successfully' })
  async removeFromCart(@Request() req, @Param('itemId') itemId: string) {
    return firstValueFrom(
      this.paymentsService.send('payments.remove-from-cart', { userId: req.user.id, itemId })
    );
  }

  @Post('process')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Process payment' })
  @ApiResponse({ status: 200, description: 'Payment processed successfully', type: PaymentDto })
  async processPayment(@Request() req, @Body() paymentDto: CreatePaymentDto) {
    return firstValueFrom(
      this.paymentsService.send('payments.process', { userId: req.user.id, ...paymentDto })
    );
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get payment history' })
  @ApiResponse({ status: 200, description: 'Payment history retrieved successfully', type: [PaymentDto] })
  async getPaymentHistory(@Request() req, @Query() query: { page?: number; limit?: number }) {
    return firstValueFrom(
      this.paymentsService.send('payments.get-history', { userId: req.user.id, ...query })
    );
  }

  @Post('refund/:paymentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Request refund' })
  @ApiResponse({ status: 200, description: 'Refund requested successfully' })
  async requestRefund(@Request() req, @Param('paymentId') paymentId: string, @Body() refundDto: { reason: string }) {
    return firstValueFrom(
      this.paymentsService.send('payments.request-refund', { userId: req.user.id, paymentId, ...refundDto })
    );
  }

  @Post('coupon/apply')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Apply coupon' })
  @ApiResponse({ status: 200, description: 'Coupon applied successfully' })
  async applyCoupon(@Request() req, @Body() couponDto: { code: string }) {
    return firstValueFrom(
      this.paymentsService.send('payments.apply-coupon', { userId: req.user.id, ...couponDto })
    );
  }
} 