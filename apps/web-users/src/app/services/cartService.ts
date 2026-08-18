import { apiClient } from "../config/api";

export const cartService = {
    addToCart: async (productId: string, quantity: number): Promise<any> => {

        const addToCartData = await apiClient('/cart/add-cart', {
            method: 'POST',
            body: JSON.stringify({ productId, quantity }),
        });

        if (!addToCartData.success) {
            throw new Error(addToCartData.message || 'Failed to add product to cart');
        }

        return addToCartData.data;
    },

    getCart: async(): Promise<any> => {
        
        const getCartData = await apiClient('/cart/get-cart', {
            method: 'GET'
        });

        if (!getCartData.success) {
            throw new Error(getCartData.message || 'Failed to get cart');
        }

        return getCartData.data;
    },

    removeFromCart: async (productId: string): Promise<any> => {

        const removeFromCartData = await apiClient(`/cart/remove-cart/${productId}`, {
            method: 'DELETE'
        });

        if (!removeFromCartData.success) {
            throw new Error(removeFromCartData.message || 'Failed to remove product from cart');
        }

        return removeFromCartData.data;

    },

    updateQuantity: async (productId: string, action: 'increment' | 'decrement'): Promise<any> => {

        const updateQuantityData = await apiClient(`/cart/update-cart/${productId}`, {
            method: 'PATCH',
            body: JSON.stringify({ action })
        });

        if (!updateQuantityData.success) {
            throw new Error(updateQuantityData.message || 'Failed to update product quantity in cart');
        }

        return updateQuantityData.data;
    }
}


