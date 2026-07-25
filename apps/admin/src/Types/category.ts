export interface Category {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCategoryRequest {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string
}

export interface EditCategoryRequest {
    id: string;
    name: string;
}