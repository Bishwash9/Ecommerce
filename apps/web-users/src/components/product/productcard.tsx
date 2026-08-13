import Image from "next/image";
import type { Product } from "../../app/types/product";
import ProductActions from "./productActions";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
    const imageUrl = product.images?.[0];

    const featuredTag = product.tags.find((tag) => ['bestseller', 'featured', 'trending'].includes(tag.toLowerCase()));

    return (
        <article className="group min-w-0 rounded-md border border-stone-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-lg">
            <div className="relative aspect-4/4 overflow-hidden rounded-md bg-stone-100">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-xs uppercase tracking-widest text-stone-400">
                        Image coming soon
                    </div>
                )}

                {featuredTag && (
                    <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-stone-700 shadow-sm backdrop-blur-sm">
                        {featuredTag}
                    </span>
                )}
            </div>

            <div className="px-1 pb-2 pt-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400">
                    {product.brand || product.categoryName}
                </p>

                <div className="mt-2 flex items-start justify-between gap-4">
                    <h3 className="line-clamp-2 text-lg font-medium leading-6 text-stone-900">
                        {product.name}
                    </h3>

                    <p className="shrink-0 text-sm font-semibold text-stone-900">
                        Rs. {product.price.toLocaleString("en-NP")}
                    </p>
                </div>

                <ProductActions productId={product.id} />
            </div>
        </article>
    );
}
