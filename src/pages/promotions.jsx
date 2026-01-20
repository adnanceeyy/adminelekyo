import React, { useState, useEffect } from 'react';
import {
    IconPhoto,
    IconDeviceFloppy,
    IconCloudUpload,
    IconX,
    IconLoader
} from '@tabler/icons-react';
import { toast } from 'react-hot-toast';
import SettingsService from '../services/settings.service';

export default function Promotions({ isDark }) {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [offerImage, setOfferImage] = useState(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const settings = await SettingsService.getSettings();
            if (settings.homePageOfferImage) {
                setOfferImage(settings.homePageOfferImage);
            }
        } catch (err) {
            toast.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image too large. Max 5MB");
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                setOfferImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            await SettingsService.updateSettings({ homePageOfferImage: offerImage });
            toast.success('Home offer image updated!');
        } catch (err) {
            toast.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleRemove = async () => {
        if (!confirm("Remove the home page offer image?")) return;
        setOfferImage(null); // Clear locally
        // We defer saving until "Save Changes" is clicked usually, but let's just clear ui for now.
        // User can click save to persist.
    };

    return (
        <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
            <div className={`px-8 py-6 border-b flex items-center justify-between ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"}`}>
                <div>
                    <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>Promotions & Offers</h2>
                    <p className={`text-sm mt-1 font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>Manage the main promotional banner on the home page.</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide p-8">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <IconLoader className="animate-spin text-blue-500" size={32} />
                    </div>
                ) : (
                    <div className={`max-w-4xl mx-auto rounded-[32px] border p-8 ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-xl bg-purple-500 text-white shadow-lg shadow-purple-500/20">
                                <IconPhoto size={24} />
                            </div>
                            <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Home Page Offer Banner</h3>
                        </div>

                        <div className="space-y-6">
                            {/* Image Upload Area */}
                            <div className="relative">
                                <input type="file" className="hidden" id="offer-image" onChange={handleImageChange} accept="image/*" />
                                <label htmlFor="offer-image" className={`group flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed rounded-[32px] cursor-pointer transition-all duration-300 ${offerImage
                                    ? "border-emerald-500/50 bg-emerald-500/5"
                                    : isDark ? "border-gray-800 bg-gray-950/50 hover:border-blue-500/40 hover:bg-blue-500/5" : "border-gray-200 bg-gray-50 hover:border-blue-500/40"
                                    }`}>
                                    {offerImage ? (
                                        <div className="relative w-full h-full p-4">
                                            <img src={offerImage} alt="Preview" className="w-full h-full object-contain rounded-2xl" />
                                            <button onClick={(e) => { e.preventDefault(); handleRemove(); }} className="absolute top-6 right-6 p-2 bg-rose-500 text-white rounded-full shadow-xl hover:scale-110 transition-transform">
                                                <IconX size={20} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center group-hover:translate-y-[-4px] transition-transform">
                                            <div className={`w-16 h-16 rounded-3xl mx-auto mb-4 flex items-center justify-center ${isDark ? "bg-gray-900 text-gray-500" : "bg-white text-gray-400 shadow-sm"}`}>
                                                <IconCloudUpload size={32} />
                                            </div>
                                            <p className={`text-lg font-bold ${isDark ? "text-gray-300" : "text-gray-700"}`}>Click to upload banner</p>
                                            <p className="text-sm text-gray-500 mt-1">Recommended size: 1920x600 (Landscape)</p>
                                        </div>
                                    )}
                                </label>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className={`flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold shadow-xl transition-all ${isDark ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20" : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30"
                                        } ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {saving ? <IconLoader className="animate-spin" size={20} /> : <IconDeviceFloppy size={20} />}
                                    <span>{saving ? 'Saving...' : 'Save Banner'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
