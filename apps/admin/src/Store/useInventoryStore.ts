import {create} from 'zustand';
import type {Category} from '../Types/category';
import {categoryService} from '../Services/categoryService';

interface InventoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
    hasLoaded: boolean;

    fetchCategories: () => Promise<void>;
    addCategory: (category: Category) => void;
    editCategory: (id: string, name: string) => void;
    deleteCategory: (id: string) => void;
}

export const useInvetoryStore = create<InventoryState>((set, get) => ({
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
   }))

}));