export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    images: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateProductRequest {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    images: string[];
    isActive: boolean;
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