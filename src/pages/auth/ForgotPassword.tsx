import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Check } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

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
              Reset Your<br />Password
            </h1>
            <p className="text-gray-400 max-w-md text-lg">
              Don't worry, it happens to the best of us.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface">
        <div className="w-full max-w-md space-y-8">
          {!isSubmitted ? (
            <>
              <div className="text-center lg:text-left">
                <Link
                  to="/auth/login"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </Link>
                <h2 className="font-serif text-4xl font-bold uppercase tracking-tighter text-white">
                  Forgot Password
                </h2>
                <p className="text-gray-400 mt-2">
                  Enter your email and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-dark border border-white/10 rounded-sm p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors"
                    placeholder="alex@example.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="block w-full bg-lime text-dark font-sans font-bold uppercase tracking-tight py-4 rounded-sm hover:bg-limehover transition-colors text-center"
                >
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-lime/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-lime" />
              </div>
              <h2 className="font-serif text-3xl font-bold uppercase tracking-tighter text-white mb-4">
                Check Your Inbox
              </h2>
              <p className="text-gray-400 mb-8">
                We've sent a password reset link to <span className="text-white font-medium">{email}</span>.
                Please check your email and follow the instructions.
              </p>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Didn't receive the email? Check your spam folder or
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-lime hover:text-limehover text-sm font-semibold uppercase tracking-wide"
                >
                  Try Again
                </button>
              </div>
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mt-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
