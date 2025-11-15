export default function ComplianceMatrix() {
  const frameworks = [
    {
      name: "SOC 2 Type II",
      status: "Audit ready",
      coverage: [
        "Change management maps to engine release rings",
        "Continuous access reviews with identity exports",
        "Disaster recovery runbooks rehearsed quarterly",
      ],
    },
    {
      name: "ISO/IEC 27001",
      status: "Control design locked",
      coverage: [
        "Risk register tied to module dependency graph",
        "Asset inventory streams from engine telemetry",
        "Supplier evaluations with in-flight mitigations",
      ],
    },
    {
      name: "GDPR & regional privacy",
      status: "Impact assessments live",
      coverage: [
        "Data flow diagrams embedded in canvas presets",
        "DPIA templates with reviewer assignments",
        "Subject access exports with notarised logs",
      ],
    },
  ];

  const rituals = [
    {
      title: "Release governance",
      owner: "Ops + Security",
      summary:
        "Every launch train is paired with control evidence so auditors see the same story as engineers.",
      steps: ["Ticket linking", "Flag approval capture", "Post-launch attestation"],
    },
    {
      title: "Vendor management",
      owner: "Compliance",
      summary:
        "Third-party shaders, data sources, and AI copilots are catalogued with expiry timers and mitigation plans.",
      steps: ["Risk scoring", "Control inheritance", "Renewal dashboards"],
    },
  ];

  const streams = [
    { label: "Automated controls", value: "112 live checks" },
    { label: "Evidence retention", value: "13 months" },
    { label: "Audit exports", value: "One-click bundles" },
  ];

  return (
    <section className="section" id="compliance" aria-labelledby="compliance-title">
      <div className="section__header">
        <span className="section__kicker">Compliance</span>
        <h2 id="compliance-title" className="section__title">
          Continuous evidence across every Website v1.1 release
        </h2>
        <p className="section__description">
          Regulators, partners, and internal auditors get the same always-on view. Framework coverage is mapped to engine
          signals so there is no scramble before review day.
        </p>
      </div>
      <div className="compliance-grid">
        <article className="compliance-card" aria-labelledby="frameworks-title">
          <header className="compliance-card__header">
            <span className="compliance-card__badge">Frameworks</span>
            <h3 id="frameworks-title">Mapped control coverage</h3>
          </header>
          <ul className="compliance-frameworks">
            {frameworks.map((framework) => (
              <li key={framework.name} className="compliance-framework">
                <div className="compliance-framework__title">
                  <strong>{framework.name}</strong>
                  <span>{framework.status}</span>
                </div>
                <ul>
                  {framework.coverage.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </article>
        <article className="compliance-card" aria-labelledby="rituals-title">
          <header className="compliance-card__header">
            <span className="compliance-card__badge">Rituals</span>
            <h3 id="rituals-title">Governance that ships with the team</h3>
          </header>
          <div className="compliance-rituals">
            {rituals.map((ritual) => (
              <article key={ritual.title} className="compliance-ritual">
                <div className="compliance-ritual__meta">
                  <strong>{ritual.title}</strong>
                  <span>{ritual.owner}</span>
                </div>
                <p>{ritual.summary}</p>
                <ul>
                  {ritual.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </article>
        <aside className="compliance-evidence" aria-label="Compliance evidence streams">
          <h3>Evidence streams</h3>
          <p>
            Logs, approvals, and policy acknowledgements are captured automatically with immutable timestamps. Export the
            bundle your auditors prefer or stream it straight into their portal.
          </p>
          <dl className="compliance-signals">
            {streams.map((stream) => (
              <div key={stream.label} className="compliance-signal">
                <dt>{stream.value}</dt>
                <dd>{stream.label}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
