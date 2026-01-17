import { Link } from 'react-router-dom';

export default function AppFooter() {
  return (
    <footer className="bg-dark border-t border-white/5 py-6 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/app" className="font-sans text-lg font-bold tracking-tight text-white">
          ticketz<span className="text-lime">.</span>
        </Link>

        {/* Legal Links */}
        <div className="flex items-center gap-6 text-xs text-gray-500">
          <Link to="/privacy" className="hover:text-gray-300 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-gray-300 transition-colors">
            Terms of Service
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} Ticketz
        </p>
      </div>
    </footer>
  );
}
