'use client';

import { cartService } from '@/app/services/cartService';
import { useAuth } from '@/context/AuthContext';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface CountableCart {
    products: Array<{
        quantity: number;
    }>;
}

interface CartContextValue {
    cartCount: number;
    syncCartCount: (cart: CountableCart) => void;
    refreshCartCount: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { status } = useAuth();
    const [cartCount, setCartCount] = useState<number>(0);

    const syncCartCount = useCallback((cart: CountableCart) => {
        const count = cart.products.reduce((total, product) => total + product.quantity, 0);

        setCartCount(count);
    },
        []);

    const refreshCartCount = useCallback(async () => {
        if (status !== 'authenticated') {
            setCartCount(0);
            return;
        }

        try {
            const cart = await cartService.getCart();
            syncCartCount(cart);
        } catch (error) {
            console.error('Error refreshing cart count:', error);
            setCartCount(0);
        }
    }, [status, syncCartCount]);

   useEffect(() => {
     if(status === 'authenticated') {
        refreshCartCount();
     } 
     if(status === 'unauthenticated') {
        setCartCount(0);
     }
   },[status, refreshCartCount]);

    return (
        <CartContext.Provider value={{ cartCount, syncCartCount, refreshCartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
  