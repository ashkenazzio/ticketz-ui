import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, Minus, Plus } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const price = 89;

  const handleNext = () => {
    if (step === 1) setStep(2);
    else navigate('/checkout/success');
  };

  return (
    <div className="bg-dark min-h-screen text-white font-sans selection:bg-lime selection:text-black flex items-center justify-center p-4">
        
        {/* Modal Container */}
        <div className="w-full max-w-lg bg-surface border border-white/10 rounded-sm overflow-hidden relative">
            
            {/* Header */}
            <div className="bg-dark/50 p-6 border-b border-white/5 flex items-center justify-between">
                <Link to="/event/1" className="text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="font-display font-semibold uppercase tracking-tight">Checkout</div>
                <div className="w-5"></div> {/* Spacer */}
            </div>

            <div className="p-8">
                {/* Steps Visual */}
                <div className="flex items-center gap-2 mb-8">
                    <div className={`h-1 flex-1 rounded-sm transition-colors ${step >= 1 ? 'bg-lime' : 'bg-white/10'}`}></div>
                    <div className={`h-1 flex-1 rounded-sm transition-colors ${step >= 2 ? 'bg-lime' : 'bg-white/10'}`}></div>
                </div>

                {/* Step 1: Ticket Selection */}
                {step === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="flex items-center justify-between bg-white/5 p-4 rounded-sm border border-white/10">
                            <div>
                                <h3 className="font-display text-xl font-semibold uppercase">General Admission</h3>
                                <p className="text-sm text-gray-400">Full weekend access</p>
                            </div>
                            <div className="text-xl font-semibold">${price}</div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-gray-400 uppercase text-sm font-medium tracking-wide">Quantity</span>
                            <div className="flex items-center gap-4 bg-dark border border-white/10 rounded-sm p-1">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-sm transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-mono font-semibold">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-sm transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                         <div className="bg-dark p-6 rounded-sm border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <CreditCard className="w-24 h-24 text-white" />
                            </div>
                            <div className="relative z-10 space-y-4">
                                <div>
                                    <label className="block text-xs uppercase text-gray-500 mb-1">Card Number</label>
                                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-surface border border-white/10 rounded-sm p-3 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors font-mono" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase text-gray-500 mb-1">Expiry</label>
                                        <input type="text" placeholder="MM/YY" className="w-full bg-surface border border-white/10 rounded-sm p-3 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors font-mono" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase text-gray-500 mb-1">CVC</label>
                                        <input type="text" placeholder="123" className="w-full bg-surface border border-white/10 rounded-sm p-3 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors font-mono" />
                                    </div>
                                </div>
                            </div>
                         </div>
                         <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
                            <Lock className="w-3 h-3" /> Secure 256-bit SSL Encrypted payment
                         </div>
                    </div>
                )}

                {/* Total & Action */}
                <div className="mt-10 pt-6 border-t border-white/10">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-400">Total</span>
                        <span className="text-2xl font-display font-semibold">${price * quantity}.00</span>
                    </div>
                    <button 
                        onClick={handleNext}
                        className="w-full bg-lime text-dark font-display font-semibold uppercase tracking-tight py-4 rounded-sm hover:bg-limehover transition-colors shadow-[0_0_15px_rgba(187,223,50,0.2)]"
                    >
                        {step === 1 ? 'Continue to Payment' : `Pay $${price * quantity}.00`}
                    </button>
                </div>
            </div>

        </div>
    </div>
  );
}
