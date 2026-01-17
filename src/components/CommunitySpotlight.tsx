import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

const VIBES = [
    {
        id: 'adrenaline',
        title: 'Adrenaline',
        desc: 'Heart rate up, lights down. Underground bass and warehouse raves.',
        image: `${BASE}event-images/techno-gathering.jpg`,
        colSpan: 'md:col-span-1'
    },
    {
        id: 'clarity',
        title: 'Clarity',
        desc: 'Mindfulness, yoga, and matcha mornings.',
        image: `${BASE}event-images/yoga-event.jpg`,
        colSpan: 'md:col-span-1'
    },
    {
        id: 'craft',
        title: 'Craft',
        desc: 'Pottery wheels, coding workshops, and sourdough starters.',
        image: `${BASE}event-images/painting-class.jpg`,
        colSpan: 'md:col-span-1'
    }
];

export default function CommunitySpotlight() {
  return (
    <section className="bg-dark relative py-24 overflow-hidden">
        {/* Background Mesh (Optional, keeping it clean for now) */}
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div className="max-w-2xl">
                     <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-surface border border-lime/20 text-lime font-mono text-xs uppercase tracking-widest">
                        <Sparkles className="w-3 h-3" /> Curated Vibes
                    </div>
                    <h2 className="font-serif text-5xl md:text-6xl font-bold text-white leading-[0.95]">
                        Find Your <span className="text-lime italic">Frequency.</span>
                    </h2>
                </div>
                <p className="text-gray-400 text-lg font-sans max-w-sm md:text-right">
                    Don't just browse events.<br />Choose your mood.
                </p>
            </div>

            {/* Vibe Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {VIBES.map((vibe) => (
                    <Link 
                        key={vibe.id} 
                        to={`/vibe/${vibe.id}`} 
                        className={`group relative h-[500px] overflow-hidden rounded-lg border border-white/10 bg-surface hover:border-lime/50 transition-all duration-500 hover:shadow-float hover:shadow-glow-lime hover:-translate-y-2 ${vibe.colSpan}`}
                    >
                        {/* Image Layer */}
                        <div className="absolute inset-0 z-0">
                            <img 
                                src={vibe.image} 
                                alt={vibe.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
                        </div>
                        
                        {/* Content Layer */}
                        <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                            <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                                <h3 className="font-serif text-4xl text-white mb-2 group-hover:text-lime transition-colors">
                                    {vibe.title}
                                </h3>
                                <p className="text-gray-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 max-w-[80%]">
                                    {vibe.desc}
                                </p>
                                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white border-b border-white/30 pb-1 group-hover:border-lime group-hover:text-lime transition-colors">
                                    Explore The Vibe <ArrowRight className="w-3 h-3" />
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </section>
  );
}
