import { useState } from 'react';
import { Camera, Save, Trash2, AlertTriangle, Check } from 'lucide-react';
import { CATEGORIES, getCategoryLabel } from '../../constants/categories';

interface CommunityData {
  name: string;
  description: string;
  location: string;
  avatar: string;
  coverImage: string;
  primaryCategory: string;
  secondaryCategory: string;
  tags: string[];
  website: string;
  instagram: string;
  twitter: string;
}

const initialData: CommunityData = {
  name: 'Bass Sector',
  description: 'Bass Sector is LA\'s premier underground bass music collective. Since 2019, we\'ve been bringing the deepest dubstep, drum & bass, and experimental bass sounds to warehouses and clubs across Southern California.',
  location: 'Los Angeles, CA',
  avatar: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400&q=80',
  coverImage: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=1200&q=80',
  primaryCategory: 'music',
  secondaryCategory: 'social',
  tags: ['Dubstep', 'Drum & Bass', 'Bass Music', 'Warehouse', 'Underground'],
  website: 'https://basssector.com',
  instagram: '@basssector',
  twitter: '@basssectorla',
};

const availableTags = [
  'Techno', 'House', 'Dubstep', 'Drum & Bass', 'Bass Music',
  'Trance', 'Ambient', 'Experimental', 'Hip Hop', 'R&B',
  'Warehouse', 'Underground', 'Festival', 'Club', 'Rooftop',
];

export default function CommunitySettings() {
  const [data, setData] = useState<CommunityData>(initialData);
  const [activeTab, setActiveTab] = useState<'general' | 'branding' | 'social' | 'danger'>('general');
  const [newTag, setNewTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const addTag = (tag: string) => {
    if (tag && !data.tags.includes(tag) && data.tags.length < 5) {
      setData({ ...data, tags: [...data.tags, tag] });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setData({ ...data, tags: data.tags.filter(tag => tag !== tagToRemove) });
  };

  const tabs = [
    { key: 'general' as const, label: 'General' },
    { key: 'branding' as const, label: 'Branding' },
    { key: 'social' as const, label: 'Social Links' },
    { key: 'danger' as const, label: 'Danger Zone' },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold uppercase tracking-tight">
          Community Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your community profile and settings
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              px-4 py-2.5 text-sm font-semibold uppercase tracking-wide whitespace-nowrap transition-all
              ${activeTab === tab.key
                ? tab.key === 'danger' ? 'bg-red-500/20 text-red-400' : 'bg-lime text-dark'
                : 'bg-surface text-gray-400 hover:text-white'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* General Tab */}
      {activeTab === 'general' && (
        <div className="bg-surface border border-white/5 p-6 space-y-6">
          <div>
            <label className="block text-xs uppercase text-gray-500 mb-2 font-semibold tracking-wide">
              Community Name
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full bg-dark border border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-gray-500 mb-2 font-semibold tracking-wide">
              Description
            </label>
            <textarea
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              rows={4}
              className="w-full bg-dark border border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-gray-500 mb-2 font-semibold tracking-wide">
              Location
            </label>
            <input
              type="text"
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              placeholder="City, Country"
              className="w-full bg-dark border border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors"
            />
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Category */}
            <div>
              <label className="block text-xs uppercase text-gray-500 mb-2 font-semibold tracking-wide">
                Primary Category *
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Main category for filtering and discovery
              </p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = data.primaryCategory === cat.id;
                  const isSecondary = data.secondaryCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        const newState = { ...data, primaryCategory: cat.id };
                        if (isSecondary) {
                          newState.secondaryCategory = '';
                        }
                        setData(newState);
                      }}
                      disabled={isSecondary}
                      className={`
                        flex items-center justify-between p-3 border transition-all text-left text-sm
                        ${isSelected
                          ? 'border-lime bg-lime/10 text-lime'
                          : isSecondary
                            ? 'border-white/5 text-gray-600 cursor-not-allowed'
                            : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                        }
                      `}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {cat.label}
                      </span>
                      {isSelected && <Check className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Secondary Category */}
            <div>
              <label className="block text-xs uppercase text-gray-500 mb-2 font-semibold tracking-wide">
                Secondary Category <span className="text-gray-600">(Optional)</span>
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Additional category for broader discovery
              </p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = data.secondaryCategory === cat.id;
                  const isPrimary = data.primaryCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setData({
                          ...data,
                          secondaryCategory: isSelected ? '' : cat.id
                        });
                      }}
                      disabled={isPrimary}
                      className={`
                        flex items-center justify-between p-3 border transition-all text-left text-sm
                        ${isSelected
                          ? 'border-purple-400 bg-purple-400/10 text-purple-400'
                          : isPrimary
                            ? 'border-white/5 text-gray-600 cursor-not-allowed'
                            : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                        }
                      `}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {cat.label}
                      </span>
                      {isSelected && <Check className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase text-gray-500 mb-2 font-semibold tracking-wide">
              Tags (max 5)
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-lime/10 text-lime text-sm"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:text-white transition-colors"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            {data.tags.length < 5 && (
              <div className="flex gap-2">
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 bg-dark border border-white/10 p-3 text-white focus:outline-none focus:border-lime transition-colors"
                >
                  <option value="">Select a tag...</option>
                  {availableTags
                    .filter(tag => !data.tags.includes(tag))
                    .map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))
                  }
                </select>
                <button
                  onClick={() => addTag(newTag)}
                  disabled={!newTag}
                  className="px-4 py-3 bg-lime text-dark font-semibold uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-limehover transition-colors"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Branding Tab */}
      {activeTab === 'branding' && (
        <div className="space-y-6">
          {/* Cover Image */}
          <div className="bg-surface border border-white/5 p-6">
            <label className="block text-xs uppercase text-gray-500 mb-4 font-semibold tracking-wide">
              Cover Image
            </label>
            <div className="relative h-48 bg-dark rounded-sm overflow-hidden group">
              <img
                src={data.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <button className="flex items-center gap-2 bg-lime text-dark px-4 py-2 font-semibold text-sm uppercase">
                  <Camera className="w-4 h-4" />
                  Change Cover
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Recommended size: 1920x480 pixels</p>
          </div>

          {/* Avatar */}
          <div className="bg-surface border border-white/5 p-6">
            <label className="block text-xs uppercase text-gray-500 mb-4 font-semibold tracking-wide">
              Community Avatar
            </label>
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 bg-dark rounded-sm overflow-hidden group">
                <img
                  src={data.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera className="w-6 h-6 text-lime" />
                </div>
              </div>
              <div>
                <button className="flex items-center gap-2 bg-surface border border-white/20 text-white px-4 py-2 font-semibold text-sm uppercase hover:border-lime transition-colors">
                  <Camera className="w-4 h-4" />
                  Upload New
                </button>
                <p className="text-xs text-gray-500 mt-2">Recommended: 400x400 pixels</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Links Tab */}
      {activeTab === 'social' && (
        <div className="bg-surface border border-white/5 p-6 space-y-6">
          <div>
            <label className="block text-xs uppercase text-gray-500 mb-2 font-semibold tracking-wide">
              Website
            </label>
            <input
              type="url"
              value={data.website}
              onChange={(e) => setData({ ...data, website: e.target.value })}
              placeholder="https://yourcommunity.com"
              className="w-full bg-dark border border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-gray-500 mb-2 font-semibold tracking-wide">
              Instagram
            </label>
            <input
              type="text"
              value={data.instagram}
              onChange={(e) => setData({ ...data, instagram: e.target.value })}
              placeholder="@username"
              className="w-full bg-dark border border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-gray-500 mb-2 font-semibold tracking-wide">
              Twitter / X
            </label>
            <input
              type="text"
              value={data.twitter}
              onChange={(e) => setData({ ...data, twitter: e.target.value })}
              placeholder="@username"
              className="w-full bg-dark border border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors"
            />
          </div>
        </div>
      )}

      {/* Danger Zone Tab */}
      {activeTab === 'danger' && (
        <div className="bg-red-500/5 border-2 border-red-500/30 p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-display text-lg uppercase tracking-tight text-red-400 mb-2">
                Delete Community
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Once you delete a community, there is no going back. This will permanently delete
                the community, all events, member data, and analytics. This action cannot be undone.
              </p>
              <button className="flex items-center gap-2 bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 font-semibold text-sm uppercase hover:bg-red-500/30 transition-colors">
                <Trash2 className="w-4 h-4" />
                Delete Community
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      {activeTab !== 'danger' && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-lime text-dark px-6 py-3 font-semibold uppercase tracking-wide hover:bg-limehover transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
    </>
  );
}
