import React, { useState } from 'react';
import {
    IconPlus,
    IconTrash,
    IconEdit,
    IconPhoto,
    IconDeviceFloppy,
    IconExternalLink
} from '@tabler/icons-react';

export default function Promotions({ isDark }) {
    const [banners, setBanners] = useState([
        {
            id: 1,
            title: "Main Hero Banner",
            subtitle: "Spring Collection 2026",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
            location: "Home Page Top",
            active: true
        },
        {
            id: 2,
            title: "Tech Deals Section",
            subtitle: "Up to 50% Off on Gadgets",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200",
            location: "Home Page Mid",
            active: true
        }
    ]);

    return (
        <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
            <div className={`px-8 py-6 border-b flex items-center justify-between ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"}`}>
                <div>
                    <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>Promotions</h2>
                    <p className={`text-sm mt-1 font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>Manage banners and promotional images for your home page.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
                    <IconPlus size={18} />
                    <span>Add Banner</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide p-8">
                <div className="grid grid-cols-1 gap-8">
                    {banners.map((banner) => (
                        <div key={banner.id} className={`group relative overflow-hidden rounded-[32px] border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
                            <div className="flex flex-col md:flex-row">
                                {/* Image Preview */}
                                <div className="md:w-1/3 aspect-video md:aspect-auto relative overflow-hidden border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800">
                                    <img src={banner.image} alt={banner.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all">
                                            <IconPhoto size={24} />
                                        </button>
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="flex-1 p-8">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{banner.location}</span>
                                            <h3 className={`text-xl font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>{banner.title}</h3>
                                            <p className="text-sm text-gray-500 font-medium">{banner.subtitle}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className={`p-2 rounded-xl transition-all ${isDark ? "hover:bg-gray-800 text-gray-400 hover:text-white" : "hover:bg-gray-50 text-gray-400 hover:text-gray-900"}`}>
                                                <IconEdit size={20} />
                                            </button>
                                            <button className={`p-2 rounded-xl transition-all ${isDark ? "hover:bg-rose-500/10 text-rose-500/50 hover:text-rose-500" : "hover:bg-rose-50 text-rose-400 hover:text-rose-600"}`}>
                                                <IconTrash size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mt-auto">
                                        <button className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold transition-all ${isDark ? "bg-gray-950 text-gray-400 border border-gray-800" : "bg-gray-50 text-gray-600 border border-gray-200"}`}>
                                            <IconExternalLink size={16} />
                                            View Live
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                                            <IconDeviceFloppy size={16} />
                                            Update Image
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
