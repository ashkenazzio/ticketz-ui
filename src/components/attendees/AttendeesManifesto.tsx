export default function AttendeesManifesto() {
  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-8">
          Experiences are better when they’re <span className="text-lime">shared.</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 font-sans font-light leading-relaxed max-w-2xl mx-auto">
          Whether you're looking to sweat, code, or dance, Ticketz connects you to the communities that share your obsession.
        </p>
      </div>
      
      {/* Subtle Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime/5 blur-[120px] rounded-full pointer-events-none"></div>
    </section>
  );
}
