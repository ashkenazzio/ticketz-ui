import { Calendar, MapPin, Music, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EventHighlight() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="font-display text-4xl font-semibold uppercase tracking-tighter mb-12 border-b border-white/10 pb-4">Upcoming Highlight</h2>
        
        <div className="flex flex-col lg:flex-row bg-dark border border-white/10 rounded-sm overflow-hidden h-auto lg:h-[600px]">
            {/* Left: Poster Art */}
            <div className="lg:w-1/2 relative">
                <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Electric Garden" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-80 lg:opacity-30"></div>
                <div className="absolute bottom-6 left-6 z-10 lg:hidden">
                     <h2 className="font-display text-4xl font-semibold uppercase tracking-tighter text-white">Electric Garden</h2>
                </div>
            </div>

            {/* Right: Details */}
            <div className="lg:w-1/2 p-5 sm:p-8 lg:p-12 flex flex-col justify-between bg-surface relative">
                
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-lime/10 text-lime px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider border border-lime/20">Music Festival</span>
                        <span className="text-gray-400 text-sm flex items-center gap-1"><Calendar className="w-3 h-3" /> Nov 12 - 14</span>
                    </div>

                    <h2 className="hidden lg:block font-display text-5xl xl:text-6xl font-semibold uppercase tracking-tighter text-white mb-6 leading-none">
                        Electric<br/>Garden
                    </h2>

                    <Link to="/community/comm-001" className="flex items-center gap-3 mb-8 group w-fit">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                            <img src="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=100&auto=format&fit=crop" alt="Bass Sector" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Hosted by <span className="text-lime underline decoration-lime underline-offset-4 group-hover:text-limehover">Bass Sector</span></span>
                    </Link>

                    <div className="space-y-4 mb-8">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-sm border border-white/10">
                                <MapPin className="w-5 h-5 text-gray-300" />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-white uppercase">The Conservatory</div>
                                <div className="text-sm text-gray-400">1200 Flower District Blvd, City Center</div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-sm border border-white/10">
                                <Music className="w-5 h-5 text-gray-300" />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-white uppercase">Lineup</div>
                                <div className="text-sm text-gray-400">Bonobo, Four Tet, Floating Points...</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky-ish Bottom Action */}
                <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">Starting from</div>
                        <div className="text-2xl sm:text-3xl font-display font-semibold text-white">$89.00</div>
                    </div>
                    <Link to="/event/evt-001" className="bg-lime text-dark font-display font-semibold uppercase tracking-tight px-6 sm:px-10 py-3 sm:py-4 rounded-sm hover:bg-limehover transition-colors flex items-center gap-2 w-full sm:w-auto justify-center text-sm sm:text-base">
                        Get Tickets <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                </div>
            </div>
        </div>
    </section>
  );
}
