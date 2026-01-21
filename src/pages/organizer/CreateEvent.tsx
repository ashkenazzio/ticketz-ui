import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Ticket, Check, Clock, Eye, Share2, ExternalLink, Loader2, CheckCircle2, AlertCircle, Camera, CalendarRange, ImagePlus, X, Images } from 'lucide-react';

// Placeholder cover images for demo
const coverImageOptions = [
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&q=80',
];

// Placeholder gallery images for demo
const galleryImageOptions = [
    'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&q=80',
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=80',
    'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
];

const MAX_GALLERY_IMAGES = 3;

export default function CreateEvent() {
    const [step, setStep] = useState(1);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isPublished, setIsPublished] = useState(false);

    // Simple state placeholders
    const [title, setTitle] = useState('');
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [venue, setVenue] = useState('');
    const [address, setAddress] = useState('');
    const [isMultiDay, setIsMultiDay] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [tickets, setTickets] = useState([{ name: 'General Admission', price: '25', qty: '100' }]);

    const handlePublish = () => {
        setIsPublishing(true);
        // Simulate publishing delay
        setTimeout(() => {
            setIsPublishing(false);
            setIsPublished(true);
        }, 2000);
    };

    const totalTickets = tickets.reduce((sum, t) => sum + (parseInt(t.qty) || 0), 0);
    const lowestPrice = Math.min(...tickets.map(t => parseFloat(t.price) || 0).filter(p => p > 0));

    const addTicketTier = () => {
        setTickets([...tickets, { name: '', price: '', qty: '' }]);
    };

  return (
    <>
        <div className="max-w-4xl mx-auto">
            
            {/* Progress Tracker */}
            <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6 overflow-x-auto">
                {['Details', 'Venue', 'Tickets', 'Review', 'Publish'].map((s, idx) => {
                    const stepNum = idx + 1;
                    const active = step >= stepNum || isPublished;
                    const current = step === stepNum;
                    return (
                        <div key={s} className="flex items-center gap-2 flex-shrink-0">
                            <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-sm font-semibold transition-colors ${active ? 'bg-lime text-dark' : 'bg-surface border border-white/10 text-gray-500'}`}>
                                {active ? <Check className="w-4 h-4" /> : stepNum}
                            </div>
                            <span className={`text-sm font-medium uppercase tracking-wide hidden sm:block ${current ? 'text-white' : 'text-gray-500'}`}>{s}</span>
                            {idx < 4 && <div className="w-6 md:w-12 h-[1px] bg-white/10 mx-1 md:mx-2"></div>}
                        </div>
                    )
                })}
            </div>

            {/* Step Content */}
            <div className="bg-surface border border-white/5 p-8 md:p-12 rounded-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {step === 1 && (
                    <div className="space-y-8">
                        <h2 className="font-display text-3xl font-semibold uppercase tracking-tight text-white mb-6">Event Details</h2>

                        {/* Cover Image Upload */}
                        <div>
                            <label className="block text-xs uppercase text-gray-400 mb-2 font-medium tracking-wide">Cover Image</label>
                            <div className="relative h-48 bg-dark border-2 border-dashed border-white/20 rounded-sm overflow-hidden group cursor-pointer hover:border-lime/50 transition-colors">
                                {coverImage ? (
                                    <>
                                        <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <button
                                                onClick={() => setCoverImage(null)}
                                                className="flex items-center gap-2 bg-lime text-dark px-4 py-2 font-semibold text-sm uppercase"
                                            >
                                                <Camera className="w-4 h-4" />
                                                Change Cover
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                                        <Camera className="w-10 h-10 text-gray-600 mb-3" />
                                        <span className="text-sm text-gray-500">Click to upload cover image</span>
                                        <span className="text-xs text-gray-600 mt-1">Recommended: 1920x480 pixels</span>
                                    </div>
                                )}
                            </div>
                            {!coverImage && (
                                <div className="mt-3">
                                    <p className="text-xs text-gray-500 mb-2">Or choose a placeholder:</p>
                                    <div className="flex gap-2">
                                        {coverImageOptions.map((url) => (
                                            <button
                                                key={url}
                                                onClick={() => setCoverImage(url)}
                                                className="w-20 h-12 rounded-sm overflow-hidden border-2 border-transparent hover:border-lime/50 transition-colors"
                                            >
                                                <img src={url} alt="" className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs uppercase text-gray-400 mb-2 font-medium tracking-wide">Event Name</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-dark border border-white/10 rounded-sm p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors text-lg"
                                placeholder="e.g. Neon Sunrise 5K"
                            />
                        </div>

                        {/* Multi-day toggle */}
                        <div>
                            <button
                                type="button"
                                onClick={() => setIsMultiDay(!isMultiDay)}
                                className={`flex items-center gap-3 p-4 border transition-all w-full text-left ${
                                    isMultiDay
                                        ? 'border-lime bg-lime/10 text-lime'
                                        : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                                }`}
                            >
                                <CalendarRange className="w-5 h-5" />
                                <div className="flex-1">
                                    <span className="font-medium">Multi-day Event</span>
                                    <p className="text-xs text-gray-500 mt-0.5">Enable for festivals, conferences, or events spanning multiple days</p>
                                </div>
                                <div className={`w-10 h-6 rounded-full transition-colors ${isMultiDay ? 'bg-lime' : 'bg-white/10'}`}>
                                    <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${isMultiDay ? 'translate-x-5' : 'translate-x-1'}`} />
                                </div>
                            </button>
                        </div>

                        {/* Date/Time Fields */}
                        {isMultiDay ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase text-gray-400 mb-2 font-medium tracking-wide">Start Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                            <input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className="w-full bg-dark border border-white/10 rounded-sm p-4 pl-12 text-white focus:outline-none focus:border-lime transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase text-gray-400 mb-2 font-medium tracking-wide">Start Time</label>
                                        <input
                                            type="time"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            className="w-full bg-dark border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-lime transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase text-gray-400 mb-2 font-medium tracking-wide">End Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                            <input
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                min={startDate}
                                                className="w-full bg-dark border border-white/10 rounded-sm p-4 pl-12 text-white focus:outline-none focus:border-lime transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase text-gray-400 mb-2 font-medium tracking-wide">End Time</label>
                                        <input
                                            type="time"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            className="w-full bg-dark border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-lime transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs uppercase text-gray-400 mb-2 font-medium tracking-wide">Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full bg-dark border border-white/10 rounded-sm p-4 pl-12 text-white focus:outline-none focus:border-lime transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase text-gray-400 mb-2 font-medium tracking-wide">Time</label>
                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="w-full bg-dark border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-lime transition-colors"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs uppercase text-gray-400 mb-2 font-medium tracking-wide">Description</label>
                            <textarea
                                rows={5}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-dark border border-white/10 rounded-sm p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors resize-none"
                                placeholder="Tell people what to expect..."
                            ></textarea>
                        </div>

                        {/* Gallery Images Upload */}
                        <div>
                            <label className="block text-xs uppercase text-gray-400 mb-2 font-medium tracking-wide">
                                Gallery Images <span className="text-gray-500">({galleryImages.length}/{MAX_GALLERY_IMAGES})</span>
                            </label>
                            <p className="text-xs text-gray-500 mb-3">
                                Add up to {MAX_GALLERY_IMAGES} images to showcase your event. These will appear in a gallery on your event page.
                            </p>

                            {/* Selected Gallery Images */}
                            {galleryImages.length > 0 && (
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    {galleryImages.map((img, idx) => (
                                        <div key={idx} className="relative aspect-[4/3] group">
                                            <img
                                                src={img}
                                                alt={`Gallery ${idx + 1}`}
                                                className="w-full h-full object-cover rounded-sm"
                                            />
                                            <button
                                                onClick={() => setGalleryImages(galleryImages.filter((_, i) => i !== idx))}
                                                className="absolute top-2 right-2 w-6 h-6 bg-dark/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                            <div className="absolute bottom-2 left-2 bg-dark/80 text-white text-xs px-2 py-0.5 rounded-sm">
                                                {idx + 1}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Add Gallery Image Button / Placeholder */}
                            {galleryImages.length < MAX_GALLERY_IMAGES && (
                                <div className="relative h-32 bg-dark border-2 border-dashed border-white/20 rounded-sm overflow-hidden group cursor-pointer hover:border-lime/50 transition-colors">
                                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                                        <ImagePlus className="w-8 h-8 text-gray-600 mb-2" />
                                        <span className="text-sm text-gray-500">Click to add gallery image</span>
                                        <span className="text-xs text-gray-600 mt-1">{MAX_GALLERY_IMAGES - galleryImages.length} slots remaining</span>
                                    </div>
                                </div>
                            )}

                            {/* Demo Placeholder Images */}
                            {galleryImages.length < MAX_GALLERY_IMAGES && (
                                <div className="mt-3">
                                    <p className="text-xs text-gray-500 mb-2">Or choose from placeholders:</p>
                                    <div className="flex gap-2 flex-wrap">
                                        {galleryImageOptions
                                            .filter(url => !galleryImages.includes(url))
                                            .slice(0, 5)
                                            .map((url) => (
                                                <button
                                                    key={url}
                                                    onClick={() => {
                                                        if (galleryImages.length < MAX_GALLERY_IMAGES) {
                                                            setGalleryImages([...galleryImages, url]);
                                                        }
                                                    }}
                                                    className="w-16 h-12 rounded-sm overflow-hidden border-2 border-transparent hover:border-lime/50 transition-colors"
                                                >
                                                    <img src={url} alt="" className="w-full h-full object-cover" />
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            )}

                            {galleryImages.length === MAX_GALLERY_IMAGES && (
                                <p className="text-xs text-lime mt-2 flex items-center gap-1">
                                    <Check className="w-3 h-3" />
                                    Maximum {MAX_GALLERY_IMAGES} gallery images added
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-8">
                        <h2 className="font-display text-3xl font-semibold uppercase tracking-tight text-white mb-6">Venue Location</h2>
                        <div>
                            <label className="block text-xs uppercase text-gray-400 mb-2 font-medium tracking-wide">Venue Name</label>
                            <input 
                                type="text" 
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                                className="w-full bg-dark border border-white/10 rounded-sm p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors text-lg" 
                                placeholder="e.g. The Warehouse Project" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-gray-400 mb-2 font-medium tracking-wide">Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full bg-dark border border-white/10 rounded-sm p-4 pl-12 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors"
                                    placeholder="123 Industrial Ave..."
                                />
                            </div>
                        </div>
                        {/* Map Placeholder */}
                        <div className="h-64 bg-dark border border-white/10 rounded-sm flex items-center justify-center text-gray-500">
                            Map Preview Area
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-display text-3xl font-semibold uppercase tracking-tight text-white">Tickets</h2>
                            <button onClick={addTicketTier} className="text-sm text-lime hover:text-white transition-colors uppercase font-medium tracking-wide flex items-center gap-1">
                                + Add Tier
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            {tickets.map((tier, idx) => (
                                <div key={idx} className="bg-dark border border-white/10 p-6 rounded-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                                    <div className="md:col-span-6">
                                        <label className="block text-xs uppercase text-gray-400 mb-2">Ticket Name</label>
                                        <input
                                            type="text"
                                            value={tier.name}
                                            onChange={(e) => {
                                                const newTickets = [...tickets];
                                                newTickets[idx].name = e.target.value;
                                                setTickets(newTickets);
                                            }}
                                            className="w-full bg-surface border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-lime transition-colors"
                                            placeholder="e.g. Early Bird"
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="block text-xs uppercase text-gray-400 mb-2">Price ($)</label>
                                        <input
                                            type="number"
                                            value={tier.price}
                                            onChange={(e) => {
                                                const newTickets = [...tickets];
                                                newTickets[idx].price = e.target.value;
                                                setTickets(newTickets);
                                            }}
                                            className="w-full bg-surface border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-lime transition-colors"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="block text-xs uppercase text-gray-400 mb-2">Quantity</label>
                                        <input
                                            type="number"
                                            value={tier.qty}
                                            onChange={(e) => {
                                                const newTickets = [...tickets];
                                                newTickets[idx].qty = e.target.value;
                                                setTickets(newTickets);
                                            }}
                                            className="w-full bg-surface border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-lime transition-colors"
                                            placeholder="100"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-display text-3xl font-semibold uppercase tracking-tight text-white">Review Event</h2>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Final Step</span>
                        </div>

                        {/* Event Preview Card */}
                        <div className="bg-dark border border-white/10 rounded-sm overflow-hidden">
                            {/* Preview Header */}
                            <div className="h-32 relative">
                                {coverImage ? (
                                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-lime/20 to-purple-500/20 flex items-center justify-center">
                                        <Eye className="w-8 h-8 text-white/30" />
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="font-display text-2xl font-semibold text-white mb-2">
                                    {title || 'Event Name'}
                                </h3>
                                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                                    {description || 'No description provided'}
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                    {isMultiDay ? (
                                        <span className="flex items-center gap-2">
                                            <CalendarRange className="w-4 h-4 text-lime" />
                                            {startDate || 'Start TBD'} → {endDate || 'End TBD'}
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-lime" />
                                            {startDate || 'Date TBD'}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-lime" />
                                        {startTime || 'Time TBD'}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-lime" />
                                        {venue || 'Venue TBD'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Summary Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-dark border border-white/10 p-4 rounded-sm">
                                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Ticket Tiers</div>
                                <div className="text-2xl font-semibold text-white">{tickets.length}</div>
                            </div>
                            <div className="bg-dark border border-white/10 p-4 rounded-sm">
                                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Capacity</div>
                                <div className="text-2xl font-semibold text-white">{totalTickets}</div>
                            </div>
                            <div className="bg-dark border border-white/10 p-4 rounded-sm">
                                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Starting Price</div>
                                <div className="text-2xl font-semibold text-lime">${lowestPrice > 0 ? lowestPrice.toFixed(2) : '0.00'}</div>
                            </div>
                        </div>

                        {/* Ticket Tiers Summary */}
                        <div>
                            <h4 className="text-sm uppercase text-gray-400 tracking-wide mb-3">Ticket Tiers</h4>
                            <div className="space-y-2">
                                {tickets.map((tier, idx) => (
                                    <div key={idx} className="flex items-center justify-between bg-dark border border-white/10 p-3 rounded-sm">
                                        <span className="text-white font-medium">{tier.name || 'Unnamed Tier'}</span>
                                        <div className="flex items-center gap-4 text-sm">
                                            <span className="text-gray-400">{tier.qty || 0} tickets</span>
                                            <span className="text-lime font-semibold">${tier.price || '0'}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Gallery Images Preview */}
                        {galleryImages.length > 0 && (
                            <div>
                                <h4 className="text-sm uppercase text-gray-400 tracking-wide mb-3 flex items-center gap-2">
                                    <Images className="w-4 h-4" />
                                    Gallery Images ({galleryImages.length}/{MAX_GALLERY_IMAGES})
                                </h4>
                                <div className="grid grid-cols-3 gap-3">
                                    {galleryImages.map((img, idx) => (
                                        <div key={idx} className="aspect-[4/3] overflow-hidden rounded-sm">
                                            <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Checklist */}
                        <div className="bg-lime/5 border border-lime/20 p-4 rounded-sm">
                            <h4 className="text-sm uppercase text-lime tracking-wide mb-3 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                Before Publishing
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-center gap-2">
                                    <Check className={`w-4 h-4 ${title ? 'text-lime' : 'text-gray-500'}`} />
                                    Event name is set
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className={`w-4 h-4 ${coverImage ? 'text-lime' : 'text-gray-500'}`} />
                                    Cover image uploaded
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className={`w-4 h-4 ${startDate && startTime ? 'text-lime' : 'text-gray-500'}`} />
                                    {isMultiDay ? 'Start date and time configured' : 'Date and time configured'}
                                </li>
                                {isMultiDay && (
                                    <li className="flex items-center gap-2">
                                        <Check className={`w-4 h-4 ${endDate && endTime ? 'text-lime' : 'text-gray-500'}`} />
                                        End date and time configured
                                    </li>
                                )}
                                <li className="flex items-center gap-2">
                                    <Check className={`w-4 h-4 ${venue ? 'text-lime' : 'text-gray-500'}`} />
                                    Venue location added
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className={`w-4 h-4 ${tickets.some(t => t.price && t.qty) ? 'text-lime' : 'text-gray-500'}`} />
                                    At least one ticket tier with pricing
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Step 5: Published Success */}
                {step === 5 && (
                    <div className="text-center py-12">
                        {isPublishing ? (
                            <>
                                <div className="w-20 h-20 bg-lime/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Loader2 className="w-10 h-10 text-lime animate-spin" />
                                </div>
                                <h2 className="font-display text-3xl font-semibold uppercase tracking-tight text-white mb-2">Publishing Event...</h2>
                                <p className="text-gray-400">Setting up your event page and tickets</p>
                            </>
                        ) : isPublished ? (
                            <>
                                <div className="w-20 h-20 bg-lime/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-lime" />
                                </div>
                                <h2 className="font-display text-3xl font-semibold uppercase tracking-tight text-white mb-2">Event Published!</h2>
                                <p className="text-gray-400 max-w-md mx-auto mb-8">
                                    <span className="text-white font-medium">{title}</span> is now live and ready for ticket sales.
                                </p>

                                {/* Quick Actions */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                                    <Link
                                        to="/event/new-event"
                                        className="flex items-center justify-center gap-2 bg-lime text-dark font-semibold uppercase tracking-tight px-6 py-3 rounded-sm hover:bg-limehover transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        View Event Page
                                    </Link>
                                    <button className="flex items-center justify-center gap-2 bg-surface border border-white/10 text-white font-semibold uppercase tracking-tight px-6 py-3 rounded-sm hover:border-lime/30 transition-colors">
                                        <Share2 className="w-4 h-4" />
                                        Share Event
                                    </button>
                                </div>

                                {/* Next Steps */}
                                <div className="mt-12 text-left max-w-md mx-auto">
                                    <h4 className="text-sm uppercase text-gray-400 tracking-wide mb-4">Next Steps</h4>
                                    <div className="space-y-3">
                                        <Link to="/dashboard" className="flex items-center gap-3 p-3 bg-surface border border-white/5 hover:border-lime/20 transition-colors rounded-sm">
                                            <div className="w-8 h-8 bg-lime/10 rounded-sm flex items-center justify-center">
                                                <Ticket className="w-4 h-4 text-lime" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-white">Go to Dashboard</div>
                                                <div className="text-xs text-gray-500">Monitor sales and manage your event</div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-gray-500" />
                                        </Link>
                                        <Link to="/dashboard/events/new/edit" className="flex items-center gap-3 p-3 bg-surface border border-white/5 hover:border-lime/20 transition-colors rounded-sm">
                                            <div className="w-8 h-8 bg-purple-400/10 rounded-sm flex items-center justify-center">
                                                <Calendar className="w-4 h-4 text-purple-400" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-white">Add More Details</div>
                                                <div className="text-xs text-gray-500">Upload images, add lineup, etc.</div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-gray-500" />
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                )}

                {/* Footer Actions */}
                {step < 5 && (
                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/5">
                        {step > 1 ? (
                            <button onClick={() => setStep(step - 1)} className="text-gray-400 hover:text-white transition-colors uppercase font-medium tracking-wide text-sm">
                                Back
                            </button>
                        ) : <div></div>}

                        {step < 4 ? (
                            <button
                                onClick={() => setStep(step + 1)}
                                className="bg-lime text-dark font-display font-semibold uppercase tracking-tight px-8 py-3 rounded-sm hover:bg-limehover transition-colors flex items-center gap-2"
                            >
                                Next Step <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setStep(5);
                                    handlePublish();
                                }}
                                className="bg-lime text-dark font-display font-semibold uppercase tracking-tight px-8 py-3 rounded-sm hover:bg-limehover transition-colors flex items-center gap-2"
                            >
                                Publish Event <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}

            </div>
        </div>
    </>
  );
}
