import React, { useState, useEffect } from 'react';
import {
    IconPhoto,
    IconDeviceFloppy,
    IconCloudUpload,
    IconX,
    IconLoader,
    IconLayoutGrid,
    IconLink,
    IconForms
} from '@tabler/icons-react';
import { toast } from 'react-hot-toast';
import SettingsService from '../services/settings.service';
import Modal from '../components/Modal';

export default function Promotions({ isDark }) {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // settings state
    const [settings, setSettings] = useState({
        homePageOfferImage: '',
        bannerTitle: '',
        bannerSubtitle: '',
        offerTitle: '',
        offerSubtitle: '',
        offerImage: '',
        offerLink: ''
    });

    const [confirmModal, setConfirmModal] = useState({ isOpen: false, onConfirm: () => { } });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const data = await SettingsService.getSettings();
            setSettings({
                homePageOfferImage: data.homePageOfferImage || '',
                bannerTitle: data.bannerTitle || '',
                bannerSubtitle: data.bannerSubtitle || '',
                offerTitle: data.offerTitle || '',
                offerSubtitle: data.offerSubtitle || '',
                offerImage: data.offerImage || '',
                offerLink: data.offerLink || ''
            });
        } catch (err) {
            toast.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image too large. Max 5MB");
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                setSettings(prev => ({ ...prev, [field]: event.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            await SettingsService.updateSettings(settings);
            toast.success('Home page customizations updated!');
        } catch (err) {
            toast.error(err);
        } finally {
            setSaving(false);
        }
    };

    const confirmRemove = (field, title) => {
        setConfirmModal({
            isOpen: true,
            title: `Remove ${title}?`,
            message: `Are you sure you want to remove this image? The default placeholder will be shown.`,
            onConfirm: () => setSettings(prev => ({ ...prev, [field]: '' }))
        });
    };

    if (loading) {
        return (
            <div className="flex-1 flex justify-center items-center">
                <IconLoader className="animate-spin text-blue-500" size={32} />
            </div>
        );
    }

    return (
        <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
            {/* Header */}
            <div className={`px-8 py-6 border-b flex items-center justify-between ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"}`}>
                <div>
                    <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>Visual Content Manager</h2>
                    <p className={`text-sm mt-1 font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>Customize banners, slogans, and promotional zones.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-xl transition-all ${isDark ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20" : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30"
                        } ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {saving ? <IconLoader className="animate-spin" size={18} /> : <IconDeviceFloppy size={18} />}
                    <span>{saving ? 'Processing...' : 'Sync Changes'}</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide p-8">
                <div className="max-w-5xl mx-auto space-y-12">

                    {/* Hero Section Banner */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
                                <IconLayoutGrid size={20} stroke={2.5} />
                            </div>
                            <h3 className={`text-lg font-black uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-500"}`}>Primary Hero Banner</h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-sans">
                            {/* Inputs */}
                            <div className={`p-6 rounded-[32px] border space-y-4 ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Banner Title</label>
                                    <input
                                        type="text"
                                        name="bannerTitle"
                                        value={settings.bannerTitle}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-bold focus:ring-2 focus:ring-blue-500/10 transition-all ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-100"}`}
                                        placeholder="e.g. Upgrade Your Digital Life"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Banner Subtitle</label>
                                    <textarea
                                        name="bannerSubtitle"
                                        value={settings.bannerSubtitle}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium focus:ring-2 focus:ring-blue-500/10 transition-all ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-100"}`}
                                        placeholder="Brief description..."
                                    />
                                </div>
                            </div>

                            {/* Image */}
                            <div className="relative h-full min-h-[200px]">
                                <input type="file" id="hero-img" className="hidden" onChange={(e) => handleImageChange(e, 'homePageOfferImage')} />
                                <label htmlFor="hero-img" className={`group block h-full rounded-[32px] border-2 border-dashed overflow-hidden cursor-pointer transition-all ${isDark ? "bg-gray-900 border-gray-800 hover:border-indigo-500/40" : "bg-gray-50 border-gray-200 hover:border-indigo-500/40"
                                    }`}>
                                    {settings.homePageOfferImage ? (
                                        <div className="relative w-full h-full p-2">
                                            <img src={settings.homePageOfferImage} className="w-full h-full object-cover rounded-[24px]" />
                                            <button onClick={(e) => { e.preventDefault(); confirmRemove('homePageOfferImage', 'Hero Image'); }} className="absolute top-4 right-4 p-2 bg-rose-500 text-white rounded-full shadow-lg">
                                                <IconX size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-center p-6">
                                            <IconPhoto size={40} className="text-gray-500 mb-2" />
                                            <p className="text-xs font-bold text-gray-500">UPLOAD HERO BACKGROUND</p>
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* Offer Box Section (Summer Sale) */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                                <IconForms size={20} stroke={2.5} />
                            </div>
                            <h3 className={`text-lg font-black uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-500"}`}>Promotional Sale Box</h3>
                        </div>

                        <div className={`p-8 rounded-[40px] border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Offer Title</label>
                                        <input
                                            type="text"
                                            name="offerTitle"
                                            value={settings.offerTitle}
                                            onChange={handleInputChange}
                                            className={`w-full px-5 py-4 rounded-3xl border text-base font-black focus:ring-4 focus:ring-emerald-500/5 transition-all ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-100"}`}
                                            placeholder="e.g. Summer Sale is Live"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Offer Description</label>
                                        <textarea
                                            name="offerSubtitle"
                                            value={settings.offerSubtitle}
                                            onChange={handleInputChange}
                                            rows="2"
                                            className={`w-full px-5 py-4 rounded-3xl border text-sm font-medium focus:ring-4 focus:ring-emerald-500/5 transition-all ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-100"}`}
                                            placeholder="Details of the offer..."
                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Button Link</label>
                                            <div className="relative">
                                                <IconLink size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                                <input
                                                    type="text"
                                                    name="offerLink"
                                                    value={settings.offerLink}
                                                    onChange={handleInputChange}
                                                    className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-xs font-bold ${isDark ? "bg-gray-950 border-gray-800 text-gray-400" : "bg-gray-50 border-gray-100"}`}
                                                    placeholder="/allProduct"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Offer Image */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">Offer Backdrop Image</label>
                                    <input type="file" id="offer-img" className="hidden" onChange={(e) => handleImageChange(e, 'offerImage')} />
                                    <label htmlFor="offer-img" className={`group block h-48 rounded-[32px] border-2 border-dashed overflow-hidden cursor-pointer transition-all ${isDark ? "bg-gray-950 border-gray-800 hover:border-emerald-500/40" : "bg-gray-50 border-gray-200 hover:border-emerald-500/40"
                                        }`}>
                                        {settings.offerImage ? (
                                            <div className="relative w-full h-full p-2">
                                                <img src={settings.offerImage} className="w-full h-full object-cover rounded-[24px]" />
                                                <button onClick={(e) => { e.preventDefault(); confirmRemove('offerImage', 'Offer Backdrop'); }} className="absolute top-4 right-4 p-2 bg-rose-500 text-white rounded-full">
                                                    <IconX size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full opacity-60">
                                                <IconPhoto size={32} />
                                                <span className="text-[10px] font-bold mt-1 uppercase">Recommended: 1200x400</span>
                                            </div>
                                        )}
                                    </label>
                                    <p className="text-[10px] text-gray-500 leading-relaxed font-medium">This image will appear as the background of the "Summer Sale" box on the home page.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>

            {/* Remove Confirmation */}
            <Modal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmModal.onConfirm}
                title={confirmModal.title}
                message={confirmModal.message}
                isDark={isDark}
            />
        </div>
    );
}
