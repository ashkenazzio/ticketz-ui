import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrendingEvents from '../components/TrendingEvents';
import CommunitySpotlight from '../components/CommunitySpotlight';
import EventHighlight from '../components/EventHighlight';
import WalletPreview from '../components/WalletPreview';
import SocialProof from '../components/SocialProof';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrendingEvents />
      <CommunitySpotlight />
      <EventHighlight />
      <WalletPreview />
      <SocialProof />
      <Footer />
      <MobileBottomNav />
    </>
  );
}
