import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AppLayout from './layouts/AppLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public / Landing Pages
import LandingPage from './pages/LandingPage';
import Discovery from './pages/Discovery';
import Communities from './pages/Communities';
import About from './pages/About';
import Attendees from './pages/Attendees';
import Organizers from './pages/Organizers';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// App Pages (Attendee)
import AppHub from './pages/AppHub';
import Search from './pages/attendee/Search';
import CommunityHub from './pages/attendee/CommunityHub';
import EventDetails from './pages/attendee/EventDetails';
import Checkout from './pages/attendee/Checkout';
import CheckoutSuccess from './pages/attendee/CheckoutSuccess';
import Wallet from './pages/attendee/Wallet';
import Orders from './pages/attendee/Orders';
import OrderDetail from './pages/attendee/OrderDetail';
import MyCommunities from './pages/attendee/MyCommunities';
import SavedEvents from './pages/attendee/SavedEvents';

// User Account Pages
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';

// Organizer Pages
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/organizer/CreateEvent';
import EditEvent from './pages/organizer/EditEvent';
import EventManagement from './pages/organizer/EventManagement';
import MemberManagement from './pages/organizer/MemberManagement';
import GuestList from './pages/organizer/GuestList';
import Analytics from './pages/organizer/Analytics';
import Scanner from './pages/organizer/Scanner';

// Error Pages
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <div className="bg-dark text-white min-h-screen">
        <ScrollToTop />
        <Routes>
          {/* Public routes with Navbar + Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/discovery" element={<Discovery />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/about" element={<About />} />
            <Route path="/attendees" element={<Attendees />} />
            <Route path="/organizers" element={<Organizers />} />
          </Route>

          {/* Auth routes (no layout - standalone pages) */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          {/* App routes with AppHeader + AppFooter */}
          <Route element={<AppLayout />}>
            <Route path="/app" element={<AppHub />} />
            <Route path="/app/search" element={<Search />} />
            <Route path="/community/:id" element={<CommunityHub />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/my-communities" element={<MyCommunities />} />
            <Route path="/saved" element={<SavedEvents />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Organizer Dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="events/create" element={<CreateEvent />} />
            <Route path="events/:id/edit" element={<EditEvent />} />
            <Route path="events/:id/guests" element={<GuestList />} />
            <Route path="members" element={<MemberManagement />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
          <Route path="/scanner" element={<Scanner />} />

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
