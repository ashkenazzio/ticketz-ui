import AboutHero from '../components/about/AboutHero';
import ArchitectureDiagram from '../components/about/ArchitectureDiagram';
import TechStack from '../components/about/TechStack';
import TypeSafetySection from '../components/about/TypeSafetySection';
import DataModel from '../components/about/DataModel';
import Infrastructure from '../components/about/Infrastructure';
import NoAIBadge from '../components/about/NoAIBadge';

export default function About() {
  return (
    <>
      <AboutHero />
      <ArchitectureDiagram />
      <TechStack />
      <TypeSafetySection />
      <DataModel />
      <Infrastructure />
      <NoAIBadge />
    </>
  );
}
