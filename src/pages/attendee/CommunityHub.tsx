import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Calendar, ArrowRight, Bookmark, MapPin,
  Settings, UserPlus, UserMinus, Shield, BarChart3,
  Bell, BellOff, ChevronDown, ExternalLink
} from 'lucide-react';

// Mock data for moderators
const moderators = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Moderator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    id: 3,
    name: 'DJ Pulse',
    role: 'Moderator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  },
];

const events = [
  {
    id: 1,
    date: "Fri, Oct 30 • 11:00 PM",
    title: "Warehouse Project: 004",
    price: "$35",
    badge: "Sold Out",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    date: "Nov 12 - 14 • 12:00 PM",
    title: "Electric Garden",
    price: "$89",
    badge: "Featured",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    date: "Sat, Nov 07 • 10:00 PM",
    title: "Dubstep Chronicles",
    price: "$25",
    badge: null,
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    date: "Fri, Nov 13 • 11:00 PM",
    title: "Jungle Massive",
    price: "$30",
    badge: null,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop"
  }
];

// Mock: simulate if current user is admin (toggle this to see admin panel)
const IS_USER_ADMIN = true;

export default function CommunityHub() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  return (
    <>
      {/* Branded Header Banner */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop"
          alt="Banner"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row items-end md:items-center justify-between gap-6 max-w-7xl mx-auto">
          <div className="flex items-end gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-surface border-2 border-white/10 shadow-2xl rounded-sm overflow-hidden flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1000&auto=format&fit=crop" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="mb-2">
              <h1 className="font-display text-4xl md:text-6xl font-semibold uppercase tracking-tighter leading-none">Bass Sector</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-400 mt-2 text-sm font-medium">
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 2.5k Members</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 12 Past Events</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Los Angeles, CA</span>
              </div>
            </div>
          </div>

          {/* Admin Badge */}
          {IS_USER_ADMIN && (
            <div className="hidden md:flex items-center gap-2 bg-lime/10 border border-lime/30 px-3 py-1.5 text-lime text-xs font-semibold uppercase">
              <Shield className="w-3.5 h-3.5" />
              Admin
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Subscribe/Unsubscribe Button */}
          <button
            onClick={() => setIsSubscribed(!isSubscribed)}
            className={`
              flex-1 flex items-center justify-center gap-2 font-display text-lg font-semibold uppercase tracking-tight py-4 rounded-sm transition-all
              ${isSubscribed
                ? 'bg-surface border border-white/20 text-gray-300 hover:border-red-500/50 hover:text-red-400'
                : 'border border-lime bg-lime/10 text-lime hover:bg-lime hover:text-dark'
              }
            `}
          >
            {isSubscribed ? (
              <>
                <UserMinus className="w-5 h-5" />
                Leave Community
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Join Community
              </>
            )}
          </button>

          {/* Notification Toggle (only if subscribed) */}
          {isSubscribed && (
            <button
              onClick={() => setNotifications(!notifications)}
              className={`
                px-6 py-4 flex items-center justify-center gap-2 border rounded-sm transition-all
                ${notifications
                  ? 'border-lime/30 text-lime bg-lime/5'
                  : 'border-white/20 text-gray-400 hover:text-white'
                }
              `}
            >
              {notifications ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
            </button>
          )}
        </div>

        {/* Community Description */}
        <div className="bg-surface border border-white/5 p-6 mb-8">
          <h3 className="font-display text-lg uppercase tracking-tight mb-3">About</h3>
          <p className="text-gray-400 leading-relaxed">
            Bass Sector is LA's premier underground bass music collective. Since 2019, we've been
            bringing the deepest dubstep, drum & bass, and experimental bass sounds to warehouses
            and clubs across Southern California. Our community is built on respect for the music,
            the artists, and each other.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Dubstep', 'Drum & Bass', 'Bass Music', 'Warehouse', 'Underground'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-dark text-xs text-gray-400 uppercase tracking-wide">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Admin Panel (Conditional) */}
        {IS_USER_ADMIN && (
          <div className="bg-lime/5 border-2 border-lime/30 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-lime" />
                <h3 className="font-display text-lg uppercase tracking-tight text-lime">Admin Panel</h3>
              </div>
              <button
                onClick={() => setShowAdminMenu(!showAdminMenu)}
                className="text-lime hover:text-limehover transition-colors"
              >
                <ChevronDown className={`w-5 h-5 transition-transform ${showAdminMenu ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {showAdminMenu && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link
                  to="/dashboard/events/create"
                  className="flex items-center gap-2 bg-lime text-dark px-4 py-3 font-semibold text-sm uppercase tracking-wide hover:bg-limehover transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Create Event
                </Link>
                <Link
                  to="/dashboard/members"
                  className="flex items-center gap-2 bg-surface border border-lime/30 text-lime px-4 py-3 font-semibold text-sm uppercase tracking-wide hover:bg-lime/10 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  Manage Members
                </Link>
                <Link
                  to="/dashboard/analytics"
                  className="flex items-center gap-2 bg-surface border border-lime/30 text-lime px-4 py-3 font-semibold text-sm uppercase tracking-wide hover:bg-lime/10 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 bg-surface border border-lime/30 text-lime px-4 py-3 font-semibold text-sm uppercase tracking-wide hover:bg-lime/10 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Moderators Section */}
        <div className="mb-12">
          <h3 className="font-display text-lg uppercase tracking-tight mb-4 text-gray-400">Community Leaders</h3>
          <div className="flex flex-wrap gap-4">
            {moderators.map((mod) => (
              <div key={mod.id} className="flex items-center gap-3 bg-surface border border-white/5 px-4 py-3 hover:border-lime/30 transition-colors">
                <img
                  src={mod.avatar}
                  alt={mod.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-dark"
                />
                <div>
                  <div className="text-sm font-semibold text-white">{mod.name}</div>
                  <div className={`text-xs uppercase tracking-wide ${mod.role === 'Admin' ? 'text-lime' : 'text-gray-500'}`}>
                    {mod.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <h2 className="font-display text-3xl font-semibold uppercase tracking-tighter mb-8 border-b border-white/10 pb-4">
          Upcoming Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              to={`/event/${event.id}`}
              key={event.id}
              className="group relative bg-surface border border-white/5 hover:border-lime/50 transition-all duration-300 rounded-sm overflow-hidden flex flex-col h-full"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {event.badge && (
                  <div className={`absolute top-4 right-4 text-xs font-semibold px-2 py-1 uppercase rounded-sm ${event.badge === 'Sold Out' ? 'bg-white text-dark' : 'bg-lime text-dark'}`}>
                    {event.badge}
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-lime text-xs font-mono uppercase">{event.date}</div>
                  <div className="text-white font-semibold">{event.price}</div>
                </div>
                <h3 className="font-display text-xl font-semibold uppercase tracking-tight leading-none mb-6 group-hover:text-lime transition-colors">{event.title}</h3>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider group-hover:text-white transition-colors flex items-center gap-1">
                    Get Tickets <ArrowRight className="w-3 h-3" />
                  </span>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-lime transition-colors"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Events Link */}
        <div className="mt-8 mb-20 md:mb-8 text-center">
          <Link
            to="/discovery"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-lime text-sm uppercase tracking-wide transition-colors"
          >
            View All Events <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
