/**
 * Static version of NotFound for design system showcase.
 * Removes the fixed decorative border that would stick to viewport.
 */
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function StaticNotFound() {
  return (
    <div className="bg-dark min-h-screen text-white font-sans selection:bg-lime selection:text-black flex flex-col items-center justify-center p-6 relative">
      {/* Large 404 */}
      <div className="relative mb-8">
        <h1 className="font-display text-[12rem] md:text-[16rem] font-bold text-lime leading-none tracking-tighter select-none">
          404
        </h1>
        {/* Decorative glitch effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-display text-[12rem] md:text-[16rem] font-bold text-lime/20 leading-none tracking-tighter translate-x-2 translate-y-1">
            404
          </span>
        </div>
      </div>

      {/* Message */}
      <div className="text-center max-w-md mb-12">
        <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-2 bg-lime text-dark px-6 py-3 font-semibold uppercase text-sm tracking-wide hover:bg-limehover transition-colors cursor-pointer">
          <Home className="w-4 h-4" />
          Go Home
        </div>
        <div className="flex items-center gap-2 border border-white/30 text-white px-6 py-3 font-semibold uppercase text-sm tracking-wide hover:border-lime hover:text-lime transition-colors cursor-pointer">
          <Search className="w-4 h-4" />
          Explore Events
        </div>
      </div>

      {/* Back link */}
      <button className="mt-8 flex items-center gap-2 text-gray-500 hover:text-white text-sm uppercase tracking-wide transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Go Back
      </button>

      {/* Decorative border frame - positioned absolute within container instead of fixed */}
      <div className="absolute inset-4 border-2 border-lime/10 pointer-events-none" />
    </div>
  );
}
