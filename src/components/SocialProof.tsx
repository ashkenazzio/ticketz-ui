import { Camera } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

const PHOTOS = [
    { src: `${BASE}event-images/people-gathering.jpg`, rotate: '-rotate-6' },
    { src: `${BASE}event-images/dance-show.jpg`, rotate: 'rotate-3' },
    { src: `${BASE}event-images/music-concertt.jpg`, rotate: '-rotate-3' },
    { src: `${BASE}event-images/gallery-3.jpg`, rotate: 'rotate-6' },
];

export default function SocialProof() {
  return (
    <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
             <div className="inline-flex items-center gap-2 mb-4 text-lime font-mono text-xs uppercase tracking-widest">
                <Camera className="w-4 h-4" /> The Aftermath
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold uppercase tracking-tighter mb-4">
                Last Night in the City.
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
                Did you miss the 'Electric Garden' opening? 300 attendees. 4 hours of House music. 1 unforgettable night.
            </p>
        </div>

        {/* Scattered Grid */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 px-4 w-full overflow-hidden">
            {PHOTOS.map((photo, i) => (
                <div key={i} className={`relative group w-48 md:w-64 bg-white p-2 md:p-3 shadow-lg transform transition-transform duration-500 hover:z-50 hover:scale-110 hover:rotate-0 ${photo.rotate}`}>
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                        <img 
                            src={photo.src} 
                            alt="Event Moment" 
                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" 
                        />
                    </div>
                    <div className="pt-3 pb-1 text-center">
                        <div className="font-mono text-dark text-xs md:text-sm font-bold opacity-50">#TicketzMoments</div>
                    </div>
                </div>
            ))}
        </div>
    </section>
  );
}
