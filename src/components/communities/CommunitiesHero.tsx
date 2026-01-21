import { Search, MapPin } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CATEGORIES_WITH_ALL } from '../../constants/categories';
import { useData } from '../../context/DataContext';

const BASE = import.meta.env.BASE_URL;

export default function CommunitiesHero() {
  const navigate = useNavigate();
  const { db } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Get featured communities from database
  const featuredCommunities = useMemo(() => {
    const allCommunities = db.communities.getAll();
    return allCommunities.slice(0, 4).map(community => ({
      id: community.id,
      name: community.name,
      members: db.communities.getMemberCount(community.id).toLocaleString(),
      image: community.coverImage || community.avatar,
    }));
  }, [db]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('type', 'communities');
    if (searchQuery) params.set('q', searchQuery);
    if (activeCategory !== 'all') params.set('category', activeCategory);
    navigate(`/app/search?${params.toString()}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    const params = new URLSearchParams();
    params.set('type', 'communities');
    if (categoryId !== 'all') params.set('category', categoryId);
    navigate(`/app/search?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-start text-center px-4 bg-dark pt-28 pb-16 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${BASE}event-images/people-gathering.jpg`}
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/90 to-dark"></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Compact Header */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
          Find Your <span className="italic text-lime">Community</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
          Connect with like-minded people. Join collectives that match your vibe.
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-xl mx-auto">
          <div className="bg-surface border border-white/10 rounded-lg p-2 flex flex-col sm:flex-row gap-2">
            {/* Search Input */}
            <div className="flex-1 flex items-center gap-3 bg-dark/50 rounded-md px-4 py-3">
              <Search className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search communities..."
                className="bg-transparent w-full text-white placeholder-gray-500 focus:outline-none text-sm"
              />
            </div>

            {/* Location */}
            <button className="flex items-center gap-2 px-4 py-3 bg-dark/50 rounded-md text-gray-400 hover:text-white hover:bg-dark transition-colors">
              <MapPin className="w-4 h-4" />
              <span className="text-sm whitespace-nowrap">New York</span>
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
          {CATEGORIES_WITH_ALL.map((cat) => {
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
        <div className="pt-2 flex items-center justify-center gap-6 text-sm text-gray-500">
          <span><strong className="text-white">12k+</strong> active communities</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline"><strong className="text-white">850k</strong> members</span>
        </div>
      </div>

      {/* Featured Communities Grid */}
      <div className="w-full max-w-4xl mx-auto mt-10 sm:mt-14 px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {featuredCommunities.map((community) => (
            <Link
              key={community.id}
              to={`/community/${community.id}`}
              className="group relative bg-surface border border-white/10 rounded-lg overflow-hidden hover:border-lime/50 transition-all cursor-pointer"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={community.image}
                  alt={community.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-bold text-white text-sm truncate">{community.name}</h3>
                <p className="text-xs text-gray-400">{community.members} members</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
