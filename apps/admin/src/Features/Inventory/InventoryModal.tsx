
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
import { useEffect, useState } from 'react';




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
    const [imageFile, setImageFile] = useState<File[]>([]);
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
                brand: editingProduct?.brand ?? '',
                tags: editingProduct?.tags?.join(', ') ?? '',
            }
            : {
                name: '',
                description: '',
                price: 0,
                stock: 0,
                categoryId: '',
                images: [],
                isActive: true,
                brand: '',
                tags: '',
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
                brand: editingProduct.brand,
                tags: editingProduct.tags?.join(', ') ?? '',
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
            brand: '',
            tags: '',
        });
    }, [editingProduct, reset]);



    const onSubmit = async (data: AddProductFormValues | EditProductFormValues) => {
        const imageUrls = imageFile.length ? await productService.uploadProductImages(imageFile): data.images ?? []
        const tags = data.tags
            .split(',')
            .map((tag) => tag.trim().toLowerCase())
            .filter(Boolean);

        if (editingProduct) {
            const editProductData = data as EditProductFormValues;
            const updatedProduct = await productService.editProduct(
                editingProduct.id,
                editProductData.name,
                editProductData.description as string,
                editProductData.price,
                editProductData.stock,
                imageUrls,
                editProductData.isActive,
                editProductData.brand,
                tags,
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
            imageUrls,
            addProductData.isActive,
            addProductData.brand,
            tags,
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
                    <label className='block text-xs font-medium text-gray-500 mb-1'>Brand</label>
                    <input
                        type='text'
                        placeholder='Enter Brand Name'
                        {...register('brand')}
                        className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm'
                    />
                    {errors.brand && <p className='text-red-500 text-xs'>{errors.brand.message}</p>}
                </div>

                <div>
                    <label className='block text-xs font-medium text-gray-500 mb-1'>Tags</label>
                    <input
                        type='text'
                        placeholder='Enter tags separated by commas'
                        {...register('tags')}
                        className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm'
                    />
                    {errors.tags && <p className='text-red-500 text-xs'>{errors.tags.message}</p>}
                </div>
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
                    id='product-images'
                    type='file'
                    multiple
                    accept='image/jpeg,image/png,image/webp'
                    onChange={(event) => {
                        setImageFile(Array.from(event.target.files ?? []));
                    }}
                    className='hidden'
                />

                <label
                    htmlFor='product-images'
                    className='flex w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 px-3 py-3 text-sm font-medium text-gray-600 transition-colors hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600'
                >
                    {imageFile.length
                        ? `${imageFile.length} ${imageFile.length === 1 ? 'image' : 'images'} selected`
                        : 'Choose product images'}
                </label>

                {imageFile.map((file) => (
                    <p key={`${file.name}-${file.lastModified}`} className='mt-1 text-xs text-gray-500'>
                        {file.name}
                    </p>
                ))}
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
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4'>
            <div
                className={`max-h-[90vh] w-full overflow-y-auto rounded-xl border-gray-100 bg-white p-6 shadow-lg sm:p-7 ${
                    isProduct ? 'max-w-2xl' : 'max-w-md'
                }`}
            >
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
