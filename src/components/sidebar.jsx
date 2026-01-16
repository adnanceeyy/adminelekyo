import React, { useState } from 'react'
import {
  IconHome,
  IconShoppingCart,
  IconEdit,
  IconUser,
  IconLogout,
  IconChevronDown,
  IconPlus,
  IconList,
  IconTag,
  IconLayoutDashboard,
  IconSettings,
  IconPhoto,
  IconReceipt
} from '@tabler/icons-react'

function NavItem({ icon: Icon, label, active = false, isDark = true, onClick, hasSubmenu = false, isExpanded = false }) {
  return (
    <div
      onClick={onClick}
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 relative ${active
        ? (isDark ? "bg-blue-600/10 text-blue-400" : "bg-blue-50 text-blue-600")
        : isDark
          ? "text-gray-500 hover:bg-gray-800/50 hover:text-gray-300"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
        }`}
    >
      <div className={`transition-all duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`}>
        <Icon size={20} stroke={active ? 2.5 : 2} />
      </div>
      <span className={`text-sm font-semibold flex-1 transition-colors ${active ? "tracking-wide" : ""}`}>
        {label}
      </span>
      {hasSubmenu && (
        <IconChevronDown
          size={16}
          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} ${active ? 'text-blue-400' : 'text-gray-500'}`}
        />
      )}
      {active && (
        <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full ${isDark ? "bg-blue-500" : "bg-blue-600"}`}></div>
      )}
    </div>
  );
}

function SubNavItem({ icon: Icon, label, active = false, isDark = true, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 ml-6 rounded-lg cursor-pointer transition-all duration-200 ${active
        ? (isDark ? "text-blue-400" : "text-blue-600")
        : isDark
          ? "text-gray-500 hover:text-gray-300"
          : "text-gray-500 hover:text-gray-800"
        }`}
    >
      <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${active ? "bg-blue-500 scale-125 shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "bg-gray-700"}`}></div>
      <span className={`text-xs font-bold uppercase tracking-tight ${active ? "" : "opacity-70"}`}>{label}</span>
    </div>
  );
}

export default function Sidebar({ isDark, sidebarOpen, currentPage, onNavigate }) {
  const [expandedMenu, setExpandedMenu] = useState('products');

  const toggleMenu = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  return (
    <div
      className={`${sidebarOpen ? "w-72" : "w-0"
        } border-r h-screen overflow-hidden flex flex-col transition-all duration-500 ease-in-out z-30 ${isDark ? "bg-gray-950 border-gray-900 shadow-2xl" : "bg-white border-gray-100 shadow-lg"
        }`}
    >
      <div className="w-72 h-screen p-6 flex flex-col">
        {/* Brand Logo */}
        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <IconLayoutDashboard className="text-white" size={24} stroke={2.5} />
          </div>
          <div>
            <h1 className={`text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ELEK<span className="text-blue-500">YO</span>
            </h1>
            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] -mt-0.5 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              Control Center
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5 flex-1 overflow-y-auto scrollbar-hide pr-1">
          <div className={`px-4 mb-4 text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-gray-600" : "text-gray-400"}`}>
            Main Menu
          </div>

          <NavItem
            icon={IconHome}
            label="Dashboard"
            active={currentPage === 'dashboard'}
            isDark={isDark}
            onClick={() => onNavigate('dashboard')}
          />

          <NavItem
            icon={IconReceipt}
            label="Orders"
            active={currentPage === 'orders'}
            isDark={isDark}
            onClick={() => onNavigate('orders')}
          />

          {/* Products Section */}
          <div>
            <NavItem
              icon={IconShoppingCart}
              label="Inventory"
              active={currentPage?.startsWith('products') || currentPage === 'new-products' || currentPage === 'product-category'}
              isDark={isDark}
              onClick={() => toggleMenu('products')}
              hasSubmenu={true}
              isExpanded={expandedMenu === 'products'}
            />
            <div className={`overflow-hidden transition-all duration-300 ${expandedMenu === 'products' ? 'max-h-64 mt-1 opacity-100' : 'max-h-0 opacity-0'}`}>
              <SubNavItem
                label="All Products"
                active={currentPage === 'products'}
                isDark={isDark}
                onClick={() => onNavigate('products')}
              />
              <SubNavItem
                label="Add New"
                active={currentPage === 'new-products'}
                isDark={isDark}
                onClick={() => onNavigate('new-products')}
              />
              <SubNavItem
                label="Categories"
                active={currentPage === 'product-category'}
                isDark={isDark}
                onClick={() => onNavigate('product-category')}
              />
            </div>
          </div>

          <NavItem
            icon={IconPhoto}
            label="Promotions"
            active={currentPage === 'promotions'}
            isDark={isDark}
            onClick={() => onNavigate('promotions')}
          />

          <div className={`px-4 py-4 mt-4 text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-gray-600" : "text-gray-400"}`}>
            Configure
          </div>

          <NavItem
            icon={IconSettings}
            label="Site Settings"
            active={currentPage === 'settings'}
            isDark={isDark}
            onClick={() => onNavigate('settings')}
          />
        </nav>

        {/* Footer Actions */}
        <div className={`mt-auto border-t pt-6 ${isDark ? "border-gray-900" : "border-gray-100"}`}>
          <div
            onClick={() => onNavigate('logout')}
            className={`group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${isDark ? "hover:bg-red-500/10 text-gray-500 hover:text-red-400" : "hover:bg-red-50 text-gray-500 hover:text-red-600"
              }`}
          >
            <IconLogout size={20} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-bold">Log Out</span>
          </div>
        </div>
      </div>
    </div>
  )
}
