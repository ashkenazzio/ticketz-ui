import { ArrowRight, Calendar, Code, Music, Palette } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

export default function DiscoveryGrid() {
  return (
    <section className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Discover your scene</h2>
                <p className="text-gray-400">Curated events for every interest.</p>
            </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            
            {/* Card 1: Large - Tech (Span 2 cols, 2 rows) */}
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-lg bg-surface min-h-[280px]">
                <img 
                    src={`${BASE}event-images/tech-conference.jpg`} 
                    alt="Tech Event" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                    <div className="bg-blue-500/20 text-blue-400 p-2 rounded-lg inline-block mb-4 backdrop-blur-md">
                        <Code className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-serif text-white mb-2">Learn & Build</h3>
                    <p className="text-gray-300 mb-6 max-w-sm">Join hackathons, workshops, and developer meetups in your area.</p>
                    <button className="text-white font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                        Browse Tech <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Card 2: Square - Arts */}
            <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-lg bg-surface min-h-[180px]">
                <img
                    src={`${BASE}event-images/painting-workshop.jpg`} 
                    alt="Arts Event" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                    <div className="bg-purple-500/20 text-purple-400 p-1.5 rounded-lg inline-block mb-2 backdrop-blur-md">
                        <Palette className="w-4 h-4" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Arts & Crafts</h3>
                </div>
            </div>

            {/* Card 3: Square - Fitness/Run Club */}
            <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-lg bg-surface min-h-[180px]">
                 <img
                    src={`${BASE}event-images/running-event.jpg`} 
                    alt="Fitness Event" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                    <div className="bg-orange-500/20 text-orange-400 p-1.5 rounded-lg inline-block mb-2 backdrop-blur-md">
                        <Music className="w-4 h-4" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Run Clubs</h3>
                </div>
            </div>

            {/* Card 4: Wide - Calendar/Weekend (Span 2 cols) */}
            <div className="md:col-span-2 md:row-span-1 relative overflow-hidden rounded-lg bg-surface border border-white/5 flex flex-col justify-center p-8 group hover:border-lime/30 hover:shadow-glow-lime transition-all">
                <div className="absolute top-0 right-0 p-32 bg-lime/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                
                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-lime/20 p-3 rounded-full text-lime">
                        <Calendar className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-serif text-white">This Weekend</h3>
                </div>
                
                <p className="text-gray-400 mb-6">See what's happening around you in the next 48 hours.</p>
                
                <div className="flex gap-2">
                    <div className="bg-white/5 px-4 py-2 rounded-full text-sm text-gray-300 border border-white/5">Sat, Jan 17</div>
                    <div className="bg-white/5 px-4 py-2 rounded-full text-sm text-gray-300 border border-white/5">Sun, Jan 18</div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}
