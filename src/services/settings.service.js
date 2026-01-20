import api from './api.service';

const SettingsService = {
  getSettings: async () => {
    try {
      const response = await api.get('/settings');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch settings';
    }
  },

  updateSettings: async (settingsData) => {
    try {
      const response = await api.put('/settings', settingsData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update settings';
    }
  }
};

export default SettingsService;
