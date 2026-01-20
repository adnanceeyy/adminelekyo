import {
  IconTrendingUp,
  IconShoppingCart,
  IconUsers,
  IconClock,
  IconArrowUpRight,
  IconArrowDownRight,
  IconFilter,
  IconDotsVertical
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import ProductService from '../services/product.service';
import UserService from '../services/user.service';
import OrderService from '../services/order.service';

function StatCard({ title, value, change, isPositive, icon: Icon, color, isDark }) {
  return (
    <div
      className={`relative overflow-hidden border rounded-[32px] p-6 transition-all duration-300 ${isDark
        ? "bg-gray-900 border-gray-800"
        : "bg-white border-gray-100 shadow-sm"
        }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl ${isDark ? "bg-gray-800" : "bg-gray-50"} text-${color}-500`}>
          <Icon size={24} />
        </div>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
          }`}>
          {isPositive ? <IconArrowUpRight size={14} /> : <IconArrowDownRight size={14} />}
          {change}
        </div>
      </div>
      <div>
        <h3 className={`text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>{title}</h3>
        <p className={`text-2xl font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>{value}</p>
      </div>
    </div>
  );
}

function ActivityItem({ activity, user, time, type, isDark = true }) {
  const types = {
    order: { icon: IconShoppingCart, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    customer: { icon: IconUsers, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    alert: { icon: IconClock, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  };

  const { icon: Icon, color, bg } = types[type] || types.order;

  return (
    <div className={`flex items-start gap-4 p-4 rounded-xl transition-colors duration-200 ${isDark ? "hover:bg-gray-800/50" : "hover:bg-gray-50"}`}>
      <div className={`p-2.5 rounded-lg ${bg} ${color} flex-shrink-0`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <p className={`text-sm font-semibold truncate ${isDark ? "text-gray-200" : "text-gray-800"}`}>
            {activity}
          </p>
          <span className={`text-[11px] font-medium whitespace-nowrap ml-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            {time}
          </span>
        </div>
        <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
          By <span className={isDark ? "text-gray-400" : "text-gray-700"}>{user}</span>
        </p>
      </div>
    </div>
  );
}

export default function Dashboard({ isDark, onNavigate }) {
  const [stats, setStats] = useState([
    { title: "Revenue", value: "₹0", change: "+0%", isPositive: true, icon: IconTrendingUp, color: "blue" },
    { title: "Orders", value: "0", change: "+0%", isPositive: true, icon: IconShoppingCart, color: "emerald" },
    { title: "Customers", value: "0", change: "+0%", isPositive: true, icon: IconUsers, color: "purple" },
    { title: "Pending", value: "0", change: "0%", isPositive: false, icon: IconClock, color: "orange" },
  ]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [products, users, orders] = await Promise.all([
        ProductService.getAllProducts(),
        UserService.getAllUsers(),
        OrderService.getAllOrders()
      ]);

      // Calculate Stats
      const totalRevenue = orders.reduce((sum, order) => sum + (order.paymentSummary?.totalAmount || 0), 0);
      const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;

      setStats([
        { title: "Revenue", value: `₹${totalRevenue.toLocaleString()}`, change: "Live", isPositive: true, icon: IconTrendingUp, color: "blue" },
        { title: "Orders", value: orders.length.toString(), change: "Live", isPositive: true, icon: IconShoppingCart, color: "emerald" },
        { title: "Customers", value: users.length.toString(), change: "Live", isPositive: true, icon: IconUsers, color: "purple" },
        { title: "Pending", value: pendingOrders.toString(), change: "Action required", isPositive: pendingOrders > 0, icon: IconClock, color: "orange" },
      ]);

      // Process Chart Data (Last 7 Days)
      const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
      }).reverse();

      const dailyRevenue = last7Days.map(date => {
        const dayTotal = orders
          .filter(o => {
            if (!o.createdAt) return false;
            const orderDate = new Date(o.createdAt).toISOString().split('T')[0];
            return orderDate === date;
          })
          .reduce((sum, o) => sum + (o.paymentSummary?.totalAmount || 0), 0);

        return {
          name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
          revenue: dayTotal
        };
      });

      setChartData(dailyRevenue);
      setRecentOrders(orders.slice(0, 5));
    } catch (err) {
      console.error('Dashboard Data Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const recentActivities = [
    { activity: 'System Sync Completed', user: 'System', time: 'Just now', type: 'order' },
    { activity: 'Database Connected', user: 'Admin', time: 'Online', type: 'customer' },
  ];

  const statusMap = {
    'Completed': { bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
    'Processing': { bg: 'bg-blue-500/10', text: 'text-blue-500' },
    'Pending': { bg: 'bg-amber-500/10', text: 'text-amber-500' },
    'Failed': { bg: 'bg-rose-500/10', text: 'text-rose-500' },
  };

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
      <div className={`px-8 py-6 border-b flex items-center justify-between ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"}`}>
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>Dashboard</h2>
          <p className={`text-sm mt-1 font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>Welcome back to your store overview.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} isDark={isDark} />
          ))}
        </div>

        {/* Sales Chart Section */}
        <div className={`mb-8 p-6 rounded-[40px] border transition-all duration-500 ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className={`text-xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>Revenue Overview</h3>
              <p className={`text-xs font-bold uppercase tracking-widest mt-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>Weekly performance metrics</p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl ${isDark ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-600"} text-xs font-bold`}>
              <IconFilter size={14} />
              Filter: 7 Days
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1f2937" : "#f1f5f9"} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: isDark ? '#4b5563' : '#94a3b8', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: isDark ? '#4b5563' : '#94a3b8', fontSize: 12, fontWeight: 600 }}
                  tickFormatter={(value) => `₹${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#111827' : '#fff',
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    color: isDark ? '#fff' : '#000'
                  }}
                  itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className={`rounded-[32px] border overflow-hidden ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
              <div className="p-6 border-b border-gray-100/5 flex items-center justify-between">
                <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Recent Orders</h3>
                <button onClick={() => onNavigate('orders')} className="text-sm font-bold text-blue-500 hover:text-blue-400">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className={`${isDark ? "bg-gray-950/40 text-gray-500" : "bg-gray-50/50 text-gray-400"} text-xs font-bold`}>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4 text-center">Status</th>
                      <th className="px-6 py-4 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}>
                    {loading ? (
                      <tr><td colSpan="4" className="py-10 text-center text-xs font-bold text-gray-500 uppercase">Updating live stream...</td></tr>
                    ) : recentOrders.length === 0 ? (
                      <tr><td colSpan="4" className="py-10 text-center text-xs font-bold text-gray-500 uppercase">No recent transactions</td></tr>
                    ) : (
                      recentOrders.map((order, i) => (
                        <tr key={order._id || i} className={`group transition-all duration-300 ${isDark ? "hover:bg-gray-800/40" : "hover:bg-gray-50/70"}`}>
                          <td className="px-6 py-4"><span className={`text-sm font-bold ${isDark ? "text-gray-300" : "text-gray-700"}`}>#{order._id?.substring(0, 10).toUpperCase()}</span></td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className={`text-sm font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>{order.customerDetails?.name || 'Customer'}</span>
                              <span className="text-[11px] text-gray-500">{order.customerDetails?.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold ${statusMap[order.status]?.bg || 'bg-gray-500/10'} ${statusMap[order.status]?.text || 'text-gray-500'}`}>{order.status || 'Pending'}</span>
                          </td>
                          <td className="px-6 py-4 text-right"><span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>₹{order.paymentSummary?.totalAmount?.toLocaleString()}</span></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-[32px] border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
            <h3 className={`text-lg font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <ActivityItem key={i} {...activity} isDark={isDark} />
              ))}
            </div>
            <button onClick={() => onNavigate('edits')} className={`w-full mt-10 py-3 rounded-2xl text-sm font-bold transition-all ${isDark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>View All Activity</button>
          </div>
        </div>
      </div>
    </div>
  );
}
