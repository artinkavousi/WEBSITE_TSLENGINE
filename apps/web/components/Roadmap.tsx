export default function Roadmap() {
  const phases = [
    {
      name: "Phase 01 — Foundation",
      focus: "Monorepo scaffolding, renderer shell, and initial module registry with WebGL fallback.",
    },
    {
      name: "Phase 02 — Engine runway",
      focus: "WebGPU renderer track, schema decorators, and baseline module catalog wired to docs.",
    },
    {
      name: "Phase 03 — Experience build",
      focus: "Content pipeline, LABS overlays, and AI Copilot integration with scoped knowledge packs.",
    },
    {
      name: "Phase 04 — Launch",
      focus: "Observability, deployment automation, and growth experiments powered by live presets.",
    },
  ];

  return (
    <section className="section" id="roadmap">
      <div className="section__header">
        <span className="section__kicker">Delivery track</span>
        <h2 className="section__title">A roadmap built for weekly validation</h2>
        <p className="section__description">
          Each milestone unlocks a self-contained slice of value so Website v1.1 can ship safely while the engine evolves
          in lockstep.
        </p>
      </div>
      <ol className="timeline">
        {phases.map((phase) => (
          <li key={phase.name} className="timeline__item">
            <h3>{phase.name}</h3>
            <p>{phase.focus}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
