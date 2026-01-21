import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Send, Pin, Clock, Shield, Crown, ChevronDown, ChevronUp, Heart, Reply } from 'lucide-react';
import { useData } from '../context/DataContext';
import type { CommunityRole } from '../data/types';

interface MessageAuthor {
  id: string;
  name: string;
  avatar: string;
  role?: CommunityRole;
}

interface Message {
  id: string;
  author: MessageAuthor;
  content: string;
  timestamp: string;
  isPinned?: boolean;
  likes: number;
  replies?: Message[];
}

const roleColors: Record<CommunityRole, string> = {
  owner: 'text-lime',
  admin: 'text-purple-400',
  moderator: 'text-blue-400',
  member: 'text-gray-400',
};

const roleIcons: Record<CommunityRole, React.ReactNode> = {
  owner: <Crown className="w-3 h-3" />,
  admin: <Shield className="w-3 h-3" />,
  moderator: <Shield className="w-3 h-3" />,
  member: null,
};

// NOTE: Messages are not yet part of the database schema.
// This is a schema gap - a Message entity with replies, likes, and pinned status would be needed.
// For now, using mock data that references real user IDs from the database.
const getMockMessages = (db: ReturnType<typeof useData>['db']): Message[] => {
  const sarah = db.users.getById('user-002');
  const marcus = db.users.getById('user-003');
  const emma = db.users.getById('user-006');
  const tyler = db.users.getById('user-005');
  const nina = db.users.getById('user-004');

  return [
    {
      id: 'msg-1',
      author: {
        id: sarah?.id || 'user-002',
        name: sarah?.name || 'Sarah Chen',
        avatar: sarah?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
        role: 'moderator' as CommunityRole,
      },
      content: "Hey everyone! Just wanted to remind you all that the venue for Electric Garden opens at noon, but the main acts won't start until 6PM. Get there early to catch some amazing local talent warming up the night!",
      timestamp: '2 hours ago',
      isPinned: true,
      likes: 24,
    },
    {
      id: 'msg-2',
      author: {
        id: marcus?.id || 'user-003',
        name: marcus?.name || 'Marcus Johnson',
        avatar: marcus?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
        role: 'member' as CommunityRole,
      },
      content: "Parking update: There's a new lot opened up on 5th Street, about a 3-minute walk from the venue. $10 flat rate for the night. Much better than the usual options!",
      timestamp: '5 hours ago',
      isPinned: false,
      likes: 18,
    },
    {
      id: 'msg-3',
      author: {
        id: emma?.id || 'user-006',
        name: emma?.name || 'Emma Rodriguez',
        avatar: emma?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
        role: 'member' as CommunityRole,
      },
      content: "Can't wait for the festival! Anyone want to meet up before the show? Thinking of grabbing food at that taco spot nearby around 11.",
      timestamp: '1 day ago',
      isPinned: false,
      likes: 7,
      replies: [
        {
          id: 'msg-3-1',
          author: {
            id: tyler?.id || 'user-005',
            name: tyler?.name || 'Tyler Brooks',
            avatar: tyler?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
            role: 'owner' as CommunityRole,
          },
          content: "I'm down! Which taco spot?",
          timestamp: '23 hours ago',
          likes: 2,
        },
      ],
    },
    {
      id: 'msg-4',
      author: {
        id: nina?.id || 'user-004',
        name: nina?.name || 'Nina Patel',
        avatar: nina?.avatar || 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
        role: 'member' as CommunityRole,
      },
      content: "Just prepped my festival outfit and tested my earplugs. Ready for 3 days of bass! See you all on the dance floor.",
      timestamp: '2 days ago',
      isPinned: false,
      likes: 31,
    },
  ];
};

interface MessageBoardProps {
  title?: string;
  communityId?: string;
  eventId?: string;
  maxMessages?: number;
  showComposeBox?: boolean;
}

export default function MessageBoard({
  title = 'Message Board',
  maxMessages,
  showComposeBox = true,
}: MessageBoardProps) {
  const { db, currentUser } = useData();
  const [expandedMessages, setExpandedMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showAllMessages, setShowAllMessages] = useState(false);

  // Get messages from mock data (references real users from DB)
  const messages = getMockMessages(db);
  const pinnedMessages = messages.filter((m) => m.isPinned);
  const regularMessages = messages.filter((m) => !m.isPinned);
  const displayMessages = maxMessages && !showAllMessages
    ? regularMessages.slice(0, maxMessages)
    : regularMessages;

  const toggleReplies = (messageId: string) => {
    setExpandedMessages((prev) =>
      prev.includes(messageId)
        ? prev.filter((id) => id !== messageId)
        : [...prev, messageId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    console.log('New message:', newMessage);
    setNewMessage('');
  };

  const renderMessage = (message: Message, isReply = false) => (
    <div
      key={message.id}
      className={`${isReply ? 'ml-12 mt-3' : ''} ${message.isPinned ? 'bg-lime/5 border-lime/20' : 'bg-surface border-white/5'} border p-4`}
    >
      {message.isPinned && (
        <div className="flex items-center gap-1 text-xs text-lime mb-3">
          <Pin className="w-3 h-3" />
          Pinned by organizer
        </div>
      )}

      <div className="flex gap-3">
        <Link to={`/user/${message.author.id}`}>
          <img
            src={message.author.avatar}
            alt={message.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Link
              to={`/user/${message.author.id}`}
              className="font-semibold text-white hover:text-lime transition-colors"
            >
              {message.author.name}
            </Link>
            {message.author.role && message.author.role !== 'member' && (
              <span className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 uppercase tracking-wide bg-white/5 ${roleColors[message.author.role]}`}>
                {roleIcons[message.author.role]}
                {message.author.role}
              </span>
            )}
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {message.timestamp}
            </span>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">{message.content}</p>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-3">
            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-lime transition-colors">
              <Heart className="w-3.5 h-3.5" />
              {message.likes}
            </button>
            {!isReply && (
              <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-lime transition-colors">
                <Reply className="w-3.5 h-3.5" />
                Reply
              </button>
            )}
          </div>

          {/* Replies */}
          {message.replies && message.replies.length > 0 && !isReply && (
            <div className="mt-3">
              <button
                onClick={() => toggleReplies(message.id)}
                className="flex items-center gap-1 text-xs text-lime hover:text-limehover transition-colors"
              >
                {expandedMessages.includes(message.id) ? (
                  <>
                    <ChevronUp className="w-3 h-3" />
                    Hide {message.replies.length} {message.replies.length === 1 ? 'reply' : 'replies'}
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3" />
                    Show {message.replies.length} {message.replies.length === 1 ? 'reply' : 'replies'}
                  </>
                )}
              </button>

              {expandedMessages.includes(message.id) && (
                <div className="space-y-3 mt-3">
                  {message.replies.map((reply) => renderMessage(reply, true))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-dark">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg uppercase tracking-tight flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-lime" />
          {title}
        </h3>
        <span className="text-xs text-gray-500">
          {messages.length} messages
        </span>
      </div>

      {/* Compose Box */}
      {showComposeBox && currentUser && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-3">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write a message..."
                className="flex-1 bg-surface border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime transition-colors text-sm"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="bg-lime text-dark px-4 font-semibold uppercase text-sm hover:bg-limehover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Pinned Messages */}
      {pinnedMessages.length > 0 && (
        <div className="space-y-3 mb-4">
          {pinnedMessages.map((message) => renderMessage(message))}
        </div>
      )}

      {/* Regular Messages */}
      <div className="space-y-3">
        {displayMessages.map((message) => renderMessage(message))}
      </div>

      {/* Show More */}
      {maxMessages && regularMessages.length > maxMessages && (
        <button
          onClick={() => setShowAllMessages(!showAllMessages)}
          className="w-full mt-4 py-3 text-sm text-gray-400 hover:text-lime uppercase tracking-wide border border-white/10 hover:border-lime/30 transition-colors"
        >
          {showAllMessages
            ? 'Show Less'
            : `View All ${regularMessages.length} Messages`}
        </button>
      )}
    </div>
  );
}
