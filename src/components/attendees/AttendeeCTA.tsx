import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AttendeeCTA() {
  return (
    <section className="py-20 bg-darker">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-surface border border-white/5 rounded-lg p-12 md:p-16 relative overflow-hidden shadow-float">
            
            {/* Background Splashes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

            <div className="relative z-10">
                <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
                    What are you doing this weekend?
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
                    Thousands of events are happening right now. Don't sit this one out.
                </p>
                <Link 
                    to="/events"
                    className="inline-flex items-center gap-2 bg-white text-dark font-bold px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Browse Communities <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
      </div>
    </section>
  );
}
