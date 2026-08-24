'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useAuth } from '@/context/AuthContext';
import { cartService } from '@/app/services/cartService';
import { ArrowRight, Minus, Plus, ShoppingBag, X } from 'lucide-react';

interface CartProduct {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    images: string[];
    stock: number;
    brand?: string;
}

interface CartItem {
    _id: string;
    product: CartProduct;
    quantity: number;
}

interface Cart {
    _id?: string;
    user: string;
    products: CartItem[];
}

const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString('en-NP')}`;
};

export default function CartCatalog() {
    const router = useRouter();
    const { status } = useAuth();

    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [busyProductId, setBusyProductId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.replace('/login?redirect=/cart');
            return;
        }

        if (status !== 'authenticated') return;

        const loadCart = async () => {
            try {
                setLoading(true);
                setError('');

                //fetch cart from api
                const cartData = await cartService.getCart();
                setCart(cartData);

            } catch (error) {
                setError(
                    error instanceof Error ? error.message : 'Failed to load cart'
                );

            } finally {
                setLoading(false);
            }
        };

        loadCart();

    }, [status, router]);

    const subTotal = useMemo(() => {
        return (
            cart?.products.reduce((total, item) => {
                return (
                    total + item.product.price * item.quantity
                );
            }, 0) ?? 0
        );
    }, [cart]);

    const updateQuantity = async (productId: string, action: 'increment' | 'decrement') => {

        try {
            setBusyProductId(productId);
            const updatedCart = await cartService.updateQuantity(productId, action);

            //update cart state
            setCart(updatedCart);
        } catch (error) {
            setError(
                error instanceof Error ? error.message : 'Failed to update product quantity'
            );
        } finally {
            setBusyProductId(null);
        }
    };

    const removeProduct = async (productId: string) => {

        try {
            setBusyProductId(productId);
            setError('');

            const updatedCart = await cartService.removeFromCart(productId);

            setCart(updatedCart);
        } catch (error) {
            error instanceof Error ? setError(error.message) : setError('Failed to remove product from cart');
        } finally {
            setBusyProductId(null);
        }
    };

    if (status === 'loading' || loading) {
        return (
            <main className="mx-auto min-h-[70vh] max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
                <div className="animate-pulse rounded-2xl border border-stone-200 bg-white p-8">
                    <div className="h-7 w-40 rounded bg-stone-200" />
                    <div className="mt-8 h-28 rounded-xl bg-stone-100" />
                    <div className="mt-4 h-28 rounded-xl bg-stone-100" />
                </div>
            </main>
        );
    }

    const products = cart?.products ?? [];

    return (
        <main className='mx-auto min-h-[70vh] max-w-7xl px-5 py-12 sm:px-8 lg:px-12 lg:py-16'>
            <div className='grid items-start gap-8 lg:grid-cols-[minmax(0,1.8fr)_minmax(310px,0.8fr)]'>
                <section className='rounded-2xl border border-stone-200 bg-white p-5 sm:p-7'>
                    <div className='flex items-center justify-between border-b border-stone-200 pb-5'>
                        <div>
                            <h1 className='text-2xl font-medium tracking-tight uppercase text-stone-950'>
                                Your Cart
                            </h1>


                        </div>
                        <button
                            type="button"
                            title="Coming soon"
                            className="flex items-center gap-1.5 text-xs font-medium text-red-500 transition-colors hover:text-red-700"
                        >
                            <X size={13} />
                            Clear cart
                        </button>
                    </div>

                    {error && (
                        <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 border border-red-200  text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {products.length === 0 ? (
                        <div className="flex min-h-80 flex-col items-center justify-center text-center">
                            <div className="flex size-14 items-center justify-center rounded-full bg-stone-100">
                                <ShoppingBag
                                    size={24}
                                    className="text-stone-500"
                                />
                            </div>

                            <h2 className="mt-5 text-lg font-medium text-stone-900">
                                Your cart is empty
                            </h2>

                            <p className="mt-2 max-w-sm text-sm text-stone-500">
                                Browse our collection and add
                                something you like.
                            </p>

                            <Link
                                href="/products"
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-stone-950 px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white transition hover:bg-stone-800"
                            >
                                Browse products
                                <ArrowRight size={14} />
                            </Link>
                        </div>

                    ) : (

                        <>
                            <div className='hidden grid-cols-[minmax(0,1fr)_130px_120px_32px] gap-5 px-3 py-5 text-[14px] font-semibold tracking-wide  text-stone-900 sm:grid'>
                                <span>Product</span>
                                <span>Quantity</span>
                                <span className="text-right">
                                    Price
                                </span>
                            </div>


                            <div className='space-y-3'>
                                {products.map((item) => {
                                    const product = item.product;
                                    const isBusy = busyProductId === product._id;

                                    return (
                                        <article
                                            key={item._id}
                                            className="grid gap-5 rounded-xl border border-stone-200 p-3 transition-colors hover:border-stone-300 sm:grid-cols-[minmax(0,1fr)_130px_120px_32px] sm:items-center"
                                        >
                                            <div className="flex min-w-0 items-center gap-4">
                                                <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                                                    {product
                                                        .images?.[0] ? (
                                                        <Image
                                                            src={
                                                                product
                                                                    .images[0]
                                                            }
                                                            alt={
                                                                product.name
                                                            }
                                                            fill
                                                            sizes="80px"
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-[9px] uppercase tracking-wider text-stone-400">
                                                            No image
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="min-w-0">
                                                    <h2 className="truncate text-sm font-medium text-stone-900">
                                                        {
                                                            product.name
                                                        }
                                                    </h2>

                                                    <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-stone-400">
                                                        {product.brand ||
                                                            'Eazy'}
                                                    </p>

                                                    <p className="mt-2 text-xs font-medium text-stone-700 sm:hidden">
                                                        {formatPrice(
                                                            product.price *
                                                                item.quantity
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between sm:justify-start">
                                                <span className="text-xs text-stone-500 sm:hidden">
                                                    Quantity
                                                </span>

                                                <div className="flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        aria-label={`Decrease ${product.name} quantity`}
                                                        disabled={
                                                            isBusy ||
                                                            item.quantity <=
                                                                1
                                                        }
                                                        onClick={() =>
                                                            updateQuantity(
                                                                product._id,
                                                                'decrement'
                                                            )
                                                        }
                                                        className="flex size-8 items-center justify-center rounded-full border border-stone-200 transition hover:border-stone-400 disabled:cursor-not-allowed disabled:opacity-35"
                                                    >
                                                        <Minus
                                                            size={13}
                                                        />
                                                    </button>

                                                    <span className="w-4 text-center text-sm font-medium">
                                                        {
                                                            item.quantity
                                                        }
                                                    </span>

                                                    <button
                                                        type="button"
                                                        aria-label={`Increase ${product.name} quantity`}
                                                        disabled={
                                                            isBusy ||
                                                            item.quantity >=
                                                                product.stock
                                                        }
                                                        onClick={() =>
                                                            updateQuantity(
                                                                product._id,
                                                                'increment'
                                                            )
                                                        }
                                                        className="flex size-8 items-center justify-center rounded-full border border-stone-200 transition hover:border-stone-400 disabled:cursor-not-allowed disabled:opacity-35"
                                                    >
                                                        <Plus
                                                            size={13}
                                                        />
                                                    </button>
                                                </div>
                                            </div>

                                            <p className="hidden text-right text-sm font-semibold text-stone-900 sm:block">
                                                {formatPrice(
                                                    product.price *
                                                        item.quantity
                                                )}
                                            </p>

                                            <button
                                                type="button"
                                                aria-label={`Remove ${product.name} from cart`}
                                                disabled={isBusy}
                                                onClick={() =>
                                                    removeProduct(
                                                        product._id
                                                    )
                                                }
                                                className="absolute text-red-500 transition hover:text-red-700 disabled:opacity-40 sm:static"
                                            >
                                                <X size={16} />
                                            </button>
                                        </article>
                                    );
                                })}
                            </div>


                        </>
                    )}
                </section>
                <aside className='rounded-2xl bg-stone-100 p-6 lg:sticky lg:top-24'>
                     <h2 className="text-base font-semibold text-stone-950">
                        Order summary
                    </h2>
                     <div className="mt-6 space-y-4 border-y border-stone-300 py-5 text-sm">
                        <div className="flex justify-between gap-4">
                            <span className="text-stone-500">
                                Subtotal
                            </span>

                            <span className="font-medium text-stone-900">
                                {formatPrice(subTotal)}
                            </span>
                        </div>

                        <div className="flex justify-between gap-4">
                            <span className="text-stone-500">
                                Shipping
                            </span>

                            <span className="text-right text-xs text-stone-500">
                                Calculated at checkout
                            </span>
                        </div>
                    </div>
                     <div className="flex items-center justify-between py-5">
                        <span className="text-sm font-semibold text-stone-900">
                            Total
                        </span>

                        <span className="text-lg font-semibold text-stone-950">
                            {formatPrice(subTotal)}
                        </span>
                    </div>
                    <Link
                        href="/checkout"
                        aria-disabled={products.length === 0}
                        className={`group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-300 before:absolute before:inset-0 before:-translate-x-full before:transition-transform before:duration-300 ${
                            products.length === 0
                                ? 'pointer-events-none border-stone-300 bg-stone-300 text-stone-500 before:hidden'
                                : 'border-stone-900 text-stone-900 before:bg-stone-900 hover:text-white hover:before:translate-x-0'
                        }`}
                    >
                        <span className="relative z-10">
                            Continue to checkout
                        </span>
                        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                            <ArrowRight size={15} />
                        </span>
                    </Link>
                </aside>
            </div>

            <section className="mt-8 overflow-hidden rounded-2xl bg-stone-950 px-7 py-8 text-white sm:px-10">
                <p className="text-[10px] uppercase tracking-[0.24em] text-amber-300">
                    Curated stationery
                </p>

                <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <h2 className="text-2xl font-medium">
                            Make every page count.
                        </h2>

                        <p className="mt-2 text-sm text-stone-400">
                            Discover notebooks, pens and desk
                            essentials made for everyday ideas.
                        </p>
                    </div>

                    <Link
                        href="/products"
                        className="inline-flex w-fit items-center gap-2 border-b border-white pb-1 text-xs uppercase tracking-[0.16em]"
                    >
                        Keep shopping
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </section>
            

        </main>
    )
}
