import type { Product } from "../types/product";

//server safe featured product service

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001/api";

interface FeaturedProductResponse {
    success: boolean;
    data: Product[];
}

export async function getFeaturedProducts(): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/products/fetch-featured`,
        {

            cache: 'no-store',

        }
    );

    if(!response.ok) {
        throw new Error('Failed to fetch featured products');
    }

    const result = (await response.json()) as FeaturedProductResponse;

    return result.data;
}