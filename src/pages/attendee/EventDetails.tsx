import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { Calendar, MapPin, Clock, Share2, ArrowLeft } from 'lucide-react';

const artists = [
    { name: "Bonobo", img: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&w=200&q=80" },
    { name: "Four Tet", img: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&w=200&q=80" },
    { name: "Floating Points", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&w=200&q=80" },
    { name: "Caribou", img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=200&q=80" },
    { name: "Jon Hopkins", img: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?auto=format&fit=crop&w=200&q=80" },
    { name: "Bicep", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80" },
];

export default function EventDetails() {
  return (
    <div className="bg-dark min-h-screen text-white font-sans selection:bg-lime selection:text-black">
      <Navbar />
      
      <div className="flex flex-col lg:flex-row min-h-screen pt-20">
        
        {/* Left: Poster / Immersive Visual */}
        <div className="lg:w-1/2 h-[50vh] lg:h-[calc(100vh-80px)] relative lg:fixed lg:left-0 lg:top-20 z-0">
            <img src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Event Poster" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-90 lg:opacity-40"></div>
            
            <Link to="/" className="absolute top-6 left-6 z-20 w-10 h-10 bg-dark/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-dark transition-colors border border-white/10">
                <ArrowLeft className="w-5 h-5" />
            </Link>
        </div>

        {/* Spacer for Desktop fixed left side */}
        <div className="hidden lg:block lg:w-1/2"></div>

        {/* Right: Scrollable Details */}
        <div className="lg:w-1/2 relative z-10 bg-dark">
            <div className="p-6 md:p-12 pb-32">
                
                {/* Meta */}
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-lime/10 text-lime px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider border border-lime/20">Music Festival</span>
                    <button className="ml-auto text-gray-400 hover:text-white transition-colors"><Share2 className="w-5 h-5" /></button>
                </div>

                <h1 className="font-display text-5xl md:text-7xl font-semibold uppercase tracking-tighter leading-[0.9] mb-8">
                    Electric<br/>Garden
                </h1>

                {/* Key Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 border-y border-white/10 py-8">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-surface border border-white/10 rounded-sm">
                            <Calendar className="w-5 h-5 text-lime" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-white uppercase">Date</div>
                            <div className="text-sm text-gray-400">Nov 12 - 14, 2026</div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-surface border border-white/10 rounded-sm">
                            <Clock className="w-5 h-5 text-lime" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-white uppercase">Time</div>
                            <div className="text-sm text-gray-400">12:00 PM - 11:00 PM</div>
                        </div>
                    </div>
                    <div className="flex gap-4 md:col-span-2">
                        <div className="w-12 h-12 flex items-center justify-center bg-surface border border-white/10 rounded-sm">
                            <MapPin className="w-5 h-5 text-lime" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-white uppercase">The Conservatory</div>
                            <div className="text-sm text-gray-400">1200 Flower District Blvd, City Center</div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-12">
                    <h3 className="font-display text-2xl font-semibold uppercase tracking-tight mb-4">About</h3>
                    <p className="text-gray-400 leading-relaxed text-lg">
                        Immerse yourself in a botanical auditory experience. Electric Garden transforms the city's historic conservatory into a 3-day electronic music haven. Featuring state-of-the-art projection mapping on organic structures.
                    </p>
                </div>

                {/* Lineup */}
                <div className="mb-12">
                    <h3 className="font-display text-2xl font-semibold uppercase tracking-tight mb-6">Lineup</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {artists.map((artist, idx) => (
                            <div key={idx} className="group relative aspect-square overflow-hidden rounded-sm bg-surface">
                                <img src={artist.img} alt={artist.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 font-display font-medium text-white tracking-wide uppercase">{artist.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 right-0 w-full lg:w-1/2 bg-surface border-t border-white/10 p-6 flex items-center justify-between z-50">
                <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total Price</div>
                    <div className="text-3xl font-display font-semibold text-white">$89.00</div>
                </div>
                <Link to="/checkout" className="bg-lime text-dark font-display font-semibold uppercase tracking-tight px-10 py-4 rounded-sm hover:bg-limehover transition-colors shadow-[0_0_20px_rgba(187,223,50,0.3)]">
                    Buy Tickets
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
}
