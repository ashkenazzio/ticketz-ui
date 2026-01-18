import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Bell, ChevronRight, Menu } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark text-white font-sans selection:bg-lime selection:text-black flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content Area */}
        <div className="flex-1 min-h-screen flex flex-col w-full lg:w-auto">

            {/* Top Bar */}
            <header className="h-16 lg:h-20 border-b border-white/5 bg-dark/80 backdrop-blur-md sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between">
                {/* Mobile Menu Button + Breadcrumbs */}
                <div className="flex items-center gap-3">
                    <button
                        className="lg:hidden text-gray-400 hover:text-white transition-colors"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="hover:text-white cursor-pointer transition-colors hidden sm:inline">Dashboard</span>
                        <ChevronRight className="w-4 h-4 hidden sm:block" />
                        <span className="text-white font-medium">Overview</span>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4 lg:gap-6">
                    <button className="relative text-gray-400 hover:text-white transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-lime rounded-full border-2 border-dark"></span>
                    </button>

                    <div className="flex items-center gap-3 pl-4 lg:pl-6 border-l border-white/10">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-semibold text-white">Alex Moran</div>
                            <div className="text-xs text-gray-500">Bass Sector</div>
                        </div>
                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-surface border border-white/10 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="User" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Scrollable Area */}
            <main className="flex-1 p-4 lg:p-8">
                <Outlet />
            </main>
        </div>
    </div>
  );
}
