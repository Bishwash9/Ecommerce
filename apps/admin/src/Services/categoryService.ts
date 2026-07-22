import { apiClient } from "../Config/api";

export const categoryService = {
    createCategory: async (name: string): Promise<any> => {
         
        const createData = await apiClient('/categories/create-category', {
            method: 'POST',
            body: JSON.stringify({ name }),
        });
        return createData.data;
    },

    editCategory: async (id: string, name: string): Promise<any> => {

        const editData = await apiClient(`/categories/edit-category/${id}`, {
            method: 'PUT',
            body: JSON.stringify({name}),
        });
        return editData.data;
    },

    deleteCategory: async (id: string): Promise<any> => {

        const deletData = await apiClient(`/categories/delete-category/${id}`, {
            method: 'DELETE',
        });
        return deletData.data;
    },

    fetchCategories: async(): Promise<any> => {
        const fetchData = await apiClient('/categories/fetch-categories', {
            method: 'GET',
        });
        return fetchData.data;
    }
};

