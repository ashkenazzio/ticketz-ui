import { Database, ShieldCheck, Server, ArrowRight } from 'lucide-react';

export default function ArchitectureDiagram() {
  return (
    <section className="py-24 px-4 bg-dark border-b border-white/5">
        <div className="max-w-7xl mx-auto">
            <h2 className="font-mono text-3xl text-white mb-8 text-center">
                <span className="text-gray-600">//</span> Core Architecture
            </h2>
            <p className="text-gray-500 font-mono text-center mb-16 max-w-2xl mx-auto text-sm">
                Independent deployment pipelines using a <b>Two-Repository Strategy</b> to mimic enterprise separation of concerns.
            </p>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 relative">
                
                {/* Step 1: Client */}
                <div className="w-full lg:w-1/4 p-6 border border-white/10 bg-white/5 rounded-sm hover:border-lime/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-4 text-gray-300 group-hover:text-white">
                        <Server className="w-5 h-5" />
                        <span className="font-mono font-bold text-sm">Next.js 15.2</span>
                    </div>
                    <p className="text-gray-500 text-[11px] font-mono mb-4 uppercase">App Router + React 19</p>
                    <div className="bg-black p-3 rounded text-[10px] font-mono text-green-400 border border-white/10">
                        query GetEvent {'{'} <br/>
                        &nbsp;&nbsp;title <br/>
                        &nbsp;&nbsp;capacity <br/>
                        {'}'}
                    </div>
                </div>

                {/* Arrow */}
                <ArrowRight className="text-gray-600 w-6 h-6 rotate-90 lg:rotate-0" />

                {/* Step 2: Gateway / NestJS */}
                <div className="w-full lg:w-1/3 p-6 border border-lime/20 bg-lime/5 rounded-sm relative group">
                    <div className="absolute -top-3 left-6 bg-lime text-dark text-[10px] font-bold px-2 py-0.5 uppercase">NestJS 11</div>
                    <div className="flex items-center gap-3 mb-4 text-lime">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="font-mono font-bold text-sm">API Layer (LTS)</span>
                    </div>
                    
                    <div className="space-y-2">
                         <div className="group/tooltip relative bg-dark border border-white/10 p-2 rounded text-[11px] font-mono text-gray-300 hover:border-lime/50 cursor-help transition-colors">
                            RBAC (JWT + Permissions)
                            <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-gray-800 text-white text-[10px] rounded hidden group-hover/tooltip:block z-20 shadow-xl border border-white/10">
                                Multi-Role System: Attendee, Organizer, Admin.
                            </div>
                        </div>
                         <div className="bg-dark border border-white/10 p-2 rounded text-[11px] font-mono text-gray-300">
                            Modular Dependency Injection
                        </div>
                    </div>
                </div>

                {/* Arrow */}
                <ArrowRight className="text-gray-600 w-6 h-6 rotate-90 lg:rotate-0" />

                 {/* Step 3: DB */}
                <div className="w-full lg:w-1/4 p-6 border border-white/10 bg-white/5 rounded-sm hover:border-blue-400/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-4 text-gray-300 group-hover:text-blue-400">
                        <Database className="w-5 h-5" />
                        <span className="font-mono font-bold text-sm">Prisma 6</span>
                    </div>
                    <p className="text-gray-500 text-[11px] font-mono mb-4 uppercase">PostgreSQL + pnpm</p>
                    <div className="bg-black p-3 rounded text-[10px] font-mono text-blue-300 border border-white/10 opacity-70">
                        enum UserRole {'{'} <br/>
                        &nbsp;&nbsp;ADMIN <br/>
                        &nbsp;&nbsp;ORGANIZER <br/>
                        {'}'}
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
}