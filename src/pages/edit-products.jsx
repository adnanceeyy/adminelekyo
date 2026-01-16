import {
  IconSearch,
  IconEdit,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
  IconPackage,
  IconTrolley,
  IconAdjustmentsHorizontal,
  IconX,
  IconCheck
} from '@tabler/icons-react';
import React, { useState } from 'react';

export default function EditProducts({ isDark }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: 'Boat Rockerz 550', mrp: 1299, offer: 899, stock: 15, category: 'Audio & Music', rating: 4.8 },
    { id: 2, name: 'Redragon K556 RGB', mrp: 4500, offer: 3499, stock: 450, category: 'Gaming', rating: 4.7 },
    { id: 3, name: 'Oura Ring Gen 3', mrp: 1999, offer: 999, stock: 85, category: 'Mobile & Wearables', rating: 4.9 },
    { id: 4, name: 'USB Flash Drive 64GB', mrp: 1500, offer: 1099, stock: 12, category: 'Extras', rating: 4.6 },
    { id: 5, name: 'Smart LED Bulb', mrp: 999, offer: 799, stock: 32, category: 'Extras', rating: 4.7 },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({ ...product });
  };

  const handleSave = () => {
    setProducts(products.map(p => p.id === editingId ? formData : p));
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: isNaN(value) ? value : parseFloat(value)
    }));
  };

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
      {/* Header */}
      <div className={`px-6 py-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"
        }`}>
        <div>
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Inventory Modification
          </h2>
          <p className={`text-sm mt-0.5 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            Adjust SKU parameters and stock levels in real-time
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <IconSearch className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDark ? "text-gray-600 group-focus-within:text-blue-500" : "text-gray-400 group-focus-within:text-blue-600"}`} size={18} />
            <input
              type="text"
              placeholder="Locate SKU..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className={`pl-12 pr-4 py-2.5 rounded-xl text-sm font-bold border transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none w-[280px] ${isDark ? "bg-gray-900 border-gray-800 text-white placeholder-gray-700" : "bg-white border-gray-100 shadow-sm text-gray-900 placeholder-gray-400"
                }`}
            />
          </div>
          <button className={`p-2.5 rounded-xl border transition-all ${isDark ? "bg-gray-900 border-gray-800 text-gray-400 hover:text-white" : "bg-white border-gray-100 text-gray-500 hover:text-gray-900"
            }`}>
            <IconAdjustmentsHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className={`rounded-[32px] border overflow-hidden ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
            <div className="overflow-x-auto overflow-y-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b ${isDark ? "bg-gray-950/50 border-gray-800" : "bg-gray-50/50 border-gray-50"}`}>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">ID</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Master Item</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Category</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Stock</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Pricing</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedProducts.map((product) => (
                    <tr key={product.id} className={`group border-b last:border-0 transition-colors ${isDark ? "border-gray-800 hover:bg-gray-950/50" : "border-gray-50 hover:bg-gray-50/30"}`}>
                      <td className="px-8 py-6">
                        <span className={`text-[10px] font-black ${isDark ? "text-gray-700" : "text-gray-300"}`}>#{product.id.toString().padStart(4, '0')}</span>
                      </td>
                      <td className="px-8 py-6">
                        {editingId === product.id ? (
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 rounded-lg text-sm font-black border ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                          />
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-blue-500/10`}>
                              {product.name.charAt(0)}
                            </div>
                            <div>
                              <p className={`text-sm font-black ${isDark ? "text-gray-200" : "text-gray-900"}`}>{product.name}</p>
                              <div className="flex items-center gap-1 mt-0.5">
                                <span className="text-[10px] text-amber-500 font-black">★ {product.rating}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-8 py-6">
                        {editingId === product.id ? (
                          <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className={`px-3 py-2 rounded-lg text-sm font-black border ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                          />
                        ) : (
                          <span className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"}`}>
                            {product.category}
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-6">
                        {editingId === product.id ? (
                          <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            className={`w-24 px-3 py-2 rounded-lg text-sm font-black border ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <IconPackage size={14} className={product.stock < 50 ? "text-rose-500" : "text-emerald-500"} />
                            <span className={`text-sm font-black ${isDark ? "text-gray-300" : "text-gray-700"}`}>{product.stock} units</span>
                          </div>
                        )}
                      </td>
                      <td className="px-8 py-6">
                        {editingId === product.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              name="offer"
                              value={formData.offer}
                              onChange={handleInputChange}
                              className={`w-24 px-3 py-2 rounded-lg text-sm font-black border ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                            />
                          </div>
                        ) : (
                          <div>
                            <p className={`text-sm font-black ${isDark ? "text-white" : "text-gray-900"}`}>${product.offer}</p>
                            <p className="text-[10px] font-bold text-gray-500 line-through">${product.mrp}</p>
                          </div>
                        )}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                          {editingId === product.id ? (
                            <>
                              <button onClick={handleSave} className="p-2 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform">
                                <IconCheck size={18} stroke={3} />
                              </button>
                              <button onClick={() => setEditingId(null)} className="p-2 bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-500/20 hover:scale-105 transition-transform">
                                <IconX size={18} stroke={3} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => handleEdit(product)} className={`p-2 rounded-xl border transition-all ${isDark ? "bg-gray-800 border-gray-700 text-blue-400 hover:bg-blue-500 hover:text-white" : "bg-white border-gray-100 text-blue-600 hover:bg-blue-600 hover:text-white shadow-sm"}`}>
                                <IconEdit size={18} stroke={2.5} />
                              </button>
                              <button onClick={() => handleDelete(product.id)} className={`p-2 rounded-xl border transition-all ${isDark ? "bg-gray-800 border-gray-700 text-rose-500 hover:bg-rose-500 hover:text-white" : "bg-white border-gray-100 text-rose-600 hover:bg-rose-600 hover:text-white shadow-sm"}`}>
                                <IconTrash size={18} stroke={2.5} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-2">
            <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-gray-600" : "text-gray-400"}`}>
              System Paging: {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} / {filteredProducts.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-xl border transition-all disabled:opacity-30 ${isDark ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-100 text-gray-900 shadow-sm"}`}
              >
                <IconChevronLeft size={20} />
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${currentPage === page
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-110"
                      : isDark ? "bg-gray-900 text-gray-500 hover:text-white" : "bg-white text-gray-400 hover:text-gray-900 shadow-sm"
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-xl border transition-all disabled:opacity-30 ${isDark ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-100 text-gray-900 shadow-sm"}`}
              >
                <IconChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
