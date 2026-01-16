import {
  IconUser,
  IconBell,
  IconLock,
  IconShieldCheck,
  IconTrash,
  IconAt,
  IconKey,
  IconPhone,
  IconFingerprint,
  IconDeviceMobile,
  IconWorld,
  IconChevronRight
} from '@tabler/icons-react';
import React, { useState } from 'react';

export default function Settings({ isDark }) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    dataCollection: false,
    twoFactorAuth: true,
    publicProfile: false,
    biometrics: true
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const CustomToggle = ({ active, onClick }) => (
    <button
      onClick={onClick}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${active ? 'bg-blue-600' : (isDark ? 'bg-gray-800' : 'bg-gray-200')}`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${active ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );

  const SectionHeader = ({ icon: Icon, title, description }) => (
    <div className="flex items-start gap-4 mb-8">
      <div className={`p-3 rounded-2xl ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white shadow-sm border border-gray-100"}`}>
        <Icon size={24} className="text-blue-500" />
      </div>
      <div>
        <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{title}</h3>
        <p className="text-sm font-medium text-gray-500">{description}</p>
      </div>
    </div>
  );

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
      <div className={`px-8 py-6 border-b flex items-center justify-between ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"}`}>
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>Settings</h2>
          <p className={`text-sm mt-1 font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>Manage your account preferences and security.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-8 max-w-5xl">
        <div className="grid grid-cols-1 gap-12">

          {/* Account Profile */}
          <section>
            <SectionHeader
              icon={IconUser}
              title="Account Details"
              description="Update your personal information and contact details."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Email Address", value: "admin@eleckyo.com", icon: IconAt },
                { label: "Password", value: "••••••••••", icon: IconKey },
                { label: "Phone Number", value: "+1 (555) 000-0000", icon: IconPhone },
              ].map((item, i) => (
                <div key={i} className={`p-6 rounded-[32px] border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
                  <div className="flex items-center justify-between mb-4">
                    <item.icon size={20} className="text-blue-500" />
                    <button className="text-xs font-bold text-blue-500 hover:text-blue-400">Edit</button>
                  </div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">{item.label}</p>
                  <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Notifications */}
            <section>
              <SectionHeader
                icon={IconBell}
                title="Notifications"
                description="Choose how you want to be notified."
              />
              <div className={`p-2 rounded-[32px] border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
                {[
                  { key: "emailNotifications", label: "Email Alerts", desc: "Receive notifications via email", icon: IconAt },
                  { key: "pushNotifications", label: "Push Notifications", desc: "Receive instant updates on your device", icon: IconDeviceMobile },
                ].map((item, i) => (
                  <div key={item.key} className={`flex items-center justify-between p-4 rounded-2xl ${i !== 1 ? (isDark ? "border-b border-gray-800" : "border-b border-gray-100") : ""}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-50 text-gray-500"}`}>
                        <item.icon size={20} />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{item.label}</p>
                        <p className="text-xs font-medium text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                    <CustomToggle active={settings[item.key]} onClick={() => toggleSetting(item.key)} />
                  </div>
                ))}
              </div>
            </section>

            {/* Security */}
            <section>
              <SectionHeader
                icon={IconShieldCheck}
                title="Security"
                description="Keep your account safe and secure."
              />
              <div className={`p-2 rounded-[32px] border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
                {[
                  { key: "twoFactorAuth", label: "Two-Factor Auth", desc: "Add an extra layer of security", icon: IconFingerprint },
                ].map((item, i) => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-50 text-gray-500"}`}>
                        <item.icon size={20} />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{item.label}</p>
                        <p className="text-xs font-medium text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                    <CustomToggle active={settings[item.key]} onClick={() => toggleSetting(item.key)} />
                  </div>
                ))}
                <div className="p-4 pt-0">
                  <button className={`w-full flex items-center justify-between p-4 rounded-2xl border border-dashed transition-all ${isDark ? "border-gray-800 hover:border-blue-500 text-gray-400 hover:text-white" : "border-gray-200 hover:border-blue-500 text-gray-600 hover:text-blue-600"}`}>
                    <span className="text-xs font-bold uppercase">Active Sessions</span>
                    <IconChevronRight size={18} />
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Delete Account */}
          <section className={`rounded-[32px] p-8 border ${isDark ? "bg-rose-500/5 border-rose-500/20" : "bg-rose-50 border-rose-100"}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? "bg-rose-500/20 text-rose-500" : "bg-white text-rose-600 shadow-sm"}`}>
                  <IconTrash size={32} />
                </div>
                <div>
                  <h4 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Close Workspace</h4>
                  <p className="text-sm font-medium text-gray-500">This action will delete all your data permanently.</p>
                </div>
              </div>
              <button className="px-8 py-3 rounded-2xl bg-rose-600 text-white font-bold text-sm hover:bg-rose-500 transition-colors">Delete Permanently</button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
