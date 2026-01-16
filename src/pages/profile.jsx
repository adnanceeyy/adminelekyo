import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconEdit,
  IconCalendar,
  IconShieldCheck,
  IconClock,
  IconFingerprint,
  IconWorld,
  IconHistory,
  IconUser
} from '@tabler/icons-react';

export default function Profile({ isDark }) {
  const activities = [
    { text: "Updated profile information", time: "2 hours ago" },
    { text: "Changed account password", time: "1 day ago" },
    { text: "Logged in from new device", time: "3 days ago" },
    { text: "Enabled two-factor authentication", time: "5 days ago" },
  ];

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
      <div className={`px-8 py-6 border-b flex items-center justify-between ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"}`}>
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>Profile</h2>
          <p className={`text-sm mt-1 font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>Manage your personal information and account security.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
          <IconEdit size={18} />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-8 max-w-6xl mx-auto w-full">
        {/* Profile Card */}
        <div className={`rounded-[32px] border p-8 mb-10 ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-32 h-32 rounded-[40px] bg-blue-600 flex items-center justify-center text-white text-5xl font-bold shadow-2xl shadow-blue-500/20">
              A
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Admin User</h3>
              <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-widest">Main Administrator</p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
                {[
                  { icon: IconMail, text: "admin@eleckyo.com" },
                  { icon: IconWorld, text: "Global Admin" },
                  { icon: IconClock, text: "GMT+5:30" },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${isDark ? "bg-gray-950/50 border-gray-800 text-gray-400" : "bg-gray-50 border-gray-200 text-gray-600"}`}>
                    <item.icon size={14} />
                    <span className="text-xs font-bold">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Details */}
          <div className="lg:col-span-2">
            <div className={`p-8 rounded-[32px] border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
              <h4 className={`text-sm font-bold uppercase tracking-widest mb-8 ${isDark ? "text-gray-500" : "text-gray-400"}`}>Personal Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { label: "Full Name", value: "Administrator", icon: IconUser },
                  { label: "Role", value: "Store Manager", icon: IconShieldCheck },
                  { label: "Location", value: "New York, USA", icon: IconMapPin },
                  { label: "Phone", value: "+1 (555) 000-0000", icon: IconPhone },
                  { label: "Employee ID", value: "ELK-001", icon: IconFingerprint },
                  { label: "Joined", value: "Jan 2024", icon: IconCalendar },
                ].map((field, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`p-2 rounded-xl h-fit ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-50 text-gray-500"}`}>
                      <field.icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-0.5">{field.label}</p>
                      <p className={`text-sm font-bold ${isDark ? "text-gray-200" : "text-gray-900"}`}>{field.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className={`p-8 rounded-[32px] border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
              <h4 className={`text-sm font-bold uppercase tracking-widest mb-8 ${isDark ? "text-gray-500" : "text-gray-400"}`}>Recent Activity</h4>
              <div className="space-y-6">
                {activities.map((activity, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0`}></div>
                    <div>
                      <p className={`text-xs font-bold ${isDark ? "text-gray-300" : "text-gray-800"}`}>{activity.text}</p>
                      <p className="text-[10px] font-medium text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className={`mt-8 w-full py-3 rounded-2xl border border-dashed text-xs font-bold transition-all ${isDark ? "border-gray-800 text-gray-500 hover:text-white" : "border-gray-200 text-gray-400 hover:text-gray-900"}`}>View All Activity</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
