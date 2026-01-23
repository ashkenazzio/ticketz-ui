import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ShowcaseSection from '../../components/design-system/ShowcaseSection';
import ComponentRow from '../../components/design-system/ComponentRow';
import { ColorTokens, TypographyTokens, ShadowTokens, SpacingTokens } from '../../components/design-system/DesignTokens';
import Avatar, { AvatarGroup } from '../../components/Avatar';
import StatusBadge, { BADGE_STATUSES } from '../../components/StatusBadge';
import { ToastDisplay } from '../../components/Toast';
import {
  SkeletonCard,
  SkeletonTicketCard,
  SkeletonOrderCard,
  SkeletonTable,
  SkeletonProfile,
  SkeletonCommunityCard,
  SkeletonStatsCard,
} from '../../components/Skeleton';
import '../../styles/design-system.css';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const badgeSizes = ['sm', 'md', 'lg'] as const;
const toastTypes = ['success', 'error', 'warning', 'info'] as const;
const borderColors = ['white', 'lime', 'surface'] as const;

// Sample avatar images
const sampleImages = [
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
];

export default function AtomsPage() {
  return (
    <div className="ds-page">
      <div className="ds-container">
        {/* Header */}
        <header className="mb-16">
          <Link
            to="/design-system"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-lime transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Design System</span>
          </Link>
          <div className="mb-4">
            <span className="text-xs font-mono text-lime uppercase tracking-widest">01 / Atoms</span>
          </div>
          <h1 className="font-display text-4xl uppercase tracking-tight mb-4">
            Atoms & Primitives
          </h1>
          <p className="text-gray-400 max-w-2xl">
            The foundational building blocks of the Ticketz design system. These are the smallest,
            indivisible UI elements that form the basis of all components.
          </p>
        </header>

        {/* ============================================
            DESIGN TOKENS
            ============================================ */}
        <ShowcaseSection
          title="Design Tokens"
          description="Core colors, typography, shadows, and spacing values"
        >
          <ComponentRow title="Color Palette">
            <ColorTokens />
          </ComponentRow>

          <ComponentRow title="Typography">
            <TypographyTokens />
          </ComponentRow>

          <ComponentRow title="Shadows">
            <ShadowTokens />
          </ComponentRow>

          <ComponentRow title="Spacing Scale">
            <SpacingTokens />
          </ComponentRow>
        </ShowcaseSection>

        {/* ============================================
            AVATAR
            ============================================ */}
        <ShowcaseSection
          title="Avatar"
          description="User profile images with multiple fallback states"
        >
          {/* With Image - All Sizes */}
          {sizes.map((size) => (
            <ComponentRow key={`avatar-img-${size}`} title={`Avatar - Size ${size.toUpperCase()} - With Image`}>
              <Avatar
                src={sampleImages[0]}
                name="John Doe"
                size={size}
              />
            </ComponentRow>
          ))}

          {/* With Initials - All Sizes */}
          {sizes.map((size) => (
            <ComponentRow key={`avatar-init-${size}`} title={`Avatar - Size ${size.toUpperCase()} - Initials Fallback`}>
              <Avatar
                name="Sarah Connor"
                size={size}
              />
            </ComponentRow>
          ))}

          {/* Icon Fallback - All Sizes */}
          {sizes.map((size) => (
            <ComponentRow key={`avatar-icon-${size}`} title={`Avatar - Size ${size.toUpperCase()} - Icon Fallback`}>
              <Avatar size={size} />
            </ComponentRow>
          ))}

          {/* Border Variants */}
          {borderColors.map((color) => (
            <ComponentRow key={`avatar-border-${color}`} title={`Avatar - Border ${color.charAt(0).toUpperCase() + color.slice(1)}`}>
              <Avatar
                src={sampleImages[0]}
                size="lg"
                showBorder
                borderColor={color}
              />
            </ComponentRow>
          ))}

          {/* Different Initials Colors */}
          <ComponentRow title="Avatar - Initials Color Variations" description="Colors are deterministically generated from name">
            <div className="flex flex-wrap gap-4">
              {['Alice B', 'Marcus W', 'Emma Stone', 'Tyler O', 'Nina R', 'Alex K', 'Jamie L', 'Chris P'].map((name) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <Avatar name={name} size="lg" />
                  <span className="text-xs text-gray-500">{name}</span>
                </div>
              ))}
            </div>
          </ComponentRow>

          {/* Avatar Group */}
          <ComponentRow title="Avatar Group - Default (max 4)">
            <AvatarGroup
              avatars={[
                { src: sampleImages[0], name: 'John' },
                { src: sampleImages[1], name: 'Sarah' },
                { name: 'Marcus' },
                { name: 'Emma' },
                { name: 'Tyler' },
                { name: 'Nina' },
              ]}
              max={4}
              size="md"
            />
          </ComponentRow>

          <ComponentRow title="Avatar Group - Small Size">
            <AvatarGroup
              avatars={[
                { src: sampleImages[0], name: 'John' },
                { src: sampleImages[1], name: 'Sarah' },
                { name: 'Marcus' },
              ]}
              max={5}
              size="sm"
            />
          </ComponentRow>

          <ComponentRow title="Avatar Group - Large Size">
            <AvatarGroup
              avatars={[
                { src: sampleImages[0], name: 'John' },
                { src: sampleImages[1], name: 'Sarah' },
                { name: 'Marcus' },
                { name: 'Emma' },
                { name: 'Tyler' },
              ]}
              max={3}
              size="lg"
            />
          </ComponentRow>
        </ShowcaseSection>

        {/* ============================================
            STATUS BADGE
            ============================================ */}
        <ShowcaseSection
          title="Status Badge"
          description="Semantic status indicators for tickets, orders, and events"
        >
          {/* All Statuses - Size SM */}
          <ComponentRow title="Status Badge - Size SM - All Statuses">
            <div className="flex flex-wrap gap-3">
              {BADGE_STATUSES.map((status) => (
                <StatusBadge key={status} status={status} size="sm" />
              ))}
            </div>
          </ComponentRow>

          {/* All Statuses - Size MD */}
          <ComponentRow title="Status Badge - Size MD - All Statuses">
            <div className="flex flex-wrap gap-3">
              {BADGE_STATUSES.map((status) => (
                <StatusBadge key={status} status={status} size="md" />
              ))}
            </div>
          </ComponentRow>

          {/* All Statuses - Size LG */}
          <ComponentRow title="Status Badge - Size LG - All Statuses">
            <div className="flex flex-wrap gap-3">
              {BADGE_STATUSES.map((status) => (
                <StatusBadge key={status} status={status} size="lg" />
              ))}
            </div>
          </ComponentRow>

          {/* Individual badges for each status at MD size for clarity */}
          {BADGE_STATUSES.map((status) => (
            <ComponentRow key={`badge-${status}`} title={`Status Badge - "${status}"`}>
              <div className="flex items-center gap-4">
                <StatusBadge status={status} size="sm" />
                <StatusBadge status={status} size="md" />
                <StatusBadge status={status} size="lg" />
              </div>
            </ComponentRow>
          ))}
        </ShowcaseSection>

        {/* ============================================
            TOAST NOTIFICATIONS
            ============================================ */}
        <ShowcaseSection
          title="Toast Notifications"
          description="Feedback messages for user actions"
        >
          {toastTypes.map((type) => (
            <ComponentRow key={`toast-${type}`} title={`Toast - ${type.charAt(0).toUpperCase() + type.slice(1)}`}>
              <div className="max-w-sm">
                <ToastDisplay
                  type={type}
                  message={`This is a ${type} notification message.`}
                />
              </div>
            </ComponentRow>
          ))}

          {/* With Action Button */}
          {toastTypes.map((type) => (
            <ComponentRow key={`toast-action-${type}`} title={`Toast - ${type.charAt(0).toUpperCase() + type.slice(1)} - With Action`}>
              <div className="max-w-sm">
                <ToastDisplay
                  type={type}
                  message={`This is a ${type} notification with an action button.`}
                  action={{ label: 'Undo' }}
                />
              </div>
            </ComponentRow>
          ))}
        </ShowcaseSection>

        {/* ============================================
            SKELETON LOADERS
            ============================================ */}
        <ShowcaseSection
          title="Skeleton Loaders"
          description="Loading state placeholders for content"
        >
          <ComponentRow title="Skeleton - Event Card">
            <div className="max-w-sm">
              <SkeletonCard />
            </div>
          </ComponentRow>

          <ComponentRow title="Skeleton - Ticket Card">
            <div className="max-w-md">
              <SkeletonTicketCard />
            </div>
          </ComponentRow>

          <ComponentRow title="Skeleton - Order Card">
            <div className="max-w-md">
              <SkeletonOrderCard />
            </div>
          </ComponentRow>

          <ComponentRow title="Skeleton - Community Card">
            <div className="max-w-sm">
              <SkeletonCommunityCard />
            </div>
          </ComponentRow>

          <ComponentRow title="Skeleton - Stats Card">
            <div className="max-w-xs">
              <SkeletonStatsCard />
            </div>
          </ComponentRow>

          <ComponentRow title="Skeleton - Profile">
            <div className="max-w-md">
              <SkeletonProfile />
            </div>
          </ComponentRow>

          <ComponentRow title="Skeleton - Table (3 rows, 4 columns)">
            <SkeletonTable rows={3} columns={4} />
          </ComponentRow>

          <ComponentRow title="Skeleton - Table (5 rows, 6 columns)">
            <SkeletonTable rows={5} columns={6} />
          </ComponentRow>
        </ShowcaseSection>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/5">
          <Link
            to="/design-system/molecules"
            className="inline-flex items-center gap-2 text-lime hover:text-limehover transition-colors"
          >
            <span>Next: Molecules</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </footer>
      </div>
    </div>
  );
}
