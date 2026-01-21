import { useState } from 'react';
import { Search, UserPlus, MoreVertical, Shield, Crown, Users, Mail, X, Check } from 'lucide-react';

type TeamRole = 'owner' | 'admin' | 'moderator';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: TeamRole;
  joinedDate: string;
}

const roleConfig: Record<TeamRole, { label: string; color: string; icon: React.ReactNode }> = {
  owner: { label: 'Owner', color: 'text-lime bg-lime/10', icon: <Crown className="w-3 h-3" /> },
  admin: { label: 'Admin', color: 'text-purple-400 bg-purple-400/10', icon: <Shield className="w-3 h-3" /> },
  moderator: { label: 'Moderator', color: 'text-blue-400 bg-blue-400/10', icon: <Users className="w-3 h-3" /> },
};

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Moran',
    email: 'alex@basssector.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
    role: 'owner',
    joinedDate: 'March 2024',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@basssector.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    role: 'admin',
    joinedDate: 'April 2024',
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    email: 'marcus@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    role: 'moderator',
    joinedDate: 'May 2024',
  },
  {
    id: '4',
    name: 'DJ Pulse',
    email: 'pulse@djmail.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    role: 'moderator',
    joinedDate: 'June 2024',
  },
];

const pendingInvites = [
  { id: 'inv-1', email: 'newadmin@example.com', role: 'admin' as TeamRole, sentDate: '2 days ago' },
  { id: 'inv-2', email: 'newmod@example.com', role: 'moderator' as TeamRole, sentDate: '1 week ago' },
];

export default function TeamManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<TeamRole>('moderator');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filteredMembers = mockTeamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvite = () => {
    console.log('Invite:', inviteEmail, inviteRole);
    setShowInviteModal(false);
    setInviteEmail('');
    setInviteRole('moderator');
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold uppercase tracking-tight">
            Team Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage admins and moderators for Bass Sector
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 bg-lime text-dark px-4 py-2 font-semibold uppercase text-sm tracking-wide hover:bg-limehover transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      {/* Role Legend */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-surface border border-white/5">
        {Object.entries(roleConfig).map(([role, config]) => (
          <div key={role} className="flex items-center gap-2">
            <span className={`flex items-center gap-1 px-2 py-1 text-xs uppercase tracking-wide ${config.color}`}>
              {config.icon}
              {config.label}
            </span>
            <span className="text-xs text-gray-500">
              {role === 'owner' && '- Full access, cannot be removed'}
              {role === 'admin' && '- Can manage events, members, settings'}
              {role === 'moderator' && '- Can manage members only'}
            </span>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search team members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-surface border border-white/10 pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime transition-colors"
        />
      </div>

      {/* Team Members */}
      <div className="bg-surface border border-white/5 overflow-hidden mb-8">
        <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-xs text-gray-500 uppercase tracking-wide">
          <div className="col-span-5">Member</div>
          <div className="col-span-3">Role</div>
          <div className="col-span-2">Joined</div>
          <div className="col-span-2">Actions</div>
        </div>

        <div className="divide-y divide-white/5">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-dark/30 transition-colors items-center"
            >
              {/* Member Info */}
              <div className="col-span-5 flex items-center gap-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-white">{member.name}</div>
                  <div className="text-xs text-gray-500">{member.email}</div>
                </div>
              </div>

              {/* Role */}
              <div className="col-span-3">
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs uppercase tracking-wide ${roleConfig[member.role].color}`}>
                  {roleConfig[member.role].icon}
                  {roleConfig[member.role].label}
                </span>
              </div>

              {/* Joined Date */}
              <div className="col-span-2 text-sm text-gray-400">
                {member.joinedDate}
              </div>

              {/* Actions */}
              <div className="col-span-2 flex justify-end relative">
                {member.role !== 'owner' ? (
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === member.id ? null : member.id)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {openMenuId === member.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-surface border border-white/10 shadow-xl z-10">
                        {member.role === 'moderator' && (
                          <button className="w-full px-4 py-2 text-left text-sm text-gray-400 hover:text-white hover:bg-dark/50 transition-colors">
                            Promote to Admin
                          </button>
                        )}
                        {member.role === 'admin' && (
                          <button className="w-full px-4 py-2 text-left text-sm text-gray-400 hover:text-white hover:bg-dark/50 transition-colors">
                            Demote to Moderator
                          </button>
                        )}
                        <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                          Remove from Team
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-gray-600 italic">Protected</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Invites */}
      {pendingInvites.length > 0 && (
        <>
          <h2 className="font-display text-lg uppercase tracking-tight mb-4 text-gray-400">
            Pending Invites
          </h2>
          <div className="bg-surface border border-white/5 overflow-hidden">
            <div className="divide-y divide-white/5">
              {pendingInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center">
                      <Mail className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{invite.email}</div>
                      <div className="text-xs text-gray-500">
                        Invited as {roleConfig[invite.role].label} • {invite.sentDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-lime hover:text-limehover uppercase tracking-wide">
                      Resend
                    </button>
                    <button className="text-xs text-red-400 hover:text-red-300 uppercase tracking-wide ml-4">
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowInviteModal(false)}
          />
          <div className="relative bg-surface border border-white/10 w-full max-w-md p-6">
            <button
              onClick={() => setShowInviteModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-display text-xl uppercase tracking-tight mb-6">
              Invite Team Member
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-gray-500 mb-2 font-semibold tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="team@example.com"
                  className="w-full bg-dark border border-white/10 p-4 text-white placeholder-gray-600 focus:outline-none focus:border-lime transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-500 mb-2 font-semibold tracking-wide">
                  Role
                </label>
                <div className="flex gap-2">
                  {(['admin', 'moderator'] as TeamRole[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => setInviteRole(role)}
                      className={`
                        flex-1 flex items-center justify-center gap-2 px-4 py-3 border transition-all
                        ${inviteRole === role
                          ? 'border-lime bg-lime/10 text-lime'
                          : 'border-white/10 text-gray-400 hover:text-white'
                        }
                      `}
                    >
                      {roleConfig[role].icon}
                      {roleConfig[role].label}
                      {inviteRole === role && <Check className="w-4 h-4 ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleInvite}
                disabled={!inviteEmail}
                className="w-full flex items-center justify-center gap-2 bg-lime text-dark px-6 py-3 font-semibold uppercase tracking-wide hover:bg-limehover transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                <Mail className="w-4 h-4" />
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
