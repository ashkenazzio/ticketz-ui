import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Check, Plus, Settings, Users, ExternalLink } from 'lucide-react';

export interface Community {
  id: string;
  name: string;
  avatar: string;
  memberCount: number;
  role: 'owner' | 'admin' | 'moderator';
}

interface CommunityPickerProps {
  communities: Community[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const roleConfig = {
  owner: { label: 'Owner', color: 'text-lime' },
  admin: { label: 'Admin', color: 'text-purple-400' },
  moderator: { label: 'Moderator', color: 'text-blue-400' },
};

// Format number to compact form (2500 -> 2.5K)
function formatMemberCount(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return count.toString();
}

export default function CommunityPicker({ communities, selectedId, onSelect }: CommunityPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCommunity = communities.find(c => c.id === selectedId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-3 bg-dark/50 border border-white/10 hover:border-lime/30 transition-colors"
      >
        {selectedCommunity && (
          <>
            <img
              src={selectedCommunity.avatar}
              alt={selectedCommunity.name}
              className="w-10 h-10 rounded-sm object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0 text-left">
              <div className="font-semibold text-white truncate text-sm">
                {selectedCommunity.name}
              </div>
              <div className={`text-xs uppercase tracking-wide ${roleConfig[selectedCommunity.role].color}`}>
                {roleConfig[selectedCommunity.role].label}
              </div>
            </div>
          </>
        )}
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-white/10 shadow-xl z-50">
          {/* Communities List */}
          <div className="max-h-64 overflow-y-auto">
            {communities.map((community) => (
              <button
                key={community.id}
                onClick={() => {
                  onSelect(community.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 p-3 hover:bg-dark/50 transition-colors
                  ${community.id === selectedId ? 'bg-lime/5' : ''}
                `}
              >
                <img
                  src={community.avatar}
                  alt={community.name}
                  className="w-10 h-10 rounded-sm object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0 text-left">
                  <div className="font-semibold text-white truncate text-sm">
                    {community.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={roleConfig[community.role].color}>{roleConfig[community.role].label}</span>
                    <span className="text-gray-500 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {formatMemberCount(community.memberCount)}
                    </span>
                  </div>
                </div>
                {community.id === selectedId && (
                  <Check className="w-4 h-4 text-lime flex-shrink-0" />
                )}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="border-t border-white/10">
            <Link
              to={`/community/${selectedId}`}
              className="flex items-center gap-2 p-3 text-sm text-gray-400 hover:text-lime hover:bg-dark/50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Community Page
            </Link>
            <Link
              to="/dashboard/community/new"
              className="flex items-center gap-2 p-3 text-sm text-gray-400 hover:text-lime hover:bg-dark/50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create New Community
            </Link>
            <Link
              to="/dashboard/community/settings"
              className="flex items-center gap-2 p-3 text-sm text-gray-400 hover:text-lime hover:bg-dark/50 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Community Settings
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
