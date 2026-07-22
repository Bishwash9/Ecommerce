import type { Category } from '../../Types/category';
import { useInvetoryStore } from '../../Store/useInventoryStore';

import { useAuth } from '../../Context/AuthContext';
import { useEffect, useMemo, useState } from 'react';
import { Box, Filter, PlusCircle, Search, Trash, Edit } from 'lucide-react'

interface InventoryContentProps {
    categories: Category[];
    onAddCategory?: () => void;
    onEditCategory?: (category: Category) => void;
    onDeleteCategory?: (id: string) => void;
}

export const InventoryContent = ({ categories, onAddCategory, onEditCategory, onDeleteCategory }: InventoryContentProps) => {

    const { user } = useAuth();
    const { fetchCategories } = useInvetoryStore();

    const [search, setSearch] = useState('');
    const [filterCategories, setFilterCategories] = useState<string>('All');

    const filteredCategories = useMemo(() => {
        return categories.filter((category) => {
            const matchesSearch = category.name.toLowerCase().includes(search.toLowerCase());

            const matchesFilter = filterCategories === 'All' || category.name === filterCategories;

            return matchesSearch && matchesFilter;
        })
    }, [categories, search, filterCategories]);



    //on mount fetch categories
    useEffect(() => {
        if(!user) return;
        fetchCategories();
    }, [user, fetchCategories]);

    
    return (
        <div className='p-7 flex flex-col gap-6'>

            <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold text-gray-800'><Box size={18} /> Inventory</h2>
            </div>
            {onAddCategory && (
                <button className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-4 py-2.5 rounded-lg transition-colors duration-300' onClick={onAddCategory}>
                    <PlusCircle size={16} /> Add Category
                </button>
            )}

            <div className='flex items-center justify-between'>
                <div className='relative w-full md:flex-1'>
                    <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                    <input
                    type='text'
                    placeholder='Search categories...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-lg border border-gray-300 focus:border-indigo-400 focus:outline-none text-sm text-gray-600 placeholder-gray-400 font-medium transition-colors'
                    />

                </div>
                <div className='relative group shrink-0'>
                    <div className='flex items-center justify-center w-10 h-10 bg-gray-50 border border-gray-300 rounded-lg text-gray-600 cursor-pointer transition-colors hover:bg-gray-100'>
                        <Filter size={18} />

                        <select 
                        value={filterCategories}
                        onChange={(e) => setFilterCategories(e.target.value)}
                        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer text-sm font-medium text-gray-600'
                        >
                            <option value='All'>All</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

            </div>

            <div className='bg-white border border-gray-100 rounded-xl overflow-hidden'>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-gray-50/60 border-b border-gray-50'>
                            <th className='text-left text-[11px] font-medium text-gray-400 px-5 py-3'>Product</th>
                            <th className='text-left text-[11px] font-medium text-gray-400 px-5 py-3'>Category</th>
                            <th className='text-left text-[11px] font-medium text-gray-400 px-5 py-3'>Price</th>
                            <th className='text-left text-[11px] font-medium text-gray-400 px-5 py-3'>Stock</th>
                            <th className='text-left text-[11px] font-medium text-gray-400 px-5 py-3'>Actions</th>
                        </tr>

                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                            
                    </tbody>

                </table>

            </div>
            <div className='bg-white border border-gray-100 rounded-xl overflow-hidden'>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-gray-50/60 border-b border-gray-50'>
                            <th className='text-left text-[11px] font-medium text-gray-400 px-5 py-3'>Category</th>
                            <th className='text-left text-[11px] font-medium text-gray-400 px-5 py-3'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                            {categories.map((category) => ( 
                                <tr key={category.id} className='hover:bg-gray-50/50 transition-colors duration-300'>
                                    <td className='px-5 py-3 text-sm font-medium text-gray-600'>{category.name}</td>
                                    <td className='px-5 py-3 text-sm font-medium text-gray-600'>
                                        <div className='flex items-center space-x-2'>
                                            <button className='text-blue-500 hover:text-blue-700' onClick={() =>  onEditCategory?.(category)}>
                                                <Edit size={16} />
                                            </button>
                                            <button className='text-red-500 hover:text-red-700' onClick={() => onDeleteCategory?.(category.id)}>
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

        </div>
    )

}