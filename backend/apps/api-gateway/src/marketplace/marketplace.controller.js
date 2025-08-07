import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@ApiTags('Marketplace')
@Controller('marketplace')
export class MarketplaceController {
  constructor(
    @Inject('MARKETPLACE_SERVICE') private readonly marketplaceService: ClientProxy,
  ) {}

  @Get('products')
  @ApiOperation({ summary: 'Get marketplace products' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async getProducts(): Promise<any> {
    return firstValueFrom(
      this.marketplaceService.send('marketplace.get-products', {}),
    );
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Get product details' })
  @ApiResponse({ status: 200, description: 'Product details retrieved successfully' })
  async getProduct(@Param('id') id: string): Promise<any> {
    return firstValueFrom(
      this.marketplaceService.send('marketplace.get-product', { productId: id }),
    );
  }

  @Post('orders')
  @ApiOperation({ summary: 'Create marketplace order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiBearerAuth()
  async createOrder(@Req() req: any, @Body() orderData: any): Promise<any> {
    return firstValueFrom(
      this.marketplaceService.send('marketplace.create-order', { 
        userId: req.user.id,
        ...orderData 
      }),
    );
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get user orders' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  @ApiBearerAuth()
  async getUserOrders(@Req() req: any): Promise<any> {
    return firstValueFrom(
      this.marketplaceService.send('marketplace.get-orders', { userId: req.user.id }),
    );
  }
} 