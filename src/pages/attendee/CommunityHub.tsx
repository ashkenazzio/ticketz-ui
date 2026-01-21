import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Users, Calendar, ArrowRight, Bookmark, MapPin,
  Settings, UserPlus, UserMinus, Shield, BarChart3,
  Bell, BellOff, ChevronDown, ExternalLink, ArrowLeft, CalendarRange
} from 'lucide-react';
import { type FriendStatus, type MemberRole } from '../../components/MemberCard';
import MembersModal from '../../components/MembersModal';
import MessageBoard from '../../components/MessageBoard';
import AuthPromptModal from '../../components/AuthPromptModal';
import { useAuthPrompt } from '../../hooks/useAuthPrompt';
import { getCategoryById } from '../../constants/categories';
import { useCommunity, useData, useIsSaved } from '../../context/DataContext';

// Helper to format dates
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export default function CommunityHub() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const { showPrompt, promptReason, closePrompt, requireAuth } = useAuthPrompt();
  const { db, currentUser } = useData();

  // Get community data from database
  const communityData = useCommunity(id);

  // Handle missing community
  if (!communityData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold uppercase tracking-tight mb-4">Community Not Found</h1>
          <p className="text-gray-400 mb-6">The community you're looking for doesn't exist.</p>
          <Link to="/app/search?tab=communities" className="text-lime hover:text-limehover">Browse Communities</Link>
        </div>
      </div>
    );
  }

  const { community, events, memberCount } = communityData;

  // Get membership info for current user
  const userMembership = currentUser
    ? db.memberships.getUserRole(currentUser.id, community.id)
    : undefined;
  const isUserAdmin = userMembership?.role === 'owner' || userMembership?.role === 'admin';

  // Get community members with their info
  const memberships = db.memberships.getByCommunity(community.id);
  const communityMembers = memberships.map(membership => {
    const user = db.users.getById(membership.userId);
    if (!user) return null;
    const connection = currentUser ? db.connections.getStatus(currentUser.id, user.id) : undefined;
    const mutualFriends = currentUser ? db.connections.getMutualFriends(currentUser.id, user.id).length : 0;
    let friendStatus: FriendStatus = 'none';
    if (connection) {
      if (connection.status === 'accepted') friendStatus = 'friends';
      else if (connection.status === 'pending') friendStatus = 'pending';
    }
    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      role: membership.role as MemberRole,
      mutualFriends,
      friendStatus,
    };
  }).filter((m): m is NonNullable<typeof m> => m !== null);

  // Get category objects for this community (primary + optional secondary)
  const communityCategories = [
    getCategoryById(community.primaryCategory),
    community.secondaryCategory ? getCategoryById(community.secondaryCategory) : null,
  ].filter((cat): cat is NonNullable<typeof cat> => cat !== null && cat !== undefined);

  const handleBack = () => {
    navigate('/app/search?tab=communities');
  };

  const handleJoinCommunity = () => {
    requireAuth(() => {
      setIsSubscribed(!isSubscribed);
    }, 'join_community');
  };

  const handleAddFriend = (userId: string) => {
    requireAuth(() => {
      console.log('Add friend:', userId);
    }, 'add_friend');
  };

  // Preview members for the compact list
  const previewMembers = communityMembers.slice(0, 4);
  const pastEventsCount = events.filter(e => new Date(e.endTime) < new Date()).length;

  return (
    <>
      {/* Branded Header Banner */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img
          src={community.coverImage || community.avatar || 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop'}
          alt="Banner"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 z-20 w-10 h-10 bg-dark/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-dark transition-colors border border-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 pb-6 md:pb-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 text-center md:text-left">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-surface border-2 border-white/10 shadow-2xl rounded-sm overflow-hidden flex-shrink-0">
                <img
                  src={community.avatar || 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1000&auto=format&fit=crop'}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mb-0 md:mb-2">
                {/* Category Badges */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
                  {communityCategories.map((category, index) => {
                    const Icon = category.icon;
                    const isPrimary = index === 0;
                    return (
                      <span
                        key={category.id}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider border ${
                          isPrimary
                            ? 'bg-lime/10 text-lime border-lime/20'
                            : 'bg-purple-400/10 text-purple-400 border-purple-400/20'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {category.label}
                      </span>
                    );
                  })}
                </div>
                <h1 className="font-display text-3xl md:text-6xl font-semibold uppercase tracking-tighter leading-none">{community.name}</h1>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-4 text-gray-400 mt-2 text-xs md:text-sm font-medium">
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {memberCount.toLocaleString()} Members</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {pastEventsCount} Past Events</span>
                  {community.geolocation && (
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {community.geolocation}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Admin Badge */}
            {isUserAdmin && (
              <div className="hidden md:flex items-center gap-2 bg-lime/10 border border-lime/30 px-3 py-1.5 text-lime text-xs font-semibold uppercase">
                <Shield className="w-3.5 h-3.5" />
                {userMembership?.role === 'owner' ? 'Owner' : 'Admin'}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Subscribe/Unsubscribe Button */}
          <button
            onClick={handleJoinCommunity}
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
            {community.description || 'No description available.'}
          </p>
          {community.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {community.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-dark text-xs text-gray-400 uppercase tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Admin Panel (Conditional) */}
        {isUserAdmin && (
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
                  to="/dashboard/community/settings"
                  className="flex items-center gap-2 bg-surface border border-lime/30 text-lime px-4 py-3 font-semibold text-sm uppercase tracking-wide hover:bg-lime/10 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Community Members Section - Compact Preview */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg uppercase tracking-tight text-gray-400">
              Members <span className="text-lime">({memberCount})</span>
            </h3>
            <button
              onClick={() => setShowMembersModal(true)}
              className="text-sm text-lime hover:text-limehover transition-colors"
            >
              View All
            </button>
          </div>

          {/* Member Avatars Preview */}
          <button
            onClick={() => setShowMembersModal(true)}
            className="w-full bg-surface border border-white/5 hover:border-lime/20 p-4 transition-colors flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {previewMembers.map((member) => (
                <img
                  key={member.id}
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-surface"
                />
              ))}
              {memberCount > 4 && (
                <div className="w-10 h-10 rounded-full bg-dark border-2 border-surface flex items-center justify-center text-xs text-gray-400 font-semibold">
                  +{memberCount - 4}
                </div>
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm text-white">
                {previewMembers.slice(0, 2).map(m => m.name).join(', ')}
                {memberCount > 2 && ` and ${memberCount - 2} others`}
              </div>
              <div className="text-xs text-gray-500">Click to view all members</div>
            </div>
            <Users className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Members Modal */}
        <MembersModal
          isOpen={showMembersModal}
          onClose={() => setShowMembersModal(false)}
          title="Community Members"
          members={communityMembers}
          totalCount={memberCount}
          onAddFriend={handleAddFriend}
        />

        {/* Community Message Board */}
        <div className="mb-12">
          <MessageBoard
            title="Community Board"
            communityId={community.id}
            maxMessages={3}
            showComposeBox={isSubscribed}
          />
          {!isSubscribed && (
            <div className="mt-4 text-center py-4 bg-surface border border-white/5">
              <p className="text-sm text-gray-400">
                <button
                  onClick={handleJoinCommunity}
                  className="text-lime hover:text-limehover"
                >
                  Join the community
                </button>{' '}
                to post messages
              </p>
            </div>
          )}
        </div>

        {/* Upcoming Events */}
        <h2 className="font-display text-3xl font-semibold uppercase tracking-tighter mb-8 border-b border-white/10 pb-4">
          Upcoming Events
        </h2>

        {events.length === 0 ? (
          <div className="text-center py-12 bg-surface border border-white/5">
            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="font-display text-xl uppercase tracking-tight mb-2">No Upcoming Events</h3>
            <p className="text-gray-400 text-sm">Check back later for new events from this community.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.filter(e => new Date(e.startTime) > new Date()).map((event) => {
              const isMultiDay = db.events.isMultiDay(event);
              const lowestTier = db.ticketTiers.getByEvent(event.id).sort((a, b) => a.price - b.price)[0];
              const price = lowestTier ? `$${(lowestTier.price / 100).toFixed(0)}` : 'Free';
              const ticketsSold = db.analytics.getEventTicketsSold(event.id);
              const capacity = db.analytics.getEventCapacity(event.id);
              const isSoldOut = capacity > 0 && ticketsSold >= capacity;

              return (
                <Link
                  to={`/event/${event.id}`}
                  key={event.id}
                  className="group relative bg-surface border border-white/5 hover:border-lime/50 transition-all duration-300 rounded-sm overflow-hidden flex flex-col h-full"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.image || event.coverImage || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800'}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {isSoldOut && (
                      <div className="absolute top-4 right-4 text-xs font-semibold px-2 py-1 uppercase rounded-sm bg-white text-dark">
                        Sold Out
                      </div>
                    )}
                    {isMultiDay && (
                      <div className="absolute top-4 left-4 text-xs font-semibold px-2 py-1 uppercase rounded-sm bg-purple-500 text-white flex items-center gap-1">
                        <CalendarRange className="w-3 h-3" />
                        Multi-Day
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-lime text-xs font-mono uppercase">
                        {formatDate(event.startTime)}
                        {isMultiDay && ` - ${formatDate(event.endTime)}`}
                        {!isMultiDay && ` • ${formatTime(event.startTime)}`}
                      </div>
                      <div className="text-white font-semibold">{price}</div>
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
              );
            })}
          </div>
        )}

        {/* View All Events Link */}
        <div className="mt-8 mb-20 md:mb-8 text-center">
          <Link
            to="/app/search"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-lime text-sm uppercase tracking-wide transition-colors"
          >
            View All Events <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Auth Prompt Modal */}
      <AuthPromptModal
        isOpen={showPrompt}
        onClose={closePrompt}
        reason={promptReason}
      />
    </>
  );
}
