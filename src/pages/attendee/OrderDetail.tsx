import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Download, Calendar, MapPin, Ticket, CreditCard, Check, Clock } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { useData } from '../../context/DataContext';
import type { BadgeStatus } from '../../components/StatusBadge';

// Helper functions
function formatOrderDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatOrderDateTime(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' +
    date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatEventTime(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function OrderDetail() {
  const { id } = useParams();
  const { db, currentUser } = useData();

  // Get order data from database
  const orderData = useMemo(() => {
    if (!id) return null;
    const order = db.orders.getById(id);
    if (!order) return null;

    const event = db.events.getById(order.eventId);
    const orderTickets = db.tickets.getByUser(order.userId).filter(t => t.orderId === order.id);

    // Get ticket info with tiers
    const ticketItems = orderTickets.map(ticket => {
      const tier = db.ticketTiers.getById(ticket.ticketTierId);
      return {
        id: ticket.id,
        tier: tier?.name || 'General',
        price: tier?.price || 0,
        quantity: 1,
      };
    });

    // Calculate totals
    const subtotal = ticketItems.reduce((sum, t) => sum + t.price, 0);
    const fees = Math.round(subtotal * 0.06); // 6% service fee
    const total = subtotal + fees;

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

    // Build timeline
    const timeline = [
      { status: 'Order Placed', time: formatOrderDateTime(order.createdAt), completed: true },
      { status: 'Payment Confirmed', time: formatOrderDateTime(order.createdAt), completed: order.status === 'completed' },
      { status: 'Tickets Delivered', time: formatOrderDateTime(order.createdAt), completed: order.status === 'completed' },
    ];

    return {
      id: order.id,
      status,
      createdAt: formatOrderDateTime(order.createdAt),
      event: {
        id: event?.id || '',
        name: event?.title || 'Unknown Event',
        date: event ? formatOrderDate(event.startTime) : '',
        time: event ? formatEventTime(event.startTime) : '',
        venue: event?.venueName || '',
        image: event?.image || event?.coverImage || '',
      },
      tickets: ticketItems,
      subtotal,
      fees,
      total,
      payment: {
        method: 'Visa •••• 4242', // Mock payment method - would come from payments table
        status: order.status === 'completed' ? 'completed' : 'pending',
      },
      timeline,
    };
  }, [db, id]);

  if (!orderData) {
    return (
      <div className="pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 text-center">
          <h1 className="font-display text-2xl font-semibold uppercase tracking-tight mb-2">Order Not Found</h1>
          <p className="text-gray-400 mb-4">The order you're looking for doesn't exist.</p>
          <Link to="/orders" className="text-lime hover:text-limehover">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="font-display text-2xl font-semibold uppercase tracking-tight mb-2">Order {orderData.id}</h1>
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400 text-sm">
            Placed on {orderData.createdAt}
          </p>
          <StatusBadge status={orderData.status} size="md" />
        </div>

          {/* Event Card */}
          <div className="bg-surface border border-white/5 mb-6 overflow-hidden">
            <div className="flex">
              <img
                src={orderData.event.image}
                alt={orderData.event.name}
                className="w-32 h-32 sm:w-40 sm:h-40 object-cover flex-shrink-0"
              />
              <div className="p-4 sm:p-6 flex flex-col justify-center">
                <Link
                  to={`/event/${orderData.event.id}`}
                  className="font-display text-lg sm:text-xl uppercase tracking-tight hover:text-lime transition-colors"
                >
                  {orderData.event.name}
                </Link>
                <div className="space-y-1 mt-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{orderData.event.date} • {orderData.event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{orderData.event.venue}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-surface border border-white/5 p-6 mb-6">
            <h3 className="font-display text-lg uppercase tracking-tight mb-4 flex items-center gap-2">
              <Ticket className="w-5 h-5 text-lime" />
              Tickets
            </h3>
            <div className="space-y-4">
              {orderData.tickets.map((ticket, index) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                >
                  <div>
                    <div className="font-semibold text-white">{ticket.tier}</div>
                    <div className="text-xs text-gray-500 font-mono">{ticket.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">x{ticket.quantity}</div>
                    <div className="font-semibold">{formatCurrency(ticket.price)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal</span>
                <span>{formatCurrency(orderData.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Service Fees</span>
                <span>{formatCurrency(orderData.fees)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-white/10">
                <span>Total</span>
                <span className="text-lime">{formatCurrency(orderData.total)}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-surface border border-white/5 p-6 mb-6">
            <h3 className="font-display text-lg uppercase tracking-tight mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-lime" />
              Payment
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-7 bg-dark rounded flex items-center justify-center">
                  <span className="text-xs font-semibold">VISA</span>
                </div>
                <span className="text-gray-300">{orderData.payment.method}</span>
              </div>
              <div className="flex items-center gap-2 text-lime text-sm">
                <Check className="w-4 h-4" />
                Paid
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-surface border border-white/5 p-6 mb-6">
            <h3 className="font-display text-lg uppercase tracking-tight mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-lime" />
              Order Timeline
            </h3>
            <div className="space-y-4">
              {orderData.timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${item.completed ? 'bg-lime' : 'bg-gray-700'}`}>
                    {item.completed && <Check className="w-3 h-3 text-dark" />}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <div className="font-semibold text-white">{item.status}</div>
                    <div className="text-xs text-gray-500">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/wallet"
              className="flex-1 flex items-center justify-center gap-2 bg-lime text-dark py-3 font-semibold uppercase text-sm tracking-wide hover:bg-limehover transition-colors"
            >
              <Ticket className="w-4 h-4" />
              View Tickets
            </Link>
            <button className="flex-1 flex items-center justify-center gap-2 border border-white/20 text-white py-3 font-semibold uppercase text-sm tracking-wide hover:border-lime hover:text-lime transition-colors">
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
          </div>
      </div>
    </div>
  );
}
