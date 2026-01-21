# Ticketz Data Schema & UML Documentation

This document defines the complete data architecture for the Ticketz platform, including all entities, relationships, and enumerations.

---

## Entity Relationship Diagram (Text)

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                    TICKETZ DATA MODEL                                     │
└──────────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────┐         ┌─────────────────────┐         ┌─────────────────┐
│    User     │─────────│ CommunityMembership │─────────│    Community    │
└─────────────┘    *    └─────────────────────┘    *    └─────────────────┘
      │                          │                              │
      │                          │                              │
      │                          │                              │
      ▼                          │                              ▼
┌─────────────────┐              │                       ┌─────────────┐
│ UserConnection  │              │                       │    Event    │
│   (Friends)     │              │                       └─────────────┘
└─────────────────┘              │                              │
      │                          │                              │
      │                          │                              ▼
      │                          │                       ┌─────────────┐
      │                          │                       │ TicketTier  │
      │                          │                       └─────────────┘
      │                          │                              │
      ▼                          ▼                              ▼
┌─────────────────┐       ┌─────────────┐              ┌─────────────┐
│ EventAttendee   │───────│   Ticket    │──────────────│    Order    │
└─────────────────┘       └─────────────┘              └─────────────┘
                                                              │
                                                              ▼
                                                       ┌─────────────┐
                                                       │   Payment   │
                                                       └─────────────┘
```

---

## Entities

### User

The central user entity. Single model for both attendees and organizers.

```typescript
interface User {
  id: string;           // cuid
  email: string;        // unique
  password: string;     // hashed
  name: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  dateOfBirth?: Date;
  location?: string;

  // Social links
  facebookProfile?: string;
  instagramProfile?: string;
  twitterProfile?: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;

  // Relations
  memberships: CommunityMembership[];
  tickets: Ticket[];
  orders: Order[];
  sentConnections: UserConnection[];
  receivedConnections: UserConnection[];
  eventAttendances: EventAttendee[];
  savedEvents: SavedEvent[];
}
```

### Community

A group/organization that hosts events.

```typescript
interface Community {
  id: string;           // cuid
  name: string;
  description?: string;
  geolocation?: string;
  avatar?: string;
  coverImage?: string;

  // Categorization
  primaryCategory: CategoryId;    // Required - main category for filtering/sorting
  secondaryCategory?: CategoryId; // Optional - additional category for discovery
  tags: string[];                 // freeform tags, e.g., ['Dubstep', 'Warehouse', 'Underground']

  // Social links
  website?: string;
  instagram?: string;
  twitter?: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;

  // Relations
  memberships: CommunityMembership[];
  events: Event[];
}

// Unified categories (defined in src/constants/categories.ts)
type CategoryId = 'music' | 'tech' | 'fitness' | 'creative' | 'social' | 'wellness' | 'food' | 'sports' | 'gaming';
```

### CommunityMembership (NEW)

Join table between User and Community with role information.

```typescript
interface CommunityMembership {
  id: string;           // cuid
  userId: string;       // FK -> User
  communityId: string;  // FK -> Community

  role: CommunityRole;  // 'owner' | 'admin' | 'moderator' | 'member'
  status: MemberStatus; // 'active' | 'pending' | 'suspended' | 'banned'

  joinedAt: Date;
  invitedBy?: string;   // FK -> User (nullable)

  // Unique constraint: (userId, communityId)
}

type CommunityRole = 'owner' | 'admin' | 'moderator' | 'member';
type MemberStatus = 'active' | 'pending' | 'suspended' | 'banned';
```

**Role Permissions:**

| Role      | Create Events | Manage Members | Edit Community | Delete Community | Financial Access |
|-----------|--------------|----------------|----------------|------------------|------------------|
| Owner     | ✅           | ✅             | ✅             | ✅               | ✅               |
| Admin     | ✅           | ✅             | ✅             | ❌               | ❌               |
| Moderator | ❌           | ✅ (limited)   | ❌             | ❌               | ❌               |
| Member    | ❌           | ❌             | ❌             | ❌               | ❌               |

### UserConnection (NEW)

Friend request system - bidirectional social connections.

```typescript
interface UserConnection {
  id: string;           // cuid
  requesterId: string;  // FK -> User (who sent)
  addresseeId: string;  // FK -> User (who received)

  status: ConnectionStatus; // 'pending' | 'accepted' | 'declined' | 'blocked'

  createdAt: Date;
  respondedAt?: Date;

  // Unique constraint: (requesterId, addresseeId)
}

type ConnectionStatus = 'pending' | 'accepted' | 'declined' | 'blocked';
```

**Query Examples:**
- My friends: `WHERE (requesterId = me OR addresseeId = me) AND status = 'accepted'`
- Pending requests to me: `WHERE addresseeId = me AND status = 'pending'`
- My sent requests: `WHERE requesterId = me AND status = 'pending'`

### Event

An event hosted by a community.

```typescript
interface Event {
  id: string;           // cuid
  communityId: string;  // FK -> Community

  title: string;
  description?: string;
  category: CategoryId; // Primary category for the event (from unified CATEGORIES)

  // Date/Time - supports both single-day and multi-day events
  // Note: Date type in JS/TS stores full datetime (ISO 8601)
  // Examples:
  //   Single-day: startTime = "2026-03-15T20:00:00Z", endTime = "2026-03-16T02:00:00Z"
  //   Multi-day:  startTime = "2026-11-12T12:00:00Z", endTime = "2026-11-14T23:00:00Z"
  startTime: Date;      // Full datetime when event starts
  endTime: Date;        // Full datetime when event ends

  geolocation?: string;
  venueName?: string;
  venueAddress?: string;

  image?: string;
  coverImage?: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;

  // Relations
  community: Community;
  ticketTiers: TicketTier[];
  tickets: Ticket[];
  attendees: EventAttendee[];
  savedBy: SavedEvent[];
}
```

### TicketTier

Pricing tier for an event (e.g., VIP, General Admission).

```typescript
interface TicketTier {
  id: string;           // cuid
  eventId: string;      // FK -> Event

  name: string;         // e.g., 'VIP', 'General Admission'
  description?: string;
  price: number;        // in cents
  capacity: number;     // max tickets available

  // Relations
  event: Event;
  tickets: Ticket[];
}
```

### Ticket (UPDATED)

A purchased ticket for an event.

```typescript
interface Ticket {
  id: string;           // cuid (also serves as ticket code)
  eventId: string;      // FK -> Event
  userId: string;       // FK -> User
  ticketTierId: string; // FK -> TicketTier
  orderId: string;      // FK -> Order

  status: TicketStatus; // 'valid' | 'used' | 'refunded' | 'cancelled' | 'expired'

  purchasedAt: Date;
  usedAt?: Date;        // when scanned/checked in
  refundedAt?: Date;

  // Relations
  event: Event;
  user: User;
  ticketTier: TicketTier;
  order: Order;
}

type TicketStatus = 'valid' | 'used' | 'refunded' | 'cancelled' | 'expired';
```

### EventAttendee (NEW)

Tracks who's attending an event with visibility preferences.

```typescript
interface EventAttendee {
  id: string;           // cuid
  eventId: string;      // FK -> Event
  userId: string;       // FK -> User

  visibility: AttendeeVisibility; // 'public' | 'friends_only' | 'private'

  createdAt: Date;

  // Unique constraint: (eventId, userId)

  // Relations
  event: Event;
  user: User;
}

type AttendeeVisibility = 'public' | 'friends_only' | 'private';
```

**Note:** A user becomes an EventAttendee when they purchase a ticket. The visibility setting controls who can see them in the "Who's Going" list.

### SavedEvent (NEW)

Tracks events that users have bookmarked/saved for later.

```typescript
interface SavedEvent {
  id: string;           // cuid
  eventId: string;      // FK -> Event
  userId: string;       // FK -> User

  createdAt: Date;

  // Unique constraint: (eventId, userId)

  // Relations
  event: Event;
  user: User;
}
```

**Note:** Users can save events they're interested in before purchasing. This powers the "Saved Events" section in the user's account.

### Order

A purchase transaction.

```typescript
interface Order {
  id: string;           // cuid
  eventId: string;      // FK -> Event
  userId: string;       // FK -> User

  status: OrderStatus;  // 'pending' | 'completed' | 'failed' | 'refunded'
  totalAmount: number;  // in cents

  createdAt: Date;

  // Relations
  event: Event;
  user: User;
  tickets: Ticket[];
  payment?: Payment;
}

type OrderStatus = 'pending' | 'completed' | 'failed' | 'refunded';
```

### Payment

Payment details for an order.

```typescript
interface Payment {
  id: string;           // cuid
  orderId: string;      // FK -> Order (unique)

  paymentMethod: PaymentMethod; // 'card' | 'apple_pay' | 'google_pay'
  amount: number;       // in cents
  status: PaymentStatus; // 'pending' | 'succeeded' | 'failed'

  // External payment reference (e.g., Stripe payment intent)
  externalId?: string;

  createdAt: Date;

  // Relations
  order: Order;
}

type PaymentMethod = 'card' | 'apple_pay' | 'google_pay';
type PaymentStatus = 'pending' | 'succeeded' | 'failed';
```

### Notification (OPTIONAL)

For future notifications system.

```typescript
interface Notification {
  id: string;           // cuid
  userId: string;       // FK -> User (recipient)

  type: NotificationType;
  title: string;
  body?: string;

  // Polymorphic reference
  entityType?: 'user' | 'event' | 'community';
  entityId?: string;

  isRead: boolean;

  createdAt: Date;
  readAt?: Date;

  // Relations
  user: User;
}

type NotificationType =
  | 'friend_request'
  | 'friend_accepted'
  | 'event_reminder'
  | 'community_update'
  | 'ticket_purchased'
  | 'event_cancelled';
```

---

## Enumerations Summary

```typescript
// Categories (unified across events & communities)
type CategoryId = 'music' | 'tech' | 'fitness' | 'creative' | 'social' | 'wellness' | 'food' | 'sports' | 'gaming';

// Community
type CommunityRole = 'owner' | 'admin' | 'moderator' | 'member';
type MemberStatus = 'active' | 'pending' | 'suspended' | 'banned';

// Social
type ConnectionStatus = 'pending' | 'accepted' | 'declined' | 'blocked';
type AttendeeVisibility = 'public' | 'friends_only' | 'private';

// Tickets & Orders
type TicketStatus = 'valid' | 'used' | 'refunded' | 'cancelled' | 'expired';
type OrderStatus = 'pending' | 'completed' | 'failed' | 'refunded';

// Payments
type PaymentMethod = 'card' | 'apple_pay' | 'google_pay';
type PaymentStatus = 'pending' | 'succeeded' | 'failed';

// Notifications
type NotificationType =
  | 'friend_request'
  | 'friend_accepted'
  | 'event_reminder'
  | 'community_update'
  | 'ticket_purchased'
  | 'event_cancelled';
```

---

## Key Design Decisions

### 1. Single User Model
- No separate Attendee/Organizer entities
- Users can be members of multiple communities with different roles
- Organizer signup creates user + their first community where they're the owner

### 2. Community-Scoped Dashboard
- Dashboard is always in context of a specific community
- Community picker allows switching between managed communities
- Roles are per-community, not global

### 3. Friend System
- Bidirectional friend requests (mutual acceptance required)
- No global user search - discovery through:
  - Community member lists
  - Event attendee lists ("Who's Going")
- UserConnection table handles friend request lifecycle

### 4. Ticket Status (Simplified)
- No transfer functionality (removed from scope)
- Status tracks: valid → used (scanned) or refunded/cancelled/expired

### 5. Event Attendee Visibility
- Separate from ticket - controls "Who's Going" visibility
- Options: public (everyone), friends_only, private (hidden)
- Auto-created when ticket purchased

### 6. Owner vs Admin Roles
- Owner: Cannot be removed, has financial access, can delete community
- Admin: Full management except deletion and finances
- Only one owner per community (the "last man standing" protection)

---

## Database Indexes (Recommendations)

```sql
-- User lookups
CREATE UNIQUE INDEX idx_user_email ON User(email);

-- Community membership
CREATE UNIQUE INDEX idx_membership_user_community ON CommunityMembership(userId, communityId);
CREATE INDEX idx_membership_community ON CommunityMembership(communityId);

-- User connections (friends)
CREATE UNIQUE INDEX idx_connection_pair ON UserConnection(requesterId, addresseeId);
CREATE INDEX idx_connection_addressee ON UserConnection(addresseeId, status);

-- Event attendees
CREATE UNIQUE INDEX idx_attendee_event_user ON EventAttendee(eventId, userId);
CREATE INDEX idx_attendee_event ON EventAttendee(eventId);

-- Tickets
CREATE INDEX idx_ticket_user ON Ticket(userId);
CREATE INDEX idx_ticket_event ON Ticket(eventId);
CREATE INDEX idx_ticket_order ON Ticket(orderId);

-- Orders
CREATE INDEX idx_order_user ON Order(userId);
CREATE INDEX idx_order_event ON Order(eventId);

-- Events
CREATE INDEX idx_event_community ON Event(communityId);
CREATE INDEX idx_event_start ON Event(startTime);
CREATE INDEX idx_event_category ON Event(category);

-- Saved events
CREATE UNIQUE INDEX idx_saved_event_user ON SavedEvent(eventId, userId);
CREATE INDEX idx_saved_user ON SavedEvent(userId);
```

---

## Migration from Original Schema

### Changes from Original UML:

1. **Removed:** `Community.moderators: [User]` array
   - **Replaced by:** `CommunityMembership` table with roles

2. **Added:** `CommunityMembership` table
   - Links users to communities with role/status

3. **Added:** `UserConnection` table
   - Friend request system (social graph)

4. **Added:** `EventAttendee` table
   - "Who's Going" feature with visibility control

5. **Added:** `Ticket.status` field
   - Tracks ticket lifecycle: valid → used/refunded/cancelled/expired

6. **Added:** `Ticket.usedAt`, `Ticket.refundedAt` timestamps

7. **Added:** `Community.tags[]`, `Community.description`
   - For categorization and discovery

8. **Removed:** Any transfer-related fields (out of scope)

9. **Added:** `Community.primaryCategory` and `Community.secondaryCategory`
   - Primary category is required for filtering/sorting
   - Secondary category is optional for additional discovery
   - Uses unified CategoryId type from constants

10. **Added:** `Event.category` field
    - Primary category for events (from unified CATEGORIES)

11. **Added:** `SavedEvent` table
    - Tracks user bookmarked/saved events
    - Powers "Saved Events" feature in user account

---

*This schema is designed for the Ticketz community-first ticketing platform. It supports the full feature set defined in AUDIT-REPORT.md and aligns with the UI implementation in src/constants/categories.ts.*
