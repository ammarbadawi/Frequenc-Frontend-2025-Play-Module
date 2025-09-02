// @ts-nocheck
import api from './api';

class MarketplaceService {
  // Get all products
  async getProducts(filters = {}) {
    try {
      const response = await api.get('/marketplace/products', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  }

  // Get product details
  async getProduct(productId) {
    try {
      const response = await api.get(`/marketplace/products/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch product details');
    }
  }

  // Search products
  async searchProducts(query, filters = {}) {
    try {
      const response = await api.get('/marketplace/products/search', { 
        params: { query, ...filters } 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search products');
    }
  }

  // Create order
  async createOrder(orderData) {
    try {
      const response = await api.post('/marketplace/orders', orderData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create order');
    }
  }

  // Get user orders
  async getUserOrders() {
    try {
      const response = await api.get('/marketplace/orders');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
  }

  // Get order details
  async getOrderDetails(orderId) {
    try {
      const response = await api.get(`/marketplace/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch order details');
    }
  }

  // Cancel order
  async cancelOrder(orderId) {
    try {
      const response = await api.put(`/marketplace/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to cancel order');
    }
  }

  // Get product categories
  async getCategories() {
    try {
      const response = await api.get('/marketplace/categories');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
}

export default new MarketplaceService(); 