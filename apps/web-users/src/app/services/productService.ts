import { apiClient } from '../config/api';

export const productService = { 
    getAllProducts: async (): Promise<any> => {
        const getData = await apiClient('products/fetch-products', {
            method: 'GET'
        }); 

        if(!getData.data){
            console.error('Failed to fetch products');
            throw new Error('Failed to fetch products');
        }

        return getData.data;
    },

    getProductById: async (id: string): Promise<any> => {
        const getData = await apiClient(`products/fetch-product/${id}`, {
            method: 'GET'
        });

        if(!getData.data){
            console.error('Failed to fetch products');
            throw new Error('Failed to fetch products');
        }

        return getData.data
    },

    getFeaturedProduct: async (): Promise<any> => {
        const getFeaturedData = await apiClient('products/fetch-featured', {
            method: 'GET'
        });
        
        if(!getFeaturedData.data){
            console.error('Failed to fetch featured products');
            throw new Error('Failed to fetch featured products');
        }

        return getFeaturedData.data;
    }


}
