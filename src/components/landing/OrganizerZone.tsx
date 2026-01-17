import { Check, BarChart3, Users, ScanLine } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

export default function OrganizerZone() {
  return (
    <section className="py-24 bg-dark overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        
        {/* Left: Technical Copy */}
        <div className="space-y-12 relative z-10">
            <div className="space-y-4">
                <span className="text-lime font-mono text-xs uppercase tracking-widest mb-2 block">For Organizers</span>
                <h2 className="font-serif text-5xl md:text-6xl font-bold text-white leading-[0.95]">
                    Complete control. <br/>
                    <span className="text-gray-500">Zero friction.</span>
                </h2>
                <p className="text-gray-400 text-xl font-sans max-w-md leading-relaxed pt-2">
                    Everything you need to manage your events and grow your community, all in one place.
                </p>
            </div>
            
            <div className="flex flex-col gap-10">
                <div className="flex gap-5">
                    <div className="flex-shrink-0 mt-1">
                        <BarChart3 className="w-6 h-6 text-lime" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-xl mb-2">Real-time Data</h4>
                        <p className="text-gray-400 leading-relaxed max-w-sm">Track sales velocity, revenue, and attendance as they happen. No more guessing games.</p>
                    </div>
                </div>

                <div className="flex gap-5">
                    <div className="flex-shrink-0 mt-1">
                        <ScanLine className="w-6 h-6 text-lime" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-xl mb-2">Instant Check-in</h4>
                        <p className="text-gray-400 leading-relaxed max-w-sm">Scan QR codes in milliseconds with our dedicated app. Keep the line moving fast.</p>
                    </div>
                </div>

                <div className="flex gap-5">
                    <div className="flex-shrink-0 mt-1">
                        <Users className="w-6 h-6 text-lime" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-xl mb-2">CRM Built-in</h4>
                        <p className="text-gray-400 leading-relaxed max-w-sm">Own your audience data. Message your members directly and build long-term loyalty.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Mobile: Simplified Visual */}
        <div className="lg:hidden relative w-full">
            <div className="relative w-full aspect-video rounded-sm overflow-hidden">
                <img
                    src={`${BASE}event-images/techno-gathering-2.jpg`}
                    alt="Organizer context"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
            </div>
            {/* Mobile Dashboard Card */}
            <div className="relative -mt-16 mx-4 bg-dark border border-white/10 rounded-sm shadow-float overflow-hidden z-20">
                {/* Mock Browser Header */}
                <div className="bg-white/5 border-b border-white/5 p-3 flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono ml-3">ticketz.app/dashboard</div>
                </div>
                {/* Dashboard Content */}
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-white text-base">Guest List</h3>
                        <button className="bg-lime text-dark text-xs font-bold px-2.5 py-1 rounded hover:bg-limehover transition-colors">Export</button>
                    </div>
                    <div className="space-y-2">
                        {[1,2].map(i => (
                            <div key={i} className="flex items-center justify-between p-2.5 bg-surface rounded-lg border border-white/5">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-7 h-7 rounded-full bg-gray-700"></div>
                                    <div>
                                        <div className="w-20 h-2 bg-gray-600 rounded mb-1"></div>
                                        <div className="w-14 h-1.5 bg-gray-700 rounded"></div>
                                    </div>
                                </div>
                                <div className="text-lime text-xs font-mono"><Check className="w-3.5 h-3.5" /></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Desktop: Technical Visuals (Layered Composition) */}
        <div className="hidden lg:flex relative justify-start items-center mb-32">

            {/* Layer 1: Context Image (Background) */}
            <div className="relative w-[80%] aspect-square rounded-sm overflow-hidden mr-24 opacity-80">
                 <img
                    src={`${BASE}event-images/techno-gathering-2.jpg`}
                    alt="Organizer context"
                    className="w-full h-full object-cover transition-all duration-700"
                />
                 {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
            </div>

            {/* Layer 2: Floating "Dashboard" Card (Foreground) */}
            <div className="absolute bottom-0 right-0 w-[24rem] bg-dark border border-white/10 rounded-sm shadow-float shadow-glow-lime overflow-hidden z-20 transform translate-y-1/2">
                {/* Mock Browser Header */}
                <div className="bg-white/5 border-b border-white/5 p-3 flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono ml-4">ticketz.app/dashboard/manage</div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-white text-lg">Guest List</h3>
                        <button className="bg-lime text-dark text-xs font-bold px-3 py-1.5 rounded hover:bg-limehover transition-colors">Export CSV</button>
                    </div>
                    <div className="space-y-3">
                        {[1,2,3].map(i => (
                            <div key={i} className="flex items-center justify-between p-3 bg-surface rounded-lg border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                                    <div>
                                        <div className="w-24 h-2 bg-gray-600 rounded mb-1"></div>
                                        <div className="w-16 h-2 bg-gray-700 rounded"></div>
                                    </div>
                                </div>
                                <div className="text-lime text-xs font-mono"><Check className="w-4 h-4" /></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}