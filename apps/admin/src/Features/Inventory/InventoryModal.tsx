
import { categoryService } from '../../Services/categoryService';
import { productService } from '../../Services/productService';
import type { Category } from '../../Types/category';
import type { Product } from '../../Types/product';
import { useInvetoryStore } from '../../Store/useInventoryStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, type CategoryData } from '../../Schemas/category.schema';
import { addProductSchema, editProductSchema, type AddProductData, type EditProductData } from '../../Schemas/product.schema';
import { X } from 'lucide-react';
import { useEffect } from 'react';


interface InventoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingCategory?: Category | null;
    editingProduct?: Product | null;
    isProductMode?: boolean;
}

type CategoryFormValues = CategoryData;
type AddProductFormValues = AddProductData;
type EditProductFormValues = EditProductData;

const CategoryForm = ({
    editingCategory,
    onSuccess,
}: {
    editingCategory?: Category | null;
    onSuccess: () => void;
}) => {
    const { addCategory, editCategory } = useInvetoryStore();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: editingCategory?.name ?? '',
        },
    });

    useEffect(() => {
        reset({
            name: editingCategory?.name ?? '',
        });
    }, [editingCategory, reset]);

    const onSubmit = async (data: CategoryFormValues) => {
        if (editingCategory) {
            const updatedCategory = await categoryService.editCategory(editingCategory.id, data.name);
            editCategory(editingCategory.id, { name: updatedCategory.name });
        } else {
            const newCategory = await categoryService.createCategory(data.name);
            addCategory(newCategory);
        }

        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Category Name</label>
                <input
                    type="text"
                    placeholder="Enter category name"
                    {...register('name')}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            <button type='submit' disabled={isSubmitting} className='bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300'>
                {isSubmitting ? 'Saving...' : 'Save Category'}
            </button>
        </form>
    );
};

const ProductForm = ({
    editingProduct,
    onSuccess,
}: {
    editingProduct?: Product | null;
    onSuccess: () => void;
}) => {
    const { addProduct, editProduct, categories } = useInvetoryStore();

    const isEditingProduct = Boolean(editingProduct);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AddProductFormValues | EditProductFormValues>({
        resolver: zodResolver(isEditingProduct ? editProductSchema : addProductSchema),
        defaultValues: isEditingProduct
            ? {
                name: editingProduct?.name ?? '',
                description: editingProduct?.description ?? '',
                price: editingProduct?.price ?? 0,
                stock: editingProduct?.stock ?? 0,
                images: editingProduct?.images ?? [],
                isActive: editingProduct?.isActive ?? true,
            }
            : {
                name: '',
                description: '',
                price: 0,
                stock: 0,
                categoryId: '',
                images: [],
                isActive: true,
            },
    });

    useEffect(() => {
        if (editingProduct) {
            reset({
                name: editingProduct.name,
                description: editingProduct.description,
                price: editingProduct.price,
                stock: editingProduct.stock,
                images: editingProduct.images,
                isActive: editingProduct.isActive,
            });
            return;
        }

        reset({
            name: '',
            description: '',
            price: 0,
            stock: 0,
            categoryId: '',
            images: [],
            isActive: true,
        });
    }, [editingProduct, reset]);

    const onSubmit = async (data: AddProductFormValues | EditProductFormValues) => {
        if (editingProduct) {
            const editProductData = data as EditProductFormValues;
            const updatedProduct = await productService.editProduct(
                editingProduct.id,
                editProductData.name,
                editProductData.description as string,
                editProductData.price,
                editProductData.stock,
                editProductData.images as string[],
                editProductData.isActive,
            );

            editProduct(editingProduct.id, updatedProduct);
            onSuccess();
            return;
        }

        const addProductData = data as AddProductFormValues;
        const newProduct = await productService.createProduct(
            addProductData.name,
            addProductData.description as string,
            addProductData.price,
            addProductData.stock,
            addProductData.categoryId,
            addProductData.images as string[],
            addProductData.isActive,
        );

        addProduct(newProduct);
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Product Name</label>
                <input
                    type='text'
                    {...register('name')}
                    className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm'
                />
                {errors.name && <p className='text-red-500 text-xs'>{errors.name.message}</p>}
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                <textarea
                    {...register('description')}
                    className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm'
                />
                {errors.description && <p className='text-red-500 text-xs'>{errors.description.message}</p>}
            </div>

            <div className='grid grid-cols-2 gap-3'>
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Price</label>
                    <input
                        type='number'
                        step='any'
                        {...register('price', { valueAsNumber: true })}
                        className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm'
                    />
                    {errors.price && <p className='text-red-500 text-xs'>{errors.price.message}</p>}
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Stock</label>
                    <input
                        type='number'
                        {...register('stock', { valueAsNumber: true })}
                        className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm'
                    />
                    {errors.stock && <p className='text-red-500 text-xs'>{errors.stock.message}</p>}
                </div>
            </div>

            {editingProduct ? (
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                    <select
                        value={editingProduct.categoryId}
                        disabled
                        className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-100 cursor-not-allowed'
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <div>
                    <label className='block text-xs font-medium text-gray-500 mb-1'>Category</label>
                    <select {...register('categoryId')} className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm'>
                        <option value=''>Select category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {'categoryId' in errors && errors.categoryId && <p className='text-red-500 text-xs'>{errors.categoryId.message}</p>}
                </div>
            )}

            <div>
                <label className='block text-xs font-medium text-gray-500 mb-1'>Images</label>
                <input
                    type='text'
                    placeholder='Paste image URL'
                    {...register('images.0')}
                    className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm'
                />
            </div>

            <div className='flex items-center gap-2'>
                <input type='checkbox' {...register('isActive')} />
                <label className='text-sm text-gray-600'>Active</label>
            </div>

            <button type='submit' disabled={isSubmitting} className='bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300'>
                {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
        </form>
    );
};

export const InventoryModal = ({ isOpen, onClose, editingCategory, editingProduct, isProductMode = false }: InventoryModalProps) => {
    const isProduct = isProductMode || Boolean(editingProduct);
    const isEditing = Boolean(editingCategory || editingProduct);

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black/30 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-xl border-gray-100 shadow-lg w-90 max-w-md'>
                <div className='flex items-center justify-between mb-5'>
                    <h2 className='text-lg font-semibold text-gray-800'>
                        {isEditing ? `Edit ${isProduct ? 'Product' : 'Category'}` : `Add ${isProduct ? 'Product' : 'Category'}`}
                    </h2>
                    <button onClick={onClose} className='text-gray-400 hover:text-red-600 transition-colors duration-300'>
                        <X size={20} />
                    </button>
                </div>

                {isProduct ? (
                    <ProductForm editingProduct={editingProduct} onSuccess={onClose} />
                ) : (
                    <CategoryForm editingCategory={editingCategory} onSuccess={onClose} />
                )}
            </div>
        </div>
    );
};