import { ArrowDown } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 bg-dark overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <img 
                src={`${BASE}event-images/techno-gathering-2.jpg`}
                alt="Background" 
                className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/40 to-dark"></div>
        </div>

        <div className="max-w-5xl mx-auto space-y-12 relative z-10 pt-20">
             <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] font-bold text-white leading-[0.95] tracking-tight">
                Not Just <br className="hidden md:block" />
                <span className="text-lime italic pr-4">Attendance.</span>
                Belonging.
            </h1>
            
            <p className="text-gray-200 text-lg md:text-2xl max-w-2xl mx-auto font-sans leading-relaxed">
                The city isn't just a place you live; it's a pulse you feel. From underground techno bunkers to sunrise run clubs, we don't just sell tickets—we curate the moments that define your week.
            </p>
        </div>
    </section>
  );
}