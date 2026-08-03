export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryName: string;
    categoryId: string;
    stock: number;
    inStock: boolean;
    images: string[];
    isActive: boolean;
    brand: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateProductRequest {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryName: string;
    categoryId: string;
    stock: number;
    inStock: boolean;
    images: string[];
    isActive: boolean;
    brand: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface EditProductRequest {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    inStock: boolean;
    images: string[];
    isActive: boolean;
    brand: string;
    tags: string[];
}
