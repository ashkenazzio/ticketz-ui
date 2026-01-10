import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Discovery from './pages/Discovery';
import Communities from './pages/Communities';
import About from './pages/About';
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
    <div className="bg-dark text-white min-h-screen">
      <Routes>
        {/* Public / Landing */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/discovery" element={<Discovery />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/about" element={<About />} />
        
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
    </div>
  );
}

export default App;