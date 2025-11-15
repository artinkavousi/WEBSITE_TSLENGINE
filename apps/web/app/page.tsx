import AIAssistants from "../components/AIAssistants";
import CTASection from "../components/CTASection";
import ControlPanelShowcase from "../components/ControlPanelShowcase";
import EngineExperience from "../components/EngineExperience";
import ExperienceLayers from "../components/ExperienceLayers";
import FAQ from "../components/FAQ";
import IntegrationMatrix from "../components/IntegrationMatrix";
import LabsShowcase from "../components/LabsShowcase";
import LaunchChecklist from "../components/LaunchChecklist";
import ModuleShowcase from "../components/ModuleShowcase";
import AdoptionSpotlight from "../components/AdoptionSpotlight";
import OperationsPlaybooks from "../components/OperationsPlaybooks";
import SecurityPosture from "../components/SecurityPosture";
import Roadmap from "../components/Roadmap";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import ValuePillars from "../components/ValuePillars";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <EngineExperience />
        <div className="page">
          <ValuePillars />
          <ExperienceLayers />
          <ModuleShowcase />
          <LabsShowcase />
          <IntegrationMatrix />
          <ControlPanelShowcase />
          <AIAssistants />
          <OperationsPlaybooks />
          <SecurityPosture />
          <AdoptionSpotlight />
          <Roadmap />
          <LaunchChecklist />
          <FAQ />
          <CTASection />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
