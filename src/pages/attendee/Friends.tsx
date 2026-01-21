import { useState } from 'react';
import { Search, Users, UserPlus, Clock, UserX } from 'lucide-react';
import MemberCard from '../../components/MemberCard';
import FriendRequestCard from '../../components/FriendRequestCard';
import { useData, useMyFriends } from '../../context/DataContext';

type TabKey = 'friends' | 'requests' | 'sent';

// Helper to format relative time
function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'friends', label: 'Friends', icon: <Users className="w-4 h-4" /> },
  { key: 'requests', label: 'Requests', icon: <UserPlus className="w-4 h-4" /> },
  { key: 'sent', label: 'Sent', icon: <Clock className="w-4 h-4" /> },
];

export default function Friends() {
  const { db, currentUser } = useData();
  const { friends, pendingReceived, pendingSent } = useMyFriends();
  const [activeTab, setActiveTab] = useState<TabKey>('friends');
  const [searchQuery, setSearchQuery] = useState('');

  // Build friends list with mutual counts
  const friendsWithMutuals = friends.map(friend => {
    const mutualFriends = currentUser ? db.connections.getMutualFriends(currentUser.id, friend.id) : [];
    const mutualCommunities = currentUser ? db.connections.getMutualCommunities(currentUser.id, friend.id) : [];
    return {
      ...friend,
      mutualFriends: mutualFriends.length,
      mutualCommunities: mutualCommunities.length,
    };
  });

  // Build incoming requests with user info
  const incomingRequests = pendingReceived.map(connection => {
    const user = db.users.getById(connection.requesterId);
    const mutualFriends = currentUser && user ? db.connections.getMutualFriends(currentUser.id, user.id) : [];
    const mutualCommunities = currentUser && user ? db.connections.getMutualCommunities(currentUser.id, user.id) : [];
    return {
      connectionId: connection.id,
      user,
      mutualFriends: mutualFriends.length,
      mutualCommunities: mutualCommunities.length,
      requestDate: formatRelativeTime(connection.createdAt),
    };
  }).filter(r => r.user);

  // Build sent requests with user info
  const sentRequests = pendingSent.map(connection => {
    const user = db.users.getById(connection.addresseeId);
    const mutualFriends = currentUser && user ? db.connections.getMutualFriends(currentUser.id, user.id) : [];
    const mutualCommunities = currentUser && user ? db.connections.getMutualCommunities(currentUser.id, user.id) : [];
    return {
      connectionId: connection.id,
      user,
      mutualFriends: mutualFriends.length,
      mutualCommunities: mutualCommunities.length,
      requestDate: formatRelativeTime(connection.createdAt),
    };
  }).filter(r => r.user);

  const filteredFriends = friendsWithMutuals.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAcceptRequest = (id: string) => {
    console.log('Accept request:', id);
  };

  const handleDeclineRequest = (id: string) => {
    console.log('Decline request:', id);
  };

  const handleCancelRequest = (id: string) => {
    console.log('Cancel request:', id);
  };

  const handleRemoveFriend = (id: string) => {
    console.log('Remove friend:', id);
  };

  if (!currentUser) {
    return (
      <div className="pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <p className="text-gray-400">Please log in to view your friends.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-semibold uppercase tracking-tight">Friends</h1>
            <p className="text-gray-400 text-sm mt-1">
              {friends.length} friends • {pendingReceived.length} pending requests
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const count = tab.key === 'friends'
              ? friends.length
              : tab.key === 'requests'
              ? incomingRequests.length
              : sentRequests.length;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide whitespace-nowrap transition-all
                  ${activeTab === tab.key
                    ? 'bg-lime text-dark'
                    : 'bg-surface text-gray-400 hover:text-white'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
                {count > 0 && (
                  <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-sm ${
                    activeTab === tab.key ? 'bg-dark/20' : 'bg-white/10'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Friends Tab */}
        {activeTab === 'friends' && (
          <div>
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-white/10 pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime transition-colors"
              />
            </div>

            {/* Friends List */}
            {filteredFriends.length > 0 ? (
              <div className="space-y-3">
                {filteredFriends.map((friend) => (
                  <div key={friend.id} className="relative group">
                    <MemberCard
                      id={friend.id}
                      name={friend.name}
                      avatar={friend.avatar}
                      mutualFriends={friend.mutualFriends}
                      mutualCommunities={friend.mutualCommunities}
                      friendStatus="friends"
                      showRole={false}
                    />
                    {/* Unfriend option - appears on hover */}
                    <button
                      onClick={() => handleRemoveFriend(friend.id)}
                      className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                      title="Remove Friend"
                    >
                      <UserX className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-lime/20 bg-surface/50 py-12 px-8 text-center">
                <Users className="w-10 h-10 text-gray-600 mx-auto mb-4" />
                <h3 className="font-display text-lg uppercase tracking-tight mb-2">
                  {searchQuery ? 'No Results Found' : 'No Friends Yet'}
                </h3>
                <p className="text-gray-400 text-sm">
                  {searchQuery
                    ? `No friends matching "${searchQuery}"`
                    : 'Join communities and attend events to meet new people.'
                  }
                </p>
              </div>
            )}
          </div>
        )}

        {/* Incoming Requests Tab */}
        {activeTab === 'requests' && (
          <div>
            {incomingRequests.length > 0 ? (
              <div className="space-y-3">
                {incomingRequests.map((request) => (
                  <FriendRequestCard
                    key={request.connectionId}
                    id={request.connectionId}
                    userId={request.user!.id}
                    name={request.user!.name}
                    avatar={request.user!.avatar || ''}
                    mutualFriends={request.mutualFriends}
                    mutualCommunities={request.mutualCommunities}
                    requestDate={request.requestDate}
                    type="incoming"
                    onAccept={handleAcceptRequest}
                    onDecline={handleDeclineRequest}
                  />
                ))}
              </div>
            ) : (
              <div className="border-2 border-lime/20 bg-surface/50 py-12 px-8 text-center">
                <UserPlus className="w-10 h-10 text-gray-600 mx-auto mb-4" />
                <h3 className="font-display text-lg uppercase tracking-tight mb-2">
                  No Pending Requests
                </h3>
                <p className="text-gray-400 text-sm">
                  When someone sends you a friend request, it will appear here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Sent Requests Tab */}
        {activeTab === 'sent' && (
          <div>
            {sentRequests.length > 0 ? (
              <div className="space-y-3">
                {sentRequests.map((request) => (
                  <FriendRequestCard
                    key={request.connectionId}
                    id={request.connectionId}
                    userId={request.user!.id}
                    name={request.user!.name}
                    avatar={request.user!.avatar || ''}
                    mutualFriends={request.mutualFriends}
                    mutualCommunities={request.mutualCommunities}
                    requestDate={request.requestDate}
                    type="outgoing"
                    onCancel={handleCancelRequest}
                  />
                ))}
              </div>
            ) : (
              <div className="border-2 border-lime/20 bg-surface/50 py-12 px-8 text-center">
                <Clock className="w-10 h-10 text-gray-600 mx-auto mb-4" />
                <h3 className="font-display text-lg uppercase tracking-tight mb-2">
                  No Sent Requests
                </h3>
                <p className="text-gray-400 text-sm">
                  Friend requests you send will appear here until they're accepted.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
