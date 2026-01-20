// API Configuration
const API_CONFIG = {
  // Change this to your deployed backend URL or keep localhost for development
  // Ensure BASE_URL ends with a slash for correct axios relative path merging
  BASE_URL: (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/?$/, '/'),
  
  // Helper to get full URL for images/assets
  getAssetUrl: (path) => {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('data:image')) return path;
    const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');
    return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  },
  
  // Timeout for API requests (in milliseconds)
  TIMEOUT: 30000,
  
  // Common headers for all requests
  HEADERS: {
    'Content-Type': 'application/json',
  }
};

export default API_CONFIG;
