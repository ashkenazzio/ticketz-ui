import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Ticket, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AppSplash() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [status, setStatus] = useState<'loading' | 'ready'>('loading');

  // Get intended destination from state or default to /app
  const destination = (location.state as { from?: string })?.from || '/app';

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setStatus('ready');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === 'ready') {
      // Small delay after "ready" to show the success state
      const navTimer = setTimeout(() => {
        navigate(destination, { replace: true });
      }, 500);
      return () => clearTimeout(navTimer);
    }
  }, [status, navigate, destination]);

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-lime/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-lime/20">
            <Ticket className="w-10 h-10 text-lime" />
          </div>
          <h1 className="font-sans text-3xl font-bold tracking-tight text-white">
            ticketz<span className="text-lime">.</span>
          </h1>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center gap-3 text-gray-400">
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-lime" />
              <span className="text-sm uppercase tracking-wide">
                {isAuthenticated ? 'Loading your experience...' : 'Preparing app...'}
              </span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 bg-lime rounded-full animate-pulse"></span>
              <span className="text-sm uppercase tracking-wide text-lime">Ready</span>
            </>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-48 h-1 bg-surface mx-auto rounded-full overflow-hidden">
          <div
            className={`h-full bg-lime transition-all duration-1500 ease-out ${
              status === 'loading' ? 'w-2/3' : 'w-full'
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
}
