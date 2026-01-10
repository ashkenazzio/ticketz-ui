import { HandMetal } from 'lucide-react';

export default function NoAIBadge() {
  return (
    <section className="py-32 bg-black text-center flex flex-col items-center justify-center">
        <div className="border-4 border-white/20 p-8 md:p-12 max-w-2xl relative">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white"></div>

            <HandMetal className="w-12 h-12 text-white mx-auto mb-6" />
            
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-white uppercase tracking-widest mb-4">
                Human Written Code
            </h2>
            
            <p className="text-gray-400 font-mono text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                In an era of generated boilerplate, every line of logic in Ticketz was architected, written, and debugged by a human. This project is a testament to fundamental engineering principles.
            </p>
        </div>
    </section>
  );
}