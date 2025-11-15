export default function OperationsPlaybooks() {
  const playbooks = [
    {
      stage: "Telemetry",
      title: "Observability mesh",
      summary:
        "Frame timings, shader budgets, and IO heatmaps stream into a shared mesh so every module carries its own diagnostics.",
      metrics: [
        { label: "Pipelines", value: "15 signal fan-outs" },
        { label: "Retention", value: "30 day replay" },
        { label: "Coverage", value: "100% scenes" },
      ],
    },
    {
      stage: "Automation",
      title: "Self-healing guards",
      summary:
        "Budget breaches trigger auto-rollbacks, scene graph diffs, and canary flips while Slack bots narrate every move.",
      metrics: [
        { label: "Rollback", value: "&lt;60s" },
        { label: "Checks", value: "42 preflight gates" },
        { label: "Bots", value: "8 responder roles" },
      ],
    },
    {
      stage: "Delivery",
      title: "Progressive releases",
      summary:
        "Launch rings, feature flags, and replayable presets let teams stage Website v1.1 experiences without downtime.",
      metrics: [
        { label: "Rings", value: "Alpha → GA" },
        { label: "Flags", value: "86 runtime toggles" },
        { label: "CDN", value: "Global edge" },
      ],
    },
  ];

  const drills = [
    {
      name: "Frame spike pursuit",
      description:
        "Deep dive into GPU + CPU splits, isolate shader hot paths, and ship hotfix presets with in-canvas approvals.",
      steps: ["Profile trace capture", "Auto attach flamegraphs", "Launch preset rollback"],
    },
    {
      name: "Module upgrade rehearsal",
      description:
        "Simulate migrations with synthetic scenes, diff schema contracts, and export notarised deployment bundles.",
      steps: ["Schema delta scan", "Compatibility sandboxes", "Signed release manifest"],
    },
  ];

  return (
    <section className="section" id="operations" aria-labelledby="operations-title">
      <div className="section__header">
        <span className="section__kicker">Operations</span>
        <h2 id="operations-title" className="section__title">
          Runbooks and guardrails for every canvas tick
        </h2>
        <p className="section__description">
          Reliability tooling is threaded directly into the Website v1.1 shell so that observability, automation, and
          release orchestration stay one gesture away.
        </p>
      </div>
      <div className="operations-grid" role="list">
        {playbooks.map((playbook) => (
          <article key={playbook.title} className="operations-card" role="listitem">
            <header className="operations-card__header">
              <span className="operations-card__stage">{playbook.stage}</span>
              <h3 className="operations-card__title">{playbook.title}</h3>
            </header>
            <p className="operations-card__summary">{playbook.summary}</p>
            <dl className="operations-metrics">
              {playbook.metrics.map((metric) => (
                <div key={metric.label} className="operations-metric">
                  <dt>{metric.label}</dt>
                  <dd dangerouslySetInnerHTML={{ __html: metric.value }} />
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
      <div className="operations-drills">
        {drills.map((drill) => (
          <article key={drill.name} className="operations-drill">
            <header className="operations-drill__header">
              <h3>{drill.name}</h3>
              <p>{drill.description}</p>
            </header>
            <ul>
              {drill.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
