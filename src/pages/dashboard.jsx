import {
  IconTrendingUp,
  IconShoppingCart,
  IconUsers,
  IconClock,
  IconArrowUpRight,
  IconArrowDownRight,
  IconPackage,
  IconCurrencyRupee,
  IconStar,
  IconAlertCircle,
  IconCheck,
  IconTruck,
  IconChartBar,
  IconBoxSeam,
  IconCreditCard
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import ProductService from '../services/product.service';
import UserService from '../services/user.service';
import OrderService from '../services/order.service';

function StatCard({ title, value, change, isPositive, icon: Icon, color, isDark, subtitle }) {
  const colors = {
    blue: "text-blue-500 bg-blue-500/10",
    emerald: "text-emerald-500 bg-emerald-500/10",
    purple: "text-purple-500 bg-purple-500/10",
    orange: "text-orange-500 bg-orange-500/10",
    rose: "text-rose-500 bg-rose-500/10",
    indigo: "text-indigo-500 bg-indigo-500/10"
  };

  return (
    <div
      className={`relative overflow-hidden border rounded-[28px] p-5 transition-all duration-300 group hover:shadow-lg ${isDark
        ? "bg-gray-900 border-gray-800 shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
        : "bg-white border-gray-100 shadow-sm"
        }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl transition-transform group-hover:scale-105 duration-300 ${colors[color]}`}>
          <Icon size={20} stroke={2.5} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
            }`}>
            {isPositive ? <IconArrowUpRight size={12} /> : <IconArrowDownRight size={12} />}
            {change}
          </div>
        )}
      </div>
      <div>
        <h3 className={`text-[9px] font-black uppercase tracking-[0.15em] ${isDark ? "text-gray-500" : "text-gray-400"}`}>{title}</h3>
        <p className={`text-xl font-black mt-1 tracking-tighter ${isDark ? "text-white" : "text-gray-900"}`}>{value}</p>
        {subtitle && (
          <p className={`text-[10px] font-medium mt-1 ${isDark ? "text-gray-600" : "text-gray-500"}`}>{subtitle}</p>
        )}
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-4 rounded-[20px] shadow-xl border animate-slideUp ${isDark ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-white text-gray-900'}`}>
        <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1.5">{label}</p>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
          <div>
            <p className="text-[9px] font-black text-blue-500 uppercase">Revenue</p>
            <p className="text-base font-black">₹{payload[0].value.toLocaleString()}</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function Dashboard({ isDark, onNavigate }) {
  const [stats, setStats] = useState([
    { title: "Revenue", value: "₹0", change: "+0%", isPositive: true, icon: IconTrendingUp, color: "blue" },
    { title: "Total Orders", value: "0", change: "+0%", isPositive: true, icon: IconShoppingCart, color: "emerald" },
    { title: "Active Users", value: "0", change: "+0%", isPositive: true, icon: IconUsers, color: "purple" },
    { title: "Pending Orders", value: "0", change: "0%", isPositive: false, icon: IconClock, color: "orange" },
  ]);
  const [additionalStats, setAdditionalStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      console.log('📊 Fetching dashboard data...');

      const [orders, users, products] = await Promise.all([
        OrderService.getAllOrders().catch(() => []),
        UserService.getAllUsers().catch(() => []),
        ProductService.getAllProducts().catch(() => [])
      ]);

      console.log('✅ Dashboard data received:', { orders: orders.length, users: users.length, products: products.length });

      // Calculate stats
      const totalRevenue = orders.reduce((sum, order) => sum + (order.paymentSummary?.total || 0), 0);
      const pendingOrders = orders.filter(o => ['Pending', 'Processing', 'pending', 'processing'].includes(o.status)).length;
      const completedOrders = orders.filter(o => ['Completed', 'completed', 'Delivered', 'delivered'].includes(o.status)).length;
      const totalProducts = products.length;
      const lowStockProducts = products.filter(p => p.countInStock < 20).length;
      const outOfStockProducts = products.filter(p => p.countInStock === 0).length;

      // Calculate average order value
      const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

      setStats([
        {
          title: "Total Revenue",
          value: `₹${totalRevenue.toLocaleString()}`,
          change: "Live",
          isPositive: true,
          icon: IconCurrencyRupee,
          color: "blue",
          subtitle: `Avg: ₹${Math.round(avgOrderValue).toLocaleString()}/order`
        },
        {
          title: "Total Orders",
          value: orders.length.toString(),
          change: `${completedOrders} completed`,
          isPositive: true,
          icon: IconShoppingCart,
          color: "emerald",
          subtitle: `${pendingOrders} pending`
        },
        {
          title: "Active Users",
          value: users.length.toString(),
          change: "Registered",
          isPositive: true,
          icon: IconUsers,
          color: "purple",
          subtitle: "Total customers"
        },
        {
          title: "Pending Orders",
          value: pendingOrders.toString(),
          change: "Needs Action",
          isPositive: pendingOrders === 0,
          icon: IconClock,
          color: "orange",
          subtitle: pendingOrders > 0 ? "Requires attention" : "All clear"
        },
      ]);

      // Additional stats
      setAdditionalStats([
        {
          title: "Total Products",
          value: totalProducts.toString(),
          icon: IconPackage,
          color: "indigo",
          subtitle: `${products.filter(p => p.countInStock > 0).length} in stock`
        },
        {
          title: "Low Stock Alert",
          value: lowStockProducts.toString(),
          icon: IconAlertCircle,
          color: "orange",
          subtitle: `${outOfStockProducts} out of stock`
        },
        {
          title: "Completed Orders",
          value: completedOrders.toString(),
          icon: IconCheck,
          color: "emerald",
          subtitle: "Successfully delivered"
        },
        {
          title: "Avg Order Value",
          value: `₹${Math.round(avgOrderValue).toLocaleString()}`,
          icon: IconCreditCard,
          color: "blue",
          subtitle: "Per transaction"
        },
      ]);

      // Chart data - Last 7 days revenue
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
      }).reverse();

      const dailyRevenue = last7Days.map(date => {
        const dayOrders = orders.filter(o => o.createdAt && new Date(o.createdAt).toISOString().split('T')[0] === date);
        const dayTotal = dayOrders.reduce((sum, o) => sum + (o.paymentSummary?.total || 0), 0);
        const dayCount = dayOrders.length;
        return {
          name: days[new Date(date).getDay()],
          revenue: dayTotal,
          orders: dayCount
        };
      });

      setChartData(dailyRevenue);

      // Category distribution
      const categoryMap = {};
      products.forEach(p => {
        const cat = p.category || 'Uncategorized';
        categoryMap[cat] = (categoryMap[cat] || 0) + 1;
      });

      const categoryChartData = Object.entries(categoryMap)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6);

      setCategoryData(categoryChartData);

      // Top products by stock value
      const productsWithValue = products
        .map(p => ({
          ...p,
          stockValue: (p.price || 0) * (p.countInStock || 0)
        }))
        .sort((a, b) => b.stockValue - a.stockValue)
        .slice(0, 5);

      setTopProducts(productsWithValue);

      setRecentOrders(orders.slice(0, 6));
    } catch (err) {
      console.error('❌ Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const statusMap = {
    'Completed': { bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
    'Processing': { bg: 'bg-blue-500/10', text: 'text-blue-500' },
    'Pending': { bg: 'bg-amber-500/10', text: 'text-amber-500' },
    'Failed': { bg: 'bg-rose-500/10', text: 'text-rose-500' },
    'Shipped': { bg: 'bg-indigo-500/10', text: 'text-indigo-500' },
    'Delivered': { bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  if (loading) {
    return (
      <div className={`flex-1 flex items-center justify-center ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <p className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
      <div className={`px-8 py-6 border-b flex items-center justify-between ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"}`}>
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>Dashboard Overview</h2>
          <p className="text-sm font-medium text-gray-500 mt-1">Welcome back to your control panel.</p>
        </div>
        <button
          onClick={fetchDashboardData}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${isDark ? "bg-gray-900 text-gray-300 hover:bg-gray-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Refresh Data
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-8">
        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} isDark={isDark} />
          ))}
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {additionalStats.map((stat, i) => (
            <StatCard key={i} {...stat} isDark={isDark} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className={`p-6 rounded-3xl border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
            <div className="flex items-center justify-between mb-8">
              <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Revenue Analytics</h3>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"}`}>Last 7 Days</span>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1f2937" : "#f1f5f9"} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} tickFormatter={(value) => `₹${value >= 1000 ? (value / 1000).toFixed(0) + 'K' : value}`} />
                  <Tooltip content={<CustomTooltip isDark={isDark} />} />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className={`p-6 rounded-3xl border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
            <div className="flex items-center justify-between mb-8">
              <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Product Categories</h3>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"}`}>Distribution</span>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Products and Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Products by Stock Value */}
          <div className={`rounded-3xl border overflow-hidden ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
            <div className="px-8 py-6 border-b border-gray-100/10 flex items-center justify-between">
              <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Top Products</h3>
              <button onClick={() => onNavigate('products')} className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors">View All</button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topProducts.map((product, i) => (
                  <div key={product._id || i} className={`flex items-center justify-between p-4 rounded-2xl transition-all ${isDark ? "hover:bg-gray-800/50" : "hover:bg-gray-50"}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
                        <IconBoxSeam size={24} className="text-blue-500" />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{product.name}</p>
                        <p className="text-xs text-gray-500">{product.countInStock} units in stock</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>₹{product.stockValue.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Stock value</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className={`rounded-3xl border overflow-hidden ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
            <div className="px-8 py-6 border-b border-gray-100/10 flex items-center justify-between">
              <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Recent Orders</h3>
              <button onClick={() => onNavigate('orders')} className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors">View All Orders</button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentOrders.map((order, i) => (
                  <div key={order._id || i} className={`flex items-center justify-between p-4 rounded-2xl transition-all ${isDark ? "hover:bg-gray-800/50" : "hover:bg-gray-50"}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                        {order.customerDetails?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{order.customerDetails?.name || 'Unknown'}</p>
                        <p className="text-xs text-gray-500">#{(order._id || "").substring(0, 8).toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>₹{(order.paymentSummary?.total || 0).toLocaleString()}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${statusMap[order.status]?.bg || 'bg-gray-100'} ${statusMap[order.status]?.text || 'text-gray-600'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
