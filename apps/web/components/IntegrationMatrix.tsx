export default function IntegrationMatrix() {
  const integrations = [
    {
      category: "Authoring",
      items: ["Figma", "Notion", "Linear"],
      detail: "Sync UX specs, docs, and issue updates directly into the story overlays.",
    },
    {
      category: "Pipelines",
      items: ["Unreal", "Unity", "Houdini"],
      detail: "Ingest meshes, caches, and shader graphs into WebGPU-ready presets.",
    },
    {
      category: "Observability",
      items: ["Datadog", "Sentry", "OpenTelemetry"],
      detail: "Capture renderer metrics, module errors, and deployment health in one stream.",
    },
    {
      category: "Collaboration",
      items: ["Slack", "Discord", "GitHub"],
      detail: "Pipe change notifications and review threads into the control tower.",
    },
  ];

  return (
    <section className="section" id="integrations" aria-labelledby="integrations-title">
      <div className="section__header">
        <span className="section__kicker">Ecosystem ready</span>
        <h2 id="integrations-title" className="section__title">
          Integrations baked into the launch plan
        </h2>
        <p className="section__description">
          Website v1.1 is wired for enterprise workflows on day one. Connect the TSL runtime with your favourite design tools,
          DCC packages, and observability platforms.
        </p>
      </div>
      <div className="integration-grid">
        {integrations.map((integration) => (
          <article key={integration.category} className="integration-card">
            <h3 className="integration-card__title">{integration.category}</h3>
            <ul className="integration-card__list">
              {integration.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="integration-card__detail">{integration.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
