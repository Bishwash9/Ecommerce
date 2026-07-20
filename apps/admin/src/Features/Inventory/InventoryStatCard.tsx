interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    iconBgColor?: string;
    valueColor?: string;
}

export const InventoryStatCard: React.FC<StatCardProps> =({title,value,icon,iconBgColor,valueColor})=>{
    return (
          <div className='bg-white rounded-md p-[1.5vw] border border-neutral-200 shadow-sm hover:shadow-md transition-all group flex items-center justify-between gap-[1.2vw]'>
            <div className={`p-[0.7vw] rounded-lg shrink-0 ${iconBgColor} transition-all`}>
                {icon}
            </div>
            <div className='text-right flex-1 min-w-0'>
                 <p className="text-[0.8vw] text-slate-400 uppercase tracking-wider mb-[0.2vh] truncate">{title}</p>
                <h3 className={`text-[2vw] font-light leading-none ${valueColor}`}>{value}</h3>
            </div>
        </div>
    )
}