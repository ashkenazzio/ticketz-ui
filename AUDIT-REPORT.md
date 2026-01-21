# Ticketz UI Shell Audit Report
## Design Completeness & Schema Planning

**Date:** January 2026
**Purpose:** Identify missing UI screens/components and finalize data architecture for a complete front-end shell
**Scope:** All user flows (Attendee app, Organizer dashboard, Auth, Community, Social)

---

## Context & Goals

This is a **front-end shell/mockup** project - purely aesthetic and functional as a stub. The goal is to:

1. **Complete all UI screens** so stakeholders can browse the entire product vision
2. **Finalize the UML/schema** so backend development has a clear target
3. **No real functionality** - no auth, no uploads, no payments, no QR scanning

### Key Product Decisions (Finalized)

| Decision | Direction |
|----------|-----------|
| **User Model** | Single `User` entity. Two signup flows (Attendee/Organizer) for UX clarity, but functionally identical. Organizer signup creates user + their first community. |
| **Who can create communities** | Anyone. No gates or approval. Organizer signup is just a convenience flow. |
| **Dashboard scope** | Community-scoped. Picker/switcher when user admins multiple communities. |
| **Ticket transfer** | Out of scope. Removed. |
| **Social/Friends** | Friend request model (mutual acceptance). |
| **Friend discovery** | Search within Community member lists and Event attendee lists. No global user search. |
| **QR Scanner** | Out of scope. Removed. |
| **Recurring events, age gates, refund policies** | Out of scope for shell. |

---

# Part 1: UI Shell Completeness Audit

## 1. Authentication Flows

### Currently Exists
| Screen | File | Status |
|--------|------|--------|
| Login | [Login.tsx](src/pages/auth/Login.tsx) | ✅ Complete |
| Register (Attendee) | [Register.tsx](src/pages/auth/Register.tsx) | ✅ Complete |
| Register (Organizer) | [Register.tsx](src/pages/auth/Register.tsx) | ✅ Complete (same page, type toggle) |

### Missing Screens
| Screen | Priority | Notes |
|--------|----------|-------|
| Forgot Password | Medium | Form to enter email. "Check your inbox" confirmation. |
| Reset Password | Medium | Form with new password fields (accessed via email link stub). |

---

## 2. Attendee App (`/app/*`)

### Currently Exists
| Screen | File | Status |
|--------|------|--------|
| App Hub (Home) | [AppHub.tsx](src/pages/AppHub.tsx) | ✅ Complete |
| Event Discovery | [Discovery.tsx](src/pages/Discovery.tsx) | ✅ Complete |
| Event Details | [EventDetails.tsx](src/pages/attendee/EventDetails.tsx) | ✅ Complete |
| Checkout | [Checkout.tsx](src/pages/attendee/Checkout.tsx) | ✅ Complete |
| Checkout Success | [CheckoutSuccess.tsx](src/pages/attendee/CheckoutSuccess.tsx) | ✅ Complete |
| Ticket Wallet | [Wallet.tsx](src/pages/attendee/Wallet.tsx) | ⚠️ Needs update (remove "transferred" filter) |
| Orders List | [Orders.tsx](src/pages/attendee/Orders.tsx) | ✅ Complete |
| Order Detail | [OrderDetail.tsx](src/pages/attendee/OrderDetail.tsx) | ✅ Complete |
| My Communities | [MyCommunities.tsx](src/pages/attendee/MyCommunities.tsx) | ✅ Complete |
| Saved Events | [SavedEvents.tsx](src/pages/attendee/SavedEvents.tsx) | ✅ Complete |
| Community Hub | [CommunityHub.tsx](src/pages/attendee/CommunityHub.tsx) | ⚠️ Needs additions (see below) |
| User Profile | [UserProfile.tsx](src/pages/UserProfile.tsx) | ✅ Complete |
| Settings | [Settings.tsx](src/pages/Settings.tsx) | ✅ Complete |
| Search | [Search.tsx](src/pages/attendee/Search.tsx) | ✅ Complete |

### Missing/Incomplete Screens

| Screen | Priority | Description |
|--------|----------|-------------|
| **Ticket Detail / QR View** | High | Full-screen ticket view with large QR code, event details, "Add to Wallet" button (stub). Currently "Show QR" button exists but no destination. |
| **Community Member List** | High | Browsable list of community members with search bar. "Add Friend" button per member. Needed for social discovery. |
| **Event Attendees ("Who's Going")** | High | Section on Event Details page showing attendees (with opt-in). Search bar. "Add Friend" button. |
| **Friends List** | High | View all friends. Pending requests (sent/received). Ability to unfriend. |
| **Friend Request Notifications** | Medium | Could be part of a notifications dropdown or dedicated screen. |
| **User Public Profile** | Medium | When you tap on another user (from member list, friends, etc.), what do you see? Avatar, name, mutual communities, "Add Friend" / "Friends" status. |
| **Onboarding Flow** | Low | Post-signup: select interests, follow communities. Nice-to-have for complete UX. |

---

## 3. Organizer Dashboard (`/dashboard/*`)

### Currently Exists
| Screen | File | Status |
|--------|------|--------|
| Dashboard Home | [Dashboard.tsx](src/pages/Dashboard.tsx) | ⚠️ Needs community context |
| Event Management | [EventManagement.tsx](src/pages/organizer/EventManagement.tsx) | ✅ Complete |
| Create Event | [CreateEvent.tsx](src/pages/organizer/CreateEvent.tsx) | ✅ Complete |
| Edit Event | [EditEvent.tsx](src/pages/organizer/EditEvent.tsx) | ✅ Complete |
| Guest List | [GuestList.tsx](src/pages/organizer/GuestList.tsx) | ✅ Complete |
| Member Management | [MemberManagement.tsx](src/pages/organizer/MemberManagement.tsx) | ⚠️ Needs community scoping |
| Analytics | [Analytics.tsx](src/pages/organizer/Analytics.tsx) | ✅ Complete |

### Missing/Incomplete Screens

| Screen | Priority | Description |
|--------|----------|-------------|
| **Community Picker/Switcher** | High | When user admins multiple communities, need UI to switch between them. Could be dropdown in sidebar header or dedicated picker page. |
| **Community Settings** | High | Edit community: name, description, cover image, avatar, tags. Different from user settings. |
| **Create Community** | Medium | For existing users who want to create additional communities. Form: name, description, category, image uploads (stubs). |
| **Team/Staff Management** | Medium | View admins/moderators of current community. Invite new admin (email input stub). Remove/change roles. |
| **Empty States** | Medium | Dashboard with zero events, zero members, zero revenue. Onboarding prompts for new organizers. |

### Dashboard Updates Needed

**Dashboard Home ([Dashboard.tsx](src/pages/Dashboard.tsx)):**
- Add community name in header ("Bass Sector Dashboard")
- Add community switcher if multiple communities in mock data
- Design empty state for new community (no events yet)

**Member Management ([MemberManagement.tsx](src/pages/organizer/MemberManagement.tsx)):**
- Add "Invite Member" or "Invite Admin" button
- Show owner badge (non-removable)
- Clarify this is community members, not event guests

---

## 4. Community Pages

### Currently Exists
| Screen | File | Status |
|--------|------|--------|
| Community Hub (Public) | [CommunityHub.tsx](src/pages/attendee/CommunityHub.tsx) | ⚠️ Needs member list |
| Communities Directory | [Communities.tsx](src/pages/Communities.tsx) | ✅ Complete |

### Missing/Needed Additions

**Community Hub Page Updates:**
- Add "Members" section with browsable list
- Add search bar within member list
- Add "Add Friend" button on each member card
- Show friend status if already friends

---

## 5. Social Features (New)

These screens don't exist yet and are needed for the friend system:

| Screen | Priority | Description |
|--------|----------|-------------|
| **Friends List** | High | All friends, search/filter, unfriend option |
| **Friend Requests** | High | Pending incoming requests (accept/decline), sent requests (cancel) |
| **User Profile (Public)** | High | Other user's profile: avatar, name, bio, mutual communities, mutual friends count, Add Friend / Already Friends / Request Pending states |
| **Notifications** | Medium | Bell icon dropdown or page. Friend requests, event reminders, community updates. |

---

## 6. Components Needed

| Component | Used In | Description |
|-----------|---------|-------------|
| `CommunityPicker` | Dashboard Sidebar | Dropdown to switch between communities user admins |
| `MemberCard` | Community Hub, Event Attendees | User avatar, name, role badge, "Add Friend" button |
| `FriendRequestCard` | Friends page | Shows requester, accept/decline buttons |
| `UserProfileCard` | Public profile | Larger card with full user info |
| `EmptyState` variants | Dashboard, Events, Members | Contextual empty states with CTAs |
| `SearchableList` | Members, Attendees, Friends | Reusable list with search input |

---

# Part 2: Data Architecture

## Current Schema (from UML)

### Entities Present
- User, Role, Permission, PermissionActions
- Community (with moderators array)
- Event, TicketTier, Ticket
- Order, Payment

### Schema Issues to Address

#### 1. Community Membership Model
**Current:** `Community.moderators: [User]` - flat array, no roles

**Problem:** Cannot distinguish owner vs admin vs moderator vs member

**Solution:** Replace with `CommunityMembership` join table

#### 2. No Social Graph
**Current:** No relationship between users

**Problem:** Cannot implement friend system

**Solution:** Add `UserConnection` table

#### 3. Ticket Status
**Current:** Ticket has no status field

**Problem:** Cannot track if ticket was used (scanned) or refunded

**Solution:** Add status field (simplified, no transfer)

---

## Recommended Schema Updates

### New Table: CommunityMembership

Replaces the `moderators` array on Community.

```
CommunityMembership
├── id: cuid (PK)
├── userId: User (FK)
├── communityId: Community (FK)
├── role: 'owner' | 'admin' | 'moderator' | 'member'
├── status: 'active' | 'pending' | 'suspended' | 'banned'
├── joinedAt: datetime
├── invitedBy: User (FK, nullable)
└── UNIQUE(userId, communityId)
```

**Role permissions:**
| Role | Create Events | Manage Members | Edit Community | Delete Community | Financial Access |
|------|--------------|----------------|----------------|------------------|------------------|
| Owner | ✅ | ✅ | ✅ | ✅ | ✅ |
| Admin | ✅ | ✅ | ✅ | ❌ | ❌ |
| Moderator | ❌ | ✅ (limited) | ❌ | ❌ | ❌ |
| Member | ❌ | ❌ | ❌ | ❌ | ❌ |

### New Table: UserConnection (Friends)

```
UserConnection
├── id: cuid (PK)
├── requesterId: User (FK) - who sent the request
├── addresseeId: User (FK) - who received it
├── status: 'pending' | 'accepted' | 'declined' | 'blocked'
├── createdAt: datetime
├── respondedAt: datetime (nullable)
└── UNIQUE(requesterId, addresseeId)
```

**Queries:**
- My friends: `WHERE (requesterId = me OR addresseeId = me) AND status = 'accepted'`
- Pending requests to me: `WHERE addresseeId = me AND status = 'pending'`
- My sent requests: `WHERE requesterId = me AND status = 'pending'`

### New Table: EventAttendee

For "Who's Going" visibility feature.

```
EventAttendee
├── id: cuid (PK)
├── eventId: Event (FK)
├── userId: User (FK)
├── visibility: 'public' | 'friends_only' | 'private'
├── createdAt: datetime
└── UNIQUE(eventId, userId)
```

**Note:** This is separate from Ticket. A user becomes an EventAttendee when they purchase a ticket, but the visibility setting is separate from the ticket itself.

### Updated Table: Ticket

Add status field (simplified - no transfer).

```
Ticket
├── ... existing fields ...
├── status: 'valid' | 'used' | 'refunded' | 'cancelled' | 'expired'
├── usedAt: datetime (nullable) - when scanned/checked in
└── refundedAt: datetime (nullable)
```

### Updated Table: Community

Remove moderators array (replaced by CommunityMembership).

```
Community
├── id: cuid
├── name: string
├── description: text (add if missing)
├── geolocation: string
├── avatar: string
├── coverImage: string
├── tags: string[] (add for categorization)
├── createdAt: datetime
└── updatedAt: datetime

-- REMOVED: moderators: [User]
```

### Optional: Notification Table

For future notifications UI.

```
Notification
├── id: cuid (PK)
├── userId: User (FK) - recipient
├── type: 'friend_request' | 'friend_accepted' | 'event_reminder' | 'community_update'
├── title: string
├── body: text
├── entityType: string (nullable) - 'user', 'event', 'community'
├── entityId: cuid (nullable)
├── isRead: boolean
├── createdAt: datetime
└── readAt: datetime (nullable)
```

---

## Updated UML Entity Summary

```
User
├── id, email, password, name, phone, avatar
├── dateOfBirth, facebookProfile, instagramProfile
└── roles: [Role]

Role
├── id, name (Attendee, Organizer, Admin)
└── permissions: [Permission]

Permission
├── id, action
└── (enum: CAN_CREATE_COMMUNITY, CAN_CREATE_EVENT, etc.)

Community
├── id, name, description, geolocation
├── avatar, coverImage, tags[]
└── createdAt, updatedAt

CommunityMembership (NEW)
├── id, userId, communityId
├── role: owner|admin|moderator|member
├── status: active|pending|suspended|banned
└── joinedAt, invitedBy

Event
├── id, communityId, title, description
├── startTime, endTime, geolocation, image
└── createdAt, updatedAt

TicketTier
├── id, eventId, name, price, capacity
└── (unchanged)

Ticket
├── id, eventId, userId, ticketTierId, orderId
├── status: valid|used|refunded|cancelled|expired (NEW)
├── purchasedAt, usedAt, refundedAt
└── (removed: any transfer fields)

Order
├── id, eventId, userId, status, createdAt
└── (unchanged)

Payment
├── id, orderId, paymentMethod, amount, status, createdAt
└── (unchanged)

UserConnection (NEW)
├── id, requesterId, addresseeId
├── status: pending|accepted|declined|blocked
└── createdAt, respondedAt

EventAttendee (NEW)
├── id, eventId, userId
├── visibility: public|friends_only|private
└── createdAt

Notification (NEW - Optional)
├── id, userId, type, title, body
├── entityType, entityId, isRead
└── createdAt, readAt
```

---

# Part 3: Implementation Priorities

## High Priority (Complete the Core Shell)

1. **Ticket Detail/QR View** - Full-screen ticket, completes wallet flow
2. **Community Member List** - With search, enables social discovery
3. **Friends List & Requests** - Core social feature
4. **Community Picker** - Dashboard needs this for multi-community support
5. **Community Settings** - Organizers need to "edit" their community
6. **User Public Profile** - When tapping on another user

## Medium Priority (Polish)

7. **Event Attendees Section** - "Who's Going" on event page
8. **Team Management** - Invite/manage community admins
9. **Create Community Flow** - For adding additional communities
10. **Empty States** - New user experience
11. **Forgot/Reset Password** - Auth completeness

## Low Priority (Nice to Have)

12. **Notifications Screen** - Could defer to production
13. **Onboarding Flow** - Post-signup interest selection
14. **Advanced Search Filters** - Enhanced discovery

---

# Appendix: File Reference

| Area | Key Files |
|------|-----------|
| Auth | [Login.tsx](src/pages/auth/Login.tsx), [Register.tsx](src/pages/auth/Register.tsx) |
| Attendee App | [AppHub.tsx](src/pages/AppHub.tsx), [Wallet.tsx](src/pages/attendee/Wallet.tsx), [EventDetails.tsx](src/pages/attendee/EventDetails.tsx) |
| Community | [CommunityHub.tsx](src/pages/attendee/CommunityHub.tsx), [Communities.tsx](src/pages/Communities.tsx) |
| Dashboard | [Dashboard.tsx](src/pages/Dashboard.tsx), [EventManagement.tsx](src/pages/organizer/EventManagement.tsx) |
| Components | [TicketCard.tsx](src/components/TicketCard.tsx), [StatusBadge.tsx](src/components/StatusBadge.tsx) |
| Context | [AuthContext.tsx](src/context/AuthContext.tsx) |
| Layouts | [AppLayout.tsx](src/layouts/AppLayout.tsx), [DashboardLayout.tsx](src/layouts/DashboardLayout.tsx) |

---

# Part 4: Schema Gaps Identified During Mock DB Wiring

During the process of wiring UI components to the mock database, the following schema gaps were identified:

## Implemented Schema Additions

### 1. Gallery Images (Event)
**Added:** `galleryImages?: string[]` to Event entity
**Purpose:** Replaced music-specific "Lineup" section with flexible image carousel
**Files:** [types.ts](src/data/types.ts), [mockData.ts](src/data/mockData.ts)

### 2. Mutual Communities Helper
**Added:** `getMutualCommunities(userId1, userId2)` database method
**Purpose:** Display shared communities between users on profiles
**Files:** [database.ts](src/data/database.ts)

### 3. User Communities Helper
**Added:** `getUserCommunities(userId)` database method
**Purpose:** Get all communities a user belongs to (for own profile view)
**Files:** [database.ts](src/data/database.ts)

## Identified But Not Yet Implemented

### 1. Message/Discussion Board Entity
**Status:** Schema gap - using inline mock data
**Current:** MessageBoard.tsx uses hardcoded mock messages
**Needed Schema:**
```
Message
├── id: cuid
├── communityId OR eventId: FK (context)
├── authorId: User (FK)
├── content: text
├── isPinned: boolean
├── parentId: Message (FK, nullable) - for replies
├── createdAt: datetime
└── updatedAt: datetime

MessageLike
├── id: cuid
├── messageId: Message (FK)
├── userId: User (FK)
└── createdAt: datetime
```

### 2. Payment Method Details
**Status:** Displaying mock data "Visa •••• 4242"
**Needed:** Payment entity should include masked card info or connect to actual payment provider data
**Note:** Low priority for shell - would come from payment processor in production

### 3. Team Invitations
**Status:** Not implemented
**Needed Schema:**
```
CommunityInvitation
├── id: cuid
├── communityId: Community (FK)
├── email: string
├── role: CommunityRole
├── invitedBy: User (FK)
├── status: 'pending' | 'accepted' | 'declined' | 'expired'
├── token: string (unique)
├── createdAt: datetime
└── expiresAt: datetime
```

### 4. Saved Communities
**Status:** Users can browse communities but no "follow" without joining
**Needed Schema (optional):**
```
SavedCommunity
├── id: cuid
├── communityId: Community (FK)
├── userId: User (FK)
└── createdAt: datetime
```

## Organizer Pages Still Needing DB Wiring

| Page | File | Status |
|------|------|--------|
| GuestList | [GuestList.tsx](src/pages/organizer/GuestList.tsx) | Uses hardcoded mock data |
| MemberManagement | [MemberManagement.tsx](src/pages/organizer/MemberManagement.tsx) | Uses hardcoded mock data |
| TeamManagement | [TeamManagement.tsx](src/pages/organizer/TeamManagement.tsx) | Uses hardcoded mock data |
| Analytics | [Analytics.tsx](src/pages/organizer/Analytics.tsx) | Partially wired, some mock data |
| EventAnalytics | [EventAnalytics.tsx](src/pages/organizer/EventAnalytics.tsx) | Partially wired |
| RecentActivityTable | [RecentActivityTable.tsx](src/components/dashboard/RecentActivityTable.tsx) | Uses hardcoded mock data |
| SalesChart | [SalesChart.tsx](src/components/dashboard/SalesChart.tsx) | Uses hardcoded mock data |

---

*This audit focuses on UI shell completeness and schema design. No production concerns (security, performance, real integrations) are in scope.*
