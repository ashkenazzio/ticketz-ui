import { Home, Search, Ticket, User, LayoutDashboard, Calendar, Users, BarChart3, Settings, Shield, Bell, LogOut, Plus, ChevronDown, Download, X, LogIn, UserPlus, Trash2, AlertTriangle, Heart, MessageSquare, Check, ChevronRight, Send, Pin, Clock, Crown, Reply, DollarSign } from 'lucide-react';
import ShowcaseSection from '../../components/design-system/ShowcaseSection';
import ComponentRow from '../../components/design-system/ComponentRow';
import StateRow, { StateWrapper } from '../../components/design-system/StateRow';
import Footer from '../../components/Footer';
import AppFooter from '../../components/AppFooter';
import RecentActivityTable from '../../components/dashboard/RecentActivityTable';
import SalesChart from '../../components/dashboard/SalesChart';
import MessageBoard from '../../components/MessageBoard';
import '../../styles/design-system.css';

// Since navigation components have complex dependencies (auth context, router location),
// we'll create static visual representations for the design system

// Static Navbar representation
function NavbarShowcase({ loggedIn = true }: { loggedIn?: boolean }) {
  return (
    <nav className="bg-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="font-sans text-2xl font-bold tracking-tight text-white">
            ticketz<span className="text-lime">.</span>
          </div>
          <div className="flex items-center gap-8 text-sm font-medium text-gray-400">
            <span className="hover:text-white cursor-pointer">Attendees</span>
            <span className="hover:text-white cursor-pointer">Organizers</span>
            <span className="hover:text-white cursor-pointer">Events</span>
            <span className="hover:text-white cursor-pointer">Communities</span>
            <span className="hover:text-white cursor-pointer">About</span>
          </div>
        </div>

        {loggedIn ? (
          <div className="flex items-center gap-6">
            <span className="text-sm font-semibold text-lime uppercase tracking-wide">Open App</span>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </div>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <span className="text-sm font-semibold text-lime uppercase tracking-wide">Open App</span>
            <div className="w-px h-5 bg-white/10" />
            <span className="text-sm font-medium text-gray-400">Log In</span>
            <button className="bg-lime text-dark px-5 py-2.5 font-bold text-sm rounded-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

// Static AppHeader representation
function AppHeaderShowcase({ activeTab = '/app' }: { activeTab?: string }) {
  const navItems = [
    { path: '/app', label: 'Home', icon: Home },
    { path: '/wallet', label: 'Tickets', icon: Ticket },
    { path: '/app/search', label: 'Explore', icon: Search },
    { path: '/my-communities', label: 'Communities', icon: Users },
  ];

  return (
    <header className="bg-dark/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="font-sans text-xl font-bold tracking-tight text-white">
            ticketz<span className="text-lime">.</span>
          </div>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.path}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-sm ${
                  activeTab === item.path
                    ? 'text-lime bg-lime/10'
                    : 'text-gray-400'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-400 px-3 py-2">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </div>
          <div className="relative p-2">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-lime rounded-full" />
          </div>
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-lime/50">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}

// Static MobileBottomNav representation
function MobileBottomNavShowcase({ activeTab = '/app' }: { activeTab?: string }) {
  const navItems = [
    { path: '/app', icon: Home },
    { path: '/app/search', icon: Search },
    { path: '/wallet', icon: Ticket },
    { path: '/profile', icon: User },
  ];

  return (
    <div className="glass-nav rounded-full border border-white/10 px-6 py-4 flex justify-between items-center shadow-2xl max-w-xs">
      {navItems.map((item) => (
        <div
          key={item.path}
          className={`flex flex-col items-center gap-1 ${
            activeTab === item.path ? 'text-lime' : 'text-gray-400'
          }`}
        >
          <item.icon className="w-5 h-5" />
        </div>
      ))}
    </div>
  );
}

// Static Sidebar representation
function SidebarShowcase({ activeItem = '/dashboard' }: { activeItem?: string }) {
  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Events', icon: Calendar, path: '/dashboard/events' },
    { name: 'Members', icon: Users, path: '/dashboard/members' },
    { name: 'Team', icon: Shield, path: '/dashboard/team' },
    { name: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
    { name: 'Settings', icon: Settings, path: '/dashboard/community/settings' },
  ];

  return (
    <aside className="w-64 bg-surface border border-white/10 flex flex-col overflow-hidden">
      <div className="p-6 flex-1">
        <div className="font-sans text-2xl font-bold tracking-tight text-white mb-6">
          ticketz<span className="text-lime">.</span>
        </div>

        {/* Community Picker */}
        <div className="mb-6 p-3 bg-dark border border-white/10 rounded-sm">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=100&q=80"
              alt="Community"
              className="w-10 h-10 rounded-sm object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white text-sm truncate">Bass Sector</div>
              <div className="text-xs text-gray-500">2,500 members</div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeItem === item.path;
            return (
              <div
                key={item.name}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm ${
                  isActive
                    ? 'bg-lime/10 text-lime border-r-2 border-lime'
                    : 'text-gray-400'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-lime' : ''}`} />
                <span className="font-medium text-sm tracking-wide">{item.name}</span>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/5 space-y-2 bg-surface">
        <div className="flex items-center gap-3 px-4 py-3 text-lime">
          <Plus className="w-5 h-5" />
          <span className="font-medium text-sm">New Community</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 text-gray-400">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Exit Dashboard</span>
        </div>
      </div>
    </aside>
  );
}

// Static ConfirmDialog representation
function ConfirmDialogShowcase({ variant = 'danger', isLoading = false }: { variant?: 'danger' | 'warning' | 'info'; isLoading?: boolean }) {
  const config = {
    danger: {
      icon: Trash2,
      iconBg: 'bg-red-900/50',
      iconColor: 'text-red-400',
      confirmBg: 'bg-red-600',
      title: 'Delete Event?',
      message: 'This action cannot be undone. Are you sure you want to permanently delete this event?',
      confirmLabel: 'Delete',
      textColor: 'text-white',
    },
    warning: {
      icon: AlertTriangle,
      iconBg: 'bg-yellow-900/50',
      iconColor: 'text-yellow-400',
      confirmBg: 'bg-yellow-600',
      title: 'Unsaved Changes',
      message: 'You have unsaved changes. Are you sure you want to leave this page?',
      confirmLabel: 'Leave',
      textColor: 'text-white',
    },
    info: {
      icon: LogOut,
      iconBg: 'bg-lime/10',
      iconColor: 'text-lime',
      confirmBg: 'bg-lime',
      title: 'Log Out?',
      message: "You'll need to sign in again to access your account.",
      confirmLabel: 'Log Out',
      textColor: 'text-dark',
    },
  }[variant];

  const Icon = config.icon;

  return (
    <div className="bg-surface border border-white/10 w-full max-w-md">
      <button className="absolute top-4 right-4 text-gray-500">
        <X className="w-5 h-5" />
      </button>

      <div className="p-6">
        <div className={`w-12 h-12 ${config.iconBg} flex items-center justify-center mb-4`}>
          <Icon className={`w-6 h-6 ${config.iconColor}`} />
        </div>

        <h2 className="font-display text-xl font-semibold uppercase tracking-tight text-white mb-2">
          {config.title}
        </h2>

        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {config.message}
        </p>

        <div className="flex gap-3">
          <button className="flex-1 border border-white/20 text-gray-300 px-4 py-3 font-semibold uppercase text-sm tracking-wide">
            Cancel
          </button>
          <button className={`flex-1 px-4 py-3 font-semibold uppercase text-sm tracking-wide ${config.confirmBg} ${config.textColor}`}>
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              config.confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Static AuthPromptModal representation
function AuthPromptModalShowcase({ reason = 'purchase' }: { reason?: 'purchase' | 'join_community' | 'comment' | 'add_friend' | 'save_event' | 'generic' }) {
  const config = {
    purchase: { title: 'Sign in to Purchase', description: 'Create an account or sign in to buy tickets and manage your orders.', icon: Ticket },
    join_community: { title: 'Sign in to Join', description: 'Create an account or sign in to join communities and stay updated on events.', icon: Users },
    comment: { title: 'Sign in to Comment', description: 'Create an account or sign in to participate in discussions.', icon: MessageSquare },
    add_friend: { title: 'Sign in to Connect', description: "Create an account or sign in to add friends and see who's going to events.", icon: Users },
    save_event: { title: 'Sign in to Save', description: 'Create an account or sign in to save events and get reminders.', icon: Heart },
    generic: { title: 'Sign in Required', description: 'Create an account or sign in to continue.', icon: LogIn },
  }[reason];

  const Icon = config.icon;

  return (
    <div className="bg-surface border border-white/10 w-full max-w-md rounded-sm shadow-2xl">
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-lime/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon className="w-8 h-8 text-lime" />
        </div>

        <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-white mb-3">
          {config.title}
        </h2>
        <p className="text-gray-400 mb-8">{config.description}</p>

        <div className="space-y-3">
          <button className="flex items-center justify-center gap-2 w-full bg-lime text-dark font-semibold uppercase tracking-tight py-4 rounded-sm">
            <UserPlus className="w-5 h-5" />
            Create Account
          </button>
          <button className="flex items-center justify-center gap-2 w-full border border-white/20 text-white font-semibold uppercase tracking-tight py-4 rounded-sm">
            <LogIn className="w-5 h-5" />
            Sign In
          </button>
        </div>

        <button className="mt-6 text-sm text-gray-500">Continue browsing</button>
      </div>
    </div>
  );
}

// Static Notifications Dropdown showcase (always open)
function NotificationsShowcase() {
  const notifications = [
    {
      id: '1',
      type: 'friend_request' as const,
      title: 'Friend Request',
      message: 'Emma Rodriguez wants to be your friend',
      time: '2 min ago',
      read: false,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    },
    {
      id: '2',
      type: 'purchase_confirmed' as const,
      title: 'Purchase Confirmed',
      message: 'Your ticket for Warehouse Project has been confirmed',
      time: '1 hour ago',
      read: false,
      avatar: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&q=80',
    },
    {
      id: '3',
      type: 'event_message' as const,
      title: 'New Message',
      message: 'Bass Sector posted an update about Electric Garden',
      time: '3 hours ago',
      read: true,
      avatar: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=100&q=80',
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'friend_request': return <UserPlus className="w-4 h-4" />;
      case 'purchase_confirmed': return <Ticket className="w-4 h-4" />;
      case 'event_message': return <MessageSquare className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'friend_request': return 'text-blue-400 bg-blue-400/10';
      case 'purchase_confirmed': return 'text-lime bg-lime/10';
      case 'event_message': return 'text-purple-400 bg-purple-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="w-96 bg-surface border border-white/10 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <h3 className="font-display text-lg uppercase tracking-tight">Notifications</h3>
        <button className="text-xs text-lime hover:text-limehover transition-colors uppercase tracking-wide">
          Mark all read
        </button>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-white/5">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 hover:bg-white/5 transition-colors ${!notification.read ? 'bg-lime/5' : ''}`}
          >
            <div className="flex gap-3">
              <img
                src={notification.avatar}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm text-white font-medium">{notification.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-lime rounded-full flex-shrink-0 mt-1.5" />
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{notification.time}</span>
                  {notification.type === 'friend_request' && !notification.read ? (
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 px-2 py-1 bg-lime text-dark text-xs font-semibold uppercase">
                        <Check className="w-3 h-3" /> Accept
                      </button>
                      <button className="flex items-center gap-1 px-2 py-1 bg-white/10 text-gray-300 text-xs font-semibold uppercase">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button className="flex items-center gap-1 text-xs text-lime hover:text-limehover">
                      View <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-white/5">
        <button className="block w-full text-center text-xs text-gray-400 uppercase tracking-wide">
          Notification Settings
        </button>
      </div>
    </div>
  );
}

// Static SearchableList showcase
function SearchableListShowcase() {
  return (
    <div className="w-full max-w-md">
      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search members..."
          className="w-full bg-surface border border-white/10 pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime transition-colors"
          defaultValue="Sarah"
        />
      </div>

      {/* Results count */}
      <div className="text-xs text-gray-500 text-center">
        Showing 2 of 15 results
      </div>
    </div>
  );
}

// Static CommunityPicker showcase (always open)
function CommunityPickerShowcase({ isOpen = false }: { isOpen?: boolean }) {
  const communities = [
    {
      id: '1',
      name: 'Bass Sector',
      avatar: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=100&q=80',
      memberCount: 2500,
      role: 'owner' as const,
    },
    {
      id: '2',
      name: 'Warehouse Collective',
      avatar: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&q=80',
      memberCount: 850,
      role: 'admin' as const,
    },
    {
      id: '3',
      name: 'NYC Underground',
      avatar: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&q=80',
      memberCount: 1200,
      role: 'moderator' as const,
    },
  ];

  const selectedCommunity = communities[0];

  const roleConfig = {
    owner: { label: 'Owner', color: 'text-lime' },
    admin: { label: 'Admin', color: 'text-purple-400' },
    moderator: { label: 'Moderator', color: 'text-blue-400' },
  };

  return (
    <div className="relative w-64">
      {/* Trigger */}
      <button className="w-full flex items-center gap-3 p-3 bg-dark/50 border border-white/10 hover:border-lime/30 transition-colors">
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
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown (shown when isOpen) */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-white/10 shadow-xl z-10">
          {/* Communities List */}
          <div className="max-h-64 overflow-y-auto">
            {communities.map((community) => (
              <button
                key={community.id}
                className={`w-full flex items-center gap-3 p-3 hover:bg-dark/50 transition-colors ${community.id === selectedCommunity.id ? 'bg-lime/5' : ''}`}
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
                      {community.memberCount >= 1000 ? `${(community.memberCount / 1000).toFixed(1)}K` : community.memberCount}
                    </span>
                  </div>
                </div>
                {community.id === selectedCommunity.id && (
                  <Check className="w-4 h-4 text-lime flex-shrink-0" />
                )}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="border-t border-white/10">
            <div className="flex items-center gap-2 p-3 text-sm text-gray-400">
              <Plus className="w-4 h-4" />
              Create New Community
            </div>
            <div className="flex items-center gap-2 p-3 text-sm text-gray-400">
              <Settings className="w-4 h-4" />
              Community Settings
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Static DashboardNotifications showcase (always open)
function DashboardNotificationsShowcase() {
  const notifications = [
    {
      id: '1',
      type: 'ticket_sale' as const,
      title: 'New Ticket Sale',
      message: '5 tickets sold for Electric Garden Festival',
      time: '10 min ago',
      read: false,
    },
    {
      id: '2',
      type: 'new_member' as const,
      title: 'New Member',
      message: 'Sarah Chen joined Bass Sector',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'milestone' as const,
      title: 'Milestone Reached',
      message: 'Your community reached 2,500 members!',
      time: '3 hours ago',
      read: false,
    },
    {
      id: '4',
      type: 'payout' as const,
      title: 'Payout Processed',
      message: '$1,240.00 has been transferred to your account',
      time: '1 day ago',
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'ticket_sale': return <Ticket className="w-4 h-4" />;
      case 'new_member': return <Users className="w-4 h-4" />;
      case 'milestone': return <BarChart3 className="w-4 h-4" />;
      case 'payout': return <DollarSign className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'ticket_sale': return 'text-lime bg-lime/10';
      case 'new_member': return 'text-blue-400 bg-blue-400/10';
      case 'milestone': return 'text-purple-400 bg-purple-400/10';
      case 'payout': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="w-96 bg-surface border border-white/10 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <h3 className="font-display text-lg uppercase tracking-tight">Notifications</h3>
        <button className="text-xs text-lime hover:text-limehover transition-colors uppercase tracking-wide">
          Mark all read
        </button>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-white/5">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 hover:bg-white/5 transition-colors ${!notification.read ? 'bg-lime/5' : ''}`}
          >
            <div className="flex gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm text-white font-medium">{notification.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-lime rounded-full flex-shrink-0 mt-1.5" />
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{notification.time}</span>
                  <button className="flex items-center gap-1 text-xs text-lime hover:text-limehover">
                    View <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-white/5">
        <button className="block w-full text-center text-xs text-gray-400 uppercase tracking-wide">
          Notification Settings
        </button>
      </div>
    </div>
  );
}

// Static MembersModal showcase (rendered inline, not as actual modal)
function MembersModalShowcase() {
  const members = [
    { id: '1', name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', role: 'moderator' },
    { id: '2', name: 'Marcus Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', role: 'member' },
    { id: '3', name: 'Emma Rodriguez', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80', role: 'member' },
  ];

  return (
    <div className="w-full max-w-lg bg-surface border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-lime" />
          <h2 className="font-display text-xl uppercase tracking-tight">Members</h2>
          <span className="text-sm text-gray-400">(256)</span>
        </div>
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
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
            className="w-full bg-dark border border-white/10 pl-12 pr-4 py-3 text-white placeholder-gray-500"
          />
        </div>
      </div>

      {/* Members List */}
      <div className="p-4 space-y-2">
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-3 p-3 bg-dark border border-white/5 hover:border-lime/30 transition-colors">
            <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <div className="font-semibold text-white text-sm">{member.name}</div>
              {member.role !== 'member' && (
                <span className="text-xs text-lime uppercase">{member.role}</span>
              )}
            </div>
            <button className="text-xs text-gray-400 hover:text-lime px-3 py-1 border border-white/10">
              <UserPlus className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 bg-dark/30">
        <p className="text-xs text-gray-500 text-center">
          Showing 3 of 256 members
        </p>
      </div>
    </div>
  );
}

export default function OrganismsPage() {
  const authPromptReasons = ['purchase', 'join_community', 'comment', 'add_friend', 'save_event', 'generic'] as const;

  return (
    <div className="ds-page">
      <div className="ds-container">
        {/* Header */}
        <header className="mb-16">
          <div className="mb-4">
            <span className="text-xs font-mono text-lime uppercase tracking-widest">03 / Organisms</span>
          </div>
          <h1 className="font-display text-4xl uppercase tracking-tight mb-4">
            Organisms
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Complex components built from molecules and atoms. These include navigation,
            modals, footers, and content sections.
          </p>
        </header>

        {/* ============================================
            NAVBAR
            ============================================ */}
        <ShowcaseSection
          title="Navbar (Public)"
          description="Main site navigation for marketing/public pages"
        >
          <ComponentRow title="Navbar - Logged In" noPadding bgStyle="transparent">
            <NavbarShowcase loggedIn={true} />
          </ComponentRow>

          <ComponentRow title="Navbar - Logged Out" noPadding bgStyle="transparent">
            <NavbarShowcase loggedIn={false} />
          </ComponentRow>
        </ShowcaseSection>

        {/* ============================================
            APP HEADER
            ============================================ */}
        <ShowcaseSection
          title="App Header"
          description="Navigation header for authenticated app pages"
        >
          <ComponentRow title="App Header - Home Active" noPadding bgStyle="transparent">
            <AppHeaderShowcase activeTab="/app" />
          </ComponentRow>

          <ComponentRow title="App Header - Tickets Active" noPadding bgStyle="transparent">
            <AppHeaderShowcase activeTab="/wallet" />
          </ComponentRow>

          <ComponentRow title="App Header - Explore Active" noPadding bgStyle="transparent">
            <AppHeaderShowcase activeTab="/app/search" />
          </ComponentRow>

          <ComponentRow title="App Header - Communities Active" noPadding bgStyle="transparent">
            <AppHeaderShowcase activeTab="/my-communities" />
          </ComponentRow>
        </ShowcaseSection>

        {/* ============================================
            MOBILE BOTTOM NAV
            ============================================ */}
        <ShowcaseSection
          title="Mobile Bottom Nav"
          description="Mobile-only bottom navigation bar"
        >
          <ComponentRow title="Mobile Nav - Home Active">
            <MobileBottomNavShowcase activeTab="/app" />
          </ComponentRow>

          <ComponentRow title="Mobile Nav - Search Active">
            <MobileBottomNavShowcase activeTab="/app/search" />
          </ComponentRow>

          <ComponentRow title="Mobile Nav - Tickets Active">
            <MobileBottomNavShowcase activeTab="/wallet" />
          </ComponentRow>

          <ComponentRow title="Mobile Nav - Profile Active">
            <MobileBottomNavShowcase activeTab="/profile" />
          </ComponentRow>
        </ShowcaseSection>

        {/* ============================================
            SIDEBAR
            ============================================ */}
        <ShowcaseSection
          title="Dashboard Sidebar"
          description="Navigation sidebar for organizer dashboard"
        >
          <ComponentRow title="Sidebar - Overview Active" bgStyle="dark">
            <SidebarShowcase activeItem="/dashboard" />
          </ComponentRow>

          <ComponentRow title="Sidebar - Events Active" bgStyle="dark">
            <SidebarShowcase activeItem="/dashboard/events" />
          </ComponentRow>

          <ComponentRow title="Sidebar - Analytics Active" bgStyle="dark">
            <SidebarShowcase activeItem="/dashboard/analytics" />
          </ComponentRow>
        </ShowcaseSection>

        {/* ============================================
            CONFIRM DIALOG
            ============================================ */}
        <ShowcaseSection
          title="Confirm Dialog"
          description="Modal confirmation for user actions"
        >
          <ComponentRow title="Confirm Dialog - Danger Variant">
            <ConfirmDialogShowcase variant="danger" />
          </ComponentRow>

          <ComponentRow title="Confirm Dialog - Warning Variant">
            <ConfirmDialogShowcase variant="warning" />
          </ComponentRow>

          <ComponentRow title="Confirm Dialog - Info Variant">
            <ConfirmDialogShowcase variant="info" />
          </ComponentRow>

          <ComponentRow title="Confirm Dialog - Loading State">
            <ConfirmDialogShowcase variant="danger" isLoading={true} />
          </ComponentRow>
        </ShowcaseSection>

        {/* ============================================
            AUTH PROMPT MODAL
            ============================================ */}
        <ShowcaseSection
          title="Auth Prompt Modal"
          description="Authentication prompt with contextual messaging"
        >
          {authPromptReasons.map((reason) => (
            <ComponentRow key={`auth-${reason}`} title={`Auth Prompt - ${reason.replace('_', ' ')}`}>
              <AuthPromptModalShowcase reason={reason} />
            </ComponentRow>
          ))}
        </ShowcaseSection>

        {/* ============================================
            FOOTER
            ============================================ */}
        <ShowcaseSection
          title="Footer"
          description="Site footer components"
        >
          <ComponentRow title="Footer - Public (Full)" noPadding bgStyle="transparent">
            <Footer />
          </ComponentRow>

          <ComponentRow title="Footer - App (Minimal)" noPadding bgStyle="transparent">
            <AppFooter />
          </ComponentRow>
        </ShowcaseSection>

        {/* ============================================
            DASHBOARD COMPONENTS
            ============================================ */}
        <ShowcaseSection
          title="Dashboard - Sales Chart"
          description="Bar chart showing sales velocity over time"
        >
          <ComponentRow title="Sales Chart" noPadding bgStyle="transparent">
            <SalesChart />
          </ComponentRow>
        </ShowcaseSection>

        <ShowcaseSection
          title="Dashboard - Recent Activity Table"
          description="Transaction table showing recent orders"
        >
          <ComponentRow title="Recent Activity Table" noPadding bgStyle="transparent">
            <RecentActivityTable />
          </ComponentRow>
        </ShowcaseSection>

        <ShowcaseSection
          title="Dashboard - Community Picker"
          description="Dropdown for switching between managed communities"
        >
          <ComponentRow title="Community Picker - Closed State">
            <CommunityPickerShowcase isOpen={false} />
          </ComponentRow>

          <ComponentRow title="Community Picker - Open State" bgStyle="dark">
            <div className="pb-64">
              <CommunityPickerShowcase isOpen={true} />
            </div>
          </ComponentRow>
        </ShowcaseSection>

        <ShowcaseSection
          title="Dashboard - Notifications"
          description="Organizer-specific notification dropdown for dashboard"
        >
          <ComponentRow title="Dashboard Notifications - Open State">
            <DashboardNotificationsShowcase />
          </ComponentRow>
        </ShowcaseSection>

        {/* ============================================
            APP COMPONENTS
            ============================================ */}
        <ShowcaseSection
          title="Notifications Dropdown"
          description="Notification center with different notification types"
        >
          <ComponentRow title="Notifications - Open State">
            <NotificationsShowcase />
          </ComponentRow>
        </ShowcaseSection>

        <ShowcaseSection
          title="Message Board"
          description="Community discussion board with threads and replies"
        >
          <ComponentRow title="Message Board" noPadding bgStyle="transparent">
            <MessageBoard showComposeBox={false} maxMessages={3} />
          </ComponentRow>
        </ShowcaseSection>

        <ShowcaseSection
          title="Searchable List"
          description="Generic searchable/filterable list component"
        >
          <ComponentRow title="Search Input">
            <SearchableListShowcase />
          </ComponentRow>
        </ShowcaseSection>

        <ShowcaseSection
          title="Members Modal"
          description="Modal for displaying and searching community members"
        >
          <ComponentRow title="Members Modal - Open State">
            <MembersModalShowcase />
          </ComponentRow>
        </ShowcaseSection>
      </div>
    </div>
  );
}
