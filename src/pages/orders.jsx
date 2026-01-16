import {
    IconSearch,
    IconFilter,
    IconDownload,
    IconDotsVertical,
    IconEye,
    IconTruck,
    IconCheck,
    IconCircleX,
    IconReceipt,
    IconEdit
} from '@tabler/icons-react';
import React, { useState } from 'react';

export default function Orders({ isDark, onNavigate }) {
    const [searchTerm, setSearchTerm] = useState('');
    const orders = [
        { id: '#ORD-9421', customer: 'Sarah Johnson', email: 'sarah.j@example.com', amount: '$2,450.00', status: 'Completed', date: 'Jan 16, 2024', items: 3, tracking: 'TRK-990123' },
        { id: '#ORD-9420', customer: 'Michael Chen', email: 'm.chen@example.com', amount: '$1,200.50', status: 'Processing', date: 'Jan 16, 2024', items: 1, tracking: 'Preparing' },
        { id: '#ORD-9419', customer: 'Emma Wilson', email: 'emma.w@example.com', amount: '$850.00', status: 'Pending', date: 'Jan 15, 2024', items: 2, tracking: 'N/A' },
        { id: '#ORD-9418', customer: 'James Robert', email: 'j.robert@example.com', amount: '$3,100.00', status: 'Completed', date: 'Jan 15, 2024', items: 5, tracking: 'TRK-990115' },
        { id: '#ORD-9417', customer: 'Olivia Davis', email: 'olivia.d@example.com', amount: '$450.25', status: 'Failed', date: 'Jan 14, 2024', items: 1, tracking: 'Cancelled' },
        { id: '#ORD-9416', customer: 'David Miller', email: 'd.miller@example.com', amount: '$1,890.00', status: 'Processing', date: 'Jan 14, 2024', items: 2, tracking: 'Pending Shipment' },
    ];

    const statusMap = {
        'Completed': { bg: 'bg-emerald-500/10', text: 'text-emerald-500', icon: IconCheck },
        'Processing': { bg: 'bg-blue-500/10', text: 'text-blue-500', icon: IconTruck },
        'Pending': { bg: 'bg-amber-500/10', text: 'text-amber-500', icon: IconReceipt },
        'Failed': { bg: 'bg-rose-500/10', text: 'text-rose-500', icon: IconCircleX },
    };

    return (
        <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
            {/* Header Section */}
            <div className={`px-8 py-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"
                }`}>
                <div>
                    <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                        Orders
                    </h2>
                    <p className={`text-sm mt-1 font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                        Manage customer purchases and shipping information.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${isDark ? "bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
                        }`}>
                        <IconDownload size={18} />
                        <span className="hidden sm:inline">Export CSV</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
                {/* Quick Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                    {['All Orders', 'Processing', 'Pending', 'Completed', 'Failed'].map((filter, i) => (
                        <button key={i} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${i === 0
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                            : isDark ? "bg-gray-900 text-gray-400 hover:text-gray-200" : "bg-white text-gray-500 hover:text-gray-900 shadow-sm border border-gray-100"
                            }`}>
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Search & Actions Bar */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                        <IconSearch size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full pl-12 pr-4 py-3 rounded-2xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${isDark ? "bg-gray-900 border-gray-800 text-white placeholder-gray-600" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 shadow-sm"
                                }`}
                        />
                    </div>
                </div>

                {/* Orders Table */}
                <div className={`rounded-[32px] border overflow-hidden ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"
                    }`}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className={`${isDark ? "bg-gray-950/40 text-gray-500" : "bg-gray-50/50 text-gray-400"} text-xs font-bold`}>
                                    <th className="px-8 py-6">Order ID</th>
                                    <th className="px-8 py-6">Customer</th>
                                    <th className="px-8 py-6">Date</th>
                                    <th className="px-8 py-6">Tracking</th>
                                    <th className="px-8 py-6">Total</th>
                                    <th className="px-8 py-6">Status</th>
                                    <th className="px-8 py-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${isDark ? "divide-gray-800/50" : "divide-gray-100"}`}>
                                {orders.map((order, i) => (
                                    <tr key={i} className={`group transition-all duration-300 ${isDark ? "hover:bg-gray-800/40" : "hover:bg-gray-50/70"}`}>
                                        <td className="px-8 py-7">
                                            <span className={`text-xs font-mono font-bold ${isDark ? "text-gray-500" : "text-gray-400"}`}>{order.id}</span>
                                        </td>
                                        <td className="px-8 py-7">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${isDark ? "bg-gray-800 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
                                                    {order.customer.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className={`text-sm font-bold ${isDark ? "text-gray-200" : "text-gray-900"}`}>{order.customer}</p>
                                                    <p className={`text-[11px] font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}>{order.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-7 text-sm font-medium">
                                            <span className={isDark ? "text-gray-400" : "text-gray-600"}>{order.date}</span>
                                        </td>
                                        <td className="px-8 py-7">
                                            <div className="flex flex-col">
                                                <span className={`text-xs font-bold ${isDark ? "text-blue-400" : "text-blue-600"}`}>{order.tracking}</span>
                                                <span className={`text-[10px] font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}>{order.items} Units</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-7">
                                            <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{order.amount}</span>
                                        </td>
                                        <td className="px-8 py-7">
                                            <div className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold ${statusMap[order.status]?.bg} ${statusMap[order.status]?.text}`}>
                                                {order.status}
                                            </div>
                                        </td>
                                        <td className="px-8 py-7 text-center">
                                            <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className={`p-2 rounded-xl transition-all ${isDark ? "bg-gray-800 text-gray-400 hover:text-white" : "bg-gray-100 text-gray-400 hover:text-gray-900"}`}>
                                                    <IconEye size={18} />
                                                </button>
                                                <button className={`p-2 rounded-xl transition-all ${isDark ? "bg-gray-800 text-gray-400 hover:text-white" : "bg-gray-100 text-gray-400 hover:text-gray-900"}`}>
                                                    <IconTruck size={18} />
                                                </button>
                                            </div>
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
