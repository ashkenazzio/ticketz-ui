import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';

// Public / Landing Pages
import LandingPage from './pages/LandingPage';
import AppHub from './pages/AppHub';
import Discovery from './pages/Discovery';
import Communities from './pages/Communities';
import About from './pages/About';
import Attendees from './pages/Attendees';
import Organizers from './pages/Organizers';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// User Account Pages
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';

// Attendee Pages
import CommunityHub from './pages/attendee/CommunityHub';
import EventDetails from './pages/attendee/EventDetails';
import Checkout from './pages/attendee/Checkout';
import CheckoutSuccess from './pages/attendee/CheckoutSuccess';
import Wallet from './pages/attendee/Wallet';
import Orders from './pages/attendee/Orders';
import OrderDetail from './pages/attendee/OrderDetail';
import MyCommunities from './pages/attendee/MyCommunities';
import SavedEvents from './pages/attendee/SavedEvents';

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
        {/* Public / Landing */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppHub />} />
        <Route path="/discovery" element={<Discovery />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/about" element={<About />} />
        <Route path="/attendees" element={<Attendees />} />
        <Route path="/organizers" element={<Organizers />} />

        {/* Auth */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* User Account */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/settings" element={<Settings />} />

        {/* Attendee Journey */}
        <Route path="/community/:id" element={<CommunityHub />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/my-communities" element={<MyCommunities />} />
        <Route path="/saved" element={<SavedEvents />} />

        {/* Organizer Journey */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/events" element={<EventManagement />} />
        <Route path="/dashboard/events/create" element={<CreateEvent />} />
        <Route path="/dashboard/events/:id/edit" element={<EditEvent />} />
        <Route path="/dashboard/events/:id/guests" element={<GuestList />} />
        <Route path="/dashboard/members" element={<MemberManagement />} />
        <Route path="/dashboard/analytics" element={<Analytics />} />
        <Route path="/scanner" element={<Scanner />} />

        {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
