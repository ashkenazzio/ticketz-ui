import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Mon', sales: 2400 },
  { name: 'Tue', sales: 1398 },
  { name: 'Wed', sales: 9800 },
  { name: 'Thu', sales: 3908 },
  { name: 'Fri', sales: 4800 },
  { name: 'Sat', sales: 3800 },
  { name: 'Sun', sales: 4300 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark border border-white/10 p-3 rounded-sm shadow-xl">
          <p className="text-gray-400 text-xs uppercase mb-1">{label}</p>
          <p className="text-lime font-display text-xl font-semibold">${payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

export default function SalesChart() {
  // Highlight "Wed" as the current day example, or just the highest one. 
  // Let's highlight the highest value for visual interest or a specific day.
  const activeIndex = 2; // Wednesday

  return (
    <div className="bg-surface border border-white/5 p-6 rounded-sm">
        <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-white">Sales Velocity</h3>
            <div className="flex gap-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-2 h-2 bg-lime rounded-full"></span> Current Week
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-2 h-2 bg-white/20 rounded-full"></span> Last Week
                </div>
            </div>
        </div>
        
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#6b7280', fontSize: 12 }} 
                        dy={10}
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#6b7280', fontSize: 12 }} 
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                    <Bar dataKey="sales" radius={[2, 2, 0, 0]}>
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={index === activeIndex ? '#BBDF32' : '#27272a'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
}
