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
import React, { useState, useEffect } from 'react';
import UserService from '../services/user.service';
import { toast } from 'react-hot-toast';

export default function Users({ isDark }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await UserService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await UserService.deleteUser(userId);
      setUsers(users.filter(u => u._id !== userId));
      alert('User deleted successfully');
    } catch (err) {
      alert('Failed to delete user: ' + err.message);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
      {/* Header Section */}
      <div className={`px-8 py-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"
        }`}>
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Users
          </h2>
          <p className={`text-sm mt-1 font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            Manage access and roles for your {users.length} users.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all ${isDark ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/10" : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"
            }`}>
            <IconUserPlus size={18} stroke={2.5} />
            <span>Invite User</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-8">
        {/* User Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Users', value: users.length, icon: IconUsers, color: 'blue' },
            { label: 'Admins', value: users.filter(u => u.role === 'admin').length, icon: IconCheck, color: 'emerald' },
            { label: 'Customers', value: users.filter(u => u.role !== 'admin').length, icon: IconX, color: 'rose' },
          ].map((stat, i) => (
            <div key={i} className={`p-6 rounded-3xl border transition-all duration-300 ${isDark ? "bg-gray-900/40 border-gray-800 hover:border-gray-700" : "bg-white border-gray-100 shadow-sm hover:shadow-md"
              }`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-500`}>
                  <stat.icon size={24} />
                </div>
                <button className={`p-1 rounded-lg ${isDark ? "hover:bg-gray-800 text-gray-600" : "hover:bg-gray-50 text-gray-400"}`}>
                  <IconDotsVertical size={18} />
                </button>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{stat.label}</p>
              <h3 className={`text-3xl font-bold mt-2 ${isDark ? "text-white" : "text-gray-900"}`}>{stat.value}</h3>
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
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-11 pr-4 py-2.5 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 ${isDark ? "bg-gray-950/50 border-gray-800 text-gray-200 placeholder-gray-600 focus:bg-gray-950" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white"
                }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${isDark ? "bg-gray-950 border-gray-800 text-gray-400 hover:text-white" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}>
              <IconFilter size={18} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className={`rounded-3xl border overflow-hidden ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"
          }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className={`${isDark ? "bg-gray-950/40 text-gray-500" : "bg-gray-50/50 text-gray-500"} text-xs font-bold uppercase tracking-wider`}>
                  <th className="px-6 py-5">User</th>
                  <th className="px-6 py-5">Role</th>
                  <th className="px-6 py-5">Location</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5">Joined</th>
                  <th className="px-6 py-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Loading Users...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-20 text-center text-gray-500 font-medium">No users found</td>
                  </tr>
                ) : (
                  filteredUsers.map((user, i) => (
                    <tr key={user._id || i} className={`group transition-all duration-200 ${isDark ? "hover:bg-gray-800/40" : "hover:bg-gray-50"}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/20`}>
                            {user.name?.charAt(0) || 'U'}
                          </div>
                          <div className="flex flex-col">
                            <span className={`text-sm font-bold ${isDark ? "text-gray-200" : "text-gray-900"}`}>{user.name}</span>
                            <span className="text-xs font-medium text-gray-500">{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-bold capitalize ${isDark ? "text-gray-400" : "text-gray-700"}`}>{user.role || 'user'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <IconMapPin size={16} className="text-gray-400" />
                          <span className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>{user.address || 'Not set'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${user.role === "admin"
                          ? (isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600')
                          : (isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600')
                          }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${user.role === 'admin' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                          {user.role === 'admin' ? 'Admin' : 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-medium ${isDark ? "text-gray-500" : "text-gray-600"}`}>{new Date(user.createdAt).toLocaleDateString()}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className={`p-2 rounded-xl transition-all ${isDark ? "hover:bg-rose-500/10 text-gray-500 hover:text-rose-400" : "hover:bg-rose-50 text-gray-400 hover:text-rose-600"}`}>
                            <IconX size={18} stroke={2} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className={`p-4 border-t flex items-center justify-between ${isDark ? "border-gray-800" : "border-gray-50"}`}>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Page 1 of 1</span>
            <div className="flex items-center gap-2">
              <button disabled className="px-4 py-2 rounded-xl text-xs font-bold opacity-50 cursor-not-allowed text-gray-500 border border-gray-200">Previous</button>
              <button disabled className="px-4 py-2 rounded-xl text-xs font-bold opacity-50 cursor-not-allowed text-gray-500 border border-gray-200">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
