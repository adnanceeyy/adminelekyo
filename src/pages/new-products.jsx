import {
  IconPlus,
  IconRefresh,
  IconPackage,
  IconTag,
  IconDatabase,
  IconPhoto,
  IconInfoCircle,
  IconCloudUpload,
  IconX
} from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import ProductService from '../services/product.service';
import CategoryService from '../services/category.service';
import VariantGroupService from '../services/variantGroup.service';
import { toast } from 'react-hot-toast';


const FormSection = ({ title, icon: Icon, children, colorClass, isDark }) => (
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

export default function NewProducts({ isDark }) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    mrp: '',
    offerPrice: '',
    image: null,
    images: [], // Array of additional images
    stock: '',
    rating: '',
    description: '',
    warranty: '',
    category: '',
    brand: '',
    model: '',
    color: '',
    variantGroup: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, grps] = await Promise.all([
          CategoryService.getAllCategories(),
          VariantGroupService.getAllGroups()
        ]);
        setCategories(cats);
        setGroups(grps);
      } catch (err) {
        console.error('Failed to fetch initial data:', err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e, type = 'main') => {
    const files = e.target.files;
    if (files.length > 0) {
      Array.from(files).forEach(file => {
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large (>5MB)`);
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          if (type === 'main') {
            setFormData(prev => ({ ...prev, image: event.target.result }));
          } else {
            setFormData(prev => ({
              ...prev,
              images: [...prev.images, event.target.result]
            }));
          }
        };
        reader.readAsDataURL(file);
      });
      // CRITICAL: Reset the input value so the same file can be selected again
      // Without this, selecting the same image for a second product won't trigger onChange
      e.target.value = '';
    }
  };

  const removeAdditionalImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productName || !formData.offerPrice || !formData.stock) {
      toast.error("Please fill in all required fields (Name, Price, Stock)");
      return;
    }

    try {
      setLoading(true);

      const productPayload = {
        name: formData.productName,
        productDetailedName: formData.productName,
        description: formData.description || 'No description provided.',
        price: Number(formData.offerPrice),
        mrPrice: Number(formData.mrp),
        countInStock: Number(formData.stock),
        productRating: Number(formData.rating) || 0,
        image: formData.image,
        images: formData.images, // Include the array of images
        category: formData.category,
        brand: formData.brand,
        model: formData.model,
        warranty: formData.warranty,
        color: formData.color,
        variantGroup: formData.variantGroup
      };

      await ProductService.addProduct(productPayload);
      toast.success('Product created successfully!');
      handleReset();
    } catch (err) {
      // console.error(err);
      toast.error(err.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      productName: '',
      mrp: '',
      offerPrice: '',
      image: null,
      images: [],
      stock: '',
      rating: '',
      description: '',
      warranty: '',
      category: '',
      brand: '',
      model: '',
      color: '',
      variantGroup: '',
    });
  };

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
      {/* Header */}
      <div className={`px-8 py-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"
        }`}>
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Add New Product
          </h2>
          <p className={`text-sm mt-1 font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            Create a new product listing.
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
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all ${isDark ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/10" : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <IconPlus size={18} stroke={2.5} />
            <span>{loading ? 'Creating...' : 'Create Product'}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-8">
        <form className="max-w-6xl mx-auto space-y-8 pb-10" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Visual & Basic */}
            <div className="space-y-8">
              <FormSection title="Product Images" icon={IconPhoto} colorClass="bg-purple-500 text-white shadow-lg shadow-purple-500/20" isDark={isDark}>
                <div className="relative">
                  <input type="file" className="hidden" id="main-image" onChange={(e) => handleImageChange(e, 'main')} accept="image/*" />
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
                        <p className={`text-sm font-bold tracking-tight ${isDark ? "text-gray-400" : "text-gray-700"}`}>Click to upload main image</p>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">High quality preferred</p>
                      </div>
                    )}
                  </label>
                </div>
              </FormSection>

              <FormSection title="Gallery" icon={IconPhoto} colorClass="bg-pink-500 text-white shadow-lg shadow-pink-500/20" isDark={isDark}>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group">
                        <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                        <button
                          onClick={(e) => { e.preventDefault(); removeAdditionalImage(index); }}
                          className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110"
                        >
                          <IconX size={12} />
                        </button>
                      </div>
                    ))}
                    <input
                      type="file"
                      className="hidden"
                      id="additional-images"
                      multiple
                      onChange={(e) => handleImageChange(e, 'additional')}
                      accept="image/*"
                    />
                    <label
                      htmlFor="additional-images"
                      className={`aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer transition-all ${isDark ? "border-gray-800 bg-gray-900/50 hover:border-pink-500/40" : "border-gray-200 bg-gray-50 hover:border-pink-500/40"
                        }`}
                    >
                      <IconPlus size={24} className="text-gray-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-2">Add More</span>
                    </label>
                  </div>
                </div>
              </FormSection>

              <FormSection title="Basic Details" icon={IconInfoCircle} colorClass="bg-blue-500 text-white shadow-lg shadow-blue-500/20" isDark={isDark}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Product Name</label>
                    <input type="text" name="productName" value={formData.productName} onChange={handleChange} placeholder="e.g. Wireless Headphones" className={`w-full px-6 py-4 rounded-2xl text-sm font-bold border transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white placeholder-gray-700" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                      }`} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Describe your product..." className={`w-full px-6 py-4 rounded-2xl text-sm font-medium border transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none scrollbar-hide ${isDark ? "bg-gray-950 border-gray-800 text-white placeholder-gray-700" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                      }`} />
                  </div>
                </div>
              </FormSection>
            </div>

            {/* Right Column: Pricing & Specs */}
            <div className="space-y-8">
              <FormSection title="Pricing" icon={IconTag} colorClass="bg-amber-500 text-white shadow-lg shadow-amber-500/20" isDark={isDark}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">MRP</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                      <input type="number" name="mrp" value={formData.mrp} onChange={handleChange} placeholder="0.00" className={`w-full pl-10 pr-6 py-4 rounded-2xl text-sm font-bold border transition-all focus:ring-2 focus:ring-amber-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white placeholder-gray-700" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                        }`} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Sale Price</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-500 font-bold">$</span>
                      <input type="number" name="offerPrice" value={formData.offerPrice} onChange={handleChange} placeholder="0.00" className={`w-full pl-10 pr-6 py-4 rounded-2xl text-sm font-bold border transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white placeholder-gray-700" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                        }`} required />
                    </div>
                  </div>
                </div>
              </FormSection>

              <FormSection title="Inventory & Status" icon={IconDatabase} colorClass="bg-rose-500 text-white shadow-lg shadow-rose-500/20" isDark={isDark}>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Stock</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="0" className={`w-full px-6 py-4 rounded-2xl text-sm font-bold border transition-all focus:ring-2 focus:ring-rose-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                      }`} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Rating</label>
                    <input type="number" name="rating" value={formData.rating} onChange={handleChange} placeholder="0.0" step="0.1" max="5" className={`w-full px-6 py-4 rounded-2xl text-sm font-bold border transition-all focus:ring-2 focus:ring-rose-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                      }`} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Warranty</label>
                    <input type="text" name="warranty" value={formData.warranty} onChange={handleChange} placeholder="Years" className={`w-full px-6 py-4 rounded-2xl text-sm font-bold border transition-all focus:ring-2 focus:ring-rose-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                      }`} />
                  </div>
                </div>
                <div className="mt-8 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className={`w-full px-6 py-4 rounded-2xl text-sm font-bold border transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`} required>
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-8 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Variant Group</label>
                  <select name="variantGroup" value={formData.variantGroup} onChange={handleChange} className={`w-full px-6 py-4 rounded-2xl text-sm font-bold border transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}>
                    <option value="">No Variant Group</option>
                    {groups.map(grp => (
                      <option key={grp._id} value={grp.name}>{grp.name}</option>
                    ))}
                  </select>
                </div>
              </FormSection>

              <FormSection title="Specifications" icon={IconPackage} colorClass="bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" isDark={isDark}>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Brand</label>
                      <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand Name" className={`w-full px-6 py-4 rounded-2xl text-sm font-bold border transition-all focus:ring-2 focus:ring-emerald-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                        }`} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Model</label>
                      <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Model Name" className={`w-full px-6 py-4 rounded-2xl text-sm font-bold border transition-all focus:ring-2 focus:ring-emerald-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                        }`} />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Color / Variant Name</label>
                      <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="e.g. Midnight Black" className={`w-full px-6 py-4 rounded-2xl text-sm font-bold border transition-all focus:ring-2 focus:ring-emerald-500/20 focus:outline-none ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                        }`} />
                    </div>
                  </div>

                  {/* LIVE PREVIEW CARD */}
                  <div className={`mt-6 p-6 rounded-3xl border-2 border-dashed ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-100 bg-gray-50/50"}`}>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 text-center">Frontend Preview</h4>
                    <div className="flex justify-center">
                      <div className={`w-24 flex flex-col items-center p-2 rounded-2xl border-2 border-gray-100 bg-white shadow-sm`}>
                        <div className="w-12 h-12 mb-1.5 flex items-center justify-center">
                          {formData.image ? (
                            <img src={formData.image} alt="Preview" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                          ) : (
                            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-300"><IconPhoto size={20} /></div>
                          )}
                        </div>
                        <div className="text-center w-full px-0.5">
                          <div className="text-[10px] font-bold uppercase tracking-tight truncate leading-tight mb-0.5 text-blue-600">
                            {formData.color || formData.model || (formData.productName.split(' ').pop()) || "Label"}
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] font-bold text-gray-900 leading-none">₹{formData.offerPrice || "0"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FormSection>
            </div>
          </div>
        </form >
      </div >
    </div >
  );
}
