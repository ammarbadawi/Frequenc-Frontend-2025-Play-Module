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

  @MessagePattern('marketplace.get-categories')
  async getCategories() {
    return this.marketplaceService.getCategories();
  }

  @MessagePattern('marketplace.get-user-orders')
  async getUserOrdersAlt(@Payload() data: { userId: string; page?: number; limit?: number; status?: string }) {
    return this.marketplaceService.getUserOrders(data.userId);
  }

  @MessagePattern('marketplace.get-order-details')
  async getOrderDetails(@Payload() data: { userId: string; orderId: string }) {
    return this.marketplaceService.getOrderDetails(data.userId, data.orderId);
  }

  @MessagePattern('marketplace.cancel-order')
  async cancelOrder(@Payload() data: { userId: string; orderId: string }) {
    return this.marketplaceService.cancelOrder(data.userId, data.orderId);
  }

  @MessagePattern('marketplace.create-product')
  async createProduct(@Payload() data: { userId: string; productData: any }) {
    return this.marketplaceService.createProduct(data.userId, data.productData);
  }

  @MessagePattern('marketplace.update-product')
  async updateProduct(@Payload() data: { userId: string; productId: string; [key: string]: any }) {
    const { userId, productId, ...update } = data;
    return this.marketplaceService.updateProduct(userId, productId, update);
  }

  @MessagePattern('marketplace.delete-product')
  async deleteProduct(@Payload() data: { userId: string; productId: string }) {
    return this.marketplaceService.deleteProduct(data.userId, data.productId);
  }
} 