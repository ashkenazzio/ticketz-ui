import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, MapPin, Calendar, Users, Clock, X, CalendarRange } from 'lucide-react';
import { CATEGORIES_WITH_ALL, getCategoryById } from '../../constants/categories';
import { useData } from '../../context/DataContext';

// Helper to format dates
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatMemberCount(count: number): string {
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return count.toString();
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState<'events' | 'communities'>(
    (searchParams.get('tab') as 'events' | 'communities') ||
    (searchParams.get('type') as 'events' | 'communities') ||
    'events'
  );
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');

  const { db } = useData();

  // Get data from database
  const allEvents = db.events.getAll();
  const allCommunities = db.communities.getAll();

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    params.set('tab', activeTab);
    if (activeCategory !== 'all') params.set('category', activeCategory);
    setSearchParams(params, { replace: true });
  }, [searchQuery, activeTab, activeCategory, setSearchParams]);

  // Reset category when switching tabs
  useEffect(() => {
    setActiveCategory('all');
  }, [activeTab]);

  const categories = CATEGORIES_WITH_ALL;

  // Filter events based on search and category
  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch = !searchQuery ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.venueName && event.venueName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter communities based on search and category
  const filteredCommunities = allCommunities.filter((community) => {
    const matchesSearch = !searchQuery ||
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (community.description && community.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'all' ||
      community.primaryCategory === activeCategory ||
      community.secondaryCategory === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const resultsCount = activeTab === 'events' ? filteredEvents.length : filteredCommunities.length;

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
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
              <span className="text-sm whitespace-nowrap">All Locations</span>
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
            {filteredEvents.map((event) => {
              const isMultiDay = db.events.isMultiDay(event);
              const lowestTier = db.ticketTiers.getByEvent(event.id).sort((a, b) => a.price - b.price)[0];
              const price = lowestTier ? `$${(lowestTier.price / 100).toFixed(0)}` : 'Free';

              return (
                <Link
                  key={event.id}
                  to={`/event/${event.id}`}
                  className="group bg-surface border border-white/5 rounded-lg overflow-hidden hover:border-white/20 transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={event.image || event.coverImage || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400'}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {isMultiDay && (
                      <span className="absolute top-2 right-2 bg-purple-500/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 flex items-center gap-1">
                        <CalendarRange className="w-3 h-3" />
                        Multi-Day
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <Clock className="w-3 h-3" />
                      <span>
                        {formatDate(event.startTime)}
                        {isMultiDay && ` → ${formatDate(event.endTime)}`}
                        {!isMultiDay && ` • ${formatTime(event.startTime)}`}
                      </span>
                    </div>
                    <h3 className="font-medium text-white text-sm mb-1 line-clamp-2 group-hover:text-lime transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                      <MapPin className="w-3 h-3" />
                      <span>{event.venueName || 'Venue TBA'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lime font-bold text-sm">{price}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCommunities.map((community) => {
              const memberCount = db.communities.getMemberCount(community.id);
              const primaryCat = getCategoryById(community.primaryCategory);

              return (
                <Link
                  key={community.id}
                  to={`/community/${community.id}`}
                  className="group bg-surface border border-white/5 rounded-lg overflow-hidden hover:border-white/20 transition-all flex"
                >
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                    <img
                      src={community.avatar || 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=200'}
                      alt={community.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-white text-sm truncate group-hover:text-lime transition-colors">
                        {community.name}
                      </h3>
                      {primaryCat && (
                        <span className="text-[10px] text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">
                          {primaryCat.label}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">{community.description}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Users className="w-3 h-3" />
                      <span>{formatMemberCount(memberCount)} members</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
