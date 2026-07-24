import {apiClient} from '../Config/api';

export const productService =  {

    getAllProducts: async (): Promise<any> => {
        const getData = await apiClient('/fetch-products', {
            method: 'GET',
        });

        if(!getData.data) {
            console.error('Failed to fetch products');
            throw new Error('Failed to fetch products');
        }

        return getData.data;
    },


    createProduct: async (name: string, description: string, price: number, stock: number, category: string, images: string[], isActive: boolean): Promise<any> => {

        const createData = await apiClient('/create-product', {
            method: 'POST',
            body: JSON.stringify({name, description, price, stock, category, images, isActive}),

        });

        if(!createData.data) {
            console.error('Failed to create product');
            throw new Error('Failed to create product');
        }

        return createData.data;
    },

    editProduct: async (id: string, name: string, description: string, price: number, stock: number, images: string[], isActive: boolean): Promise<any> => {
        
        const editData = await apiClient(`/edit-product/${id}`, {
            method: 'PUT',
            body: JSON.stringify({name, description, price, stock, images, isActive}),
        });

        if(!editData.data) {
            console.error('Failed to edit product');
            throw new Error('Failed to edit product');
        }

        return editData.data;

    },

    deleteProduct: async (id: string): Promise<any> => {
        const deleteData = await apiClient(`/delete-product/${id}`, {
            method: 'DELETE',
        });

        if(!deleteData.data) {
            console.error('Failed to delete product');
            throw new Error('Failed to delete product');
        }

        return deleteData.data;
    }

    


}