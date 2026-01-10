import { CheckCircle2 } from 'lucide-react';

export default function WalletPreview() {
  return (
    <section className="bg-dark py-32 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            
            {/* Text Side */}
            <div className="order-2 md:order-1">
                 <h2 className="font-display text-4xl md:text-5xl font-semibold uppercase tracking-tighter mb-6">
                    Invisible Entry.
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Forget the panic of scrolling through emails at the door. Your ticket lives in your digital wallet, ready when you are. No paper, no friction, just straight to the dance floor.
                </p>
                <ul className="space-y-4">
                     <li className="flex items-center gap-3 text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-lime" />
                        <span>Offline access guaranteed</span>
                     </li>
                     <li className="flex items-center gap-3 text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-lime" />
                        <span>Instant transfer to friends</span>
                     </li>
                </ul>
            </div>

            {/* Visual Side */}
            <div className="order-1 md:order-2 flex justify-center relative">
                 {/* Blurred Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-lime/20 rounded-full blur-[100px]"></div>
                
                {/* Phone Mockup */}
                <div className="relative w-[280px] h-[560px] bg-black border-[8px] border-gray-800 rounded-[3rem] shadow-2xl overflow-hidden transform rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
                    {/* Screen Content */}
                    <div className="w-full h-full bg-surface relative flex flex-col">
                        {/* Status Bar */}
                        <div className="h-6 w-full flex justify-between px-6 pt-3">
                            <div className="w-12 h-full bg-white/10 rounded-full"></div>
                             <div className="w-4 h-4 bg-white/10 rounded-full"></div>
                        </div>

                        {/* Ticket Glow */}
                        <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
                             {/* Success State */}
                             <div className="w-full aspect-[3/5] bg-lime rounded-xl shadow-[0_0_60px_rgba(167,241,117,0.4)] flex flex-col items-center justify-center text-dark space-y-4 animate-pulse-slow">
                                <CheckCircle2 className="w-20 h-20" />
                                <div className="font-display font-bold text-2xl uppercase tracking-tighter">Access Granted</div>
                             </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="h-1 bg-white/20 w-1/3 mx-auto mb-4 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
