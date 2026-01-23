/**
 * Static version of Sidebar for design system showcase.
 * Removes fixed/sticky positioning that causes issues at smaller viewports.
 * Always visible, no mobile overlay behavior.
 */
import { useState } from 'react';
import { LayoutDashboard, Calendar, Users, BarChart3, Settings, LogOut, Shield, Plus } from 'lucide-react';
import CommunityPicker, { type Community } from '../../../components/dashboard/CommunityPicker';

const navItems = [
  { name: 'Overview', icon: LayoutDashboard, path: '/dashboard', isActive: true },
  { name: 'Events', icon: Calendar, path: '/dashboard/events', isActive: false },
  { name: 'Members', icon: Users, path: '/dashboard/members', isActive: false },
  { name: 'Team', icon: Shield, path: '/dashboard/team', isActive: false },
  { name: 'Analytics', icon: BarChart3, path: '/dashboard/analytics', isActive: false },
  { name: 'Settings', icon: Settings, path: '/dashboard/community/settings', isActive: false },
];

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
];

interface StaticSidebarProps {
  activeItem?: string;
}

export default function StaticSidebar({ activeItem = 'Overview' }: StaticSidebarProps) {
  const [selectedCommunityId, setSelectedCommunityId] = useState(mockCommunities[0].id);

  return (
    <aside className="hidden lg:flex w-64 bg-surface border-r border-white/5 h-full flex-col flex-shrink-0">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="font-sans text-2xl font-bold tracking-tight text-white">
            ticketz<span className="text-lime">.</span>
          </div>
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
            const isActive = item.name === activeItem;
            return (
              <div
                key={item.name}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-lime/10 text-lime border-r-2 border-lime'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-lime' : 'group-hover:text-white'}`} />
                <span className="font-medium text-sm tracking-wide">{item.name}</span>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-white/5 space-y-2">
        <div className="flex items-center gap-3 w-full px-4 py-3 text-lime hover:text-limehover hover:bg-lime/5 rounded-sm transition-colors cursor-pointer">
          <Plus className="w-5 h-5" />
          <span className="font-medium text-sm">New Community</span>
        </div>
        <div className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-colors cursor-pointer">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Exit Dashboard</span>
        </div>
      </div>
    </aside>
  );
}
