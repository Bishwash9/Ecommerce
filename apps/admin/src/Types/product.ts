export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryName: string;
    categoryId: string;
    stock: number;
    images: string[];
    isActive: boolean;
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
    images: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface EditProductRequest {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    isActive: boolean;
}