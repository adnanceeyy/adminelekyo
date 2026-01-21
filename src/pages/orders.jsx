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
    IconEdit,
    IconX,
    IconMapPin,
    IconPhone,
    IconMail,
    IconPackage,
    IconCreditCard,
    IconUser,
    IconId
} from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import OrderService from '../services/order.service';
import API_CONFIG from '../config/api.config';

export default function Orders({ isDark, onNavigate }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All Orders');
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await OrderService.getAllOrders();
            setOrders(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await OrderService.updateOrderStatus(orderId, newStatus);
            setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
            if (selectedOrder?._id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
        } catch (err) {
            alert('Failed to update status: ' + err.message);
        }
    };

    const statusMap = {
        'Completed': { bg: 'bg-emerald-500/10', text: 'text-emerald-500', icon: IconCheck },
        'Processing': { bg: 'bg-blue-500/10', text: 'text-blue-500', icon: IconTruck },
        'Pending': { bg: 'bg-amber-500/10', text: 'text-amber-500', icon: IconReceipt },
        'Failed': { bg: 'bg-rose-500/10', text: 'text-rose-500', icon: IconCircleX },
        'Shipped': { bg: 'bg-indigo-500/10', text: 'text-indigo-500', icon: IconTruck },
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerDetails?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerDetails?.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = activeFilter === 'All Orders' || order.status === activeFilter;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
            {/* Compact Header Section */}
            <div className={`px-6 py-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100 shadow-sm"
                }`}>
                <div>
                    <h2 className={`text-xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                        Orders
                    </h2>
                    <p className={`text-[9px] font-bold uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        Logistics Intelligence Stream
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isDark ? "bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
                        }`}>
                        <IconDownload size={16} />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
                {/* Compact Filter Bar */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    {['All Orders', 'Pending', 'Processing', 'Shipped', 'Completed', 'Failed'].map((filter, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === filter
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                : isDark ? "bg-gray-900 text-gray-400 hover:text-gray-200" : "bg-white text-gray-500 hover:text-gray-900 shadow-sm border border-gray-100"
                                }`}>
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Compact Search Bar */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                        <IconSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full pl-11 pr-4 py-2.5 rounded-2xl text-xs font-bold transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 ${isDark ? "bg-gray-900 border-gray-800 text-white placeholder-gray-700" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 shadow-sm"
                                }`}
                        />
                    </div>
                </div>

                {/* Compact Orders Table */}
                <div className={`rounded-3xl border overflow-hidden ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-white shadow-sm"
                    }`}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className={`${isDark ? "bg-gray-950/40 text-gray-500" : "bg-gray-50/50 text-gray-400"} text-[9px] font-black uppercase tracking-widest`}>
                                <tr>
                                    <th className="px-6 py-4">ID Reference</th>
                                    <th className="px-6 py-4">Customer Entity</th>
                                    <th className="px-6 py-4 text-center">Payload</th>
                                    <th className="px-6 py-4">Settlement</th>
                                    <th className="px-6 py-4">Condition</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${isDark ? "divide-gray-800/50" : "divide-gray-100/50"}`}>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="py-20 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-8 h-8 border-2 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                                                <p className="text-[9px] font-black text-gray-500 uppercase">Synchronizing...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-20 text-center text-gray-500 text-[10px] font-black uppercase tracking-widest">Zero Matches</td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order, i) => (
                                        <tr key={order._id || i} className={`group transition-all duration-300 ${isDark ? "hover:bg-gray-800/40" : "hover:bg-gray-50/70"}`}>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className={`text-[10px] font-mono font-bold ${isDark ? "text-gray-500" : "text-gray-400"}`}>#{(order._id || "").substring(0, 8).toUpperCase()}</span>
                                                    <span className="text-[8px] font-black text-blue-500 uppercase mt-0.5">{new Date(order.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black ${isDark ? "bg-gray-800 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
                                                        {order.customerDetails?.name?.charAt(0) || 'U'}
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <p className={`text-xs font-bold truncate max-w-[120px] ${isDark ? "text-gray-200" : "text-gray-900"}`}>{order.customerDetails?.name}</p>
                                                        <p className={`text-[9px] text-gray-500 truncate max-w-[120px]`}>{order.customerDetails?.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`text-xs font-black ${isDark ? "text-gray-400" : "text-gray-700"}`}>{order.orderedItems?.length || 0}</span>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-black">
                                                <span className={isDark ? "text-white" : "text-gray-900"}>₹{(order.paymentSummary?.total || order.totalAmount || 0).toLocaleString()}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm ${statusMap[order.status]?.bg || 'bg-gray-500/10'} ${statusMap[order.status]?.text || 'text-gray-500'}`}>
                                                    {order.status || 'Pending'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => setSelectedOrder(order)}
                                                        className={`p-2 rounded-lg transition-all ${isDark ? "bg-gray-800 text-gray-400 hover:text-white" : "bg-white text-gray-400 hover:text-blue-600 border border-gray-100 shadow-sm"}`}
                                                    >
                                                        <IconEye size={16} stroke={2.5} />
                                                    </button>
                                                    <select
                                                        className={`text-[9px] font-black py-1.5 px-2 rounded-lg border focus:outline-none uppercase tracking-tighter ${isDark ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-700 shadow-sm"}`}
                                                        value={order.status || 'Pending'}
                                                        onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Completed">Completed</option>
                                                        <option value="Failed">Failed</option>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Same Compact Modal for Details */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
                    <div className={`w-full max-w-lg max-h-[85vh] rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-slideUp border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-white"}`}>
                        <div className={`px-6 py-5 flex items-center justify-between border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}>
                            <h3 className={`text-lg font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>Details</h3>
                            <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">
                                <IconX size={20} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                            <div className={`rounded-2xl p-4 ${isDark ? "bg-gray-950/50" : "bg-gray-50/50"}`}>
                                <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Customer</h4>
                                <div className="space-y-2">
                                    <p className={`text-sm font-bold flex items-center gap-2 ${isDark ? "text-gray-200" : "text-gray-800"}`}><IconUser size={14} className="text-blue-500" /> {selectedOrder.customerDetails?.name}</p>
                                    <p className={`text-xs font-bold flex items-center gap-2 text-gray-500`}><IconMail size={14} /> {selectedOrder.customerDetails?.email}</p>
                                    <p className={`text-xs font-bold flex items-start gap-2 text-gray-500`}><IconMapPin size={14} className="mt-0.5 shrink-0" /> <span>{selectedOrder.customerDetails?.address?.street}, {selectedOrder.customerDetails?.address?.city}</span></p>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Items</h4>
                                <div className="space-y-3">
                                    {selectedOrder.orderedItems?.map((item, idx) => (
                                        <div key={idx} className={`flex items-center gap-3 p-3 rounded-2xl border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
                                            <div className="flex-1">
                                                <p className={`text-xs font-black truncate uppercase ${isDark ? "text-gray-200" : "text-gray-900"}`}>{item.itemName}</p>
                                                <p className="text-[9px] font-bold text-gray-500 mt-0.5">₹{item.unitPrice?.toLocaleString()} × {item.quantity}</p>
                                            </div>
                                            <p className={`text-xs font-black text-blue-600`}>₹{item.totalPrice?.toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={`p-4 rounded-2xl flex items-center justify-between ${isDark ? "bg-blue-500/10" : "bg-blue-50"} border border-blue-500/20`}>
                                <span className="text-[9px] font-black uppercase tracking-widest text-blue-500">Total Settlement</span>
                                <p className={`text-xl font-black ${isDark ? "text-white" : "text-blue-600"}`}>₹{(selectedOrder.paymentSummary?.total || selectedOrder.totalAmount || 0).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className={`px-6 py-4 flex justify-end ${isDark ? "bg-gray-950" : "bg-gray-50"}`}>
                            <button onClick={() => setSelectedOrder(null)} className="px-6 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">Close</button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
                .animate-slideUp { animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }
            `}</style>
        </div>
    );
}
