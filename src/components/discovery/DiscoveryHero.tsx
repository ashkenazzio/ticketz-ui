import { Search, MapPin, Calendar, Music, Code, Dumbbell, Palette, Users, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

const CATEGORIES = [
  { id: 'all', label: 'All Events', icon: Sparkles },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'tech', label: 'Tech', icon: Code },
  { id: 'fitness', label: 'Fitness', icon: Dumbbell },
  { id: 'art', label: 'Art & Culture', icon: Palette },
  { id: 'social', label: 'Social', icon: Users },
];

const ARTWORKS = [
  {
    id: '1',
    url: `${BASE}event-images/gallery-2.jpg`,
    alt: 'Art Gallery',
    className: 'rotate-[-6deg] translate-y-12 z-0 hidden lg:block'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80',
    alt: 'Rave Concert',
    className: 'rotate-[-3deg] translate-y-4 z-10 hidden md:block'
  },
  {
    id: '3',
    url: `${BASE}event-images/running-event-2.jpg`,
    alt: 'Running Club',
    className: 'rotate-[-1deg] translate-y-0 z-20 scale-90'
  },
  {
    id: '4',
    url: `${BASE}event-images/music-concertt.jpg`,
    alt: 'Live Concert',
    className: 'z-30 scale-110 shadow-2xl shadow-black/50 rotate-0'
  },
  {
    id: '5',
    url: `${BASE}event-images/yoga-event.jpg`,
    alt: 'Yoga Session',
    className: 'rotate-[1deg] translate-y-0 z-20 scale-90'
  },
  {
    id: '6',
    url: `${BASE}event-images/dance-show.jpg`,
    alt: 'Dance Performance',
    className: 'rotate-[3deg] translate-y-4 z-10 hidden md:block'
  },
  {
    id: '7',
    url: `${BASE}event-images/music-records.jpg`,
    alt: 'Music Records',
    className: 'rotate-[6deg] translate-y-12 z-0 hidden lg:block'
  }
];

export default function DiscoveryHero() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('type', 'events');
    if (searchQuery) params.set('q', searchQuery);
    if (activeCategory !== 'all') params.set('category', activeCategory);
    navigate(`/app/search?${params.toString()}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    const params = new URLSearchParams();
    params.set('type', 'events');
    if (categoryId !== 'all') params.set('category', categoryId);
    navigate(`/app/search?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-start text-center px-4 bg-dark pt-28 pb-16 overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Compact Header */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
          Discover <span className="italic text-lime">Events</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
          Find underground events, connect with your tribe, and experience community-first ticketing.
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-2xl mx-auto">
          <div className="bg-surface border border-white/10 rounded-lg p-2 flex flex-col sm:flex-row gap-2">
            {/* Search Input */}
            <div className="flex-1 flex items-center gap-3 bg-dark/50 rounded-md px-4 py-3">
              <Search className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search events, artists, venues..."
                className="bg-transparent w-full text-white placeholder-gray-500 focus:outline-none text-sm"
              />
            </div>

            {/* Location */}
            <button className="flex items-center gap-2 px-4 py-3 bg-dark/50 rounded-md text-gray-400 hover:text-white hover:bg-dark transition-colors">
              <MapPin className="w-4 h-4" />
              <span className="text-sm whitespace-nowrap">New York</span>
            </button>

            {/* Date */}
            <button className="flex items-center gap-2 px-4 py-3 bg-dark/50 rounded-md text-gray-400 hover:text-white hover:bg-dark transition-colors">
              <Calendar className="w-4 h-4" />
              <span className="text-sm whitespace-nowrap">Any Date</span>
            </button>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-lime text-dark font-bold px-6 py-3 rounded-md hover:bg-limehover transition-colors text-sm whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="pt-2 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                onMouseEnter={() => setActiveCategory(cat.id)}
                onMouseLeave={() => setActiveCategory('all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-lime text-dark'
                    : 'bg-surface border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="pt-4 flex items-center justify-center gap-6 text-sm text-gray-500">
          <span><strong className="text-white">2,400+</strong> events this week</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline"><strong className="text-white">180</strong> communities</span>
        </div>
      </div>

      {/* Artworks Grid */}
      <div className="w-full mt-10 sm:mt-16 flex items-center justify-center gap-2 sm:gap-4 px-4 h-[240px] sm:h-[340px] relative overflow-hidden">
        {ARTWORKS.map((art) => (
          <div key={art.id} className={`relative flex-shrink-0 transition-all duration-500 ease-out hover:z-40 hover:scale-105 ${art.className} w-28 h-40 sm:w-40 sm:h-56 md:w-56 md:h-72 group cursor-pointer`}>
            <div className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden border-4 sm:border-[6px] border-dark shadow-lg">
              <img
                src={art.url}
                alt={art.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
