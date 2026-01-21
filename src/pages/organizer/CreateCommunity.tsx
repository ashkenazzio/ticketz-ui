import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Check } from 'lucide-react';
import { CATEGORIES, getCategoryLabel } from '../../constants/categories';

export default function CreateCommunity() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    primaryCategory: '',
    secondaryCategory: '',
    location: '',
    avatar: null as string | null,
  });

  const handleSubmit = () => {
    // Mock submission
    console.log('Creating community:', formData);
    navigate('/dashboard');
  };

  const isStep1Valid = formData.name.length >= 3;
  const isStep2Valid = formData.primaryCategory !== '' && formData.location.length >= 2;

  return (
    <div className="min-h-screen bg-dark text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-white/5 bg-surface">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Cancel
          </Link>
          <span className="text-sm text-gray-500">Step {step} of 3</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-2 max-w-2xl mx-auto w-full px-4 py-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 transition-colors ${
              s <= step ? 'bg-lime' : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 pb-8">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div>
              <h1 className="font-display text-3xl font-semibold uppercase tracking-tight mb-2">
                Create Your Community
              </h1>
              <p className="text-gray-400">
                Start by giving your community a name and description.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase text-gray-500 mb-2 font-semibold tracking-wide">
                  Community Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Bass Sector, Techno Collective"
                  className="w-full bg-surface border border-white/10 p-4 text-white text-lg placeholder-gray-600 focus:outline-none focus:border-lime transition-colors"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {formData.name.length}/50 characters
                </p>
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-500 mb-2 font-semibold tracking-wide">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell people what your community is about..."
                  rows={4}
                  className="w-full bg-surface border border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Category & Location */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div>
              <h1 className="font-display text-3xl font-semibold uppercase tracking-tight mb-2">
                Category & Location
              </h1>
              <p className="text-gray-400">
                Help people discover your community.
              </p>
            </div>

            <div className="space-y-6">
              {/* Primary Category */}
              <div>
                <label className="block text-xs uppercase text-gray-500 mb-3 font-semibold tracking-wide">
                  Primary Category *
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  This is the main category people will find you under
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = formData.primaryCategory === cat.id;
                    const isSecondary = formData.secondaryCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          // If selecting as primary, clear it from secondary
                          const newState = { ...formData, primaryCategory: cat.id };
                          if (isSecondary) {
                            newState.secondaryCategory = '';
                          }
                          setFormData(newState);
                        }}
                        disabled={isSecondary}
                        className={`
                          flex items-center justify-between p-4 border transition-all text-left
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

              {/* Secondary Category (Optional) */}
              <div>
                <label className="block text-xs uppercase text-gray-500 mb-3 font-semibold tracking-wide">
                  Secondary Category <span className="text-gray-600">(Optional)</span>
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Add another category if your community spans multiple interests
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = formData.secondaryCategory === cat.id;
                    const isPrimary = formData.primaryCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          // Toggle secondary category
                          setFormData({
                            ...formData,
                            secondaryCategory: isSelected ? '' : cat.id
                          });
                        }}
                        disabled={isPrimary}
                        className={`
                          flex items-center justify-between p-4 border transition-all text-left
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

              <div>
                <label className="block text-xs uppercase text-gray-500 mb-2 font-semibold tracking-wide">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, State/Country"
                  className="w-full bg-surface border border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors"
                />
                <p className="text-xs text-gray-500 mt-2">
                  This helps local people find your events
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Avatar */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div>
              <h1 className="font-display text-3xl font-semibold uppercase tracking-tight mb-2">
                Add a Profile Image
              </h1>
              <p className="text-gray-400">
                Give your community a visual identity. You can skip this for now.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 bg-surface border-2 border-dashed border-white/20 flex items-center justify-center group cursor-pointer hover:border-lime/50 transition-colors">
                {formData.avatar ? (
                  <>
                    <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Camera className="w-8 h-8 text-lime" />
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <Camera className="w-10 h-10 text-gray-600 mx-auto mb-2" />
                    <span className="text-sm text-gray-500">Upload Image</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Recommended: 400x400 pixels, JPG or PNG
              </p>

              {/* Demo: Quick select placeholder avatars */}
              <div className="mt-6">
                <p className="text-xs text-gray-500 mb-3 text-center">Or choose a placeholder:</p>
                <div className="flex gap-3">
                  {[
                    'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=200&q=80',
                    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&q=80',
                    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&q=80',
                  ].map((url) => (
                    <button
                      key={url}
                      onClick={() => setFormData({ ...formData, avatar: url })}
                      className={`w-16 h-16 rounded-sm overflow-hidden border-2 transition-all ${
                        formData.avatar === url ? 'border-lime' : 'border-transparent hover:border-white/30'
                      }`}
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-surface border border-white/5 p-6 mt-8">
              <h3 className="text-xs uppercase text-gray-500 mb-4 font-semibold tracking-wide">
                Summary
              </h3>
              <div className="flex items-center gap-4">
                {formData.avatar && (
                  <img src={formData.avatar} alt="" className="w-16 h-16 rounded-sm object-cover" />
                )}
                <div>
                  <h4 className="font-display text-xl font-semibold uppercase tracking-tight">
                    {formData.name}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {getCategoryLabel(formData.primaryCategory)}
                    {formData.secondaryCategory && ` • ${getCategoryLabel(formData.secondaryCategory)}`}
                    {' • '}{formData.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-gray-400 hover:text-white transition-colors uppercase text-sm tracking-wide"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
              className="bg-lime text-dark px-8 py-3 font-semibold uppercase tracking-wide hover:bg-limehover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-lime text-dark px-8 py-3 font-semibold uppercase tracking-wide hover:bg-limehover transition-colors"
            >
              Create Community
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
