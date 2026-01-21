import type { MockDatabase, User, Community, Event, TicketTier, Ticket, Order, CommunityMembership, UserConnection, EventAttendee, SavedEvent } from './types';
import { initialMockData } from './mockData';

const DB_KEY = 'ticketz_mock_db';
const DB_VERSION = 3;

// Initialize or load database from localStorage
function loadDatabase(): MockDatabase {
  try {
    const stored = localStorage.getItem(DB_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Check version - if outdated, reset
      if (parsed.version !== DB_VERSION) {
        console.log('[MockDB] Version mismatch, reinitializing...');
        return saveDatabase(initialMockData);
      }
      return parsed.data;
    }
  } catch (e) {
    console.error('[MockDB] Error loading database:', e);
  }
  // Initialize with seed data
  console.log('[MockDB] Initializing with seed data...');
  return saveDatabase(initialMockData);
}

// Save database to localStorage
function saveDatabase(db: MockDatabase): MockDatabase {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify({ version: DB_VERSION, data: db }));
  } catch (e) {
    console.error('[MockDB] Error saving database:', e);
  }
  return db;
}

// In-memory cache
let db: MockDatabase = loadDatabase();

// ============ DATABASE API ============

export const mockDb = {
  // Reset to initial data
  reset: () => {
    db = saveDatabase(initialMockData);
    return db;
  },

  // Get raw database (for debugging)
  getAll: () => db,

  // ============ USERS ============
  users: {
    getById: (id: string): User | undefined => db.users.find(u => u.id === id),
    getByEmail: (email: string): User | undefined => db.users.find(u => u.email === email),
    getAll: (): User[] => db.users,
    getCurrent: (): User | undefined => db.users.find(u => u.id === db.currentUserId),
  },

  // ============ COMMUNITIES ============
  communities: {
    getById: (id: string): Community | undefined => db.communities.find(c => c.id === id),
    getAll: (): Community[] => db.communities,
    getByCategory: (categoryId: string): Community[] =>
      db.communities.filter(c => c.primaryCategory === categoryId || c.secondaryCategory === categoryId),
    getMemberCount: (communityId: string): number =>
      db.memberships.filter(m => m.communityId === communityId && m.status === 'active').length,
  },

  // ============ MEMBERSHIPS ============
  memberships: {
    getByUser: (userId: string): CommunityMembership[] =>
      db.memberships.filter(m => m.userId === userId && m.status === 'active'),
    getByCommunity: (communityId: string): CommunityMembership[] =>
      db.memberships.filter(m => m.communityId === communityId && m.status === 'active'),
    getUserRole: (userId: string, communityId: string): CommunityMembership | undefined =>
      db.memberships.find(m => m.userId === userId && m.communityId === communityId),
    // Get communities where user is owner/admin (for dashboard)
    getManaged: (userId: string): CommunityMembership[] =>
      db.memberships.filter(m => m.userId === userId && (m.role === 'owner' || m.role === 'admin') && m.status === 'active'),
    // Get all communities a user belongs to
    getUserCommunities: (userId: string): Community[] => {
      const userMemberships = db.memberships.filter(m => m.userId === userId && m.status === 'active');
      const communityIds = userMemberships.map(m => m.communityId);
      return db.communities.filter(c => communityIds.includes(c.id));
    },
  },

  // ============ CONNECTIONS (Friends) ============
  connections: {
    getFriends: (userId: string): User[] => {
      const friendConnections = db.connections.filter(
        c => c.status === 'accepted' && (c.requesterId === userId || c.addresseeId === userId)
      );
      const friendIds = friendConnections.map(c =>
        c.requesterId === userId ? c.addresseeId : c.requesterId
      );
      return db.users.filter(u => friendIds.includes(u.id));
    },
    getPendingReceived: (userId: string): UserConnection[] =>
      db.connections.filter(c => c.addresseeId === userId && c.status === 'pending'),
    getPendingSent: (userId: string): UserConnection[] =>
      db.connections.filter(c => c.requesterId === userId && c.status === 'pending'),
    getStatus: (userId1: string, userId2: string): UserConnection | undefined =>
      db.connections.find(c =>
        (c.requesterId === userId1 && c.addresseeId === userId2) ||
        (c.requesterId === userId2 && c.addresseeId === userId1)
      ),
    getMutualFriends: (userId1: string, userId2: string): User[] => {
      const friends1 = mockDb.connections.getFriends(userId1);
      const friends2 = mockDb.connections.getFriends(userId2);
      return friends1.filter(f => friends2.some(f2 => f2.id === f.id));
    },
    getMutualCommunities: (userId1: string, userId2: string): Community[] => {
      const user1Memberships = db.memberships.filter(m => m.userId === userId1 && m.status === 'active');
      const user2Memberships = db.memberships.filter(m => m.userId === userId2 && m.status === 'active');
      const user1CommunityIds = user1Memberships.map(m => m.communityId);
      const user2CommunityIds = user2Memberships.map(m => m.communityId);
      const mutualIds = user1CommunityIds.filter(id => user2CommunityIds.includes(id));
      return db.communities.filter(c => mutualIds.includes(c.id));
    },
  },

  // ============ EVENTS ============
  events: {
    getById: (id: string): Event | undefined => db.events.find(e => e.id === id),
    getAll: (): Event[] => db.events,
    getByCommunity: (communityId: string): Event[] => db.events.filter(e => e.communityId === communityId),
    getUpcoming: (): Event[] => {
      const now = new Date().toISOString();
      return db.events.filter(e => e.startTime > now).sort((a, b) => a.startTime.localeCompare(b.startTime));
    },
    getPast: (): Event[] => {
      const now = new Date().toISOString();
      return db.events.filter(e => e.endTime < now).sort((a, b) => b.startTime.localeCompare(a.startTime));
    },
    isMultiDay: (event: Event): boolean => {
      const start = new Date(event.startTime);
      const end = new Date(event.endTime);
      return start.toDateString() !== end.toDateString();
    },
    getByCategory: (categoryId: string): Event[] => db.events.filter(e => e.category === categoryId),
  },

  // ============ TICKET TIERS ============
  ticketTiers: {
    getByEvent: (eventId: string): TicketTier[] => db.ticketTiers.filter(t => t.eventId === eventId),
    getById: (id: string): TicketTier | undefined => db.ticketTiers.find(t => t.id === id),
    getSoldCount: (tierId: string): number => db.tickets.filter(t => t.ticketTierId === tierId && t.status !== 'refunded' && t.status !== 'cancelled').length,
    getAvailable: (tierId: string): number => {
      const tier = db.ticketTiers.find(t => t.id === tierId);
      if (!tier) return 0;
      const sold = mockDb.ticketTiers.getSoldCount(tierId);
      return tier.capacity - sold;
    },
  },

  // ============ TICKETS ============
  tickets: {
    getByUser: (userId: string): Ticket[] => db.tickets.filter(t => t.userId === userId),
    getByEvent: (eventId: string): Ticket[] => db.tickets.filter(t => t.eventId === eventId),
    getById: (id: string): Ticket | undefined => db.tickets.find(t => t.id === id),
    getUpcoming: (userId: string): Ticket[] => {
      const now = new Date().toISOString();
      return db.tickets.filter(t => {
        if (t.userId !== userId) return false;
        if (t.status !== 'valid') return false;
        const event = db.events.find(e => e.id === t.eventId);
        return event && event.startTime > now;
      });
    },
    getPast: (userId: string): Ticket[] => {
      const now = new Date().toISOString();
      return db.tickets.filter(t => {
        if (t.userId !== userId) return false;
        const event = db.events.find(e => e.id === t.eventId);
        return event && event.endTime < now;
      });
    },
  },

  // ============ ORDERS ============
  orders: {
    getByUser: (userId: string): Order[] => db.orders.filter(o => o.userId === userId),
    getById: (id: string): Order | undefined => db.orders.find(o => o.id === id),
    getByEvent: (eventId: string): Order[] => db.orders.filter(o => o.eventId === eventId),
  },

  // ============ EVENT ATTENDEES ============
  attendees: {
    getByEvent: (eventId: string): EventAttendee[] => db.attendees.filter(a => a.eventId === eventId),
    getByUser: (userId: string): EventAttendee[] => db.attendees.filter(a => a.userId === userId),
    isAttending: (userId: string, eventId: string): boolean =>
      db.attendees.some(a => a.userId === userId && a.eventId === eventId),
    // Get visible attendees (respects visibility settings)
    getVisibleAttendees: (eventId: string, viewerId: string): User[] => {
      const eventAttendees = db.attendees.filter(a => a.eventId === eventId);
      const viewerFriends = mockDb.connections.getFriends(viewerId);
      const visibleUserIds = eventAttendees
        .filter(a => {
          if (a.visibility === 'public') return true;
          if (a.visibility === 'friends_only') {
            return viewerFriends.some(f => f.id === a.userId) || a.userId === viewerId;
          }
          return a.userId === viewerId; // private - only visible to self
        })
        .map(a => a.userId);
      return db.users.filter(u => visibleUserIds.includes(u.id));
    },
  },

  // ============ SAVED EVENTS ============
  savedEvents: {
    getByUser: (userId: string): SavedEvent[] => db.savedEvents.filter(s => s.userId === userId),
    isSaved: (userId: string, eventId: string): boolean =>
      db.savedEvents.some(s => s.userId === userId && s.eventId === eventId),
    toggle: (userId: string, eventId: string): boolean => {
      const existing = db.savedEvents.find(s => s.userId === userId && s.eventId === eventId);
      if (existing) {
        db.savedEvents = db.savedEvents.filter(s => s.id !== existing.id);
        saveDatabase(db);
        return false;
      } else {
        const newSave: SavedEvent = {
          id: `sav-${Date.now()}`,
          eventId,
          userId,
          createdAt: new Date().toISOString(),
        };
        db.savedEvents.push(newSave);
        saveDatabase(db);
        return true;
      }
    },
  },

  // ============ ANALYTICS HELPERS ============
  analytics: {
    // Get total revenue for an event
    getEventRevenue: (eventId: string): number => {
      return db.orders
        .filter(o => o.eventId === eventId && o.status === 'completed')
        .reduce((sum, o) => sum + o.totalAmount, 0);
    },
    // Get total tickets sold for an event
    getEventTicketsSold: (eventId: string): number => {
      return db.tickets.filter(t => t.eventId === eventId && t.status !== 'refunded' && t.status !== 'cancelled').length;
    },
    // Get total capacity for an event
    getEventCapacity: (eventId: string): number => {
      return db.ticketTiers.filter(t => t.eventId === eventId).reduce((sum, t) => sum + t.capacity, 0);
    },
    // Get check-ins for an event
    getEventCheckIns: (eventId: string): number => {
      return db.tickets.filter(t => t.eventId === eventId && t.status === 'used').length;
    },
    // Get community total revenue
    getCommunityRevenue: (communityId: string): number => {
      const communityEventIds = db.events.filter(e => e.communityId === communityId).map(e => e.id);
      return db.orders
        .filter(o => communityEventIds.includes(o.eventId) && o.status === 'completed')
        .reduce((sum, o) => sum + o.totalAmount, 0);
    },
  },
};

// Export type for the database
export type MockDbApi = typeof mockDb;
