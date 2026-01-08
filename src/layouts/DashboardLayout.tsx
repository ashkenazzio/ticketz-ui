import { Bell, ChevronRight } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function DashboardLayout({ children, title = "Overview" }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-dark text-white font-sans selection:bg-lime selection:text-black">
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="ml-64 min-h-screen flex flex-col">
            
            {/* Top Bar */}
            <header className="h-20 border-b border-white/5 bg-dark/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="hover:text-white cursor-pointer transition-colors">Dashboard</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-white font-medium">{title}</span>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    <button className="relative text-gray-400 hover:text-white transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-lime rounded-full border-2 border-dark"></span>
                    </button>
                    
                    <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-semibold text-white">Alex Moran</div>
                            <div className="text-xs text-gray-500">Bass Sector</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-surface border border-white/10 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="User" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Scrollable Area */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    </div>
  );
}
