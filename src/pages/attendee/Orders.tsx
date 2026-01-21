import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Receipt, Filter } from 'lucide-react';
import OrderCard from '../../components/OrderCard';
import { useData } from '../../context/DataContext';
import type { BadgeStatus } from '../../components/StatusBadge';

type FilterTab = 'all' | 'approved' | 'pending' | 'cancelled';

const filterTabs: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All Orders' },
  { key: 'approved', label: 'Completed' },
  { key: 'pending', label: 'Pending' },
  { key: 'cancelled', label: 'Cancelled' },
];

// Helper to format date
function formatOrderDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Helper to format currency (cents to dollars)
function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function Orders() {
  const { db, currentUser } = useData();
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  if (!currentUser) {
    return (
      <div className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <p className="text-gray-400">Please log in to view your orders.</p>
        </div>
      </div>
    );
  }

  // Get user's orders from database
  const userOrders = db.orders.getByUser(currentUser.id);

  // Map orders to display format with event info
  const orderData = userOrders.map(order => {
    const event = db.events.getById(order.eventId);
    // Count tickets for this order
    const orderTickets = db.tickets.getByUser(currentUser.id).filter(t => t.orderId === order.id);

    // Map order status to badge status
    let status: BadgeStatus;
    switch (order.status) {
      case 'completed':
        status = 'approved';
        break;
      case 'pending':
        status = 'pending';
        break;
      case 'refunded':
      case 'failed':
        status = 'cancelled';
        break;
      default:
        status = 'pending';
    }

    return {
      id: order.id,
      eventName: event?.title || 'Unknown Event',
      eventImage: event?.image || '',
      orderDate: formatOrderDate(order.createdAt),
      ticketCount: orderTickets.length,
      total: formatCurrency(order.totalAmount),
      status,
      totalCents: order.totalAmount,
    };
  });

  // Filter based on active tab
  const filteredOrders = orderData.filter((order) => {
    if (activeFilter === 'all') return true;
    return order.status === activeFilter;
  });

  const orderCounts = {
    all: orderData.length,
    approved: orderData.filter((o) => o.status === 'approved').length,
    pending: orderData.filter((o) => o.status === 'pending').length,
    cancelled: orderData.filter((o) => o.status === 'cancelled').length,
  };

  const totalSpent = orderData
    .filter((o) => o.status === 'approved')
    .reduce((sum, o) => sum + o.totalCents, 0);

  const totalTicketsBought = orderData
    .filter((o) => o.status === 'approved')
    .reduce((sum, o) => sum + o.ticketCount, 0);

  return (
    <div className="pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="font-display text-2xl font-semibold uppercase tracking-tight mb-2">Order History</h1>
        {/* Stats Subtitle */}
        <p className="text-gray-400 text-sm mb-6">
          {orderCounts.all} orders • {formatCurrency(totalSpent)} total spent
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
                to="/events"
                className="inline-block bg-lime text-dark px-6 py-3 font-semibold uppercase text-sm tracking-wide hover:bg-limehover transition-colors"
              >
                Explore Events
              </Link>
            </div>
          )}

          {/* Summary Stats */}
          {orderData.length > 0 && (
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
                  {formatCurrency(totalSpent)}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                  Total Spent
                </div>
              </div>
              <div className="bg-surface border border-white/5 p-4 text-center">
                <div className="text-2xl font-display font-semibold text-white">
                  {totalTicketsBought}
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
