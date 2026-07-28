import { useInvetoryStore } from "../Store/useInventoryStore"
import type { Category } from "../Types/category"
import { categoryService } from "../Services/categoryService"
import { InventoryModal } from "../Features/Inventory/InventoryModal"
import { InventoryContent } from "../Features/Inventory/InventoryContent"
import { InventoryStatCard } from "../Features/Inventory/InventoryStatCard"
import { useAuth } from "../Context/AuthContext"
import { useEffect, useState } from "react"
import { ChartColumnStacked, OctagonX, Sparkles } from "lucide-react"
import type { Product } from "../Types/product"
import { productService } from "../Services/productService"

export default function Inventory() {


  const { user } = useAuth();
  const { fetchCategories, deleteCategory, categories, fetchProducts, deleteProduct, products, loading, error } = useInvetoryStore();

  //ui states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  //onmount
  useEffect(() => {
    if (user) {
      fetchCategories();
      fetchProducts();
    }
  }, [user, fetchCategories, fetchProducts]);


  //handlers 
  const handleAddProduct = () => {
    if (!user) return;
    setEditingProduct(null);
    setIsProductModalOpen(true);
  }

  const handleEditProduct = (prod: Product) => {
    if (!user) return;
    setEditingProduct(prod);
    setIsProductModalOpen(true);
  }

  const handleDeleteProduct = async (id: string) => {
    if(!user) return;
    if(!window.confirm('Are you sure you want to delete this product')) return;
    
    try {
      await productService.deleteProduct(id);
      //update store
      deleteProduct(id);
    }catch(error){
      console.error('Failed to delete product')
    }
  }


  const handleAddCategory = () => {
    if (!user) return;
    setEditingCategory(null);
    setIsCategoryModalOpen(true);
  }


  const handleEditCategory = (cat: Category) => {
    if (!user) return;
    setEditingCategory(cat);
    setIsCategoryModalOpen(true);
  };

  const handleDeleteCategory = async (id: string) => {
    if (!user) return;
    if (!window.confirm('Are you sure you want to delete this category')) return;

    try {
      await categoryService.deleteCategory(id);
      //update store
      deleteCategory(id);
    } catch (error) {
      console.error('Failed to delete category')
    }
  };

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  //stats
  const stats = {
    totalProducts: products.length,
    totalCategories: categories.length,
    outOfStock: products.filter((product) => !product.inStock).length,
  }


  return (
    <div className='space-y-6'>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
        <InventoryStatCard title='Total Products' value={stats.totalProducts} icon={<Sparkles size={20} />} iconColor='' />
        <InventoryStatCard title='Total Categories' value={stats.totalCategories} icon={<ChartColumnStacked size={20} />} iconColor='' />
        <InventoryStatCard title='Out of Stock' value={stats.outOfStock} icon={<OctagonX size={20} />} iconColor='' />
      </div>

      <div className='grid grid-cols-1 2xl:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start'>
        <div>
          {loading ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-slate-50 animate-pulse rounded-lg border border-slate-100" />
              ))}
            </div>
          ) : (

            <InventoryContent
              categories={categories}
              onAddCategory={handleAddCategory}
              onEditCategory={handleEditCategory}
              onDeleteCategory={handleDeleteCategory}
              products={products}
              onAddProduct={handleAddProduct}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />

          )}
        </div>
      </div>

      <InventoryModal
        isOpen={isCategoryModalOpen || isProductModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setIsProductModalOpen(false);
        }}
        editingCategory={editingCategory}
        editingProduct={editingProduct}
        isProductMode={isProductModalOpen}
      />

    </div>
  )
}

