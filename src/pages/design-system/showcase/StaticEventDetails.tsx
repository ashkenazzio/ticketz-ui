/**
 * Static version of EventDetails for design system showcase.
 * Uses hardcoded sample data instead of useParams().
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Share2, ArrowLeft, Users, Bookmark, CalendarRange, Images } from 'lucide-react';
import MessageBoard from '../../../components/MessageBoard';
import { useData } from '../../../context/DataContext';
import { getCategoryById } from '../../../constants/categories';

// Use first event from database
const SAMPLE_EVENT_ID = 'evt-001';

// Helper to format dates
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export default function StaticEventDetails() {
  const [isSaved, setIsSaved] = useState(false);
  const { db, currentUser } = useData();

  // Get event data from database using hardcoded ID
  const event = db.events.getById(SAMPLE_EVENT_ID);
  const community = event ? db.communities.getById(event.communityId) : null;
  const ticketTiers = event ? db.ticketTiers.getByEvent(event.id) : [];
  const isMultiDay = event ? db.events.isMultiDay(event) : false;

  // Get attendees
  const attendeeRecords = event ? db.attendees.getByEvent(event.id) : [];
  const attendees = attendeeRecords.map(a => db.users.getById(a.userId)).filter((u): u is NonNullable<typeof u> => u !== null);
  const totalCount = attendees.length;

  // Check for friends going
  const friendsGoing = currentUser
    ? attendees.filter(attendee => {
        const connection = db.connections.getStatus(currentUser.id, attendee.id);
        return connection?.status === 'accepted';
      })
    : [];

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold uppercase tracking-tight mb-4">Event Not Found</h1>
          <p className="text-gray-400 mb-6">Sample event data not available.</p>
        </div>
      </div>
    );
  }

  const category = getCategoryById(event.category);
  const lowestPrice = ticketTiers.length > 0
    ? Math.min(...ticketTiers.map(t => t.price)) / 100
    : 0;

  const previewAttendees = attendees.slice(0, 4);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left: Poster / Immersive Visual */}
      <div className="lg:w-1/2 h-[50vh] lg:h-[calc(100vh-80px)] relative lg:sticky lg:top-20 z-0">
        <img
          src={event.coverImage || event.image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2070&auto=format&fit=crop'}
          className="w-full h-full object-cover"
          alt={event.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-90 lg:opacity-40"></div>

        <button
          className="absolute top-6 left-6 z-20 w-10 h-10 bg-dark/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-dark transition-colors border border-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Right: Scrollable Details */}
      <div className="lg:w-1/2 relative z-10 bg-dark">
        <div className="p-6 md:p-12 pb-32">

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            {category && (
              <span className="bg-lime/10 text-lime px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider border border-lime/20">
                {category.label}
              </span>
            )}
            {isMultiDay && (
              <span className="bg-purple-400/10 text-purple-400 px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider border border-purple-400/20">
                Multi-Day
              </span>
            )}
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 transition-colors ${
                  isSaved
                    ? 'text-lime bg-lime/10 border border-lime/20'
                    : 'text-gray-400 hover:text-white'
                }`}
                title={isSaved ? 'Remove from saved' : 'Save event'}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-lime' : ''}`} />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-semibold uppercase tracking-tighter leading-[0.9] mb-6">
            {event.title.split(' ').map((word, i) => (
              <span key={i}>{word}{i < event.title.split(' ').length - 1 && <br />}</span>
            ))}
          </h1>

          {/* Hosted By Community */}
          {community && (
            <div
              className="flex items-center gap-4 mb-8 p-4 bg-surface border border-white/10 rounded-sm hover:border-lime/30 transition-colors group"
            >
              <div className="w-14 h-14 rounded-sm overflow-hidden border border-white/10">
                <img
                  src={community.avatar || 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=200&auto=format&fit=crop'}
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Hosted by</div>
                <div className="font-display text-xl font-semibold uppercase tracking-tight text-white group-hover:text-lime transition-colors">
                  {community.name}
                </div>
              </div>
              <div className="text-gray-500 group-hover:text-lime transition-colors">
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </div>
            </div>
          )}

          {/* Key Info Grid - Start/End Time Display */}
          <div className="mb-12 border-y border-white/10 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Time Block */}
              <div className="bg-surface/50 border border-white/5 p-4 rounded-sm">
                <div className="flex items-center gap-2 mb-3">
                  {isMultiDay ? (
                    <CalendarRange className="w-5 h-5 text-lime" />
                  ) : (
                    <Calendar className="w-5 h-5 text-lime" />
                  )}
                  <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                    {isMultiDay ? 'Start' : 'Date & Time'}
                  </span>
                </div>
                <div className="text-lg font-semibold text-white">
                  {formatDate(event.startTime)}
                </div>
                <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4" />
                  {formatTime(event.startTime)}
                </div>
              </div>

              {/* End Time Block - Only for multi-day or if end time is different day */}
              {isMultiDay ? (
                <div className="bg-surface/50 border border-white/5 p-4 rounded-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarRange className="w-5 h-5 text-purple-400" />
                    <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">End</span>
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {formatDate(event.endTime)}
                  </div>
                  <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4" />
                    {formatTime(event.endTime)}
                  </div>
                </div>
              ) : (
                <div className="bg-surface/50 border border-white/5 p-4 rounded-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-lime" />
                    <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Ends At</span>
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {formatTime(event.endTime)}
                  </div>
                </div>
              )}
            </div>

            {/* Venue - Full Width */}
            <div className="mt-4 bg-surface/50 border border-white/5 p-4 rounded-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-lime/10 rounded-sm flex-shrink-0">
                  <MapPin className="w-5 h-5 text-lime" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">
                    {event.venueName || 'Venue TBA'}
                  </div>
                  {event.venueAddress && (
                    <div className="text-sm text-gray-400 mt-1">{event.venueAddress}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <div className="mb-12">
              <h3 className="font-display text-2xl font-semibold uppercase tracking-tight mb-4">About</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                {event.description}
              </p>
            </div>
          )}

          {/* Event Gallery - Show if gallery images exist */}
          {event.galleryImages && event.galleryImages.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl font-semibold uppercase tracking-tight flex items-center gap-3">
                  <Images className="w-6 h-6 text-lime" />
                  Gallery
                </h3>
                <span className="text-sm text-gray-500">{event.galleryImages.length} photos</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {event.galleryImages.slice(0, 6).map((img, idx) => (
                  <button
                    key={idx}
                    className="group relative aspect-square overflow-hidden rounded-sm bg-surface focus:outline-none focus:ring-2 focus:ring-lime"
                  >
                    <img src={img} alt={`Event photo ${idx + 1}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Who's Going Section - Compact Preview */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-2xl font-semibold uppercase tracking-tight">
                Who's Going
              </h3>
              <button
                className="text-sm text-lime hover:text-limehover transition-colors"
              >
                View All
              </button>
            </div>

            {/* Friends Going Highlight */}
            {friendsGoing.length > 0 && (
              <div className="bg-lime/5 border border-lime/20 p-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {friendsGoing.slice(0, 3).map((friend) => (
                      <img
                        key={friend.id}
                        src={friend.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'}
                        alt={friend.name}
                        className="w-8 h-8 rounded-full border-2 border-dark object-cover"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-lime">
                    {friendsGoing.length} friend{friendsGoing.length > 1 ? 's' : ''} going
                  </span>
                </div>
              </div>
            )}

            {/* Attendees Preview */}
            {attendees.length > 0 ? (
              <button
                className="w-full bg-surface border border-white/5 hover:border-lime/20 p-4 transition-colors flex items-center gap-4"
              >
                <div className="flex -space-x-3">
                  {previewAttendees.map((attendee) => (
                    <img
                      key={attendee.id}
                      src={attendee.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'}
                      alt={attendee.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-surface"
                    />
                  ))}
                  {totalCount > 4 && (
                    <div className="w-10 h-10 rounded-full bg-dark border-2 border-surface flex items-center justify-center text-xs text-gray-400 font-semibold">
                      +{totalCount - 4}
                    </div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm text-white">
                    {previewAttendees.slice(0, 2).map(a => a.name).join(', ')}
                    {totalCount > 2 && ` and ${totalCount - 2} others`}
                  </div>
                  <div className="text-xs text-gray-500">Click to view all attendees</div>
                </div>
                <Users className="w-5 h-5 text-gray-500" />
              </button>
            ) : (
              <div className="bg-surface border border-white/5 p-6 text-center">
                <Users className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Be the first to get tickets!</p>
              </div>
            )}
          </div>

          {/* Event Updates / Message Board */}
          <div className="mb-12">
            <MessageBoard
              title="Event Updates"
              eventId={event.id}
              maxMessages={3}
              showComposeBox={true}
            />
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="sticky bottom-0 w-full bg-surface border-t border-white/10 p-4 sm:p-6 flex items-center justify-between z-50">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
              {ticketTiers.length > 1 ? 'Starting from' : 'Price'}
            </div>
            <div className="text-3xl font-display font-semibold text-white">
              ${lowestPrice.toFixed(2)}
            </div>
          </div>
          <button
            className="bg-lime text-dark font-display font-semibold uppercase tracking-tight px-6 sm:px-10 py-3 sm:py-4 rounded-sm hover:bg-limehover transition-colors text-sm sm:text-base"
          >
            Buy Tickets
          </button>
        </div>
      </div>
    </div>
  );
}
