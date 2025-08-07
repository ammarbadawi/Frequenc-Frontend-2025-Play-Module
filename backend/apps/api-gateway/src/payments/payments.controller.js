import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject('PAYMENTS_SERVICE') private readonly paymentsService: ClientProxy,
  ) {}

  @Get('cart')
  @ApiOperation({ summary: 'Get user cart' })
  @ApiResponse({ status: 200, description: 'Cart retrieved successfully' })
  @ApiBearerAuth()
  async getCart(@Req() req: any): Promise<any> {
    return firstValueFrom(
      this.paymentsService.send('payments.get-cart', { userId: req.user.id }),
    );
  }

  @Post('cart/items')
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 201, description: 'Item added to cart successfully' })
  @ApiBearerAuth()
  async addToCart(@Req() req: any, @Body() itemData: any): Promise<any> {
    return firstValueFrom(
      this.paymentsService.send('payments.add-to-cart', { 
        userId: req.user.id,
        ...itemData 
      }),
    );
  }

  @Post('process')
  @ApiOperation({ summary: 'Process payment' })
  @ApiResponse({ status: 200, description: 'Payment processed successfully' })
  @ApiBearerAuth()
  async processPayment(@Req() req: any, @Body() paymentData: any): Promise<any> {
    return firstValueFrom(
      this.paymentsService.send('payments.process', { 
        userId: req.user.id,
        ...paymentData 
      }),
    );
  }

  @Get('history')
  @ApiOperation({ summary: 'Get payment history' })
  @ApiResponse({ status: 200, description: 'Payment history retrieved successfully' })
  @ApiBearerAuth()
  async getPaymentHistory(@Req() req: any, @Body() query: any): Promise<any> {
    return firstValueFrom(
      this.paymentsService.send('payments.get-history', { 
        userId: req.user.id,
        ...query 
      }),
    );
  }
} 