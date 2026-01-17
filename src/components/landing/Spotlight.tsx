const BASE = import.meta.env.BASE_URL;

export default function Spotlight() {
  return (
    <section className="py-24 bg-dark border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-5 relative">
                    <div className="aspect-[3/4] rounded-sm overflow-hidden transition-all duration-700">
                        <img 
                            src={`${BASE}event-images/gallery-2.jpg`} 
                            alt="Community Leader" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-lime text-dark p-6 max-w-xs font-mono text-sm leading-relaxed shadow-lg hidden md:block rounded-sm">
                        <span className="font-bold block mb-1">ELENA R.</span>
                        FOUNDER, THE CANVAS CLUB
                    </div>
                </div>
                <div className="md:col-span-7">
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight md:leading-tight lg:leading-tight mb-8">
                        "Ticketz gets it. We aren't selling seats, we are building a movement. This is the only tool that actually helps us grow."
                    </h2>
                    <div className="flex items-center gap-4 text-gray-400 font-mono text-sm">
                        <span>EST. 2024</span>
                        <span>•</span>
                        <span>2.5K MEMBERS</span>
                        <span>•</span>
                        <span>BERLIN</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}