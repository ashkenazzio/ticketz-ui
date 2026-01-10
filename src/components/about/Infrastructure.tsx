import { Container, Cloud, GitBranch } from 'lucide-react';

export default function Infrastructure() {
  return (
    <section className="py-24 px-6 border-b border-white/5 bg-[#0d1216]">
        <div className="max-w-5xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Docker */}
                <div className="p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-sm text-center group">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/20 transition-colors">
                        <Container className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="font-mono text-lg font-bold text-white mb-3">Orchestration</h3>
                    <p className="text-gray-500 text-sm font-mono leading-relaxed">
                        <b>Docker + Docker Compose</b>. Orchestrating API, Frontend, and Postgres DB into a single reproducible environment.
                    </p>
                </div>

                 {/* CI/CD */}
                <div className="p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-sm text-center group">
                     <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500/20 transition-colors">
                        <GitBranch className="w-8 h-8 text-orange-400" />
                    </div>
                    <h3 className="font-mono text-lg font-bold text-white mb-3">CI/CD</h3>
                    <p className="text-gray-500 text-sm font-mono leading-relaxed">
                        <b>GitHub Actions</b> automated pipelines for linting, testing, and continuous deployment to the cloud.
                    </p>
                </div>

                 {/* Database */}
                <div className="p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-sm text-center group">
                     <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500/20 transition-colors">
                        <Cloud className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="font-mono text-lg font-bold text-white mb-3">Data Layer</h3>
                    <p className="text-gray-500 text-sm font-mono leading-relaxed">
                        <b>PostgreSQL + Prisma 6</b>. Robust, ACID-compliant storage with strictly typed schema definitions.
                    </p>
                </div>

             </div>
        </div>
    </section>
  );
}