import { Link } from 'react-router-dom';
import { QrCode, Calendar, MapPin, ChevronRight } from 'lucide-react';
import type { BadgeStatus } from './StatusBadge';
import StatusBadge from './StatusBadge';

interface TicketCardProps {
  id: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  ticketTier: string;
  status: BadgeStatus;
  eventImage: string;
  eventId: string;
}

export default function TicketCard({
  id,
  eventName,
  eventDate,
  eventTime,
  venue,
  ticketTier,
  status,
  eventImage,
  eventId,
}: TicketCardProps) {
  const isActive = status === 'valid';

  return (
    <div
      className={`
        relative bg-surface border overflow-hidden group
        transition-all duration-300
        ${isActive
          ? 'border-white/10 hover:border-lime/30 hover:shadow-lg hover:shadow-lime/5'
          : 'border-white/5 opacity-75'
        }
      `}
    >
      {/* Top accent bar */}
      <div className={`h-1 ${isActive ? 'bg-lime' : 'bg-gray-700'}`} />

      <div className="flex">
        {/* Event Image */}
        <div className="relative w-28 h-36 flex-shrink-0 overflow-hidden">
          <img
            src={eventImage}
            alt={eventName}
            className={`w-full h-full object-cover ${!isActive && 'grayscale'}`}
          />
          {/* QR overlay on hover */}
          {isActive && (
            <div className="absolute inset-0 bg-dark/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <QrCode className="w-12 h-12 text-lime" />
            </div>
          )}
        </div>

        {/* Ticket Info */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-display text-lg font-semibold uppercase tracking-tight text-white leading-tight">
                {eventName}
              </h3>
              <StatusBadge status={status} size="sm" />
            </div>

            <div className="space-y-1 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{eventDate} • {eventTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{venue}</span>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between mt-3">
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide">Tier</div>
              <div className="text-xs font-mono text-white">{ticketTier}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-gray-500 uppercase tracking-wide">Ticket ID</div>
              <div className="text-xs font-mono text-lime">{id}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="border-t border-white/5 px-4 py-2 flex items-center justify-between bg-dark/50">
        <Link
          to={`/event/${eventId}`}
          className="text-xs text-gray-400 hover:text-white uppercase tracking-wide flex items-center gap-1 transition-colors"
        >
          View Event <ChevronRight className="w-3 h-3" />
        </Link>
        {isActive && (
          <Link
            to={`/ticket/${id}`}
            className="text-xs text-lime hover:text-limehover uppercase tracking-wide font-semibold transition-colors"
          >
            Show QR
          </Link>
        )}
      </div>
    </div>
  );
}

export type { TicketCardProps };
