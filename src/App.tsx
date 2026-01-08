import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/organizer/CreateEvent';
import Scanner from './pages/organizer/Scanner';
import CommunityHub from './pages/attendee/CommunityHub';
import EventDetails from './pages/attendee/EventDetails';
import Checkout from './pages/attendee/Checkout';
import CheckoutSuccess from './pages/attendee/CheckoutSuccess';
import Login from './pages/auth/Login';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Public / Landing */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Attendee Journey */}
        <Route path="/community/:id" element={<CommunityHub />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        
        {/* Organizer Journey */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/events/create" element={<CreateEvent />} />
        <Route path="/scanner" element={<Scanner />} />
        
        {/* Auth & Profile */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;