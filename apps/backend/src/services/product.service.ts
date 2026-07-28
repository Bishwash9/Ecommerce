import { Products } from '../models/products.js'
import type { ICategory } from '../models/products.js'



export const getAllProducts = async () => {

    const getProducts = await Products.find({}).populate<{category: ICategory}>({
        path: 'category',
        select: 'name'
    });

    return getProducts.map(product => ({
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.category?._id,
        categoryName: product.category?.name,
        stock: product.stock,
        inStock: product.stock > 0,
        images: product.images,
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
    }));
};

export const getProductById = async (id: string) => {
    const uniqueProduct = await Products.findById(id).populate<{category: ICategory}>({
        path: 'category',
        select: 'name'
    });
    
    if (!uniqueProduct) {
        throw new Error('Product not found');
    }
    
    return {
        id: uniqueProduct._id,
        name: uniqueProduct.name,
        description: uniqueProduct.description,
        price: uniqueProduct.price,
        categoryId: uniqueProduct.category?._id,
        categoryName: uniqueProduct.category?.name,
        stock: uniqueProduct.stock,
        inStock: uniqueProduct.stock > 0,
        images: uniqueProduct.images,
        isActive: uniqueProduct.isActive,
        createdAt: uniqueProduct.createdAt,
        updatedAt: uniqueProduct.updatedAt
    };
};


export const createProduct = async (name: string, description: string, price: number, category: string, stock: number, images: string[], isActive: boolean) => {
    const existingProduct = await Products.findOne({name});
    if(existingProduct){
        throw new Error('Product already exists');
    }

    const newProduct = new Products({
        name,
        description,
        price,
        category,
        stock,
        images,
        isActive
    });

    await newProduct.save();
    
    const populatedProduct = await Products.findById(newProduct._id).populate<{category: ICategory}>({
        path: 'category',
        select: 'name'
    });

    if(!populatedProduct) {
        throw new Error('Created product not found after saving');
    }

    return {
        id: populatedProduct._id,
        name: populatedProduct.name,
        description: populatedProduct.description,
        price: populatedProduct.price,
        categoryId: populatedProduct.category?._id,
        categoryName: populatedProduct.category?.name,
        stock: populatedProduct.stock,
        inStock: populatedProduct.stock > 0,
        images: populatedProduct.images,
        isActive: populatedProduct.isActive,
        createdAt: populatedProduct.createdAt,
        updatedAt: populatedProduct.updatedAt
    }
};

export const editProduct = async (id: string, name: string, description: string, price: number, stock: number, images: string[], isActive: boolean) => {
    const productToEdit = await Products.findById(id);
    if(!productToEdit){
        throw new Error('Product not found');
    }

    productToEdit.name = name;
    productToEdit.description = description;
    productToEdit.price = price;
    productToEdit.stock = stock;
    productToEdit.images = images;
    productToEdit.isActive = isActive;

    await productToEdit.save();

    return {
        id: productToEdit._id,
        name: productToEdit.name,
        description: productToEdit.description,
        price: productToEdit.price,
        category: productToEdit.category,
        stock: productToEdit.stock,
        inStock: productToEdit.stock > 0,
        images: productToEdit.images,
        isActive: productToEdit.isActive
    };
};

export const deleteProduct = async (id: string) => {
    const productToDelete = await Products.findById(id);
    if(!productToDelete){
        throw new Error('Product not found');
    }

    await productToDelete.deleteOne();

    return {
        message: 'Product deleted successfully'
    };
};

