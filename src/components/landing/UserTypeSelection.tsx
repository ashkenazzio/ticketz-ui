import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserTypeSelection() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Path
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We build elite experiences for communities and enhance how you connect with the culture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Attendees Card */}
          <div className="bg-dark rounded-sm p-8 md:p-12 relative overflow-hidden flex flex-col border border-white/10 hover:border-lime/30 transition-colors duration-300">
            <div className="relative z-10 flex flex-col h-full">
                <h3 className="font-serif text-3xl text-white mb-2">For Attendees</h3>
                <p className="text-gray-400 mb-8 text-sm">
                    Ticketz helps you find your scene and become part of the culture.
                </p>

                <ul className="space-y-4 mb-10 flex-grow">
                    <li className="flex items-start gap-3 text-gray-300">
                        <Check className="w-5 h-5 text-lime flex-shrink-0 mt-0.5" />
                        <span>Discover niche events & parties</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                        <Check className="w-5 h-5 text-lime flex-shrink-0 mt-0.5" />
                        <span>Join communities & chat groups</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                        <Check className="w-5 h-5 text-lime flex-shrink-0 mt-0.5" />
                        <span>Secure digital wallet for tickets</span>
                    </li>
                </ul>

                <Link
                    to="/attendees"
                    className="inline-flex items-center justify-center w-full bg-lime text-dark font-bold text-lg py-4 rounded-sm hover:bg-limehover transition-colors"
                >
                    Explore Features
                </Link>
            </div>
          </div>

          {/* Organizers Card */}
          <div className="bg-dark rounded-sm p-8 md:p-12 relative overflow-hidden flex flex-col border border-white/10 hover:border-lime/30 transition-colors duration-300">
            <div className="relative z-10 flex flex-col h-full">
                <h3 className="font-serif text-3xl text-white mb-2">For Organizers</h3>
                <p className="text-gray-400 mb-8 text-sm">
                   Get your event ready and manage your community with ease.
                </p>

                <ul className="space-y-4 mb-10 flex-grow">
                    <li className="flex items-start gap-3 text-gray-300">
                        <Check className="w-5 h-5 text-lime flex-shrink-0 mt-0.5" />
                        <span>Real-time sales analytics</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                        <Check className="w-5 h-5 text-lime flex-shrink-0 mt-0.5" />
                        <span>Guest list management</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                        <Check className="w-5 h-5 text-lime flex-shrink-0 mt-0.5" />
                        <span>Own your member data</span>
                    </li>
                </ul>

                <Link
                    to="/organizers"
                    className="inline-flex items-center justify-center w-full bg-lime text-dark font-bold text-lg py-4 rounded-sm hover:bg-limehover transition-colors"
                >
                    Learn More
                </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
