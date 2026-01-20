import ApiService from './api.service';

// Category Service - handles all category-related API calls
const CategoryService = {
  // Get all categories
  getAllCategories: async () => {
    return await ApiService.get('categories');
  },

  // Get single category by ID
  getCategoryById: async (id) => {
    return await ApiService.get(`categories/${id}`);
  },

  // Add new category (requires admin auth)
  addCategory: async (categoryData) => {
    return await ApiService.post('categories', categoryData);
  },

  // Update category (requires admin auth)
  updateCategory: async (id, categoryData) => {
    return await ApiService.put(`categories/${id}`, categoryData);
  },

  // Delete category (requires admin auth)
  deleteCategory: async (id) => {
    return await ApiService.delete(`categories/${id}`);
  },
};

export default CategoryService;
