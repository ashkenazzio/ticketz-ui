
const LEADERS = [
    {
        name: "Marcus",
        role: "Urban Striders",
        quote: "I don't care how fast you run. I care that you show up.",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "Elena",
        role: "Supper Club",
        quote: "Food is the oldest social network. It breaks down every barrier.",
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "David",
        role: "Synth Wave",
        quote: "We are building a sanctuary for sound in a noisy city.",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    }
];

export default function CommunityLeaders() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="font-display text-center text-4xl font-semibold uppercase tracking-tighter mb-20">
            Meet the Curators.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {LEADERS.map((leader, i) => (
                <div key={i} className="group flex flex-col items-center">
                    {/* Avatar Container */}
                    <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-8 border-2 border-white/10 group-hover:border-lime transition-colors duration-500">
                        <img 
                            src={leader.img} 
                            alt={leader.name} 
                            className="w-full h-full object-cover transition-all duration-500"
                        />
                         {/* Hover Video Overlay Placeholder */}
                         <div className="absolute inset-0 bg-lime/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            {/* In a real implementation, a video would play here */}
                         </div>
                    </div>
                    
                    <blockquote className="font-serif text-xl italic text-gray-300 mb-6 max-w-xs">
                        "{leader.quote}"
                    </blockquote>
                    
                    <div>
                        <div className="font-display font-bold uppercase tracking-wide text-white">{leader.name}</div>
                        <div className="text-lime text-xs font-mono uppercase tracking-widest">{leader.role}</div>
                    </div>
                </div>
            ))}
        </div>
    </section>
  );
}