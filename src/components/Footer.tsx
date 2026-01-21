import { Link } from 'react-router-dom';
import { Twitter, Instagram, Github, Globe, ArrowRight, LayoutDashboard, Smartphone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark pt-20 pb-10 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="space-y-6 lg:max-w-sm">
                <Link to="/" className="font-sans text-2xl font-bold tracking-tight text-white flex items-center">
                  ticketz<span className="text-lime">.</span>
                </Link>
                <p className="text-gray-400 text-lg leading-relaxed">
                    The dual-sided platform for the culture. <br />
                    Find your scene. Or build it.
                </p>
            </div>

            {/* Links Section */}
            <div className="flex flex-col sm:flex-row gap-8 lg:gap-12">
                
                {/* Project Info */}
                <div>
                    <h4 className="font-serif text-white text-lg mb-6">The Project</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li>
                            <Link to="/about" className="hover:text-lime transition-colors flex items-center gap-2 group">
                                About this Project
                                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                            </Link>
                        </li>
                        <li>
                            <a href="https://github.com/ashkenazzio/ticketz-ui" target="_blank" rel="noopener noreferrer" className="hover:text-lime transition-colors">
                                Source Code
                            </a>
                        </li>
                        <li>
                            <a href="https://ashkenazzio.github.io" target="_blank" rel="noopener noreferrer" className="hover:text-lime transition-colors">
                                Developer Portfolio
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Explore Links */}
                <div>
                    <h4 className="font-serif text-white text-lg mb-6">Explore</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link to="/attendees" className="hover:text-lime transition-colors">For Attendees</Link></li>
                        <li><Link to="/organizers" className="hover:text-lime transition-colors">For Organizers</Link></li>
                        <li><Link to="/communities" className="hover:text-lime transition-colors">Communities</Link></li>
                        <li><Link to="/events" className="hover:text-lime transition-colors">Events</Link></li>
                    </ul>
                </div>
                
                {/* App Hub (Distinct Section) */}
                <div className="bg-white/5 rounded-sm p-6 border border-white/5">
                    <h4 className="font-serif text-white text-lg mb-4 flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-lime" />
                        App Hub
                    </h4>
                    <p className="text-xs text-gray-500 mb-6">
                        Access the functional application modules.
                    </p>
                    <ul className="space-y-3">
                        <li>
                            <Link to="/app" className="block w-full bg-lime text-dark text-center font-bold text-sm py-2.5 rounded-sm hover:bg-limehover transition-colors">
                                Launch Web App
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard" className="block w-full bg-surface text-white text-center font-bold text-sm py-2.5 rounded-sm border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                                <LayoutDashboard className="w-3 h-3" />
                                Organizer Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-gray-500 text-sm">
            <p className="font-mono">A concept project by <a href="https://ashkenazzio.github.io" target="_blank" rel="noopener noreferrer" className="text-white hover:text-lime transition-colors">Omri Ashkenazi</a></p>
            
            <div className="flex items-center gap-6 mt-6 md:mt-0">
                <a href="https://github.com/ashkenazzio" target="_blank" rel="noopener noreferrer" className="hover:text-lime transition-colors" title="GitHub">
                    <Github className="w-5 h-5" />
                </a>
                <a href="https://ashkenazzio.github.io" target="_blank" rel="noopener noreferrer" className="hover:text-lime transition-colors" title="Portfolio">
                    <Globe className="w-5 h-5" />
                </a>
            </div>
        </div>
      </div>
    </footer>
  );
}