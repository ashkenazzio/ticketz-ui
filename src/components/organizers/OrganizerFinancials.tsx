import { CheckCircle2 } from 'lucide-react';

export default function OrganizerFinancials() {
  return (
    <section className="py-24 bg-[#EAE8E2] text-dark">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-6 font-bold text-dark">
          Fair play. Fast pay.
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12">
           We believe in sustainable communities. That means transparent fees and instant payouts via Stripe. You keep the value you create.
        </p>

        {/* Payout Notification Graphic */}
        <div className="flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-float w-full max-w-sm text-left transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">Transfer Complete</p>
                        <p className="text-xs text-gray-500 mb-2">Sent to your bank account</p>
                        <p className="text-3xl font-mono font-bold text-gray-900">€2,450.00</p>
                        <p className="text-[10px] text-gray-400 mt-2">Arrives tomorrow by 12:00 PM</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
