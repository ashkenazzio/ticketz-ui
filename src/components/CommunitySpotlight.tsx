import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CommunitySpotlight() {
  return (
    <section className="bg-surface border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Info */}
                <div>
                    <div className="inline-flex items-center gap-2 mb-6 text-lime font-mono text-xs uppercase tracking-widest">
                        <Sparkles className="w-3 h-3" /> Community Spotlight
                    </div>
                    <h2 className="font-display text-5xl md:text-6xl font-semibold uppercase tracking-tighter leading-none mb-6">
                        Bass Sector<br/>Collective
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
                        A curation of high-fidelity sound system culture. From dubstep to jungle, we host the most immersive underground events in the city.
                    </p>
                    
                    <div className="flex gap-8 mb-10">
                        <div>
                            <div className="text-3xl font-display font-semibold text-white">12.5K</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Subscribers</div>
                        </div>
                        <div>
                            <div className="text-3xl font-display font-semibold text-white">48</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Events Hosted</div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="bg-lime text-dark font-display font-semibold uppercase tracking-tight px-8 py-3 rounded-sm hover:bg-limehover transition-colors shadow-[0_0_20px_rgba(187,223,50,0.3)]">
                            Subscribe
                        </button>
                        <Link to="/community/1" className="border border-white/20 text-white font-display font-semibold uppercase tracking-tight px-8 py-3 rounded-sm hover:bg-white/10 transition-colors inline-block">
                            View Profile
                        </Link>
                    </div>
                </div>

                {/* Visual grid */}
                <div className="grid grid-cols-2 gap-4">
                    <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop" className="w-full h-64 object-cover rounded-sm opacity-80 hover:opacity-100 transition-opacity" alt="Spotlight 1" />
                    <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg" className="w-full h-64 object-cover rounded-sm mt-8 opacity-80 hover:opacity-100 transition-opacity" alt="Spotlight 2" />
                    <img src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1000&auto=format&fit=crop" className="w-full h-64 object-cover rounded-sm opacity-80 hover:opacity-100 transition-opacity" alt="Spotlight 3" />
                    <img src="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1000&auto=format&fit=crop" className="w-full h-64 object-cover rounded-sm mt-8 opacity-80 hover:opacity-100 transition-opacity" alt="Spotlight 4" />
                </div>
            </div>
        </div>
    </section>
  );
}
