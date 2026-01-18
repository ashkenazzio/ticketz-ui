import { Link } from 'react-router-dom';
import { Plus, Search, Calendar, Users, MoreVertical, Edit, Copy, Trash2, BarChart3 } from 'lucide-react';
import type { BadgeStatus } from '../../components/StatusBadge';
import StatusBadge from '../../components/StatusBadge';

interface OrganizerEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  image: string;
  status: BadgeStatus;
  ticketsSold: number;
  ticketsCap: number;
  revenue: string;
}

const events: OrganizerEvent[] = [
  {
    id: '1',
    title: 'Electric Garden',
    date: 'Nov 12, 2026 • 12:00 PM',
    venue: 'Warehouse District, LA',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
    status: 'published',
    ticketsSold: 342,
    ticketsCap: 500,
    revenue: '$15,390',
  },
  {
    id: '2',
    title: 'Bass Sector Opening',
    date: 'Nov 28, 2026 • 9:00 PM',
    venue: 'The Underground, NYC',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
    status: 'published',
    ticketsSold: 189,
    ticketsCap: 300,
    revenue: '$8,505',
  },
  {
    id: '3',
    title: 'NYE Countdown 2027',
    date: 'Dec 31, 2026 • 10:00 PM',
    venue: 'Sky Lounge, Miami',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
    status: 'draft',
    ticketsSold: 0,
    ticketsCap: 400,
    revenue: '$0',
  },
  {
    id: '4',
    title: 'Summer Festival 2026',
    date: 'Aug 20, 2026 • 2:00 PM',
    venue: 'Central Park, NYC',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80',
    status: 'used',
    ticketsSold: 847,
    ticketsCap: 1000,
    revenue: '$42,350',
  },
  {
    id: '5',
    title: 'Cancelled Show',
    date: 'Sep 15, 2026 • 8:00 PM',
    venue: 'Club Void, Berlin',
    image: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400&q=80',
    status: 'cancelled',
    ticketsSold: 45,
    ticketsCap: 200,
    revenue: '$2,025',
  },
];

export default function EventManagement() {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold uppercase tracking-tight">
            My Events
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {events.length} total events • {events.filter(e => e.status === 'published').length} active
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
              className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-dark/30 transition-colors group"
            >
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
                      style={{ width: `${(event.ticketsSold / event.ticketsCap) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Revenue */}
              <div className="col-span-2 flex items-center">
                <span className="text-sm font-semibold text-lime">{event.revenue}</span>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex items-center justify-end">
                <div className="relative group/menu">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-1 w-40 bg-surface border border-white/10 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10">
                    <Link
                      to={`/dashboard/events/${event.id}/edit`}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-dark hover:text-white transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </Link>
                    <Link
                      to={`/dashboard/events/${event.id}/guests`}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-dark hover:text-white transition-colors"
                    >
                      <Users className="w-3.5 h-3.5" /> Guest List
                    </Link>
                    <Link
                      to={`/dashboard/analytics`}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-dark hover:text-white transition-colors"
                    >
                      <BarChart3 className="w-3.5 h-3.5" /> Analytics
                    </Link>
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-dark hover:text-white transition-colors">
                      <Copy className="w-3.5 h-3.5" /> Duplicate
                    </button>
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-dark hover:text-red-300 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State (would show if no events) */}
      {events.length === 0 && (
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
