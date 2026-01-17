import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InitiationCTA() {
  return (
    <section className="py-32 bg-dark text-center border-t border-white/10">
        <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-display text-5xl md:text-6xl font-semibold uppercase tracking-tighter mb-6 text-white">
                Have a Vision?
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-12 font-sans leading-relaxed">
                You don't need a venue to build a scene. You just need a spark. <br/>
                Create your community, set the rules, and watch the tribe gather.
            </p>
            
            <Link to="/dashboard/events/create" className="inline-flex items-center gap-3 bg-lime text-dark font-bold text-lg px-10 py-5 rounded-sm hover:bg-limehover transition-colors uppercase tracking-wide">
                Start a Collective <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
    </section>
  );
}