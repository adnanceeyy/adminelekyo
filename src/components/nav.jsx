import {
  IconBellRinging,
  IconMenu2,
  IconMoon,
  IconSearch,
  IconSun,
  IconX,
  IconLogout,
  IconUser,
  IconSettings,
  IconChevronDown,
  IconMail,
  IconPackage,
  IconReceipt,
  IconUsers,
  IconCategory,
  IconLayoutDashboard,
  IconCommand,
  IconArrowRight
} from '@tabler/icons-react'
import React, { useState, useEffect, useRef } from 'react'
import NotificationService from '../services/notification.service';
import { toast } from 'react-hot-toast';
import Modal from './Modal';

export default function Nav({ isDark, toggleTheme, toggleSidebar, sidebarOpen, onNavigate }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setShowSearchResults(false);
        searchRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Quick Commands / Pages Data
  const searchItems = [
    { name: 'Dashboard Portfolio', path: 'dashboard', icon: IconLayoutDashboard, category: 'Pages' },
    { name: 'Inventory Management', path: 'products', icon: IconPackage, category: 'Pages' },
    { name: 'Order Intelligence', path: 'orders', icon: IconReceipt, category: 'Pages' },
    { name: 'User Directory', path: 'users', icon: IconUsers, category: 'Pages' },
    { name: 'Product Categories', path: 'product-category', icon: IconCategory, category: 'Pages' },
    { name: 'System Settings', path: 'settings', icon: IconSettings, category: 'Pages' },
    { name: 'Profile Configuration', path: 'profile', icon: IconUser, category: 'Pages' },
    { name: 'New Intelligence Product', path: 'new-products', icon: IconPlus, category: 'Actions' },
  ];

  const filteredResults = searchQuery.length > 0
    ? searchItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  // Custom Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => { },
    type: 'danger'
  });

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await NotificationService.getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await NotificationService.markAsRead(id);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, unread: false } : n));
    } catch (err) {
      toast.error(err);
    }
  };

  const handleClearAll = async () => {
    setConfirmModal({
      isOpen: true,
      title: 'Clear Notifications',
      message: 'Are you sure you want to permanently clear all notifications? This action cannot be undone.',
      type: 'danger',
      onConfirm: async () => {
        try {
          await NotificationService.clearAll();
          setNotifications([]);
          toast.success("Notifications cleared");
          setConfirmModal(prev => ({ ...prev, isOpen: false }));
        } catch (err) {
          toast.error(err);
        }
      }
    });
  };

  const unreadCount = notifications.filter(n => n.unread).length;
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
  const adminName = adminUser.name || 'Admin';
  const adminInitials = adminName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`px-4 sm:px-8 h-20 flex items-center justify-between border-b transition-all duration-500 z-40 ${isDark ? "bg-gray-950 border-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.3)]" : "bg-white border-gray-100 shadow-sm"}`}>
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className={`p-2 rounded-xl transition-all duration-300 ${isDark ? "hover:bg-gray-800 text-gray-400 hover:text-white" : "hover:bg-gray-50 text-gray-500 hover:text-gray-900"}`}>
          {sidebarOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
        </button>

        {/* Real Tactical Search Bar -> Search Bar */}
        <div className="relative group hidden md:block">
          <IconSearch size={18} className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${isDark ? "text-gray-600 group-focus-within:text-blue-500" : "text-gray-400 group-focus-within:text-blue-600"}`} />
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            placeholder="Search..."
            className={`w-80 rounded-2xl pl-11 pr-12 py-2.5 text-sm font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 border ${isDark ? "bg-gray-900 border-gray-800 text-white placeholder-gray-600" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500/20"}`}
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-40 pointer-events-none">
            <IconCommand size={14} stroke={2} />
            <span className="text-xs font-bold">K</span>
          </div>

          {/* Search Result Dropdown */}
          {showSearchResults && searchQuery.length > 0 && (
            <div className={`absolute left-0 mt-4 w-[400px] max-h-[480px] rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
              <div className={`p-4 border-b flex items-center justify-between ${isDark ? "bg-gray-800/50 border-gray-800" : "bg-gray-50/50 border-gray-100"}`}>
                <span className="text-xs font-bold uppercase tracking-wider opacity-60">Search Results</span>
                <span className="text-xs font-bold text-blue-500">{filteredResults.length} found</span>
              </div>
              <div className="p-2 max-h-[400px] overflow-y-auto scrollbar-hide">
                {filteredResults.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-sm text-gray-500">No results found.</p>
                  </div>
                ) : (
                  filteredResults.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onNavigate(item.path);
                        setShowSearchResults(false);
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isDark ? "bg-gray-800 text-blue-400 group-hover:bg-blue-500/10" : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"}`}>
                          <item.icon size={18} stroke={2} />
                        </div>
                        <div className="text-left">
                          <p className={`text-sm font-medium ${isDark ? "text-gray-100" : "text-gray-900"}`}>{item.name}</p>
                          <p className="text-xs text-gray-500">{item.category}</p>
                        </div>
                      </div>
                      <IconArrowRight size={16} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className={`p-2 rounded-lg transition-all duration-200 ${isDark ? "hover:bg-gray-800 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-500 hover:text-gray-900"}`}>
          {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className={`p-2 rounded-lg transition-all duration-200 relative ${isDark ? "hover:bg-gray-800 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-500 hover:text-gray-900"}`}>
            <IconBellRinging size={20} />
            {unreadCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-inherit"></span>}
          </button>

          {showNotifications && (
            <div className={`absolute right-0 mt-4 w-80 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
              <div className={`p-4 flex items-center justify-between border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}>
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Notifications</h3>
                  {unreadCount > 0 && <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">{unreadCount}</span>}
                </div>
                <button onClick={handleClearAll} className="text-xs font-medium text-gray-500 hover:text-red-500 transition-colors">Clear All</button>
              </div>
              <div className="max-h-[350px] overflow-y-auto scrollbar-hide">
                {loading ? (
                  <div className="p-8 text-center"><div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div></div>
                ) : notifications.length === 0 ? (
                  <div className="p-8 text-center text-sm text-gray-500">No new notifications</div>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif._id} onClick={() => handleMarkAsRead(notif._id)} className={`p-4 cursor-pointer transition-all duration-200 border-b last:border-0 ${notif.unread ? (isDark ? "bg-gray-800/50" : "bg-blue-50/50") : ""} ${isDark ? "border-gray-800 hover:bg-gray-800" : "border-gray-50 hover:bg-gray-50"}`}>
                      <p className={`text-sm ${isDark ? "text-gray-200" : "text-gray-800"}`}>{notif.message}</p>
                      <p className={`text-xs mt-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>{formatTime(notif.time || notif.createdAt)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative ml-2">
          <button onClick={() => setShowProfile(!showProfile)} className={`flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-xl transition-all duration-200 ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {adminInitials}
            </div>
            <div className="hidden lg:flex flex-col items-start leading-none">
              <span className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>{adminName}</span>
            </div>
            <IconChevronDown size={14} className={`transition-transform duration-200 ${showProfile ? "rotate-180" : ""} text-gray-400`} />
          </button>

          {showProfile && (
            <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
              <div className={`p-4 border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}>
                <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{adminName}</p>
                <p className="text-xs text-gray-500 mt-1">{adminUser.role || 'Admin Account'}</p>
              </div>
              <div className="p-1">
                <button onClick={() => { onNavigate('profile'); setShowProfile(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-50"}`}>
                  <IconUser size={16} /> My Profile
                </button>
                <button onClick={() => { onNavigate('settings'); setShowProfile(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-50"}`}>
                  <IconSettings size={16} /> Settings
                </button>
              </div>
              <div className={`p-1 border-t ${isDark ? "border-gray-800" : "border-gray-100"}`}>
                <button onClick={() => window.location.href = "/"} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50">
                  <IconLogout size={16} /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop for results */}
      {showSearchResults && (
        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setShowSearchResults(false)}></div>
      )}

      {/* Global Backdrop for other dropdowns */}
      {(showNotifications || showProfile) && (
        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => { setShowNotifications(false); setShowProfile(false); }}></div>
      )}

      <Modal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        type={confirmModal.type}
      />
    </div>
  )
}

// Reuse IconPlus if it was imported, otherwise define or import it
const IconPlus = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" />
  </svg>
);
