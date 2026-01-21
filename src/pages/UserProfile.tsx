import { Link } from 'react-router-dom';
import { Settings, Calendar, Users, Heart, Edit2, Ticket, Bell, MapPin, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const myCommunities = [
    { id: '1', name: "Bass Sector", members: "12.5k", image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1000&auto=format&fit=crop" },
    { id: '2', name: "Techno Bunker", members: "8.2k", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop" },
];

const pastEvents = [
    { id: '1', title: "Neon Sunrise 5K", date: "Oct 24, 2026", image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800&auto=format&fit=crop" },
    { id: '2', title: "React Patterns Workshop", date: "Oct 28, 2026", image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop" },
    { id: '3', title: "Warehouse Project: 004", date: "Oct 30, 2026", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop" },
];

const stats = [
  { label: 'Events Attended', value: '12', icon: Calendar },
  { label: 'Communities', value: '2', icon: Users },
  { label: 'Tickets Owned', value: '3', icon: Ticket },
  { label: 'Friends', value: '24', icon: UserPlus },
];

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Profile Card - Minimal Design */}
      <div className="bg-surface border border-white/5 rounded-sm p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden bg-dark border-2 border-lime/30 flex-shrink-0">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name & Location */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="font-display text-2xl sm:text-3xl font-semibold uppercase tracking-tight text-white">
              {user?.name || 'Alex Moran'}
            </h1>
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 text-gray-400 text-sm mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Los Angeles, CA
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Joined 2023
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Link
              to="/settings"
              className="flex items-center gap-2 px-4 py-2 border border-white/20 text-sm font-semibold uppercase hover:bg-white/5 transition-colors"
            >
              <Settings className="w-4 h-4" /> Settings
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-2 px-4 py-2 bg-lime text-dark text-sm font-semibold uppercase hover:bg-limehover transition-colors"
            >
              <Edit2 className="w-4 h-4" /> Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-surface border border-white/5 p-4 text-center">
            <stat.icon className="w-5 h-5 text-lime mx-auto mb-2" />
            <div className="font-display text-2xl font-semibold text-white">{stat.value}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* My Communities */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold uppercase tracking-tight text-white">
                My Communities
              </h2>
              <Link to="/my-communities" className="text-sm text-lime hover:text-limehover transition-colors">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {myCommunities.map((comm) => (
                <Link
                  key={comm.id}
                  to={`/community/${comm.id}`}
                  className="group flex items-center gap-4 bg-surface border border-white/5 p-4 hover:border-lime/30 transition-colors"
                >
                  <div className="w-14 h-14 bg-dark rounded-sm overflow-hidden flex-shrink-0">
                    <img src={comm.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={comm.name} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold uppercase tracking-tight text-white group-hover:text-lime transition-colors">
                      {comm.name}
                    </h3>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Users className="w-3 h-3" /> {comm.members} Members
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Past Events */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold uppercase tracking-tight text-white">
                Past Events
              </h2>
              <Link to="/orders" className="text-sm text-lime hover:text-limehover transition-colors">
                View Orders
              </Link>
            </div>
            <div className="space-y-3">
              {pastEvents.map((evt) => (
                <Link
                  key={evt.id}
                  to={`/event/${evt.id}`}
                  className="flex items-center gap-4 bg-surface border border-white/5 p-3 hover:border-lime/30 transition-colors group"
                >
                  <div className="w-20 h-14 bg-dark rounded-sm overflow-hidden flex-shrink-0">
                    <img src={evt.image} className="w-full h-full object-cover" alt={evt.title} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base font-semibold uppercase tracking-tight text-white truncate group-hover:text-lime transition-colors">
                      {evt.title}
                    </h3>
                    <div className="text-xs text-gray-500">{evt.date}</div>
                  </div>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-400 hover:text-lime transition-colors p-2"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-surface border border-white/5 p-6">
            <h3 className="font-display text-lg uppercase tracking-tight mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                to="/wallet"
                className="flex items-center gap-3 p-3 bg-dark hover:bg-white/5 transition-colors group"
              >
                <Ticket className="w-5 h-5 text-lime" />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">View My Tickets</span>
              </Link>
              <Link
                to="/app/friends"
                className="flex items-center gap-3 p-3 bg-dark hover:bg-white/5 transition-colors group"
              >
                <UserPlus className="w-5 h-5 text-lime" />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Manage Friends</span>
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-3 p-3 bg-dark hover:bg-white/5 transition-colors group"
              >
                <Bell className="w-5 h-5 text-lime" />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Notification Settings</span>
              </Link>
            </div>
          </div>

          {/* Suggested Communities */}
          <div className="bg-surface border border-white/5 p-6">
            <h3 className="font-display text-lg uppercase tracking-tight mb-4">Suggested for You</h3>
            <p className="text-gray-400 text-sm mb-4">Based on your interest in <span className="text-white">Techno</span></p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-dark rounded-sm overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=100" className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">Acid Rain</div>
                  <div className="text-xs text-gray-500">1.2k members</div>
                </div>
                <button className="text-lime text-xs uppercase font-bold tracking-wide hover:text-limehover transition-colors">
                  Join
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-dark rounded-sm overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=100" className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">Dark Room</div>
                  <div className="text-xs text-gray-500">856 members</div>
                </div>
                <button className="text-lime text-xs uppercase font-bold tracking-wide hover:text-limehover transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
