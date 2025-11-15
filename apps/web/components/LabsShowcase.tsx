export default function LabsShowcase() {
  const labs = [
    {
      name: "Nebula Cloth",
      summary: "Real-time GPU cloth solver showcasing constraint lattices, ripstop shaders, and wind tunnels.",
      badge: "Live",
    },
    {
      name: "Spectral Nodes",
      summary: "Node-based spectral composer with waveform inspectors and MDX-powered annotation stream.",
      badge: "Preview",
    },
    {
      name: "Particle Anvil",
      summary: "Visual scripting for particle emitters with timeline scrubbing, presets, and render passes.",
      badge: "Alpha",
    },
  ];

  return (
    <section className="section" id="labs" aria-labelledby="labs-title">
      <div className="section__header">
        <span className="section__kicker">Labs showcase</span>
        <h2 id="labs-title" className="section__title">
          Guided demos built on the engine core
        </h2>
        <p className="section__description">
          Website v1.1 ships a curated set of Labs experiences so teams can explore shader workflows, runtime editors, and
          pipeline handoffs before integrating the SDK.
        </p>
      </div>
      <div className="labs-grid">
        {labs.map((lab) => (
          <article key={lab.name} className="lab-card">
            <header className="lab-card__header">
              <span className="lab-card__badge">{lab.badge}</span>
              <h3 className="lab-card__title">{lab.name}</h3>
            </header>
            <p className="lab-card__summary">{lab.summary}</p>
            <a className="lab-card__link" href="#experience">
              View demo brief
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
