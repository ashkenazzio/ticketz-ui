/**
 * Standardized role configuration for consistent styling across the app
 *
 * Role Hierarchy:
 * - Owner: Full access, financial data, cannot be removed
 * - Admin: Can manage events, members, settings (no financials)
 * - Moderator: Can manage members only
 * - Member: Regular community member
 */

export type CommunityRole = 'owner' | 'admin' | 'moderator' | 'member';
export type TeamRole = 'owner' | 'admin' | 'moderator';

interface RoleConfig {
  label: string;
  color: string;         // Tailwind text color
  bgColor: string;       // Tailwind background with opacity
  borderColor: string;   // Tailwind border color
}

export const roleConfig: Record<CommunityRole, RoleConfig> = {
  owner: {
    label: 'Owner',
    color: 'text-lime',
    bgColor: 'bg-lime/10',
    borderColor: 'border-lime/30',
  },
  admin: {
    label: 'Admin',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/30',
  },
  moderator: {
    label: 'Mod',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/30',
  },
  member: {
    label: 'Member',
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    borderColor: 'border-gray-400/30',
  },
};

/**
 * Get combined Tailwind classes for a role badge
 */
export const getRoleBadgeClasses = (role: CommunityRole): string => {
  const config = roleConfig[role];
  return `${config.color} ${config.bgColor}`;
};

/**
 * Get role label
 */
export const getRoleLabel = (role: CommunityRole): string => {
  return roleConfig[role].label;
};

export default roleConfig;
