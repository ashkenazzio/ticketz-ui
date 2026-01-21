import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Users, Settings, ExternalLink, Crown, Shield } from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { CommunityRole } from '../../data/types';

const roleConfig: Record<CommunityRole, { label: string; icon: typeof Crown; color: string }> = {
  owner: { label: 'Owner', icon: Crown, color: 'text-lime bg-lime/10' },
  admin: { label: 'Admin', icon: Crown, color: 'text-lime bg-lime/10' },
  moderator: { label: 'Mod', icon: Shield, color: 'text-blue-400 bg-blue-400/10' },
  member: { label: 'Member', icon: Users, color: 'text-gray-400 bg-gray-400/10' },
};

export default function MyCommunities() {
  const { db, currentUser } = useData();

  // Get user's communities from database
  const myCommunities = useMemo(() => {
    if (!currentUser) return [];

    const memberships = db.memberships.getByUser(currentUser.id);
    return memberships.map(membership => {
      const community = db.communities.getById(membership.communityId);
      const memberCount = db.communities.getMemberCount(membership.communityId);
      const eventCount = db.events.getByCommunity(membership.communityId).length;

      return {
        id: community?.id || '',
        name: community?.name || 'Unknown Community',
        avatar: community?.avatar || '',
        coverImage: community?.coverImage || '',
        memberCount,
        role: membership.role,
        eventCount,
      };
    }).filter(c => c.id);
  }, [db, currentUser]);

  if (!currentUser) {
    return (
      <div className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <p className="text-gray-400">Please log in to view your communities.</p>
        </div>
      </div>
    );
  }
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
                        {(community.role === 'owner' || community.role === 'admin' || community.role === 'moderator') && (
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
