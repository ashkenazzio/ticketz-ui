import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User, Bell, Shield, Link2, Trash2,
  Camera, Instagram, Facebook, Globe, ChevronRight
} from 'lucide-react';
import AppLayout from '../layouts/AppLayout';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'connected' | 'privacy'>('profile');

  // Mock user data
  const [formData, setFormData] = useState({
    name: 'Alex Rivera',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Music lover. Event enthusiast. Always chasing the next great experience.',
  });

  const [notifications, setNotifications] = useState({
    emailEvents: true,
    emailCommunity: true,
    emailMarketing: false,
    pushEvents: true,
    pushReminders: true,
  });

  const tabs = [
    { key: 'profile' as const, label: 'Profile', icon: User },
    { key: 'notifications' as const, label: 'Notifications', icon: Bell },
    { key: 'connected' as const, label: 'Connected', icon: Link2 },
    { key: 'privacy' as const, label: 'Privacy', icon: Shield },
  ];

  return (
    <AppLayout title="Settings">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Subtitle */}
        <p className="text-gray-400 text-sm mb-6">
          Manage your account preferences
        </p>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
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
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              {/* Avatar Section */}
              <div className="bg-surface border border-white/5 p-6">
                <h3 className="font-display text-lg uppercase tracking-tight mb-4">Profile Photo</h3>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
                      alt="Profile"
                      className="w-24 h-24 object-cover border-2 border-white/10"
                    />
                    <button className="absolute -bottom-2 -right-2 bg-lime text-dark p-2 hover:bg-limehover transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>JPG, PNG or GIF. Max 5MB.</p>
                    <button className="text-lime hover:text-limehover mt-2 font-semibold uppercase text-xs tracking-wide">
                      Remove Photo
                    </button>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="bg-surface border border-white/5 p-6">
                <h3 className="font-display text-lg uppercase tracking-tight mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-dark border border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-dark border border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-wide">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-dark border border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-wide">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={3}
                      className="w-full bg-dark border border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors resize-none"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button className="bg-lime text-dark px-6 py-3 font-semibold uppercase text-sm tracking-wide hover:bg-limehover transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="bg-surface border border-white/5 p-6">
                <h3 className="font-display text-lg uppercase tracking-tight mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  {[
                    { key: 'emailEvents', label: 'Event Updates', desc: 'Get notified about events from communities you follow' },
                    { key: 'emailCommunity', label: 'Community Updates', desc: 'News and updates from your communities' },
                    { key: 'emailMarketing', label: 'Marketing', desc: 'Promotional emails and special offers' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <div>
                        <div className="font-semibold text-white">{item.label}</div>
                        <div className="text-sm text-gray-400">{item.desc}</div>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                        className={`
                          w-12 h-6 rounded-full transition-colors relative
                          ${notifications[item.key as keyof typeof notifications] ? 'bg-lime' : 'bg-gray-700'}
                        `}
                      >
                        <span
                          className={`
                            absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                            ${notifications[item.key as keyof typeof notifications] ? 'left-7' : 'left-1'}
                          `}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface border border-white/5 p-6">
                <h3 className="font-display text-lg uppercase tracking-tight mb-4">Push Notifications</h3>
                <div className="space-y-4">
                  {[
                    { key: 'pushEvents', label: 'Event Reminders', desc: 'Reminders before your events' },
                    { key: 'pushReminders', label: 'Ticket Updates', desc: 'Updates about your purchased tickets' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <div>
                        <div className="font-semibold text-white">{item.label}</div>
                        <div className="text-sm text-gray-400">{item.desc}</div>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                        className={`
                          w-12 h-6 rounded-full transition-colors relative
                          ${notifications[item.key as keyof typeof notifications] ? 'bg-lime' : 'bg-gray-700'}
                        `}
                      >
                        <span
                          className={`
                            absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                            ${notifications[item.key as keyof typeof notifications] ? 'left-7' : 'left-1'}
                          `}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Connected Accounts Tab */}
          {activeTab === 'connected' && (
            <div className="space-y-6">
              <div className="bg-surface border border-white/5 p-6">
                <h3 className="font-display text-lg uppercase tracking-tight mb-4">Social Accounts</h3>
                <div className="space-y-4">
                  {[
                    { icon: Instagram, name: 'Instagram', connected: true, handle: '@alex_rivera' },
                    { icon: Facebook, name: 'Facebook', connected: false, handle: null },
                    { icon: Globe, name: 'Website', connected: true, handle: 'alexrivera.com' },
                  ].map((account) => (
                    <div key={account.name} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 flex items-center justify-center ${account.connected ? 'bg-lime/10 text-lime' : 'bg-gray-800 text-gray-500'}`}>
                          <account.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{account.name}</div>
                          {account.connected ? (
                            <div className="text-sm text-lime">{account.handle}</div>
                          ) : (
                            <div className="text-sm text-gray-500">Not connected</div>
                          )}
                        </div>
                      </div>
                      <button
                        className={`
                          px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors
                          ${account.connected
                            ? 'border border-white/20 text-gray-400 hover:border-red-500/50 hover:text-red-400'
                            : 'bg-lime text-dark hover:bg-limehover'
                          }
                        `}
                      >
                        {account.connected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="bg-surface border border-white/5 p-6">
                <h3 className="font-display text-lg uppercase tracking-tight mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  <Link to="#" className="flex items-center justify-between py-3 border-b border-white/5 hover:bg-dark/50 -mx-6 px-6 transition-colors">
                    <div>
                      <div className="font-semibold text-white">Download My Data</div>
                      <div className="text-sm text-gray-400">Get a copy of your data in JSON format</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </Link>
                  <Link to="#" className="flex items-center justify-between py-3 border-b border-white/5 hover:bg-dark/50 -mx-6 px-6 transition-colors">
                    <div>
                      <div className="font-semibold text-white">Privacy Policy</div>
                      <div className="text-sm text-gray-400">View our privacy policy</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </Link>
                  <Link to="#" className="flex items-center justify-between py-3 border-b border-white/5 hover:bg-dark/50 -mx-6 px-6 transition-colors">
                    <div>
                      <div className="font-semibold text-white">Terms of Service</div>
                      <div className="text-sm text-gray-400">View our terms of service</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </Link>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-950/20 border-2 border-red-900/50 p-6">
                <h3 className="font-display text-lg uppercase tracking-tight mb-4 text-red-400">Danger Zone</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button className="flex items-center gap-2 bg-red-900/50 text-red-400 px-4 py-3 font-semibold text-sm uppercase tracking-wide hover:bg-red-900 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </button>
              </div>
            </div>
          )}
      </div>
    </AppLayout>
  );
}
