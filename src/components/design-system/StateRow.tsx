type ForcedState = 'default' | 'hover' | 'focus' | 'active' | 'disabled';

interface StateWrapperProps {
  state: ForcedState;
  label?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function StateWrapper({
  state,
  label = true,
  children,
  className = ''
}: StateWrapperProps) {
  const stateClasses: Record<ForcedState, string> = {
    default: '',
    hover: 'force-hover',
    focus: 'force-focus',
    active: 'force-active',
    disabled: 'force-disabled',
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <span className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 font-mono">
          {state}
        </span>
      )}
      <div className={stateClasses[state]}>
        {children}
      </div>
    </div>
  );
}

interface StateRowProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  bgStyle?: 'dark' | 'surface' | 'transparent';
}

export default function StateRow({
  title,
  description,
  children,
  bgStyle = 'surface'
}: StateRowProps) {
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

      {/* States Container */}
      <div className={`
        border border-white/5 rounded-sm p-6
        ${bgClasses[bgStyle]}
      `}>
        <div className="flex flex-wrap gap-8">
          {children}
        </div>
      </div>
    </div>
  );
}
