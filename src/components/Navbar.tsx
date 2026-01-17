import { useState } from 'react';
import { Menu, X, Download, ChevronDown, Ticket, ShoppingBag, Users, Heart, Settings, LogOut, LayoutDashboard, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const userMenuItems = [
  { label: 'My Tickets', path: '/wallet', icon: Ticket },
  { label: 'My Orders', path: '/orders', icon: ShoppingBag },
  { label: 'My Communities', path: '/my-communities', icon: Users },
  { label: 'Saved Events', path: '/saved', icon: Heart },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMyAccountOpen, setIsMyAccountOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark/80 backdrop-blur-md border-b border-white/10 hidden md:block transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link to="/" className="font-sans text-2xl font-bold tracking-tight text-white flex items-center">
              ticketz<span className="text-lime">.</span>
            </Link>
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-400">
              <Link to="/attendees" className="hover:text-white transition-colors">Attendees</Link>
              <Link to="/organizers" className="hover:text-white transition-colors">Organizers</Link>
              <Link to="/discovery" className="hover:text-white transition-colors">Discovery</Link>
              <Link to="/communities" className="hover:text-white transition-colors">Communities</Link>
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
            </div>
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-6">
              <Link to="/app" className="text-sm font-semibold text-lime hover:text-limehover transition-colors uppercase tracking-wide">
                Open App
              </Link>
              <Link
                to="/dashboard"
                className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <div className="w-px h-5 bg-white/10" />

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/20">
                    <img
                      src={user?.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-64 bg-dark border border-white/10 shadow-2xl rounded-sm z-50 overflow-hidden">
                      {/* User Info */}
                      <div className="p-4 border-b border-white/10 bg-white/5">
                        <div className="font-serif font-bold text-white">{user?.name}</div>
                        <div className="text-xs text-gray-400 font-mono">{user?.email}</div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {userMenuItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-lime/10 hover:text-lime transition-colors"
                          >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                          </Link>
                        ))}
                      </div>

                      {/* Logout */}
                      <div className="border-t border-white/10 py-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors w-full"
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
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/app" className="text-sm font-semibold text-lime hover:text-limehover transition-colors uppercase tracking-wide">
                Open App
              </Link>
              <div className="w-px h-5 bg-white/10" />
              <Link to="/auth/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Log In
              </Link>
              <Link
                to="/auth/register"
                className="bg-lime text-dark px-5 py-2.5 font-bold text-sm hover:bg-limehover transition-colors flex items-center gap-2 rounded-sm"
              >
                <Download className="w-4 h-4" />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <nav className="md:hidden fixed top-0 w-full z-50 bg-dark/80 backdrop-blur-md border-b border-white/10 px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-sans text-xl font-bold tracking-tight text-white">
          ticketz<span className="text-lime">.</span>
        </Link>
        <div className="flex items-center gap-3">
          {isLoggedIn && user && (
            <Link to="/profile" className="w-8 h-8 rounded-xl overflow-hidden border border-white/20">
              <img
                src={user.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </Link>
          )}
          <button
            className="text-white w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden fixed top-16 right-0 bottom-0 z-40 w-80 bg-dark border-l border-white/10 transform transition-transform duration-300 ease-out overflow-y-auto ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* User Info + Primary Actions (if logged in) */}
          {isLoggedIn && user && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/20">
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-serif font-bold text-white text-lg">{user.name}</div>
                  <div className="text-sm text-gray-400 font-mono">{user.email}</div>
                </div>
              </div>

              {/* Primary Actions - Right below user info */}
              <div className="flex flex-col gap-2 mb-6">
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center gap-2 text-lime font-bold py-3 px-4 rounded-sm bg-lime/10 hover:bg-lime/20 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Organizer Dashboard
                </Link>
                <Link
                  to="/app"
                  className="text-white font-semibold py-3 px-4 rounded-sm bg-white/5 hover:bg-white/10 transition-colors flex justify-between items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Open Web App
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Collapsible My Account Section */}
              <div className="mb-6">
                <button
                  onClick={() => setIsMyAccountOpen(!isMyAccountOpen)}
                  className="w-full flex items-center justify-between text-xs uppercase tracking-wider text-gray-400 hover:text-lime mb-2 px-4 py-2 font-mono transition-colors"
                >
                  <span>My Account</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMyAccountOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isMyAccountOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <nav className="flex flex-col gap-1">
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center gap-3 text-gray-300 font-medium py-3 px-4 rounded-sm hover:bg-white/5 hover:text-white transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="w-4 h-4 text-gray-500" />
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>

              <div className="border-t border-white/10 mb-6" />
            </>
          )}

          {/* Open Web App for non-logged-in users */}
          {!isLoggedIn && (
            <div className="mb-6">
              <Link
                to="/app"
                className="text-white font-semibold py-3 px-4 rounded-sm bg-white/5 hover:bg-white/10 transition-colors flex justify-between items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Open Web App
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Navigation Links */}
          <div className="text-xs uppercase tracking-wider text-lime mb-3 px-4 font-mono">Explore</div>
          <nav className="flex flex-col gap-1">
            <Link
              to="/attendees"
              className="text-gray-300 font-medium py-3 px-4 rounded-sm hover:bg-white/5 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Attendees
            </Link>
            <Link
              to="/organizers"
              className="text-gray-300 font-medium py-3 px-4 rounded-sm hover:bg-white/5 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Organizers
            </Link>
            <Link
              to="/discovery"
              className="text-gray-300 font-medium py-3 px-4 rounded-sm hover:bg-white/5 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Discovery
            </Link>
            <Link
              to="/communities"
              className="text-gray-300 font-medium py-3 px-4 rounded-sm hover:bg-white/5 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Communities
            </Link>
            <Link
              to="/about"
              className="text-gray-300 font-medium py-3 px-4 rounded-sm hover:bg-white/5 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </nav>

          {/* Divider */}
          <div className="border-t border-white/10 my-6" />

          {/* Auth Actions */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-gray-400 font-medium py-3 px-4 rounded-sm hover:bg-red-500/10 hover:text-red-400 transition-colors w-full"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/auth/login"
                className="text-center text-white font-medium py-3 px-4 rounded-sm border border-white/20 hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                to="/auth/register"
                className="text-center bg-lime text-dark font-bold py-3 px-4 rounded-sm hover:bg-limehover transition-colors flex items-center justify-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Download className="w-4 h-4" />
                Sign Up
              </Link>
            </div>
          )}

          {/* Bottom spacer */}
          <div className="flex-1" />

          <p className="text-gray-600 text-xs text-center font-mono">
            © {new Date().getFullYear()} ticketz.
          </p>
        </div>
      </div>
    </>
  );
}
