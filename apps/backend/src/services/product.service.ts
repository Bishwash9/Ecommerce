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
        brand: product.brand,
        tags: product.tags,
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
        brand: uniqueProduct.brand,
        tags: uniqueProduct.tags,
        createdAt: uniqueProduct.createdAt,
        updatedAt: uniqueProduct.updatedAt
    };
};



export const createProduct = async (name: string, description: string, price: number, category: string, stock: number, images: string[], isActive: boolean, brand: string, tags: string[]) => {
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
        brand,
        tags,
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
        brand: populatedProduct.brand,
        tags: populatedProduct.tags,
        isActive: populatedProduct.isActive,
        createdAt: populatedProduct.createdAt,
        updatedAt: populatedProduct.updatedAt
    }
};

export const editProduct = async (id: string, name: string, description: string, price: number, stock: number, images: string[], isActive: boolean, brand: string, tags: string[]) => {
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
    productToEdit.brand = brand;
    productToEdit.tags = tags;

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
        isActive: productToEdit.isActive,
        brand: productToEdit.brand,
        tags: productToEdit.tags,
        
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

export const getFeaturedProducts = async () => {
     const featuredProducts = await Products.find({
        isActive: true,
        stock: { $gt: 0},
        tags: { $in: ["bestseller", "trending", "new"]},
     }).populate<{category: ICategory}>({
        path: 'category',
        select: 'name'
     }).sort({ createdAt: -1 }).limit(4);


     if(!featuredProducts || featuredProducts.length === 0) {
        throw new Error('No featured products found');
     }

     return featuredProducts.map(prod => ({
        id: prod._id,
        name: prod.name,
        description: prod.description,
        price: prod.price,
        categoryId: prod.category?._id,
        categoryName: prod.category?.name,
        stock: prod.stock,
        inStock: prod.stock > 0,
        images: prod.images,
        isActive: prod.isActive,
        brand: prod.brand,
        tags: prod.tags,
        createdAt: prod.createdAt,
        updatedAt: prod.updatedAt
     }));
}

