'use client';

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import { ArrowRight, MapPin, Package, ShoppingBag, Wallet } from "lucide-react";


export default function ProfileCatalog() {

    const router = useRouter();
    const {user, status} = useAuth();

    useEffect(() => {
        if(status === 'unauthenticated') {
            router.replace('/login?redirect=/profile');
        }
    }, [status, router]);

    if(status === 'loading') {
        return (
            <section 
             aria-busy='true'
             aria-label='Loading profile'
             className='min-h-[70vh] bg-stone-50 px-5 py-12 sm:px-8'>

                <div className='mx-auto max-w-6xl animate-pulse'>
                    <div className="h-8 w-48 rounded bg-stone-200" />

                    <div className="mt-8 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
                        <div className="h-96 rounded-2xl bg-stone-200" />
                        <div className="h-96 rounded-2xl bg-stone-200" />
                    </div>
                </div>

            </section>
        );

       
    }

     if(status !== 'authenticated' || !user) {
            return null; // or a loading spinner, or redirect to login
        }

        const initials = user.name.trim().split(/\s+/).map((part) => part[0] ?? '').join('').toUpperCase();

        const details = [
            { label: 'Full name', value: user.name },
            { label: 'Email address', value: user.email },
            { label: 'Phone number', value: user.phoneNumber || 'N/A' },
            // { label: 'Address', value: user.address || 'N/A' },

        ];

    return (
        <section className='min-h-[70vh] bg-stone-50 px-5 py-12 text-stone-900 sm:px-8 lg:px-12 lg:py-12'>
            <div className='mx-auto max-w-6xl'>
                <header className='mb-5 flex justify-between'>
                    <p className='text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-500'>
                        Your profile
                    </p>
                      <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-500">
                        Your Status and Details
                    </p>
                </header>

                <div className='grid items-start gap-6 lg:grid-cols-[320px_minmax(0,1fr)]'>

                    <aside className='rounded-2xl border border-stone-200 bg-white p-6 sm:p-7'>
                        <div className='flex flex-col pb-7 border-b border-stone-200 text-center items-center'>
                            <div className='relative flex size-24 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-stone-100'>
                                {user.avatarUrl ? (
                                    <Image
                                    src={user.avatarUrl}
                                    alt='User avatar'
                                    fill
                                    sizes='96px'
                                    className='object-cover'
                                    />

                                ) : (
                                    <span className='text-2xl font-medium text-stone-600'>
                                        {initials}
                                    </span>
                                )}
                            </div>
                            <h2 className='mt-4 text-xl font-meidum'>
                                {user.name}
                            </h2>
                             <p className="mt-1 max-w-full break-all text-sm text-stone-500">
                                {user.email}
                            </p>

                        </div>
                           <dl className="mt-6 space-y-6">
                            {details.map(({ label, value }) => (
                                <div key={label}>
                                    <dt className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone-400">
                                        {label}
                                    </dt>

                                    <dd className="mt-2 wrap-break-word text-sm font-medium text-stone-800">
                                        {value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </aside>

                    <div className='space-y-6'>
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <article className='rounded-2xl border border-stone-200 bg-white p-6'>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-xs font-medium text-stone-500'>
                                            Total Spending
                                        </p>
                                        <Wallet size={20} aria-hidden='true' className='text-stone-400'/>
                                    </div>
                                     <p className="mt-4 text-3xl font-medium">
                                    —
                                </p>
                                    <p className="mt-2 text-xs text-stone-400">
                                    Available when payments are connected
                                     </p>
                                </article>
                             <article className="rounded-2xl border border-stone-200 bg-white p-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-medium text-stone-500">
                                        Total orders
                                    </p>

                                    <ShoppingBag
                                        size={20}
                                        aria-hidden="true"
                                        className="text-stone-400"
                                    />
                                </div>

                                <p className="mt-4 text-3xl font-medium">
                                    —
                                </p>

                                <p className="mt-2 text-xs text-stone-400">
                                    Available when orders are connected
                                </p>
                            </article>
                            </div>
                            <section className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7">
                            <h2 className="border-b border-stone-200 pb-5 text-lg font-medium">
                                Order history
                            </h2>

                            <div className="flex flex-col items-center px-3 py-12 text-center">
                                <div className="flex size-12 items-center justify-center rounded-full bg-stone-100">
                                    <Package
                                        size={22}
                                        aria-hidden="true"
                                        className="text-stone-500"
                                    />
                                </div>

                                <h3 className="mt-4 text-base font-medium">
                                    Your purchases, in one place
                                </h3>

                                <p className="mt-2 max-w-sm text-sm leading-6 text-stone-500">
                                    Order details and delivery status will
                                    appear here once checkout is connected.
                                </p>

                                <Link
                                    href="/products"
                                    className="group relative mt-6 inline-flex items-center gap-3 overflow-hidden rounded-full border border-stone-900 px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-stone-900 transition-colors duration-300 before:absolute before:inset-0 before:-translate-x-full before:bg-stone-900 before:transition-transform before:duration-300 hover:text-white hover:before:translate-x-0"
                                >
                                    <span className="relative z-10">
                                        Explore products
                                    </span>

                                    <ArrowRight
                                        size={14}
                                        aria-hidden="true"
                                        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </Link>
                            </div>
                        </section>
                        <section className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7">
                            <div className="flex items-start gap-4">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-stone-100">
                                    <MapPin
                                        size={18}
                                        aria-hidden="true"
                                        className="text-stone-500"
                                    />
                                </div>

                                <div>
                                    <h2 className="text-base font-medium">
                                        Saved addresses
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-stone-500">
                                        You can save your delivery address
                                        during your first checkout and
                                        manage it here afterward.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                </div>

            </div>
        </section>
    )

    
}