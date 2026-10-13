import { useEffect, useState } from 'react';
import { ShoppingBag, ShoppingCart, Users } from 'lucide-react';
import { DashboardChartPlaceholder } from '../Features/Dashboard/DashboardChartPlaceholder';
import { DashboardStatCard } from '../Features/Dashboard/DashboardStatCard';
import { DashboardTopProducts } from '../Features/Dashboard/DashboardTopProducts';
import { productService } from '../Services/productService';

export default function Dashboard() {
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    const loadProductTotal = async () => {
      try {
        const products = await productService.getAllProducts();

        if (active) {
          setTotalProducts(products.length);
        }
      } catch {
        if (active) {
          setError('The product total could not be loaded. Please try again.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadProductTotal();

    return () => {
      active = false;
    };
  }, [reloadKey]);

  const retryProductTotal = () => {
    setLoading(true);
    setError(null);
    setReloadKey((key) => key + 1);
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      {error && (
        <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm text-rose-700">
          <p>{error}</p>
          <button
            type="button"
            onClick={retryProductTotal}
            className="rounded-lg px-3 py-1.5 font-semibold transition-colors hover:bg-rose-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
          >
            Try again
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <DashboardStatCard
          title="Total Products"
          value={totalProducts ?? '—'}
          icon={<ShoppingBag size={26} />}
          iconBgColor="bg-amber-50 text-amber-600"
          loading={loading}
        />
        <DashboardStatCard
          title="Total Orders"
          value="—"
          icon={<ShoppingCart size={26} />}
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
        <DashboardStatCard
          title="Total Customers"
          value="—"
          icon={<Users size={26} />}
          iconBgColor="bg-violet-50 text-violet-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <DashboardChartPlaceholder
          title="Total Sales"
        
        />
        <DashboardChartPlaceholder
          title="Order Status"
          
        />
      </div>

      <DashboardTopProducts />
    </div>
  );
}
