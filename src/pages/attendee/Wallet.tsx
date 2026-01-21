import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Filter } from 'lucide-react';
import TicketCard from '../../components/TicketCard';
import { useData } from '../../context/DataContext';
import type { BadgeStatus } from '../../components/StatusBadge';

type FilterTab = 'all' | 'upcoming' | 'past';

const filterTabs: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All Tickets' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'past', label: 'Past' },
];

// Helper to format date
function formatTicketDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Helper to format time
function formatTicketTime(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export default function Wallet() {
  const { db, currentUser } = useData();
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  if (!currentUser) {
    return (
      <div className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <p className="text-gray-400">Please log in to view your tickets.</p>
        </div>
      </div>
    );
  }

  // Get user's tickets from database
  const userTickets = db.tickets.getByUser(currentUser.id);

  // Map tickets to display format with event and tier info
  const ticketData = userTickets.map(ticket => {
    const event = db.events.getById(ticket.eventId);
    const tier = db.ticketTiers.getById(ticket.ticketTierId);
    const isPast = event ? new Date(event.endTime) < new Date() : false;

    // Determine badge status
    let status: BadgeStatus = ticket.status as BadgeStatus;
    if (ticket.status === 'valid' && isPast) {
      status = 'expired';
    }

    return {
      id: ticket.id,
      eventName: event?.title || 'Unknown Event',
      eventDate: event ? formatTicketDate(event.startTime) : '',
      eventTime: event ? formatTicketTime(event.startTime) : '',
      venue: event?.venueName || '',
      ticketTier: tier?.name || 'General',
      status,
      eventImage: event?.image || '',
      eventId: ticket.eventId,
      isPast,
    };
  });

  // Filter based on active tab
  const filteredTickets = ticketData.filter((ticket) => {
    switch (activeFilter) {
      case 'upcoming':
        return ticket.status === 'valid' && !ticket.isPast;
      case 'past':
        return ticket.status === 'used' || ticket.status === 'expired' || ticket.isPast;
      default:
        return true;
    }
  });

  const ticketCounts = {
    all: ticketData.length,
    upcoming: ticketData.filter((t) => t.status === 'valid' && !t.isPast).length,
    past: ticketData.filter((t) => t.status === 'used' || t.status === 'expired' || t.isPast).length,
  };

  return (
    <div className="pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="font-display text-2xl font-semibold uppercase tracking-tight mb-2">My Tickets</h1>
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
                  : "Your ticket wallet is empty. Discover events and grab your first ticket."}
              </p>
              <Link
                to="/events"
                className="inline-block bg-lime text-dark px-6 py-3 font-semibold uppercase text-sm tracking-wide hover:bg-limehover transition-colors"
              >
                Explore Events
              </Link>
            </div>
          )}

          {/* Quick Stats */}
          {ticketData.length > 0 && (
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
                  {ticketData.filter((t) => t.status === 'used').length}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                  Events Attended
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
