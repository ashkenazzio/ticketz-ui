import { MoreHorizontal } from 'lucide-react';

const activity = [
    { id: '#39201', event: 'Neon Sunrise 5K', customer: 'Sarah Jenkins', amount: '$15.00', status: 'Completed', time: '2 min ago' },
    { id: '#39202', event: 'Warehouse Project', customer: 'Mike Ross', amount: '$35.00', status: 'Processing', time: '15 min ago' },
    { id: '#39203', event: 'Neon Sunrise 5K', customer: 'Jessica Wu', amount: '$15.00', status: 'Completed', time: '1 hour ago' },
    { id: '#39204', event: 'React Patterns', customer: 'David Chen', amount: '$0.00', status: 'Completed', time: '3 hours ago' },
    { id: '#39205', event: 'Electric Garden', customer: 'Amanda Low', amount: '$89.00', status: 'Failed', time: '5 hours ago' },
];

const StatusBadge = ({ status }: { status: string }) => {
    switch(status) {
        case 'Completed': return <span className="text-xs font-semibold text-lime bg-lime/10 px-2 py-1 rounded-sm uppercase">Success</span>;
        case 'Processing': return <span className="text-xs font-semibold text-blue-400 bg-blue-400/10 px-2 py-1 rounded-sm uppercase">Pending</span>;
        case 'Failed': return <span className="text-xs font-semibold text-red-400 bg-red-400/10 px-2 py-1 rounded-sm uppercase">Failed</span>;
        default: return <span className="text-xs text-gray-400">{status}</span>;
    }
}

export default function RecentActivityTable() {
  return (
    <div className="bg-surface border border-white/5 rounded-sm overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-white">Recent Transactions</h3>
            <button className="text-sm text-lime hover:text-white transition-colors">View All</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-white/5 border-b border-white/5">
                        <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Event</th>
                        <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {activity.map((item) => (
                        <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4 text-sm font-mono text-gray-500">{item.id}</td>
                            <td className="px-6 py-4 text-sm font-medium text-white">{item.event}</td>
                            <td className="px-6 py-4 text-sm text-gray-400">
                                <div className="flex flex-col">
                                    <span className="text-white">{item.customer}</span>
                                    <span className="text-xs text-gray-600">{item.time}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-white">{item.amount}</td>
                            <td className="px-6 py-4">
                                <StatusBadge status={item.status} />
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="p-1 hover:text-white text-gray-500 transition-colors">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}
