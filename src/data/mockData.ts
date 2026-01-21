import type {
  MockDatabase,
  User,
  Community,
  CommunityMembership,
  UserConnection,
  Event,
  TicketTier,
  Ticket,
  EventAttendee,
  SavedEvent,
  Order,
  Payment,
} from './types';

// Helper to create ISO dates
const now = new Date();
const isoDate = (daysOffset = 0, hours = 0, minutes = 0) => {
  const date = new Date(now);
  date.setDate(date.getDate() + daysOffset);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};

// Current user (logged-in user)
const CURRENT_USER_ID = 'user-001';

// ============ USERS ============
const users: User[] = [
  {
    id: 'user-001',
    email: 'alex@example.com',
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
    bio: 'Music enthusiast and fitness junkie. Always looking for the next adventure.',
    location: 'Los Angeles, CA',
    instagramProfile: '@alexrivera',
    createdAt: isoDate(-365),
    updatedAt: isoDate(-10),
  },
  {
    id: 'user-002',
    email: 'sarah@example.com',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    bio: 'Bass music lover. Catch me at the front of every show.',
    location: 'Los Angeles, CA',
    createdAt: isoDate(-300),
    updatedAt: isoDate(-5),
  },
  {
    id: 'user-003',
    email: 'marcus@example.com',
    name: 'Marcus Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    bio: 'Running is my therapy. 5K enthusiast.',
    location: 'San Francisco, CA',
    createdAt: isoDate(-250),
    updatedAt: isoDate(-15),
  },
  {
    id: 'user-004',
    email: 'nina@example.com',
    name: 'Nina Patel',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    bio: 'Tech meetups and electronic music.',
    location: 'Seattle, WA',
    createdAt: isoDate(-200),
    updatedAt: isoDate(-3),
  },
  {
    id: 'user-005',
    email: 'tyler@example.com',
    name: 'Tyler Brooks',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    bio: 'Community organizer for Bass Sector.',
    location: 'Los Angeles, CA',
    createdAt: isoDate(-400),
    updatedAt: isoDate(-1),
  },
  {
    id: 'user-006',
    email: 'emma@example.com',
    name: 'Emma Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    bio: 'Festival season is my favorite season.',
    location: 'Miami, FL',
    createdAt: isoDate(-180),
    updatedAt: isoDate(-7),
  },
  {
    id: 'user-007',
    email: 'jordan@example.com',
    name: 'Jordan Lee',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80',
    bio: 'Developer by day, runner by morning.',
    location: 'Austin, TX',
    createdAt: isoDate(-150),
    updatedAt: isoDate(-20),
  },
  {
    id: 'user-008',
    email: 'maya@example.com',
    name: 'Maya Williams',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    bio: 'Urban Striders co-founder.',
    location: 'San Francisco, CA',
    createdAt: isoDate(-350),
    updatedAt: isoDate(-2),
  },
];

// ============ COMMUNITIES ============
const communities: Community[] = [
  {
    id: 'comm-001',
    name: 'Bass Sector',
    description: "Bass Sector is LA's premier underground bass music collective. Since 2019, we've been bringing the deepest dubstep, drum & bass, and experimental bass sounds to warehouses and clubs across Southern California.",
    geolocation: 'Los Angeles, CA',
    avatar: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=1200&q=80',
    primaryCategory: 'music',
    secondaryCategory: 'social',
    tags: ['Dubstep', 'Drum & Bass', 'Bass Music', 'Warehouse', 'Underground'],
    website: 'https://basssector.com',
    instagram: '@basssector',
    twitter: '@basssectorla',
    createdAt: isoDate(-500),
    updatedAt: isoDate(-1),
  },
  {
    id: 'comm-002',
    name: 'Urban Striders',
    description: 'San Francisco\'s most vibrant running community. We host weekly group runs, monthly themed races, and an annual marathon training program. All paces welcome!',
    geolocation: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&q=80',
    primaryCategory: 'fitness',
    secondaryCategory: 'wellness',
    tags: ['Running', '5K', 'Marathon', 'Group Runs', 'Fitness'],
    website: 'https://urbanstriders.run',
    instagram: '@urbanstriders',
    createdAt: isoDate(-400),
    updatedAt: isoDate(-3),
  },
  {
    id: 'comm-003',
    name: 'JS Collective',
    description: 'A community for JavaScript developers in the Pacific Northwest. Monthly meetups, workshops, and hackathons. From React to Node, we cover it all.',
    geolocation: 'Seattle, WA',
    avatar: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
    primaryCategory: 'tech',
    secondaryCategory: 'social',
    tags: ['JavaScript', 'React', 'Node.js', 'Web Development', 'Meetups'],
    website: 'https://jscollective.dev',
    twitter: '@jscollective',
    createdAt: isoDate(-300),
    updatedAt: isoDate(-5),
  },
];

// ============ MEMBERSHIPS ============
const memberships: CommunityMembership[] = [
  // Bass Sector memberships
  { id: 'mem-001', userId: 'user-005', communityId: 'comm-001', role: 'owner', status: 'active', joinedAt: isoDate(-500) },
  { id: 'mem-002', userId: 'user-001', communityId: 'comm-001', role: 'admin', status: 'active', joinedAt: isoDate(-200) },
  { id: 'mem-003', userId: 'user-002', communityId: 'comm-001', role: 'moderator', status: 'active', joinedAt: isoDate(-300) },
  { id: 'mem-004', userId: 'user-004', communityId: 'comm-001', role: 'member', status: 'active', joinedAt: isoDate(-100) },
  { id: 'mem-005', userId: 'user-006', communityId: 'comm-001', role: 'member', status: 'active', joinedAt: isoDate(-50) },

  // Urban Striders memberships
  { id: 'mem-006', userId: 'user-008', communityId: 'comm-002', role: 'owner', status: 'active', joinedAt: isoDate(-400) },
  { id: 'mem-007', userId: 'user-001', communityId: 'comm-002', role: 'member', status: 'active', joinedAt: isoDate(-150) },
  { id: 'mem-008', userId: 'user-003', communityId: 'comm-002', role: 'admin', status: 'active', joinedAt: isoDate(-350) },
  { id: 'mem-009', userId: 'user-007', communityId: 'comm-002', role: 'member', status: 'active', joinedAt: isoDate(-80) },

  // JS Collective memberships
  { id: 'mem-010', userId: 'user-004', communityId: 'comm-003', role: 'owner', status: 'active', joinedAt: isoDate(-300) },
  { id: 'mem-011', userId: 'user-001', communityId: 'comm-003', role: 'member', status: 'active', joinedAt: isoDate(-100) },
  { id: 'mem-012', userId: 'user-007', communityId: 'comm-003', role: 'moderator', status: 'active', joinedAt: isoDate(-200) },
];

// ============ USER CONNECTIONS (Friends) ============
const connections: UserConnection[] = [
  // Alex's friends
  { id: 'conn-001', requesterId: 'user-002', addresseeId: 'user-001', status: 'accepted', createdAt: isoDate(-180), respondedAt: isoDate(-179) },
  { id: 'conn-002', requesterId: 'user-001', addresseeId: 'user-003', status: 'accepted', createdAt: isoDate(-150), respondedAt: isoDate(-149) },
  { id: 'conn-003', requesterId: 'user-004', addresseeId: 'user-001', status: 'accepted', createdAt: isoDate(-100), respondedAt: isoDate(-99) },
  { id: 'conn-004', requesterId: 'user-006', addresseeId: 'user-001', status: 'pending', createdAt: isoDate(-5) },
  // Other connections
  { id: 'conn-005', requesterId: 'user-002', addresseeId: 'user-005', status: 'accepted', createdAt: isoDate(-200), respondedAt: isoDate(-199) },
  { id: 'conn-006', requesterId: 'user-003', addresseeId: 'user-008', status: 'accepted', createdAt: isoDate(-300), respondedAt: isoDate(-299) },
];

// ============ EVENTS ============
const events: Event[] = [
  // Multi-day event (Music Festival)
  {
    id: 'evt-001',
    communityId: 'comm-001',
    title: 'Electric Garden',
    description: 'Immerse yourself in a botanical auditory experience. Electric Garden transforms the city\'s historic conservatory into a 3-day electronic music haven. Featuring state-of-the-art projection mapping on organic structures, world-class sound systems, and an incredible lineup of bass music artists.',
    category: 'music',
    startTime: '2026-11-12T12:00:00Z',
    endTime: '2026-11-14T23:00:00Z',
    venueName: 'The Conservatory',
    venueAddress: '1200 Flower District Blvd, Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
      'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=80',
    ],
    createdAt: isoDate(-60),
    updatedAt: isoDate(-5),
  },
  // Single-day event (5K Run)
  {
    id: 'evt-002',
    communityId: 'comm-002',
    title: 'Neon Sunrise 5K',
    description: 'Start your day with an electrifying dawn run through the city! Neon Sunrise 5K features glow-in-the-dark gear, live DJs at each mile marker, and an epic finish line party. All paces welcome - run, jog, or walk your way to the sunrise.',
    category: 'fitness',
    startTime: '2026-03-08T06:00:00Z',
    endTime: '2026-03-08T10:00:00Z',
    venueName: 'City Park',
    venueAddress: 'Golden Gate Park, San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80',
      'https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800&q=80',
    ],
    createdAt: isoDate(-90),
    updatedAt: isoDate(-10),
  },
  // Single-day event (Tech Meetup)
  {
    id: 'evt-003',
    communityId: 'comm-003',
    title: 'React Summit Northwest',
    description: 'A full day of React talks, workshops, and networking. Learn from industry experts about the latest in React 19, Server Components, and the future of web development. Includes lunch and an afterparty.',
    category: 'tech',
    startTime: '2026-04-15T09:00:00Z',
    endTime: '2026-04-15T21:00:00Z',
    venueName: 'Tech Hub Seattle',
    venueAddress: '500 Innovation Way, Seattle, WA',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    createdAt: isoDate(-45),
    updatedAt: isoDate(-2),
  },
  // Draft event
  {
    id: 'evt-004',
    communityId: 'comm-001',
    title: 'NYE Countdown 2027',
    description: 'Ring in the new year with Bass Sector! Our annual NYE bash features 12 hours of non-stop bass music, midnight champagne toast, and the best crowd in LA.',
    category: 'music',
    startTime: '2026-12-31T20:00:00Z',
    endTime: '2027-01-01T08:00:00Z',
    venueName: 'Sky Lounge',
    venueAddress: '100 Skyline Blvd, Miami, FL',
    image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=1200&q=80',
    createdAt: isoDate(-20),
    updatedAt: isoDate(-1),
  },
  // Past event
  {
    id: 'evt-005',
    communityId: 'comm-001',
    title: 'Summer Festival 2025',
    description: 'Our biggest event of the year! Three stages, 50+ artists, and 2 days of unforgettable bass music.',
    category: 'music',
    startTime: '2025-08-20T14:00:00Z',
    endTime: '2025-08-21T02:00:00Z',
    venueName: 'Central Park',
    venueAddress: 'Central Park, New York, NY',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80',
    createdAt: isoDate(-200),
    updatedAt: isoDate(-150),
  },
];

// ============ TICKET TIERS ============
const ticketTiers: TicketTier[] = [
  // Electric Garden tiers
  { id: 'tier-001', eventId: 'evt-001', name: 'VIP', description: 'Front stage access, private bar, artist meet & greet', price: 15000, capacity: 50 },
  { id: 'tier-002', eventId: 'evt-001', name: 'Early Bird', description: 'Limited early pricing', price: 3500, capacity: 100 },
  { id: 'tier-003', eventId: 'evt-001', name: 'General Admission', description: 'Full festival access', price: 4500, capacity: 350 },

  // Neon Sunrise 5K tiers
  { id: 'tier-004', eventId: 'evt-002', name: 'Runner', description: 'Race entry with t-shirt and medal', price: 4500, capacity: 250 },
  { id: 'tier-005', eventId: 'evt-002', name: 'Runner + Afterparty', description: 'Race entry plus breakfast afterparty', price: 6500, capacity: 50 },

  // React Summit tiers
  { id: 'tier-006', eventId: 'evt-003', name: 'Conference Pass', description: 'Full day access with lunch', price: 19900, capacity: 200 },
  { id: 'tier-007', eventId: 'evt-003', name: 'Workshop Bundle', description: 'Conference + hands-on workshop', price: 29900, capacity: 50 },

  // NYE Countdown tiers
  { id: 'tier-008', eventId: 'evt-004', name: 'General Admission', description: 'Entry + one drink ticket', price: 8900, capacity: 400 },

  // Summer Festival tiers (past)
  { id: 'tier-009', eventId: 'evt-005', name: 'General Admission', description: '2-day pass', price: 5000, capacity: 1000 },
];

// ============ ORDERS ============
const orders: Order[] = [
  { id: 'ord-001', eventId: 'evt-001', userId: 'user-001', status: 'completed', totalAmount: 15000, createdAt: isoDate(-30) },
  { id: 'ord-002', eventId: 'evt-002', userId: 'user-001', status: 'completed', totalAmount: 4500, createdAt: isoDate(-45) },
  { id: 'ord-003', eventId: 'evt-005', userId: 'user-001', status: 'completed', totalAmount: 5000, createdAt: isoDate(-180) },
  { id: 'ord-004', eventId: 'evt-001', userId: 'user-002', status: 'completed', totalAmount: 4500, createdAt: isoDate(-25) },
  { id: 'ord-005', eventId: 'evt-001', userId: 'user-003', status: 'completed', totalAmount: 4500, createdAt: isoDate(-20) },
  { id: 'ord-006', eventId: 'evt-002', userId: 'user-003', status: 'completed', totalAmount: 6500, createdAt: isoDate(-40) },
];

// ============ TICKETS ============
const tickets: Ticket[] = [
  { id: 'tkt-001', eventId: 'evt-001', userId: 'user-001', ticketTierId: 'tier-001', orderId: 'ord-001', status: 'valid', purchasedAt: isoDate(-30) },
  { id: 'tkt-002', eventId: 'evt-002', userId: 'user-001', ticketTierId: 'tier-004', orderId: 'ord-002', status: 'valid', purchasedAt: isoDate(-45) },
  { id: 'tkt-003', eventId: 'evt-005', userId: 'user-001', ticketTierId: 'tier-009', orderId: 'ord-003', status: 'used', purchasedAt: isoDate(-180), usedAt: isoDate(-155) },
  { id: 'tkt-004', eventId: 'evt-001', userId: 'user-002', ticketTierId: 'tier-003', orderId: 'ord-004', status: 'valid', purchasedAt: isoDate(-25) },
  { id: 'tkt-005', eventId: 'evt-001', userId: 'user-003', ticketTierId: 'tier-003', orderId: 'ord-005', status: 'valid', purchasedAt: isoDate(-20) },
  { id: 'tkt-006', eventId: 'evt-002', userId: 'user-003', ticketTierId: 'tier-005', orderId: 'ord-006', status: 'valid', purchasedAt: isoDate(-40) },
];

// ============ PAYMENTS ============
const payments: Payment[] = [
  { id: 'pay-001', orderId: 'ord-001', paymentMethod: 'card', amount: 15000, status: 'succeeded', createdAt: isoDate(-30) },
  { id: 'pay-002', orderId: 'ord-002', paymentMethod: 'apple_pay', amount: 4500, status: 'succeeded', createdAt: isoDate(-45) },
  { id: 'pay-003', orderId: 'ord-003', paymentMethod: 'card', amount: 5000, status: 'succeeded', createdAt: isoDate(-180) },
  { id: 'pay-004', orderId: 'ord-004', paymentMethod: 'card', amount: 4500, status: 'succeeded', createdAt: isoDate(-25) },
  { id: 'pay-005', orderId: 'ord-005', paymentMethod: 'google_pay', amount: 4500, status: 'succeeded', createdAt: isoDate(-20) },
  { id: 'pay-006', orderId: 'ord-006', paymentMethod: 'card', amount: 6500, status: 'succeeded', createdAt: isoDate(-40) },
];

// ============ EVENT ATTENDEES ============
const attendees: EventAttendee[] = [
  { id: 'att-001', eventId: 'evt-001', userId: 'user-001', visibility: 'public', createdAt: isoDate(-30) },
  { id: 'att-002', eventId: 'evt-001', userId: 'user-002', visibility: 'public', createdAt: isoDate(-25) },
  { id: 'att-003', eventId: 'evt-001', userId: 'user-003', visibility: 'friends_only', createdAt: isoDate(-20) },
  { id: 'att-004', eventId: 'evt-001', userId: 'user-004', visibility: 'public', createdAt: isoDate(-15) },
  { id: 'att-005', eventId: 'evt-001', userId: 'user-006', visibility: 'public', createdAt: isoDate(-10) },
  { id: 'att-006', eventId: 'evt-002', userId: 'user-001', visibility: 'public', createdAt: isoDate(-45) },
  { id: 'att-007', eventId: 'evt-002', userId: 'user-003', visibility: 'public', createdAt: isoDate(-40) },
  { id: 'att-008', eventId: 'evt-002', userId: 'user-007', visibility: 'friends_only', createdAt: isoDate(-35) },
  { id: 'att-009', eventId: 'evt-002', userId: 'user-008', visibility: 'public', createdAt: isoDate(-30) },
];

// ============ SAVED EVENTS ============
const savedEvents: SavedEvent[] = [
  { id: 'sav-001', eventId: 'evt-003', userId: 'user-001', createdAt: isoDate(-10) },
  { id: 'sav-002', eventId: 'evt-004', userId: 'user-001', createdAt: isoDate(-5) },
];

// ============ FULL DATABASE ============
export const initialMockData: MockDatabase = {
  users,
  communities,
  memberships,
  connections,
  events,
  ticketTiers,
  tickets,
  attendees,
  savedEvents,
  orders,
  payments,
  currentUserId: CURRENT_USER_ID,
};
