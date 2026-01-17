import { FileJson, FileCode } from 'lucide-react';

export default function TypeSafetySection() {
  return (
    <section className="py-24 bg-darker border-b border-white/5">
         <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10 rounded-sm overflow-hidden bg-dark">
                
                {/* Left Pane: Backend DTO */}
                <div className="p-6 border-b lg:border-b-0 lg:border-r border-white/10 relative">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
                    <div className="flex items-center gap-2 mb-4 text-blue-400 font-mono text-sm">
                        <FileCode className="w-4 h-4" />
                        user.entity.ts
                    </div>
                    <pre className="font-mono text-xs md:text-sm text-gray-400 leading-relaxed">
                        <span className="text-purple-400">export class</span> <span className="text-yellow-200">UserDTO</span> {'{'}<br/>
                        &nbsp;&nbsp;<span className="text-blue-300">@Field</span>()<br/>
                        &nbsp;&nbsp;id: <span className="text-red-300">string</span>;<br/><br/>
                        &nbsp;&nbsp;<span className="text-blue-300">@Field</span>()<br/>
                        &nbsp;&nbsp;email: <span className="text-red-300">string</span>;<br/>
                        {'}'}
                    </pre>
                </div>

                {/* Right Pane: Frontend Usage */}
                <div className="p-6 relative">
                     <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-lime to-transparent"></div>
                     <div className="flex items-center gap-2 mb-4 text-lime font-mono text-sm">
                        <FileCode className="w-4 h-4" />
                        UserProfile.tsx
                    </div>
                     <pre className="font-mono text-xs md:text-sm text-gray-400 leading-relaxed">
                        <span className="text-purple-400">const</span> {'{ data }'} = <span className="text-yellow-200">useQuery</span>&lt;<span className="text-yellow-200">UserQuery</span>&gt;();<br/><br/>
                        <span className="text-gray-500">// Fully Typed!</span><br/>
                        <span className="text-purple-400">return</span> &lt;<span className="text-blue-300">div</span>&gt;{'{'}data?.user.<span className="text-lime underline decoration-wavy decoration-lime/30">email</span>{'}'}&lt;/<span className="text-blue-300">div</span>&gt;;
                    </pre>
                </div>

            </div>

             <div className="mt-8 text-center">
                <h3 className="text-white font-mono text-xl mb-2">Contract-First (Schema-First)</h3>
                <p className="text-gray-500 font-mono text-sm max-w-2xl mx-auto">
                    We define the GraphQL Schema (SDL) <b>before</b> writing code. The frontend generates TypeScript types via <span className="text-lime">graphql-codegen</span> to ensure 100% type safety across the network boundary.
                </p>
            </div>
         </div>
    </section>
  );
}