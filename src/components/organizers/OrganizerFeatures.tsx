import { BarChart3, ScanLine, UserCheck, Zap, Mail, Users } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

export default function OrganizerFeatures() {
  return (
    <section className="py-20 bg-dark space-y-32">
        
      {/* Block A: Analytics (Text Left / Visual Right) */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="bg-lime/10 w-12 h-12 rounded-lg flex items-center justify-center text-lime mb-6 border border-lime/20">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
            Watch your community grow.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            See who’s returning, where they’re coming from, and when they buy. Real-time data that helps you understand your crowd, not just count them.
          </p>
          <ul className="space-y-3">
            {['Real-time ticket velocity', 'Referral source tracking', 'Attendee retention metrics'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime"></div>
                    {item}
                </li>
            ))}
          </ul>
        </div>
        
        {/* Visual A */}
        <div className="relative">
             <div className="bg-surface border border-white/5 rounded-lg p-6 shadow-float relative z-10 transform md:rotate-3 transition-transform hover:rotate-0">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-bold">Ticket Velocity</h3>
                    <div className="flex gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs text-green-500 uppercase font-bold">Live</span>
                    </div>
                </div>
                {/* Mock Chart Line */}
                <div className="h-32 flex items-end gap-1 mb-4">
                     {[20, 30, 45, 35, 60, 50, 75, 90, 85, 100].map((h, i) => (
                         <div key={i} style={{height: `${h}%`}} className="flex-1 bg-gradient-to-t from-lime/50 to-lime rounded-t-sm opacity-80"></div>
                     ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-white/5">
                    <span>18:00</span>
                    <span>19:00</span>
                    <span>20:00</span>
                    <span>21:00</span>
                </div>
             </div>
             <div className="absolute top-20 -right-10 bg-dark border border-white/10 p-4 rounded-lg shadow-float z-20 w-48 animate-float">
                 <p className="text-gray-400 text-xs mb-1">New Members</p>
                 <p className="text-2xl font-bold text-white">+24 <span className="text-sm font-normal text-gray-500">today</span></p>
             </div>
        </div>
      </div>


      {/* Block B: Entry (Visual Left / Text Right) */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
         {/* Visual B */}
         <div className="order-2 md:order-1 relative">
            <div className="relative rounded-lg overflow-hidden border border-white/5 shadow-2xl">
                 <img 
                    src={`${BASE}event-images/music-festival-2.jpg`} 
                    alt="Door Entry" 
                    className="w-full h-[400px] object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
                 
                 {/* Floating Scanner UI */}
                 <div className="absolute bottom-8 left-8 right-8 bg-surface/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-lg flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="bg-lime/20 p-3 rounded-full text-lime">
                             <ScanLine className="w-6 h-6" />
                        </div>
                        <div>
                             <p className="text-white font-bold text-lg">Check-in Success</p>
                             <p className="text-gray-400 text-sm">Ticket #8X92 • Valid</p>
                        </div>
                     </div>
                     <div className="w-10 h-10 bg-lime rounded-full flex items-center justify-center">
                         <UserCheck className="w-6 h-6 text-dark" />
                     </div>
                 </div>
            </div>
         </div>

         {/* Text B */}
         <div className="order-1 md:order-2">
            <div className="bg-lime/10 w-12 h-12 rounded-lg flex items-center justify-center text-lime mb-6 border border-lime/20">
                <Zap className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
                The smoothest door in town.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                No clunky hardware. No app downloads. Our browser-based scanner keeps the line moving so you can focus on welcoming your guests.
            </p>
         </div>
      </div>


      {/* Block C: CRM (Text Left / Visual Right) */}
       <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="bg-lime/10 w-12 h-12 rounded-lg flex items-center justify-center text-lime mb-6 border border-lime/20">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
            Turn attendees into members.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Identify your regulars. Send direct updates, offer early bird access, and build a tribe that shows up every time.
          </p>
        </div>
        
        {/* Visual C */}
        <div className="relative flex justify-center">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-lime/5 blur-3xl rounded-full"></div>
            
            {/* Member Card */}
            <div className="bg-surface border border-white/5 rounded-lg p-8 shadow-float shadow-glow-lime relative z-10 w-full max-w-md">
                 <div className="flex items-center gap-4 mb-6">
                    <img src={`${BASE}event-images/gallery.jpg`} className="w-16 h-16 rounded-full object-cover border-2 border-lime/30" alt="Member" />
                    <div>
                        <h3 className="text-xl font-bold text-white">Sarah Jenkins</h3>
                        <p className="text-lime text-sm font-medium">Top Supporter</p>
                    </div>
                 </div>

                 <div className="space-y-4 mb-8">
                     <div className="flex justify-between items-center py-2 border-b border-white/5">
                         <span className="text-gray-400 text-sm">Events Attended</span>
                         <span className="text-white font-mono font-bold">5</span>
                     </div>
                     <div className="flex justify-between items-center py-2 border-b border-white/5">
                         <span className="text-gray-400 text-sm">Total Spend</span>
                         <span className="text-white font-mono font-bold">€145.00</span>
                     </div>
                      <div className="flex justify-between items-center py-2 border-b border-white/5">
                         <span className="text-gray-400 text-sm">Last Seen</span>
                         <span className="text-white font-mono font-bold">2 days ago</span>
                     </div>
                 </div>

                 <button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                     <Mail className="w-4 h-4" /> Message Sarah
                 </button>
            </div>
        </div>
      </div>

    </section>
  );
}