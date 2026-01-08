interface StatCardProps {
    label: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    children?: React.ReactNode;
}

export default function StatCard({ label, value, trend, trendUp, children }: StatCardProps) {
  return (
    <div className="bg-surface border border-white/5 p-6 rounded-sm flex flex-col justify-between h-32 relative overflow-hidden group hover:border-lime/30 transition-colors">
        <div className="flex justify-between items-start z-10">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">{label}</h3>
            {trend && (
                <span className={`text-xs font-semibold px-2 py-1 rounded-sm ${trendUp ? 'bg-lime/10 text-lime' : 'bg-red-500/10 text-red-500'}`}>
                    {trend}
                </span>
            )}
        </div>
        
        <div className="z-10 mt-auto">
            <div className="text-3xl font-display font-semibold text-white tracking-tight">{value}</div>
        </div>

        {/* Optional Background Visual/Icon */}
        {children && (
            <div className="absolute right-[-10px] bottom-[-10px] opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                {children}
            </div>
        )}
    </div>
  );
}
