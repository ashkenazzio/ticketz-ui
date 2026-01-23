import '../../styles/design-system.css';

// Full-width section for marketing showcase - titles have padding, content is edge-to-edge
function FullWidthSection({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-20">
      {/* Section Header - with padding */}
      <div className="px-8 lg:px-16 mb-8 pb-4 border-b border-white/10">
        <h2 className="font-display text-2xl uppercase tracking-tight text-white mb-2">
          {title}
        </h2>
        {description && (
          <p className="text-gray-400 text-sm">{description}</p>
        )}
      </div>

      {/* Content - no padding, edge to edge */}
      {children}
    </section>
  );
}

// Landing Page Components
import Hero from '../../components/landing/Hero';
import UserTypeSelection from '../../components/landing/UserTypeSelection';
import AttendeeZone from '../../components/landing/AttendeeZone';
import StatementBreak from '../../components/landing/StatementBreak';
import OrganizerZone from '../../components/landing/OrganizerZone';
import FairPlay from '../../components/landing/FairPlay';
import Spotlight from '../../components/landing/Spotlight';

// Discovery Page Components
import DiscoveryHero from '../../components/discovery/DiscoveryHero';
import DiscoveryTrending from '../../components/discovery/DiscoveryTrending';
import DiscoverySpotlight from '../../components/discovery/DiscoverySpotlight';
import DiscoveryWallet from '../../components/discovery/DiscoveryWallet';

// Communities Page Components
import CommunitiesHero from '../../components/communities/CommunitiesHero';
import EditorialSpotlight from '../../components/communities/EditorialSpotlight';
import FrequencyDiscovery from '../../components/communities/FrequencyDiscovery';
import CommunityLeaders from '../../components/communities/CommunityLeaders';
import InitiationCTA from '../../components/communities/InitiationCTA';

// Attendees Persona Page Components
import AttendeesHero from '../../components/attendees/AttendeesHero';
import AttendeesManifesto from '../../components/attendees/AttendeesManifesto';
import DiscoveryGrid from '../../components/attendees/DiscoveryGrid';
import SocialLoop from '../../components/attendees/SocialLoop';
import WebWalletFeature from '../../components/attendees/WebWalletFeature';
import AttendeeCTA from '../../components/attendees/AttendeeCTA';

// Organizers Persona Page Components
import OrganizersHero from '../../components/organizers/OrganizersHero';
import OrganizerPhilosophy from '../../components/organizers/OrganizerPhilosophy';
import OrganizerFeatures from '../../components/organizers/OrganizerFeatures';
import OrganizerGrowthGrid from '../../components/organizers/OrganizerGrowthGrid';
import OrganizerFinancials from '../../components/organizers/OrganizerFinancials';
import OrganizerCTA from '../../components/organizers/OrganizerCTA';

// About Page Components
import AboutHero from '../../components/about/AboutHero';
import ArchitectureDiagram from '../../components/about/ArchitectureDiagram';
import TechStack from '../../components/about/TechStack';
import TypeSafetySection from '../../components/about/TypeSafetySection';
import DataModel from '../../components/about/DataModel';
import Infrastructure from '../../components/about/Infrastructure';
import NoAIBadge from '../../components/about/NoAIBadge';

// Generic Marketing Components
import EventHighlight from '../../components/EventHighlight';

export default function MarketingSectionsPage() {
  return (
    <div className="ds-page">
      {/* Header - with padding */}
      <header className="px-8 lg:px-16 pt-8 lg:pt-16 mb-16">
        <div className="mb-4">
          <span className="text-xs font-mono text-lime uppercase tracking-widest">05 / Marketing Sections</span>
        </div>
        <h1 className="font-display text-4xl uppercase tracking-tight mb-4">
          Marketing Sections
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Full-width marketing sections used on public-facing pages. These are complex organisms
          that combine multiple components into cohesive page sections.
        </p>
      </header>

        {/* ============================================
            LANDING PAGE SECTIONS
            ============================================ */}
        <FullWidthSection
          title="Landing Page - Hero"
          description="Main hero section with floating UI elements and CTAs"
        >

            <Hero />
        </FullWidthSection>

        <FullWidthSection
          title="Landing Page - User Type Selection"
          description="Dual-path card selection for attendees vs organizers"
        >

            <UserTypeSelection />
        </FullWidthSection>

        <FullWidthSection
          title="Landing Page - Attendee Zone"
          description="Bento grid showcasing event categories"
        >

            <AttendeeZone />
        </FullWidthSection>

        <FullWidthSection
          title="Landing Page - Statement Break"
          description="Bold typographic statement section"
        >

            <StatementBreak />
        </FullWidthSection>

        <FullWidthSection
          title="Landing Page - Organizer Zone"
          description="Feature showcase with dashboard preview"
        >

            <OrganizerZone />
        </FullWidthSection>

        <FullWidthSection
          title="Landing Page - Fair Play"
          description="Value proposition with feature cards"
        >

            <FairPlay />
        </FullWidthSection>

        <FullWidthSection
          title="Landing Page - Spotlight"
          description="Community leader testimonial section"
        >

            <Spotlight />
        </FullWidthSection>

        {/* ============================================
            DISCOVERY PAGE SECTIONS
            ============================================ */}
        <FullWidthSection
          title="Discovery Page - Hero"
          description="Event search hero with photo gallery"
        >

            <DiscoveryHero />
        </FullWidthSection>

        <FullWidthSection
          title="Discovery Page - Trending"
          description="Trending events card grid"
        >

            <DiscoveryTrending />
        </FullWidthSection>

        <FullWidthSection
          title="Discovery Page - Community Spotlight"
          description="Featured community showcase"
        >

            <DiscoverySpotlight />
        </FullWidthSection>

        <FullWidthSection
          title="Discovery Page - Wallet Preview"
          description="Wallet feature preview section"
        >

            <DiscoveryWallet />
        </FullWidthSection>

        {/* ============================================
            COMMUNITIES PAGE SECTIONS
            ============================================ */}
        <FullWidthSection
          title="Communities Page - Hero"
          description="Community search hero with featured grid"
        >

            <CommunitiesHero />
        </FullWidthSection>

        <FullWidthSection
          title="Communities Page - Editorial Spotlight"
          description="Featured community with overlapping content"
        >

            <EditorialSpotlight />
        </FullWidthSection>

        <FullWidthSection
          title="Communities Page - Frequency Discovery"
          description="Horizontal scrolling category cards"
        >

            <FrequencyDiscovery />
        </FullWidthSection>

        <FullWidthSection
          title="Communities Page - Community Leaders"
          description="Leader profiles with testimonials"
        >

            <CommunityLeaders />
        </FullWidthSection>

        <FullWidthSection
          title="Communities Page - Initiation CTA"
          description="Call-to-action for starting a community"
        >

            <InitiationCTA />
        </FullWidthSection>

        {/* ============================================
            ATTENDEES PERSONA PAGE SECTIONS
            ============================================ */}
        <FullWidthSection
          title="Attendees Page - Hero"
          description="Hero with floating ticket UI"
        >

            <AttendeesHero />
        </FullWidthSection>

        <FullWidthSection
          title="Attendees Page - Manifesto"
          description="Centering statement about shared experiences"
        >

            <AttendeesManifesto />
        </FullWidthSection>

        <FullWidthSection
          title="Attendees Page - Discovery Grid"
          description="Bento grid of event categories"
        >

            <DiscoveryGrid />
        </FullWidthSection>

        <FullWidthSection
          title="Attendees Page - Social Loop"
          description="Community discussion preview"
        >

            <SocialLoop />
        </FullWidthSection>

        <FullWidthSection
          title="Attendees Page - Web Wallet Feature"
          description="Phone mockup showing wallet UI"
        >

            <WebWalletFeature />
        </FullWidthSection>

        <FullWidthSection
          title="Attendees Page - CTA"
          description="Call-to-action section"
        >

            <AttendeeCTA />
        </FullWidthSection>

        {/* ============================================
            ORGANIZERS PERSONA PAGE SECTIONS
            ============================================ */}
        <FullWidthSection
          title="Organizers Page - Hero"
          description="Hero with analytics dashboard mockup"
        >

            <OrganizersHero />
        </FullWidthSection>

        <FullWidthSection
          title="Organizers Page - Philosophy"
          description="Feature pillars section"
        >

            <OrganizerPhilosophy />
        </FullWidthSection>

        <FullWidthSection
          title="Organizers Page - Features"
          description="Feature showcase blocks"
        >

            <OrganizerFeatures />
        </FullWidthSection>

        <FullWidthSection
          title="Organizers Page - Growth Grid"
          description="Growth tool cards"
        >

            <OrganizerGrowthGrid />
        </FullWidthSection>

        <FullWidthSection
          title="Organizers Page - Financials"
          description="Payment/fair play section"
        >

            <OrganizerFinancials />
        </FullWidthSection>

        <FullWidthSection
          title="Organizers Page - CTA"
          description="Call-to-action section"
        >

            <OrganizerCTA />
        </FullWidthSection>

        {/* ============================================
            ABOUT PAGE SECTIONS
            ============================================ */}
        <FullWidthSection
          title="About Page - Hero"
          description="Technical introduction section"
        >

            <AboutHero />
        </FullWidthSection>

        <FullWidthSection
          title="About Page - Architecture"
          description="Technical architecture visualization"
        >

            <ArchitectureDiagram />
        </FullWidthSection>

        <FullWidthSection
          title="About Page - Tech Stack"
          description="Technology stack showcase"
        >

            <TechStack />
        </FullWidthSection>

        <FullWidthSection
          title="About Page - Type Safety"
          description="TypeScript feature section"
        >

            <TypeSafetySection />
        </FullWidthSection>

        <FullWidthSection
          title="About Page - Data Model"
          description="Data model visualization"
        >

            <DataModel />
        </FullWidthSection>

        <FullWidthSection
          title="About Page - Infrastructure"
          description="Infrastructure/deployment info"
        >

            <Infrastructure />
        </FullWidthSection>

        <FullWidthSection
          title="About Page - No AI Badge"
          description="Anti-AI badge component"
        >
          <div className="px-8 lg:px-16">
            <NoAIBadge />
          </div>
        </FullWidthSection>

        {/* ============================================
            GENERIC MARKETING COMPONENTS
            ============================================ */}
        <FullWidthSection
          title="Generic - Event Highlight"
          description="Featured event card with split layout"
        >

            <EventHighlight />
        </FullWidthSection>
    </div>
  );
}
