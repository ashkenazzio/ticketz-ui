import { ArrowRight, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const events = [
  {
    id: 1,
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg",
    badge: "Selling Fast",
    date: "Sat, Oct 24 • 06:00 AM",
    price: "$15",
    title: "Neon Sunrise 5K",
    description: "Join the city's largest morning run club. Post-run coffee and networking included.",
    organizer: "Urban Striders",
    organizerImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    badge: null,
    date: "Wed, Oct 28 • 06:30 PM",
    price: "Free",
    title: "React Patterns Workshop",
    description: "Deep dive into advanced component composition. Pizza provided by Vercel.",
    organizer: "JS Collective",
    organizerImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    badge: "Sold Out",
    date: "Fri, Oct 30 • 11:00 PM",
    price: "$35",
    title: "Warehouse Project: 004",
    description: "Underground techno in a secret industrial location. Location reveal 2h before.",
    organizer: "Bass Sector",
    organizerImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
  }
];

export default function TrendingEvents() {
  return (
    <section className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
            <div>
                <h2 className="font-display text-4xl md:text-5xl font-semibold uppercase tracking-tighter mb-2">Trending Now</h2>
                <p className="text-gray-400 text-lg">Curated events heating up this week.</p>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-lime hover:text-white transition-colors font-medium uppercase text-sm tracking-wide">
                View All <ArrowRight className="w-4 h-4" />
            </a>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
                <Link to="/event/1" key={event.id} className="group relative bg-surface border border-white/5 hover:border-lime/50 transition-all duration-300 rounded-sm overflow-hidden flex flex-col h-full">
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
                            <button className="p-2 hover:bg-white/10 rounded-sm transition-colors">
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
