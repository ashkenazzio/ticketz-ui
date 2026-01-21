import { BarChart3, TrendingUp, Users, DollarSign, Calendar, ArrowUp, ArrowDown, Download } from 'lucide-react';
import SalesChart from '../../components/dashboard/SalesChart';
import { useData, useMyManagedCommunities } from '../../context/DataContext';

// Helper to format currency (cents to dollars)
function formatCurrency(cents: number): string {
  return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export default function Analytics() {
  const { db } = useData();
  const managedCommunities = useMyManagedCommunities();

  // Get the active community (first one for now)
  const activeCommunityData = managedCommunities[0];
  const community = activeCommunityData?.community;

  // Get community data
  const communityEvents = community ? db.events.getByCommunity(community.id) : [];
  const totalRevenue = community ? db.analytics.getCommunityRevenue(community.id) : 0;
  const memberCount = community ? db.communities.getMemberCount(community.id) : 0;

  // Calculate total tickets sold
  const totalTicketsSold = communityEvents.reduce((sum, event) => {
    return sum + db.analytics.getEventTicketsSold(event.id);
  }, 0);

  // Get top events by revenue
  const topEvents = communityEvents
    .map(event => ({
      name: event.title,
      revenue: db.analytics.getEventRevenue(event.id),
      tickets: db.analytics.getEventTicketsSold(event.id),
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3);

  // Stats data derived from database
  const stats = [
    {
      label: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      label: 'Tickets Sold',
      value: totalTicketsSold.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: BarChart3,
    },
    {
      label: 'Total Members',
      value: memberCount.toLocaleString(),
      change: '+15.3%',
      trend: 'up',
      icon: Users,
    },
    {
      label: 'Events Hosted',
      value: communityEvents.length.toString(),
      change: `+${communityEvents.length}`,
      trend: 'up',
      icon: Calendar,
    },
  ];

  // Recent activity (mock data for demo - in real app this would come from activity log)
  const recentActivity = [
    { type: 'sale', text: `New ticket sold for ${communityEvents[0]?.title || 'Electric Garden'}`, time: '2 min ago' },
    { type: 'member', text: 'Sarah Chen joined the community', time: '15 min ago' },
    { type: 'sale', text: `3 tickets sold for ${communityEvents[0]?.title || 'Bass Sector Opening'}`, time: '1 hour ago' },
    { type: 'event', text: `${communityEvents[1]?.title || 'NYE Countdown 2027'} was created`, time: '2 hours ago' },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold uppercase tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Track {community?.name || 'your community'}'s performance
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-lime text-dark px-5 py-3 font-semibold uppercase text-sm tracking-wide hover:bg-limehover transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2 mb-6">
        {['7 Days', '30 Days', '90 Days', 'All Time'].map((range, i) => (
          <button
            key={range}
            className={`
              px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all
              ${i === 1 ? 'bg-lime text-dark' : 'bg-surface text-gray-400 hover:text-white'}
            `}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-surface border border-white/5 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-lime/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-lime" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold ${stat.trend === 'up' ? 'text-lime' : 'text-red-400'}`}>
                {stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-display font-semibold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-surface border border-white/5 p-6">
          <h3 className="font-display text-lg uppercase tracking-tight mb-4">Sales Velocity</h3>
          <SalesChart />
        </div>

        {/* Top Events */}
        <div className="bg-surface border border-white/5 p-6">
          <h3 className="font-display text-lg uppercase tracking-tight mb-4">Top Events</h3>
          <div className="space-y-4">
            {topEvents.length > 0 ? (
              topEvents.map((event, i) => (
                <div key={event.name} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-lime/10 flex items-center justify-center text-lime font-display font-semibold text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm truncate">{event.name}</div>
                    <div className="text-xs text-gray-500">{event.tickets} tickets</div>
                  </div>
                  <div className="text-lime font-semibold text-sm">{formatCurrency(event.revenue)}</div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No events yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Community Growth */}
        <div className="bg-surface border border-white/5 p-6">
          <h3 className="font-display text-lg uppercase tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-lime" />
            Community Growth
          </h3>
          <div className="flex items-end gap-1 h-32">
            {[30, 45, 40, 65, 55, 80, 75, 90, 85, 95, 100, 110].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-lime/20 hover:bg-lime/40 transition-colors rounded-t-sm"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Jan</span>
            <span>Jun</span>
            <span>Dec</span>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="text-sm text-gray-400">New members this month</div>
            <div className="text-2xl font-display font-semibold text-lime">+{Math.round(memberCount * 0.2)}</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-surface border border-white/5 p-6">
          <h3 className="font-display text-lg uppercase tracking-tight mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                  activity.type === 'sale' ? 'bg-lime' :
                  activity.type === 'member' ? 'bg-blue-400' : 'bg-yellow-400'
                }`} />
                <div className="flex-1">
                  <div className="text-sm text-white">{activity.text}</div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
