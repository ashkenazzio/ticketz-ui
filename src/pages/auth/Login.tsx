import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="flex h-screen bg-dark text-white font-sans selection:bg-lime selection:text-black">
        
        {/* Left: Art / Texture */}
        <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#111]">
            <img 
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                alt="Art"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-lime/20 to-transparent mix-blend-soft-light"></div>
            <div className="relative z-10 p-12 flex flex-col justify-between h-full">
                <Link to="/" className="font-sans text-3xl font-bold tracking-tight text-white inline-block mb-2">
                    ticketz<span className="text-lime">.</span>
                </Link>
                <div>
                    <h1 className="font-serif text-6xl font-bold uppercase tracking-tighter leading-none mb-4">
                        Curate the<br/>Underground
                    </h1>
                    <p className="text-gray-400 max-w-md text-lg">
                        Join thousands of creators hosting the world's most immersive events.
                    </p>
                </div>
            </div>
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center lg:text-left">
                    <h2 className="font-serif text-4xl font-bold uppercase tracking-tighter text-white">Sign In</h2>
                    <p className="text-gray-400 mt-2">Enter your details to access your dashboard.</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-wide">Email Address</label>
                        <input type="email" className="w-full bg-dark border border-white/10 rounded-sm p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors" placeholder="alex@example.com" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                             <label className="block text-xs uppercase text-gray-500 font-bold tracking-wide">Password</label>
                             <a href="#" className="text-xs text-lime hover:underline">Forgot?</a>
                        </div>
                        <input type="password" className="w-full bg-dark border border-white/10 rounded-sm p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors" placeholder="••••••••" />
                    </div>

                    <Link to="/dashboard" className="block w-full bg-lime text-dark font-sans font-bold uppercase tracking-tight py-4 rounded-sm hover:bg-limehover transition-colors text-center">
                        Sign In
                    </Link>
                </div>

                <div className="text-center text-sm text-gray-500">
                    Don't have an account? <Link to="/auth/register" className="text-white font-medium hover:text-lime transition-colors">Apply for access</Link>
                </div>
            </div>
        </div>
    </div>
  );
}