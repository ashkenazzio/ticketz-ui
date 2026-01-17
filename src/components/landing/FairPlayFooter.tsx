import { Zap, BadgeCheck, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FairPlayFooter() {
  return (
    <footer className="bg-gray-100 text-dark pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Value Prop Section */}
        <div className="grid md:grid-cols-2 gap-16 mb-24 items-center">
            <div>
                 <h2 className="font-serif text-5xl font-bold mb-6 text-dark">Zero hangups on payday.</h2>
                <p className="text-gray-600 text-xl leading-relaxed">
                    Instant payouts. Transparent fees. It’s your community, you keep the value. We don't hold your money hostage.
                </p>
            </div>
            <div className="grid gap-6">
                 <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"><Zap className="w-5 h-5" /></div>
                    <div>
                        <h4 className="font-bold text-lg">Instant Payouts</h4>
                        <p className="text-gray-600">Funds land in your account moments after the event.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"><Lock className="w-5 h-5" /></div>
                    <div>
                        <h4 className="font-bold text-lg">Your Data</h4>
                        <p className="text-gray-600">Export your attendee list anytime. No lock-in.</p>
                    </div>
                 </div>
            </div>
        </div>

        {/* Footer Navigation (Clean Version) */}
        <div className="border-t border-gray-200 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-dark flex items-center">
              ticketz<span className="text-lime-600">.</span>
            </h1>
            
            <div className="flex gap-8 text-sm font-medium text-gray-500">
                <Link to="/about" className="hover:text-dark transition-colors">About</Link>
                <Link to="/discovery" className="hover:text-dark transition-colors">Events</Link>
                <Link to="/for-organizers" className="hover:text-dark transition-colors">Organizers</Link>
                <Link to="#" className="hover:text-dark transition-colors">Legal</Link>
            </div>
            
            <p className="text-xs text-gray-400 font-mono">
                © {new Date().getFullYear()} Ticketz Inc.
            </p>
        </div>
      </div>
    </footer>
  );
}