import { useState } from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, ChevronRight, ChevronDown, Settings, LogOut, User, ExternalLink } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardNotifications from '../components/dashboard/DashboardNotifications';
import { useAuth } from '../context/AuthContext';

// Mock communities the user manages (should match Sidebar)
const mockCommunities = [
  {
    id: '1',
    name: 'Bass Sector',
    avatar: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=100&q=80',
  },
  {
    id: '2',
    name: 'Warehouse Collective',
    avatar: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&q=80',
  },
  {
    id: '3',
    name: 'NYC Underground',
    avatar: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&q=80',
  },
];

// Route to breadcrumb mapping
const routeLabels: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/events': 'Events',
  '/dashboard/members': 'Members',
  '/dashboard/team': 'Team',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/community/settings': 'Settings',
  '/dashboard/community/new': 'New Community',
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedCommunityId, setSelectedCommunityId] = useState(mockCommunities[0].id);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const selectedCommunity = mockCommunities.find(c => c.id === selectedCommunityId) || mockCommunities[0];

  // Get breadcrumb label from current route
  const getCurrentPageLabel = () => {
    // Check for exact match first
    if (routeLabels[location.pathname]) {
      return routeLabels[location.pathname];
    }
    // Check for partial matches (for nested routes)
    for (const [route, label] of Object.entries(routeLabels)) {
      if (location.pathname.startsWith(route) && route !== '/dashboard') {
        return label;
      }
    }
    return 'Overview';
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/');
  };

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
              <span className="text-white font-medium">{getCurrentPageLabel()}</span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 lg:gap-6">
            <DashboardNotifications />

            {/* Profile Section with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 pl-4 lg:pl-6 border-l border-white/10 hover:bg-white/5 rounded-sm pr-2 py-1 transition-colors"
              >
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-white">{user?.name || 'Alex Rivera'}</div>
                </div>
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-surface border border-white/10 overflow-hidden">
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
              </button>

              {showProfileMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowProfileMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-64 bg-surface border border-white/10 shadow-xl z-50 rounded-sm">
                    {/* User Info */}
                    <div className="p-4 border-b border-white/5">
                      <p className="font-semibold text-white text-sm">{user?.name || 'Alex Rivera'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'alex@example.com'}</p>
                    </div>

                    {/* Current Community */}
                    <div className="p-4 border-b border-white/5">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Managing</p>
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedCommunity.avatar}
                          alt={selectedCommunity.name}
                          className="w-8 h-8 rounded-sm object-cover"
                        />
                        <span className="text-sm font-medium text-white">{selectedCommunity.name}</span>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <Link
                        to="/profile"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <Link
                        to="/dashboard/community/settings"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Community Settings
                      </Link>
                    </div>

                    {/* Divider + Exit Actions */}
                    <div className="border-t border-white/5 p-2">
                      <Link
                        to="/app"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Exit to App
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-sm transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                </>
              )}
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
