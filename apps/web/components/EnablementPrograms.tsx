export default function EnablementPrograms() {
  const tracks = [
    {
      badge: "Onboarding",
      title: "Flight school for new squads",
      summary:
        "Two-week immersive ramp pairing canvas fundamentals with pipeline walkthroughs so teams launch confidently.",
      modules: ["Runtime primer", "Preset authoring lab", "Operations ride-along"],
    },
    {
      badge: "Advanced",
      title: "Shader innovation studio",
      summary:
        "Deep dives into WebGPU techniques, asset streaming, and collaborative debugging for senior technologists.",
      modules: ["WebGPU performance clinics", "Material graph systems", "Live instrumentation hacks"],
    },
    {
      badge: "Leadership",
      title: "Program steward council",
      summary:
        "Monthly councils align roadmaps, budget cycles, and success metrics with the Website v1.1 trajectory.",
      modules: ["Roadmap alignment", "Budget and ROI dashboards", "Change champion toolkit"],
    },
  ];

  const support = [
    {
      title: "Guild office hours",
      detail: "Daily blocks staffed by engine maintainers with &lt;15 minute response targets.",
    },
    {
      title: "Learning repository",
      detail: "Recorded labs, starter presets, and certification paths updated every sprint.",
    },
    {
      title: "Launch concierge",
      detail: "Dedicated channel that tracks blockers, legal reviews, and stakeholder updates end to end.",
    },
  ];

  return (
    <section className="section" id="enablement" aria-labelledby="enablement-title">
      <div className="section__header">
        <span className="section__kicker">Enablement</span>
        <h2 id="enablement-title" className="section__title">
          Programs that bring every role into the cockpit
        </h2>
        <p className="section__description">
          Structured enablement keeps Website v1.1 teams aligned, from shader engineers to executive sponsors. Choose the
          track that fits your mission and stay paired with our crew.
        </p>
      </div>
      <div className="enablement-grid" role="list">
        {tracks.map((track) => (
          <article key={track.title} className="enablement-card" role="listitem">
            <header className="enablement-card__header">
              <span className="enablement-card__badge">{track.badge}</span>
              <h3>{track.title}</h3>
            </header>
            <p>{track.summary}</p>
            <ul className="enablement-card__list">
              {track.modules.map((module) => (
                <li key={module}>{module}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="enablement-support" aria-label="Enablement support rituals">
        <h3>Support rituals</h3>
        <ul className="enablement-support__list">
          {support.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
