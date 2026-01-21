import { Disc } from 'lucide-react';
import { Link } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

export default function EditorialSpotlight() {
  return (
    <section className="py-24 px-4 md:px-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual Side (Left) */}
            <div className="relative group">
                <div className="absolute top-4 -left-4 w-full h-full border border-lime/30 z-0 hidden md:block"></div>
                <div className="relative z-10 aspect-[3/4] overflow-hidden transition-all duration-700">
                    <img 
                        src={`${BASE}event-images/music-records.jpg`} 
                        alt="The Analog Club" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Content Side (Right) - Overlapping Aesthetic */}
            <div className="z-20 bg-dark/90 p-8 md:p-12 backdrop-blur-md border border-white/5 shadow-float lg:-ml-12">
                <div className="text-lime font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Disc className="w-4 h-4" /> Community Spotlight
                </div>
                
                <h2 className="font-display text-5xl md:text-6xl font-semibold uppercase tracking-tighter leading-[0.9] mb-8">
                    The Analog <br/> Club.
                </h2>
                
                <p className="text-gray-400 text-lg leading-relaxed mb-8 font-sans">
                    In a world of streaming and algorithms, we meet every Tuesday to listen to vinyl from start to finish. No phones, no playlists, just high-fidelity sound and the crackle of a needle.
                </p>

                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8 mb-8">
                    <div>
                        <div className="text-white font-display font-semibold text-lg">Lo-fi / Jazz</div>
                        <div className="text-gray-500 text-xs uppercase tracking-wide">Sound</div>
                    </div>
                     <div>
                        <div className="text-white font-display font-semibold text-lg">342</div>
                        <div className="text-gray-500 text-xs uppercase tracking-wide">Audiophiles</div>
                    </div>
                     <div>
                        <div className="text-white font-display font-semibold text-lg">Tue, 8 PM</div>
                        <div className="text-gray-500 text-xs uppercase tracking-wide">Next Meet</div>
                    </div>
                </div>

                <Link to="/community/comm-003" className="inline-block w-full md:w-auto bg-white text-dark font-bold px-8 py-4 rounded-lg uppercase tracking-wide hover:bg-lime transition-colors text-center">
                    View Community
                </Link>
            </div>
        </div>
    </section>
  );
}