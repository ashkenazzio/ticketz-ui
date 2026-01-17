import { BadgeCheck, Lock, Zap } from 'lucide-react';

export default function FairPlay() {
  return (
    <section className="py-12 bg-[#EAE8E2] text-dark border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
            
            {/* Header / Proposition */}
            <div className="lg:w-1/3 text-center lg:text-left">
                <h2 className="font-serif text-4xl font-bold mb-3 text-dark">Fair & Square.</h2>
                <p className="text-gray-600 text-base leading-relaxed max-w-xs mx-auto lg:mx-0">
                    Transparent fees. Instant payouts. <br /> We don't hold your money hostage.
                </p>
            </div>

            {/* Features Strip */}
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="mb-3 text-dark">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base uppercase tracking-wide mb-1 text-dark">Instant Payouts</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Funds land moments after the event. No holding periods.</p>
                </div>

                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="mb-3 text-dark">
                        <BadgeCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base uppercase tracking-wide mb-1 text-dark">Capped Fees</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Fair scale pricing. You keep more earnings as you grow.</p>
                </div>

                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="mb-3 text-dark">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base uppercase tracking-wide mb-1 text-dark">Your Data</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Export your list anytime. We never market to your crowd.</p>
                </div>

            </div>
        </div>
    </section>
  );
}