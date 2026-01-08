import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { ArrowRight, Calendar, MapPin, Ticket, Check } from 'lucide-react';

export default function CreateEvent() {
    const [step, setStep] = useState(1);
    
    // Simple state placeholders
    const [title, setTitle] = useState('');
    const [venue, setVenue] = useState('');
    const [tickets, setTickets] = useState([{ name: 'General Admission', price: '', qty: '' }]);

    const addTicketTier = () => {
        setTickets([...tickets, { name: '', price: '', qty: '' }]);
    };

  return (
    <DashboardLayout title="Create Event">
        <div className="max-w-4xl mx-auto">
            
            {/* Progress Tracker */}
            <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
                {['Details', 'Venue', 'Tickets', 'Review'].map((s, idx) => {
                    const stepNum = idx + 1;
                    const active = step >= stepNum;
                    const current = step === stepNum;
                    return (
                        <div key={s} className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-sm font-semibold transition-colors ${active ? 'bg-lime text-dark' : 'bg-surface border border-white/10 text-gray-500'}`}>
                                {active ? <Check className="w-4 h-4" /> : stepNum}
                            </div>
                            <span className={`text-sm font-medium uppercase tracking-wide ${current ? 'text-white' : 'text-gray-500'}`}>{s}</span>
                            {idx < 3 && <div className="w-12 h-[1px] bg-white/10 mx-2 hidden md:block"></div>}
                        </div>
                    )
                })}
            </div>

            {/* Step Content */}
            <div className="bg-surface border border-white/5 p-8 md:p-12 rounded-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {step === 1 && (
                    <div className="space-y-8">
                        <h2 className="font-display text-3xl font-semibold uppercase tracking-tight text-white mb-6">Event Details</h2>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-xs uppercase text-gray-400 mb-2 font-medium tracking-wide">Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                    <input type="date" className="w-full bg-dark border border-white/10 rounded-sm p-4 pl-12 text-white focus:outline-none focus:border-lime transition-colors" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-400 mb-2 font-medium tracking-wide">Time</label>
                                <input type="time" className="w-full bg-dark border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-lime transition-colors" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-gray-400 mb-2 font-medium tracking-wide">Description</label>
                            <textarea rows={5} className="w-full bg-dark border border-white/10 rounded-sm p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors resize-none" placeholder="Tell people what to expect..."></textarea>
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
                                <input type="text" className="w-full bg-dark border border-white/10 rounded-sm p-4 pl-12 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors" placeholder="123 Industrial Ave..." />
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
                                        <input type="text" defaultValue={tier.name} className="w-full bg-surface border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-lime transition-colors" placeholder="e.g. Early Bird" />
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="block text-xs uppercase text-gray-400 mb-2">Price ($)</label>
                                        <input type="number" defaultValue={tier.price} className="w-full bg-surface border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-lime transition-colors" placeholder="0.00" />
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="block text-xs uppercase text-gray-400 mb-2">Quantity</label>
                                        <input type="number" defaultValue={tier.qty} className="w-full bg-surface border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-lime transition-colors" placeholder="100" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-lime/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Ticket className="w-10 h-10 text-lime" />
                        </div>
                        <h2 className="font-display text-3xl font-semibold uppercase tracking-tight text-white mb-2">Ready to Publish?</h2>
                        <p className="text-gray-400 max-w-md mx-auto mb-8">
                            Your event <span className="text-white font-medium">{title}</span> will be live immediately. You can edit details later from the dashboard.
                        </p>
                    </div>
                )}

                {/* Footer Actions */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/5">
                    {step > 1 ? (
                        <button onClick={() => setStep(step - 1)} className="text-gray-400 hover:text-white transition-colors uppercase font-medium tracking-wide text-sm">
                            Back
                        </button>
                    ) : <div></div>}

                    <button 
                        onClick={() => step < 4 ? setStep(step + 1) : null}
                        className="bg-lime text-dark font-display font-semibold uppercase tracking-tight px-8 py-3 rounded-sm hover:bg-limehover transition-colors flex items-center gap-2"
                    >
                        {step === 4 ? 'Publish Event' : 'Next Step'} <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </div>
    </DashboardLayout>
  );
}
