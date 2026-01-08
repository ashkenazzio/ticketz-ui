import Navbar from '../../components/Navbar';
import MobileBottomNav from '../../components/MobileBottomNav';
import { Users, Calendar, ArrowRight, Bookmark } from 'lucide-react';

const events = [
  {
    id: 1,
    date: "Fri, Oct 30 • 11:00 PM",
    title: "Warehouse Project: 004",
    price: "$35",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    date: "Sat, Nov 07 • 10:00 PM",
    title: "Dubstep Chronicles",
    price: "$25",
    image: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    date: "Fri, Nov 13 • 11:00 PM",
    title: "Jungle Massive",
    price: "$30",
    image: "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function CommunityHub() {
  return (
    <div className="bg-dark min-h-screen text-white font-sans selection:bg-lime selection:text-black pb-24">
      <Navbar />
      
      {/* Branded Header Banner */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
            alt="Banner" 
            className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row items-end md:items-center justify-between gap-6 max-w-7xl mx-auto">
            <div className="flex items-end gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-surface border-2 border-white/10 shadow-2xl rounded-sm overflow-hidden flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1000&auto=format&fit=crop" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div className="mb-2">
                    <h1 className="font-display text-4xl md:text-6xl font-semibold uppercase tracking-tighter leading-none">Bass Sector</h1>
                    <div className="flex items-center gap-4 text-gray-400 mt-2 text-sm font-medium">
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 2.5k Members</span>
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 12 Past Events</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        {/* Subscribe Action */}
        <button className="w-full border border-white/30 text-white font-display text-xl font-semibold uppercase tracking-tight py-4 rounded-sm hover:border-lime hover:text-lime hover:bg-lime/5 transition-all mb-16">
            Subscribe to Community
        </button>

        {/* Upcoming Events */}
        <h2 className="font-display text-3xl font-semibold uppercase tracking-tighter mb-8 border-b border-white/10 pb-4">Upcoming Events</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
                <div key={event.id} className="group relative bg-surface border border-white/5 hover:border-lime/50 transition-all duration-300 rounded-sm overflow-hidden flex flex-col h-full cursor-pointer">
                    <div className="relative h-56 overflow-hidden">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-lime text-xs font-mono uppercase">{event.date}</div>
                            <div className="text-white font-semibold">{event.price}</div>
                        </div>
                        <h3 className="font-display text-xl font-semibold uppercase tracking-tight leading-none mb-6 group-hover:text-lime transition-colors">{event.title}</h3>
                        
                        <div className="mt-auto flex items-center justify-between">
                            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider group-hover:text-white transition-colors flex items-center gap-1">
                                Get Tickets <ArrowRight className="w-3 h-3" />
                            </span>
                            <button className="text-gray-400 hover:text-white transition-colors">
                                <Bookmark className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
