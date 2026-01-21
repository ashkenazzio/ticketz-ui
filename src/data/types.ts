// Data types based on SCHEMA.md
// These types mirror the schema for the mock database

export type CategoryId = 'music' | 'tech' | 'fitness' | 'creative' | 'social' | 'wellness' | 'food' | 'sports' | 'gaming';

export type CommunityRole = 'owner' | 'admin' | 'moderator' | 'member';
export type MemberStatus = 'active' | 'pending' | 'suspended' | 'banned';
export type ConnectionStatus = 'pending' | 'accepted' | 'declined' | 'blocked';
export type AttendeeVisibility = 'public' | 'friends_only' | 'private';
export type TicketStatus = 'valid' | 'used' | 'refunded' | 'cancelled' | 'expired';
export type OrderStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'card' | 'apple_pay' | 'google_pay';
export type PaymentStatus = 'pending' | 'succeeded' | 'failed';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  dateOfBirth?: string; // ISO date string
  location?: string;
  facebookProfile?: string;
  instagramProfile?: string;
  twitterProfile?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Community {
  id: string;
  name: string;
  description?: string;
  geolocation?: string;
  avatar?: string;
  coverImage?: string;
  primaryCategory: CategoryId;
  secondaryCategory?: CategoryId;
  tags: string[];
  website?: string;
  instagram?: string;
  twitter?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityMembership {
  id: string;
  userId: string;
  communityId: string;
  role: CommunityRole;
  status: MemberStatus;
  joinedAt: string;
  invitedBy?: string;
}

export interface UserConnection {
  id: string;
  requesterId: string;
  addresseeId: string;
  status: ConnectionStatus;
  createdAt: string;
  respondedAt?: string;
}

export interface Event {
  id: string;
  communityId: string;
  title: string;
  description?: string;
  category: CategoryId;
  startTime: string; // ISO datetime
  endTime: string;   // ISO datetime
  geolocation?: string;
  venueName?: string;
  venueAddress?: string;
  image?: string;
  coverImage?: string;
  galleryImages?: string[]; // Array of image URLs for event gallery/carousel
  createdAt: string;
  updatedAt: string;
}

export interface TicketTier {
  id: string;
  eventId: string;
  name: string;
  description?: string;
  price: number; // in cents
  capacity: number;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  ticketTierId: string;
  orderId: string;
  status: TicketStatus;
  purchasedAt: string;
  usedAt?: string;
  refundedAt?: string;
}

export interface EventAttendee {
  id: string;
  eventId: string;
  userId: string;
  visibility: AttendeeVisibility;
  createdAt: string;
}

export interface SavedEvent {
  id: string;
  eventId: string;
  userId: string;
  createdAt: string;
}

export interface Order {
  id: string;
  eventId: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number; // in cents
  createdAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  paymentMethod: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  externalId?: string;
  createdAt: string;
}

// Database structure
export interface MockDatabase {
  users: User[];
  communities: Community[];
  memberships: CommunityMembership[];
  connections: UserConnection[];
  events: Event[];
  ticketTiers: TicketTier[];
  tickets: Ticket[];
  attendees: EventAttendee[];
  savedEvents: SavedEvent[];
  orders: Order[];
  payments: Payment[];
  currentUserId: string; // ID of the logged-in user
}
