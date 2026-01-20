import api from './api.service';

const NotificationService = {
  getNotifications: async () => {
    try {
      const response = await api.get('/notifications');
      return response;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch notifications';
    }
  },

  markAsRead: async (id) => {
    try {
      const response = await api.patch(`/notifications/${id}/read`);
      return response;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to mark notification as read';
    }
  },

  clearAll: async () => {
    try {
      const response = await api.delete('/notifications/clear-all');
      return response;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to clear notifications';
    }
  }
};

export default NotificationService;
