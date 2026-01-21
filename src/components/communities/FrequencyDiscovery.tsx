import { Link } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

// Creative titles and curated images for each category
const CATEGORIES = [
    {
        id: 'music',
        title: 'Sound Chasers',
        subtitle: 'From underground raves to intimate sessions',
        image: `${BASE}event-images/techno-gathering-2.jpg`
    },
    {
        id: 'tech',
        title: 'Builders & Hackers',
        subtitle: 'Where ideas become reality',
        image: `${BASE}event-images/tech-conference.jpg`
    },
    {
        id: 'fitness',
        title: 'Movement Culture',
        subtitle: 'Push limits, find your tribe',
        image: `${BASE}event-images/running-event.jpg`
    },
    {
        id: 'creative',
        title: 'The Creators',
        subtitle: 'Art, design & everything in between',
        image: `${BASE}event-images/painting-workshop.jpg`
    },
    {
        id: 'social',
        title: 'Scene Makers',
        subtitle: 'Connect, celebrate, belong',
        image: `${BASE}event-images/people-gathering.jpg`
    },
    {
        id: 'wellness',
        title: 'Inner Circle',
        subtitle: 'Mind, body & soul alignment',
        image: `${BASE}event-images/yoga-event.jpg`
    },
    {
        id: 'food',
        title: 'Taste Hunters',
        subtitle: 'Culinary adventures await',
        image: `${BASE}event-images/market.jpg`
    },
    {
        id: 'sports',
        title: 'Game On',
        subtitle: 'Competition fuels connection',
        image: `${BASE}event-images/surf-shop.jpg`
    },
    {
        id: 'gaming',
        title: 'Player One',
        subtitle: 'Level up together',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
    },
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
                    to={`/app/search?type=communities&category=${cat.id}`}
                    key={cat.id}
                    className="relative flex-shrink-0 w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] aspect-[9/16] bg-gray-800 snap-center group overflow-hidden rounded-lg"
                >
                    <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent opacity-90"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <h3 className="font-display text-2xl sm:text-3xl font-semibold uppercase tracking-tight text-white leading-none mb-2">
                            {cat.title}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {cat.subtitle}
                        </p>
                        <div className="w-0 group-hover:w-full h-1 bg-lime transition-all duration-500"></div>
                    </div>
                </Link>
            ))}
        </div>
    </section>
  );
}
