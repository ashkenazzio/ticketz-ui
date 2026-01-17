import {
  ArrowRight,
  Ticket,
  TrendingUp,
  Check,
  MapPin,
  Users,
  QrCode,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] md:min-h-screen flex items-center overflow-hidden bg-dark">
      {/* Background - Warm & Bright (High Energy) */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${BASE}event-images/music-festival.jpg`}
          alt="Community Festival"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Mobile: Consistent dark overlay */}
        <div className="absolute inset-0 bg-dark/70 md:hidden"></div>
        {/* Desktop: Cinematic Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent hidden md:block"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent hidden md:block"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-24">
        {/* Left: Narrative (Refactored to match Original Hero) */}
        <div className="space-y-8 relative z-10 text-center md:text-left flex flex-col items-center md:items-start">
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight">
            Find your scene. <br />
            <span className="text-lime italic">Or build it.</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-lg font-sans leading-relaxed md:border-l-2 md:border-lime/30 md:pl-6">
            The dual-sided platform for the culture. Whether you're looking for
            the crowd or leading it, you belong here.
          </p>

          <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
            <Link
              to="/app"
              className="bg-lime text-dark font-bold text-lg px-8 py-4 rounded-sm hover:bg-limehover transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-lime/20 flex items-center gap-3"
            >
              Launch App <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/discovery"
              className="group bg-surface/80 backdrop-blur-sm border border-white/20 text-white font-medium text-lg px-8 py-4 rounded-sm hover:bg-surface hover:border-white/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/5 transition-all flex items-center gap-3"
            >
              Explore Events
            </Link>
          </div>

          {/* Mobile: Simplified Event Preview */}
          <div className="md:hidden w-full max-w-sm mt-4">
            <div className="bg-surface/90 backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-float">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={`${BASE}event-images/music-festival-2.jpg`}
                    alt="Event preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono text-lime mb-1">UPCOMING</div>
                  <h3 className="font-serif text-lg text-white truncate">Neon District 2049</h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">Industrial Sector 7</span>
                  </div>
                </div>
                <div className="bg-lime text-dark p-2 rounded-lg flex-shrink-0">
                  <Ticket className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: The Mixed 2.5D Cluster - Hidden on mobile to prevent overflow */}
        <div className="hidden md:flex items-center justify-center relative perspective-1000 h-[500px] lg:h-[600px] w-full md:scale-75 lg:scale-100 transition-transform origin-center">
          {/* Cluster Anchor - Keeps everything locked together */}
          <div className="relative w-[500px] h-[400px]">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-lime/5 blur-3xl rounded-full pointer-events-none"></div>

                        {/* Layer 1 (Center/Back): The "Neon District" Card (Main) */} 
                        <div className="absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-10 p-6 shadow-float transform hover:scale-105 transition-all duration-300 ease-out group w-[28rem]">
                          {/* Glass Background Layer (Isolated) */}
                          <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm -z-10 shadow-lg"></div>
            
                          {/* Mock Header */} 
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <div className="text-xs font-mono text-lime mb-1">
                                UPCOMING
                              </div>
                              <h3 className="font-serif text-3xl text-white whitespace-nowrap">
                                Neon District 2049
                              </h3>
                            </div>
                            <div className="bg-dark/50 p-2 rounded-lg border border-white/5">
                              <span className="block text-center font-bold text-white leading-none">
                                14
                              </span>
                              <span className="block text-center text-[10px] text-gray-400 uppercase">
                                JAN
                              </span>
                            </div>
                          </div>
            
                          {/* Mock Image Area */} 
                          <div className="h-48 w-full bg-dark rounded-lg mb-6 overflow-hidden relative transition-transform duration-500">
                            <img
                              src={`${BASE}event-images/music-festival-2.jpg`}
                              alt="Event preview"
                              className="w-full h-full object-cover transition-opacity"
                            />
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-white font-mono border border-white/10">
                              €25.00
                            </div>
                          </div>
              {/* Mock Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="p-2 bg-white/5 rounded-full">
                    <MapPin className="w-4 h-4 text-lime" />
                  </div>
                  <span className="text-sm">Industrial Sector 7</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="p-2 bg-white/5 rounded-full">
                    <Users className="w-4 h-4 text-lime" />
                  </div>
                  <span className="text-sm">248 Going</span>
                </div>
              </div>

              {/* Mock Action */}
              <div className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-center text-gray-400 text-sm font-mono cursor-default">
                Ticket ID: #8X92-LM4
              </div>
            </div>

            {/* Layer 2 (Front/Right): Organizer Growth (Ticket Sales) - Closer Layer */}
            <div className="absolute -bottom-24 -right-24 bg-dark/95 backdrop-blur-xl border border-white/10 p-6 rounded-sm shadow-float transform rotate-y-[-5deg] rotate-x-[5deg] z-20 w-72 opacity-95 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      Member Growth
                    </div>
                    <div className="text-xs text-gray-400">Last 30 Days</div>
                  </div>
                </div>
              </div>
              {/* Mock Graph */}
              <div className="h-24 flex items-end justify-between gap-1 px-1 mb-3">
                {[20, 35, 45, 30, 60, 85, 100].map((h, i) => (
                  <div
                    key={i}
                    className="w-full bg-surface-highlight rounded-t-sm relative group overflow-hidden h-full flex items-end"
                  >
                    <div
                      style={{ height: `${h}%` }}
                      className="w-full bg-lime rounded-t-sm transition-all duration-300 origin-bottom group-hover:bg-limehover group-hover:scale-y-110"
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-3">
                <span className="text-gray-400 text-xs">New Members</span>
                <span className="text-white font-mono font-bold">+1,240</span>
              </div>
            </div>

            {/* Layer 3: Floating "Success" Toast (Bottom Left - Exact Copy from Original) */}
            <div className="absolute -bottom-8 -left-8 bg-lime text-dark p-4 rounded-sm shadow-lg flex items-center gap-3 animate-bounce [animation-duration:3s] z-30">
              <div className="bg-black/20 p-2 rounded-full">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">
                  Ticket Ready
                </div>
                <div className="text-sm font-medium">Added to Wallet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
