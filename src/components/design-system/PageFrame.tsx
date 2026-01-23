interface PageFrameProps {
  title: string;
  route: string;
  children: React.ReactNode;
  description?: string;
}

export default function PageFrame({
  title,
  route,
  children,
  description
}: PageFrameProps) {
  return (
    <div className="mb-24">
      {/* Page Header */}
      <div className="mb-4 pb-4 border-b border-white/10">
        <h3 className="font-display text-xl uppercase tracking-tight text-white">
          {title}
        </h3>
        <code className="text-xs font-mono text-lime">{route}</code>
        {description && (
          <p className="text-sm text-gray-400 mt-2">{description}</p>
        )}
      </div>

      {/* Page Container */}
      <div className="border border-white/10 rounded-sm overflow-hidden bg-dark">
        {/* Browser chrome mockup */}
        <div className="h-10 bg-surface border-b border-white/10 flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <div className="flex-1 ml-4">
            <div className="bg-dark/50 rounded-sm px-3 py-1.5 text-xs text-gray-500 font-mono max-w-md">
              ticketz.app{route}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
