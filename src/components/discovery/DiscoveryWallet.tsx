import { QrCode, CheckCircle2 } from 'lucide-react';

export default function DiscoveryWallet() {
  return (
    <section className="bg-[#0f0f16] py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-display text-4xl font-semibold uppercase tracking-tighter mb-4">Your Digital Wallet</h2>
            <p className="text-gray-400 mb-12">Seamless entry. No paper, no hassle.</p>

            <div className="relative mx-auto w-full max-w-sm group perspective-1000">
                {/* Ticket Card */}
                <div className="relative bg-white text-dark rounded-sm overflow-hidden shadow-2xl transform transition-transform duration-500 hover:-rotate-1 hover:scale-105">
                    {/* Ticket Header */}
                    <div className="bg-dark p-6 text-white relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-lime blur-3xl opacity-20"></div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-display text-xl uppercase tracking-tight font-semibold">Neon Sunrise</span>
                            <span className="bg-lime text-dark text-[10px] font-bold px-2 py-0.5 uppercase rounded-sm">Admit One</span>
                        </div>
                        <div className="text-left">
                            <div className="text-xs text-gray-400 uppercase">Date</div>
                            <div className="font-mono text-sm">OCT 24, 2023 • 06:00 AM</div>
                        </div>
                    </div>
                    
                    {/* Ticket Body */}
                    <div className="p-6 bg-[#E5E5E5] relative">
                        {/* Perforated Line Visual */}
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-[#0f0f16] rounded-full translate-y-[-50%]"></div>
                        <div className="absolute -right-3 top-0 w-6 h-6 bg-[#0f0f16] rounded-full translate-y-[-50%]"></div>
                        <div className="border-t-2 border-dashed border-gray-400 w-full absolute top-0 left-0"></div>

                        <div className="flex flex-col items-center justify-center pt-4">
                            <div className="bg-white p-2 rounded-sm mb-4">
                                {/* Fake QR */}
                                <div className="w-32 h-32 bg-dark flex items-center justify-center">
                                    <QrCode className="w-24 h-24 text-white stroke-1" />
                                </div>
                            </div>
                            <div className="text-[10px] font-mono uppercase text-gray-500 tracking-widest">
                                ID: 8X92-MM29-KKS
                            </div>
                            <div className="mt-4 w-full bg-green-500/10 text-green-700 text-xs font-semibold py-2 rounded-sm uppercase flex items-center justify-center gap-1 border border-green-500/20">
                                <CheckCircle2 className="w-3 h-3" /> Confirmed
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}