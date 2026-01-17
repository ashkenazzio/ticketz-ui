import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SARAH_IMG = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";

export default function TrendingEvents() {
  return (
    <section className="py-24 px-4 md:px-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Image Side */}
            <div className="relative group order-2 lg:order-1">
                <div className="absolute -inset-4 bg-lime/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-sm overflow-hidden">
                    <img 
                        src={SARAH_IMG} 
                        alt="Sarah Jenkins" 
                        className="w-full h-full object-cover transition-all duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-dark via-dark/80 to-transparent">
                        <div className="text-lime font-mono text-xs uppercase tracking-widest mb-2">Founder, Neon Sunrise</div>
                        <div className="text-white font-display text-3xl font-semibold uppercase tracking-tight">Sarah Jenkins</div>
                    </div>
                </div>
            </div>

            {/* Text Side */}
            <div className="space-y-10 order-1 lg:order-2">
                <h2 className="font-display text-5xl md:text-7xl font-semibold uppercase tracking-tighter leading-[0.9]">
                    Meet the <br/><span className="text-lime">Architects.</span>
                </h2>
                
                <blockquote className="text-xl md:text-3xl font-serif italic text-gray-200 leading-relaxed border-l-4 border-lime pl-8 py-2">
                    "I started the 5K run club because I was tired of networking in stuffy conference rooms. I wanted to meet people while the city was still waking up. Now, 500 of us run every Saturday."
                </blockquote>

                <div className="pt-4">
                    <Link to="/event/1" className="inline-flex items-center gap-3 bg-white text-dark font-bold px-8 py-4 rounded-sm hover:bg-lime hover:text-dark transition-all uppercase tracking-wide">
                        Join Sarah's Next Run <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    </section>
  );
}
