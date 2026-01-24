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
    IconId,
    IconPrinter
} from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import OrderService from '../services/order.service';
import API_CONFIG from '../config/api.config';
import InvoiceModal from '../components/InvoiceModal';

export default function Orders({ isDark, onNavigate }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All Orders');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [printingOrder, setPrintingOrder] = useState(null);

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
            <div className={`px-8 py-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100 shadow-sm"
                }`}>
                <div>
                    <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                        Orders
                    </h2>
                    <p className={`text-sm font-medium mt-1 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                        Manage and track your customer orders.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${isDark ? "bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
                        }`}>
                        <IconDownload size={16} />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide p-8">
                {/* Compact Filter Bar */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    {['All Orders', 'Pending', 'Processing', 'Shipped', 'Completed', 'Failed'].map((filter, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeFilter === filter
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
                            className={`w-full pl-11 pr-4 py-3 rounded-2xl text-sm font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 ${isDark ? "bg-gray-900 border-gray-800 text-white placeholder-gray-600" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 shadow-sm"
                                }`}
                        />
                    </div>
                </div>

                {/* Compact Orders Table */}
                <div className={`rounded-3xl border overflow-hidden ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-white shadow-sm"
                    }`}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className={`${isDark ? "bg-gray-950/40 text-gray-500" : "bg-gray-50/50 text-gray-500"} text-xs font-bold uppercase tracking-wider`}>
                                <tr>
                                    <th className="px-8 py-4">Order ID</th>
                                    <th className="px-8 py-4">Customer</th>
                                    <th className="px-8 py-4 text-center">Items</th>
                                    <th className="px-8 py-4">Total</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="py-20 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-8 h-8 border-2 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                                                <p className="text-xs font-bold text-gray-500 uppercase">Loading Orders...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-20 text-center text-gray-500 text-sm font-medium">No orders found matching your criteria.</td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order, i) => (
                                        <tr key={order._id || i} className={`group transition-all duration-200 ${isDark ? "hover:bg-gray-800/40" : "hover:bg-gray-50"}`}>
                                            <td className="px-8 py-4">
                                                <div className="flex flex-col">
                                                    <span className={`text-sm font-mono font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>#{(order._id || "").substring(0, 8).toUpperCase()}</span>
                                                    <span className="text-xs font-medium text-gray-500 mt-0.5">{new Date(order.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? "bg-gray-800 text-blue-400" : "bg-blue-100 text-blue-600"}`}>
                                                        {order.customerDetails?.name?.charAt(0) || 'U'}
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <p className={`text-sm font-medium truncate max-w-[140px] ${isDark ? "text-gray-200" : "text-gray-900"}`}>{order.customerDetails?.name}</p>
                                                        <p className={`text-xs text-gray-500 truncate max-w-[140px]`}>{order.customerDetails?.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4 text-center">
                                                <span className={`text-sm font-bold ${isDark ? "text-gray-400" : "text-gray-700"}`}>{order.orderedItems?.length || 0}</span>
                                            </td>
                                            <td className="px-8 py-4 text-sm font-bold">
                                                <span className={isDark ? "text-white" : "text-gray-900"}>₹{(order.paymentSummary?.total || order.totalAmount || 0).toLocaleString()}</span>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusMap[order.status]?.bg || 'bg-gray-100'} ${statusMap[order.status]?.text || 'text-gray-500'}`}>
                                                    {order.status || 'Pending'}
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => setSelectedOrder(order)}
                                                        className={`p-2 rounded-xl transition-all ${isDark ? "bg-gray-800 text-gray-400 hover:text-white" : "bg-white text-gray-400 hover:text-blue-600 border border-gray-100 shadow-sm"}`}
                                                        title="View Details"
                                                    >
                                                        <IconEye size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => setPrintingOrder(order)}
                                                        className={`p-2 rounded-xl transition-all ${isDark ? "bg-gray-800 text-gray-400 hover:text-white" : "bg-white text-gray-400 hover:text-emerald-600 border border-gray-100 shadow-sm"}`}
                                                        title="Print Invoice"
                                                    >
                                                        <IconPrinter size={18} />
                                                    </button>
                                                    <select
                                                        className={`text-xs font-bold py-2 px-3 rounded-xl border focus:outline-none uppercase tracking-wider ${isDark ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-700 shadow-sm"}`}
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
                        <div className={`px-8 py-6 flex items-center justify-between border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}>
                            <h3 className={`text-xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>Order Details</h3>
                            <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">
                                <IconX size={24} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                            <div className={`rounded-2xl p-5 ${isDark ? "bg-gray-950/50" : "bg-gray-50"}`}>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Customer Information</h4>
                                <div className="space-y-3">
                                    <p className={`text-sm font-bold flex items-center gap-3 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                                        <IconUser size={16} className="text-blue-500" />
                                        {selectedOrder.customerDetails?.name}
                                    </p>
                                    <p className={`text-sm font-medium flex items-center gap-3 text-gray-500`}>
                                        <IconMail size={16} />
                                        {selectedOrder.customerDetails?.email}
                                    </p>
                                    {selectedOrder.customerDetails?.phone && (
                                        <p className={`text-sm font-medium flex items-center gap-3 text-gray-500`}>
                                            <IconPhone size={16} />
                                            {selectedOrder.customerDetails?.phone}
                                        </p>
                                    )}
                                    <p className={`text-sm font-medium flex items-start gap-3 text-gray-500`}>
                                        <IconMapPin size={16} className="mt-0.5 shrink-0" />
                                        <div className="flex flex-col">
                                            <span>{selectedOrder.customerDetails?.address?.street}</span>
                                            <span>
                                                {selectedOrder.customerDetails?.address?.city}, {selectedOrder.customerDetails?.address?.postalCode}
                                            </span>
                                            <span>{selectedOrder.customerDetails?.address?.country}</span>
                                        </div>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">Order Items</h4>
                                <div className="space-y-3">
                                    {selectedOrder.orderedItems?.map((item, idx) => (
                                        <div key={idx} className={`flex items-center gap-5 p-4 rounded-2xl border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
                                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 ${isDark ? "bg-gray-950" : "bg-gray-50"}`}>
                                                {item.image ? (
                                                    <img
                                                        src={API_CONFIG.getAssetUrl(item.image)}
                                                        alt={item.itemName}
                                                        className="w-full h-full object-contain"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = 'https://placehold.co/100x100?text=No+Img';
                                                        }}
                                                    />
                                                ) : (
                                                    <IconPackage size={24} className="text-gray-400 opacity-20" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-black uppercase tracking-tight truncate ${isDark ? "text-gray-200" : "text-gray-900"}`}>{item.itemName}</p>
                                                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">₹{item.unitPrice?.toLocaleString()} × {item.quantity}</p>
                                            </div>
                                            <p className={`text-sm font-black text-blue-600 tabular-nums`}>₹{item.totalPrice?.toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={`p-5 rounded-2xl flex items-center justify-between ${isDark ? "bg-blue-500/10" : "bg-blue-50"} border border-blue-500/20`}>
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Grand Total</span>
                                <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-blue-600"}`}>₹{(selectedOrder.paymentSummary?.total || selectedOrder.totalAmount || 0).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className={`px-6 py-4 flex justify-end gap-3 ${isDark ? "bg-gray-950" : "bg-gray-50"}`}>
                            <button
                                onClick={() => {
                                    const orderToPrint = selectedOrder;
                                    setSelectedOrder(null);
                                    setPrintingOrder(orderToPrint);
                                }}
                                className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all flex items-center gap-2"
                            >
                                <IconPrinter size={16} /> Print Invoice
                            </button>
                            <button onClick={() => setSelectedOrder(null)} className="px-6 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {printingOrder && (
                <InvoiceModal
                    order={printingOrder}
                    onClose={() => setPrintingOrder(null)}
                    isDark={isDark}
                />
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
