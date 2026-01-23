import { useState, useEffect, useRef, useCallback, ReactNode } from 'react';

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  align?: 'left' | 'right';
  width?: string;
}

/**
 * Smart dropdown component that automatically positions itself
 * to avoid viewport overflow. Flips from bottom to top when needed.
 */
export default function Dropdown({
  trigger,
  children,
  className = '',
  align = 'right',
  width = 'w-40',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'bottom' | 'top'>('bottom');
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback(() => {
    if (!containerRef.current || !dropdownRef.current) return;

    const triggerRect = containerRef.current.getBoundingClientRect();
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const padding = 8;

    const spaceBelow = viewportHeight - triggerRect.bottom - padding;
    const spaceAbove = triggerRect.top - padding;

    if (spaceBelow < dropdownRect.height && spaceAbove > spaceBelow) {
      setPosition('top');
    } else {
      setPosition('bottom');
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        calculatePosition();
      });
    }
  }, [isOpen, calculatePosition]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const positionClasses =
    position === 'bottom' ? 'top-full mt-1' : 'bottom-full mb-1';

  const alignClasses = align === 'right' ? 'right-0' : 'left-0';

  return (
    <div ref={containerRef} className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            ref={dropdownRef}
            className={`absolute ${positionClasses} ${alignClasses} ${width} bg-surface border border-white/10 shadow-xl z-50 rounded-sm ${className}`}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'default' | 'danger';
  icon?: ReactNode;
}

export function DropdownItem({
  children,
  onClick,
  href,
  variant = 'default',
  icon,
}: DropdownItemProps) {
  const baseClasses =
    'flex items-center gap-2 px-4 py-2 text-sm transition-colors w-full text-left';
  const variantClasses =
    variant === 'danger'
      ? 'text-red-400 hover:bg-dark hover:text-red-300'
      : 'text-gray-300 hover:bg-dark hover:text-white';

  const content = (
    <>
      {icon && <span className="w-3.5 h-3.5">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${variantClasses}`}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      {content}
    </button>
  );
}
