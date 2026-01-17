import Navbar from '../components/Navbar';
import Hero from '../components/landing/Hero';
import UserTypeSelection from '../components/landing/UserTypeSelection';
import AttendeeZone from '../components/landing/AttendeeZone';
import StatementBreak from '../components/landing/StatementBreak';
import OrganizerZone from '../components/landing/OrganizerZone';
import FairPlay from '../components/landing/FairPlay';
import Spotlight from '../components/landing/Spotlight';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="bg-dark min-h-screen text-white">
      <Navbar />
      <Hero />
      <UserTypeSelection />
      <AttendeeZone />
      <StatementBreak />
      <OrganizerZone />
      <FairPlay />
      <Spotlight />
      <Footer />
    </div>
  );
}