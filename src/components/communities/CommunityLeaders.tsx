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
    <section className="py-16 max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold uppercase tracking-tighter">
                Meet the Curators.
            </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {LEADERS.map((leader, i) => (
                <div
                    key={i}
                    className="group relative bg-surface border border-white/5 hover:border-lime/30 transition-all duration-500 overflow-hidden"
                >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden">
                        <img
                            src={leader.img}
                            alt={leader.name}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col h-48">
                        {/* Quote */}
                        <blockquote className="font-serif text-lg text-gray-200 leading-relaxed flex-1">
                            "{leader.quote}"
                        </blockquote>

                        {/* Divider + Author Info pinned to bottom */}
                        <div>
                            <div className="w-8 group-hover:w-full h-px bg-white/10 group-hover:bg-lime/50 transition-all duration-500 mb-3" />
                            <div className="font-display text-base font-semibold uppercase tracking-wide text-white">
                                {leader.name}
                            </div>
                            <div className="text-lime/70 text-xs font-mono uppercase tracking-widest">
                                {leader.role}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
  );
}