import { Globe, ShieldCheck, Zap } from 'lucide-react';

export default function WebWalletFeature() {
  return (
    <section className="py-24 bg-surface border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Graphic (Mobile Web View) */}
        <div className="order-2 md:order-1 flex justify-center">
            <div className="relative w-[300px] h-[600px] bg-dark border-8 border-gray-800 rounded-[3rem] shadow-2xl overflow-hidden">
                {/* Status Bar Mock */}
                <div className="h-6 w-full bg-dark flex justify-between px-6 items-center pt-2">
                    <span className="text-[10px] text-white font-medium">9:41</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-2 bg-white rounded-sm"></div>
                        <div className="w-3 h-2 bg-white rounded-sm"></div>
                    </div>
                </div>

                {/* Address Bar Mock (Safari-ish) */}
                <div className="bg-gray-800 p-2 border-b border-gray-700">
                     <div className="bg-gray-700 rounded-lg h-8 flex items-center justify-center text-gray-400 text-xs gap-2">
                        <span className="text-green-400">🔒</span> ticketz.app/wallet
                     </div>
                </div>

                {/* Screen Content */}
                <div className="p-6">
                    <h3 className="text-white font-serif text-xl mb-6">My Wallet</h3>
                    
                    {/* Ticket Card */}
                    <div className="bg-gradient-to-br from-lime to-limehover rounded-lg p-6 text-dark shadow-lg relative overflow-hidden mb-4">
                        <div className="absolute top-0 right-0 p-8 bg-white/20 blur-2xl rounded-full -mr-4 -mt-4"></div>
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider opacity-70">Admit One</p>
                                <p className="text-xl font-bold leading-tight">Neon District</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="bg-dark/10 p-2 rounded">
                                <ShieldCheck className="w-8 h-8 opacity-80" />
                            </div>
                            <p className="text-3xl font-mono font-bold tracking-tighter">#8X92</p>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-xl p-4 flex items-center gap-3">
                         <div className="bg-gray-700 p-2 rounded-full">
                            <Zap className="w-4 h-4 text-yellow-400" />
                         </div>
                         <div>
                             <p className="text-white text-sm font-bold">Fast Entry Enabled</p>
                             <p className="text-gray-400 text-xs">Screen brightness at 100%</p>
                         </div>
                    </div>

                </div>
            </div>
        </div>

        {/* Right: Text */}
        <div className="order-1 md:order-2">
            <div className="bg-lime/10 w-12 h-12 rounded-lg flex items-center justify-center text-lime mb-6">
                <Globe className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-4xl text-white mb-6">
                No download needed. <br />
                <span className="text-gray-500">Just open and go.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Access your tickets directly from your browser. We've optimized the mobile web experience to be as fast and secure as a native app, without taking up space on your phone.
            </p>

            <ul className="space-y-4">
                {[
                    "Works on any device with a browser",
                    "Offline-ready ticket caching",
                    "Instant access via magic link"
                ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                        <div className="w-5 h-5 rounded-full bg-lime/20 flex items-center justify-center text-lime">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        {item}
                    </li>
                ))}
            </ul>
        </div>

      </div>
    </section>
  );
}
