// @ts-nocheck
import api from './api';

class NotificationsService {
  // Get user notifications
  async getUserNotifications() {
    try {
      const response = await api.get('/notifications');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch notifications');
    }
  }

  // Mark notification as read
  async markAsRead(notificationId) {
    try {
      const response = await api.put(`/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark notification as read');
    }
  }

  // Mark all notifications as read
  async markAllAsRead() {
    try {
      const response = await api.put('/notifications/read-all');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark all notifications as read');
    }
  }

  // Delete notification
  async deleteNotification(notificationId) {
    try {
      const response = await api.delete(`/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete notification');
    }
  }

  // Get notification count
  async getNotificationCount() {
    try {
      const response = await api.get('/notifications/count');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch notification count');
    }
  }

  // Send email notification
  async sendEmail(emailData) {
    try {
      const response = await api.post('/notifications/send-email', emailData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send email');
    }
  }

  // Subscribe to SSE stream for realtime notifications
  subscribeStream(onMessage: (data: any) => void) {
    const token = localStorage.getItem('accessToken');
    const base = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const url = `${base}/notifications/stream`;
    const es = new EventSource(url, { withCredentials: true } as any);
    es.onmessage = (event) => {
      try { const data = JSON.parse(event.data); onMessage(data); } catch { onMessage(event.data); }
    };
    return () => es.close();
  }
}

export default new NotificationsService(); 