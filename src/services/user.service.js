import ApiService from './api.service';

// User Service - handles all user-related API calls
const UserService = {
  // Get all users (you'll need to add this route in backend)
  getAllUsers: async () => {
    return await ApiService.get('users');
  },

  // Get single user by ID
  getUserById: async (id) => {
    return await ApiService.get(`users/${id}`);
  },

  // Update user profile
  updateUserProfile: async (id, userData) => {
    return await ApiService.put(`users/profile/${id}`, userData);
  },

  // Delete user (requires admin auth - you'll need to add this route)
  deleteUser: async (id) => {
    return await ApiService.delete(`users/${id}`);
  },

  // Register new user
  registerUser: async (userData) => {
    return await ApiService.post('users', userData);
  },

  // Login history for a user (if you want to track this)
  getUserLoginHistory: async (id) => {
    return await ApiService.get(`users/${id}/login-history`);
  },
};

export default UserService;
