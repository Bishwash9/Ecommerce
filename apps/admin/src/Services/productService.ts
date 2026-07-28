import {apiClient} from '../Config/api';
import type { EditProductRequest, Product } from '../Types/product';
export const productService =  {

    getAllProducts: async (): Promise<Product[]> => {
        const getData = await apiClient('/products/fetch-products', {
            method: 'GET',
        });

        if(!getData.data) {
            console.error('Failed to fetch products');
            throw new Error('Failed to fetch products');
        }

        return getData.data;
    },

    getProductById: async (id: string): Promise<Product> => {
        const getData = await apiClient(`/products/fetch-product/${id}`, {
            method: 'GET',
        });

        if(!getData.data) {
            console.error('Failed to fetch product');
            throw new Error('Failed to fetch product');
        }

        return getData.data;
    },


    createProduct: async (name: string, description: string, price: number, stock: number, category: string, images: string[], isActive: boolean): Promise<Product> => {

        const createData = await apiClient('/products/create-product', {
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
        
        const editData = await apiClient(`/products/edit-product/${id}`, {
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
        const deleteData = await apiClient(`/products/delete-product/${id}`, {
            method: 'DELETE',
        });

        if(!deleteData.data) {
            console.error('Failed to delete product');
            throw new Error('Failed to delete product');
        }

        return deleteData.data;
    },

    uploadProductImages: async (files: File[]): Promise<string[]> => {
        const formData = new FormData();

        files.forEach((file) => {
            formData.append('images', file);
        });

        const response = await apiClient('/products/upload-images', {
            method: 'POST',
            body: formData,
        });

        if(!response.data) {
            console.error('Failed to upload images');
            throw new Error('Failed to upload images');
        }

        return response.data.images; // Assuming the response contains an array of image URLs
    }

    


}