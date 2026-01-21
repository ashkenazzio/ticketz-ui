import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Search, Download, Mail, Check, X, QrCode, Filter } from 'lucide-react';
import type { BadgeStatus } from '../../components/StatusBadge';
import StatusBadge from '../../components/StatusBadge';
import { exportToCSV } from '../../utils/csv';

interface Guest {
  id: string;
  ticketId: string;
  name: string;
  email: string;
  tier: string;
  purchaseDate: string;
  status: BadgeStatus;
  checkedIn: boolean;
}

const guests: Guest[] = [
  { id: '1', ticketId: '8X92-MM29', name: 'Alex Rivera', email: 'alex@example.com', tier: 'VIP', purchaseDate: 'Nov 1', status: 'valid', checkedIn: true },
  { id: '2', ticketId: 'JK47-PP82', name: 'Sarah Chen', email: 'sarah@example.com', tier: 'General', purchaseDate: 'Nov 2', status: 'valid', checkedIn: true },
  { id: '3', ticketId: 'TT19-XZ44', name: 'Marcus Johnson', email: 'marcus@example.com', tier: 'VIP', purchaseDate: 'Nov 3', status: 'valid', checkedIn: false },
  { id: '4', ticketId: 'HH88-NM12', name: 'Emily Rodriguez', email: 'emily@example.com', tier: 'General', purchaseDate: 'Nov 4', status: 'valid', checkedIn: false },
  { id: '5', ticketId: 'ZZ99-QQ55', name: 'David Kim', email: 'david@example.com', tier: 'General', purchaseDate: 'Nov 5', status: 'transferred', checkedIn: false },
  { id: '6', ticketId: 'AA11-BB22', name: 'Jordan Taylor', email: 'jordan@example.com', tier: 'VIP', purchaseDate: 'Nov 5', status: 'valid', checkedIn: false },
];

export default function GuestList() {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'checked-in' | 'not-checked'>('all');

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.ticketId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterStatus === 'all' ||
      (filterStatus === 'checked-in' && guest.checkedIn) ||
      (filterStatus === 'not-checked' && !guest.checkedIn);

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: guests.length,
    checkedIn: guests.filter(g => g.checkedIn).length,
    vip: guests.filter(g => g.tier === 'VIP').length,
  };

  const handleExportCSV = () => {
    exportToCSV(filteredGuests, [
      { header: 'Name', accessor: 'name' },
      { header: 'Email', accessor: 'email' },
      { header: 'Ticket ID', accessor: 'ticketId' },
      { header: 'Tier', accessor: 'tier' },
      { header: 'Purchase Date', accessor: 'purchaseDate' },
      { header: 'Status', accessor: 'status' },
      { header: 'Checked In', accessor: (g) => g.checkedIn ? 'Yes' : 'No' },
    ], `guest-list-electric-garden-${new Date().toISOString().split('T')[0]}`);
  };

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/dashboard/events"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold uppercase tracking-tight">
              Electric Garden
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Guest List • Nov 12, 2026
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 border border-white/20 text-white px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:border-lime hover:text-lime transition-colors">
              <Mail className="w-4 h-4" />
              Email All
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-lime text-dark px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-limehover transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-surface border border-white/5 p-4">
          <div className="text-2xl font-display font-semibold text-lime">{stats.total}</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">Total Guests</div>
        </div>
        <div className="bg-surface border border-white/5 p-4">
          <div className="text-2xl font-display font-semibold text-white">{stats.checkedIn}</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">Checked In</div>
        </div>
        <div className="bg-surface border border-white/5 p-4">
          <div className="text-2xl font-display font-semibold text-white">{stats.vip}</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">VIP Guests</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, email, or ticket ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-white/10 pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <Filter className="w-4 h-4 text-gray-500 self-center" />
          {(['all', 'checked-in', 'not-checked'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`
                px-4 py-3 text-xs font-semibold uppercase tracking-wide transition-all whitespace-nowrap
                ${filterStatus === status
                  ? 'bg-lime text-dark'
                  : 'bg-surface text-gray-400 hover:text-white'
                }
              `}
            >
              {status === 'all' ? 'All' : status === 'checked-in' ? 'Checked In' : 'Not Checked'}
            </button>
          ))}
        </div>
      </div>

      {/* Guest Table */}
      <div className="bg-surface border border-white/5 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-xs text-gray-500 uppercase tracking-wide">
          <div className="col-span-4">Guest</div>
          <div className="col-span-2">Ticket ID</div>
          <div className="col-span-2">Tier</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Check-In</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-white/5">
          {filteredGuests.map((guest) => (
            <div
              key={guest.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-dark/30 transition-colors"
            >
              {/* Guest Info */}
              <div className="col-span-4">
                <div className="font-semibold text-white">{guest.name}</div>
                <div className="text-xs text-gray-500">{guest.email}</div>
              </div>

              {/* Ticket ID */}
              <div className="col-span-2 flex items-center">
                <span className="font-mono text-sm text-gray-400">{guest.ticketId}</span>
              </div>

              {/* Tier */}
              <div className="col-span-2 flex items-center">
                <span className={`px-2 py-1 text-xs font-semibold uppercase ${guest.tier === 'VIP' ? 'bg-lime/10 text-lime' : 'bg-gray-700 text-gray-300'}`}>
                  {guest.tier}
                </span>
              </div>

              {/* Status */}
              <div className="col-span-2 flex items-center">
                <StatusBadge status={guest.status} size="sm" />
              </div>

              {/* Check-In */}
              <div className="col-span-2 flex items-center gap-2">
                {guest.checkedIn ? (
                  <div className="flex items-center gap-2 text-lime text-sm">
                    <Check className="w-4 h-4" />
                    Checked In
                  </div>
                ) : (
                  <button className="flex items-center gap-2 bg-lime text-dark px-3 py-1.5 text-xs font-semibold uppercase tracking-wide hover:bg-limehover transition-colors">
                    <QrCode className="w-3.5 h-3.5" />
                    Check In
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredGuests.length === 0 && (
        <div className="border-2 border-lime/20 bg-surface/50 py-12 px-8 text-center mt-4">
          <Search className="w-10 h-10 text-gray-600 mx-auto mb-4" />
          <h3 className="font-display text-lg uppercase tracking-tight mb-2">
            No Guests Found
          </h3>
          <p className="text-gray-400 text-sm">
            {searchQuery ? `No results for "${searchQuery}"` : 'No guests match the selected filter.'}
          </p>
        </div>
      )}
    </>
  );
}
