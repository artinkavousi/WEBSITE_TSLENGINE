export default function PartnerEcosystem() {
  const partners = [
    {
      badge: "Studios",
      name: "Signal Field",
      focus: "Immersive live shows",
      contributions: [
        "Co-developing volumetric lighting presets",
        "Supplying arena scale QA labs",
        "Publishing public performance baselines",
      ],
    },
    {
      badge: "Agencies",
      name: "Lumina North",
      focus: "Brand activations",
      contributions: [
        "Rapid prototyping kits for campaign takeovers",
        "Localization harness spanning 18 languages",
        "Storyboarding services with canvas previews",
      ],
    },
    {
      badge: "Research",
      name: "Orbital Compute",
      focus: "Simulation and AI",
      contributions: [
        "GPU efficiency studies feeding roadmap decisions",
        "Benchmark suites for generative material pipelines",
        "Ethics council shaping responsible experimentation",
      ],
    },
  ];

  const metrics = [
    { value: "28", label: "Partner nodes activated" },
    { value: "9", label: "Joint go-lives this quarter" },
    { value: "42", label: "Shared presets in circulation" },
  ];

  return (
    <section className="section" id="partners" aria-labelledby="partners-title">
      <div className="section__header">
        <span className="section__kicker">Partners</span>
        <h2 id="partners-title" className="section__title">
          An ecosystem extending Website v1.1 into every venue
        </h2>
        <p className="section__description">
          Studios, agencies, and research labs are weaving the engine into their workflows. We co-build tooling and share
          telemetry so the network moves forward together.
        </p>
      </div>
      <div className="partners-grid" role="list">
        {partners.map((partner) => (
          <article key={partner.name} className="partner-card" role="listitem">
            <header className="partner-card__header">
              <span className="partner-card__badge">{partner.badge}</span>
              <div>
                <h3>{partner.name}</h3>
                <span>{partner.focus}</span>
              </div>
            </header>
            <ul className="partner-card__list">
              {partner.contributions.map((contribution) => (
                <li key={contribution}>{contribution}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <dl className="partner-metrics" aria-label="Partner ecosystem signals">
        {metrics.map((metric) => (
          <div key={metric.label} className="partner-metric">
            <dt>{metric.value}</dt>
            <dd>{metric.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
