import { useState, useEffect } from 'react';
import { IconEdit, IconTrash, IconPlus, IconX, IconCheck, IconLoader, IconDotsVertical } from '@tabler/icons-react';
import CategoryService from '../services/category.service';
import { toast } from 'react-hot-toast';

export default function ProductCategory({ isDark }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'blue',
    icon: '📦'
  });

  const colors = ['blue', 'indigo', 'purple', 'rose', 'emerald', 'amber', 'cyan', 'slate'];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await CategoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      color: 'blue',
      icon: '📦'
    });
    setEditingCategory(null);
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
        color: category.color || 'blue',
        icon: category.icon || '📦'
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await CategoryService.updateCategory(editingCategory._id, formData);
        toast.success('Category updated successfully');
      } else {
        await CategoryService.addCategory(formData);
        toast.success('Category created successfully');
      }
      setIsModalOpen(false);
      fetchCategories();
      resetForm();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await CategoryService.deleteCategory(id);
      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (err) {
      toast.error(err.message || 'Failed to delete category');
    }
  };

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
      {/* Header */}
      <div className={`px-6 py-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"}`}>
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Categories
          </h2>
          <p className={`text-sm mt-1 font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            Organize your product catalog by type.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg hover:scale-105 active:scale-95 ${isDark ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/10" : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"}`}
        >
          <IconPlus size={18} stroke={2.5} />
          Create Category
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
        {/* Categories List View */}
        <div className={`border rounded-2xl overflow-hidden ${isDark ? "bg-gray-900/50 border-gray-800 shadow-2xl" : "bg-white border-gray-100 shadow-sm"}`}>
          <div className="p-5 border-b border-gray-100">
            <h3 className={`text-sm font-bold ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              All Categories ({categories.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className={`${isDark ? "bg-gray-950/40 text-gray-500" : "bg-gray-50/50 text-gray-400"} text-xs font-bold`}>
                  <th className="px-6 py-4">Category Name</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Total Products</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-20 text-center">
                      <div className="flex justify-center"><IconLoader className="animate-spin text-blue-500" /></div>
                    </td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-10 text-center text-gray-500">No categories found. Create one!</td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category._id} className={`group transition-all duration-200 ${isDark ? "hover:bg-gray-800/30" : "hover:bg-gray-50/50"}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
                            {category.icon || '📦'}
                          </div>
                          <span className={`text-sm font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>{category.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[11px] font-medium text-gray-500 italic truncate max-w-[200px] block">{category.description}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                          {category.products || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenModal(category)}
                            className={`p-1.5 rounded-lg transition-all ${isDark ? "text-blue-400 hover:bg-blue-500/10" : "text-blue-600 hover:bg-blue-50"}`}
                          >
                            <IconEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(category._id)}
                            className={`p-1.5 rounded-lg transition-all ${isDark ? "text-rose-400 hover:bg-rose-500/10" : "text-rose-600 hover:bg-rose-50"}`}
                          >
                            <IconTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white"}`}>
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className={`p-1 rounded-lg ${isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}
              >
                <IconX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Category Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium border focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                  placeholder="e.g. Electronics"
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium border focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                  placeholder="Short description..."
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Color Theme</label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium border focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                  >
                    {colors.map(color => (
                      <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Icon (Emoji)</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium border focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                    placeholder="e.g. 💻"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${isDark ? "border-gray-800 text-gray-400 hover:bg-gray-800" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all`}
                >
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
