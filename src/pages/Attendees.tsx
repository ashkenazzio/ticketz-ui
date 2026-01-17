import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AttendeesHero from '../components/attendees/AttendeesHero';
import AttendeesManifesto from '../components/attendees/AttendeesManifesto';
import DiscoveryGrid from '../components/attendees/DiscoveryGrid';
import SocialLoop from '../components/attendees/SocialLoop';
import WebWalletFeature from '../components/attendees/WebWalletFeature';
import AttendeeCTA from '../components/attendees/AttendeeCTA';

export default function Attendees() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <main>
        <AttendeesHero />
        <AttendeesManifesto />
        <DiscoveryGrid />
        <SocialLoop />
        <WebWalletFeature />
        <AttendeeCTA />
      </main>
      <Footer />
    </div>
  );
}
