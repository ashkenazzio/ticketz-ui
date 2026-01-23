import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Settings, Ticket, Search, Users, Home, LogOut, ExternalLink, ChevronDown, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationsDropdown from './NotificationsDropdown';

interface AppHeaderProps {
  title?: string;
  hideMobileNav?: boolean;
}

const navItems = [
  { path: '/app', label: 'Home', icon: Home },
  { path: '/wallet', label: 'Tickets', icon: Ticket },
  { path: '/app/search', label: 'Explore', icon: Search },
  { path: '/my-communities', label: 'Communities', icon: Users },
];

export default function AppHeader({ title, hideMobileNav }: AppHeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Hide mobile nav on pages with their own bottom bar (event details)
  const shouldHideMobileNav = hideMobileNav || location.pathname.startsWith('/event/');

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/');
  };

  const isActive = (path: string) => {
    if (path === '/app') return location.pathname === '/app';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo + Nav */}
          <div className="flex items-center gap-8">
            <Link to="/app" className="font-sans text-xl font-bold tracking-tight text-white">
              ticketz<span className="text-lime">.</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-sm transition-colors ${
                    isActive(item.path)
                      ? 'text-lime bg-lime/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="hidden sm:flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden lg:inline">Dashboard</span>
                </Link>
                <NotificationsDropdown />

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 hover:bg-white/5 rounded-sm px-2 py-1 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-lime/50">
                      <img
                        src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"}
                        alt="Profile"
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
                      <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-white/10 shadow-xl z-50 rounded-sm">
                        {/* User Info */}
                        <div className="p-4 border-b border-white/5">
                          <p className="font-semibold text-white text-sm">{user?.name || 'User'}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          <Link
                            to="/profile"
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
                          >
                            <Users className="w-4 h-4" />
                            My Profile
                          </Link>
                          <Link
                            to="/settings"
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </Link>
                          <Link
                            to="/dashboard"
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-colors sm:hidden"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                        </div>

                        {/* Divider + Exit Actions */}
                        <div className="border-t border-white/5 p-2">
                          <Link
                            to="/"
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Exit to Website
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
              </>
            ) : (
              <>
                {/* Unauthenticated state */}
                <Link
                  to="/auth/login"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
                <Link
                  to="/auth/register"
                  className="flex items-center gap-2 text-sm bg-lime text-dark font-semibold px-4 py-2 rounded-sm hover:bg-limehover transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Page Title (optional) */}
        {title && (
          <div className="border-t border-white/5 bg-surface/50">
            <div className="max-w-5xl mx-auto px-4 py-4">
              <h1 className="font-display text-xl sm:text-2xl font-semibold uppercase tracking-tight text-white">
                {title}
              </h1>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Nav */}
      {!shouldHideMobileNav && (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-white/5 px-4 py-2 z-50">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 py-1 px-3 ${
                isActive(item.path) ? 'text-lime' : 'text-gray-400'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] uppercase">{item.label}</span>
            </Link>
          ))}
          {isAuthenticated ? (
            <Link
              to="/profile"
              className={`flex flex-col items-center gap-1 py-1 px-3 ${
                isActive('/profile') || isActive('/settings') ? 'text-lime' : 'text-gray-400'
              }`}
            >
              <div className="w-5 h-5 rounded-full overflow-hidden">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] uppercase">Profile</span>
            </Link>
          ) : (
            <Link
              to="/auth/login"
              className={`flex flex-col items-center gap-1 py-1 px-3 ${
                isActive('/auth') ? 'text-lime' : 'text-gray-400'
              }`}
            >
              <LogIn className="w-5 h-5" />
              <span className="text-[10px] uppercase">Sign In</span>
            </Link>
          )}
        </div>
      </div>
      )}
    </>
  );
}
