import CTASection from "../components/CTASection";
import EngineExperience from "../components/EngineExperience";
import ExperienceLayers from "../components/ExperienceLayers";
import ModuleShowcase from "../components/ModuleShowcase";
import Roadmap from "../components/Roadmap";
import SiteFooter from "../components/SiteFooter";
import ValuePillars from "../components/ValuePillars";

export default function HomePage() {
  return (
    <>
      <EngineExperience />
      <div className="page">
        <ValuePillars />
        <ExperienceLayers />
        <ModuleShowcase />
        <Roadmap />
        <CTASection />
      </div>
      <SiteFooter />
    </>
  );
}
