import {
  IconPlus,
  IconRefresh,
  IconPackage,
  IconTag,
  IconDatabase,
  IconPhoto,
  IconInfoCircle,
  IconArrowRight,
  IconCloudUpload,
  IconX
} from '@tabler/icons-react';
import React, { useState } from 'react';

export default function NewProducts({ isDark }) {
  const [formData, setFormData] = useState({
    productName: '',
    mrp: '',
    offerPrice: '',
    image: null,
    stock: '',
    rating: '',
    review: '',
    description: '',
    warranty: '',
    category: '',
    brand: '',
    model: '',
    color: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product added:', formData);
    handleReset();
  };

  const handleReset = () => {
    setFormData({
      productName: '',
      mrp: '',
      offerPrice: '',
      image: null,
      stock: '',
      rating: '',
      review: '',
      description: '',
      warranty: '',
      category: '',
      brand: '',
      model: '',
      color: '',
    });
  };

  const FormSection = ({ title, icon: Icon, children, colorClass }) => (
    <div className={`p-8 rounded-[32px] border transition-all ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"
      }`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-xl ${colorClass}`}>
          <Icon size={20} />
        </div>
        <h3 className={`text-sm font-black uppercase tracking-[0.2em] ${isDark ? "text-gray-400" : "text-gray-500"}`}>{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
      {/* Header */}
      <div className={`px-6 py-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"
        }`}>
        <div>
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Materialize Inventory
          </h2>
          <p className={`text-sm mt-0.5 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            Registering a new SKU into the global database
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className={`p-2.5 rounded-xl border transition-all ${isDark ? "bg-gray-900 border-gray-800 text-rose-500 hover:bg-rose-500/10" : "bg-white border-gray-100 text-gray-400 hover:text-rose-600 hover:bg-rose-50"
              }`}
          >
            <IconRefresh size={20} />
          </button>
          <button
            onClick={handleSubmit}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all ${isDark ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/10" : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"
              }`}
          >
            <IconPlus size={18} stroke={2.5} />
            <span>Deploy SKU</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
        <form className="max-w-6xl mx-auto space-y-8 pb-10" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Visual & Basic */}
            <div className="space-y-8">
              <FormSection title="Visual Asset" icon={IconPhoto} colorClass="bg-purple-500 text-white shadow-lg shadow-purple-500/20">
                <div className="relative">
                  <input type="file" className="hidden" id="main-image" onChange={handleImageChange} />
                  <label htmlFor="main-image" className={`group flex flex-col items-center justify-center min-h-[340px] border-2 border-dashed rounded-[40px] cursor-pointer transition-all duration-300 ${formData.image
                      ? "border-emerald-500/50 bg-emerald-500/5"
                      : isDark ? "border-gray-800 bg-gray-950/50 hover:border-blue-500/40 hover:bg-blue-500/5" : "border-gray-200 bg-gray-50 hover:border-blue-500/40"
                    }`}>
                    {formData.image ? (
                      <div className="relative w-full h-full p-4">
                        <img src={formData.image} alt="Preview" className="w-full max-h-[300px] object-contain rounded-2xl" />
                        <button onClick={(e) => { e.preventDefault(); setFormData(p => ({ ...p, image: null })) }} className="absolute top-6 right-6 p-2 bg-rose-500 text-white rounded-full shadow-xl hover:scale-110 transition-transform">
                          <IconX size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center group-hover:translate-y-[-4px] transition-transform">
                        <div className={`w-16 h-16 rounded-3xl mx-auto mb-4 flex items-center justify-center ${isDark ? "bg-gray-900 text-gray-500" : "bg-white text-gray-400 shadow-sm"}`}>
                          <IconCloudUpload size={32} />
                        </div>
                        <p className={`text-sm font-black tracking-tight ${isDark ? "text-gray-400" : "text-gray-700"}`}>Click to upload product master</p>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">4K WEBP/PNG Preferred</p>
                      </div>
                    )}
                  </label>
                </div>
              </FormSection>

              <FormSection title="Core Registry" icon={IconInfoCircle} colorClass="bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Official Name</label>
                    <input type="text" name="productName" value={formData.productName} onChange={handleChange} placeholder="e.g. Quantum X-1 Ultra" className={`w-full px-6 py-4 rounded-2xl text-sm font-black border transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white placeholder-gray-700" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                      }`} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">SKU Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Comprehensive product breakdown..." className={`w-full px-6 py-4 rounded-2xl text-sm font-bold border transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none scrollbar-hide ${isDark ? "bg-gray-950 border-gray-800 text-white placeholder-gray-700" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                      }`} />
                  </div>
                </div>
              </FormSection>
            </div>

            {/* Right Column: Pricing & Specs */}
            <div className="space-y-8">
              <FormSection title="Commercial Parameters" icon={IconTag} colorClass="bg-amber-500 text-white shadow-lg shadow-amber-500/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Global MSRP</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 font-black">$</span>
                      <input type="number" name="mrp" value={formData.mrp} onChange={handleChange} placeholder="0.00" className={`w-full pl-10 pr-6 py-4 rounded-2xl text-sm font-black border transition-all focus:ring-2 focus:ring-amber-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white placeholder-gray-700" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                        }`} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Incentive Price</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-500 font-black">$</span>
                      <input type="number" name="offerPrice" value={formData.offerPrice} onChange={handleChange} placeholder="0.00" className={`w-full pl-10 pr-6 py-4 rounded-2xl text-sm font-black border transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white placeholder-gray-700 font-inter" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 font-inter"
                        }`} required />
                    </div>
                  </div>
                </div>
              </FormSection>

              <FormSection title="Logistics & State" icon={IconDatabase} colorClass="bg-rose-500 text-white shadow-lg shadow-rose-500/20">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Units</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="0" className={`w-full px-6 py-4 rounded-2xl text-sm font-black border transition-all focus:ring-2 focus:ring-rose-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                      }`} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Rating</label>
                    <input type="number" name="rating" value={formData.rating} onChange={handleChange} placeholder="0.0" step="0.1" max="5" className={`w-full px-6 py-4 rounded-2xl text-sm font-black border transition-all focus:ring-2 focus:ring-rose-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                      }`} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Warranty</label>
                    <input type="text" name="warranty" value={formData.warranty} onChange={handleChange} placeholder="Years" className={`w-full px-6 py-4 rounded-2xl text-sm font-black border transition-all focus:ring-2 focus:ring-rose-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                      }`} />
                  </div>
                </div>
                <div className="mt-8 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Taxonomy Hub</label>
                  <select name="category" value={formData.category} onChange={handleChange} className={`w-full px-6 py-4 rounded-2xl text-sm font-black border transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`} required>
                    <option value="">Select Protocol</option>
                    <option value="electronics">Neural Electronics</option>
                    <option value="clothing">Synthethic Apparel</option>
                    <option value="books">Digital Manuscripts</option>
                    <option value="furniture">Modular Architecture</option>
                  </select>
                </div>
              </FormSection>

              <FormSection title="Technical Build" icon={IconPackage} colorClass="bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Manufacturer</label>
                      <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className={`w-full px-6 py-4 rounded-2xl text-sm font-black border transition-all focus:ring-2 focus:ring-emerald-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                        }`} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Model Variant</label>
                      <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Model" className={`w-full px-6 py-4 rounded-2xl text-sm font-black border transition-all focus:ring-2 focus:ring-emerald-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                        }`} />
                    </div>
                  </div>
                </div>
              </FormSection>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
