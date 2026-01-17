import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Filter } from 'lucide-react';
import AppLayout from '../../layouts/AppLayout';
import TicketCard from '../../components/TicketCard';
import type { BadgeStatus } from '../../components/StatusBadge';

type FilterTab = 'all' | 'upcoming' | 'past' | 'transferred';

interface TicketData {
  id: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  ticketTier: string;
  status: BadgeStatus;
  eventImage: string;
  eventId: string;
}

// Mock data
const mockTickets: TicketData[] = [
  {
    id: '8X92-MM29-KKS',
    eventName: 'Electric Garden',
    eventDate: 'Nov 12, 2026',
    eventTime: '12:00 PM',
    venue: 'Warehouse District, LA',
    ticketTier: 'General Admission',
    status: 'valid',
    eventImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
    eventId: '1',
  },
  {
    id: 'JK47-PP82-AAZ',
    eventName: 'Bass Sector Opening',
    eventDate: 'Nov 28, 2026',
    eventTime: '9:00 PM',
    venue: 'The Underground, NYC',
    ticketTier: 'VIP',
    status: 'valid',
    eventImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
    eventId: '2',
  },
  {
    id: 'TT19-XZ44-BBQ',
    eventName: 'Techno Bunker Session',
    eventDate: 'Oct 15, 2026',
    eventTime: '11:00 PM',
    venue: 'Club Void, Berlin',
    ticketTier: 'Early Bird',
    status: 'used',
    eventImage: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400&q=80',
    eventId: '3',
  },
  {
    id: 'HH88-NM12-CCC',
    eventName: 'Summer Festival 2026',
    eventDate: 'Aug 20, 2026',
    eventTime: '2:00 PM',
    venue: 'Central Park, NYC',
    ticketTier: 'Weekend Pass',
    status: 'transferred',
    eventImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80',
    eventId: '4',
  },
  {
    id: 'ZZ99-QQ55-DDD',
    eventName: 'Rooftop Sessions',
    eventDate: 'Jul 4, 2026',
    eventTime: '6:00 PM',
    venue: 'Sky Lounge, Miami',
    ticketTier: 'Standard',
    status: 'expired',
    eventImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
    eventId: '5',
  },
];

const filterTabs: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All Tickets' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'past', label: 'Past' },
  { key: 'transferred', label: 'Transferred' },
];

export default function Wallet() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const filteredTickets = mockTickets.filter((ticket) => {
    switch (activeFilter) {
      case 'upcoming':
        return ticket.status === 'valid';
      case 'past':
        return ticket.status === 'used' || ticket.status === 'expired';
      case 'transferred':
        return ticket.status === 'transferred';
      default:
        return true;
    }
  });

  const ticketCounts = {
    all: mockTickets.length,
    upcoming: mockTickets.filter((t) => t.status === 'valid').length,
    past: mockTickets.filter((t) => t.status === 'used' || t.status === 'expired').length,
    transferred: mockTickets.filter((t) => t.status === 'transferred').length,
  };

  return (
    <AppLayout title="My Tickets">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats Subtitle */}
        <p className="text-gray-400 text-sm mb-6">
          {ticketCounts.upcoming} upcoming • {ticketCounts.past} past
        </p>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`
                  px-4 py-2 text-xs font-semibold uppercase tracking-wide whitespace-nowrap transition-all
                  ${activeFilter === tab.key
                    ? 'bg-lime text-dark'
                    : 'bg-surface text-gray-400 hover:text-white hover:bg-surface/80'
                  }
                `}
              >
                {tab.label}
                <span className="ml-2 opacity-60">({ticketCounts[tab.key]})</span>
              </button>
            ))}
          </div>

          {/* Tickets Grid */}
          {filteredTickets.length > 0 ? (
            <div className="grid gap-4">
              {filteredTickets.map((ticket) => (
                <TicketCard key={ticket.id} {...ticket} />
              ))}
            </div>
          ) : (
            // Empty State
            <div className="border-2 border-lime/20 bg-surface/50 py-16 px-8 text-center">
              <Ticket className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="font-display text-xl uppercase tracking-tight mb-2">
                No Tickets Found
              </h3>
              <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                {activeFilter === 'upcoming'
                  ? "You don't have any upcoming events. Time to explore!"
                  : activeFilter === 'past'
                  ? "No past events yet. Your memories will appear here."
                  : activeFilter === 'transferred'
                  ? "You haven't transferred any tickets."
                  : "Your ticket wallet is empty. Discover events and grab your first ticket."}
              </p>
              <Link
                to="/discovery"
                className="inline-block bg-lime text-dark px-6 py-3 font-semibold uppercase text-sm tracking-wide hover:bg-limehover transition-colors"
              >
                Explore Events
              </Link>
            </div>
          )}

          {/* Quick Stats */}
          {mockTickets.length > 0 && (
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-surface border border-white/5 p-4 text-center">
                <div className="text-2xl font-display font-semibold text-lime">
                  {ticketCounts.all}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                  Total Tickets
                </div>
              </div>
              <div className="bg-surface border border-white/5 p-4 text-center">
                <div className="text-2xl font-display font-semibold text-white">
                  {ticketCounts.upcoming}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                  Upcoming
                </div>
              </div>
              <div className="bg-surface border border-white/5 p-4 text-center">
                <div className="text-2xl font-display font-semibold text-white">
                  {mockTickets.filter((t) => t.status === 'used').length}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                  Events Attended
                </div>
              </div>
            </div>
          )}
      </div>
    </AppLayout>
  );
}
