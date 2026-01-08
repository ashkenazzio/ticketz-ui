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
        <aside className="fixed left-0 top-0 h-screen w-64 bg-dark border-r border-white/5 flex flex-col z-40">
            {/* Logo Area */}
            <div className="h-20 flex items-center px-8 border-b border-white/5">
                <Link to="/" className="font-display text-2xl font-semibold tracking-tighter uppercase text-white">
                    Ticketz<span className="text-lime">.</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-8 px-4 space-y-2">
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
