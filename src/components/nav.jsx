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
  IconMail
} from '@tabler/icons-react'
import React, { useState, useEffect } from 'react'
import NotificationService from '../services/notification.service';
import { toast } from 'react-hot-toast';
import Modal from './Modal';

export default function Nav({ isDark, toggleTheme, toggleSidebar, sidebarOpen, onNavigate }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Custom Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => { },
    type: 'danger'
  });

  useEffect(() => {
    fetchNotifications(); // Initial fetch
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showNotifications) {
      fetchNotifications();
    }
  }, [showNotifications]);

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
  const adminEmail = adminUser.email || 'admin@eleckyo.com';
  const adminInitials = adminName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div
      className={`px-4 sm:px-8 h-20 flex items-center justify-between border-b transition-all duration-500 z-40 ${isDark ? "bg-gray-950 border-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.3)]" : "bg-white border-gray-100 shadow-sm"
        }`}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-xl transition-all duration-300 ${isDark
            ? "hover:bg-gray-800 text-gray-400 hover:text-white"
            : "hover:bg-gray-50 text-gray-500 hover:text-gray-900"
            }`}
        >
          {sidebarOpen ? <IconX size={20} stroke={2} /> : <IconMenu2 size={20} stroke={2} />}
        </button>

        {/* Search Bar */}
        <div className="relative group hidden sm:block">
          <IconSearch
            size={18}
            className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${isDark ? "text-gray-600 group-focus-within:text-blue-500" : "text-gray-400"}`}
          />
          <input
            type="text"
            placeholder="Search commands (⌘K)"
            className={`w-64 rounded-xl pl-11 pr-4 py-2.5 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 border ${isDark
              ? "bg-gray-900/50 border-gray-800 text-white placeholder-gray-600"
              : "bg-gray-50/50 border-gray-100 text-gray-900 placeholder-gray-400"
              }`}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-xl transition-all duration-300 ${isDark
            ? "hover:bg-gray-800 text-gray-400 hover:text-yellow-400"
            : "hover:bg-gray-50 text-gray-500 hover:text-blue-600"
            }`}
        >
          {isDark ? <IconSun size={20} stroke={2} /> : <IconMoon size={20} stroke={2} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2.5 rounded-xl transition-all duration-300 relative ${isDark
              ? "hover:bg-gray-800 text-gray-400 hover:text-white"
              : "hover:bg-gray-50 text-gray-500 hover:text-gray-900"
              }`}
          >
            <IconBellRinging size={20} stroke={2} />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-inherit shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div
              className={`absolute right-0 mt-4 w-96 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300 ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-100"
                }`}
            >
              <div className={`p-5 flex items-center justify-between border-b ${isDark ? "border-gray-800" : "border-gray-50"}`}>
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 text-[10px] font-extrabold uppercase tracking-tighter">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                <button
                  onClick={handleClearAll}
                  className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors"
                >
                  Clear All
                </button>
              </div>
              <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
                {loading ? (
                  <div className="p-10 text-center"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div></div>
                ) : notifications.length === 0 ? (
                  <div className="p-10 text-center text-xs font-bold text-gray-500 uppercase">Inbox is empty</div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif._id}
                      onClick={() => handleMarkAsRead(notif._id)}
                      className={`p-4 group cursor-pointer transition-all duration-200 border-l-4 ${notif.unread
                        ? "border-blue-500 bg-blue-500/5"
                        : "border-transparent"
                        } ${isDark ? "hover:bg-gray-800/50" : "hover:bg-gray-50"
                        }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className={`text-sm font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                          {notif.message}
                        </p>
                        {notif.unread && <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>}
                      </div>
                      <p className={`text-xs font-semibold ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        {formatTime(notif.time || notif.createdAt)}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className={`p-4 text-center border-t ${isDark ? "border-gray-800" : "border-gray-50"}`}>
                <button
                  onClick={() => { setShowNotifications(false); onNavigate('edits'); }}
                  className="text-blue-500 text-xs font-bold uppercase tracking-widest hover:text-blue-400 transition-colors"
                >
                  View All Activity
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative ml-2">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className={`flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-2xl transition-all duration-300 ${isDark
              ? "hover:bg-gray-800 border border-transparent hover:border-gray-700"
              : "hover:bg-gray-50 border border-transparent hover:border-gray-200"
              }`}
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-sm font-extrabold shadow-lg shadow-blue-500/20">
                {adminInitials}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-950"></div>
            </div>
            <div className="hidden lg:flex flex-col items-start leading-tight">
              <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                {adminName}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-tighter ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                {adminUser.role || 'Owner'}
              </span>
            </div>
            <IconChevronDown size={14} className={`transition-transform duration-300 ${showProfile ? "rotate-180" : ""} ${isDark ? "text-gray-600" : "text-gray-400"}`} />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfile && (
            <div
              className={`absolute right-0 mt-4 w-60 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300 ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-100"
                }`}
            >
              <div className={`p-5 border-b ${isDark ? "border-gray-800" : "border-gray-50"}`}>
                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-3 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                  Account Setup
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-sm font-extrabold">
                    AD
                  </div>
                  <div className="flex flex-col">
                    <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Admin.</p>
                    <p className="text-[11px] font-medium text-gray-500">admin@elekyo.com</p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <button
                  onClick={() => {
                    onNavigate('profile');
                    setShowProfile(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isDark
                    ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                >
                  <IconUser size={18} />
                  Personal Profile
                </button>
                <button
                  onClick={() => {
                    onNavigate('settings');
                    setShowProfile(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isDark
                    ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                >
                  <IconSettings size={18} />
                  Settings & Security
                </button>
              </div>
              <div className={`mt-2 p-2 border-t ${isDark ? "border-gray-800" : "border-gray-50"}`}>
                <button
                  onClick={() => window.location.href = "/"}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 text-red-500 hover:bg-red-500/10`}
                >
                  <IconLogout size={18} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(showNotifications || showProfile) && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => {
            setShowNotifications(false);
            setShowProfile(false);
          }}
        ></div>
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
