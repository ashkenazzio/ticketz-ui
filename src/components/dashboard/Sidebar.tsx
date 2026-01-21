import { useState } from 'react';
import { LayoutDashboard, Calendar, Users, BarChart3, Settings, LogOut, X, Shield, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import CommunityPicker, { type Community } from './CommunityPicker';

const navItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Events', icon: Calendar, path: '/dashboard/events' },
    { name: 'Members', icon: Users, path: '/dashboard/members' },
    { name: 'Team', icon: Shield, path: '/dashboard/team' },
    { name: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
    { name: 'Settings', icon: Settings, path: '/dashboard/community/settings' },
];

// Mock communities the user manages
const mockCommunities: Community[] = [
    {
        id: '1',
        name: 'Bass Sector',
        avatar: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=100&q=80',
        memberCount: 2500,
        role: 'owner',
    },
    {
        id: '2',
        name: 'Warehouse Collective',
        avatar: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&q=80',
        memberCount: 850,
        role: 'admin',
    },
    {
        id: '3',
        name: 'NYC Underground',
        avatar: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&q=80',
        memberCount: 1200,
        role: 'moderator',
    },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
    const location = useLocation();
    const [selectedCommunityId, setSelectedCommunityId] = useState(mockCommunities[0].id);

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-0 left-0 z-50 lg:z-auto
                w-64 bg-surface border-r border-white/5 h-screen flex flex-col
                transform transition-transform duration-300 ease-out lg:transform-none
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/dashboard" className="font-sans text-2xl font-bold tracking-tight text-white block">
                            ticketz<span className="text-lime">.</span>
                        </Link>
                        {/* Close button for mobile */}
                        <button
                            className="lg:hidden text-gray-400 hover:text-white transition-colors"
                            onClick={onClose}
                            aria-label="Close sidebar"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Community Picker */}
                    <div className="mb-6">
                        <CommunityPicker
                            communities={mockCommunities}
                            selectedId={selectedCommunityId}
                            onSelect={setSelectedCommunityId}
                        />
                    </div>

                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={onClose}
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

                <div className="mt-auto p-4 border-t border-white/5 space-y-2">
                    <Link
                        to="/dashboard/community/new"
                        onClick={onClose}
                        className="flex items-center gap-3 w-full px-4 py-3 text-lime hover:text-limehover hover:bg-lime/5 rounded-sm transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="font-medium text-sm">New Community</span>
                    </Link>
                    <Link
                        to="/app"
                        onClick={onClose}
                        className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-sm">Exit Dashboard</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}
