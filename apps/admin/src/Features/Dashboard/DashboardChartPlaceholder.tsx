interface DashboardChartPlaceholderProps {
    title: string;
}
export function DashboardChartPlaceholder({
    title,

}: DashboardChartPlaceholderProps) {
    return (
        <section className="min-w-0 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                        {title}
                    </h2>
                    
                </div>

              
            </div>

            <div
                role="img"
                aria-label={`${title} chart placeholder`}
                className="mt-7 h-64 rounded-xl border border-dashed border-slate-200 bg-slate-50/40 sm:h-72"
            />
        </section>
    );
}
