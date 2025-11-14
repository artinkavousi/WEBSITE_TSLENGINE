export default function ValuePillars() {
  const pillars = [
    {
      title: "Engine-first architecture",
      description:
        "A persistent WebGPU canvas keeps visuals alive across every route while overlays deliver the narrative.",
      highlights: [
        "Stateful renderer shared across pages",
        "Hot-swappable module lifecycle",
        "Zero reload scene transitions",
      ],
    },
    {
      title: "Schema-driven control surfaces",
      description:
        "Decorators and Zod schemas flow into auto-generated controls, docs, and presets so experimentation stays fast.",
      highlights: [
        "Single source of truth for params",
        "Glassmorphic orchestrator for live tweaking",
        "Preset capture and replay with one click",
      ],
    },
    {
      title: "Content + compute in sync",
      description:
        "MDX templates choreograph camera moves, shader states, and storytelling beats without touching engine internals.",
      highlights: [
        "Template registry backed by GSAP timelines",
        "Module-aware MDX shortcodes",
        "AI-assisted authoring workflow",
      ],
    },
  ];

  return (
    <section className="section" id="architecture">
      <div className="section__header">
        <span className="section__kicker">Why TSL Kit</span>
        <h2 className="section__title">A production workflow built for shader teams</h2>
        <p className="section__description">
          Website v1.1 is more than a landing page—it is the living control tower for the engine, demos, and
          documentation.
        </p>
      </div>
      <div className="card-grid">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="card">
            <h3 className="card__title">{pillar.title}</h3>
            <p className="card__description">{pillar.description}</p>
            <ul className="card__list">
              {pillar.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
