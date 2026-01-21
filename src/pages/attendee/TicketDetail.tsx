import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, Wallet, Share2, Download } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { useData } from '../../context/DataContext';
import type { BadgeStatus } from '../../components/StatusBadge';

// Helper functions for formatting
function formatTicketDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTicketTime(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export default function TicketDetail() {
  const { id } = useParams();
  const { db, currentUser } = useData();

  // Get ticket from database
  const ticketData = useMemo(() => {
    if (!id) return null;
    const ticket = db.tickets.getById(id);
    if (!ticket) return null;

    const event = db.events.getById(ticket.eventId);
    const tier = db.ticketTiers.getById(ticket.ticketTierId);
    const holder = db.users.getById(ticket.userId);
    const isPast = event ? new Date(event.endTime) < new Date() : false;

    // Determine badge status
    let status: BadgeStatus = ticket.status as BadgeStatus;
    if (ticket.status === 'valid' && isPast) {
      status = 'expired';
    }

    return {
      id: ticket.id,
      eventName: event?.title || 'Unknown Event',
      eventDate: event ? formatTicketDate(event.startTime) : '',
      eventTime: event ? formatTicketTime(event.startTime) : '',
      venue: event?.venueName || '',
      address: event?.venueAddress || '',
      ticketTier: tier?.name || 'General',
      status,
      eventImage: event?.image || event?.coverImage || '',
      eventId: ticket.eventId,
      purchaseDate: formatTicketDate(ticket.purchasedAt),
      orderId: ticket.orderId,
      holderName: holder?.name || 'Unknown',
      holderEmail: holder?.email || '',
    };
  }, [db, id]);

  const ticket = ticketData;

  if (!ticket) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl uppercase tracking-tight mb-2">Ticket Not Found</h1>
          <p className="text-gray-400 mb-4">The ticket you're looking for doesn't exist.</p>
          <Link to="/wallet" className="text-lime hover:text-limehover">
            Back to Wallet
          </Link>
        </div>
      </div>
    );
  }

  const isActive = ticket.status === 'valid';

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-dark/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/wallet"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wide">Back</span>
          </Link>
          <StatusBadge status={ticket.status} size="sm" />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* QR Code Section */}
        <div className="bg-white rounded-sm p-6 mb-6">
          <div className="aspect-square max-w-64 mx-auto flex items-center justify-center">
            {/* Large QR Code - using a placeholder pattern */}
            <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIxNDAiIHk9IjIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMjAiIHk9IjE0MCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjMwIiB5PSIzMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjE1MCIgeT0iMzAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIzMCIgeT0iMTUwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMzUiIHk9IjM1IiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTU1IiB5PSIzNSIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjM1IiB5PSIxNTUiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI3MCIgeT0iNzAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSI4MCIgeT0iODAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSI5MCIgeT0iOTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz48L3N2Zz4=')] bg-contain bg-center bg-no-repeat">
            </div>
          </div>
          <div className="text-center mt-4">
            <div className="font-mono text-2xl font-bold text-dark tracking-wider">
              {ticket.id}
            </div>
            {!isActive && (
              <div className="mt-2 text-sm text-gray-500">
                This ticket has been {ticket.status}
              </div>
            )}
          </div>
        </div>

        {/* Event Info Card */}
        <div className="bg-surface border border-white/10 rounded-sm overflow-hidden mb-6">
          {/* Event Image */}
          <div className="relative h-32 overflow-hidden">
            <img
              src={ticket.eventImage}
              alt={ticket.eventName}
              className={`w-full h-full object-cover ${!isActive && 'grayscale'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <h2 className="font-display text-xl font-semibold uppercase tracking-tight">
                {ticket.eventName}
              </h2>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-lime" />
              <span className="text-gray-300">{ticket.eventDate}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-lime" />
              <span className="text-gray-300">{ticket.eventTime}</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-4 h-4 text-lime flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-gray-300">{ticket.venue}</div>
                <div className="text-gray-500 text-xs">{ticket.address}</div>
              </div>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="border-t border-white/5 p-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Ticket Type</div>
              <div className="text-sm font-medium text-white">{ticket.ticketTier}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Order ID</div>
              <div className="text-sm font-mono text-gray-400">{ticket.orderId}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Holder</div>
              <div className="text-sm font-medium text-white">{ticket.holderName}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Purchased</div>
              <div className="text-sm text-gray-400">{ticket.purchaseDate}</div>
            </div>
          </div>

          {/* View Event Link */}
          <Link
            to={`/event/${ticket.eventId}`}
            className="block border-t border-white/5 p-4 text-center text-sm text-lime hover:bg-lime/5 transition-colors uppercase tracking-wide font-semibold"
          >
            View Event Details
          </Link>
        </div>

        {/* Action Buttons */}
        {isActive && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 bg-surface border border-white/10 p-4 text-sm uppercase tracking-wide hover:border-lime/30 transition-colors">
              <Wallet className="w-4 h-4" />
              Add to Apple Wallet
            </button>
            <button className="flex items-center justify-center gap-2 bg-surface border border-white/10 p-4 text-sm uppercase tracking-wide hover:border-lime/30 transition-colors">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        )}

        {/* Share Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-surface border border-white/10 p-4 text-sm uppercase tracking-wide hover:border-lime/30 transition-colors">
          <Share2 className="w-4 h-4" />
          Share Event
        </button>

        {/* Fine Print */}
        <div className="mt-8 p-4 bg-surface/50 border border-white/5 rounded-sm">
          <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-2">Important Information</h4>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Present this QR code at the entrance for scanning</li>
            <li>• Screenshots of this ticket may not be accepted</li>
            <li>• This ticket is non-transferable</li>
            <li>• Doors open 30 minutes before the event starts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
