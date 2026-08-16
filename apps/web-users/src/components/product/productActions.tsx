'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { cartService } from '@/app/services/cartService';



interface ProductActionsProps {
    productId: string;
}

export default function ProductActions({ productId }: ProductActionsProps) {
    const router = useRouter();
    const pathname = usePathname();

    const { status } = useAuth();

    const handleAddToCart = () => {
        if (status !== 'authenticated') {
            router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
            return;
        }

        //add to cart logic
        //call api
        cartService.addToCart(productId, 1);
    }

    const handleBuyNow = () => {
        if (status !== 'authenticated') {
            router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
            return;
        }

        // Logic to initiate the buy now process
    }

    return ( 
         <div className="mt-4 grid grid-cols-2 gap-3">
            <button
                type="button"
                onClick={handleAddToCart}
                className="flex items-center justify-between rounded-md cursor-pointer border border-stone-900 px-4 py-3 text-xs font-medium uppercase tracking-wider transition hover:bg-stone-100"
            >
                Add to cart 
            
            </button>

            <button
                type="button"
                onClick={handleBuyNow}
                className="rounded-md cursor-pointer bg-stone-900 px-4 py-3 text-xs font-medium uppercase tracking-wider text-white transition hover:bg-stone-700"
            >
                Buy now
            </button>
        </div>
    )
}