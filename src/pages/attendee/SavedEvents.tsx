import { Link } from 'react-router-dom';
import { Heart, Calendar, MapPin, ArrowRight, Bookmark } from 'lucide-react';
import AppLayout from '../../layouts/AppLayout';

interface SavedEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  price: string;
  image: string;
  community: string;
}

const savedEvents: SavedEvent[] = [
  {
    id: '1',
    title: 'Electric Garden',
    date: 'Nov 12, 2026 • 12:00 PM',
    venue: 'Warehouse District, LA',
    price: '$45',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
    community: 'Bass Sector',
  },
  {
    id: '2',
    title: 'NYE Countdown 2027',
    date: 'Dec 31, 2026 • 10:00 PM',
    venue: 'Sky Lounge, Miami',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
    community: 'House Heads',
  },
  {
    id: '3',
    title: 'Techno Bunker Session',
    date: 'Jan 15, 2027 • 11:00 PM',
    venue: 'Club Void, Berlin',
    price: '$35',
    image: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600&q=80',
    community: 'Techno Bunker',
  },
];

export default function SavedEvents() {
  return (
    <AppLayout title="Saved Events">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats Subtitle */}
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
                to="/discovery"
                className="inline-block bg-lime text-dark px-6 py-3 font-semibold uppercase text-sm tracking-wide hover:bg-limehover transition-colors"
              >
                Discover Events
              </Link>
            </div>
          )}
      </div>
    </AppLayout>
  );
}
