import { MessageSquare, Users } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

export default function SocialLoop() {
  return (
    <section className="py-24 bg-dark relative overflow-hidden">
        {/* Background Blur */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-surface to-dark z-0"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text */}
            <div>
                <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
                    Never miss <br/><span className="text-lime">a moment.</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    Follow your favorite organizers and friends. Get notified when they drop new events or buy tickets, so you're never the last to know.
                </p>
                
                <div className="flex items-center gap-8">
                    <div className="flex flex-col gap-2">
                        <span className="text-3xl font-bold text-white">12k+</span>
                        <span className="text-sm text-gray-500 uppercase tracking-wider">Active Communities</span>
                    </div>
                     <div className="flex flex-col gap-2">
                        <span className="text-3xl font-bold text-white">850k</span>
                        <span className="text-sm text-gray-500 uppercase tracking-wider">Connections Made</span>
                    </div>
                </div>
            </div>

            {/* Right: Glass UI Visualization */}
            <div className="relative">
                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-lime/10 blur-3xl rounded-full pointer-events-none"></div>

                {/* Glass Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-lg shadow-float relative">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className="text-sm font-bold text-white">Techno Bunker Discussion</span>
                        </div>
                        <Users className="w-4 h-4 text-gray-400" />
                    </div>

                    {/* Chat Items */}
                    <div className="space-y-4">
                        {/* Item 1 */}
                        <div className="flex gap-4">
                            <img src={`${BASE}event-images/music-festival.jpg`} className="w-10 h-10 rounded-full object-cover border border-white/10" alt="User 1" />
                            <div className="flex-1">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm font-bold text-white">Alex M.</span>
                                    <span className="text-xs text-gray-500">2m ago</span>
                                </div>
                                <p className="text-sm text-gray-300 mt-1">Anyone biking there from downtown? Looking for a squad! 🚲</p>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-lime/20 flex items-center justify-center text-lime font-bold border border-lime/30">J</div>
                             <div className="flex-1">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm font-bold text-white">Jordan K.</span>
                                    <span className="text-xs text-gray-500">5m ago</span>
                                </div>
                                <p className="text-sm text-gray-300 mt-1">Just grabbed my ticket! Can't wait for the setlist. 🔥</p>
                            </div>
                        </div>

                        {/* Item 3 (New Event Drop) */}
                        <div className="bg-lime/10 border border-lime/20 rounded-lg p-3 flex gap-3 items-center mt-2">
                            <div className="bg-lime text-dark p-2 rounded-full">
                                <MessageSquare className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs text-lime font-bold uppercase">New Event Drop</p>
                                <p className="text-sm text-white">Techno Bunker just added "Warehouse Vol. 4"</p>
                            </div>
                        </div>
                    </div>

                     {/* Input Area Mock */}
                     <div className="mt-6 pt-4 border-t border-white/5">
                        <div className="h-10 bg-black/20 rounded-lg border border-white/5 w-full flex items-center px-4 text-xs text-gray-500">
                            Join the conversation...
                        </div>
                     </div>

                </div>

                {/* Floating Avatars */}
                 <div className="absolute -bottom-6 -right-6 bg-surface border border-white/10 p-3 rounded-lg shadow-float flex items-center gap-3">
                    <div className="flex -space-x-3">
                         <img src={`${BASE}event-images/yoga-event.jpg`} className="w-8 h-8 rounded-full border-2 border-surface object-cover" alt="Friend 1" />
                         <img src={`${BASE}event-images/gallery.jpg`} className="w-8 h-8 rounded-full border-2 border-surface object-cover" alt="Friend 2" />
                         <div className="w-8 h-8 rounded-full bg-surface border-2 border-gray-700 flex items-center justify-center text-[10px] text-white font-bold">+5</div>
                    </div>
                    <span className="text-xs font-bold text-white pr-1">Friends Going</span>
                 </div>
            </div>
        </div>
    </section>
  );
}
