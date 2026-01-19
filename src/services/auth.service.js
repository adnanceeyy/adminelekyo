import axios from 'axios';
import API_CONFIG from '../config/api.config';

// Auth Service - handles admin authentication
const AuthService = {
  // Login admin user
  login: async (email, password) => {
    try {
      // Note: You'll need to add an admin login route in your backend
      // For now, using the regular user login
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}users/login`,
        { email, password }
      );

      if (response.data && response.data.token) {
        // Store token and user info
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Logout admin user
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },

  // Get current admin user
  getCurrentUser: () => {
    const user = localStorage.getItem('adminUser');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is logged in
  isAuthenticated: () => {
    return !!localStorage.getItem('adminToken');
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('adminToken');
  },
};

export default AuthService;
