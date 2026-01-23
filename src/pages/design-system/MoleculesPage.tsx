import { Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, Users, Ticket } from 'lucide-react';
import ShowcaseSection from '../../components/design-system/ShowcaseSection';
import ComponentRow from '../../components/design-system/ComponentRow';
import StateRow, { StateWrapper } from '../../components/design-system/StateRow';
import TicketCard from '../../components/TicketCard';
import OrderCard from '../../components/OrderCard';
import MemberCard from '../../components/MemberCard';
import FriendRequestCard from '../../components/FriendRequestCard';
import StatCard from '../../components/dashboard/StatCard';
import EmptyState from '../../components/EmptyState';
import '../../styles/design-system.css';

// Sample data
const sampleEventImage = 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&q=80';
const sampleAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80';
const sampleAvatar2 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80';

const ticketCardProps = {
  id: 'TKT-001',
  eventName: 'Electric Garden Festival',
  eventDate: 'Mar 15, 2025',
  eventTime: '8:00 PM',
  venue: 'Warehouse 42, Brooklyn NY',
  ticketTier: 'VIP Access',
  eventImage: sampleEventImage,
  eventId: 'evt-123',
};

const orderCardProps = {
  id: 'ORD-2024-001',
  eventName: 'Electric Garden Festival',
  eventImage: sampleEventImage,
  orderDate: 'Jan 15, 2025',
  ticketCount: 2,
  total: '$150.00',
};

const memberCardProps = {
  id: 'user-1',
  name: 'Sarah Connor',
  avatar: sampleAvatar,
  mutualFriends: 12,
  mutualCommunities: 3,
};

const friendRequestProps = {
  id: 'req-1',
  userId: 'user-2',
  name: 'Marcus Johnson',
  avatar: sampleAvatar2,
  mutualFriends: 5,
  mutualCommunities: 2,
  requestDate: '2 hours ago',
};

const emptyStateVariants = [
  'no-tickets',
  'no-orders',
  'no-communities',
  'no-events',
  'no-saved',
  'no-results',
  'no-members',
  'no-guests',
  'error',
] as const;

const memberRoles = ['owner', 'admin', 'moderator', 'member'] as const;
const friendStatuses = ['none', 'pending', 'friends'] as const;


export default function MoleculesPage() {
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
            <span className="text-xs font-mono text-lime uppercase tracking-widest">02 / Molecules</span>
          </div>
          <h1 className="font-display text-4xl uppercase tracking-tight mb-4">
            Molecules
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Composed components built from atoms. These include cards, form elements,
            and other reusable UI patterns.
          </p>
        </header>

        {/* ============================================
            TICKET CARD
            ============================================ */}
        <ShowcaseSection
          title="Ticket Card"
          description="Displays a ticket with event info, QR code hover, and status"
        >
          <ComponentRow title="Ticket Card - Active (Valid) - Default State">
            <>
              <div className="max-w-md">
                <TicketCard {...ticketCardProps} status="valid" />
              </div>
            </>
          </ComponentRow>

          <ComponentRow title="Ticket Card - Active (Valid) - Hover State">
            <>
              <div className="max-w-md force-hover">
                <div className="group">
                  <TicketCard {...ticketCardProps} status="valid" />
                </div>
              </div>
            </>
          </ComponentRow>

          <ComponentRow title="Ticket Card - Used Status">
            <>
              <div className="max-w-md">
                <TicketCard {...ticketCardProps} status="used" />
              </div>
            </>
          </ComponentRow>

          <ComponentRow title="Ticket Card - Transferred Status">
            <>
              <div className="max-w-md">
                <TicketCard {...ticketCardProps} status="transferred" />
              </div>
            </>
          </ComponentRow>

          <ComponentRow title="Ticket Card - Expired Status">
            <>
              <div className="max-w-md">
                <TicketCard {...ticketCardProps} status="expired" />
              </div>
            </>
          </ComponentRow>

          <StateRow title="Ticket Card - State Comparison">
            <>
              <div className="flex flex-wrap gap-6">
                <StateWrapper state="default" className="max-w-md">
                  <TicketCard {...ticketCardProps} status="valid" />
                </StateWrapper>
                <StateWrapper state="hover" className="max-w-md">
                  <div className="group">
                    <TicketCard {...ticketCardProps} status="valid" />
                  </div>
                </StateWrapper>
              </div>
            </>
          </StateRow>
        </ShowcaseSection>

        {/* ============================================
            ORDER CARD
            ============================================ */}
        <ShowcaseSection
          title="Order Card"
          description="Displays a purchase order with event details"
        >
          <ComponentRow title="Order Card - Approved Status - Default">
            <>
              <div className="max-w-md">
                <OrderCard {...orderCardProps} status="approved" />
              </div>
            </>
          </ComponentRow>

          <ComponentRow title="Order Card - Approved Status - Hover">
            <>
              <div className="max-w-md force-hover">
                <OrderCard {...orderCardProps} status="approved" />
              </div>
            </>
          </ComponentRow>

          <ComponentRow title="Order Card - Pending Status">
            <>
              <div className="max-w-md">
                <OrderCard {...orderCardProps} status="pending" />
              </div>
            </>
          </ComponentRow>

          <ComponentRow title="Order Card - Cancelled Status">
            <>
              <div className="max-w-md">
                <OrderCard {...orderCardProps} status="cancelled" />
              </div>
            </>
          </ComponentRow>

          <StateRow title="Order Card - State Comparison">
            <>
              <div className="flex flex-wrap gap-6">
                <StateWrapper state="default" className="max-w-md">
                  <OrderCard {...orderCardProps} status="approved" />
                </StateWrapper>
                <StateWrapper state="hover" className="max-w-md">
                  <OrderCard {...orderCardProps} status="approved" />
                </StateWrapper>
              </div>
            </>
          </StateRow>
        </ShowcaseSection>

        {/* ============================================
            MEMBER CARD
            ============================================ */}
        <ShowcaseSection
          title="Member Card"
          description="User profile card with roles and friend status"
        >
          {/* Standard variants by role */}
          {memberRoles.map((role) => (
            <ComponentRow key={`member-${role}`} title={`Member Card - Standard - Role: ${role}`}>
              <>
                <div className="max-w-sm">
                  <MemberCard
                    {...memberCardProps}
                    role={role}
                    friendStatus="none"
                    onAddFriend={() => {}}
                  />
                </div>
              </>
            </ComponentRow>
          ))}

          {/* Friend status variants */}
          {friendStatuses.map((status) => (
            <ComponentRow key={`member-friend-${status}`} title={`Member Card - Friend Status: ${status}`}>
              <>
                <div className="max-w-sm">
                  <MemberCard
                    {...memberCardProps}
                    role="member"
                    friendStatus={status}
                    onAddFriend={() => {}}
                  />
                </div>
              </>
            </ComponentRow>
          ))}

          {/* Compact variants */}
          {memberRoles.map((role) => (
            <ComponentRow key={`member-compact-${role}`} title={`Member Card - Compact - Role: ${role}`}>
              <>
                <div className="max-w-sm">
                  <MemberCard
                    {...memberCardProps}
                    role={role}
                    friendStatus="none"
                    compact
                    onAddFriend={() => {}}
                  />
                </div>
              </>
            </ComponentRow>
          ))}

          {/* Compact friend status variants */}
          {friendStatuses.map((status) => (
            <ComponentRow key={`member-compact-friend-${status}`} title={`Member Card - Compact - Friend Status: ${status}`}>
              <>
                <div className="max-w-sm">
                  <MemberCard
                    {...memberCardProps}
                    role="member"
                    friendStatus={status}
                    compact
                    onAddFriend={() => {}}
                  />
                </div>
              </>
            </ComponentRow>
          ))}

          <ComponentRow title="Member Card - Hover State">
            <>
              <div className="max-w-sm force-hover">
                <MemberCard
                  {...memberCardProps}
                  role="member"
                  friendStatus="none"
                  onAddFriend={() => {}}
                />
              </div>
            </>
          </ComponentRow>
        </ShowcaseSection>

        {/* ============================================
            FRIEND REQUEST CARD
            ============================================ */}
        <ShowcaseSection
          title="Friend Request Card"
          description="Incoming and outgoing friend request displays"
        >
          <ComponentRow title="Friend Request Card - Incoming">
            <>
              <div className="max-w-sm">
                <FriendRequestCard
                  {...friendRequestProps}
                  type="incoming"
                  onAccept={() => {}}
                  onDecline={() => {}}
                />
              </div>
            </>
          </ComponentRow>

          <ComponentRow title="Friend Request Card - Outgoing">
            <>
              <div className="max-w-sm">
                <FriendRequestCard
                  {...friendRequestProps}
                  type="outgoing"
                  onCancel={() => {}}
                />
              </div>
            </>
          </ComponentRow>
        </ShowcaseSection>

        {/* ============================================
            STAT CARD
            ============================================ */}
        <ShowcaseSection
          title="Stat Card"
          description="Dashboard KPI metric display"
        >
          <ComponentRow title="Stat Card - Basic (No Trend)">
            <div className="max-w-xs">
              <StatCard
                label="Total Sales"
                value="$12,450"
              />
            </div>
          </ComponentRow>

          <ComponentRow title="Stat Card - With Trend Up">
            <div className="max-w-xs">
              <StatCard
                label="Total Sales"
                value="$12,450"
                trend="+12%"
                trendUp={true}
              />
            </div>
          </ComponentRow>

          <ComponentRow title="Stat Card - With Trend Down">
            <div className="max-w-xs">
              <StatCard
                label="Refunds"
                value="$890"
                trend="-5%"
                trendUp={false}
              />
            </div>
          </ComponentRow>

          <ComponentRow title="Stat Card - With Background Icon">
            <div className="max-w-xs">
              <StatCard
                label="Ticket Sales"
                value="1,234"
                trend="+8%"
                trendUp={true}
              >
                <Ticket className="w-24 h-24" />
              </StatCard>
            </div>
          </ComponentRow>

          <ComponentRow title="Stat Card - Revenue with Icon">
            <div className="max-w-xs">
              <StatCard
                label="Revenue"
                value="$45,200"
                trend="+22%"
                trendUp={true}
              >
                <DollarSign className="w-24 h-24" />
              </StatCard>
            </div>
          </ComponentRow>

          <ComponentRow title="Stat Card - Attendees with Icon">
            <div className="max-w-xs">
              <StatCard
                label="Attendees"
                value="856"
                trend="+15%"
                trendUp={true}
              >
                <Users className="w-24 h-24" />
              </StatCard>
            </div>
          </ComponentRow>

          <ComponentRow title="Stat Card - Hover State">
            <div className="max-w-xs force-hover">
              <StatCard
                label="Total Sales"
                value="$12,450"
                trend="+12%"
                trendUp={true}
              />
            </div>
          </ComponentRow>

          <StateRow title="Stat Card - State Comparison">
            <StateWrapper state="default" className="w-64">
              <StatCard
                label="Revenue"
                value="$12,450"
                trend="+12%"
                trendUp={true}
              />
            </StateWrapper>
            <StateWrapper state="hover" className="w-64">
              <StatCard
                label="Revenue"
                value="$12,450"
                trend="+12%"
                trendUp={true}
              />
            </StateWrapper>
          </StateRow>
        </ShowcaseSection>

        {/* ============================================
            EMPTY STATE
            ============================================ */}
        <ShowcaseSection
          title="Empty State"
          description="Contextual empty state displays for various scenarios"
        >
          {emptyStateVariants.map((variant) => (
            <ComponentRow key={`empty-${variant}`} title={`Empty State - ${variant}`}>
              <>
                <EmptyState variant={variant} />
              </>
            </ComponentRow>
          ))}
        </ShowcaseSection>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/5 flex justify-between">
          <Link
            to="/design-system/atoms"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-lime transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Atoms</span>
          </Link>
          <Link
            to="/design-system/organisms"
            className="inline-flex items-center gap-2 text-lime hover:text-limehover transition-colors"
          >
            <span>Next: Organisms</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </footer>
      </div>
    </div>
  );
}
