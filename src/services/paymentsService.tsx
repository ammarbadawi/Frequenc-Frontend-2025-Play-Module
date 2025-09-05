// @ts-nocheck
import api from './api';

class PaymentsService {
  // Get user cart
  async getCart() {
    try {
      const response = await api.get('/payments/cart');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch cart');
    }
  }

  // Add item to cart
  async addToCart(itemData) {
    try {
      const response = await api.post('/payments/cart/add', itemData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add item to cart');
    }
  }

  // Update cart item
  async updateCartItem(itemId, updateData) {
    try {
      const response = await api.put(`/payments/cart/${itemId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update cart item');
    }
  }

  // Remove item from cart
  async removeFromCart(itemId) {
    try {
      const response = await api.delete(`/payments/cart/${itemId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to remove item from cart');
    }
  }

  // Apply coupon
  async applyCoupon(couponCode) {
    try {
      const response = await api.post('/payments/coupon/apply', { code: couponCode });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to apply coupon');
    }
  }

  // Process payment
  async processPayment(paymentData) {
    try {
      const response = await api.post('/payments/process', paymentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to process payment');
    }
  }

  // Get payment history
  async getPaymentHistory(page = 1, limit = 10) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });

      const response = await api.get(`/payments/history?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch payment history');
    }
  }

  // Request refund
  async requestRefund(paymentId, reason) {
    try {
      const response = await api.post(`/payments/${paymentId}/refund`, { reason });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to request refund');
    }
  }
}

export default new PaymentsService(); 