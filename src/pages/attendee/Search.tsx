import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, MapPin, Calendar, Music, Code, Dumbbell, Palette, Users, Sparkles, Heart, Clock, ArrowLeft, X } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

const EVENT_CATEGORIES = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'tech', label: 'Tech', icon: Code },
  { id: 'fitness', label: 'Fitness', icon: Dumbbell },
  { id: 'art', label: 'Art & Culture', icon: Palette },
  { id: 'social', label: 'Social', icon: Users },
];

const COMMUNITY_CATEGORIES = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'tech', label: 'Tech', icon: Code },
  { id: 'fitness', label: 'Fitness', icon: Dumbbell },
  { id: 'creative', label: 'Creative', icon: Palette },
  { id: 'social', label: 'Social', icon: Users },
  { id: 'wellness', label: 'Wellness', icon: Heart },
];

const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Techno Bunker: Warehouse Vol. 4',
    date: 'Sat, Jan 25',
    time: '22:00',
    location: 'Brooklyn, NY',
    image: `${BASE}event-images/techno-gathering.jpg`,
    category: 'music',
    price: '$25',
  },
  {
    id: '2',
    title: 'React NYC January Meetup',
    date: 'Thu, Jan 23',
    time: '18:30',
    location: 'Manhattan, NY',
    image: `${BASE}event-images/tech-conference.jpg`,
    category: 'tech',
    price: 'Free',
  },
  {
    id: '3',
    title: 'Sunrise Yoga in the Park',
    date: 'Sun, Jan 26',
    time: '06:30',
    location: 'Central Park, NY',
    image: `${BASE}event-images/yoga-event.jpg`,
    category: 'fitness',
    price: '$15',
  },
  {
    id: '4',
    title: 'Underground Hip-Hop Showcase',
    date: 'Fri, Jan 24',
    time: '21:00',
    location: 'Queens, NY',
    image: `${BASE}event-images/hiphop-show.jpg`,
    category: 'music',
    price: '$20',
  },
  {
    id: '5',
    title: 'NYC Marathon Training Run',
    date: 'Sat, Jan 25',
    time: '07:00',
    location: 'Prospect Park, NY',
    image: `${BASE}event-images/running-event.jpg`,
    category: 'fitness',
    price: 'Free',
  },
  {
    id: '6',
    title: 'Gallery Opening: Modern Visions',
    date: 'Thu, Jan 23',
    time: '19:00',
    location: 'Chelsea, NY',
    image: `${BASE}event-images/gallery.jpg`,
    category: 'art',
    price: '$10',
  },
  {
    id: '7',
    title: 'Startup Founder Mixer',
    date: 'Wed, Jan 22',
    time: '18:00',
    location: 'SoHo, NY',
    image: `${BASE}event-images/startup-gathering.jpg`,
    category: 'social',
    price: 'Free',
  },
  {
    id: '8',
    title: 'Live Jazz & Vinyl Night',
    date: 'Fri, Jan 24',
    time: '20:00',
    location: 'Harlem, NY',
    image: `${BASE}event-images/music-records.jpg`,
    category: 'music',
    price: '$18',
  },
];

const MOCK_COMMUNITIES = [
  {
    id: '1',
    name: 'Techno Bunker',
    members: '2.4k',
    description: 'Underground electronic music collective',
    image: `${BASE}event-images/techno-gathering.jpg`,
    category: 'music',
  },
  {
    id: '2',
    name: 'NYC Run Club',
    members: '1.8k',
    description: 'Weekly group runs across the city',
    image: `${BASE}event-images/running-event.jpg`,
    category: 'fitness',
  },
  {
    id: '3',
    name: 'React Developers NYC',
    members: '3.2k',
    description: 'Frontend engineers and enthusiasts',
    image: `${BASE}event-images/tech-conference.jpg`,
    category: 'tech',
  },
  {
    id: '4',
    name: 'Sunrise Yoga Collective',
    members: '890',
    description: 'Morning yoga and mindfulness',
    image: `${BASE}event-images/yoga-event.jpg`,
    category: 'wellness',
  },
  {
    id: '5',
    name: 'Brooklyn Art House',
    members: '1.1k',
    description: 'Local artists and gallery lovers',
    image: `${BASE}event-images/gallery-2.jpg`,
    category: 'creative',
  },
  {
    id: '6',
    name: 'Founders Network NYC',
    members: '2.1k',
    description: 'Startup founders and investors',
    image: `${BASE}event-images/startup-gathering.jpg`,
    category: 'social',
  },
];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState<'events' | 'communities'>(
    (searchParams.get('type') as 'events' | 'communities') || 'events'
  );
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    params.set('type', activeTab);
    if (activeCategory !== 'all') params.set('category', activeCategory);
    setSearchParams(params, { replace: true });
  }, [searchQuery, activeTab, activeCategory, setSearchParams]);

  // Reset category when switching tabs
  useEffect(() => {
    setActiveCategory('all');
  }, [activeTab]);

  const categories = activeTab === 'events' ? EVENT_CATEGORIES : COMMUNITY_CATEGORIES;

  // Filter results based on search and category
  const filteredEvents = MOCK_EVENTS.filter((event) => {
    const matchesSearch = !searchQuery ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredCommunities = MOCK_COMMUNITIES.filter((community) => {
    const matchesSearch = !searchQuery ||
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || community.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const results = activeTab === 'events' ? filteredEvents : filteredCommunities;
  const resultsCount = results.length;

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link
          to={activeTab === 'events' ? '/discovery' : '/communities'}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {activeTab === 'events' ? 'Discovery' : 'Communities'}
        </Link>

        {/* Search Header */}
        <div className="space-y-4 mb-8">
          {/* Search Bar */}
          <div className="bg-surface border border-white/10 rounded-lg p-2 flex flex-col sm:flex-row gap-2">
            {/* Search Input */}
            <div className="flex-1 flex items-center gap-3 bg-dark/50 rounded-md px-4 py-3">
              <SearchIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={activeTab === 'events' ? 'Search events, artists, venues...' : 'Search communities...'}
                className="bg-transparent w-full text-white placeholder-gray-500 focus:outline-none text-sm"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-gray-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Location */}
            <button className="flex items-center gap-2 px-4 py-3 bg-dark/50 rounded-md text-gray-400 hover:text-white hover:bg-dark transition-colors">
              <MapPin className="w-4 h-4" />
              <span className="text-sm whitespace-nowrap">New York</span>
            </button>

            {/* Date - only for events */}
            {activeTab === 'events' && (
              <button className="flex items-center gap-2 px-4 py-3 bg-dark/50 rounded-md text-gray-400 hover:text-white hover:bg-dark transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="text-sm whitespace-nowrap">Any Date</span>
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-surface rounded-lg p-1 w-fit">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'events'
                  ? 'bg-lime text-dark'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveTab('communities')}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'communities'
                  ? 'bg-lime text-dark'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Communities
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-400">
            <span className="text-white font-medium">{resultsCount}</span> {activeTab === 'events' ? 'events' : 'communities'} found
            {searchQuery && <span> for "<span className="text-lime">{searchQuery}</span>"</span>}
          </p>
        </div>

        {/* Results Grid */}
        {resultsCount === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No results found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : activeTab === 'events' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredEvents.map((event) => (
              <Link
                key={event.id}
                to={`/event/${event.id}`}
                className="group bg-surface border border-white/5 rounded-lg overflow-hidden hover:border-white/20 transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <h3 className="font-medium text-white text-sm mb-1 line-clamp-2 group-hover:text-lime transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lime font-bold text-sm">{event.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCommunities.map((community) => (
              <Link
                key={community.id}
                to={`/community/${community.id}`}
                className="group bg-surface border border-white/5 rounded-lg overflow-hidden hover:border-white/20 transition-all flex"
              >
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 min-w-0">
                  <h3 className="font-medium text-white text-sm mb-1 truncate group-hover:text-lime transition-colors">
                    {community.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{community.description}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Users className="w-3 h-3" />
                    <span>{community.members} members</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
