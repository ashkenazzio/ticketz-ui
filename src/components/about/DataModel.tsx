import { Share2, Lock, Users, Calendar, Ticket, CreditCard } from 'lucide-react';

export default function DataModel() {
  const entities = [
    { icon: <Users className="w-5 h-5" />, name: 'User', desc: 'Central identity with profile & relations.' },
    { icon: <Lock className="w-5 h-5" />, name: 'Role', desc: 'RBAC definitions (e.g. ORGANIZER).' },
    { icon: <Share2 className="w-5 h-5" />, name: 'Community', desc: 'Hub for events with moderators.' },
    { icon: <Calendar className="w-5 h-5" />, name: 'Event', desc: 'Core product with geolocation & capacity.' },
    { icon: <Ticket className="w-5 h-5" />, name: 'TicketTier', desc: 'Pricing & inventory management.' },
    { icon: <CreditCard className="w-5 h-5" />, name: 'Order', desc: 'Transactional tracking (PENDING/APPROVED).' },
  ];

  return (
    <section className="py-24 px-6 bg-darker border-b border-white/5">
        <div className="max-w-7xl mx-auto">
             <h2 className="font-mono text-3xl text-white mb-16 text-center">
                <span className="text-gray-600">//</span> Data Model & Schema
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                {entities.map((entity, i) => (
                    <div key={i} className="p-6 border border-white/10 bg-white/[0.02] rounded-sm hover:bg-white/[0.05] transition-colors flex items-start gap-4">
                        <div className="text-lime">{entity.icon}</div>
                        <div>
                            <div className="font-mono font-bold text-white mb-1">{entity.name}</div>
                            <div className="text-gray-500 text-xs font-mono leading-relaxed">{entity.desc}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="max-w-4xl mx-auto bg-dark border border-white/10 p-8 rounded-sm">
                 <h3 className="font-mono text-lime text-sm mb-6 uppercase tracking-widest flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> Key GraphQL Operations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs leading-loose">
                    <div>
                        <div className="text-gray-500 mb-2 font-bold uppercase tracking-tighter">Queries</div>
                        <ul className="space-y-1">
                            <li><span className="text-blue-400">me</span>: <span className="text-gray-400">Fetch current identity</span></li>
                            <li><span className="text-blue-400">events</span>: <span className="text-gray-400">Paginated discovery</span></li>
                            <li><span className="text-blue-400">community</span>: <span className="text-gray-400">Subculture lookup</span></li>
                        </ul>
                    </div>
                    <div>
                         <div className="text-gray-500 mb-2 font-bold uppercase tracking-tighter">Mutations</div>
                         <ul className="space-y-1">
                            <li><span className="text-purple-400">register</span>: <span className="text-gray-400">Identity creation</span></li>
                            <li><span className="text-purple-400">createEvent</span>: <span className="text-gray-400">Protected by RBAC</span></li>
                            <li><span className="text-purple-400">placeOrder</span>: <span className="text-gray-400">Transactional engine</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
