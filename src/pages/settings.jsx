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
import React, { useState, useEffect } from 'react';
import SettingsService from '../services/settings.service';
import apiService from '../services/api.service';
import { toast } from 'react-hot-toast';

export default function Settings({ isDark }) {
  const [settings, setSettings] = useState({
    storeName: '',
    contactEmail: '',
    contactPhone: '',
    storeAddress: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await SettingsService.getSettings();
      setSettings({
        storeName: data.storeName || '',
        contactEmail: data.contactEmail || '',
        contactPhone: data.contactPhone || '',
        storeAddress: data.storeAddress || ''
      });
    } catch (err) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await SettingsService.updateSettings(settings);
      toast.success('Settings updated successfully');
    } catch (err) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
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
              title="Store Information"
              description="Configure your public store details and contact information."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Store Name", name: "storeName", icon: IconWorld, placeholder: "e.g. ELECKYO" },
                { label: "Contact Email", name: "contactEmail", icon: IconAt, placeholder: "e.g. support@eleckyo.com" },
                { label: "Contact Phone", name: "contactPhone", icon: IconPhone, placeholder: "e.g. +1 (555) 000-0000" },
                { label: "Store Address", name: "storeAddress", icon: IconWorld, placeholder: "e.g. 123 Tech Ave" },
              ].map((item, i) => (
                <div key={i} className={`p-6 rounded-[32px] border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <item.icon size={20} className="text-blue-500" />
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{item.label}</p>
                  </div>
                  <input
                    type="text"
                    name={item.name}
                    value={settings[item.name]}
                    onChange={handleChange}
                    placeholder={item.placeholder}
                    className={`w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0 ${isDark ? "text-white placeholder-gray-700" : "text-gray-900 placeholder-gray-300"}`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-10 py-4 bg-blue-600 text-white font-black rounded-[24px] hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : 'Save Settings'}
              </button>
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

            {/* Dev Options */}
            <section>
              <SectionHeader
                icon={IconShieldCheck}
                title="Developer Access"
                description="Fix permissions and roles."
              />
              <div className={`p-4 rounded-[32px] border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
                <button
                  onClick={async () => {
                    if (!confirm("Promote your account to Admin?")) return;
                    try {
                      const res = await apiService.post('users/promote-me', {});
                      if (res.success) {
                        localStorage.setItem('adminToken', res.token);
                        toast.success('Promoted to Admin! Reloading...');
                        setTimeout(() => window.location.reload(), 1500);
                      }
                    } catch (e) {
                      toast.error('Failed: ' + e.message);
                    }
                  }}
                  className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-500 transition-colors"
                >
                  Fix "Admin Access Only" Error
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">Click this if you cannot add/edit products.</p>
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
