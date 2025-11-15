export default function SecurityPosture() {
  const layers = [
    {
      badge: "Data",
      title: "Encryption everywhere",
      summary:
        "TLS 1.3 edge termination, WebCrypto in-canvas secrets, and envelope encryption keep shader payloads sealed end to end.",
      controls: [
        "Rotating KMS keys with hardware attestation",
        "Per-module secret scopes and access audits",
        "Signed artifact bundles with provenance trails",
      ],
    },
    {
      badge: "Identity",
      title: "Adaptive access",
      summary:
        "SSO, device posture checks, and realtime risk scoring determine how collaborators enter the Website v1.1 cockpit.",
      controls: [
        "OIDC + SAML federation across tenants",
        "Step-up MFA mapped to sensitive actions",
        "Session fencing with region + time policies",
      ],
    },
    {
      badge: "Compliance",
      title: "Evidence on tap",
      summary:
        "Automated reports, log exports, and policy packs bundle the work required for SOC 2, ISO, and gaming regulator briefs.",
      controls: [
        "Continuously validated access reviews",
        "Immutable audit trails with 1 year retention",
        "Pre-baked DPIA and vendor response templates",
      ],
    },
  ];

  const certifications = [
    { name: "SOC 2 Type II", status: "In flight" },
    { name: "ISO/IEC 27001", status: "Design locked" },
    { name: "TISAX", status: "Assessment queued" },
  ];

  return (
    <section className="section" id="security" aria-labelledby="security-title">
      <div className="section__header">
        <span className="section__kicker">Security</span>
        <h2 id="security-title" className="section__title">
          A security envelope built for real-time engines
        </h2>
        <p className="section__description">
          Governance features in Website v1.1 harden every interaction, from secret rotation to compliance exports, so that
          the canvas can be shared without compromise.
        </p>
      </div>
      <div className="security-grid">
        {layers.map((layer) => (
          <article key={layer.title} className="security-card">
            <header className="security-card__header">
              <span className="security-card__badge">{layer.badge}</span>
              <h3>{layer.title}</h3>
            </header>
            <p>{layer.summary}</p>
            <ul>
              {layer.controls.map((control) => (
                <li key={control}>{control}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="security-certifications" aria-label="Certification roadmap">
        {certifications.map((certification) => (
          <div key={certification.name} className="security-certification">
            <span className="security-certification__name">{certification.name}</span>
            <span className="security-certification__status">{certification.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
