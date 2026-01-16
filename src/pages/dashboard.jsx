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
  const stats = [
    { title: "Revenue", value: "₹1,28,430", change: "12.5%", isPositive: true, icon: IconTrendingUp, color: "blue" },
    { title: "Orders", value: "2,420", change: "8.2%", isPositive: true, icon: IconShoppingCart, color: "emerald" },
    { title: "Customers", value: "12,105", change: "5.1%", isPositive: true, icon: IconUsers, color: "purple" },
    { title: "Pending", value: "142", change: "2.3%", isPositive: false, icon: IconClock, color: "orange" },
  ];

  const recentActivities = [
    { activity: 'Order #9241 completed', user: 'System', time: '2 mins ago', type: 'order' },
    { activity: 'New customer registration', user: 'Alex Rivera', time: '15 mins ago', type: 'customer' },
    { activity: 'Stock level alert: Boat Rockerz', user: 'Warehouse', time: '1 hour ago', type: 'alert' },
    { activity: 'Refund processed #8102', user: 'Admin', time: '3 hours ago', type: 'order' },
  ];

  const recentOrders = [
    { id: '#ORD-9421', customer: 'Sarah Johnson', email: 'sarah.j@example.com', amount: '₹2,450.00', status: 'Completed' },
    { id: '#ORD-9420', customer: 'Michael Chen', email: 'm.chen@example.com', amount: '₹1,200.50', status: 'Processing' },
    { id: '#ORD-9419', customer: 'Emma Wilson', email: 'emma.w@example.com', amount: '₹850.00', status: 'Pending' },
    { id: '#ORD-9418', customer: 'James Robert', email: 'j.robert@example.com', amount: '₹3,100.00', status: 'Completed' },
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
                    {recentOrders.map((order, i) => (
                      <tr key={i} className={`group transition-all duration-300 ${isDark ? "hover:bg-gray-800/40" : "hover:bg-gray-50/70"}`}>
                        <td className="px-6 py-4"><span className={`text-sm font-bold ${isDark ? "text-gray-300" : "text-gray-700"}`}>{order.id}</span></td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className={`text-sm font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>{order.customer}</span>
                            <span className="text-[11px] text-gray-500">{order.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold ${statusMap[order.status]?.bg} ${statusMap[order.status]?.text}`}>{order.status}</span>
                        </td>
                        <td className="px-6 py-4 text-right"><span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{order.amount}</span></td>
                      </tr>
                    ))}
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
