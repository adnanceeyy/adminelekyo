import React, { useState } from 'react';
import {
  IconTrash,
  IconEdit,
  IconPlus,
  IconCalendar,
  IconTag,
  IconTicket,
  IconClock,
  IconArrowRight,
  IconSpeakerphone,
  IconX
} from '@tabler/icons-react';

export default function Offers({ isDark }) {
  const [offers, setOffers] = useState([
    {
      id: 1,
      title: "Gadget Expo 2026",
      discount: "50%",
      startDate: "Jan 15, 2026",
      endDate: "Feb 15, 2026",
      status: "Active",
      usage: 742,
      color: "from-blue-600 to-indigo-600",
      type: "Seasonal"
    },
    {
      id: 2,
      title: "Smartphone Upgrade Week",
      discount: "25%",
      startDate: "Dec 25, 2025",
      endDate: "Jan 31, 2026",
      status: "Active",
      usage: 1205,
      color: "from-emerald-600 to-teal-600",
      type: "Category"
    },
    {
      id: 3,
      title: "Gaming Marathon Deals",
      discount: "30%",
      startDate: "Jan 10, 2026",
      endDate: "Jan 25, 2026",
      status: "Ending Soon",
      usage: 3120,
      color: "from-rose-600 to-orange-600",
      type: "Flash Sale"
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const deleteOffer = (id) => {
    setOffers(offers.filter(offer => offer.id !== id));
  };

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
      {/* Header Section */}
      <div className={`px-6 py-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"
        }`}>
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Promotions
          </h2>
          <p className={`text-sm mt-1 font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            Create and manage sales campaigns for your store.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all ${isDark ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/10" : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"
            }`}
        >
          <IconPlus size={18} stroke={2.5} />
          Create Promotion
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
        {/* Campaign Analytics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Active Deals', value: '03', icon: IconSpeakerphone, color: 'blue' },
            { label: 'Total Used', value: '5,067', icon: IconTicket, color: 'emerald' },
            { label: 'Conversion', value: '12.4%', icon: IconTag, color: 'orange' },
          ].map((stat, i) => (
            <div key={i} className={`p-5 rounded-3xl border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"
              } flex items-center gap-4`}>
              <div className={`p-3 rounded-2xl ${isDark ? "bg-gray-800" : "bg-gray-50"} text-${stat.color}-500`}>
                <stat.icon size={24} />
              </div>
              <div>
                <h4 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{stat.value}</h4>
                <p className={`text-xs font-semibold ${isDark ? "text-gray-500" : "text-gray-400"}`}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 mb-10">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`group relative overflow-hidden flex flex-col rounded-3xl border transition-all duration-300 hover:translate-y-[-4px] ${isDark
                ? "bg-gray-900 border-gray-800 hover:border-gray-700 shadow-2xl"
                : "bg-white border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200"
                }`}
            >
              {/* Card Header (Gradient Section) */}
              <div className={`p-6 bg-linear-to-br ${offer.color} relative overflow-hidden`}>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start mb-8">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">
                      {offer.type}
                    </span>
                    <div className="flex gap-1">
                      <button className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition">
                        <IconEdit size={16} />
                      </button>
                      <button onClick={() => deleteOffer(offer.id)} className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition">
                        <IconTrash size={16} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white leading-tight mb-1">{offer.title}</h3>
                    <div className="flex items-center gap-2 text-white/70">
                      <IconTicket size={14} />
                      <span className="text-xs font-bold leading-none">{offer.usage} Redemptions</span>
                    </div>
                  </div>
                </div>
                {/* Decorative circle */}
                <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1">
                <div className={`flex items-center justify-between mb-6 p-4 rounded-2xl ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Benefit Level</span>
                    <span className="text-3xl font-black text-blue-500 leading-none">{offer.discount} <span className="text-xs font-bold uppercase text-gray-400 ml-1">OFF</span></span>
                  </div>
                  <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter ${offer.status === "Active"
                    ? (isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600')
                    : (isDark ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-50 text-orange-600')
                    }`}>
                    {offer.status}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconCalendar size={16} className="text-gray-600" />
                      <span className="text-xs font-bold text-gray-500">Timeline</span>
                    </div>
                    <span className={`text-xs font-black ${isDark ? "text-gray-300" : "text-gray-800"}`}>
                      {offer.startDate} <span className="mx-2 opacity-50">→</span> {offer.endDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconClock size={16} className="text-gray-600" />
                      <span className="text-xs font-bold text-gray-500">Duration</span>
                    </div>
                    <span className={`text-xs font-black ${isDark ? "text-gray-300" : "text-gray-800"}`}>30 Continuous Days</span>
                  </div>
                </div>

                <button className={`mt-auto w-full group/btn flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all ${isDark ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}>
                  Live Campaign Data
                  <IconArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Table/List View (Summary) */}
        <div className={`rounded-2xl border overflow-hidden ${isDark ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-100 shadow-sm"
          }`}>
          <div className="px-6 py-4 border-b border-gray-800/50">
            <h3 className={`text-sm font-black uppercase tracking-[0.2em] ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              Promotion History
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className={`${isDark ? "bg-gray-950/40 text-gray-500" : "bg-gray-50/50 text-gray-400"} text-xs font-bold`}>
                  <th className="px-6 py-4">Campaign Name</th>
                  <th className="px-6 py-4">Discount</th>
                  <th className="px-6 py-4">Start Date</th>
                  <th className="px-6 py-4">Result</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}>
                {offers.map((offer) => (
                  <tr key={offer.id} className={`transition-all duration-200 ${isDark ? "hover:bg-gray-800/30" : "hover:bg-gray-50/50"}`}>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>{offer.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-blue-500">{offer.discount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold ${isDark ? "text-gray-500" : "text-gray-400"}`}>{offer.startDate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-black ${isDark ? "text-gray-400" : "text-gray-600"}`}>{(offer.usage / 450).toFixed(1)}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter ${offer.status === 'Active'
                        ? (isDark ? "bg-emerald-500/10 text-emerald-500" : "bg-emerald-50 text-emerald-600")
                        : (isDark ? "bg-gray-800 text-gray-500" : "bg-gray-100 text-gray-600")
                        }`}>
                        {offer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Slide-over Form Overlay */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowForm(false)}></div>
          <div className={`relative w-full max-w-md h-full shadow-2xl transition-transform duration-500 transform translate-x-0 ${isDark ? "bg-gray-900" : "bg-white"}`}>
            <div className="h-full flex flex-col">
              <div className={`p-6 border-b flex items-center justify-between ${isDark ? "border-gray-800" : "border-gray-100"}`}>
                <h3 className={`text-lg font-black tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                  {editingId ? "Modify Promotion" : "New Campaign"}
                </h3>
                <button onClick={() => setShowForm(false)} className={`p-2 rounded-xl transition-all ${isDark ? "hover:bg-gray-800 text-gray-500" : "hover:bg-gray-50 text-gray-400"}`}>
                  <IconX size={20} />
                </button>
              </div>

              <form className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? "text-gray-500" : "text-gray-400"}`}>Campaign Title</label>
                  <input type="text" placeholder="e.g. Black Friday Extravaganza" className={`w-full px-4 py-3 rounded-2xl text-sm font-bold border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${isDark ? "bg-gray-950 border-gray-800 text-white placeholder-gray-600" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                    }`} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? "text-gray-500" : "text-gray-400"}`}>Benefit (e.g. 50%)</label>
                    <input type="text" className={`w-full px-4 py-3 rounded-2xl text-sm font-bold border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                      }`} />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? "text-gray-500" : "text-gray-400"}`}>Category</label>
                    <select className={`w-full px-4 py-3 rounded-2xl text-sm font-bold border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none bg-no-repeat bg-right ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                      }`}>
                      <option>Seasonal</option>
                      <option>Holiday</option>
                      <option>Flash Sale</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? "text-gray-500" : "text-gray-400"}`}>Campaign Duration</label>
                  <div className="grid grid-cols-1 gap-3">
                    <input type="date" className={`w-full px-4 py-3 rounded-2xl text-sm font-bold border ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`} />
                    <input type="date" className={`w-full px-4 py-3 rounded-2xl text-sm font-bold border ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`} />
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border border-dashed ${isDark ? "border-gray-800 bg-blue-500/5 text-blue-400" : "border-gray-200 bg-blue-50 text-blue-600"}`}>
                  <p className="text-[11px] font-bold leading-relaxed">
                    Tip: Seasonal campaigns usually perform 40% better when scheduled at least 15 days in advance.
                  </p>
                </div>
              </form>

              <div className={`p-6 border-t ${isDark ? "border-gray-800" : "border-gray-100"}`}>
                <button className={`w-full py-4 rounded-2xl text-sm font-black uppercase tracking-[0.2em] transition-all bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-500/20`}>
                  Launch Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
