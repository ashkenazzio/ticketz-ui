import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Receipt, Filter } from 'lucide-react';
import OrderCard from '../../components/OrderCard';
import type { BadgeStatus } from '../../components/StatusBadge';

type FilterTab = 'all' | 'approved' | 'pending' | 'cancelled';

interface OrderData {
  id: string;
  eventName: string;
  eventImage: string;
  orderDate: string;
  ticketCount: number;
  total: string;
  status: BadgeStatus;
}

// Mock data
const mockOrders: OrderData[] = [
  {
    id: 'ORD-2847',
    eventName: 'Electric Garden',
    eventImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
    orderDate: 'Nov 1, 2026',
    ticketCount: 2,
    total: '$90.00',
    status: 'approved',
  },
  {
    id: 'ORD-2846',
    eventName: 'Bass Sector Opening',
    eventImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
    orderDate: 'Oct 28, 2026',
    ticketCount: 1,
    total: '$75.00',
    status: 'approved',
  },
  {
    id: 'ORD-2845',
    eventName: 'Warehouse Rave',
    eventImage: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400&q=80',
    orderDate: 'Oct 25, 2026',
    ticketCount: 3,
    total: '$135.00',
    status: 'pending',
  },
  {
    id: 'ORD-2840',
    eventName: 'Summer Festival 2026',
    eventImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80',
    orderDate: 'Aug 15, 2026',
    ticketCount: 2,
    total: '$180.00',
    status: 'cancelled',
  },
  {
    id: 'ORD-2835',
    eventName: 'Techno Bunker Session',
    eventImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
    orderDate: 'Oct 10, 2026',
    ticketCount: 1,
    total: '$45.00',
    status: 'approved',
  },
];

const filterTabs: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All Orders' },
  { key: 'approved', label: 'Completed' },
  { key: 'pending', label: 'Pending' },
  { key: 'cancelled', label: 'Cancelled' },
];

export default function Orders() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const filteredOrders = mockOrders.filter((order) => {
    if (activeFilter === 'all') return true;
    return order.status === activeFilter;
  });

  const orderCounts = {
    all: mockOrders.length,
    approved: mockOrders.filter((o) => o.status === 'approved').length,
    pending: mockOrders.filter((o) => o.status === 'pending').length,
    cancelled: mockOrders.filter((o) => o.status === 'cancelled').length,
  };

  const totalSpent = mockOrders
    .filter((o) => o.status === 'approved')
    .reduce((sum, o) => sum + parseFloat(o.total.replace('$', '')), 0)
    .toFixed(2);

  return (
    <div className="pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="font-display text-2xl font-semibold uppercase tracking-tight mb-2">Order History</h1>
        {/* Stats Subtitle */}
        <p className="text-gray-400 text-sm mb-6">
          {orderCounts.all} orders • ${totalSpent} total spent
        </p>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`
                  px-4 py-2 text-xs font-semibold uppercase tracking-wide whitespace-nowrap transition-all
                  ${activeFilter === tab.key
                    ? 'bg-lime text-dark'
                    : 'bg-surface text-gray-400 hover:text-white hover:bg-surface/80'
                  }
                `}
              >
                {tab.label}
                <span className="ml-2 opacity-60">({orderCounts[tab.key]})</span>
              </button>
            ))}
          </div>

          {/* Orders List */}
          {filteredOrders.length > 0 ? (
            <div className="grid gap-4">
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} {...order} />
              ))}
            </div>
          ) : (
            // Empty State
            <div className="border-2 border-lime/20 bg-surface/50 py-16 px-8 text-center">
              <Receipt className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="font-display text-xl uppercase tracking-tight mb-2">
                No Orders Found
              </h3>
              <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                {activeFilter === 'approved'
                  ? "No completed orders yet."
                  : activeFilter === 'pending'
                  ? "No pending orders."
                  : activeFilter === 'cancelled'
                  ? "No cancelled orders."
                  : "You haven't made any purchases yet. Time to explore events!"}
              </p>
              <Link
                to="/discovery"
                className="inline-block bg-lime text-dark px-6 py-3 font-semibold uppercase text-sm tracking-wide hover:bg-limehover transition-colors"
              >
                Explore Events
              </Link>
            </div>
          )}

          {/* Summary Stats */}
          {mockOrders.length > 0 && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-surface border border-white/5 p-4 text-center">
                <div className="text-2xl font-display font-semibold text-lime">
                  {orderCounts.all}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                  Total Orders
                </div>
              </div>
              <div className="bg-surface border border-white/5 p-4 text-center">
                <div className="text-2xl font-display font-semibold text-white">
                  ${totalSpent}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                  Total Spent
                </div>
              </div>
              <div className="bg-surface border border-white/5 p-4 text-center">
                <div className="text-2xl font-display font-semibold text-white">
                  {mockOrders.reduce((sum, o) => sum + o.ticketCount, 0)}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                  Tickets Bought
                </div>
              </div>
              <div className="bg-surface border border-white/5 p-4 text-center">
                <div className="text-2xl font-display font-semibold text-white">
                  {orderCounts.approved}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                  Completed
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
