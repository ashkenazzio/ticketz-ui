interface ComponentRowProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  bgStyle?: 'dark' | 'surface' | 'transparent';
  noPadding?: boolean;
  fullWidth?: boolean;
}

export default function ComponentRow({
  title,
  description,
  children,
  bgStyle = 'surface',
  noPadding = false,
  fullWidth = false
}: ComponentRowProps) {
  const bgClasses = {
    dark: 'bg-dark',
    surface: 'bg-surface/50',
    transparent: 'bg-transparent'
  };

  return (
    <div className="space-y-3">
      {/* Label */}
      <div>
        <h3 className="text-sm font-mono text-lime uppercase tracking-wider">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>

      {/* Component Container */}
      <div className={`
        ${fullWidth ? '' : 'border border-white/5 rounded-sm'}
        ${bgClasses[bgStyle]}
        ${noPadding ? '' : 'p-6'}
        ${fullWidth ? 'overflow-hidden' : ''}
      `}>
        {children}
      </div>
    </div>
  );
}
