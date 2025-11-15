export default function ControlPanelShowcase() {
  const surfaces = [
    {
      status: "Frontline",
      title: "Glassmorphic control deck",
      summary:
        "Primary overlay docking presets, module controls, and story timelines with haptics for every focus state.",
      highlights: [
        "Context-aware tabs that follow the active route",
        "Slot-based widgets for presets, notes, and telemetry",
        "Keyboard and gamepad shortcuts mapped to commands",
      ],
    },
    {
      status: "Operations",
      title: "HUD + status beacons",
      summary:
        "Live renderer vitals, scene graph diffing, and observability pings threaded through the persistent HUD ribbon.",
      highlights: [
        "GPU frame timings with alert thresholds",
        "Module lifecycle events streamed in real time",
        "Hooked into Sentry, Datadog, and custom webhooks",
      ],
    },
    {
      status: "Governance",
      title: "Admin ingress points",
      summary:
        "Secure pathways into the Builder dashboard, AI guardrails, and deployment approvals without leaving the canvas.",
      highlights: [
        "SSO-backed environment toggles and feature flags",
        "Diff, preview, and merge queues surfaced inline",
        "Audit log overlays with export-ready bundles",
      ],
    },
  ];

  return (
    <section className="section" id="control-panel" aria-labelledby="control-panel-title">
      <div className="section__header">
        <span className="section__kicker">UI shell</span>
        <h2 id="control-panel-title" className="section__title">
          The control surfaces behind the canvas
        </h2>
        <p className="section__description">
          Website v1.1 keeps navigation, operations, and governance embedded inside the persistent canvas so teams never lose
          context while they build, review, or ship updates.
        </p>
      </div>
      <div className="panel-grid">
        {surfaces.map((surface) => (
          <article key={surface.title} className="card card--panel">
            <header className="card__header card__header--panel">
              <span className="card__status">{surface.status}</span>
              <h3 className="card__title">{surface.title}</h3>
            </header>
            <p className="card__description">{surface.summary}</p>
            <ul className="card__list card__list--compact">
              {surface.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
