import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, MapPin, ArrowRight, Bookmark } from 'lucide-react';
import { useData } from '../../context/DataContext';

function formatEventDate(isoDate: string): string {
  const date = new Date(isoDate);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${month} ${day}, ${year} • ${hour12}:${minutes} ${ampm}`;
}

function formatPrice(cents: number): string {
  if (cents === 0) return 'Free';
  return `$${(cents / 100).toFixed(0)}`;
}

export default function SavedEvents() {
  const { db, currentUser, refresh } = useData();

  const savedEvents = useMemo(() => {
    if (!currentUser) return [];

    const savedEventRecords = db.savedEvents.getByUser(currentUser.id);
    return savedEventRecords.map(saved => {
      const event = db.events.getById(saved.eventId);
      if (!event) return null;

      const community = db.communities.getById(event.communityId);
      const tiers = db.ticketTiers.getByEvent(event.id);
      const lowestPrice = tiers.length > 0 ? Math.min(...tiers.map(t => t.price)) : 0;

      return {
        id: event.id,
        title: event.title,
        date: formatEventDate(event.startTime),
        venue: event.venueName,
        price: formatPrice(lowestPrice),
        image: event.coverImage || event.image,
        community: community?.name || 'Unknown',
      };
    }).filter(Boolean) as {
      id: string;
      title: string;
      date: string;
      venue: string;
      price: string;
      image: string;
      community: string;
    }[];
  }, [db, currentUser]);

  const handleUnsave = (eventId: string) => {
    if (!currentUser) return;
    db.savedEvents.toggle(currentUser.id, eventId);
    refresh();
  };

  if (!currentUser) {
    return (
      <div className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <p className="text-gray-400">Please log in to view your saved events.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="font-display text-2xl font-semibold uppercase tracking-tight mb-2">Saved Events</h1>
        <p className="text-gray-400 text-sm mb-6">
          {savedEvents.length} events saved
        </p>

          {/* Events Grid */}
          {savedEvents.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {savedEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-surface border border-white/5 overflow-hidden group hover:border-lime/30 transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => handleUnsave(event.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-dark/80 flex items-center justify-center text-lime hover:bg-lime hover:text-dark transition-colors"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      {event.community}
                    </div>
                    <Link
                      to={`/event/${event.id}`}
                      className="font-display text-lg uppercase tracking-tight hover:text-lime transition-colors block mb-3"
                    >
                      {event.title}
                    </Link>

                    <div className="space-y-1 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-lime">{event.price}</span>
                      <Link
                        to={`/event/${event.id}`}
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-lime uppercase tracking-wide transition-colors"
                      >
                        Get Tickets <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="border-2 border-lime/20 bg-surface/50 py-16 px-8 text-center">
              <Bookmark className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="font-display text-xl uppercase tracking-tight mb-2">
                No Saved Events
              </h3>
              <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                Tap the heart icon on events to save them here for later.
              </p>
              <Link
                to="/events"
                className="inline-block bg-lime text-dark px-6 py-3 font-semibold uppercase text-sm tracking-wide hover:bg-limehover transition-colors"
              >
                Discover Events
              </Link>
            </div>
          )}
      </div>
    </div>
  );
}
