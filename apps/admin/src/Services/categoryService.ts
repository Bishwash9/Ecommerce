import { apiClient } from "../Config/api";

export const categoryService = {
    createCategory: async (name: string): Promise<any> => {
         
        const createData = await apiClient('/create-category', {
            method: 'POST',
            body: JSON.stringify({ name }),
        });
        return createData;
    },

    editCategory: async (id: string, name: string): Promise<any> => {

        const editData = await apiClient(`/edit-category/${id}`, {
            method: 'PUT',
            body: JSON.stringify({name}),
        });
        return editData;
    },

    deleteCategory: async (id: string): Promise<any> => {

        const deletData = await apiClient(`/delete-category/${id}`, {
            method: 'DELETE',
        });
        return deletData;
    },

    fetchCategories: async(): Promise<any> => {
        const fetchData = await apiClient('/fetch-categories', {
            method: 'GET',
        });
        return fetchData;
    }
};

