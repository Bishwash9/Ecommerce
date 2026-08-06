import { getFeaturedProducts } from "@/app/services/featuredProductService";
import type { Product } from "@/app/types/product";
import Link from "next/link";
import ProductCard from "../product/productcard";

export default async function FeaturedSection() {
    let featuredProducts: Product[] = [];

    try {
        featuredProducts = await getFeaturedProducts();
    } catch (error) {
        console.error("Failed to fetch featured products:", error);
    }

    return (
        <section className="bg-stone-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <div className="mx-auto max-w-375">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-700">
                        Curated Collection
                    </p>

                    <h2 className="mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">
                        Featured Products
                    </h2>

                </div>

                {featuredProducts.length > 0 ? (
                    <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
                        {featuredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mt-12 rounded-xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
                        <p className="text-sm text-stone-500">
                            Featured products are being prepared.
                        </p>
                    </div>
                )}

                <div className="mt-12 flex justify-center">
                    <Link
                        href="/products"
                        className="relative group inline-flex items-center gap-3 rounded-full overflow-hidden border border-stone-900 px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-stone-900 transition-colors duration-300 hover:bg-stone-900 hover:text-white
                        before:absolute before:inset-0 before:-translate-x-full before:bg-stone-900 before:transition-transform before:duration-300 hover:before:translate-x-0"
                        >
                        <span className="relative z-10">View All Products</span>
                        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                            &rarr;
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
