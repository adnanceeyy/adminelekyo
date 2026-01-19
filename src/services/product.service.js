import ApiService from './api.service';

// Product Service - handles all product-related API calls
const ProductService = {
  // Get all products
  getAllProducts: async () => {
    return await ApiService.get('products');
  },

  // Get single product by ID
  getProductById: async (id) => {
    return await ApiService.get(`products/${id}`);
  },

  // Add new product (requires admin auth)
  addProduct: async (productData) => {
    return await ApiService.post('products', productData);
  },

  // Update product (requires admin auth)
  updateProduct: async (id, productData) => {
    return await ApiService.put(`products/${id}`, productData);
  },

  // Delete product (requires admin auth)
  deleteProduct: async (id) => {
    return await ApiService.delete(`products/${id}`);
  },

  // Bulk add products (requires admin auth)
  bulkAddProducts: async (productsArray) => {
    return await ApiService.post('products', productsArray);
  },
};

export default ProductService;
