import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/dashboard/StatCard';
import SalesChart from '../components/dashboard/SalesChart';
import RecentActivityTable from '../components/dashboard/RecentActivityTable';
import { DollarSign, Users, Ticket, Plus, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <DashboardLayout>
        {/* Header Action */}
        <div className="flex justify-between items-end mb-8">
            <div>
                <h1 className="font-display text-4xl font-semibold uppercase tracking-tighter text-white leading-none">Dashboard</h1>
                <p className="text-gray-400 mt-2">Welcome back, Alex. Here's what's happening today.</p>
            </div>
                <Link to="/dashboard/events/create" className="bg-lime text-dark font-display font-semibold uppercase tracking-tight px-6 py-3 rounded-sm hover:bg-limehover transition-colors flex items-center gap-2">
                    <PlusCircle className="w-5 h-5" />
                    Create New Event
                </Link>
        </div>

        {/* KPI Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard label="Total Revenue" value="$12,450.00" trend="+12.5%" trendUp={true}>
                <DollarSign className="w-24 h-24 text-lime" />
            </StatCard>
            
            <StatCard label="Active Members" value="1,208" trend="84 New" trendUp={true}>
                <Users className="w-24 h-24 text-lime" />
            </StatCard>

            <div className="bg-surface border border-white/5 p-6 rounded-sm flex flex-col justify-between h-32 relative overflow-hidden hover:border-lime/30 transition-colors">
                <div className="flex justify-between items-start z-10">
                    <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">Tickets Sold</h3>
                    <span className="text-xs font-semibold px-2 py-1 rounded-sm bg-lime/10 text-lime">
                        97%
                    </span>
                </div>
                <div className="z-10 mt-auto w-full">
                    <div className="flex justify-between items-end mb-2">
                        <div className="text-3xl font-display font-semibold text-white tracking-tight">486</div>
                        <div className="text-sm text-gray-500 font-mono">/ 500</div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-gray-800 rounded-sm overflow-hidden">
                        <div className="h-full bg-lime w-[97%] shadow-[0_0_10px_rgba(187,223,50,0.5)]"></div>
                    </div>
                </div>
                <div className="absolute right-[-10px] bottom-[-10px] opacity-5 pointer-events-none">
                    <Ticket className="w-24 h-24 text-lime" />
                </div>
            </div>
        </div>

        {/* Main Analytics (Middle) */}
        <div className="mb-8">
             <SalesChart />
        </div>

        {/* Recent Activity (Bottom) */}
        <div>
            <RecentActivityTable />
        </div>
    </DashboardLayout>
  );
}