import {
  IconTrendingUp,
  IconShoppingCart,
  IconUsers,
  IconClock,
  IconArrowUpRight,
  IconArrowDownRight,
  IconFilter,
  IconDotsVertical,
  IconPackage,
  IconReceipt2,
  IconActivity,
  IconCalendarWeek,
  IconCurrencyRupee
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import ProductService from '../services/product.service';
import UserService from '../services/user.service';
import OrderService from '../services/order.service';

function StatCard({ title, value, change, isPositive, icon: Icon, color, isDark }) {
  const colors = {
    blue: "text-blue-500 bg-blue-500/10",
    emerald: "text-emerald-500 bg-emerald-500/10",
    purple: "text-purple-500 bg-purple-500/10",
    orange: "text-orange-500 bg-orange-500/10"
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
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
          }`}>
          {isPositive ? <IconArrowUpRight size={12} /> : <IconArrowDownRight size={12} />}
          {change}
        </div>
      </div>
      <div>
        <h3 className={`text-[9px] font-black uppercase tracking-[0.15em] ${isDark ? "text-gray-500" : "text-gray-400"}`}>{title}</h3>
        <p className={`text-xl font-black mt-1 tracking-tighter ${isDark ? "text-white" : "text-gray-900"}`}>{value}</p>
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
  const [recentOrders, setRecentOrders] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const orders = await OrderService.getAllOrders();
      const users = await UserService.getAllUsers();

      const totalRevenue = orders.reduce((sum, order) => sum + (order.paymentSummary?.total || 0), 0);
      const pendingOrders = orders.filter(o => ['Pending', 'Processing', 'pending', 'processing'].includes(o.status)).length;

      setStats([
        { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, change: "Live", isPositive: true, icon: IconCurrencyRupee, color: "blue" },
        { title: "Total Orders", value: orders.length.toString(), change: "All time", isPositive: true, icon: IconShoppingCart, color: "emerald" },
        { title: "Active Users", value: users.length.toString(), change: "Registered", isPositive: true, icon: IconUsers, color: "purple" },
        { title: "Pending Orders", value: pendingOrders.toString(), change: "Needs Action", isPositive: pendingOrders > 0, icon: IconClock, color: "orange" },
      ]);

      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
      }).reverse();

      const dailyRevenue = last7Days.map(date => {
        const dayTotal = orders
          .filter(o => o.createdAt && new Date(o.createdAt).toISOString().split('T')[0] === date)
          .reduce((sum, o) => sum + (o.paymentSummary?.total || 0), 0);
        return { name: days[new Date(date).getDay()], revenue: dayTotal };
      });

      setChartData(dailyRevenue);
      setRecentOrders(orders.slice(0, 6));
    } catch (err) {
      console.error(err);
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
  };

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
      <div className={`px-8 py-6 border-b flex items-center justify-between ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"}`}>
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>Dashboard Overview</h2>
          <p className="text-sm font-medium text-gray-500 mt-1">Welcome back to your control panel.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} isDark={isDark} />
          ))}
        </div>

        <div className={`mb-8 p-6 rounded-3xl border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
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

        <div className={`rounded-3xl border overflow-hidden ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
          <div className="px-8 py-6 border-b border-gray-100/10 flex items-center justify-between">
            <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Recent Orders</h3>
            <button onClick={() => onNavigate('orders')} className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors">View All Orders</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className={`${isDark ? "bg-gray-950/50" : "bg-gray-50"} text-xs font-bold uppercase tracking-wider text-gray-500`}>
                  <th className="px-8 py-4">Order ID</th>
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4 text-center">Status</th>
                  <th className="px-8 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}>
                {recentOrders.map((order, i) => (
                  <tr key={order._id || i} className={`group transition-colors ${isDark ? "hover:bg-gray-800/50" : "hover:bg-gray-50"}`}>
                    <td className="px-8 py-4 font-mono text-xs font-medium text-gray-500">#{(order._id || "").substring(0, 8).toUpperCase()}</td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">{order.customerDetails?.name?.charAt(0)}</div>
                        <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-900"}`}>{order.customerDetails?.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusMap[order.status]?.bg || 'bg-gray-100'} ${statusMap[order.status]?.text || 'text-gray-600'}`}>{order.status}</span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>₹{(order.paymentSummary?.total || 0).toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
