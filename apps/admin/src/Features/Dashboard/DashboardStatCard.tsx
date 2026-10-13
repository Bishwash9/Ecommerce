import type { ReactNode } from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    iconBgColor?: string;
    valueColor?: string;
    loading?: boolean;
}

export function DashboardStatCard({
    title,
    value,
    icon,
    iconBgColor = 'bg-indigo-50 text-indigo-600',
    valueColor = 'text-slate-800',
    loading = false,
}: StatCardProps) {
    return (
        <article
            aria-busy={loading}
            className="group flex items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
            <div
                aria-hidden="true"
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBgColor} transition-transform group-hover:scale-105`}
            >
                {icon}
            </div>

            <div className="min-w-0 flex-1 text-right">
                <h2 className="mb-1 truncate text-xs font-medium uppercase tracking-wider text-slate-400">
                    {title}
                </h2>
                {loading ? (
                    <div className="flex h-7.5 items-center justify-end" role="status">
                        <span className="h-7 w-20 animate-pulse rounded-md bg-slate-100" />
                        <span className="sr-only">Loading {title.toLowerCase()}</span>
                    </div>
                ) : (
                    <p className={`text-3xl font-light leading-none tabular-nums ${valueColor}`}>
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </p>
                )}
            </div>
        </article>
    );
}
