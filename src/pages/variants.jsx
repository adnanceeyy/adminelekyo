import React, { useState, useEffect } from 'react';
import {
    IconPlus,
    IconSearch,
    IconX,
    IconLink,
    IconTrash
} from '@tabler/icons-react';
import ProductService from '../services/product.service';
import VariantGroupService from '../services/variantGroup.service';
import API_CONFIG from '../config/api.config';
import { toast } from 'react-hot-toast';

export default function VariantsPage({ isDark }) {
    const [products, setProducts] = useState([]); // All products
    const [groups, setGroups] = useState([]);     // All persistent groups
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // State for Grouping
    const [selectedGroup, setSelectedGroup] = useState(null); // The full group object
    const [isEditingGroup, setIsEditingGroup] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupDesc, setNewGroupDesc] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    // Products currently in the selected group (derived from products list)
    const [groupProducts, setGroupProducts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Filter available products for search
        if (searchQuery) {
            const lower = searchQuery.toLowerCase();
            setFilteredProducts(products.filter(p =>
                p.name.toLowerCase().includes(lower) ||
                (p.category && p.category.toLowerCase().includes(lower)) ||
                (p.variantGroup && p.variantGroup.toLowerCase().includes(lower))
            ));
        } else {
            setFilteredProducts(products);
        }
    }, [searchQuery, products]);

    // Update groupProducts whenever products or selectedGroup changes
    useEffect(() => {
        if (selectedGroup) {
            const grouped = products.filter(p => p.variantGroup === selectedGroup.name);
            setGroupProducts(grouped);
        }
    }, [products, selectedGroup]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [productsData, groupsData] = await Promise.all([
                ProductService.getAllProducts(),
                VariantGroupService.getAllGroups()
            ]);
            setProducts(productsData);
            setGroups(groupsData);
        } catch (err) {
            toast.error(err.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    // Create Group
    const handleCreateGroup = async (e) => {
        e.preventDefault();
        if (!newGroupName.trim()) {
            toast.error("Group name is required");
            return;
        }

        try {
            const newGroup = await VariantGroupService.addGroup({
                name: newGroupName,
                description: newGroupDesc
            });
            toast.success("Group created successfully");
            setGroups(prev => [newGroup, ...prev]); // Add to list

            // Reset form
            setNewGroupName('');
            setNewGroupDesc('');
            setIsCreating(false);

            // Select it immediately
            handleEditGroup(newGroup);
        } catch (err) {
            toast.error(err.message || "Failed to create group");
        }
    };

    const handleDeleteGroup = async (e, groupId) => {
        e.stopPropagation();
        if (!window.confirm("Delete this group? Products will be unlinked (but not deleted).")) return;

        try {
            await VariantGroupService.deleteGroup(groupId);
            // Remove from list
            setGroups(prev => prev.filter(g => g._id !== groupId));
            // Update local products to reflect unlink
            const group = groups.find(g => g._id === groupId);
            if (group) {
                setProducts(prev => prev.map(p => p.variantGroup === group.name ? { ...p, variantGroup: undefined } : p));
            }

            if (selectedGroup && selectedGroup._id === groupId) {
                setIsEditingGroup(false);
                setSelectedGroup(null);
            }
            toast.success("Group deleted");
        } catch (err) {
            toast.error("Failed to delete group");
        }
    };

    const handleEditGroup = (group) => {
        setSelectedGroup(group);
        setIsEditingGroup(true);
        setIsCreating(false);
    };

    const handleAddToGroup = async (product) => {
        if (product.variantGroup === selectedGroup.name) return;

        try {
            const payload = { variantGroup: selectedGroup.name };
            await ProductService.updateProduct(product._id, payload);
            toast.success(`${product.name} added to group`);

            // Update local state
            setProducts(prev => prev.map(p => p._id === product._id ? { ...p, variantGroup: selectedGroup.name } : p));
        } catch (err) {
            toast.error("Failed to link product");
        }
    };

    const handleRemoveFromGroup = async (product) => {
        try {
            const payload = { variantGroup: "" };
            await ProductService.updateProduct(product._id, payload);
            toast.success(`${product.name} removed from group`);

            // Update local state
            setProducts(prev => prev.map(p => p._id === product._id ? { ...p, variantGroup: undefined } : p));
        } catch (err) {
            toast.error("Failed to unlink product");
        }
    };

    return (
        <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? "bg-gray-950" : "bg-[#f8fafc]"}`}>
            {/* Header */}
            <div className={`px-6 py-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"}`}>
                <div>
                    <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                        Variant Groups
                    </h2>
                    <p className={`text-sm mt-1 font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                        Manage product families (e.g. "iPhone 15 Series"). Add products to groups to link them as variants.
                    </p>
                </div>

                <button
                    onClick={() => { setIsCreating(true); setIsEditingGroup(false); setSelectedGroup(null); }}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm flex items-center gap-2"
                >
                    <IconPlus size={18} /> New Group
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* LEFT: Group List */}
                <div className={`w-1/3 border-r overflow-y-auto ${isDark ? "border-gray-800 bg-gray-950/50" : "border-gray-100 bg-white"}`}>
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                        <h3 className={`text-xs font-black uppercase tracking-wider ${isDark ? "text-gray-400" : "text-gray-500"}`}>All Groups ({groups.length})</h3>
                    </div>
                    <div className="p-2 space-y-1">
                        {groups.length === 0 && (
                            <div className="text-center py-10 text-gray-500 text-xs">No groups found.</div>
                        )}
                        {groups.map(group => (
                            <div
                                key={group._id}
                                onClick={() => handleEditGroup(group)}
                                className={`p-3 rounded-lg cursor-pointer flex justify-between items-center group transition-all ${selectedGroup && selectedGroup._id === group._id ? (isDark ? "bg-blue-600/20 text-blue-400" : "bg-blue-50 text-blue-700") : (isDark ? "text-gray-300 hover:bg-gray-900" : "text-gray-700 hover:bg-gray-50")}`}
                            >
                                <div className="min-w-0">
                                    <p className="font-bold text-sm truncate">{group.name}</p>
                                    <p className="text-[10px] text-gray-500 truncate">{group.description || "No description"}</p>
                                </div>
                                <button onClick={(e) => handleDeleteGroup(e, group._id)} className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-opacity">
                                    <IconTrash size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Content Area */}
                <div className={`flex-1 flex flex-col ${isDark ? "bg-gray-900/20" : "bg-gray-50/50"}`}>

                    {/* 1. CREATION FORM */}
                    {isCreating && (
                        <div className="flex-1 flex items-center justify-center p-8">
                            <form onSubmit={handleCreateGroup} className={`w-full max-w-md p-8 rounded-2xl shadow-xl border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
                                <h3 className={`text-xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>Create New Group</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className={`block text-xs font-bold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Group Name (Unique)</label>
                                        <input
                                            autoFocus
                                            type="text"
                                            required
                                            placeholder="e.g. Galaxy S24 Series"
                                            value={newGroupName}
                                            onChange={e => setNewGroupName(e.target.value)}
                                            className={`w-full px-4 py-3 rounded-xl text-sm font-bold border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-white border-gray-200 text-gray-900"}`}
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-xs font-bold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>Description</label>
                                        <textarea
                                            placeholder="Optional description..."
                                            value={newGroupDesc}
                                            onChange={e => setNewGroupDesc(e.target.value)}
                                            className={`w-full px-4 py-3 rounded-xl text-sm font-bold border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${isDark ? "bg-gray-950 border-gray-800 text-white" : "bg-white border-gray-200 text-gray-900"}`}
                                            rows={3}
                                        />
                                    </div>
                                    <div className="pt-2 flex gap-3">
                                        <button type="button" onClick={() => setIsCreating(false)} className={`flex-1 py-3 rounded-xl font-bold text-sm border ${isDark ? "border-gray-800 hover:bg-gray-800 text-gray-400" : "border-gray-200 hover:bg-gray-50 text-gray-600"}`}>Cancel</button>
                                        <button type="submit" className="flex-1 py-3 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20">Create Group</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* 2. EDITING GROUP */}
                    {isEditingGroup && selectedGroup && (
                        <>
                            <div className={`p-4 border-b flex items-center justify-between ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
                                <div>
                                    <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                                        {selectedGroup.name}
                                    </h3>
                                    <p className="text-xs text-gray-500">{selectedGroup.description || "Manage products in this group"}</p>
                                </div>
                                <button onClick={() => { setIsEditingGroup(false); setSelectedGroup(null); }} className={`p-2 rounded-lg ${isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
                                    <IconX size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6">
                                {/* Currently in Group */}
                                <div className="mb-8">
                                    <h4 className={`text-sm font-bold mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Linked Products ({groupProducts.length})</h4>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                        {groupProducts.map(product => (
                                            <div key={product._id} className={`p-3 rounded-xl border flex items-center gap-3 ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                                    {product.image ? <img src={API_CONFIG.getAssetUrl(product.image)} className="w-full h-full object-cover" /> : null}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm font-bold truncate ${isDark ? "text-white" : "text-gray-900"}`}>{product.name}</p>
                                                    <p className="text-xs text-gray-500">{product.color || "No Color"}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveFromGroup(product)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg hover:text-red-600 transition-colors"
                                                    title="Unlink"
                                                >
                                                    <IconLink size={16} className="rotate-45" /> <span className="sr-only">Unlink</span>
                                                </button>
                                            </div>
                                        ))}
                                        {groupProducts.length === 0 && (
                                            <div className="col-span-2 py-8 text-center border-2 border-dashed rounded-xl border-gray-300 dark:border-gray-700 text-gray-400 text-sm">
                                                No products linked yet. Search and add below.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Available to Add */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className={`text-sm font-bold ${isDark ? "text-gray-300" : "text-gray-700"}`}>Add Products</h4>
                                        <div className="relative w-64">
                                            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input
                                                type="text"
                                                placeholder="Search products..."
                                                className={`w-full pl-9 pr-4 py-2 rounded-lg text-xs font-bold border ${isDark ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-200"}`}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                                        {filteredProducts.filter(p => p.variantGroup !== selectedGroup.name).map(product => (
                                            <button
                                                key={product._id}
                                                onClick={() => handleAddToGroup(product)}
                                                className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all ${product.variantGroup
                                                        ? (isDark ? "bg-gray-900/50 border-gray-800 opacity-50 cursor-not-allowed" : "bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed")
                                                        : (isDark ? "bg-gray-900 border-gray-800 hover:border-blue-500 hover:bg-blue-900/10" : "bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50")
                                                    }`}
                                                disabled={!!product.variantGroup}
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                                    {product.image ? <img src={API_CONFIG.getAssetUrl(product.image)} className="w-full h-full object-cover" /> : null}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-xs font-bold truncate ${isDark ? "text-white" : "text-gray-900"}`}>{product.name}</p>
                                                    <p className="text-[10px] text-gray-500">{product.variantGroup ? `In: ${product.variantGroup}` : "Unassigned"}</p>
                                                </div>
                                                {!product.variantGroup && <IconPlus size={16} className="text-gray-400 group-hover:text-blue-500" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* 3. EMPTY STATE */}
                    {!isCreating && !isEditingGroup && (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 mb-4 flex items-center justify-center">
                                <IconLink size={32} />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Select a Group</h3>
                            <p className="text-sm max-w-xs">Select a group from the list to manage its products, or create a new one.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
