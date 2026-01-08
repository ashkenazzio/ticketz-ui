import { Link } from 'react-router-dom';
import { QrCode, CheckCircle2, Download, Share2 } from 'lucide-react';
import Confetti from 'react-confetti'; // Adding confetti for "Celebration" feel
import { useEffect, useState } from 'react';

export default function CheckoutSuccess() {
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <div className="bg-dark min-h-screen text-white font-sans selection:bg-lime selection:text-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
        
        <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={200} colors={['#BBDF32', '#ffffff', '#333333']} />

        <div className="text-center mb-8 z-10 animate-in fade-in zoom-in duration-500">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lime/20 text-lime mb-6">
                <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="font-display text-5xl font-semibold uppercase tracking-tighter mb-2">You're In!</h1>
            <p className="text-gray-400 text-lg">See you at Electric Garden.</p>
        </div>

        {/* Digital Ticket Card */}
        <div className="relative w-full max-w-sm group perspective-1000 z-10 animate-in slide-in-from-bottom-8 duration-700 delay-200">
            <div className="relative bg-white text-dark rounded-sm overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-dark p-6 text-white relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-lime blur-3xl opacity-20"></div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-display text-xl uppercase tracking-tight font-semibold">Electric Garden</span>
                        <div className="flex items-center gap-1 bg-lime text-dark text-[10px] font-bold px-2 py-0.5 uppercase rounded-sm animate-pulse">
                            <span className="w-1.5 h-1.5 bg-dark rounded-full"></span> Valid
                        </div>
                    </div>
                    <div className="text-left">
                        <div className="text-xs text-gray-400 uppercase">Date</div>
                        <div className="font-mono text-sm">NOV 12, 2026 • 12:00 PM</div>
                    </div>
                </div>
                
                {/* Body */}
                <div className="p-8 bg-[#E5E5E5] relative">
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-dark rounded-full translate-y-[-50%]"></div>
                    <div className="absolute -right-3 top-0 w-6 h-6 bg-dark rounded-full translate-y-[-50%]"></div>
                    <div className="border-t-2 border-dashed border-gray-400 w-full absolute top-0 left-0"></div>

                    <div className="flex flex-col items-center justify-center pt-4">
                        <div className="bg-white p-4 rounded-sm mb-6 shadow-sm">
                            <QrCode className="w-40 h-40 text-black stroke-[1.5]" />
                        </div>
                        <div className="text-xs font-mono uppercase text-gray-500 tracking-[0.2em] mb-2">
                            Ticket ID
                        </div>
                        <div className="font-mono font-bold text-lg tracking-wider">
                            8X92-MM29-KKS
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="bg-gray-100 p-4 flex gap-2 border-t border-gray-200">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-dark text-white text-xs font-semibold uppercase py-3 rounded-sm hover:bg-black transition-colors">
                        <Download className="w-3 h-3" /> Save to Phone
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 border border-dark text-dark text-xs font-semibold uppercase py-3 rounded-sm hover:bg-gray-200 transition-colors">
                        <Share2 className="w-3 h-3" /> Share
                    </button>
                </div>
            </div>
        </div>

        <div className="mt-12 z-10">
            <Link to="/" className="text-gray-400 hover:text-white hover:underline underline-offset-4 text-sm uppercase tracking-wide transition-colors">
                Back to Discovery
            </Link>
        </div>
    </div>
  );
}
