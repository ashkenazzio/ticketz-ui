import StatCard from '../components/dashboard/StatCard';
import SalesChart from '../components/dashboard/SalesChart';
import RecentActivityTable from '../components/dashboard/RecentActivityTable';
import { DollarSign, Users, Ticket, PlusCircle, Calendar, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMyManagedCommunities, useData } from '../context/DataContext';

// Helper to format currency (cents to dollars)
function formatCurrency(cents: number): string {
  return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

export default function Dashboard() {
  const { db, currentUser } = useData();
  const managedCommunities = useMyManagedCommunities();

  // For now, use the first managed community (in a real app, this would be selectable)
  const activeCommunityData = managedCommunities[0];
  const community = activeCommunityData?.community;

  // If user doesn't manage any communities, show onboarding
  if (!currentUser || managedCommunities.length === 0) {
    return (
      <>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold uppercase tracking-tighter text-white leading-none">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Welcome to your organizer dashboard.</p>
          </div>
        </div>

        {/* No Community State */}
        <div className="bg-lime/5 border-2 border-lime/30 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-lime/10 rounded-full flex items-center justify-center">
                <Rocket className="w-10 h-10 text-lime" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl font-semibold uppercase tracking-tight mb-3">
                Create Your First Community
              </h2>
              <p className="text-gray-400 mb-6 max-w-xl">
                Start by creating a community to organize events and connect with your audience.
              </p>
              <Link
                to="/dashboard/community/new"
                className="inline-flex items-center gap-2 bg-lime text-dark px-6 py-3 font-semibold uppercase tracking-wide hover:bg-limehover transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                Create Community
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Get community stats from database
  const communityEvents = db.events.getByCommunity(community.id);
  const totalRevenue = db.analytics.getCommunityRevenue(community.id);
  const memberCount = db.communities.getMemberCount(community.id);

  // Calculate tickets sold and capacity for all community events
  const ticketStats = communityEvents.reduce(
    (acc, event) => {
      const sold = db.analytics.getEventTicketsSold(event.id);
      const capacity = db.analytics.getEventCapacity(event.id);
      return {
        sold: acc.sold + sold,
        capacity: acc.capacity + capacity,
      };
    },
    { sold: 0, capacity: 0 }
  );

  const ticketPercentage = ticketStats.capacity > 0
    ? Math.round((ticketStats.sold / ticketStats.capacity) * 100)
    : 0;

  // Check if community has no events yet
  const hasNoEvents = communityEvents.length === 0;

  // Empty state for new communities
  if (hasNoEvents) {
    return (
      <>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold uppercase tracking-tighter text-white leading-none">
              {community.name}
            </h1>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Welcome to your community dashboard.</p>
          </div>
        </div>

        {/* Welcome / Onboarding Card */}
        <div className="bg-lime/5 border-2 border-lime/30 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-lime/10 rounded-full flex items-center justify-center">
                <Rocket className="w-10 h-10 text-lime" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl font-semibold uppercase tracking-tight mb-3">
                Let's Get Started!
              </h2>
              <p className="text-gray-400 mb-6 max-w-xl">
                Welcome to {community.name}! Your community is all set up. Here are some things you can do to get started:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/dashboard/events/create"
                  className="flex items-center gap-3 p-4 bg-dark border border-white/10 hover:border-lime/30 transition-colors group"
                >
                  <Calendar className="w-8 h-8 text-lime" />
                  <div className="flex-1">
                    <div className="font-semibold text-white group-hover:text-lime transition-colors">Create Event</div>
                    <div className="text-xs text-gray-500">Host your first event</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-lime transition-colors" />
                </Link>
                <Link
                  to="/dashboard/community/settings"
                  className="flex items-center gap-3 p-4 bg-dark border border-white/10 hover:border-lime/30 transition-colors group"
                >
                  <Users className="w-8 h-8 text-gray-500" />
                  <div className="flex-1">
                    <div className="font-semibold text-white group-hover:text-lime transition-colors">Complete Profile</div>
                    <div className="text-xs text-gray-500">Add description & images</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-lime transition-colors" />
                </Link>
                <Link
                  to="/dashboard/team"
                  className="flex items-center gap-3 p-4 bg-dark border border-white/10 hover:border-lime/30 transition-colors group"
                >
                  <Users className="w-8 h-8 text-gray-500" />
                  <div className="flex-1">
                    <div className="font-semibold text-white group-hover:text-lime transition-colors">Invite Team</div>
                    <div className="text-xs text-gray-500">Add admins & mods</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-lime transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Empty Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface border border-white/5 p-6 rounded-sm">
            <div className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-2">Total Revenue</div>
            <div className="text-3xl font-display font-semibold text-white">$0.00</div>
            <div className="text-xs text-gray-600 mt-2">No sales yet</div>
          </div>
          <div className="bg-surface border border-white/5 p-6 rounded-sm">
            <div className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-2">Members</div>
            <div className="text-3xl font-display font-semibold text-white">{memberCount}</div>
            <div className="text-xs text-gray-600 mt-2">{memberCount === 1 ? 'Just you for now' : 'Active members'}</div>
          </div>
          <div className="bg-surface border border-white/5 p-6 rounded-sm">
            <div className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-2">Events</div>
            <div className="text-3xl font-display font-semibold text-white">0</div>
            <div className="text-xs text-gray-600 mt-2">Create your first event</div>
          </div>
        </div>

        {/* Empty Events List */}
        <div className="bg-surface border border-white/5 p-8">
          <div className="text-center">
            <Calendar className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <h3 className="font-display text-xl uppercase tracking-tight mb-2">No Events Yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Create your first event to start selling tickets and growing your community.
            </p>
            <Link
              to="/dashboard/events/create"
              className="inline-flex items-center gap-2 bg-lime text-dark px-6 py-3 font-semibold uppercase tracking-wide hover:bg-limehover transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Create Event
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
        {/* Header Action */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
            <div>
                <h1 className="font-display text-3xl sm:text-4xl font-semibold uppercase tracking-tighter text-white leading-none">
                  {community.name} Dashboard
                </h1>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">Welcome back, {currentUser.name.split(' ')[0]}. Here's what's happening today.</p>
            </div>
            <Link to="/dashboard/events/create" className="bg-lime text-dark font-display font-semibold uppercase tracking-tight px-4 sm:px-6 py-2.5 sm:py-3 rounded-sm hover:bg-limehover transition-colors flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center">
                <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Create Event
            </Link>
        </div>

        {/* KPI Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard label="Total Revenue" value={formatCurrency(totalRevenue)} trend="+12.5%" trendUp={true}>
                <DollarSign className="w-24 h-24 text-lime" />
            </StatCard>

            <StatCard label="Active Members" value={memberCount.toLocaleString()} trend="84 New" trendUp={true}>
                <Users className="w-24 h-24 text-lime" />
            </StatCard>

            <div className="bg-surface border border-white/5 p-6 rounded-sm flex flex-col justify-between h-32 relative overflow-hidden hover:border-lime/30 transition-colors">
                <div className="flex justify-between items-start z-10">
                    <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">Tickets Sold</h3>
                    <span className="text-xs font-semibold px-2 py-1 rounded-sm bg-lime/10 text-lime">
                        {ticketPercentage}%
                    </span>
                </div>
                <div className="z-10 mt-auto w-full">
                    <div className="flex justify-between items-end mb-2">
                        <div className="text-3xl font-display font-semibold text-white tracking-tight">{ticketStats.sold}</div>
                        <div className="text-sm text-gray-500 font-mono">/ {ticketStats.capacity}</div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-gray-800 rounded-sm overflow-hidden">
                        <div className="h-full bg-lime shadow-[0_0_10px_rgba(187,223,50,0.5)]" style={{ width: `${ticketPercentage}%` }}></div>
                    </div>
                </div>
                <div className="absolute right-[-10px] bottom-[-10px] opacity-5 pointer-events-none">
                    <Ticket className="w-24 h-24 text-lime" />
                </div>
            </div>
        </div>

        {/* Main Analytics (Middle) */}
        <div className="mb-8">
             <SalesChart />
        </div>

        {/* Recent Activity (Bottom) */}
        <div>
            <RecentActivityTable />
        </div>
    </>
  );
}
