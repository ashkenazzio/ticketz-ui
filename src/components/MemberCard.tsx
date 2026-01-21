import { Link } from 'react-router-dom';
import { UserPlus, UserCheck, Clock, Users } from 'lucide-react';

export type FriendStatus = 'none' | 'pending' | 'friends';
export type MemberRole = 'owner' | 'admin' | 'moderator' | 'member';

interface MemberCardProps {
  id: string;
  name: string;
  avatar: string;
  role?: MemberRole;
  mutualFriends?: number;
  mutualCommunities?: number;
  friendStatus?: FriendStatus;
  onAddFriend?: (id: string) => void;
  showRole?: boolean;
  compact?: boolean;
}

const roleConfig: Record<MemberRole, { label: string; color: string }> = {
  owner: { label: 'Owner', color: 'bg-lime/20 text-lime' },
  admin: { label: 'Admin', color: 'bg-purple-500/20 text-purple-400' },
  moderator: { label: 'Mod', color: 'bg-blue-500/20 text-blue-400' },
  member: { label: 'Member', color: 'bg-gray-500/20 text-gray-400' },
};

export default function MemberCard({
  id,
  name,
  avatar,
  role = 'member',
  mutualFriends = 0,
  mutualCommunities = 0,
  friendStatus = 'none',
  onAddFriend,
  showRole = true,
  compact = false,
}: MemberCardProps) {
  const handleAddFriend = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddFriend?.(id);
  };

  if (compact) {
    return (
      <Link
        to={`/user/${id}`}
        className="flex items-center gap-3 p-3 bg-surface border border-white/5 hover:border-lime/20 transition-colors"
      >
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-white truncate">{name}</div>
          {showRole && role !== 'member' && (
            <span className={`inline-block text-[10px] px-1.5 py-0.5 uppercase tracking-wide ${roleConfig[role].color}`}>
              {roleConfig[role].label}
            </span>
          )}
        </div>
        {friendStatus === 'none' && onAddFriend && (
          <button
            onClick={handleAddFriend}
            className="p-2 text-gray-400 hover:text-lime transition-colors"
            title="Add Friend"
          >
            <UserPlus className="w-4 h-4" />
          </button>
        )}
        {friendStatus === 'pending' && (
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        )}
        {friendStatus === 'friends' && (
          <span className="text-lime">
            <UserCheck className="w-4 h-4" />
          </span>
        )}
      </Link>
    );
  }

  return (
    <Link
      to={`/user/${id}`}
      className="block bg-surface border border-white/5 hover:border-lime/20 transition-colors overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          <img
            src={avatar}
            alt={name}
            className="w-14 h-14 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-white truncate">{name}</h3>
              {showRole && role !== 'member' && (
                <span className={`text-[10px] px-1.5 py-0.5 uppercase tracking-wide ${roleConfig[role].color}`}>
                  {roleConfig[role].label}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {mutualFriends > 0 && (
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {mutualFriends} mutual friends
                </span>
              )}
              {mutualCommunities > 0 && (
                <span>{mutualCommunities} shared communities</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 px-4 py-2 flex items-center justify-between bg-dark/30">
        <span className="text-xs text-gray-500 uppercase tracking-wide">View Profile</span>
        {friendStatus === 'none' && onAddFriend && (
          <button
            onClick={handleAddFriend}
            className="flex items-center gap-1 text-xs text-lime hover:text-limehover uppercase tracking-wide font-semibold transition-colors"
          >
            <UserPlus className="w-3 h-3" />
            Add Friend
          </button>
        )}
        {friendStatus === 'pending' && (
          <span className="flex items-center gap-1 text-xs text-gray-500 uppercase tracking-wide">
            <Clock className="w-3 h-3" />
            Request Sent
          </span>
        )}
        {friendStatus === 'friends' && (
          <span className="flex items-center gap-1 text-xs text-lime uppercase tracking-wide">
            <UserCheck className="w-3 h-3" />
            Friends
          </span>
        )}
      </div>
    </Link>
  );
}

export type { MemberCardProps };
