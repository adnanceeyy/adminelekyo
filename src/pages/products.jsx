import {
  IconPlus,
  IconSearch,
  IconFilter,
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconPackage,
  IconArrowUpRight,
  IconArrowDownRight
} from '@tabler/icons-react';

export default function Products({ isDark, onNavigate }) {
  const products = [
    { id: '1001', name: 'Boat Rockerz 550', category: 'Audio & Music', price: '₹899.00', stock: 45, status: 'In Stock', image: '🎧' },
    { id: '1002', name: 'Oura Ring Generation 3', category: 'Mobile & Wearables', price: '₹999.00', stock: 12, status: 'Low Stock', image: '💍' },
    { id: '1003', name: 'Redragon K556 Keyboard', category: 'Gaming', price: '₹3,499.00', stock: 85, status: 'In Stock', image: '⌨️' },
    { id: '1004', name: 'Portable Table Fan', category: 'Extras', price: '₹799.00', stock: 0, status: 'Out of Stock', image: '🌬️' },
    { id: '1005', name: 'Aluminium Laptop Stand', category: 'Extras', price: '₹1,499.00', stock: 32, status: 'In Stock', image: '💻' },
  ];

  const statusMap = {
    'In Stock': { bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
    'Low Stock': { bg: 'bg-amber-500/10', text: 'text-amber-500' },
    'Out of Stock': { bg: 'bg-rose-500/10', text: 'text-rose-500' },
  };

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
      {/* Header Section */}
      <div className={`px-8 py-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"
        }`}>
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Inventory
          </h2>
          <p className={`text-sm mt-1 font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            Track levels and manage your {products.length} listed products.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('new-products')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20`}>
            <IconPlus size={18} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-6">


        {/* Filters & Actions Bar */}
        <div className={`mb-6 p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-100 shadow-sm"
          }`}>
          <div className="relative group w-full md:w-96">
            <IconSearch size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Filter by name, ID or category..."
              className={`w-full pl-11 pr-4 py-2 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/10 ${isDark ? "bg-gray-950/50 border-gray-800 text-gray-200 placeholder-gray-600 focus:bg-gray-950" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white"
                }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all border ${isDark ? "bg-gray-950 border-gray-800 text-gray-400 hover:text-white" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}>
              <IconFilter size={18} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Product Table Container */}
        <div className={`rounded-3xl border overflow-hidden ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"
          }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className={`${isDark ? "bg-gray-950/40 text-gray-500" : "bg-gray-50/50 text-gray-400"} text-xs font-bold`}>
                  <th className="px-6 py-5">Product</th>
                  <th className="px-6 py-5">ID</th>
                  <th className="px-6 py-5">Stock</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5">Price</th>
                  <th className="px-6 py-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}>
                {products.map((product, i) => (
                  <tr key={i} className={`group transition-all duration-300 ${isDark ? "hover:bg-gray-800/40" : "hover:bg-gray-50/70"}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-inner ${isDark ? "bg-gray-800/80" : "bg-gray-100"
                          }`}>
                          {product.image}
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-sm font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>{product.name}</span>
                          <span className="text-[11px] font-bold text-blue-500 uppercase tracking-tighter">{product.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-mono font-bold ${isDark ? "text-gray-500" : "text-gray-400"}`}>#{product.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5 w-32">
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span className={isDark ? "text-gray-400" : "text-gray-600"}>{product.stock > 0 ? `${product.stock} Units` : 'Sold Out'}</span>
                          <span className={isDark ? "text-gray-500" : "text-gray-400"}>{product.stock}%</span>
                        </div>
                        <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${product.stock < 20 ? 'bg-rose-500' : product.stock < 50 ? 'bg-amber-500' : 'bg-emerald-500'
                              }`}
                            style={{ width: `${product.stock}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter shadow-sm ${statusMap[product.status]?.bg} ${statusMap[product.status]?.text}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{product.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onNavigate('edit-products')}
                          className={`p-2 rounded-lg transition-all ${isDark ? "hover:bg-blue-500/10 text-gray-500 hover:text-blue-400" : "hover:bg-blue-50 text-gray-400 hover:text-blue-600"}`}>
                          <IconEdit size={18} stroke={2} />
                        </button>
                        <button className={`p-2 rounded-lg transition-all ${isDark ? "hover:bg-rose-500/10 text-gray-500 hover:text-rose-400" : "hover:bg-rose-50 text-gray-400 hover:text-rose-600"}`}>
                          <IconTrash size={18} stroke={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
