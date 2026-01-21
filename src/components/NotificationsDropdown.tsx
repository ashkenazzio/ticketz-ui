import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, UserPlus, Ticket, MessageSquare, Calendar, Check, X, ChevronRight } from 'lucide-react';

type NotificationType = 'friend_request' | 'purchase_confirmed' | 'event_message' | 'event_reminder' | 'community_update';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
  avatar?: string;
  // For friend requests
  fromUser?: { id: string; name: string; avatar: string };
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'friend_request',
    title: 'Friend Request',
    message: 'Emma Rodriguez wants to be your friend',
    time: '2 min ago',
    read: false,
    fromUser: {
      id: '4',
      name: 'Emma Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    },
  },
  {
    id: '2',
    type: 'purchase_confirmed',
    title: 'Purchase Confirmed',
    message: 'Your ticket for Warehouse Project: 004 has been confirmed',
    time: '1 hour ago',
    read: false,
    actionUrl: '/wallet',
    avatar: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&q=80',
  },
  {
    id: '3',
    type: 'event_message',
    title: 'New Message',
    message: 'Bass Sector posted an update about Electric Garden',
    time: '3 hours ago',
    read: false,
    actionUrl: '/event/2',
    avatar: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=100&q=80',
  },
  {
    id: '4',
    type: 'event_reminder',
    title: 'Event Tomorrow',
    message: 'Neon Sunrise 5K starts tomorrow at 6:00 AM',
    time: '5 hours ago',
    read: true,
    actionUrl: '/event/1',
    avatar: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=100&q=80',
  },
  {
    id: '5',
    type: 'friend_request',
    title: 'Friend Request Accepted',
    message: 'Sarah Chen accepted your friend request',
    time: '1 day ago',
    read: true,
    actionUrl: '/user/1',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'friend_request':
      return <UserPlus className="w-4 h-4" />;
    case 'purchase_confirmed':
      return <Ticket className="w-4 h-4" />;
    case 'event_message':
      return <MessageSquare className="w-4 h-4" />;
    case 'event_reminder':
      return <Calendar className="w-4 h-4" />;
    case 'community_update':
      return <Bell className="w-4 h-4" />;
    default:
      return <Bell className="w-4 h-4" />;
  }
};

const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case 'friend_request':
      return 'text-blue-400 bg-blue-400/10';
    case 'purchase_confirmed':
      return 'text-lime bg-lime/10';
    case 'event_message':
      return 'text-purple-400 bg-purple-400/10';
    case 'event_reminder':
      return 'text-orange-400 bg-orange-400/10';
    case 'community_update':
      return 'text-cyan-400 bg-cyan-400/10';
    default:
      return 'text-gray-400 bg-gray-400/10';
  }
};

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleAcceptFriend = (notificationId: string) => {
    // In a real app, this would call an API
    console.log('Accept friend request from notification:', notificationId);
    markAsRead(notificationId);
  };

  const handleDeclineFriend = (notificationId: string) => {
    // In a real app, this would call an API
    console.log('Decline friend request from notification:', notificationId);
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-9 h-9 bg-surface rounded-sm flex items-center justify-center hover:bg-white/10 transition-colors"
      >
        <Bell className="w-4 h-4 text-gray-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-lime text-dark text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Panel */}
          <div className="fixed sm:absolute right-2 sm:right-0 left-2 sm:left-auto top-16 sm:top-full sm:mt-2 sm:w-96 bg-surface border border-white/10 shadow-xl z-50 max-h-[70vh] flex flex-col rounded-sm">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <h3 className="font-display text-lg uppercase tracking-tight">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-lime hover:text-limehover transition-colors uppercase tracking-wide"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-white/5 transition-colors ${
                        !notification.read ? 'bg-lime/5' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        {/* Avatar / Icon */}
                        <div className="flex-shrink-0">
                          {notification.avatar || notification.fromUser?.avatar ? (
                            <img
                              src={notification.fromUser?.avatar || notification.avatar}
                              alt=""
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm text-white font-medium">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {notification.message}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-lime rounded-full flex-shrink-0 mt-1.5" />
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              {notification.time}
                            </span>

                            {/* Action Buttons */}
                            {notification.type === 'friend_request' && notification.fromUser && !notification.read ? (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleAcceptFriend(notification.id)}
                                  className="flex items-center gap-1 px-2 py-1 bg-lime text-dark text-xs font-semibold uppercase hover:bg-limehover transition-colors"
                                >
                                  <Check className="w-3 h-3" />
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleDeclineFriend(notification.id)}
                                  className="flex items-center gap-1 px-2 py-1 bg-white/10 text-gray-300 text-xs font-semibold uppercase hover:bg-white/20 transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ) : notification.actionUrl ? (
                              <Link
                                to={notification.actionUrl}
                                onClick={() => {
                                  markAsRead(notification.id);
                                  setIsOpen(false);
                                }}
                                className="flex items-center gap-1 text-xs text-lime hover:text-limehover transition-colors"
                              >
                                View <ChevronRight className="w-3 h-3" />
                              </Link>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/5">
              <Link
                to="/settings"
                onClick={() => setIsOpen(false)}
                className="block text-center text-xs text-gray-400 hover:text-white transition-colors uppercase tracking-wide"
              >
                Notification Settings
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
