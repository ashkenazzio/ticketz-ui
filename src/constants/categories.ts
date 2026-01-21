import { Music, Code, Dumbbell, Palette, Users, Sparkles, Heart, Utensils, Trophy, Gamepad2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
}

/**
 * Unified categories for events and communities across the platform.
 * These categories are intentionally high-level to cover niche events without
 * being overly specific (e.g., 'Music' instead of individual genres).
 */
export const CATEGORIES: Category[] = [
  { id: 'music', label: 'Music', icon: Music },
  { id: 'tech', label: 'Tech', icon: Code },
  { id: 'fitness', label: 'Fitness', icon: Dumbbell },
  { id: 'creative', label: 'Creative', icon: Palette },
  { id: 'social', label: 'Social', icon: Users },
  { id: 'wellness', label: 'Wellness', icon: Heart },
  { id: 'food', label: 'Food & Drink', icon: Utensils },
  { id: 'sports', label: 'Sports', icon: Trophy },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
];

/**
 * Categories with an "All" option prepended for filter UIs
 */
export const CATEGORIES_WITH_ALL: Category[] = [
  { id: 'all', label: 'All', icon: Sparkles },
  ...CATEGORIES,
];

/**
 * Get a category by its ID
 */
export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(cat => cat.id === id);
}

/**
 * Get category label by ID, returns 'Other' if not found
 */
export function getCategoryLabel(id: string): string {
  return getCategoryById(id)?.label || 'Other';
}
