import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, Save, Eye, Calendar, MapPin, Clock, Users,
  DollarSign, Image, Plus, Trash2, GripVertical
} from 'lucide-react';

// Mock event data
const mockEvent = {
  id: 'evt-001',
  title: 'Electric Garden',
  description: 'An immersive electronic music experience featuring world-class DJs, stunning visual installations, and a vibrant community atmosphere. Join us for a night of unforgettable beats.',
  date: '2026-02-15',
  startTime: '22:00',
  endTime: '04:00',
  venue: 'Warehouse 23',
  address: '123 Industrial Ave, Brooklyn, NY',
  capacity: 500,
  coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
  status: 'published' as const,
  tiers: [
    { id: 't1', name: 'Early Bird', price: 35, quantity: 100, sold: 89 },
    { id: 't2', name: 'General Admission', price: 45, quantity: 300, sold: 156 },
    { id: 't3', name: 'VIP', price: 85, quantity: 100, sold: 42 },
  ],
  lineup: [
    { id: 'a1', name: 'DJ Nova', role: 'Headliner', time: '01:00 - 03:00' },
    { id: 'a2', name: 'Pulse', role: 'Support', time: '23:00 - 01:00' },
    { id: 'a3', name: 'Local Opener', role: 'Opening', time: '22:00 - 23:00' },
  ],
};

type TabKey = 'details' | 'tickets' | 'lineup' | 'settings';

export default function EditEvent() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<TabKey>('details');
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: mockEvent.title,
    description: mockEvent.description,
    date: mockEvent.date,
    startTime: mockEvent.startTime,
    endTime: mockEvent.endTime,
    venue: mockEvent.venue,
    address: mockEvent.address,
    capacity: mockEvent.capacity,
  });

  const [tiers, setTiers] = useState(mockEvent.tiers);
  const [lineup, setLineup] = useState(mockEvent.lineup);

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'details', label: 'Event Details' },
    { key: 'tickets', label: 'Ticket Tiers' },
    { key: 'lineup', label: 'Lineup' },
    { key: 'settings', label: 'Settings' },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
  };

  const addTier = () => {
    setTiers([
      ...tiers,
      {
        id: `t${Date.now()}`,
        name: 'New Tier',
        price: 0,
        quantity: 100,
        sold: 0,
      },
    ]);
  };

  const removeTier = (tierId: string) => {
    setTiers(tiers.filter((t) => t.id !== tierId));
  };

  const addLineupArtist = () => {
    setLineup([
      ...lineup,
      {
        id: `a${Date.now()}`,
        name: 'Artist Name',
        role: 'Performer',
        time: '00:00 - 01:00',
      },
    ]);
  };

  const removeLineupArtist = (artistId: string) => {
    setLineup(lineup.filter((a) => a.id !== artistId));
  };

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/dashboard/events"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold uppercase tracking-tight">
              Edit Event
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Event ID: {id || mockEvent.id}
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to={`/event/${id || mockEvent.id}`}
              className="flex items-center gap-2 border border-white/20 text-gray-300 px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:border-white/40 hover:text-white transition-colors"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Link>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-lime text-dark px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-limehover transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              px-4 py-2 text-sm font-semibold uppercase tracking-wide whitespace-nowrap transition-all
              ${activeTab === tab.key
                ? 'bg-lime text-dark'
                : 'bg-surface text-gray-400 hover:text-white'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Details Tab */}
        {activeTab === 'details' && (
          <>
            {/* Cover Image */}
            <div className="bg-surface border border-white/5 p-6">
              <h3 className="font-display text-lg uppercase tracking-tight mb-4 flex items-center gap-2">
                <Image className="w-5 h-5 text-lime" />
                Cover Image
              </h3>
              <div className="relative aspect-[21/9] bg-dark overflow-hidden group">
                <img
                  src={mockEvent.coverImage}
                  alt="Event cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-lime text-dark px-4 py-2 text-sm font-semibold uppercase tracking-wide">
                    Change Image
                  </button>
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-surface border border-white/5 p-6">
              <h3 className="font-display text-lg uppercase tracking-tight mb-4">
                Basic Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-wide">
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-dark border border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-wide">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full bg-dark border border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="bg-surface border border-white/5 p-6">
              <h3 className="font-display text-lg uppercase tracking-tight mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-lime" />
                Date & Time
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-wide">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-dark border border-white/10 p-4 text-white focus:outline-none focus:border-lime transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-wide">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full bg-dark border border-white/10 p-4 text-white focus:outline-none focus:border-lime transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-wide">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full bg-dark border border-white/10 p-4 text-white focus:outline-none focus:border-lime transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-surface border border-white/5 p-6">
              <h3 className="font-display text-lg uppercase tracking-tight mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-lime" />
                Location
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-wide">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full bg-dark border border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-wide">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-dark border border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Capacity */}
            <div className="bg-surface border border-white/5 p-6">
              <h3 className="font-display text-lg uppercase tracking-tight mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-lime" />
                Capacity
              </h3>
              <div className="max-w-xs">
                <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-wide">
                  Maximum Attendees
                </label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                  className="w-full bg-dark border border-white/10 p-4 text-white focus:outline-none focus:border-lime transition-colors"
                />
              </div>
            </div>
          </>
        )}

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <div className="bg-surface border border-white/5 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg uppercase tracking-tight flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-lime" />
                Ticket Tiers
              </h3>
              <button
                onClick={addTier}
                className="flex items-center gap-2 bg-lime text-dark px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-limehover transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Tier
              </button>
            </div>

            <div className="space-y-4">
              {tiers.map((tier, index) => (
                <div
                  key={tier.id}
                  className="bg-dark border border-white/10 p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-gray-600 cursor-move">
                      <GripVertical className="w-5 h-5" />
                    </div>

                    <div className="flex-1 grid sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1 font-bold tracking-wide">
                          Tier Name
                        </label>
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) => {
                            const updated = [...tiers];
                            updated[index].name = e.target.value;
                            setTiers(updated);
                          }}
                          className="w-full bg-surface border border-white/10 p-3 text-white text-sm focus:outline-none focus:border-lime transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1 font-bold tracking-wide">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          value={tier.price}
                          onChange={(e) => {
                            const updated = [...tiers];
                            updated[index].price = parseInt(e.target.value) || 0;
                            setTiers(updated);
                          }}
                          className="w-full bg-surface border border-white/10 p-3 text-white text-sm focus:outline-none focus:border-lime transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1 font-bold tracking-wide">
                          Quantity
                        </label>
                        <input
                          type="number"
                          value={tier.quantity}
                          onChange={(e) => {
                            const updated = [...tiers];
                            updated[index].quantity = parseInt(e.target.value) || 0;
                            setTiers(updated);
                          }}
                          className="w-full bg-surface border border-white/10 p-3 text-white text-sm focus:outline-none focus:border-lime transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1 font-bold tracking-wide">
                          Sold
                        </label>
                        <div className="p-3 text-gray-400 text-sm">
                          {tier.sold} / {tier.quantity}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeTier(tier.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {tiers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No ticket tiers. Add one to start selling tickets.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Lineup Tab */}
        {activeTab === 'lineup' && (
          <div className="bg-surface border border-white/5 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg uppercase tracking-tight flex items-center gap-2">
                <Clock className="w-5 h-5 text-lime" />
                Event Lineup
              </h3>
              <button
                onClick={addLineupArtist}
                className="flex items-center gap-2 bg-lime text-dark px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-limehover transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Artist
              </button>
            </div>

            <div className="space-y-4">
              {lineup.map((artist, index) => (
                <div
                  key={artist.id}
                  className="bg-dark border border-white/10 p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-gray-600 cursor-move">
                      <GripVertical className="w-5 h-5" />
                    </div>

                    <div className="flex-1 grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1 font-bold tracking-wide">
                          Artist Name
                        </label>
                        <input
                          type="text"
                          value={artist.name}
                          onChange={(e) => {
                            const updated = [...lineup];
                            updated[index].name = e.target.value;
                            setLineup(updated);
                          }}
                          className="w-full bg-surface border border-white/10 p-3 text-white text-sm focus:outline-none focus:border-lime transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1 font-bold tracking-wide">
                          Role
                        </label>
                        <select
                          value={artist.role}
                          onChange={(e) => {
                            const updated = [...lineup];
                            updated[index].role = e.target.value;
                            setLineup(updated);
                          }}
                          className="w-full bg-surface border border-white/10 p-3 text-white text-sm focus:outline-none focus:border-lime transition-colors"
                        >
                          <option value="Headliner">Headliner</option>
                          <option value="Support">Support</option>
                          <option value="Opening">Opening</option>
                          <option value="Performer">Performer</option>
                          <option value="Special Guest">Special Guest</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1 font-bold tracking-wide">
                          Time Slot
                        </label>
                        <input
                          type="text"
                          value={artist.time}
                          onChange={(e) => {
                            const updated = [...lineup];
                            updated[index].time = e.target.value;
                            setLineup(updated);
                          }}
                          placeholder="e.g., 22:00 - 23:00"
                          className="w-full bg-surface border border-white/10 p-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-lime transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => removeLineupArtist(artist.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {lineup.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No lineup added yet. Add artists performing at your event.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Event Status */}
            <div className="bg-surface border border-white/5 p-6">
              <h3 className="font-display text-lg uppercase tracking-tight mb-4">
                Event Status
              </h3>
              <div className="flex flex-wrap gap-3">
                {['draft', 'published', 'cancelled'].map((status) => (
                  <button
                    key={status}
                    className={`
                      px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all
                      ${mockEvent.status === status
                        ? 'bg-lime text-dark'
                        : 'bg-dark border border-white/10 text-gray-400 hover:text-white'
                      }
                    `}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Visibility */}
            <div className="bg-surface border border-white/5 p-6">
              <h3 className="font-display text-lg uppercase tracking-tight mb-4">
                Visibility
              </h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between py-3 border-b border-white/5">
                  <div>
                    <div className="font-semibold text-white">Public Event</div>
                    <div className="text-sm text-gray-400">Anyone can discover and view this event</div>
                  </div>
                  <div className="w-12 h-6 rounded-full bg-lime relative">
                    <span className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full" />
                  </div>
                </label>
                <label className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-semibold text-white">Community Members Only</div>
                    <div className="text-sm text-gray-400">Only community members can purchase tickets</div>
                  </div>
                  <div className="w-12 h-6 rounded-full bg-gray-700 relative">
                    <span className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </label>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-950/20 border-2 border-red-900/50 p-6">
              <h3 className="font-display text-lg uppercase tracking-tight mb-4 text-red-400">
                Danger Zone
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Cancelling an event will notify all ticket holders and initiate refunds.
              </p>
              <button className="flex items-center gap-2 bg-red-900/50 text-red-400 px-4 py-3 font-semibold text-sm uppercase tracking-wide hover:bg-red-900 transition-colors">
                <Trash2 className="w-4 h-4" />
                Cancel Event
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
