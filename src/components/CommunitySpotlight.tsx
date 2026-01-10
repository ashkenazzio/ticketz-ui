import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

const VIBES = [
    {
        id: 'adrenaline',
        title: 'Adrenaline',
        desc: 'Heart rate up, lights down. Underground bass and warehouse raves.',
        image: `${BASE}event-images/techno-gathering.jpg`
    },
    {
        id: 'clarity',
        title: 'Clarity',
        desc: 'Mindfulness, yoga, and matcha mornings.',
        image: `${BASE}event-images/yoga-event.jpg`
    },
    {
        id: 'craft',
        title: 'Craft',
        desc: 'Pottery wheels, coding workshops, and sourdough starters.',
        image: `${BASE}event-images/painting-class.jpg`
    }
];

export default function CommunitySpotlight() {
  return (
    <section className="bg-surface border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                <div>
                     <div className="inline-flex items-center gap-2 mb-4 text-lime font-mono text-xs uppercase tracking-widest">
                        <Sparkles className="w-3 h-3" /> Curated Vibes
                    </div>
                    <h2 className="font-display text-5xl md:text-6xl font-semibold uppercase tracking-tighter leading-none">
                        Find Your <br/><span className="text-gray-500">Frequency.</span>
                    </h2>
                </div>
                <p className="text-gray-400 text-lg max-w-md font-sans">
                    Don't just browse events. Choose your mood.
                </p>
            </div>

            {/* Vibe Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {VIBES.map((vibe) => (
                    <Link key={vibe.id} to={`/vibe/${vibe.id}`} className="group relative block aspect-[3/4] overflow-hidden rounded-sm">
                        <img 
                            src={vibe.image} 
                            alt={vibe.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent transition-opacity duration-300 group-hover:via-dark/40"></div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 group-hover:-translate-y-2">
                            <h3 className="font-display text-3xl font-semibold uppercase tracking-tight mb-2 text-white group-hover:text-lime transition-colors">
                                {vibe.title}
                            </h3>
                            <p className="text-gray-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                                {vibe.desc}
                            </p>
                            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lime">
                                Explore The Vibe <ArrowRight className="w-3 h-3" />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </section>
  );
}
