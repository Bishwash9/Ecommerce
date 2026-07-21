
import { categoryService } from '../../Services/categoryService';
import type { Category } from '../../Types/category';
import { useInvetoryStore } from '../../Store/useInventoryStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, type CategoryData } from '../../Schemas/category.schema';
import { X } from 'lucide-react';


interface InventoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingCategory?: Category | null;

}

export const InventoryModal = ({ isOpen, onClose, editingCategory }: InventoryModalProps) => {

   

    const { addCategory, editCategory } = useInvetoryStore();


    //initialize react hook form with zod resolver
    const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<CategoryData>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: editingCategory?.name || '',
        }
    });

    //handle form submission
    const onSubmit = async (data: CategoryData) => {

        try{
            if(editingCategory){
                const updatedCategory = await categoryService.editCategory(editingCategory.id, data.name);
                //update category in store
                editCategory(editingCategory.id, updatedCategory.name);
            }else{
                const newCategory = await categoryService.createCategory(data.name);
                //add category to store
                addCategory(newCategory);
            }
            onClose();
        }catch(error){
            console.error('Error submitting category:', error);
        }
    }

    if(!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black/30 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-xl border-gray-100 shadow-lg w-90 max-w-md'>
                <div className='flex items-center justify-between mb-5'>
                    <h2 className='text-lg font-semibold text-gray-800'>{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
                    <button
                    onClick={onClose}
                    className='text-gray-400 hover:text-red-600 transition-colors duration-300'
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <div>
                        <label className='block text-xs font-medium text-gray-500 mb-1'>Category Name</label>
                        <input
                            type='text'
                            placeholder='Enter category name'
                            {...register('name')}
                            className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-400 transition-colors placeholder-gray-300 '
                        />
                        {errors.name && <span className='text-red-500 text-xs'>{errors.name.message}</span>}
                    </div>

                    <button className='bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300' type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save Category'}
                    </button>
                </form>
            </div>
        </div>
    )

}