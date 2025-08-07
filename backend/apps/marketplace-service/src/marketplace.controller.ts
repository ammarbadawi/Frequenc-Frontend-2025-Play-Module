import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MarketplaceService } from './marketplace.service';

@Controller()
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @MessagePattern('marketplace.get-products')
  async getProducts(@Payload() data: { filters?: any }) {
    return this.marketplaceService.getProducts(data.filters);
  }

  @MessagePattern('marketplace.get-product')
  async getProduct(@Payload() data: { productId: string }) {
    return this.marketplaceService.getProduct(data.productId);
  }

  @MessagePattern('marketplace.create-order')
  async createOrder(@Payload() data: { userId: string; orderData: any }) {
    return this.marketplaceService.createOrder(data.userId, data.orderData);
  }

  @MessagePattern('marketplace.get-orders')
  async getUserOrders(@Payload() data: { userId: string }) {
    return this.marketplaceService.getUserOrders(data.userId);
  }

  @MessagePattern('marketplace.search-products')
  async searchProducts(@Payload() data: { query: string; filters?: any }) {
    return this.marketplaceService.searchProducts(data.query, data.filters);
  }
} 