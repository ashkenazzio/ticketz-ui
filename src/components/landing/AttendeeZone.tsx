import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

export default function AttendeeZone() {
  return (
    <section className="py-24 bg-dark px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-lime font-mono text-xs uppercase tracking-widest mb-2 block">
            For Attendees
          </span>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-white">
            Find where <span className="relative inline-block"><span className="relative z-10 text-dark px-2">you</span><span className="absolute inset-0 bg-lime -skew-x-6 scale-x-95 rounded-sm translate-y-2"></span></span> fit in
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-4 h-auto md:h-[700px]">
          {/* Card 1: Workshops (Tall Left - 1x2) */}
          <Link
            to="/discovery/workshops"
            className="group md:col-span-1 md:row-span-2 relative rounded-sm overflow-hidden border border-white/10 bg-surface min-h-[280px]"
          >
            <img
              src={`${BASE}event-images/painting-workshop.jpg`}
              alt="Creative Workshops"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent"></div>

            <div className="absolute bottom-0 p-6 w-full">
              <h3 className="font-serif text-3xl text-white mb-2">
                Workshops
              </h3>
              <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                Pottery, coding, and craft.
              </p>
               <div className="w-8 h-8 rounded-full bg-lime flex items-center justify-center text-dark transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 absolute right-6 bottom-6">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Card 2: Nightlife (Big Center - 2x2) */}
          <Link
            to="/discovery/nightlife"
            className="group md:col-span-2 md:row-span-2 relative rounded-sm overflow-hidden border border-white/10 bg-surface min-h-[320px]"
          >
            <img
              src={`${BASE}event-images/techno-gathering.jpg`}
              alt="Nightlife & Parties"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent"></div>

            <div className="absolute bottom-0 p-6 w-full">
              <h3 className="font-serif text-3xl text-white mb-2">
                Nightlife & Parties
              </h3>
              <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                Underground raves, rooftop mixers, and secret sets.
              </p>
              <div className="w-8 h-8 rounded-full bg-lime flex items-center justify-center text-dark transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 absolute right-6 bottom-6">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Card 3: Fitness (Small Top Right - 1x1) */}
          <Link
            to="/discovery/fitness"
            className="group md:col-span-1 md:row-span-1 relative rounded-sm overflow-hidden border border-white/10 bg-surface min-h-[200px]"
          >
            <img
              src={`${BASE}event-images/running-event-2.jpg`}
              alt="Fitness & Wellness"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent"></div>

            <div className="absolute bottom-0 p-6 w-full">
              <h3 className="font-serif text-3xl text-white mb-2">
                Fitness
              </h3>
              <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                Run clubs & yoga.
              </p>
              <div className="w-8 h-8 rounded-full bg-lime flex items-center justify-center text-dark transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 absolute right-6 bottom-6">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Card 4: Tech (Small Bottom Right - 1x1) */}
          <Link
            to="/discovery/tech"
            className="group md:col-span-1 md:row-span-1 relative rounded-sm overflow-hidden border border-white/10 bg-surface min-h-[200px]"
          >
            <img
              src={`${BASE}event-images/startup-gathering.jpg`}
              alt="Tech & Startups"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent"></div>

            <div className="absolute bottom-0 p-6 w-full">
              <h3 className="font-serif text-3xl text-white mb-2">
                Tech
              </h3>
              <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                Hackathons & founders.
              </p>
              <div className="w-8 h-8 rounded-full bg-lime flex items-center justify-center text-dark transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 absolute right-6 bottom-6">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}