import DiscoveryHero from '../components/discovery/DiscoveryHero';
import DiscoveryTrending from '../components/discovery/DiscoveryTrending';
import DiscoverySpotlight from '../components/discovery/DiscoverySpotlight';
import EventHighlight from '../components/EventHighlight';
import DiscoveryWallet from '../components/discovery/DiscoveryWallet';

export default function Discovery() {
  return (
    <>
      <DiscoveryHero />
      <DiscoveryTrending />
      <DiscoverySpotlight />
      <EventHighlight />
      <DiscoveryWallet />
    </>
  );
}
