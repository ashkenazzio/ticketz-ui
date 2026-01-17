import { Link, useParams } from 'react-router-dom';
import { Download, Calendar, MapPin, Ticket, CreditCard, Check, Clock } from 'lucide-react';
import AppLayout from '../../layouts/AppLayout';
import StatusBadge from '../../components/StatusBadge';

// Mock order data - in real app, would fetch based on params.id
const orderData = {
  id: 'ORD-2847',
  status: 'approved' as const,
  createdAt: 'Nov 1, 2026 • 3:45 PM',
  event: {
    id: '1',
    name: 'Electric Garden',
    date: 'Nov 12, 2026',
    time: '12:00 PM',
    venue: 'Warehouse District, LA',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
  },
  tickets: [
    { id: 'TKT-001', tier: 'General Admission', price: 45, quantity: 1 },
    { id: 'TKT-002', tier: 'VIP Access', price: 95, quantity: 1 },
  ],
  subtotal: 140,
  fees: 8.40,
  total: 148.40,
  payment: {
    method: 'Visa •••• 4242',
    status: 'completed',
  },
  timeline: [
    { status: 'Order Placed', time: 'Nov 1, 3:45 PM', completed: true },
    { status: 'Payment Confirmed', time: 'Nov 1, 3:45 PM', completed: true },
    { status: 'Tickets Delivered', time: 'Nov 1, 3:46 PM', completed: true },
  ],
};

export default function OrderDetail() {
  const { id } = useParams();

  return (
    <AppLayout title={`Order ${orderData.id}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Order Meta */}
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
                    <div className="font-semibold">${ticket.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal</span>
                <span>${orderData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Service Fees</span>
                <span>${orderData.fees.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-white/10">
                <span>Total</span>
                <span className="text-lime">${orderData.total.toFixed(2)}</span>
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
    </AppLayout>
  );
}
