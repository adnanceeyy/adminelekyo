import ApiService from './api.service';

// Order Service - handles all order-related API calls
const OrderService = {
  // Get all orders
  getAllOrders: async () => {
    return await ApiService.get('orders');
  },

  // Get orders by user email
  getOrdersByEmail: async (email) => {
    return await ApiService.get(`orders/user/${email}`);
  },

  // Create new order
  createOrder: async (orderData) => {
    return await ApiService.post('orders', orderData);
  },

  // Update order status (you may need to add this route in backend)
  updateOrderStatus: async (orderId, status) => {
    return await ApiService.put(`orders/${orderId}`, { status });
  },
};

export default OrderService;
