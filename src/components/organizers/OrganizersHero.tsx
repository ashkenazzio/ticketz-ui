import { ArrowRight, TrendingUp, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

export default function OrganizersHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-dark">
      {/* Background - Warm Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${BASE}event-images/startup-gathering.jpg`}
          alt="Organizer Planning"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-dark/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center pt-20">
        {/* Left: Copy */}
        <div className="space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
            Everything you need to <span className="text-lime">grow.</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-lg font-sans leading-relaxed lg:pl-1 border-l-2 border-transparent lg:border-lime/30">
            The community-first toolkit for events. Spend less time on admin and more time building the culture.
          </p>

          <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
            <Link
              to="/auth/register"
              className="bg-lime text-dark font-bold text-lg px-8 py-4 rounded-sm hover:bg-limehover transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-lime/20 flex items-center gap-3"
            >
              Start Hosting Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile: Simplified Stats Preview */}
          <div className="lg:hidden w-full max-w-sm mt-6">
            <div className="bg-surface/90 backdrop-blur-md border border-white/10 rounded-lg p-5 shadow-float shadow-glow-lime">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-lime/20 flex items-center justify-center text-lime">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Community Growth</h3>
                  <p className="text-xs text-gray-400">Last 30 Days</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-center">
                  <p className="text-lg font-mono text-white">€12k</p>
                  <p className="text-gray-400 text-[10px] uppercase">Sales</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-center">
                  <p className="text-lg font-mono text-lime flex items-center justify-center gap-1">
                    +142 <TrendingUp className="w-3 h-3" />
                  </p>
                  <p className="text-gray-400 text-[10px] uppercase">Members</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-center">
                  <p className="text-lg font-mono text-white flex items-center justify-center gap-1">
                    3 <Calendar className="w-3 h-3 text-gray-500" />
                  </p>
                  <p className="text-gray-400 text-[10px] uppercase">Events</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: The Builder's Workspace (Floating UI) */}
        <div className="hidden lg:flex items-center justify-center relative perspective-1000 h-[600px] w-full">
            {/* Main Dashboard Card */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-surface border border-white/10 rounded-lg shadow-float shadow-glow-lime transform rotate-y-[-5deg] rotate-x-[2deg] p-6 z-10 transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]">
                {/* Header Mock */}
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-lime/20 flex items-center justify-center text-lime font-bold">
                            <Users className="w-5 h-5" />
                         </div>
                         <div>
                             <h3 className="text-white font-bold">Community Growth</h3>
                             <p className="text-xs text-gray-400">Last 30 Days</p>
                         </div>
                    </div>
                    <div className="bg-white/5 px-3 py-1 rounded text-xs text-gray-300">
                        Export Report
                    </div>
                </div>

                {/* Graph Area */}
                <div className="h-64 flex items-end justify-between gap-2 px-2 relative">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                        <div className="border-t border-dashed border-gray-500 w-full h-0"></div>
                        <div className="border-t border-dashed border-gray-500 w-full h-0"></div>
                        <div className="border-t border-dashed border-gray-500 w-full h-0"></div>
                    </div>

                    {/* Bars / Trend */}
                    {[30, 45, 40, 55, 65, 50, 70, 85, 90, 80, 95, 100].map((h, i) => (
                        <div key={i} className="w-full bg-white/5 rounded-t-sm relative group h-full flex items-end">
                            <div 
                                style={{ height: `${h}%` }} 
                                className={`w-full rounded-t-sm transition-all duration-500 ${i === 11 ? 'bg-lime shadow-[0_0_15px_rgba(167,241,117,0.5)]' : 'bg-gray-700 group-hover:bg-gray-600'}`}
                            ></div>
                             {/* Tooltip Mock */}
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                +{h * 2}
                             </div>
                        </div>
                    ))}
                </div>
                
                {/* Footer Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                     <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Sales</p>
                        <p className="text-2xl font-mono text-white">€12,450</p>
                     </div>
                     <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">New Members</p>
                        <p className="text-2xl font-mono text-lime flex items-center gap-2">
                            +142 <TrendingUp className="w-4 h-4" />
                        </p>
                     </div>
                     <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Upcoming</p>
                        <p className="text-2xl font-mono text-white flex items-center gap-2">
                            3 <Calendar className="w-4 h-4 text-gray-500" />
                        </p>
                     </div>
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-lime/10 blur-[100px] rounded-full pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
