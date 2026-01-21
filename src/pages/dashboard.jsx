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
      const orders = await OrderService.getAllOrders();
      const users = await UserService.getAllUsers();

      const totalRevenue = orders.reduce((sum, order) => sum + (order.paymentSummary?.total || 0), 0);
      const pendingOrders = orders.filter(o => ['Pending', 'Processing', 'pending', 'processing'].includes(o.status)).length;

      setStats([
        { title: "Revenue", value: `₹${totalRevenue.toLocaleString()}`, change: "Live", isPositive: true, icon: IconCurrencyRupee, color: "blue" },
        { title: "Orders", value: orders.length.toString(), change: "Tactical", isPositive: true, icon: IconShoppingCart, color: "emerald" },
        { title: "Users", value: users.length.toString(), change: "Syncing", isPositive: true, icon: IconUsers, color: "purple" },
        { title: "Pending", value: pendingOrders.toString(), change: "Action", isPositive: pendingOrders > 0, icon: IconClock, color: "orange" },
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
      <div className={`px-6 py-4 border-b flex items-center justify-between ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"}`}>
        <div>
          <h2 className={`text-xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>Dashboard</h2>
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest leading-none mt-1">Operational Protocol v2.0</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} isDark={isDark} />
          ))}
        </div>

        <div className={`mb-6 p-6 rounded-[32px] border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-white shadow-sm"}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-sm font-black uppercase tracking-widest ${isDark ? "text-white" : "text-gray-900"}`}>Analytics</h3>
            <span className="text-[9px] font-black text-gray-400 bg-gray-100/5 px-3 py-1 rounded-full border border-gray-200/10">7D STREAM</span>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1f2937" : "#f1f5f9"} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 900 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 900 }} tickFormatter={(value) => `₹${value >= 1000 ? (value / 1000).toFixed(0) + 'K' : value}`} />
                <Tooltip content={<CustomTooltip isDark={isDark} />} />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`rounded-[32px] border overflow-hidden ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-white shadow-sm"}`}>
          <div className="px-6 py-4 border-b border-gray-100/5 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Recent Stream</span>
            <button onClick={() => onNavigate('orders')} className="text-[9px] font-black text-blue-500 uppercase tracking-widest hover:underline">Full Manifest</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className={`${isDark ? "bg-gray-950/40" : "bg-gray-50/50"} text-[9px] font-black uppercase tracking-widest text-gray-500`}>
                  <th className="px-6 py-3">Ref</th>
                  <th className="px-6 py-3">Entity</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3 text-right">Value</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-gray-800/50" : "divide-gray-100/50"}`}>
                {recentOrders.map((order, i) => (
                  <tr key={order._id || i} className="group transition-all">
                    <td className="px-6 py-4 font-mono text-[9px] font-bold text-gray-500">#{(order._id || "").substring(0, 8).toUpperCase()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center text-[10px] font-black">{order.customerDetails?.name?.charAt(0)}</div>
                        <span className={`text-[11px] font-bold truncate max-w-[100px] ${isDark ? "text-gray-300" : "text-gray-900"}`}>{order.customerDetails?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-tighter ${statusMap[order.status]?.bg || 'bg-gray-500/10'} ${statusMap[order.status]?.text || 'text-gray-500'}`}>{order.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-[11px] font-black ${isDark ? "text-white" : "text-gray-900"}`}>₹{(order.paymentSummary?.total || 0).toLocaleString()}</span>
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
