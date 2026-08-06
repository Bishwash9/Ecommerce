export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId?: string;
    categoryName?: string;
    stock: number;
    inStock: boolean;
    images: string[];
    isActive: boolean;
    brand: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}