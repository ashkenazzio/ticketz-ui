import { Home, Search, Ticket, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function MobileBottomNav() {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
        <div className="glass-nav rounded-full border border-white/10 px-6 py-4 flex justify-between items-center shadow-2xl">
            <Link to="/app" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/app') && !isActive('/app/search') ? 'text-lime' : 'text-gray-400 hover:text-white'}`}>
                <Home className="w-5 h-5" />
            </Link>
            <Link to="/app/search" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/app/search') ? 'text-lime' : 'text-gray-400 hover:text-white'}`}>
                <Search className="w-5 h-5" />
            </Link>
            <Link to="/wallet" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/wallet') ? 'text-lime' : 'text-gray-400 hover:text-white'}`}>
                <Ticket className="w-5 h-5" />
            </Link>
            <Link to="/profile" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/profile') ? 'text-lime' : 'text-gray-400 hover:text-white'}`}>
                <User className="w-5 h-5" />
            </Link>
        </div>
    </div>
  );
}
