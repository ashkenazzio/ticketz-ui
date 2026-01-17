import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

const CATEGORIES = [
    {
        id: 'tech',
        title: 'Builders & Hackers',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'wellness',
        title: 'Breath & Movement',
        image: `${BASE}event-images/yoga-event-2.jpg`
    },
    {
        id: 'nightlife',
        title: 'After Hours',
        image: `${BASE}event-images/techno-gathering.jpg`
    },
    {
        id: 'art',
        title: 'Creators',
        image: `${BASE}event-images/painting-class.jpg`
    }
];

export default function FrequencyDiscovery() {
  return (
    <section className="py-24 border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tighter">
                Choose Your <span className="text-lime">Frequency.</span>
            </h2>
            <div className="text-lime/70 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                <span className="hidden sm:inline">Scroll to Explore</span>
                <span className="sm:hidden">Swipe to explore</span>
                <span>→</span>
            </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-4 overflow-x-auto pb-8 px-4 md:px-6 snap-x snap-mandatory scrollbar-hide">
            {CATEGORIES.map((cat) => (
                <Link 
                    to={`/category/${cat.id}`} 
                    key={cat.id} 
                    className="relative flex-shrink-0 w-[80vw] md:w-[25vw] aspect-[9/16] bg-gray-800 snap-center group overflow-hidden rounded-lg"
                >
                    <img 
                        src={cat.image} 
                        alt={cat.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-90"></div>
                    
                    <div className="absolute bottom-0 left-0 p-8">
                        <h3 className="font-display text-3xl font-semibold uppercase tracking-tight text-white leading-none mb-2">
                            {cat.title}
                        </h3>
                         <div className="w-0 group-hover:w-full h-1 bg-lime transition-all duration-500"></div>
                    </div>
                </Link>
            ))}
        </div>
    </section>
  );
}