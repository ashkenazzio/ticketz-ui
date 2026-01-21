import { useState } from 'react';
import { X, Search, Users } from 'lucide-react';
import MemberCard, { type FriendStatus, type MemberRole } from './MemberCard';

interface Member {
  id: string;
  name: string;
  avatar: string;
  role: MemberRole;
  mutualFriends: number;
  friendStatus: FriendStatus;
}

interface MembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  members: Member[];
  totalCount?: number;
  onAddFriend?: (id: string) => void;
}

export default function MembersModal({
  isOpen,
  onClose,
  title,
  members,
  totalCount,
  onAddFriend,
}: MembersModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface border border-white/10 w-full max-w-lg max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-lime" />
            <h2 className="font-display text-xl uppercase tracking-tight">{title}</h2>
            {totalCount && (
              <span className="text-sm text-gray-400">({totalCount})</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-white/5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark border border-white/10 pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime transition-colors"
            />
          </div>
        </div>

        {/* Members List - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-8 h-8 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500">
                {searchQuery
                  ? `No members found matching "${searchQuery}"`
                  : 'No members to display'}
              </p>
            </div>
          ) : (
            filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                id={member.id}
                name={member.name}
                avatar={member.avatar}
                role={member.role}
                mutualFriends={member.mutualFriends}
                friendStatus={member.friendStatus}
                onAddFriend={onAddFriend}
                compact
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 bg-dark/30">
          <p className="text-xs text-gray-500 text-center">
            Showing {filteredMembers.length} of {totalCount || members.length} members
          </p>
        </div>
      </div>
    </div>
  );
}
