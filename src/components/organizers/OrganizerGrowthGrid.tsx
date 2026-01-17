import { List, Tag, Send } from 'lucide-react';

export default function OrganizerGrowthGrid() {
  return (
    <section className="py-24 bg-dark border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
         <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Built for the long haul.</h2>
            <p className="text-gray-400">Tools designed to sustain your community.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-6">
             
             {/* Card 1: Waitlists */}
             <div className="bg-surface border border-white/5 rounded-lg p-8 hover:border-lime/30 hover:shadow-glow-lime transition-all group">
                 <div className="bg-surface-highlight w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <List className="w-6 h-6 text-lime" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Waitlists</h3>
                 <p className="text-gray-400 text-sm mb-6">Automatically manage demand when you sell out. Notify fans instantly.</p>
                 {/* Visual Micro-UI */}
                 <div className="bg-dark rounded-lg p-3 border border-white/5">
                     <div className="flex justify-between items-center text-xs">
                         <span className="text-gray-400">Waiting</span>
                         <span className="text-lime bg-lime/10 px-2 py-0.5 rounded">12 People</span>
                     </div>
                 </div>
             </div>

             {/* Card 2: Promo Codes */}
             <div className="bg-surface border border-white/5 rounded-lg p-8 hover:border-lime/30 hover:shadow-glow-lime transition-all group">
                 <div className="bg-surface-highlight w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Tag className="w-6 h-6 text-lime" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Promo Codes</h3>
                 <p className="text-gray-400 text-sm mb-6">Create flexible discounts for early birds, VIPs, or friends & family.</p>
                 {/* Visual Micro-UI */}
                 <div className="bg-dark rounded-lg p-3 border border-dashed border-gray-700 flex justify-between items-center">
                     <span className="font-mono text-lime text-xs">FRIENDS20</span>
                     <span className="text-xs text-gray-500">-20% Off</span>
                 </div>
             </div>

             {/* Card 3: Direct Messaging */}
             <div className="bg-surface border border-white/5 rounded-lg p-8 hover:border-lime/30 hover:shadow-glow-lime transition-all group">
                 <div className="bg-surface-highlight w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Send className="w-6 h-6 text-lime" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Broadcasts</h3>
                 <p className="text-gray-400 text-sm mb-6">Send important updates directly to ticket holders via email or push.</p>
                 {/* Visual Micro-UI */}
                 <div className="bg-dark rounded-lg p-3 border border-white/5">
                     <div className="flex gap-2 items-center">
                         <div className="w-2 h-2 rounded-full bg-lime"></div>
                         <div className="h-1.5 w-2/3 bg-gray-700 rounded-full"></div>
                     </div>
                 </div>
             </div>

         </div>
      </div>
    </section>
  );
}