// import { apiClient } from '../config/api';

// export const productService = { 
//     getAllProducts: async (): Promise<any> => {
//         const getData = await apiClient('products/fetch-products', {
//             method: 'GET'
//         }); 

//         if(!getData.data){
//             console.error('Failed to fetch products');
//             throw new Error('Failed to fetch products');
//         }

//         return getData.data;
//     },

//     getProductById: async (id: string): Promise<any> => {
//         const getData = await apiClient(`products/fetch-product/${id}`, {
//             method: 'GET'
//         });

//         if(!getData.data){
//             console.error('Failed to fetch products');
//             throw new Error('Failed to fetch products');
//         }

//         return getData.data
//     },



// }

import type { Product } from "../types/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001/api";
//server safe product service

interface ProductResponse {
    success: boolean;
    data: Product[];
}

export async function getPublicProducts(): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/products/fetch-products`, {
        cache: 'no-store',
    }
);

    if(!response.ok) {
        throw new Error('Failed to fetch products');
    }

    const result = (await response.json()) as ProductResponse;

    return result.data.filter(product => product.isActive); // Filter out inactive products
}
