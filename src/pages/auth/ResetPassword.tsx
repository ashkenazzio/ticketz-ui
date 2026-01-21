import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Eye, EyeOff } from 'lucide-react';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
  ];

  const allRequirementsMet = passwordRequirements.every(req => req.met);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!allRequirementsMet) {
      setError('Please meet all password requirements');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitted(true);
  };

  const handleContinue = () => {
    navigate('/auth/login');
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
              Create New<br />Password
            </h1>
            <p className="text-gray-400 max-w-md text-lg">
              Choose a strong password to keep your account secure.
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
                  Reset Password
                </h2>
                <p className="text-gray-400 mt-2">
                  Enter your new password below.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-wide">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-dark border border-white/10 rounded-sm p-4 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors"
                      placeholder="Enter new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Password Requirements */}
                  <div className="mt-3 space-y-2">
                    {passwordRequirements.map((req, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 text-xs ${
                          req.met ? 'text-lime' : 'text-gray-500'
                        }`}
                      >
                        <Check className={`w-3 h-3 ${req.met ? 'opacity-100' : 'opacity-30'}`} />
                        {req.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-2 font-bold tracking-wide">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full bg-dark border rounded-sm p-4 pr-12 text-white placeholder-gray-600 focus:outline-none transition-colors ${
                        confirmPassword
                          ? passwordsMatch
                            ? 'border-lime'
                            : 'border-red-500'
                          : 'border-white/10 focus:border-lime'
                      }`}
                      placeholder="Confirm new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {confirmPassword && !passwordsMatch && (
                    <p className="text-red-400 text-xs mt-2">Passwords do not match</p>
                  )}
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 p-3 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="block w-full bg-lime text-dark font-sans font-bold uppercase tracking-tight py-4 rounded-sm hover:bg-limehover transition-colors text-center"
                >
                  Reset Password
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-lime/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-lime" />
              </div>
              <h2 className="font-serif text-3xl font-bold uppercase tracking-tighter text-white mb-4">
                Password Reset!
              </h2>
              <p className="text-gray-400 mb-8">
                Your password has been successfully reset. You can now sign in with your new password.
              </p>
              <button
                onClick={handleContinue}
                className="block w-full bg-lime text-dark font-sans font-bold uppercase tracking-tight py-4 rounded-sm hover:bg-limehover transition-colors text-center"
              >
                Continue to Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
