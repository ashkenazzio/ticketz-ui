import { LayoutDashboard, Calendar, Users, BarChart3, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Events', icon: Calendar, path: '/dashboard/events' },
    { name: 'Members', icon: Users, path: '/dashboard/members' },
    { name: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
];

export default function Sidebar() {
    const location = useLocation();

    return (
    <aside className="w-64 bg-surface border-r border-white/5 h-screen sticky top-0 flex flex-col">
        <div className="p-6">
            <Link to="/" className="font-sans text-2xl font-bold tracking-tight text-white block mb-8">
                ticketz<span className="text-lime">.</span>
            </Link>
            
            <nav className="space-y-1">

                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all group ${
                                isActive 
                                    ? 'bg-lime/10 text-lime border-r-2 border-lime' 
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? 'text-lime' : 'group-hover:text-white'}`} />
                            <span className="font-medium text-sm tracking-wide">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>
        </div>

            {/* User Profile Snippet / Logout */}
            <div className="p-4 border-t border-white/5">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium text-sm">Log Out</span>
                </button>
            </div>
        </aside>
    );
}
