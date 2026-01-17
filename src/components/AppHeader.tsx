import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, Ticket, Search, Users, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AppHeaderProps {
  title?: string;
}

const navItems = [
  { path: '/app', label: 'Home', icon: Home },
  { path: '/wallet', label: 'Tickets', icon: Ticket },
  { path: '/discovery', label: 'Explore', icon: Search },
  { path: '/my-communities', label: 'Groups', icon: Users },
];

export default function AppHeader({ title }: AppHeaderProps) {
  const location = useLocation();
  const { user } = useAuth();

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
            <Link
              to="/dashboard"
              className="hidden sm:flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden lg:inline">Dashboard</span>
            </Link>
            <Link
              to="/settings"
              className="w-9 h-9 bg-surface rounded-sm flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Settings className="w-4 h-4 text-gray-400" />
            </Link>
            <Link to="/profile" className="w-9 h-9 rounded-full overflow-hidden border-2 border-lime/50 hover:border-lime transition-colors">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </Link>
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
          <Link
            to="/settings"
            className={`flex flex-col items-center gap-1 py-1 px-3 ${
              isActive('/settings') ? 'text-lime' : 'text-gray-400'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-[10px] uppercase">Settings</span>
          </Link>
        </div>
      </div>
    </>
  );
}
