import { useState, useEffect, useRef, useCallback } from 'react';

interface DropdownPosition {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}

interface UseDropdownPositionOptions {
  offset?: number; // Distance from trigger element
  containerPadding?: number; // Minimum distance from viewport edge
}

interface UseDropdownPositionReturn {
  triggerRef: React.RefObject<HTMLElement>;
  dropdownRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
  position: DropdownPosition;
  positionClasses: string;
}

/**
 * Hook for smart dropdown positioning that prevents viewport overflow.
 * Automatically flips dropdown direction when it would overflow.
 */
export function useDropdownPosition(
  options: UseDropdownPositionOptions = {}
): UseDropdownPositionReturn {
  const { offset = 4, containerPadding = 8 } = options;

  const triggerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<DropdownPosition>({
    vertical: 'bottom',
    horizontal: 'right',
  });

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !dropdownRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Calculate available space in each direction
    const spaceBelow = viewportHeight - triggerRect.bottom - containerPadding;
    const spaceAbove = triggerRect.top - containerPadding;
    const spaceRight = viewportWidth - triggerRect.right - containerPadding;
    const spaceLeft = triggerRect.left - containerPadding;

    // Determine vertical position
    const vertical: 'top' | 'bottom' =
      spaceBelow >= dropdownRect.height || spaceBelow >= spaceAbove
        ? 'bottom'
        : 'top';

    // Determine horizontal position
    const horizontal: 'left' | 'right' =
      spaceRight >= dropdownRect.width || spaceRight >= spaceLeft
        ? 'right'
        : 'left';

    setPosition({ vertical, horizontal });
  }, [containerPadding]);

  // Recalculate position when dropdown opens
  useEffect(() => {
    if (isOpen) {
      // Use requestAnimationFrame to ensure dropdown is rendered before measuring
      requestAnimationFrame(() => {
        calculatePosition();
      });
    }
  }, [isOpen, calculatePosition]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
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

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Generate position classes for Tailwind
  const positionClasses = [
    'absolute',
    position.vertical === 'bottom' ? 'top-full mt-1' : 'bottom-full mb-1',
    position.horizontal === 'right' ? 'right-0' : 'left-0',
  ].join(' ');

  return {
    triggerRef,
    dropdownRef,
    isOpen,
    setIsOpen,
    toggle,
    position,
    positionClasses,
  };
}

/**
 * Get position classes for CSS-only hover dropdowns.
 * Call this function to get initial classes, then use JS to adjust if needed.
 */
export function getDropdownPositionClasses(
  element: HTMLElement | null,
  dropdownHeight: number = 200
): string {
  if (!element) {
    return 'absolute right-0 top-full mt-1';
  }

  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const spaceBelow = viewportHeight - rect.bottom - 8;

  const vertical = spaceBelow >= dropdownHeight ? 'top-full mt-1' : 'bottom-full mb-1';

  return `absolute right-0 ${vertical}`;
}

/**
 * Simple component wrapper for dropdown menus with auto-positioning
 */
export function calculateDropdownPosition(
  triggerElement: HTMLElement | null,
  dropdownElement: HTMLElement | null
): { top?: string; bottom?: string; transform?: string } {
  if (!triggerElement || !dropdownElement) {
    return {};
  }

  const triggerRect = triggerElement.getBoundingClientRect();
  const dropdownRect = dropdownElement.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  const spaceBelow = viewportHeight - triggerRect.bottom;
  const spaceAbove = triggerRect.top;

  if (spaceBelow < dropdownRect.height && spaceAbove > spaceBelow) {
    // Position above
    return {
      bottom: '100%',
      top: 'auto',
    };
  }

  // Position below (default)
  return {
    top: '100%',
    bottom: 'auto',
  };
}
