import { Link } from 'react-router-dom';
import { Users, Settings, ExternalLink, Crown, Shield } from 'lucide-react';

interface CommunityMembership {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  memberCount: number;
  role: 'member' | 'moderator' | 'admin';
  eventCount: number;
}

// Mock data
const myCommunities: CommunityMembership[] = [
  {
    id: '1',
    name: 'Bass Sector',
    avatar: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&q=80',
    memberCount: 2500,
    role: 'admin',
    eventCount: 12,
  },
  {
    id: '2',
    name: 'Techno Bunker',
    avatar: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    memberCount: 1800,
    role: 'member',
    eventCount: 8,
  },
  {
    id: '3',
    name: 'House Heads',
    avatar: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    memberCount: 3200,
    role: 'moderator',
    eventCount: 15,
  },
];

const roleConfig = {
  admin: { label: 'Admin', icon: Crown, color: 'text-lime bg-lime/10' },
  moderator: { label: 'Mod', icon: Shield, color: 'text-blue-400 bg-blue-400/10' },
  member: { label: 'Member', icon: Users, color: 'text-gray-400 bg-gray-400/10' },
};

export default function MyCommunities() {
  return (
    <div className="pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="font-display text-2xl font-semibold uppercase tracking-tight mb-2">My Communities</h1>
        {/* Subtitle + CTA */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400 text-sm">
            {myCommunities.length} communities joined
          </p>
          <Link
            to="/communities"
            className="hidden sm:flex items-center gap-2 text-lime hover:text-limehover text-sm uppercase tracking-wide font-semibold transition-colors"
          >
            Discover More <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

          {/* Communities Grid */}
          {myCommunities.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {myCommunities.map((community) => {
                const RoleIcon = roleConfig[community.role].icon;
                return (
                  <div
                    key={community.id}
                    className="bg-surface border border-white/5 overflow-hidden group hover:border-lime/30 transition-all"
                  >
                    {/* Cover Image */}
                    <div className="relative h-24 overflow-hidden">
                      <img
                        src={community.coverImage}
                        alt={community.name}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />

                      {/* Role Badge */}
                      <div className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-1 text-xs font-semibold uppercase ${roleConfig[community.role].color}`}>
                        <RoleIcon className="w-3 h-3" />
                        {roleConfig[community.role].label}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 pt-0 -mt-8 relative">
                      <img
                        src={community.avatar}
                        alt={community.name}
                        className="w-16 h-16 object-cover border-2 border-surface mb-3"
                      />

                      <h3 className="font-display text-lg uppercase tracking-tight mb-2 group-hover:text-lime transition-colors">
                        {community.name}
                      </h3>

                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {community.memberCount.toLocaleString()}
                        </span>
                        <span>{community.eventCount} events</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link
                          to={`/community/${community.id}`}
                          className="flex-1 bg-dark border border-white/10 text-center py-2 text-xs font-semibold uppercase tracking-wide hover:border-lime hover:text-lime transition-colors"
                        >
                          View
                        </Link>
                        {(community.role === 'admin' || community.role === 'moderator') && (
                          <Link
                            to="/dashboard"
                            className="w-10 flex items-center justify-center bg-lime/10 text-lime hover:bg-lime hover:text-dark transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Empty State
            <div className="border-2 border-lime/20 bg-surface/50 py-16 px-8 text-center">
              <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="font-display text-xl uppercase tracking-tight mb-2">
                No Communities Yet
              </h3>
              <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                Find your people. Join communities that match your vibe and never miss an event.
              </p>
              <Link
                to="/communities"
                className="inline-block bg-lime text-dark px-6 py-3 font-semibold uppercase text-sm tracking-wide hover:bg-limehover transition-colors"
              >
                Discover Communities
              </Link>
            </div>
          )}

        {/* Mobile CTA */}
        <div className="mt-8 sm:hidden text-center">
          <Link
            to="/communities"
            className="inline-flex items-center gap-2 text-lime text-sm uppercase tracking-wide font-semibold"
          >
            Discover More Communities <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
