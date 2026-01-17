import { Terminal, Cpu } from 'lucide-react';

export default function AboutHero() {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-darker overflow-hidden border-b border-white/10">
        {/* Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <h1 className="font-mono text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
                Architecture.<br/>
                <span className="text-lime">Scalability.</span> Craft.
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-mono leading-relaxed">
                Ticketz is a high-scale event management platform built to demonstrate senior-level engineering capabilities: Advanced RBAC, Event-Driven Architecture, and production-ready DevOps patterns.
            </p>

             <div className="flex items-center justify-center gap-4 pt-8 opacity-60">
                 <Cpu className="w-12 h-12 text-gray-600 animate-pulse" />
             </div>
        </div>
    </section>
  );
}