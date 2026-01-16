import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconExternalLink,
  IconEye,
  IconUserPlus,
  IconSearch,
  IconFilter,
  IconDotsVertical,
  IconCheck,
  IconX,
  IconUsers
} from '@tabler/icons-react';
import React, { useState } from 'react';

export default function Users({ isDark }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const registeredUsers = [
    { id: 1, username: "john_doe", name: "John Doe", email: "john@example.com", phone: "+1 (555) 123-4567", location: "New York, USA", joinDate: "May 15, 2023", status: "Active", avatar: "JD", color: "bg-blue-500" },
    { id: 2, username: "sarah_smith", name: "Sarah Smith", email: "sarah@example.com", phone: "+1 (555) 234-5678", location: "Los Angeles, USA", joinDate: "Jun 20, 2023", status: "Active", avatar: "SS", color: "bg-purple-500" },
    { id: 3, username: "mike_j", name: "Mike Johnson", email: "mike@example.com", phone: "+1 (555) 345-6789", location: "Chicago, USA", joinDate: "Jul 10, 2023", status: "Active", avatar: "MJ", color: "bg-emerald-500" },
    { id: 4, username: "emma_w", name: "Emma Wilson", email: "emma@example.com", phone: "+1 (555) 456-7890", location: "Houston, USA", joinDate: "Aug 05, 2023", status: "Active", avatar: "EW", color: "bg-amber-500" },
    { id: 5, username: "david_b", name: "David Brown", email: "david@example.com", phone: "+1 (555) 567-8901", location: "Phoenix, USA", joinDate: "Sep 12, 2023", status: "Inactive", avatar: "DB", color: "bg-rose-500" },
    { id: 6, username: "lisa_a", name: "Lisa Anderson", email: "lisa@example.com", phone: "+1 (555) 678-9012", location: "Philadelphia, USA", joinDate: "Oct 18, 2023", status: "Active", avatar: "LA", color: "bg-indigo-500" },
  ];

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
      {/* Header Section */}
      <div className={`px-6 py-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"
        }`}>
        <div>
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            User Management
          </h2>
          <p className={`text-sm mt-0.5 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            Manage access and roles for {registeredUsers.length} platform users
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all ${isDark ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/10" : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"
            }`}>
            <IconUserPlus size={18} stroke={2.5} />
            <span>Invite New User</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
        {/* User Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Accounts', value: registeredUsers.length, icon: IconUsers, color: 'blue' },
            { label: 'Verified Users', value: registeredUsers.filter(u => u.status === 'Active').length, icon: IconCheck, color: 'emerald' },
            { label: 'Pending/Inactive', value: registeredUsers.filter(u => u.status === 'Inactive').length, icon: IconX, color: 'rose' },
          ].map((stat, i) => (
            <div key={i} className={`p-6 rounded-2xl border transition-all duration-300 ${isDark ? "bg-gray-900/40 border-gray-800 hover:border-gray-700" : "bg-white border-gray-100 shadow-sm hover:shadow-md"
              }`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-500`}>
                  <stat.icon size={24} />
                </div>
                <button className={`p-1 rounded-md ${isDark ? "hover:bg-gray-800 text-gray-600" : "hover:bg-gray-50 text-gray-400"}`}>
                  <IconDotsVertical size={18} />
                </button>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">{stat.label}</p>
              <h3 className={`text-2xl font-black mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className={`mb-6 p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-100 shadow-sm"
          }`}>
          <div className="relative group w-full md:w-96">
            <IconSearch size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by name, email or username..."
              className={`w-full pl-11 pr-4 py-2 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/10 ${isDark ? "bg-gray-950/50 border-gray-800 text-gray-200 placeholder-gray-600 focus:bg-gray-950" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white"
                }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all border ${isDark ? "bg-gray-950 border-gray-800 text-gray-400 hover:text-white" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}>
              <IconFilter size={18} />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className={`rounded-2xl border overflow-hidden ${isDark ? "bg-gray-900/50 border-gray-800 shadow-2xl" : "bg-white border-gray-100 shadow-sm"
          }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className={`${isDark ? "bg-gray-950/40 text-gray-500" : "bg-gray-50/50 text-gray-400"} text-[11px] font-bold uppercase tracking-wider`}>
                  <th className="px-6 py-4">Identity</th>
                  <th className="px-6 py-4">Access Level</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Join Date</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}>
                {registeredUsers.map((user, i) => (
                  <tr key={i} className={`group transition-all duration-300 ${isDark ? "hover:bg-gray-800/40" : "hover:bg-gray-50/70"}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${user.color} flex items-center justify-center text-white text-xs font-black shadow-lg shadow-black/10`}>
                          {user.avatar}
                        </div>
                        <div className="flex flex-col leading-tight">
                          <span className={`text-sm font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>{user.name}</span>
                          <span className="text-[11px] font-medium text-gray-500 lowercase">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={`text-xs font-bold ${isDark ? "text-gray-400" : "text-gray-700"}`}>@{user.username}</span>
                        <span className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">Contributor</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <IconMapPin size={14} className="text-gray-500" />
                        <span className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>{user.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter shadow-sm ${user.status === "Active"
                          ? (isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600')
                          : (isDark ? 'bg-rose-500/10 text-rose-400' : 'bg-rose-50 text-rose-600')
                        }`}>
                        <div className={`w-1 h-1 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}>{user.joinDate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className={`p-2 rounded-lg transition-all ${isDark ? "hover:bg-gray-800 text-gray-500 hover:text-teal-400" : "hover:bg-gray-50 text-gray-400 hover:text-teal-600"}`}>
                          <IconEye size={18} stroke={2} />
                        </button>
                        <button className={`p-2 rounded-lg transition-all ${isDark ? "hover:bg-gray-800 text-gray-500 hover:text-blue-400" : "hover:bg-gray-50 text-gray-400 hover:text-blue-600"}`}>
                          <IconExternalLink size={18} stroke={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={`p-4 border-t flex items-center justify-between ${isDark ? "border-gray-800" : "border-gray-50"}`}>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Page 1 of 12</span>
            <div className="flex items-center gap-1">
              <button disabled className="px-3 py-1.5 rounded-lg text-xs font-bold opacity-50 cursor-not-allowed text-gray-500 border border-gray-800">Prev</button>
              <button className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${isDark ? "border-gray-800 text-white hover:bg-gray-800" : "border-gray-200 text-gray-900 hover:bg-gray-50"}`}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
