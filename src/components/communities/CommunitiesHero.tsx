import { ArrowDown } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

export default function CommunitiesHero() {
  return (
    <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-dark overflow-hidden">
        {/* Background Video/Image Placeholder */}
        <div className="absolute inset-0 z-0">
             {/* Simulating the video loop with a static image for now, but structurally ready for video */}
            <img 
                src={`${BASE}event-images/people-gathering.jpg`}
                alt="Background" 
                className="w-full h-full object-cover opacity-40 grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/40 to-dark"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 relative z-10 pt-10">
             <h1 className="font-serif text-5xl md:text-7xl lg:text-[6rem] font-bold text-white leading-[1] tracking-tight">
                Don't Just Go Out. <br/>
                <span className="text-lime italic">Belong.</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-sans leading-relaxed">
                Events last a few hours. Connections last a lifetime. <br className="hidden md:block"/>
                Find the collective that speaks your language.
            </p>
            
            <div className="pt-8 animate-bounce">
                <ArrowDown className="w-8 h-8 text-white/50" />
            </div>
        </div>
    </section>
  );
}