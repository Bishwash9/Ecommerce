import { apiClient } from "../Config/api";
import type { CreateCategoryRequest, EditCategoryRequest, Category } from "../Types/category";

export const categoryService = {
    createCategory: async (name: string): Promise<CreateCategoryRequest> => {
         
        const createData = await apiClient('/categories/create-category', {
            method: 'POST',
            body: JSON.stringify({ name }),
        });

        if(!createData.data) {
            console.error('Failed to create category');
            throw new Error('Failed to create category');
        }

        return createData.data;
    },

    editCategory: async (id: string, name: string): Promise<EditCategoryRequest> => {

        const editData = await apiClient(`/categories/edit-category/${id}`, {
            method: 'PUT',
            body: JSON.stringify({name}),
        });

        if(!editData.data) {
            console.error('Failed to edit category');
            throw new Error('Failed to edit category');
        }

        return editData.data;
    },

    deleteCategory: async (id: string): Promise<any> => {

        const deletData = await apiClient(`/categories/delete-category/${id}`, {
            method: 'DELETE',
        });

        if(!deletData.data) {
            console.error('Failed to delete category');
            throw new Error('Failed to delete category');
        }

        return deletData.data;
    },

    fetchCategories: async(): Promise<Category[]> => {
        const fetchData = await apiClient('/categories/fetch-categories', {
            method: 'GET',
        });

        if(!fetchData.data) {
            console.error('Failed to fetch categories');
            throw new Error('Failed to fetch categories');
        }

        return fetchData.data;
    }
};

