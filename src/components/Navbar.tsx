import { Menu, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark/95 backdrop-blur-sm border-b border-white/5 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link to="/" className="font-sans text-2xl font-bold tracking-tight text-white flex items-center">
                    ticketz<span className="text-lime">.</span>
                </Link>
                <div className="hidden lg:flex gap-6 text-sm font-medium text-gray-400">
                    <Link to="/discovery" className="hover:text-white transition-colors">Discovery</Link>
                    <Link to="/communities" className="hover:text-white transition-colors">Communities</Link>
                    <Link to="/about" className="hover:text-white transition-colors">About</Link>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <Link to="/auth/login" className="text-sm font-medium text-white hover:text-lime transition-colors">Log In</Link>
                <Link to="/auth/login" className="bg-lime text-dark px-4 py-2 rounded-md font-bold text-sm hover:bg-limehover transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Sign Up
                </Link>
            </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <nav className="md:hidden fixed top-0 w-full z-50 bg-dark border-b border-white/5 px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-sans text-xl font-bold tracking-tight text-white">ticketz<span className="text-lime">.</span></Link>
        <button className="text-white">
            <Menu className="w-6 h-6" />
        </button>
      </nav>
    </>
  );
}
