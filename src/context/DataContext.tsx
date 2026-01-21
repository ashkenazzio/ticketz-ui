import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { mockDb, type MockDbApi } from '../data/database';
import type { User, Community, Event, Ticket, Order, TicketTier } from '../data/types';

interface DataContextValue {
  db: MockDbApi;
  // Convenience getters for current user
  currentUser: User | undefined;
  // Force re-render when data changes
  refresh: () => void;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [, setRefreshKey] = useState(0);

  // Initialize database on mount
  useEffect(() => {
    // Database is auto-initialized when imported
    console.log('[DataProvider] Database initialized');
  }, []);

  const refresh = () => setRefreshKey(k => k + 1);

  const value: DataContextValue = {
    db: mockDb,
    currentUser: mockDb.users.getCurrent(),
    refresh,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData(): DataContextValue {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

// ============ CONVENIENCE HOOKS ============

// Get an event by ID with related data
export function useEvent(eventId: string | undefined) {
  const { db } = useData();
  if (!eventId) return null;

  const event = db.events.getById(eventId);
  if (!event) return null;

  const community = db.communities.getById(event.communityId);
  const ticketTiers = db.ticketTiers.getByEvent(eventId);
  const isMultiDay = db.events.isMultiDay(event);

  return {
    event,
    community,
    ticketTiers,
    isMultiDay,
    ticketsSold: db.analytics.getEventTicketsSold(eventId),
    capacity: db.analytics.getEventCapacity(eventId),
    revenue: db.analytics.getEventRevenue(eventId),
    checkIns: db.analytics.getEventCheckIns(eventId),
  };
}

// Get a community by ID with related data
export function useCommunity(communityId: string | undefined) {
  const { db } = useData();
  if (!communityId) return null;

  const community = db.communities.getById(communityId);
  if (!community) return null;

  const events = db.events.getByCommunity(communityId);
  const memberCount = db.communities.getMemberCount(communityId);

  return {
    community,
    events,
    memberCount,
    revenue: db.analytics.getCommunityRevenue(communityId),
  };
}

// Get current user's tickets
export function useMyTickets() {
  const { db, currentUser } = useData();
  if (!currentUser) return { upcoming: [], past: [] };

  const upcoming = db.tickets.getUpcoming(currentUser.id);
  const past = db.tickets.getPast(currentUser.id);

  return { upcoming, past };
}

// Get current user's orders
export function useMyOrders() {
  const { db, currentUser } = useData();
  if (!currentUser) return [];

  return db.orders.getByUser(currentUser.id);
}

// Get current user's managed communities (owner/admin)
export function useMyManagedCommunities() {
  const { db, currentUser } = useData();
  if (!currentUser) return [];

  const memberships = db.memberships.getManaged(currentUser.id);
  return memberships.map(m => ({
    membership: m,
    community: db.communities.getById(m.communityId)!,
    memberCount: db.communities.getMemberCount(m.communityId),
  })).filter(item => item.community);
}

// Get current user's friends
export function useMyFriends() {
  const { db, currentUser } = useData();
  if (!currentUser) return { friends: [], pendingReceived: [], pendingSent: [] };

  const friends = db.connections.getFriends(currentUser.id);
  const pendingReceived = db.connections.getPendingReceived(currentUser.id);
  const pendingSent = db.connections.getPendingSent(currentUser.id);

  return { friends, pendingReceived, pendingSent };
}

// Get event attendees with friend information
export function useEventAttendees(eventId: string | undefined) {
  const { db, currentUser } = useData();
  if (!eventId || !currentUser) return { attendees: [], friendsGoing: [] };

  const visibleAttendees = db.attendees.getVisibleAttendees(eventId, currentUser.id);
  const friends = db.connections.getFriends(currentUser.id);
  const friendsGoing = visibleAttendees.filter(a => friends.some(f => f.id === a.id));

  return {
    attendees: visibleAttendees,
    friendsGoing,
    totalCount: db.attendees.getByEvent(eventId).length,
  };
}

// Check if current user is attending an event
export function useIsAttending(eventId: string | undefined) {
  const { db, currentUser } = useData();
  if (!eventId || !currentUser) return false;
  return db.attendees.isAttending(currentUser.id, eventId);
}

// Check if event is saved
export function useIsSaved(eventId: string | undefined) {
  const { db, currentUser, refresh } = useData();
  if (!eventId || !currentUser) return { isSaved: false, toggle: () => {} };

  const isSaved = db.savedEvents.isSaved(currentUser.id, eventId);
  const toggle = () => {
    db.savedEvents.toggle(currentUser.id, eventId);
    refresh();
  };

  return { isSaved, toggle };
}
