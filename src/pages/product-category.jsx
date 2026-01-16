import { IconEdit, IconTrash, IconPlus, IconFolder, IconPackage, IconDotsVertical, IconChevronRight } from '@tabler/icons-react';

export default function ProductCategory({ isDark }) {
  const categories = [
    { id: 1, name: "Audio & Music", products: 145, color: "blue", icon: "🎧", description: "Headphones, Speakers, Professional gear" },
    { id: 2, name: "Computing", products: 89, color: "indigo", icon: "💻", description: "Laptops, Monitors, High-speed Tablets" },
    { id: 3, name: "Mobile & Wearables", products: 234, color: "purple", icon: "📱", description: "Smartphones, Rings, Smart Watches" },
    { id: 4, name: "Gaming & Entertainment", products: 56, color: "rose", icon: "🎮", description: "Consoles, Peripherals, Digital cameras" },
    { id: 5, name: "Extras", products: 78, color: "emerald", icon: "🔌", description: "Accessories, Laptop stands, Smart home" },
  ];

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
      {/* Header */}
      <div className={`px-6 py-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"
        }`}>
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Categories
          </h2>
          <p className={`text-sm mt-1 font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            Organize your product catalog by type.
          </p>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg ${isDark ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/10" : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"
          }`}>
          <IconPlus size={18} stroke={2.5} />
          Create Category
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-6">


        {/* Categories List View */}
        <div className={`border rounded-2xl overflow-hidden ${isDark ? "bg-gray-900/50 border-gray-800 shadow-2xl" : "bg-white border-gray-100 shadow-sm"
          }`}>
          <div className="p-5 border-b border-gray-100">
            <h3 className={`text-sm font-bold ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              All Categories
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className={`${isDark ? "bg-gray-950/40 text-gray-500" : "bg-gray-50/50 text-gray-400"} text-xs font-bold`}>
                  <th className="px-6 py-4">Category Name</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Total Products</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}>
                {categories.map((category) => (
                  <tr key={category.id} className={`group transition-all duration-200 ${isDark ? "hover:bg-gray-800/30" : "hover:bg-gray-50/50"}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
                          {category.icon}
                        </div>
                        <span className={`text-sm font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>{category.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-medium text-gray-500 italic">{category.description}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-black ${isDark ? "text-white" : "text-gray-900"}`}>{category.products}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter ${isDark ? "bg-emerald-500/10 text-emerald-500" : "bg-emerald-50 text-emerald-600"
                        }`}>
                        Published
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className={`p-1.5 rounded-lg transition-all ${isDark ? "text-gray-600 hover:text-white hover:bg-gray-700" : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"}`}>
                        <IconDotsVertical size={18} />
                      </button>
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
