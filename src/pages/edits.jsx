import {
  IconEdit,
  IconClock,
  IconCheck,
  IconRotate,
  IconHistory,
  IconFilter,
  IconDownload
} from '@tabler/icons-react';
import React from 'react';

export default function Edits({ isDark }) {
  const stats = [
    { title: "Active Revisions", value: "127", trend: "+18.2%", icon: IconEdit, color: "bg-blue-500" },
    { title: "Drafting Pipeline", value: "23", trend: "+12.5%", icon: IconClock, color: "bg-amber-500" },
    { title: "Commits Approved", value: "892", trend: "+25.3%", icon: IconCheck, color: "bg-emerald-500" },
    { title: "Rollback Events", value: "345", trend: "+4.1%", icon: IconRotate, color: "bg-rose-500" },
  ];

  const logs = [
    { editor: "Alexander Elektro", doc: "SKU_QNTM_8920", date: "Jan 15, 2026", time: "14:20:01", status: "Approved" },
    { editor: "Beta System Bot", doc: "GLOBAL_MSRP_ADJ", date: "Jan 16, 2026", time: "09:15:22", status: "Pending" },
    { editor: "Alexander Elektro", doc: "MEDIA_ASSET_442", date: "Jan 16, 2026", time: "11:45:10", status: "Approved" },
    { editor: "Core Intelligence", doc: "TAXONOMY_REBASE", date: "Jan 17, 2026", time: "18:30:55", status: "Pending" },
    { editor: "Infrastructure Team", doc: "VAULT_PROTOCOL_Z", date: "Jan 18, 2026", time: "22:10:04", status: "Approved" },
  ];

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
      {/* Header */}
      <div className={`px-6 py-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"
        }`}>
        <div>
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Modification Registry
          </h2>
          <p className={`text-sm mt-0.5 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            Chronological audit of all system parameter changes
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${isDark ? "bg-gray-900 border-gray-800 text-gray-400 hover:text-white" : "bg-white border-gray-100 text-gray-400 hover:text-gray-900 shadow-sm"
            }`}>
            <IconFilter size={18} />
            <span>Filter Logs</span>
          </button>
          <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${isDark ? "bg-gray-900 border-gray-800 text-gray-400 hover:text-white" : "bg-white border-gray-100 text-gray-400 hover:text-gray-900 shadow-sm"
            }`}>
            <IconDownload size={18} />
            <span>Export Audit</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, i) => (
              <div key={i} className={`p-8 rounded-[32px] border group hover:scale-[1.02] transition-all duration-300 ${isDark ? "bg-gray-900 border-gray-800 shadow-2xl shadow-black/20" : "bg-white border-gray-100 shadow-sm"
                }`}>
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-2xl ${item.color} text-white shadow-lg shadow-${item.color.split('-')[1]}-500/20 group-hover:rotate-12 transition-transform`}>
                    <item.icon size={20} stroke={2.5} />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-blue-400" : "text-blue-600"}`}>{item.trend}</span>
                </div>
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>{item.title}</p>
                <h3 className={`text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>{item.value}</h3>
              </div>
            ))}
          </div>

          {/* Timeline/Audit Table */}
          <div className={`rounded-[32px] border overflow-hidden ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
            <div className={`px-8 py-6 border-b flex items-center gap-3 bg-linear-to-r from-transparent via-transparent to-transparent group ${isDark ? "border-gray-800" : "border-gray-50"}`}>
              <IconHistory size={20} className="text-blue-500" />
              <h3 className={`text-sm font-black uppercase tracking-[0.2em] ${isDark ? "text-gray-400" : "text-gray-500"}`}>Live Event Stream</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b ${isDark ? "bg-gray-950/50 border-gray-800" : "bg-gray-50/50 border-gray-50"}`}>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Authorized Editor</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">System Document</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Temporal Stamp</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">Commit Status</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, i) => (
                    <tr key={i} className={`group border-b last:border-0 transition-colors ${isDark ? "border-gray-800 hover:bg-gray-950/50" : "border-gray-50 hover:bg-gray-50/30"}`}>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black text-white bg-gray-800 group-hover:bg-blue-600 transition-colors`}>
                            {log.editor.charAt(0)}
                          </div>
                          <span className={`text-sm font-black ${isDark ? "text-gray-300" : "text-gray-800"}`}>{log.editor}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <code className={`px-2 py-1 rounded text-[10px] font-black ${isDark ? "bg-gray-800 text-blue-400" : "bg-gray-50 text-blue-600 border border-blue-50"}`}>
                          {log.doc}
                        </code>
                      </td>
                      <td className="px-8 py-6">
                        <div>
                          <p className={`text-sm font-black ${isDark ? "text-gray-400" : "text-gray-600"}`}>{log.date}</p>
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{log.time}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className={`inline-flex px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${log.status === "Approved"
                            ? isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"
                            : isDark ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-600"
                          }`}>
                          {log.status === "Approved" ? "Commit Verified" : "Review Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={`px-8 py-6 border-t font-black uppercase tracking-widest text-[9px] text-center ${isDark ? "border-gray-800 text-gray-600" : "border-gray-50 text-gray-400"}`}>
              System Audit Trail Active • End of Stream
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
