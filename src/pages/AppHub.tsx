import { Link } from 'react-router-dom';
import {
    Ticket, Users, Calendar, Search, ArrowRight, Sparkles,
    ShoppingBag, Heart, ChevronRight
} from 'lucide-react';

const quickActions = [
    {
        title: 'My Tickets',
        desc: 'View your ticket wallet',
        icon: Ticket,
        path: '/wallet',
        accent: true
    },
    {
        title: 'My Orders',
        desc: 'Purchase history',
        icon: ShoppingBag,
        path: '/orders',
        accent: false
    },
    {
        title: 'My Communities',
        desc: 'Groups you belong to',
        icon: Users,
        path: '/my-communities',
        accent: false
    },
    {
        title: 'Saved Events',
        desc: 'Events you bookmarked',
        icon: Heart,
        path: '/saved',
        accent: false
    },
];

const exploreActions = [
    {
        title: 'Discover Events',
        desc: 'Find your next unforgettable experience',
        icon: Calendar,
        path: '/discovery',
    },
    {
        title: 'Browse Communities',
        desc: 'Join communities that match your vibe',
        icon: Sparkles,
        path: '/communities',
    },
];

const featuredCommunities = [
    {
        id: 1,
        name: 'Bass Sector',
        members: '12.5k',
        image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=400&auto=format&fit=crop',
        tag: 'Techno'
    },
    {
        id: 2,
        name: 'Urban Striders',
        members: '8.2k',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop',
        tag: 'Running'
    },
    {
        id: 3,
        name: 'JS Collective',
        members: '5.1k',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop',
        tag: 'Tech'
    },
];

const upcomingTickets = [
    {
        id: 'evt-001',
        event: 'Electric Garden',
        date: 'Feb 15, 2026',
        time: '10:00 PM',
        venue: 'Warehouse 23',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop',
        tier: 'VIP'
    },
    {
        id: 'evt-002',
        event: 'Neon Sunrise 5K',
        date: 'Mar 8, 2026',
        time: '06:00 AM',
        venue: 'City Park',
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=400&auto=format&fit=crop',
        tier: 'General'
    },
];

export default function AppHub() {
    return (
        <>
            <div className="px-4 py-6 pt-24">
                <div className="max-w-5xl mx-auto">
                    {/* Welcome */}
                    <div className="mb-6">
                        <h1 className="font-display text-2xl sm:text-3xl font-semibold uppercase tracking-tight">
                            Welcome back, Alex
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">
                            You have 2 upcoming events
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search events, communities, or tickets..."
                            className="w-full bg-surface border border-white/10 py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-lime/50 transition-colors"
                        />
                    </div>
                </div>
            </div>

                {/* Quick Actions - Your Stuff */}
                <section className="px-4 mb-10">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="font-display text-lg uppercase tracking-tight text-gray-400 mb-4">
                            Your Account
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {quickActions.map((action) => (
                                <Link
                                    key={action.title}
                                    to={action.path}
                                    className={`
                                        group bg-surface border p-4 hover:border-lime/30 transition-all
                                        ${action.accent ? 'border-lime/20' : 'border-white/5'}
                                    `}
                                >
                                    <div className={`
                                        w-10 h-10 flex items-center justify-center mb-3
                                        ${action.accent ? 'bg-lime/10' : 'bg-white/5'}
                                    `}>
                                        <action.icon className={`w-5 h-5 ${action.accent ? 'text-lime' : 'text-gray-400 group-hover:text-white'}`} />
                                    </div>
                                    <h3 className="font-semibold text-white text-sm group-hover:text-lime transition-colors">
                                        {action.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-0.5">{action.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Upcoming Tickets */}
                {upcomingTickets.length > 0 && (
                    <section className="px-4 mb-10">
                        <div className="max-w-5xl mx-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-display text-lg uppercase tracking-tight">
                                    Upcoming Events
                                </h2>
                                <Link
                                    to="/wallet"
                                    className="text-sm text-lime hover:text-limehover transition-colors flex items-center gap-1"
                                >
                                    All Tickets <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {upcomingTickets.map((ticket) => (
                                    <Link
                                        key={ticket.id}
                                        to={`/event/${ticket.id}`}
                                        className="group bg-surface border border-white/5 hover:border-lime/30 transition-all overflow-hidden"
                                    >
                                        <div className="h-1 bg-lime" />
                                        <div className="flex gap-4 p-4">
                                            <div className="w-20 h-20 overflow-hidden flex-shrink-0">
                                                <img
                                                    src={ticket.image}
                                                    alt={ticket.event}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-display text-base font-semibold uppercase tracking-tight text-white truncate group-hover:text-lime transition-colors">
                                                    {ticket.event}
                                                </h3>
                                                <p className="text-sm text-lime font-mono mt-1">
                                                    {ticket.date} • {ticket.time}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">{ticket.venue}</p>
                                            </div>
                                            <div className="flex flex-col items-end justify-between">
                                                <span className="text-[10px] uppercase tracking-wide text-gray-500 bg-dark px-2 py-1">
                                                    {ticket.tier}
                                                </span>
                                                <Ticket className="w-5 h-5 text-lime" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Explore */}
                <section className="px-4 mb-10">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="font-display text-lg uppercase tracking-tight text-gray-400 mb-4">
                            Explore
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {exploreActions.map((action) => (
                                <Link
                                    key={action.title}
                                    to={action.path}
                                    className="group flex items-center justify-between bg-surface border border-white/5 p-5 hover:border-lime/30 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-lime/10 flex items-center justify-center">
                                            <action.icon className="w-6 h-6 text-lime" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white group-hover:text-lime transition-colors">
                                                {action.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">{action.desc}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-lime transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Communities */}
                <section className="px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-lime" />
                                <h2 className="font-display text-lg uppercase tracking-tight">
                                    Communities For You
                                </h2>
                            </div>
                            <Link
                                to="/communities"
                                className="text-sm text-lime hover:text-limehover transition-colors flex items-center gap-1"
                            >
                                Browse All <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {featuredCommunities.map((community) => (
                                <Link
                                    key={community.id}
                                    to={`/community/${community.id}`}
                                    className="group relative aspect-[4/3] overflow-hidden"
                                >
                                    <img
                                        src={community.image}
                                        alt={community.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <span className="inline-block bg-lime/20 text-lime text-xs font-medium px-2 py-1 mb-2">
                                            {community.tag}
                                        </span>
                                        <h3 className="font-display text-lg font-semibold uppercase tracking-tight text-white group-hover:text-lime transition-colors">
                                            {community.name}
                                        </h3>
                                        <p className="text-sm text-gray-400 flex items-center gap-1">
                                            <Users className="w-3 h-3" /> {community.members} members
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
        </>
    );
}
