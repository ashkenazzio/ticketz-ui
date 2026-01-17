import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OrganizerCTA() {
  return (
    <section className="py-24 bg-darker border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
         <h2 className="font-serif text-4xl md:text-5xl text-white mb-8">
            Start your next chapter.
         </h2>
         <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
                to="/dashboard"
                className="bg-lime text-dark font-bold text-lg px-8 py-4 rounded-sm hover:bg-limehover transition-all flex items-center justify-center gap-2"
            >
                Create First Event <ArrowRight className="w-5 h-5" />
            </Link>
             <Link 
                to="/about"
                className="bg-transparent border border-white/20 text-white font-medium text-lg px-8 py-4 rounded-sm hover:bg-white/5 transition-all flex items-center justify-center"
            >
                Read our Story
            </Link>
         </div>
      </div>
    </section>
  );
}
