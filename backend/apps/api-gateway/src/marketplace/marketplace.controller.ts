import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateProductDto, ProductDto, CreateOrderDto, OrderDto } from '@frequenc/shared';

@ApiTags('Marketplace')
@Controller('marketplace')
export class MarketplaceController {
  constructor(
    @Inject('MARKETPLACE_SERVICE') private readonly marketplaceService: ClientProxy,
  ) {}

  @Get('products')
  @ApiOperation({ summary: 'Get marketplace products' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully', type: [ProductDto] })
  async getProducts(@Query() query: { page?: number; limit?: number; category?: string; search?: string }) {
    return firstValueFrom(
      this.marketplaceService.send('marketplace.get-products', query)
    );
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully', type: ProductDto })
  async getProduct(@Param('id') id: string) {
    return firstValueFrom(
      this.marketplaceService.send('marketplace.get-product', { id })
    );
  }

  @Get('products/search')
  @ApiOperation({ summary: 'Search products' })
  @ApiResponse({ status: 200, description: 'Products found successfully', type: [ProductDto] })
  async searchProducts(@Query() searchDto: { query: string; category?: string; minPrice?: number; maxPrice?: number }) {
    return firstValueFrom(
      this.marketplaceService.send('marketplace.search-products', searchDto)
    );
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get product categories' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  async getCategories() {
    return firstValueFrom(
      this.marketplaceService.send('marketplace.get-categories', {})
    );
  }

  @Post('orders')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({ status: 201, description: 'Order created successfully', type: OrderDto })
  async createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return firstValueFrom(
      this.marketplaceService.send('marketplace.create-order', { userId: req.user.id, ...createOrderDto })
    );
  }

  @Get('orders')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user orders' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully', type: [OrderDto] })
  async getUserOrders(@Request() req, @Query() query: { page?: number; limit?: number; status?: string }) {
    return firstValueFrom(
      this.marketplaceService.send('marketplace.get-user-orders', { userId: req.user.id, ...query })
    );
  }

  @Get('orders/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get order details' })
  @ApiResponse({ status: 200, description: 'Order details retrieved successfully', type: OrderDto })
  async getOrderDetails(@Request() req, @Param('id') id: string) {
    return firstValueFrom(
      this.marketplaceService.send('marketplace.get-order-details', { userId: req.user.id, orderId: id })
    );
  }

  @Put('orders/:id/cancel')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel order' })
  @ApiResponse({ status: 200, description: 'Order cancelled successfully' })
  async cancelOrder(@Request() req, @Param('id') id: string) {
    return firstValueFrom(
      this.marketplaceService.send('marketplace.cancel-order', { userId: req.user.id, orderId: id })
    );
  }

  @Post('products')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 201, description: 'Product created successfully', type: ProductDto })
  async createProduct(@Request() req, @Body() createProductDto: CreateProductDto) {
    return firstValueFrom(
      this.marketplaceService.send('marketplace.create-product', { userId: req.user.id, ...createProductDto })
    );
  }

  @Put('products/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully', type: ProductDto })
  async updateProduct(@Request() req, @Param('id') id: string, @Body() updateProductDto: Partial<CreateProductDto>) {
    return firstValueFrom(
      this.marketplaceService.send('marketplace.update-product', { userId: req.user.id, productId: id, ...updateProductDto })
    );
  }

  @Delete('products/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  async deleteProduct(@Request() req, @Param('id') id: string) {
    return firstValueFrom(
      this.marketplaceService.send('marketplace.delete-product', { userId: req.user.id, productId: id })
    );
  }
} 