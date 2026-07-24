import {apiClient} from '../Config/api';
import type { CreateProductRequest, EditProductRequest, Product } from '../Types/product';
export const productService =  {

    getAllProducts: async (): Promise<Product[]> => {
        const getData = await apiClient('/fetch-products', {
            method: 'GET',
        });

        if(!getData.data) {
            console.error('Failed to fetch products');
            throw new Error('Failed to fetch products');
        }

        return getData.data;
    },

    getProductById: async (id: string): Promise<Product> => {
        const getData = await apiClient(`/fetch-product/${id}`, {
            method: 'GET',
        });

        if(!getData.data) {
            console.error('Failed to fetch product');
            throw new Error('Failed to fetch product');
        }

        return getData.data;
    },


    createProduct: async (name: string, description: string, price: number, stock: number, category: string, images: string[], isActive: boolean): Promise<CreateProductRequest> => {

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

    editProduct: async (id: string, name: string, description: string, price: number, stock: number, images: string[], isActive: boolean): Promise<EditProductRequest> => {
        
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