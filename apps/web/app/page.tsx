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
import ObservabilitySuite from "../components/ObservabilitySuite";
import PerformanceBenchmarks from "../components/PerformanceBenchmarks";
import CommunitySpotlight from "../components/CommunitySpotlight";
import OperationsPlaybooks from "../components/OperationsPlaybooks";
import SecurityPosture from "../components/SecurityPosture";
import ComplianceMatrix from "../components/ComplianceMatrix";
import EnablementPrograms from "../components/EnablementPrograms";
import PartnerEcosystem from "../components/PartnerEcosystem";
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
          <ObservabilitySuite />
          <OperationsPlaybooks />
          <SecurityPosture />
          <ComplianceMatrix />
          <PerformanceBenchmarks />
          <AdoptionSpotlight />
          <EnablementPrograms />
          <PartnerEcosystem />
          <CommunitySpotlight />
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
