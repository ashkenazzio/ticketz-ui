import { ArrowRight, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useMemo } from 'react';

function formatEventDate(isoDate: string): string {
  const date = new Date(isoDate);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = dayNames[date.getDay()];
  const month = monthNames[date.getMonth()];
  const dayNum = date.getDate();
  const hour = date.getHours();
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}, ${month} ${dayNum} • ${hour12}:${minutes} ${ampm}`;
}

function formatPrice(cents: number): string {
  if (cents === 0) return 'Free';
  return `$${(cents / 100).toFixed(0)}`;
}

export default function DiscoveryTrending() {
  const { db } = useData();

  const trendingEvents = useMemo(() => {
    // Get upcoming events
    const allEvents = db.events.getAll();
    const now = new Date();
    const upcoming = allEvents.filter(e => new Date(e.startTime) > now);

    // Take first 3 upcoming events for trending section
    return upcoming.slice(0, 3).map(event => {
      const community = db.communities.getById(event.communityId);
      const tiers = db.ticketTiers.getByEvent(event.id);
      const lowestPrice = tiers.length > 0 ? Math.min(...tiers.map(t => t.price)) : 0;
      const totalCapacity = tiers.reduce((sum, t) => sum + (t.capacity ?? 0), 0);
      const soldCount = db.analytics.getEventTicketsSold(event.id);

      // Determine badge
      let badge: string | null = null;
      if (totalCapacity > 0 && soldCount >= totalCapacity) {
        badge = 'Sold Out';
      } else if (totalCapacity > 0 && soldCount / totalCapacity > 0.8) {
        badge = 'Selling Fast';
      }

      return {
        id: event.id,
        image: event.coverImage || event.image,
        badge,
        date: formatEventDate(event.startTime),
        price: formatPrice(lowestPrice),
        title: event.title,
        description: event.description.slice(0, 120) + (event.description.length > 120 ? '...' : ''),
        organizer: community?.name || 'Unknown',
        organizerImg: community?.avatar || '',
      };
    });
  }, [db]);

  return (
    <section className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
            <div>
                <h2 className="font-display text-4xl md:text-5xl font-semibold uppercase tracking-tighter mb-2">Trending Now</h2>
                <p className="text-gray-400 text-lg">Curated events heating up this week.</p>
            </div>
            <Link to="/app/search?type=events" className="hidden md:flex items-center gap-2 text-lime hover:text-white transition-colors font-medium uppercase text-sm tracking-wide">
                View All <ArrowRight className="w-4 h-4" />
            </Link>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingEvents.map((event) => (
                <Link to={`/event/${event.id}`} key={event.id} className="group relative bg-surface border border-white/5 hover:border-lime/50 transition-all duration-300 rounded-sm overflow-hidden flex flex-col h-full">
                    <div className="relative h-64 overflow-hidden">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        {event.badge && (
                            <div className={`absolute top-4 right-4 text-xs font-semibold px-2 py-1 uppercase rounded-sm ${event.badge === 'Sold Out' ? 'bg-white text-dark' : 'bg-lime text-dark'}`}>
                                {event.badge}
                            </div>
                        )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-lime text-sm font-mono uppercase">{event.date}</div>
                            <div className="text-white font-semibold">{event.price}</div>
                        </div>
                        <h3 className="font-display text-2xl font-semibold uppercase tracking-tight leading-none mb-2 group-hover:text-lime transition-colors">{event.title}</h3>
                        <p className="text-gray-400 text-sm mb-6 line-clamp-2">{event.description}</p>

                        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-sm bg-gray-700 overflow-hidden">
                                    <img src={event.organizerImg} className="w-full h-full object-cover" alt={event.organizer} />
                                </div>
                                <span className="text-xs text-gray-300 font-medium">{event.organizer}</span>
                            </div>
                            <button className="p-2 hover:bg-white/10 rounded-sm transition-colors" onClick={(e) => e.preventDefault()}>
                                <Bookmark className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </section>
  );
}
