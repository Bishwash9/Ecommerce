import {create} from 'zustand';
import type {Category} from '../Types/category';
import type { Product } from '../Types/product';
import {categoryService} from '../Services/categoryService';
import {productService} from '../Services/productService';

interface InventoryState {
    categories: Category[];
    products: Product[];
    loading: boolean;
    error: string | null;
    hasLoaded: boolean;

    //cat
    fetchCategories: () => Promise<void>;
    addCategory: (category: Category) => void;
    editCategory: (id: string, name: string) => void;
    deleteCategory: (id: string) => void;

    //prod
    fetchProducts: () => Promise<void>;
    addProduct: (product: Product) => void;
    editProduct: (id: string, name: string, description: string, price: number, stock: number, images: string[], isActive: boolean) => void;
    deleteProduct: (id: string) => void;
}

export const useInvetoryStore = create<InventoryState>((set, get) => ({
    products: [],
    categories: [],
    loading: false,
    error: null,
    hasLoaded: false,

    fetchCategories: async () => {
        //first check if categories have already been loaded
        if(get().hasLoaded) return;

        set({loading: true, error: null});

        try {
            const category = await categoryService.fetchCategories();
            set({categories: category, loading: false, hasLoaded: true});

        }catch(error: any){
            set({error: 'Failed to fetch categories', loading: false, hasLoaded: true});
        }
    },

   addCategory: (category) => set((state) => ({categories: [ ...state.categories, category]})),

   editCategory: (id, name) => set((state) => ({
      categories: state.categories.map((category) => category.id === id ? { ...category, name } : category)
   })),

   deleteCategory: (id) => set((state) => ({
      categories: state.categories.filter((category) => category.id !== id)
   })),


   //prod
   fetchProducts: async () => {
    //first lets check if products have already been loaded
    if(get().hasLoaded) return;
    
    set({loading: true, error: null});

    try {
        const product = await productService.getAllProducts();
        set({products: product, loading: false, hasLoaded: true});

    }catch(error: any) {
        set({error: 'Failed to fetch products', loading: false, hasLoaded: true});
    }
   },

   addProduct: (product) => set((state) => ({products: [...state.products, product]})),

   editProduct: (id, name, description, price, stock, images, isActive) => set((state) => ({
        products: state.products.map((product) => product.id === id ? { ...product, name, description, price, stock, images, isActive}: product)
   })),

   deleteProduct: (id) => set((state) => ({
        products: state.products.filter((product) => product.id !== id)
   }))

}));