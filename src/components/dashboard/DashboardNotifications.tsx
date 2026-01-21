import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Ticket, Users, TrendingUp, Calendar, ChevronRight, DollarSign } from 'lucide-react';

type NotificationType = 'ticket_sale' | 'new_member' | 'event_reminder' | 'milestone' | 'payout';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'ticket_sale',
    title: 'New Ticket Sale',
    message: '5 tickets sold for Electric Garden Festival',
    time: '10 min ago',
    read: false,
    actionUrl: '/dashboard/events',
  },
  {
    id: '2',
    type: 'new_member',
    title: 'New Member',
    message: 'Sarah Chen joined Bass Sector',
    time: '1 hour ago',
    read: false,
    actionUrl: '/dashboard/members',
  },
  {
    id: '3',
    type: 'milestone',
    title: 'Milestone Reached',
    message: 'Your community reached 2,500 members!',
    time: '3 hours ago',
    read: false,
    actionUrl: '/dashboard/analytics',
  },
  {
    id: '4',
    type: 'event_reminder',
    title: 'Event Tomorrow',
    message: 'Warehouse Project: 004 starts in 24 hours',
    time: '5 hours ago',
    read: true,
    actionUrl: '/dashboard/events',
  },
  {
    id: '5',
    type: 'payout',
    title: 'Payout Processed',
    message: '$1,240.00 has been transferred to your account',
    time: '1 day ago',
    read: true,
    actionUrl: '/dashboard/analytics',
  },
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'ticket_sale':
      return <Ticket className="w-4 h-4" />;
    case 'new_member':
      return <Users className="w-4 h-4" />;
    case 'event_reminder':
      return <Calendar className="w-4 h-4" />;
    case 'milestone':
      return <TrendingUp className="w-4 h-4" />;
    case 'payout':
      return <DollarSign className="w-4 h-4" />;
    default:
      return <Bell className="w-4 h-4" />;
  }
};

const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case 'ticket_sale':
      return 'text-lime bg-lime/10';
    case 'new_member':
      return 'text-blue-400 bg-blue-400/10';
    case 'event_reminder':
      return 'text-orange-400 bg-orange-400/10';
    case 'milestone':
      return 'text-purple-400 bg-purple-400/10';
    case 'payout':
      return 'text-green-400 bg-green-400/10';
    default:
      return 'text-gray-400 bg-gray-400/10';
  }
};

export default function DashboardNotifications() {
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

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-gray-400 hover:text-white transition-colors p-2"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-lime text-dark text-xs font-bold rounded-full flex items-center justify-center">
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
                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                          {getNotificationIcon(notification.type)}
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

                            {notification.actionUrl && (
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
                            )}
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
                to="/dashboard/community/settings"
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
