import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OrganizersHero from '../components/organizers/OrganizersHero';
import OrganizerPhilosophy from '../components/organizers/OrganizerPhilosophy';
import OrganizerFeatures from '../components/organizers/OrganizerFeatures';
import OrganizerGrowthGrid from '../components/organizers/OrganizerGrowthGrid';
import OrganizerFinancials from '../components/organizers/OrganizerFinancials';
import OrganizerCTA from '../components/organizers/OrganizerCTA';

export default function Organizers() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <main>
        <OrganizersHero />
        <OrganizerPhilosophy />
        <OrganizerFeatures />
        <OrganizerGrowthGrid />
        <OrganizerFinancials />
        <OrganizerCTA />
      </main>
      <Footer />
    </div>
  );
}
