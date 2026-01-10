import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommunitiesHero from '../components/communities/CommunitiesHero';
import EditorialSpotlight from '../components/communities/EditorialSpotlight';
import FrequencyDiscovery from '../components/communities/FrequencyDiscovery';
import CommunityLeaders from '../components/communities/CommunityLeaders';
import InitiationCTA from '../components/communities/InitiationCTA';
import MobileBottomNav from '../components/MobileBottomNav';

export default function Communities() {
  return (
    <>
      <Navbar />
      <CommunitiesHero />
      <EditorialSpotlight />
      <FrequencyDiscovery />
      <CommunityLeaders />
      <InitiationCTA />
      <Footer />
      <MobileBottomNav />
    </>
  );
}
