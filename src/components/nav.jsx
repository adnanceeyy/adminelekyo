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
import React, { useState } from 'react'

export default function Nav({ isDark, toggleTheme, toggleSidebar, sidebarOpen, onNavigate }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, message: "New order received #ORD-9421", time: "2 mins ago", type: "order", unread: true },
    { id: 2, message: "Payment processed from Michael Chen", time: "1 hour ago", type: "payment", unread: true },
    { id: 3, message: "Stock level alert for iPhone 15 Pro", time: "3 hours ago", type: "alert", unread: false },
    { id: 4, message: "Alex Rivera registered a new account", time: "5 hours ago", type: "user", unread: false },
  ];

  return (
    <div
      className={`relative z-20 border-b px-6 py-3 flex items-center justify-between transition-all duration-300 ${isDark ? "bg-gray-950/80 backdrop-blur-xl border-gray-900" : "bg-white/80 backdrop-blur-xl border-gray-100"
        }`}
    >
      <div className="flex items-center flex-1 gap-6">
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-xl transition-all duration-300 ${isDark
              ? "hover:bg-gray-800 text-gray-400 hover:text-white"
              : "hover:bg-gray-50 text-gray-500 hover:text-gray-900"
            }`}
        >
          {sidebarOpen ? <IconX size={22} stroke={2.5} /> : <IconMenu2 size={22} stroke={2.5} />}
        </button>

        {/* Search Bar */}
        <div className="relative group hidden md:block w-full max-w-md">
          <IconSearch
            className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isDark ? "text-gray-600 group-focus-within:text-blue-500" : "text-gray-400 group-focus-within:text-blue-600"
              }`}
            size={18}
            stroke={2}
          />
          <input
            type="search"
            placeholder="Search analytics, orders, or tools..."
            className={`w-full rounded-2xl pl-11 pr-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${isDark
                ? "bg-gray-900 border border-gray-800 text-gray-200 placeholder-gray-600 focus:bg-gray-800"
                : "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white"
              }`}
          />
        </div>
      </div>

      <div className="flex gap-2 items-center">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-xl transition-all duration-300 ${isDark
              ? "hover:bg-gray-800 text-amber-400 hover:shadow-[0_0_15px_rgba(251,191,36,0.1)]"
              : "hover:bg-gray-50 text-indigo-600 hover:shadow-[0_0_15px_rgba(79,70,229,0.1)]"
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
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-inherit shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div
              className={`absolute right-0 mt-4 w-96 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300 ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-100"
                }`}
            >
              <div className={`p-5 flex items-center justify-between border-b ${isDark ? "border-gray-800" : "border-gray-50"}`}>
                <h3 className={`font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                  Notifications
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 text-[10px] font-extrabold uppercase tracking-tighter">
                  4 New
                </span>
              </div>
              <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
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
                      {notif.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className={`p-4 text-center border-t ${isDark ? "border-gray-800" : "border-gray-50"}`}>
                <button className="text-blue-500 text-xs font-bold uppercase tracking-widest hover:text-blue-400 transition-colors">
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
                AD
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-950"></div>
            </div>
            <div className="hidden lg:flex flex-col items-start leading-tight">
              <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                Admin Sarah
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-tighter ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                Owner
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
                    <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Sarah J.</p>
                    <p className="text-[11px] font-medium text-gray-500">sarah.j@elektro.com</p>
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
    </div>
  )
}
