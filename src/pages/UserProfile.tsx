import DashboardLayout from '../layouts/DashboardLayout';
import { Settings, Calendar, Users, Heart } from 'lucide-react';

const myCommunities = [
    { name: "Bass Sector", members: "12.5k", image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1000&auto=format&fit=crop" },
    { name: "Techno Bunker", members: "8.2k", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop" },
];

const pastEvents = [
    { title: "Neon Sunrise 5K", date: "Oct 24, 2026", image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg" },
    { title: "React Patterns", date: "Oct 28, 2026", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" },
    { title: "Warehouse Project", date: "Oct 30, 2026", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop" },
];

export default function UserProfile() {
  return (
    <DashboardLayout title="My Profile">
        <div className="max-w-5xl">
            
            {/* Header Profile Card */}
            <div className="bg-surface border border-white/5 rounded-sm p-8 flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="w-32 h-32 rounded-full border-2 border-white/10 overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80" alt="Profile" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="text-xs uppercase font-medium text-white">Change</span>
                    </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h1 className="font-display text-4xl font-semibold uppercase tracking-tight text-white mb-2">Alex Moran</h1>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-400 text-sm mb-6">
                        <span className="flex items-center gap-1"><MapPinIcon /> Los Angeles, CA</span>
                        <span className="flex items-center gap-1"><Calendar /> Joined 2023</span>
                    </div>
                    <div className="flex gap-4 justify-center md:justify-start">
                        <button className="border border-white/20 text-white px-6 py-2 rounded-sm text-sm font-semibold uppercase hover:bg-white/10 transition-colors flex items-center gap-2">
                            <Settings className="w-4 h-4" /> Settings
                        </button>
                        <button className="border border-white/20 text-white px-6 py-2 rounded-sm text-sm font-semibold uppercase hover:bg-white/10 transition-colors flex items-center gap-2">
                             Edit Profile
                        </button>
                    </div>
                </div>
                
                {/* Quick Stats */}
                <div className="flex gap-8 border-l border-white/10 pl-8 hidden md:flex">
                    <div className="text-center">
                        <div className="font-display text-3xl font-semibold text-white">12</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Events Attended</div>
                    </div>
                    <div className="text-center">
                        <div className="font-display text-3xl font-semibold text-white">2</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Communities</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* My Communities */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-white">My Communities</h2>
                        <button className="text-sm text-lime hover:text-white transition-colors">View All</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {myCommunities.map((comm) => (
                            <div key={comm.name} className="group flex items-center gap-4 bg-surface border border-white/5 p-4 rounded-sm hover:border-lime/30 transition-colors cursor-pointer">
                                <div className="w-16 h-16 bg-dark rounded-sm overflow-hidden">
                                    <img src={comm.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={comm.name} />
                                </div>
                                <div>
                                    <h3 className="font-display text-lg font-semibold uppercase tracking-tight text-white group-hover:text-lime transition-colors">{comm.name}</h3>
                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                        <Users className="w-3 h-3" /> {comm.members} Members
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between mb-6 mt-12">
                        <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-white">Past Events</h2>
                    </div>
                    <div className="space-y-4">
                         {pastEvents.map((evt) => (
                             <div key={evt.title} className="flex items-center gap-4 bg-surface border border-white/5 p-4 rounded-sm">
                                <div className="w-24 h-16 bg-dark rounded-sm overflow-hidden">
                                    <img src={evt.image} className="w-full h-full object-cover" alt={evt.title} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-display text-lg font-semibold uppercase tracking-tight text-white">{evt.title}</h3>
                                    <div className="text-xs text-gray-500">{evt.date}</div>
                                </div>
                                <button className="text-gray-400 hover:text-lime transition-colors">
                                    <Heart className="w-5 h-5" />
                                </button>
                             </div>
                         ))}
                    </div>
                </div>

                {/* Sidebar area? maybe favorites or suggested */}
                <div>
                     <h2 className="font-display text-xl font-semibold uppercase tracking-tight text-white mb-6">Suggested for You</h2>
                     <div className="bg-surface border border-white/5 p-6 rounded-sm">
                        <p className="text-gray-400 text-sm mb-4">Based on your interest in <span className="text-white">Techno</span></p>
                        <div className="space-y-4">
                             {/* Mini suggestions */}
                             <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-white/10 rounded-full"></div>
                                 <div>
                                     <div className="text-sm font-semibold text-white">Acid Rain</div>
                                     <div className="text-xs text-gray-500">Community</div>
                                 </div>
                                 <button className="ml-auto text-lime text-xs uppercase font-bold tracking-wide">Join</button>
                             </div>
                             <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-white/10 rounded-full"></div>
                                 <div>
                                     <div className="text-sm font-semibold text-white">Dark Room</div>
                                     <div className="text-xs text-gray-500">Club</div>
                                 </div>
                                 <button className="ml-auto text-lime text-xs uppercase font-bold tracking-wide">Join</button>
                             </div>
                        </div>
                     </div>
                </div>

            </div>
        </div>
    </DashboardLayout>
  );
}

// Simple icon component helper
function MapPinIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
    )
}
