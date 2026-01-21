import { Link } from 'react-router-dom';
import { Check, X, Users } from 'lucide-react';

interface FriendRequestCardProps {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  mutualFriends?: number;
  mutualCommunities?: number;
  requestDate: string;
  type: 'incoming' | 'outgoing';
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
  onCancel?: (id: string) => void;
}

export default function FriendRequestCard({
  id,
  userId,
  name,
  avatar,
  mutualFriends = 0,
  mutualCommunities = 0,
  requestDate,
  type,
  onAccept,
  onDecline,
  onCancel,
}: FriendRequestCardProps) {
  const handleAccept = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAccept?.(id);
  };

  const handleDecline = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDecline?.(id);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCancel?.(id);
  };

  return (
    <div className="bg-surface border border-white/5 overflow-hidden">
      <Link to={`/user/${userId}`} className="block p-4 hover:bg-dark/30 transition-colors">
        <div className="flex items-start gap-4">
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{name}</h3>
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
              {mutualFriends > 0 && (
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {mutualFriends} mutual
                </span>
              )}
              {mutualCommunities > 0 && (
                <span>{mutualCommunities} shared communities</span>
              )}
            </div>
            <div className="text-[10px] text-gray-600 mt-1">
              {type === 'incoming' ? 'Sent you a request' : 'Request sent'} • {requestDate}
            </div>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="border-t border-white/5 flex">
        {type === 'incoming' ? (
          <>
            <button
              onClick={handleAccept}
              className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold uppercase tracking-wide text-lime hover:bg-lime/10 transition-colors"
            >
              <Check className="w-4 h-4" />
              Accept
            </button>
            <div className="w-px bg-white/5" />
            <button
              onClick={handleDecline}
              className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold uppercase tracking-wide text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
              Decline
            </button>
          </>
        ) : (
          <button
            onClick={handleCancel}
            className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold uppercase tracking-wide text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
            Cancel Request
          </button>
        )}
      </div>
    </div>
  );
}

export type { FriendRequestCardProps };
