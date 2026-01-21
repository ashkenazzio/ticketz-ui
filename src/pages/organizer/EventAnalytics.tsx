import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, DollarSign, Ticket, Users, TrendingUp,
  ArrowUp, ArrowDown, Clock, Calendar, MapPin, BarChart3, CalendarRange, Download
} from 'lucide-react';
import SalesChart from '../../components/dashboard/SalesChart';

// Mock event data - in real app would fetch based on id
const mockEvents: Record<string, {
  id: string;
  title: string;
  isMultiDay: boolean;
  startDate: string;
  startTime: string;
  endDate?: string;
  endTime: string;
  venue: string;
  coverImage: string;
  ticketsSold: number;
  totalCapacity: number;
  revenue: number;
  checkIns: number;
}> = {
  'evt-001': {
    id: 'evt-001',
    title: 'Electric Garden',
    isMultiDay: true,
    startDate: 'Nov 12, 2026',
    startTime: '12:00 PM',
    endDate: 'Nov 14, 2026',
    endTime: '11:00 PM',
    venue: 'The Conservatory',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    ticketsSold: 342,
    totalCapacity: 500,
    revenue: 15390,
    checkIns: 287,
  },
  'evt-002': {
    id: 'evt-002',
    title: 'Neon Sunrise 5K',
    isMultiDay: false,
    startDate: 'Mar 8, 2026',
    startTime: '06:00 AM',
    endTime: '10:00 AM',
    venue: 'City Park',
    coverImage: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80',
    ticketsSold: 189,
    totalCapacity: 300,
    revenue: 8505,
    checkIns: 175,
  },
};

const ticketTierBreakdown = [
  { name: 'VIP', sold: 45, total: 50, price: 150, revenue: 6750 },
  { name: 'Early Bird', sold: 100, total: 100, price: 35, revenue: 3500 },
  { name: 'General Admission', sold: 197, total: 350, price: 45, revenue: 8865 },
];

const hourlyCheckIns = [
  { hour: '12PM', count: 45 },
  { hour: '1PM', count: 78 },
  { hour: '2PM', count: 65 },
  { hour: '3PM', count: 52 },
  { hour: '4PM', count: 38 },
  { hour: '5PM', count: 9 },
];

const recentActivity = [
  { type: 'sale', text: '2 VIP tickets purchased', time: '5 min ago' },
  { type: 'checkin', text: 'Sarah Chen checked in', time: '12 min ago' },
  { type: 'sale', text: '1 General Admission ticket sold', time: '25 min ago' },
  { type: 'checkin', text: 'Marcus Johnson checked in', time: '30 min ago' },
  { type: 'refund', text: 'Refund processed for Order #1234', time: '1 hour ago' },
];

export default function EventAnalytics() {
  const { id } = useParams();
  const event = mockEvents[id || 'evt-001'] || mockEvents['evt-001'];

  const soldPercentage = Math.round((event.ticketsSold / event.totalCapacity) * 100);
  const checkInRate = Math.round((event.checkIns / event.ticketsSold) * 100);

  return (
    <>
      {/* Back Link & Actions */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/dashboard/events"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>
        <button className="flex items-center justify-center gap-2 bg-lime text-dark px-5 py-2.5 font-semibold uppercase text-sm tracking-wide hover:bg-limehover transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Event Header */}
      <div className="bg-surface border border-white/5 overflow-hidden mb-8">
        <div className="h-32 relative">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/80 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <h1 className="font-display text-2xl md:text-3xl font-semibold uppercase tracking-tight text-white">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-300">
              {event.isMultiDay ? (
                <span className="flex items-center gap-2">
                  <CalendarRange className="w-4 h-4 text-lime" />
                  {event.startDate} → {event.endDate}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-lime" />
                  {event.startDate}
                </span>
              )}
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-lime" />
                {event.startTime} - {event.endTime}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-lime" />
                {event.venue}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface border border-white/5 p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-lime/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-lime" />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-lime">
              <ArrowUp className="w-3 h-3" />
              +12.5%
            </div>
          </div>
          <div className="text-2xl font-display font-semibold text-white mb-1">
            ${event.revenue.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Total Revenue</div>
        </div>

        <div className="bg-surface border border-white/5 p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-lime/10 flex items-center justify-center">
              <Ticket className="w-5 h-5 text-lime" />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-lime">
              <ArrowUp className="w-3 h-3" />
              +8%
            </div>
          </div>
          <div className="text-2xl font-display font-semibold text-white mb-1">
            {event.ticketsSold} / {event.totalCapacity}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Tickets Sold ({soldPercentage}%)</div>
        </div>

        <div className="bg-surface border border-white/5 p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-lime/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-lime" />
            </div>
          </div>
          <div className="text-2xl font-display font-semibold text-white mb-1">{event.checkIns}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Check-ins ({checkInRate}%)</div>
        </div>

        <div className="bg-surface border border-white/5 p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-lime/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-lime" />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-red-400">
              <ArrowDown className="w-3 h-3" />
              -3%
            </div>
          </div>
          <div className="text-2xl font-display font-semibold text-white mb-1">
            ${Math.round(event.revenue / event.ticketsSold)}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Avg. Order Value</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Over Time */}
        <div className="lg:col-span-2 bg-surface border border-white/5 p-6">
          <h3 className="font-display text-lg uppercase tracking-tight mb-4">Sales Over Time</h3>
          <SalesChart />
        </div>

        {/* Ticket Tier Breakdown */}
        <div className="bg-surface border border-white/5 p-6">
          <h3 className="font-display text-lg uppercase tracking-tight mb-4">Ticket Tiers</h3>
          <div className="space-y-4">
            {ticketTierBreakdown.map((tier) => {
              const percentage = Math.round((tier.sold / tier.total) * 100);
              const isSoldOut = tier.sold >= tier.total;
              return (
                <div key={tier.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{tier.name}</span>
                    <span className="text-xs text-gray-400">
                      {tier.sold}/{tier.total}
                      {isSoldOut && <span className="text-red-400 ml-1">(Sold Out)</span>}
                    </span>
                  </div>
                  <div className="h-2 bg-dark rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${isSoldOut ? 'bg-red-400' : 'bg-lime'}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>${tier.price} each</span>
                    <span className="text-lime">${tier.revenue.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Check-in Timeline (only shown for past/ongoing events) */}
        <div className="bg-surface border border-white/5 p-6">
          <h3 className="font-display text-lg uppercase tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-lime" />
            Check-in Activity
          </h3>
          <div className="flex items-end gap-2 h-32">
            {hourlyCheckIns.map((item) => {
              const maxCount = Math.max(...hourlyCheckIns.map(h => h.count));
              const height = (item.count / maxCount) * 100;
              return (
                <div key={item.hour} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-lime/20 hover:bg-lime/40 transition-colors rounded-t-sm"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">{item.hour}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between">
            <div>
              <div className="text-xs text-gray-500 uppercase">Peak Hour</div>
              <div className="text-lg font-semibold text-white">1:00 PM</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 uppercase">Total Check-ins</div>
              <div className="text-lg font-semibold text-lime">{event.checkIns}</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-surface border border-white/5 p-6">
          <h3 className="font-display text-lg uppercase tracking-tight mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                  activity.type === 'sale' ? 'bg-lime' :
                  activity.type === 'checkin' ? 'bg-blue-400' : 'bg-red-400'
                }`} />
                <div className="flex-1">
                  <div className="text-sm text-white">{activity.text}</div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
