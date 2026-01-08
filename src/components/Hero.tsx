import { Search } from 'lucide-react';

export default function Hero() {
  return (
    <header className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" alt="Crowd" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center text-center mt-10">
            <span className="text-lime font-mono text-xs uppercase tracking-widest mb-4 border border-lime/30 px-3 py-1 rounded-sm bg-lime/5">
                Live Experiences Await
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-semibold uppercase tracking-tighter leading-[0.9] mb-8">
                Find Your<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Scene</span>
            </h1>
            
            {/* Search Block */}
            <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 p-2 rounded-sm flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="text" placeholder="Search events, clubs, vibes..." className="w-full bg-transparent border-none text-white placeholder-gray-400 pl-12 pr-4 py-3 focus:ring-0 focus:outline-none h-full" />
                </div>
                <button className="bg-lime text-dark font-display font-semibold uppercase tracking-tight px-8 py-3 rounded-sm hover:bg-limehover transition-colors w-full md:w-auto">
                    Discover
                </button>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
                {['Techno Bunkers', 'Run Clubs', 'Tech Meetups', 'Indie Gigs'].map((category) => (
                    <button key={category} className="px-4 py-2 border border-white/20 bg-dark/50 hover:border-lime hover:text-lime transition-all rounded-sm text-sm font-medium">
                        {category}
                    </button>
                ))}
            </div>
        </div>
    </header>
  );
}
