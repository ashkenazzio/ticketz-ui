import { Play } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

const ARTWORKS = [
    {
        id: '1',
        url: `${BASE}event-images/gallery-2.jpg`,
        alt: 'Art Gallery',
        className: 'rotate-[-6deg] translate-y-12 z-0 hidden lg:block'
    },
    {
        id: '2',
        url: `${BASE}event-images/techno-gathering.jpg`,
        alt: 'Techno Gathering',
        className: 'rotate-[-3deg] translate-y-4 z-10 hidden md:block'
    },
    {
        id: '3',
        url: `${BASE}event-images/running-event-2.jpg`,
        alt: 'Running Club',
        className: 'rotate-[-1deg] translate-y-0 z-20 scale-90'
    },
    {
        id: '4', // CENTER HERO
        url: `${BASE}event-images/music-concertt.jpg`,
        alt: 'Live Concert',
        className: 'z-30 scale-110 shadow-2xl shadow-black/50 rotate-0'
    },
    {
        id: '5',
        url: `${BASE}event-images/yoga-event.jpg`,
        alt: 'Yoga Session',
        className: 'rotate-[1deg] translate-y-0 z-20 scale-90'
    },
    {
        id: '6',
        url: `${BASE}event-images/dance-show.jpg`,
        alt: 'Dance Performance',
        className: 'rotate-[3deg] translate-y-4 z-10 hidden md:block'
    },
    {
        id: '7',
        url: `${BASE}event-images/music-records.jpg`,
        alt: 'Music Records',
        className: 'rotate-[6deg] translate-y-12 z-0 hidden lg:block'
    }
];

export default function DiscoveryHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-start text-center px-4 bg-dark pt-32 pb-20 overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
            <span className="text-lime font-sans text-xs uppercase tracking-widest mb-4 border border-lime/30 px-3 py-1 rounded-md bg-lime/5 inline-block">
                Events • Community • Culture
            </span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] font-bold text-white uppercase leading-[0.9] tracking-tight">
                The pulse of
                <span className="block italic">Culture</span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-sans">
                Discover underground events, connect with your tribe, and experience the power of community-first ticketing.
            </p>

            <div className="pt-4 flex flex-col items-center gap-4">
                <button className="bg-lime text-dark font-sans font-bold text-lg px-8 py-4 rounded-lg hover:bg-limehover transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
                    Start Exploring
                </button>
            </div>
        </div>

        {/* Artworks Grid/Flow */}
        <div className="w-full mt-20 flex items-center justify-center gap-4 px-4 h-[400px] relative">
             {ARTWORKS.map((art) => (
                <div key={art.id} className={`relative flex-shrink-0 transition-all duration-500 ease-out hover:z-40 hover:scale-105 ${art.className} w-48 h-64 md:w-64 md:h-80 group`}>
                    <div className="w-full h-full rounded-xl overflow-hidden border-[6px] border-dark shadow-lg">
                        <img 
                            src={art.url} 
                            alt={art.alt} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
             ))}
        </div>
    </section>
  );
}