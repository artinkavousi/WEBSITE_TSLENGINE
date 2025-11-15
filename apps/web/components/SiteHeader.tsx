export default function SiteHeader() {
  const navigation = [
    { href: "#experience", label: "Experience" },
    { href: "#architecture", label: "Architecture" },
    { href: "#modules", label: "Modules" },
    { href: "#labs", label: "Labs" },
    { href: "#integrations", label: "Integrations" },
    { href: "#operations", label: "Operations" },
    { href: "#security", label: "Security" },
    { href: "#compliance", label: "Compliance" },
    { href: "#adoption", label: "Adoption" },
    { href: "#enablement", label: "Enablement" },
    { href: "#partners", label: "Partners" },
    { href: "#roadmap", label: "Roadmap" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="header" id="top">
      <div className="header__inner">
        <div className="header__brand">
          <a href="#experience" className="header__logo" aria-label="TSL Kit home">
            <span aria-hidden="true">TSL</span>
          </a>
          <div className="header__meta">
            <strong>TSL Kit</strong>
            <span>Website v1.1 Control Tower</span>
          </div>
        </div>
        <nav className="header__nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="header__link">
              {item.label}
            </a>
          ))}
        </nav>
        <a className="button button--secondary header__cta" href="#collaborate">
          Request access
        </a>
      </div>
    </header>
  );
}
