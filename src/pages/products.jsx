import { useState, useEffect } from 'react';
import ProductService from '../services/product.service';
import API_CONFIG from '../config/api.config';
import { toast } from 'react-hot-toast';
import {
  IconPlus,
  IconSearch,
  IconFilter,
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconPackage,
  IconArrowUpRight,
  IconArrowDownRight
} from '@tabler/icons-react';

export default function Products({ isDark, onNavigate }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch products from backend on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductService.getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await ProductService.deleteProduct(productId);
      // Remove from UI
      setProducts(products.filter(p => p.id !== productId && p._id !== productId));
      toast.success('Product deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete product: ' + (err.message || 'Unknown error'));
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.id?.toString().includes(searchQuery) ||
    product.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper function to determine stock status
  const getStockStatus = (stock) => {
    if (stock === 0) return 'Out of Stock';
    if (stock < 20) return 'Low Stock';
    return 'In Stock';
  };


  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
      {/* Header Section */}
      <div className={`px-8 py-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"
        }`}>
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Inventory
          </h2>
          <p className={`text-sm mt-1 font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            Track levels and manage your {products.length} listed products.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('new-products')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20`}>
            <IconPlus size={18} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-6">


        {/* Filters & Actions Bar */}
        <div className={`mb-6 p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-100 shadow-sm"
          }`}>
          <div className="relative group w-full md:w-96">
            <IconSearch size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Filter by name, ID or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-11 pr-4 py-2 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/10 ${isDark ? "bg-gray-950/50 border-gray-800 text-gray-200 placeholder-gray-600 focus:bg-gray-950" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white"
                }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all border ${isDark ? "bg-gray-950 border-gray-800 text-gray-400 hover:text-white" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}>
              <IconFilter size={18} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Product Table Container */}
        <div className={`rounded-3xl border overflow-hidden ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"
          }`}>
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                <p className={`text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-600"}`}>Loading products...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-red-500 font-semibold mb-2">Failed to load products</p>
                <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-600"}`}>{error}</p>
                <button
                  onClick={fetchProducts}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-500"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <IconPackage size={48} className={`mx-auto mb-4 ${isDark ? "text-gray-700" : "text-gray-300"}`} />
                <p className={`text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {searchQuery ? 'No products found matching your search' : 'No products available'}
                </p>
              </div>
            </div>
          )}

          {/* Products Table */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className={`${isDark ? "bg-gray-950/40 text-gray-500" : "bg-gray-50/50 text-gray-400"} text-xs font-bold`}>
                    <th className="px-6 py-5">Product</th>
                    <th className="px-6 py-5">ID</th>
                    <th className="px-6 py-5">Stock</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-6 py-5">Price</th>
                    <th className="px-6 py-5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}>
                  {filteredProducts.map((product, i) => {
                    const stockStatus = getStockStatus(product.countInStock || 0);
                    const statusMap = {
                      'In Stock': { bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
                      'Low Stock': { bg: 'bg-amber-500/10', text: 'text-amber-500' },
                      'Out of Stock': { bg: 'bg-rose-500/10', text: 'text-rose-500' },
                    };

                    return (
                      <tr key={product._id || i} className={`group transition-all duration-300 ${isDark ? "hover:bg-gray-800/40" : "hover:bg-gray-50/70"}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden shadow-inner ${isDark ? "bg-gray-800/80" : "bg-gray-100"
                              }`}>
                              {product.image ? (
                                <img src={API_CONFIG.getAssetUrl(product.image)} alt={product.name} className="w-full h-full object-cover" />
                              ) : (
                                <IconPackage size={24} className="text-gray-500" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className={`text-sm font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>{product.name}</span>
                              <span className="text-[11px] font-bold text-blue-500 uppercase tracking-tighter">{product.category || 'Uncategorized'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-mono font-bold ${isDark ? "text-gray-500" : "text-gray-400"}`}>#{product.id || product._id?.substring(0, 8)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1.5 w-32">
                            <div className="flex items-center justify-between text-[10px] font-bold">
                              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                                {product.countInStock > 0 ? `${product.countInStock} Units` : 'Sold Out'}
                              </span>
                              <span className={isDark ? "text-gray-500" : "text-gray-400"}>
                                {Math.min(product.countInStock, 100)}%
                              </span>
                            </div>
                            <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${product.countInStock < 20 ? 'bg-rose-500' : product.countInStock < 50 ? 'bg-amber-500' : 'bg-emerald-500'
                                  }`}
                                style={{ width: `${Math.min(product.countInStock, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter shadow-sm ${statusMap[stockStatus]?.bg} ${statusMap[stockStatus]?.text}`}>
                            {stockStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>₹{product.price?.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => onNavigate('edit-products')}
                              className={`p-2 rounded-lg transition-all ${isDark ? "hover:bg-blue-500/10 text-gray-500 hover:text-blue-400" : "hover:bg-blue-50 text-gray-400 hover:text-blue-600"}`}>
                              <IconEdit size={18} stroke={2} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product._id || product.id)}
                              className={`p-2 rounded-lg transition-all ${isDark ? "hover:bg-rose-500/10 text-gray-500 hover:text-rose-400" : "hover:bg-rose-50 text-gray-400 hover:text-rose-600"}`}>
                              <IconTrash size={18} stroke={2} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
