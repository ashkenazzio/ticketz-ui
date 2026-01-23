import { Link } from 'react-router-dom';
import { Plus, Search, Calendar, Users, MoreVertical, Edit, Copy, Trash2, BarChart3 } from 'lucide-react';
import type { BadgeStatus } from '../../components/StatusBadge';
import StatusBadge from '../../components/StatusBadge';
import Dropdown, { DropdownItem } from '../../components/Dropdown';
import { useData, useMyManagedCommunities } from '../../context/DataContext';

// Helper to format date
function formatEventDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
}

// Helper to format currency (cents to dollars)
function formatCurrency(cents: number): string {
  return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// Determine event status for badge
function getEventStatus(startTime: string, endTime: string): BadgeStatus {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now > end) return 'used'; // Past event
  if (now >= start && now <= end) return 'published'; // Ongoing
  return 'published'; // Upcoming
}

export default function EventManagement() {
  const { db } = useData();
  const managedCommunities = useMyManagedCommunities();

  // Get the active community (first one for now)
  const activeCommunityData = managedCommunities[0];
  const community = activeCommunityData?.community;

  // Get events for this community
  const communityEvents = community ? db.events.getByCommunity(community.id) : [];

  // Map events to display format
  const events = communityEvents.map(event => {
    const ticketsSold = db.analytics.getEventTicketsSold(event.id);
    const capacity = db.analytics.getEventCapacity(event.id);
    const revenue = db.analytics.getEventRevenue(event.id);

    return {
      id: event.id,
      title: event.title,
      date: formatEventDate(event.startTime),
      venue: event.venueName,
      image: event.image,
      status: getEventStatus(event.startTime, event.endTime),
      ticketsSold,
      ticketsCap: capacity,
      revenue: formatCurrency(revenue),
    };
  });

  const publishedCount = events.filter(e => e.status === 'published').length;

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold uppercase tracking-tight">
            My Events
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {events.length} total events • {publishedCount} active
          </p>
        </div>
        <Link
          to="/dashboard/events/create"
          className="flex items-center justify-center gap-2 bg-lime text-dark px-5 py-3 font-semibold uppercase text-sm tracking-wide hover:bg-limehover transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Event
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full bg-surface border border-white/10 pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime transition-colors"
          />
        </div>
        <select className="bg-surface border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-lime transition-colors appearance-none cursor-pointer">
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="past">Past</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Events Table */}
      {events.length > 0 ? (
        <div className="bg-surface border border-white/5 overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-xs text-gray-500 uppercase tracking-wide">
            <div className="col-span-5">Event</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Tickets</div>
            <div className="col-span-2">Revenue</div>
            <div className="col-span-1"></div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/5">
            {events.map((event) => (
              <div
                key={event.id}
                className="relative px-6 py-4 hover:bg-dark/30 transition-colors group"
              >
                {/* Mobile: Actions button in top-right corner */}
                <div className="absolute right-4 top-4 md:hidden">
                  <Dropdown
                    trigger={
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    }
                  >
                    <DropdownItem href={`/event/${event.id}`} icon={<Calendar className="w-3.5 h-3.5" />}>
                      View Event
                    </DropdownItem>
                    <DropdownItem href={`/dashboard/events/${event.id}/edit`} icon={<Edit className="w-3.5 h-3.5" />}>
                      Edit
                    </DropdownItem>
                    <DropdownItem href={`/dashboard/events/${event.id}/guests`} icon={<Users className="w-3.5 h-3.5" />}>
                      Guest List
                    </DropdownItem>
                    <DropdownItem href={`/dashboard/events/${event.id}/analytics`} icon={<BarChart3 className="w-3.5 h-3.5" />}>
                      Analytics
                    </DropdownItem>
                    <DropdownItem icon={<Copy className="w-3.5 h-3.5" />}>
                      Duplicate
                    </DropdownItem>
                    <DropdownItem variant="danger" icon={<Trash2 className="w-3.5 h-3.5" />}>
                      Delete
                    </DropdownItem>
                  </Dropdown>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Event Info */}
                  <div className="col-span-5 flex items-center gap-4">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-16 h-16 object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <Link
                        to={`/dashboard/events/${event.id}/edit`}
                        className="font-display text-sm font-semibold uppercase tracking-tight hover:text-lime transition-colors block truncate"
                      >
                        {event.title}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                        <Calendar className="w-3 h-3" />
                        <span className="truncate">{event.date}</span>
                      </div>
                      <div className="text-xs text-gray-500 truncate">{event.venue}</div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2 flex items-center">
                    <StatusBadge status={event.status} size="sm" />
                  </div>

                  {/* Tickets */}
                  <div className="col-span-2 flex items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-sm font-semibold">{event.ticketsSold}</span>
                        <span className="text-xs text-gray-500">/ {event.ticketsCap}</span>
                      </div>
                      {/* Progress bar */}
                      <div className="w-20 h-1 bg-dark mt-1.5">
                        <div
                          className="h-full bg-lime"
                          style={{ width: `${event.ticketsCap > 0 ? (event.ticketsSold / event.ticketsCap) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Revenue */}
                  <div className="col-span-2 flex items-center">
                    <span className="text-sm font-semibold text-lime">{event.revenue}</span>
                  </div>

                  {/* Desktop: Actions */}
                  <div className="col-span-1 hidden md:flex items-center justify-end">
                    <Dropdown
                      trigger={
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      }
                    >
                      <DropdownItem href={`/event/${event.id}`} icon={<Calendar className="w-3.5 h-3.5" />}>
                        View Event
                      </DropdownItem>
                      <DropdownItem href={`/dashboard/events/${event.id}/edit`} icon={<Edit className="w-3.5 h-3.5" />}>
                        Edit
                      </DropdownItem>
                      <DropdownItem href={`/dashboard/events/${event.id}/guests`} icon={<Users className="w-3.5 h-3.5" />}>
                        Guest List
                      </DropdownItem>
                      <DropdownItem href={`/dashboard/events/${event.id}/analytics`} icon={<BarChart3 className="w-3.5 h-3.5" />}>
                        Analytics
                      </DropdownItem>
                      <DropdownItem icon={<Copy className="w-3.5 h-3.5" />}>
                        Duplicate
                      </DropdownItem>
                      <DropdownItem variant="danger" icon={<Trash2 className="w-3.5 h-3.5" />}>
                        Delete
                      </DropdownItem>
                    </Dropdown>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Empty State
        <div className="border-2 border-lime/20 bg-surface/50 py-16 px-8 text-center">
          <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="font-display text-xl uppercase tracking-tight mb-2">
            No Events Yet
          </h3>
          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
            Create your first event and start selling tickets to your community.
          </p>
          <Link
            to="/dashboard/events/create"
            className="inline-flex items-center gap-2 bg-lime text-dark px-6 py-3 font-semibold uppercase text-sm tracking-wide hover:bg-limehover transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Your First Event
          </Link>
        </div>
      )}
    </>
  );
}
