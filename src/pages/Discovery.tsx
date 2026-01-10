import Navbar from '../components/Navbar';
import DiscoveryHero from '../components/discovery/DiscoveryHero';
import DiscoveryTrending from '../components/discovery/DiscoveryTrending';
import DiscoverySpotlight from '../components/discovery/DiscoverySpotlight';
import EventHighlight from '../components/EventHighlight';
import DiscoveryWallet from '../components/discovery/DiscoveryWallet';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';

export default function Discovery() {
  return (
    <>
      <Navbar />
      <DiscoveryHero />
      <DiscoveryTrending />
      <DiscoverySpotlight />
      <EventHighlight />
      <DiscoveryWallet />
      <Footer />
      <MobileBottomNav />
    </>
  );
}
