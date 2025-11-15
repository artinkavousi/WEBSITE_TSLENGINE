export default function ObservabilitySuite() {
  const streams = [
    {
      name: "Frame graph taps",
      description:
        "Every render pass emits structured spans, GPU counters, and shader diffs so you can replay any blip without leaving the canvas.",
      highlights: [
        "120 Hz capture with 60 minute backlog",
        "Shader budget deltas streamed to Launch Builder",
        "Module-specific anomaly tagging with AI summarisation",
      ],
    },
    {
      name: "Experience beacons",
      description:
        "In-field telemetry captures user journeys, device matrices, and accessibility scores to inform presets before they ship.",
      highlights: [
        "Device graph covering WebGPU and WebGL fallbacks",
        "Consent-aware session sampling with regional routing",
        "Accessibility beacons scoring real user flows",
      ],
    },
    {
      name: "Operations bus",
      description:
        "Alerting, incident notes, and mitigations travel across a unified bus so engineers, producers, and assistants stay in sync.",
      highlights: [
        "Pager, Slack, and email fan-out from one rule set",
        "Automated runbook suggestions per incident",
        "Signed audit trail ready for compliance exports",
      ],
    },
  ];

  const dashboards = [
    {
      title: "Builder cockpit",
      summary:
        "Live timeline of deployments, canary impact, and assistant interventions keeps leads aware of every moving part.",
      insights: ["Diff heatmaps by module", "Approval queue with AI drafts", "Rollout slider with guardrail status"],
    },
    {
      title: "Canvas vitals",
      summary:
        "Scene runtime, asset streaming, and interaction telemetry align in a single viewport to surface true end-to-end health.",
      insights: ["Frame pacing vs. budget", "Asset cache hydration", "Latency per geography"],
    },
  ];

  return (
    <section className="section section--observability" id="observability" aria-labelledby="observability-title">
      <div className="section__header">
        <span className="section__kicker">Observability</span>
        <h2 id="observability-title" className="section__title">
          Telemetry fabric stitched into every module
        </h2>
        <p className="section__description">
          Website v1.1 streams structured data from canvas to compliance so your teams can debug, learn, and certify without
          juggling tools.
        </p>
      </div>
      <div className="observability-grid" role="list">
        {streams.map((stream) => (
          <article key={stream.name} className="observability-card" role="listitem">
            <header className="observability-card__header">
              <h3>{stream.name}</h3>
              <p>{stream.description}</p>
            </header>
            <ul>
              {stream.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="observability-dashboards">
        {dashboards.map((dashboard) => (
          <article key={dashboard.title} className="observability-dashboard">
            <header>
              <h3>{dashboard.title}</h3>
              <p>{dashboard.summary}</p>
            </header>
            <ul>
              {dashboard.insights.map((insight) => (
                <li key={insight}>{insight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
