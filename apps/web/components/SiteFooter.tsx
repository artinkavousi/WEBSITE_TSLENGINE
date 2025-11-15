export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <strong>TSL Kit</strong>
          <p>Engine-first WebGPU lab, built with artists and technologists.</p>
        </div>
        <nav className="footer__nav" aria-label="Footer navigation">
          <a href="#architecture">Architecture</a>
          <a href="#modules">Modules</a>
          <a href="#ai">AI</a>
          <a href="#observability">Observability</a>
          <a href="#compliance">Compliance</a>
          <a href="#performance">Performance</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#enablement">Enablement</a>
          <a href="#partners">Partners</a>
          <a href="#community">Community</a>
          <a href="#collaborate">Collaborate</a>
        </nav>
      </div>
      <p className="footer__note">© {new Date().getFullYear()} TSL Kit. All rights reserved.</p>
    </footer>
  );
}
