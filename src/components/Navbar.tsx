import { Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-nav border-b border-white/5 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <a href="#" className="font-display text-3xl font-semibold tracking-tighter uppercase">Ticketz<span className="text-lime">.</span></a>
                <div className="hidden lg:flex gap-6 text-sm font-medium text-gray-400">
                    <a href="#" className="hover:text-white transition-colors">Discovery</a>
                    <a href="#" className="hover:text-white transition-colors">Communities</a>
                    <a href="#" className="hover:text-white transition-colors">About</a>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="p-2 hover:text-lime transition-colors">
                    <Search className="w-5 h-5" />
                </button>
                <Link to="/auth/login" className="text-sm font-medium hover:text-lime transition-colors">Log In</Link>
                <Link to="/auth/login" className="bg-lime text-dark px-5 py-2 rounded-sm font-semibold text-sm hover:bg-limehover transition-colors uppercase tracking-tight">
                    Sign Up
                </Link>
            </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <nav className="md:hidden fixed top-0 w-full z-50 glass-nav border-b border-white/5 px-4 h-16 flex items-center justify-between">
        <a href="#" className="font-display text-2xl font-semibold tracking-tighter uppercase">Ticketz<span className="text-lime">.</span></a>
        <button className="text-white">
            <Menu className="w-6 h-6" />
        </button>
      </nav>
    </>
  );
}
