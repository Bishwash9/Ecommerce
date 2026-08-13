"use client";

import { Product } from "@/app/types/product";
import ProductCard from "./productcard";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

interface ProductCatalogProps {
    products: Product[];
}

export default function ProductCatalog({products}: ProductCatalogProps) {

    const [search, setSearch] = useState('');
    const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const brands = useMemo(() => {
        return Array.from(
            new Set(products.map((product) => product.brand?.trim()).filter(Boolean)
            )
        ).sort();
    }, [products]);

    const categories = useMemo(() => {
        return Array.from(
            new Set(
                products.map((product) => product.categoryName?.trim()).filter(Boolean)
            )
        ).sort();
    }, [products]);

    const filteredProducts = useMemo(() => {
        const searchProducts = search.trim().toLowerCase();

        return products.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchProducts) || product.brand?.toLowerCase().includes(searchProducts) || product.categoryName?.toLowerCase().includes(searchProducts);
            const matchesBrand = selectedBrand.length === 0 || selectedBrand.includes(product.brand);
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.categoryName ?? '')

            return matchesSearch && matchesBrand && matchesCategory;
        })
    }, [products, search, selectedBrand, selectedCategories]);
    

    //handlers

    const toggleBrand = (brand: string) => {
        setSelectedBrand((current) =>
             current.includes(brand)
                ? current.filter((item) => item !== brand)
                : [...current, brand])
    };

    const toggleCategory = (category: string) => {
        setSelectedCategories((current) => 
            current.includes(category)
                ? current.filter((item) => item !== category)
                : [...current, category]
        )
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedBrand([]);
        setSelectedCategories([]);
    }

    //flag 
    const hasFiltersApplied = search !== '' || selectedBrand.length > 0 || selectedCategories.length > 0;


    return (
        <section className='px-5 py-12 sm:px-8 lg:px-12'>
            <div className='mx-auto max-w-375'>

                <div className='mx-auto mt-8 max-w-2xl'>
                    <div className='relative'>
                        <Search size={18}
                        className='absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400'/>
                        <input
                            type='text'
                            placeholder='Search products, brands, categories...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-full rounded-full border border-stone-300 bg-white py-4 pl-14 text-sm text-stone-800 outline-none transition focus:border-stone-700 focus-ring-2 focus-ring-stone-200 transtion-all ease-in-out duration-400'
                        />
                    </div>
                </div>

                <div className='mt-12 grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10'>
                    <aside className='rounded-xl border border-stone-200 bg-white p-5 lg:sticky lg:top-24'>
                        <div className='flex items-center justify-between border-b border-stone-200 pb-4'>
                            <h2 className='text-sm font-semibold uppercase underline underline-offset-4 tracking-[0.15em] text-stone-900'>
                                    Filters
                            </h2>
                            {hasFiltersApplied && (
                                <button 
                                    type='button'
                                    onClick={clearFilters}
                                    className='text-xs cursor-pointer text-stone-500 underline underline-offset-4 transition hover:text-amber-900 duration-300'
                                >
                                    Clear
                                </button>
                            )}

                        </div>

                        <div className='py-5 border-b border-stone-200'>
                            <h3 className='text-xs font-semibold uppercase tracking-[0.15em] text-stone-700'>
                                    Brands
                            </h3>
                            <div className='mt-4 space-y-3'>
                                {brands.map((brand) => (
                                    <label key={brand}
                                     className='flex cursor-pointer items-center gap-3 text-sm text-stone-700'
                                    >
                                        <input
                                            type='checkbox'
                                            checked={selectedBrand.includes(brand)}
                                            onChange={() => toggleBrand(brand)}
                                            className='h-4 w-4 accent-stone-900'
                                        />
                                        <span className='uppercase text-xs tracking-[0.15em]'>{brand}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className='pt-5'>
                            <h3 className='text-xs font-semibold uppercase tracking-[0.15em] text-stone-700'>
                                    Categories
                            </h3>

                            <div className='mt-4 space-y-3'>
                                  {categories.map((category) => (
                                    <label
                                        key={category}
                                        className="flex cursor-pointer items-center gap-3 text-sm text-stone-600"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(
                                                category as string
                                            )}
                                            onChange={() =>
                                                toggleCategory(category as string) 
                                            }
                                            className="h-4 w-4 accent-stone-900"
                                        />

                                        <span className='uppercase text-xs tracking-[0.15em]'>{category}</span>
                                    </label>
                                ))}
                            </div>

                        </div>

                    </aside>
                    <div className='min-w-0'>
                        <div className='mb-6 flex items-center justify-between border-b border-stone-200 pb-4'>
                            <p className='text-sm text-stone-500 uppercase tracking-[0.15em]'>
                                {filteredProducts.length}{" "}
                                {filteredProducts.length === 1 ? 'product' : 'products'} found
                            </p>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-xl border border-dashed border-stone-300 px-6 py-20 text-center">
                                <h3 className="text-lg font-medium text-stone-800">
                                    No products found
                                </h3>

                                <p className="mt-2 text-sm text-stone-500">
                                    Try changing your search or filters.
                                </p>

                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="mt-5 rounded-full border border-stone-900 px-6 py-2.5 text-xs font-medium uppercase tracking-wider transition hover:bg-stone-900 hover:text-white"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>

                </div>

               

            </div>

        </section>
    )

}
