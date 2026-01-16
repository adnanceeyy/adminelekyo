import React, { useState } from 'react';
import {
  IconTrash,
  IconEdit,
  IconUpload,
  IconPhoto,
  IconCloudUpload,
  IconDotsVertical,
  IconPlus,
  IconX,
  IconSearch,
  IconFilter
} from '@tabler/icons-react';

export default function Image({ isDark }) {
  const [images, setImages] = useState([
    {
      id: 1,
      title: "Hero Banner Spring 2026",
      location: "Home Page - Primary Header",
      status: "Active",
      preview: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
      size: "1.2 MB",
      format: "WEBP"
    },
    {
      id: 2,
      title: "Featured Tech Collection",
      location: "Home Page - Mid Section",
      status: "Active",
      preview: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
      size: "850 KB",
      format: "JPG"
    },
    {
      id: 3,
      title: "Audio Gear Showcase",
      location: "Category - Electronics",
      status: "Active",
      preview: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
      size: "2.1 MB",
      format: "PNG"
    },
    {
      id: 4,
      title: "Gaming Setup Gear",
      location: "Home Page - Catalog",
      status: "Active",
      preview: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
      size: "1.5 MB",
      format: "WEBP"
    },
  ]);

  const [showUploadForm, setShowUploadForm] = useState(false);

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
      {/* Header */}
      <div className={`px-6 py-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"
        }`}>
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Media
          </h2>
          <p className={`text-sm mt-1 font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            Manage your store's images and banners.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUploadForm(true)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all ${isDark ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/10" : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"
              }`}
          >
            <IconPlus size={18} stroke={2.5} />
            <span>Add Media</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
        {/* Gallery Search & Controls */}
        <div className={`mb-8 p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-100 shadow-sm"
          }`}>
          <div className="relative group w-full md:w-96">
            <IconSearch size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search assets by name or location..."
              className={`w-full pl-11 pr-4 py-2 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/10 ${isDark ? "bg-gray-950/50 border-gray-800 text-gray-200 placeholder-gray-600 focus:bg-gray-950" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white"
                }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all border ${isDark ? "bg-gray-950 border-gray-800 text-gray-400 hover:text-white" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}>
              <IconFilter size={18} />
              <span>Type</span>
            </button>
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mb-10">
          {images.map((image) => (
            <div
              key={image.id}
              className={`group flex flex-col rounded-3xl border overflow-hidden transition-all duration-300 hover:translate-y-[-4px] ${isDark
                ? "bg-gray-900 border-gray-800 hover:border-gray-700 shadow-2xl"
                : "bg-white border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200"
                }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={image.preview}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex gap-2 w-full">
                    <button className="flex-1 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[10px] font-black uppercase backdrop-blur-md transition-all">
                      Details
                    </button>
                    <button onClick={() => setImages(images.filter(img => img.id !== image.id))} className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 backdrop-blur-md transition-all">
                      <IconTrash size={16} />
                    </button>
                  </div>
                </div>
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest leading-none">
                  {image.format}
                </div>
                <button className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 backdrop-blur-md text-white/70 hover:text-white">
                  <IconDotsVertical size={16} />
                </button>
              </div>

              <div className="p-5">
                <div className="flex flex-col mb-1 leading-tight">
                  <span className={`text-sm font-bold truncate ${isDark ? "text-gray-200" : "text-gray-900"}`}>{image.title}</span>
                  <span className="text-[11px] font-medium text-blue-500 lowercase mt-0.5 italic">{image.location}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1">
                    <IconPhoto size={14} className="text-gray-500" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{image.size}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                    Live
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* New Asset Placeholder */}
          <button
            onClick={() => setShowUploadForm(true)}
            className={`flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed rounded-3xl transition-all duration-300 ${isDark
              ? "bg-gray-900/40 border-gray-800 hover:border-blue-500/50 hover:bg-blue-500/5"
              : "bg-white border-gray-200 hover:border-blue-500/50 hover:bg-blue-50"
              }`}
          >
            <div className={`p-4 rounded-full mb-3 ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
              <IconCloudUpload size={32} className="text-blue-500" />
            </div>
            <span className={`text-sm font-black uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-600"}`}>Upload Asset</span>
          </button>
        </div>
      </div>

      {/* Asset Upload Overlay */}
      {showUploadForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowUploadForm(false)}></div>
          <div className={`relative w-full max-w-xl rounded-[32px] overflow-hidden shadow-2xl transition-all ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white"}`}>
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className={`text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>Media Uploader</h3>
                  <p className={`text-xs font-bold text-gray-500 uppercase tracking-widest mt-1`}>Add high-quality visuals</p>
                </div>
                <button onClick={() => setShowUploadForm(false)} className={`p-2 rounded-xl ${isDark ? "hover:bg-gray-800 text-gray-500" : "hover:bg-gray-50 text-gray-400"}`}>
                  <IconX size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}>File Name</label>
                  <input type="text" placeholder="e.g. Winter Sales Header" className={`w-full px-6 py-4 rounded-2xl text-sm font-bold border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${isDark ? "bg-gray-950 border-gray-800 text-white placeholder-gray-600" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                    }`} />
                </div>

                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? "text-gray-500" : "text-gray-400"}`}>Visual Content</label>
                  <div className={`border-2 border-dashed rounded-[32px] p-12 text-center transition-all duration-300 ${isDark ? "bg-gray-950/50 border-gray-800 hover:border-blue-500/40" : "bg-gray-50 border-gray-200 hover:border-blue-500/40"
                    }`}>
                    <IconCloudUpload size={48} className="mx-auto mb-4 text-blue-500/60" />
                    <p className={`text-sm font-black mb-1 ${isDark ? "text-gray-400" : "text-gray-700"}`}>Drop your files here</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">SVG, PNG, JPG (Max. 10MB)</p>
                    <input type="file" className="hidden" />
                    <button className="mt-6 px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black uppercase tracking-widest transition-all">Select Master Files</button>
                  </div>
                </div>

                <button className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-500/20">
                  Process & Finalize
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
