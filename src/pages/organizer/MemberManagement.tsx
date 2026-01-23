import { useState } from 'react';
import { Search, Users, MoreVertical, Shield, Crown, UserMinus, Mail, Calendar, Ticket, Download } from 'lucide-react';
import { exportToCSV } from '../../utils/csv';
import Dropdown, { DropdownItem } from '../../components/Dropdown';

type MemberRole = 'admin' | 'moderator' | 'member';

interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: MemberRole;
  joinDate: string;
  eventsAttended: number;
  ticketsBought: number;
}

const members: Member[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    role: 'admin',
    joinDate: 'Jan 2024',
    eventsAttended: 24,
    ticketsBought: 31,
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    role: 'moderator',
    joinDate: 'Mar 2024',
    eventsAttended: 18,
    ticketsBought: 22,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    role: 'member',
    joinDate: 'Jun 2024',
    eventsAttended: 12,
    ticketsBought: 15,
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    role: 'member',
    joinDate: 'Aug 2024',
    eventsAttended: 8,
    ticketsBought: 10,
  },
  {
    id: '5',
    name: 'Alex Rivera',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
    role: 'member',
    joinDate: 'Sep 2024',
    eventsAttended: 5,
    ticketsBought: 7,
  },
  {
    id: '6',
    name: 'Jordan Taylor',
    email: 'jordan@example.com',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80',
    role: 'member',
    joinDate: 'Oct 2024',
    eventsAttended: 3,
    ticketsBought: 4,
  },
];

const roleConfig = {
  admin: { label: 'Admin', icon: Crown, color: 'text-lime bg-lime/10', border: 'border-lime/30' },
  moderator: { label: 'Moderator', icon: Shield, color: 'text-blue-400 bg-blue-400/10', border: 'border-blue-400/30' },
  member: { label: 'Member', icon: Users, color: 'text-gray-400 bg-gray-400/10', border: 'border-gray-400/30' },
};

export default function MemberManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<MemberRole | 'all'>('all');

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roleCounts = {
    all: members.length,
    admin: members.filter(m => m.role === 'admin').length,
    moderator: members.filter(m => m.role === 'moderator').length,
    member: members.filter(m => m.role === 'member').length,
  };

  const handleExportCSV = () => {
    exportToCSV(filteredMembers, [
      { header: 'Name', accessor: 'name' },
      { header: 'Email', accessor: 'email' },
      { header: 'Role', accessor: 'role' },
      { header: 'Joined', accessor: 'joinDate' },
      { header: 'Events Attended', accessor: 'eventsAttended' },
      { header: 'Tickets Bought', accessor: 'ticketsBought' },
    ], `members-${new Date().toISOString().split('T')[0]}`);
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold uppercase tracking-tight">
            Community Members
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {members.length} total members • {roleCounts.admin + roleCounts.moderator} with elevated access
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center justify-center gap-2 border border-white/20 text-white px-5 py-3 font-semibold uppercase text-sm tracking-wide hover:border-lime hover:text-lime transition-colors">
            <Mail className="w-4 h-4" />
            Email All
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center gap-2 bg-lime text-dark px-5 py-3 font-semibold uppercase text-sm tracking-wide hover:bg-limehover transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-white/10 pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
          {(['all', 'admin', 'moderator', 'member'] as const).map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`
                px-4 py-3 text-xs font-semibold uppercase tracking-wide transition-all whitespace-nowrap flex-shrink-0
                ${roleFilter === role
                  ? 'bg-lime text-dark'
                  : 'bg-surface text-gray-400 hover:text-white'
                }
              `}
            >
              {role === 'all' ? 'All' : roleConfig[role].label}
              <span className="ml-2 opacity-60">({roleCounts[role]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-surface border border-white/5 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-xs text-gray-500 uppercase tracking-wide">
          <div className="col-span-4">Member</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Joined</div>
          <div className="col-span-2">Activity</div>
          <div className="col-span-2"></div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-white/5">
          {filteredMembers.map((member) => {
            const RoleIcon = roleConfig[member.role].icon;
            return (
              <div
                key={member.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-dark/30 transition-colors group"
              >
                {/* Member Info */}
                <div className="col-span-4 flex items-center gap-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-dark"
                  />
                  <div className="min-w-0">
                    <div className="font-semibold text-white truncate">{member.name}</div>
                    <div className="text-xs text-gray-500 truncate">{member.email}</div>
                  </div>
                </div>

                {/* Role */}
                <div className="col-span-2 flex items-center">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold uppercase ${roleConfig[member.role].color}`}>
                    <RoleIcon className="w-3 h-3" />
                    {roleConfig[member.role].label}
                  </span>
                </div>

                {/* Joined */}
                <div className="col-span-2 flex items-center">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {member.joinDate}
                  </div>
                </div>

                {/* Activity */}
                <div className="col-span-2 flex items-center">
                  <div className="text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Ticket className="w-3.5 h-3.5" />
                      {member.ticketsBought} tickets
                    </div>
                    <div className="text-xs text-gray-500">
                      {member.eventsAttended} events attended
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <Dropdown
                    trigger={
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    }
                    width="w-44"
                  >
                    {member.role === 'member' && (
                      <DropdownItem icon={<Shield className="w-3.5 h-3.5" />}>
                        Make Moderator
                      </DropdownItem>
                    )}
                    {member.role === 'moderator' && (
                      <>
                        <DropdownItem icon={<Crown className="w-3.5 h-3.5" />}>
                          Make Admin
                        </DropdownItem>
                        <DropdownItem icon={<Users className="w-3.5 h-3.5" />}>
                          Remove Mod
                        </DropdownItem>
                      </>
                    )}
                    <DropdownItem icon={<Mail className="w-3.5 h-3.5" />}>
                      Send Message
                    </DropdownItem>
                    <DropdownItem variant="danger" icon={<UserMinus className="w-3.5 h-3.5" />}>
                      Remove Member
                    </DropdownItem>
                  </Dropdown>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="border-2 border-lime/20 bg-surface/50 py-16 px-8 text-center mt-4">
          <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="font-display text-xl uppercase tracking-tight mb-2">
            No Members Found
          </h3>
          <p className="text-gray-400 text-sm max-w-sm mx-auto">
            {searchQuery
              ? `No members match "${searchQuery}"`
              : 'No members with the selected role.'}
          </p>
        </div>
      )}
    </>
  );
}
