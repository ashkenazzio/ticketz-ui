import { Layers } from 'lucide-react';

export default function TechStack() {
  return (
    <section className="py-20 bg-[#0a0a0c] border-b border-white/5 text-center">
        <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-mono text-2xl text-white mb-12 flex items-center justify-center gap-3">
                <Layers className="w-5 h-5 text-lime" /> The Stack
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 bg-white/[0.02] border border-white/5 p-8 rounded-sm">
                <a href="https://skillicons.dev">
                    <img 
                        src="https://skillicons.dev/icons?i=react,nextjs,typescript,tailwind,nestjs,graphql,apollo,prisma,postgres,docker,githubactions" 
                        alt="Tech Stack" 
                        className="hover:scale-105 transition-transform duration-300"
                    />
                </a>
            </div>
            
            <p className="mt-8 text-gray-500 font-mono text-sm">
                Next.js 15 • NestJS 11 • Prisma 6 • PostgreSQL
            </p>
        </div>
    </section>
  );
}