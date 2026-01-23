import { Ticket, Loader2 } from 'lucide-react';
import '../../styles/design-system.css';

// Layout Components (only Footer components - headers/sidebars cause issues in showcase)
import Footer from '../../components/Footer';
import AppFooter from '../../components/AppFooter';
import StaticSidebar from './showcase/StaticSidebar';

// Public Pages
import LandingPage from '../LandingPage';
import Discovery from '../Discovery';
import Communities from '../Communities';
import About from '../About';
import Attendees from '../Attendees';
import Organizers from '../Organizers';

// Auth Pages
import Login from '../auth/Login';
import Register from '../auth/Register';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';

// Note: AppSplash has auto-redirect, so we create a static version below

// App Pages
import AppHub from '../AppHub';
import Search from '../attendee/Search';
import Wallet from '../attendee/Wallet';
import Orders from '../attendee/Orders';
import MyCommunities from '../attendee/MyCommunities';
import SavedEvents from '../attendee/SavedEvents';
import Friends from '../attendee/Friends';
import Checkout from '../attendee/Checkout';
import CheckoutSuccess from '../attendee/CheckoutSuccess';

// User Account Pages
import UserProfile from '../UserProfile';
import Settings from '../Settings';

// Dashboard Pages
import Dashboard from '../Dashboard';
import EventManagement from '../organizer/EventManagement';
import CreateEvent from '../organizer/CreateEvent';
import MemberManagement from '../organizer/MemberManagement';
import TeamManagement from '../organizer/TeamManagement';
import Analytics from '../organizer/Analytics';
import CommunitySettings from '../organizer/CommunitySettings';
import CreateCommunity from '../organizer/CreateCommunity';

// Dashboard Pages with Dynamic Routes (they have built-in mock data)
import EditEvent from '../organizer/EditEvent';
import GuestList from '../organizer/GuestList';
import EventAnalytics from '../organizer/EventAnalytics';

// Dynamic Route Page Components (static showcase versions)
import StaticEventDetails from './showcase/StaticEventDetails';
import StaticCommunityHub from './showcase/StaticCommunityHub';
import StaticTicketDetail from './showcase/StaticTicketDetail';
import StaticOrderDetail from './showcase/StaticOrderDetail';
import StaticUserPublicProfile from './showcase/StaticUserPublicProfile';
import StaticNotFound from './showcase/StaticNotFound';

// Simple wrapper for public pages (no header - just content + Footer)
function PublicPageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-white/10 overflow-hidden bg-dark">
      <main>{children}</main>
      <Footer />
    </div>
  );
}

// Simple wrapper for app pages (no header - just content + AppFooter)
function AppPageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-white/10 overflow-hidden bg-dark">
      <main className="min-h-screen">{children}</main>
      <AppFooter />
    </div>
  );
}

// Simple wrapper for dashboard pages (StaticSidebar + content)
function DashboardPageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-white/10 overflow-hidden bg-dark flex min-h-[800px]">
      <StaticSidebar />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}

// Standalone page wrapper (no layout)
function StandalonePageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-white/10 overflow-hidden bg-dark">
      {children}
    </div>
  );
}

// Static version of AppSplash (no auto-redirect)
function StaticAppSplash({ state = 'loading' }: { state?: 'loading' | 'ready' }) {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-lime/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-lime/20">
            <Ticket className="w-10 h-10 text-lime" />
          </div>
          <h1 className="font-sans text-3xl font-bold tracking-tight text-white">
            ticketz<span className="text-lime">.</span>
          </h1>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center gap-3 text-gray-400">
          {state === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-lime" />
              <span className="text-sm uppercase tracking-wide">Loading your experience...</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 bg-lime rounded-full animate-pulse"></span>
              <span className="text-sm uppercase tracking-wide text-lime">Ready</span>
            </>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-48 h-1 bg-surface mx-auto rounded-full overflow-hidden">
          <div
            className={`h-full bg-lime transition-all duration-1500 ease-out ${
              state === 'loading' ? 'w-2/3' : 'w-full'
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
}

// Full-width section for pages showcase - titles have padding, content is edge-to-edge
function FullWidthSection({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-20">
      {/* Section Header - with padding */}
      <div className="px-8 lg:px-16 mb-8 pb-4 border-b border-white/10">
        <h2 className="font-display text-2xl uppercase tracking-tight text-white mb-2">
          {title}
        </h2>
        {description && (
          <p className="text-gray-400 text-sm">{description}</p>
        )}
      </div>

      {/* Content - no padding, edge to edge */}
      {children}
    </section>
  );
}

export default function FullPagesShowcase() {
  return (
    <div className="ds-page">
      {/* Header - with padding */}
      <header className="px-8 lg:px-16 pt-8 lg:pt-16 mb-16">
        <div className="mb-4">
          <span className="text-xs font-mono text-lime uppercase tracking-widest">04 / Full Pages</span>
        </div>
        <h1 className="font-display text-4xl uppercase tracking-tight mb-4">
          Full Pages Showcase
        </h1>
        <p className="text-gray-400 max-w-2xl">
          All application pages rendered at full width. Headers are omitted to avoid sticky positioning
          issues - capture headers separately from the Organisms page.
        </p>
      </header>

        {/* ============================================
            PUBLIC PAGES
            ============================================ */}
        <FullWidthSection
          title="Landing Page"
          description="Main marketing homepage with hero and feature sections"
        >

            <PublicPageFrame>
              <LandingPage />
            </PublicPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Events Discovery"
          description="Event browsing and search page"
        >

            <PublicPageFrame>
              <Discovery />
            </PublicPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Communities"
          description="Browse and discover communities"
        >

            <PublicPageFrame>
              <Communities />
            </PublicPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="About"
          description="About the project page"
        >

            <PublicPageFrame>
              <About />
            </PublicPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="For Attendees"
          description="Attendee persona page"
        >

            <PublicPageFrame>
              <Attendees />
            </PublicPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="For Organizers"
          description="Organizer persona page"
        >

            <PublicPageFrame>
              <Organizers />
            </PublicPageFrame>
        </FullWidthSection>

        {/* ============================================
            AUTH PAGES
            ============================================ */}
        <FullWidthSection
          title="Login"
          description="User authentication page"
        >

            <StandalonePageFrame>
              <Login />
            </StandalonePageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Register"
          description="New user registration page"
        >

            <StandalonePageFrame>
              <Register />
            </StandalonePageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Forgot Password"
          description="Password recovery page"
        >

            <StandalonePageFrame>
              <ForgotPassword />
            </StandalonePageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Reset Password"
          description="Password reset form"
        >

            <StandalonePageFrame>
              <ResetPassword />
            </StandalonePageFrame>
        </FullWidthSection>

        {/* ============================================
            TRANSITION PAGES
            ============================================ */}
        <FullWidthSection
          title="App Splash"
          description="Transition screen when entering the app"
        >

            <StandalonePageFrame>
              <StaticAppSplash state="loading" />
            </StandalonePageFrame>

            <StandalonePageFrame>
              <StaticAppSplash state="ready" />
            </StandalonePageFrame>
        </FullWidthSection>

        {/* ============================================
            APP PAGES (ATTENDEE)
            ============================================ */}
        <FullWidthSection
          title="App Hub (Home)"
          description="Main app dashboard for attendees"
        >

            <AppPageFrame>
              <AppHub />
            </AppPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Search / Explore"
          description="Event and community search page"
        >

            <AppPageFrame>
              <Search />
            </AppPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Wallet (My Tickets)"
          description="User's ticket wallet"
        >

            <AppPageFrame>
              <Wallet />
            </AppPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Orders"
          description="Order history page"
        >

            <AppPageFrame>
              <Orders />
            </AppPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="My Communities"
          description="User's joined communities"
        >

            <AppPageFrame>
              <MyCommunities />
            </AppPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Saved Events"
          description="User's saved/bookmarked events"
        >

            <AppPageFrame>
              <SavedEvents />
            </AppPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Friends"
          description="Friends list and requests"
        >

            <AppPageFrame>
              <Friends />
            </AppPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Checkout"
          description="Ticket purchase checkout flow"
        >

            <AppPageFrame>
              <Checkout />
            </AppPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Checkout Success"
          description="Order confirmation page"
        >

            <AppPageFrame>
              <CheckoutSuccess />
            </AppPageFrame>
        </FullWidthSection>

        {/* ============================================
            USER ACCOUNT PAGES
            ============================================ */}
        <FullWidthSection
          title="My Profile"
          description="User's own profile page"
        >

            <AppPageFrame>
              <UserProfile />
            </AppPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Settings"
          description="User settings page"
        >

            <AppPageFrame>
              <Settings />
            </AppPageFrame>
        </FullWidthSection>

        {/* ============================================
            DASHBOARD PAGES (ORGANIZER)
            ============================================ */}
        <FullWidthSection
          title="Dashboard Overview"
          description="Main organizer dashboard"
        >

            <DashboardPageFrame>
              <Dashboard />
            </DashboardPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Event Management"
          description="List and manage events"
        >

            <DashboardPageFrame>
              <EventManagement />
            </DashboardPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Create Event"
          description="New event creation form"
        >

            <DashboardPageFrame>
              <CreateEvent />
            </DashboardPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Member Management"
          description="Community member administration"
        >

            <DashboardPageFrame>
              <MemberManagement />
            </DashboardPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Team Management"
          description="Organizer team and permissions"
        >

            <DashboardPageFrame>
              <TeamManagement />
            </DashboardPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Analytics"
          description="Overall community analytics"
        >

            <DashboardPageFrame>
              <Analytics />
            </DashboardPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Community Settings"
          description="Community configuration"
        >

            <DashboardPageFrame>
              <CommunitySettings />
            </DashboardPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Create Community"
          description="New community creation"
        >

            <DashboardPageFrame>
              <CreateCommunity />
            </DashboardPageFrame>
        </FullWidthSection>

        {/* ============================================
            ERROR PAGES
            ============================================ */}
        <FullWidthSection
          title="404 Not Found"
          description="Page not found error state"
        >

            <StandalonePageFrame>
              <StaticNotFound />
            </StandalonePageFrame>
        </FullWidthSection>

        {/* ============================================
            DYNAMIC ROUTE PAGES (ATTENDEE)
            ============================================ */}
        <FullWidthSection
          title="Event Details"
          description="Individual event page with full details"
        >

            <AppPageFrame>
              <StaticEventDetails />
            </AppPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Community Hub"
          description="Community page with events and members"
        >

            <AppPageFrame>
              <StaticCommunityHub />
            </AppPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Ticket Detail"
          description="Individual ticket view with QR code"
        >

            <AppPageFrame>
              <StaticTicketDetail />
            </AppPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Order Detail"
          description="Order confirmation and details page"
        >

            <AppPageFrame>
              <StaticOrderDetail />
            </AppPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Public Profile"
          description="Another user's public profile page"
        >

            <AppPageFrame>
              <StaticUserPublicProfile />
            </AppPageFrame>
        </FullWidthSection>

        {/* ============================================
            DYNAMIC ROUTE PAGES (DASHBOARD)
            ============================================ */}
        <FullWidthSection
          title="Edit Event"
          description="Event editing form with all tabs"
        >

            <DashboardPageFrame>
              <EditEvent />
            </DashboardPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Guest List"
          description="Event guest list management"
        >

            <DashboardPageFrame>
              <GuestList />
            </DashboardPageFrame>
        </FullWidthSection>

        <FullWidthSection
          title="Event Analytics"
          description="Individual event analytics and stats"
        >

            <DashboardPageFrame>
              <EventAnalytics />
            </DashboardPageFrame>
        </FullWidthSection>
    </div>
  );
}
