import { Products } from '../models/products.js'

export const getAllProducts = async () => {
    const getProducts = await Products.find({});

    return getProducts.map(product => ({
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        images: product.images,
        isActive: product.isActive
    }));
};

export const getProductById = async (id: string) => {
    const uniqueProduct = await Products.findById(id);
    if (!uniqueProduct) {
        throw new Error('Product not found');
    }
    return uniqueProduct;
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
    
    return {
        id: newProduct._id,
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,
        stock: newProduct.stock,
        images: newProduct.images,
        isActive: newProduct.isActive
    };
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

