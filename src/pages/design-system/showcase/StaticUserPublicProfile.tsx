/**
 * Static version of UserPublicProfile for design system showcase.
 * Uses hardcoded sample data instead of useParams().
 */
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, MapPin, UserPlus, UserCheck, Clock, UserX, ExternalLink, Lock, Shield } from 'lucide-react';
import { useData } from '../../../context/DataContext';

type FriendStatus = 'none' | 'pending_sent' | 'pending_received' | 'friends';

// Helper to format member since date
function formatMemberSince(isoDate: string): string {
  const date = new Date(isoDate);
  return `Member since ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
}

export default function StaticUserPublicProfile() {
  const { db, currentUser } = useData();

  // Get a different user (not current user) to show as "another user's profile"
  const user = useMemo(() => {
    const users = db.users.getAll();
    // Find a user that's not the current user
    const otherUser = users.find(u => u.id !== currentUser?.id);
    return otherUser || users[0];
  }, [db, currentUser]);

  // Default to friends status for showcase purposes
  const [friendStatus, setFriendStatus] = useState<FriendStatus>('friends');

  // Get mutual friends and communities
  const mutualFriends = useMemo(() => {
    if (!currentUser || !user) return [];
    return db.connections.getMutualFriends(currentUser.id, user.id);
  }, [db, currentUser, user]);

  const mutualCommunities = useMemo(() => {
    if (!currentUser || !user) return [];
    return db.connections.getMutualCommunities(currentUser.id, user.id);
  }, [db, currentUser, user]);

  // Get events attended count
  const eventsAttended = useMemo(() => {
    if (!user) return 0;
    return db.attendees.getByUser(user.id).length;
  }, [db, user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl uppercase tracking-tight mb-2">User Not Found</h1>
          <p className="text-gray-400 mb-4">No user data available.</p>
        </div>
      </div>
    );
  }

  const handleFriendAction = () => {
    if (friendStatus === 'none') {
      setFriendStatus('pending_sent');
    } else if (friendStatus === 'pending_sent') {
      setFriendStatus('none');
    }
  };

  const handleUnfriend = () => {
    setFriendStatus('none');
  };

  const isFriend = friendStatus === 'friends';
  const isOwnProfile = false; // Always showing another user's profile

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <div className="bg-surface border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <button
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'}
              alt={user.name}
              className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-surface"
            />
            {isFriend && !isOwnProfile && (
              <div className="absolute bottom-3 right-0 bg-lime text-dark p-1.5 rounded-full">
                <UserCheck className="w-4 h-4" />
              </div>
            )}
          </div>
          <h1 className="font-display text-3xl font-semibold uppercase tracking-tight mb-2">
            {user.name}
          </h1>
          {(isFriend || isOwnProfile) && user.location && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-1">
              <MapPin className="w-4 h-4" />
              {user.location}
            </div>
          )}
          <p className="text-gray-500 text-xs">{formatMemberSince(user.createdAt)}</p>
        </div>

        {/* Friend Action Button */}
        {!isOwnProfile && (
          <div className="flex justify-center gap-3 mb-8">
            {friendStatus === 'none' && (
              <button
                onClick={handleFriendAction}
                className="flex items-center gap-2 bg-lime text-dark px-6 py-3 font-semibold uppercase tracking-wide hover:bg-limehover transition-colors"
              >
                <UserPlus className="w-5 h-5" />
                Add Friend
              </button>
            )}
            {friendStatus === 'pending_sent' && (
              <button
                onClick={handleFriendAction}
                className="flex items-center gap-2 bg-surface border border-white/20 text-gray-300 px-6 py-3 font-semibold uppercase tracking-wide hover:border-red-500/50 hover:text-red-400 transition-colors"
              >
                <Clock className="w-5 h-5" />
                Request Pending
              </button>
            )}
            {friendStatus === 'pending_received' && (
              <button
                onClick={() => setFriendStatus('friends')}
                className="flex items-center gap-2 bg-lime text-dark px-6 py-3 font-semibold uppercase tracking-wide hover:bg-limehover transition-colors"
              >
                <UserCheck className="w-5 h-5" />
                Accept Request
              </button>
            )}
            {friendStatus === 'friends' && (
              <div className="flex gap-3">
                <div className="flex items-center gap-2 bg-lime/10 border border-lime/30 text-lime px-6 py-3 font-semibold uppercase tracking-wide">
                  <UserCheck className="w-5 h-5" />
                  Friends
                </div>
                <button
                  onClick={handleUnfriend}
                  className="flex items-center gap-2 bg-surface border border-white/20 text-gray-400 px-4 py-3 hover:border-red-500/50 hover:text-red-400 transition-colors"
                  title="Unfriend"
                >
                  <UserX className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Privacy Gate - Show limited info for non-friends */}
        {!isFriend && !isOwnProfile ? (
          <div className="bg-surface border border-white/5 p-8 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="font-display text-xl uppercase tracking-tight mb-2">Private Profile</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
              {user.name}'s profile is private. Send a friend request to see their full profile, bio, and activity.
            </p>

            {/* Limited public info */}
            <div className="border-t border-white/5 pt-6 mt-6">
              <div className="flex items-center justify-center gap-6 text-sm">
                {mutualFriends.length > 0 && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{mutualFriends.length} mutual friend{mutualFriends.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
                {mutualCommunities.length > 0 && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Shield className="w-4 h-4" />
                    <span>{mutualCommunities.length} shared communit{mutualCommunities.length !== 1 ? 'ies' : 'y'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Bio - Only visible to friends or own profile */}
            {user.bio && (
              <div className="bg-surface border border-white/5 p-6 mb-6">
                <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-2">About</h3>
                <p className="text-gray-300 leading-relaxed">{user.bio}</p>
              </div>
            )}

            {/* Stats - Only visible to friends or own profile */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-surface border border-white/5 p-4 text-center">
                <div className="text-2xl font-display font-semibold text-lime">{eventsAttended}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">Events Attended</div>
              </div>
              <div className="bg-surface border border-white/5 p-4 text-center">
                <div className="text-2xl font-display font-semibold text-white">{mutualFriends.length}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">Mutual Friends</div>
              </div>
              <div className="bg-surface border border-white/5 p-4 text-center">
                <div className="text-2xl font-display font-semibold text-white">{mutualCommunities.length}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">Shared Communities</div>
              </div>
            </div>

            {/* Mutual Communities - Only visible to friends or own profile */}
            {mutualCommunities.length > 0 && (
              <div className="bg-surface border border-white/5 p-6">
                <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-4">
                  Shared Communities
                </h3>
                <div className="space-y-3">
                  {mutualCommunities.map((community) => (
                    <div
                      key={community.id}
                      className="flex items-center gap-3 p-3 bg-dark/50 hover:bg-dark transition-colors cursor-pointer"
                    >
                      <img
                        src={community.avatar || 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=100&q=80'}
                        alt={community.name}
                        className="w-10 h-10 rounded-sm object-cover"
                      />
                      <span className="font-semibold text-white">{community.name}</span>
                      <ExternalLink className="w-4 h-4 text-gray-500 ml-auto" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
