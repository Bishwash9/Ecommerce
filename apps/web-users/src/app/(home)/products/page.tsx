import ProductCatalog from "@/components/product/productCatalog";
import { getPublicProducts } from "@/app/services/productService";
import { Product } from "@/app/types/product";

export default async function ProductsPage() {
    let products = [] as Product[];

    try {
        products = await getPublicProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
    }

    return <ProductCatalog products={products} />;
}