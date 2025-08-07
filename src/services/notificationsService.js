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
      const response = await api.put('/notifications/mark-all-read');
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
}

export default new NotificationsService(); 