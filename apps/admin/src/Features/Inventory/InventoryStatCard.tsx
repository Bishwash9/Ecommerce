interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    iconColor?: string;
    valueColor?: string;
}

export const InventoryStatCard: React.FC<StatCardProps> =({title,value,icon,iconColor,valueColor})=>{
    return (
          <div className='group flex items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md'>
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconColor} transition-transform group-hover:scale-105`}>
                {icon}
            </div>
            <div className='min-w-0 flex-1 text-right'>
                 <p className="mb-1 truncate text-xs font-medium uppercase tracking-wider text-slate-400">{title}</p>
                <h3 className={`text-3xl font-light leading-none text-slate-800 ${valueColor ?? ''}`}>{value}</h3>
            </div>
        </div>
    )
}
