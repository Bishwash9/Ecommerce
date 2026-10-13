import { Package } from 'lucide-react';

export function DashboardTopProducts() {
    return (
        <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
            <div className="px-5 pb-5 pt-6 sm:px-7">
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                    Top Selling Products
                </h2>

            </div>

            <div className="px-5 pb-6 sm:px-7">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-135 text-left">
                        <caption className="sr-only">
                            Top selling products, prices, units sold, and sales revenue
                        </caption>
                        <thead>
                            <tr className="border-y border-slate-100 text-xs font-medium text-slate-500">
                                <th scope="col" className="w-1/2 py-4 pr-6 font-medium">
                                    Product
                                </th>
                                <th scope="col" className="px-3 py-4 font-medium">
                                    Price
                                </th>
                                <th scope="col" className="px-3 py-4 text-right font-medium">
                                    Sold
                                </th>
                                <th scope="col" className="py-4 pl-6 text-right font-medium">
                                    Sales
                                </th>
                            </tr>
                        </thead>
                        <tbody />
                    </table>
                </div>

                <div className="py-12 text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-slate-50">
                        <Package size={23} aria-hidden="true" className="text-slate-400" />
                    </div>
                    <p className="mt-4 text-sm font-medium text-slate-600">
                        Product rankings will appear here
                    </p>
                    <p className="mt-1.5 text-xs text-slate-400">
                        Awaiting sales data.
                    </p>
                </div>
            </div>
        </section>
    );
}
