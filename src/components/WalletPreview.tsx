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
                <div className="relative w-[240px] sm:w-[260px] h-[480px] sm:h-[520px] bg-black border-[6px] border-gray-800 rounded-[2.5rem] shadow-float overflow-hidden transform rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
                    {/* Screen Content */}
                    <div className="w-full h-full bg-surface relative flex flex-col">
                        {/* Status Bar / Notch */}
                        <div className="h-8 w-full flex justify-center pt-2">
                            <div className="w-20 h-5 bg-black rounded-full"></div>
                        </div>

                        {/* Ticket Glow */}
                        <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 relative">
                             {/* Success State */}
                             <div className="w-full max-w-[160px] aspect-square bg-lime rounded-lg shadow-[0_0_60px_rgba(167,241,117,0.4)] flex flex-col items-center justify-center text-dark space-y-2">
                                <CheckCircle2 className="w-12 h-12" />
                                <div className="font-display font-bold text-sm uppercase tracking-tighter text-center px-2">Access Granted</div>
                             </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="h-1 bg-white/20 w-1/3 mx-auto mb-3 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
