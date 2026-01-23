import { Link } from 'react-router-dom';
import { Layers, Box, Layout, FileText, Megaphone } from 'lucide-react';
import '../../styles/design-system.css';

const pages = [
  {
    title: 'Full Pages',
    description: 'All application pages rendered with their layouts (public, app, dashboard)',
    href: '/design-system/pages',
    icon: FileText,
    count: '~35 pages'
  },
  {
    title: 'Atoms',
    description: 'Foundational elements: design tokens, avatars, badges, toasts, skeletons',
    href: '/design-system/atoms',
    icon: Layers,
    count: '~50 variations'
  },
  {
    title: 'Molecules',
    description: 'Composed components: cards, empty states, form elements',
    href: '/design-system/molecules',
    icon: Box,
    count: '~40 variations'
  },
  {
    title: 'Organisms',
    description: 'Complex components: navigation, modals, footers, dashboard elements',
    href: '/design-system/organisms',
    icon: Layout,
    count: '~35 variations'
  },
  {
    title: 'Marketing Sections',
    description: 'Full-width page sections: heroes, features, CTAs from all marketing pages',
    href: '/design-system/marketing',
    icon: Megaphone,
    count: '~35 sections'
  }
];

export default function DesignSystemIndex() {
  return (
    <div className="ds-page">
      <div className="ds-container">
        {/* Header */}
        <header className="mb-16">
          <div className="mb-4">
            <span className="text-xs font-mono text-lime uppercase tracking-widest">Ticketz UI</span>
          </div>
          <h1 className="font-display text-5xl uppercase tracking-tight mb-4">
            Design System
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            A comprehensive showcase of all UI components, states, and pages.
            Built for export to Figma via html.to.design.
          </p>
        </header>

        {/* Page Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.href}
                to={page.href}
                className="group block p-8 border border-white/10 rounded-sm bg-surface/30 hover:border-lime/30 hover:bg-surface/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-lime/10 rounded-sm group-hover:bg-lime/20 transition-colors">
                    <Icon className="w-6 h-6 text-lime" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-xl uppercase tracking-tight text-white mb-2 group-hover:text-lime transition-colors">
                      {page.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-3">
                      {page.description}
                    </p>
                    <span className="text-xs font-mono text-gray-500">
                      {page.count}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            Use html.to.design plugin to import these pages into Figma
          </p>
        </footer>
      </div>
    </div>
  );
}
