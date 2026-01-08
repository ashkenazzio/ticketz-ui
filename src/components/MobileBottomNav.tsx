import { Home, Search, Ticket, User } from 'lucide-react';

export default function MobileBottomNav() {
  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
        <div className="glass-nav rounded-full border border-white/10 px-6 py-4 flex justify-between items-center shadow-2xl">
            <a href="#" className="text-lime flex flex-col items-center gap-1">
                <Home className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white flex flex-col items-center gap-1 transition-colors">
                <Search className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white flex flex-col items-center gap-1 transition-colors">
                <Ticket className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white flex flex-col items-center gap-1 transition-colors">
                <User className="w-5 h-5" />
            </a>
        </div>
    </div>
  );
}
