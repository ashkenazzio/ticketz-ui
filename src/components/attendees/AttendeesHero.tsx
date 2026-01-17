import { ArrowRight, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

export default function AttendeesHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-dark">
      {/* Background - High Energy Day */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${BASE}event-images/people-gathering.jpg`}
          alt="Outdoor Social Gathering"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-dark/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-24">
        {/* Left: Copy */}
        <div className="space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight">
            Find your crowd. <br />
            <span className="text-lime italic">Instantly.</span>
          </h1>
          <p className="text-gray-200 text-lg sm:text-xl max-w-lg font-sans leading-relaxed lg:pl-1">
            The community-first platform for local experiences. No app store
            downloads, no cluttered feeds. Just you and the events that matter.
          </p>

          <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
            <Link
              to="/discovery"
              className="bg-lime text-dark font-bold text-lg px-8 py-4 rounded-sm hover:bg-limehover transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-lime/20 flex items-center gap-3"
            >
              Explore Events <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile: Simplified Ticket Preview */}
          <div className="lg:hidden w-full max-w-sm mt-6">
            <div className="bg-surface/90 backdrop-blur-md border border-white/10 rounded-lg p-5 shadow-float">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-lime/20 rounded-full flex items-center justify-center text-lime">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-white">ReactNYC Meetup</h3>
                    <p className="text-gray-400 text-xs">Sat, Jan 17 • 18:00</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  Valid
                </span>
              </div>
              <div className="border-t border-dashed border-white/10 pt-3 flex justify-between items-center">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Attendee</span>
                <span className="text-sm font-bold text-white">Alex Developer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Floating UI (Browser Window/Ticket) */}
        <div className="hidden lg:flex items-center justify-center relative perspective-1000 h-[600px] w-full">
          <div className="relative w-[400px] h-[500px]">
             {/* Floating Notification */}
             <div className="absolute -top-12 -right-12 bg-surface/90 backdrop-blur-md border border-white/10 p-4 rounded-full flex items-center gap-3 shadow-float z-20 animate-float-delayed">
                <div className="flex -space-x-2">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" 
                      alt="User 1" 
                      className="w-8 h-8 rounded-full border-2 border-surface object-cover"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80" 
                      alt="User 2" 
                      className="w-8 h-8 rounded-full border-2 border-surface object-cover"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80" 
                      alt="User 3" 
                      className="w-8 h-8 rounded-full border-2 border-surface object-cover"
                    />
                </div>
                <div className="text-sm font-medium text-white pr-2">
                    <span className="text-lime font-bold">Sarah + 3</span> joined ReactNYC
                </div>
             </div>

            {/* Main Card: The "Browser" Ticket */}
            <div className="absolute inset-0 bg-surface/80 backdrop-blur-xl border border-white/10 rounded-lg shadow-float transform rotate-y-[-10deg] rotate-x-[5deg] overflow-hidden flex flex-col">
              {/* Browser Bar */}
              <div className="h-12 bg-black/20 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="mx-auto bg-white/5 px-4 py-1 rounded-full text-[10px] text-gray-400 font-mono">
                    ticketz.app/wallet/react-nyc
                </div>
              </div>

              {/* Ticket Content */}
              <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-16 h-16 bg-lime/20 rounded-full flex items-center justify-center text-lime mb-2">
                    <QrCode className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-2xl font-serif text-white mb-1">ReactNYC Meetup</h3>
                    <p className="text-gray-400 text-sm">Sat, Jan 17 • 18:00</p>
                </div>
                
                <div className="w-full border-t border-dashed border-white/10 my-4"></div>

                <div className="space-y-1">
                    <p className="text-xs uppercase tracking-widest text-gray-500">Attendee</p>
                    <p className="text-lg font-bold text-white">Alex Developer</p>
                </div>

                <div className="pt-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        Valid Ticket
                    </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
