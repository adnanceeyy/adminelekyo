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
        </div>
      </div>
    </div>
  );
}
