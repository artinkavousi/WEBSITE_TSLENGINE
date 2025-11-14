export default function ExperienceLayers() {
  const layers = [
    {
      name: "Canvas shell",
      summary: "Persistent renderer orchestrating engine state, scene graph, and adaptive quality modes.",
    },
    {
      name: "Story-driven overlays",
      summary: "Composable UI primitives for labs, launch articles, changelogs, and partner showcases.",
    },
    {
      name: "Operational console",
      summary: "Admin-only views for presets, AI builder prompts, deployment health, and analytics.",
    },
  ];

  return (
    <section className="section" id="experience">
      <div className="section__header">
        <span className="section__kicker">Experience layers</span>
        <h2 className="section__title">Everything revolves around a living canvas</h2>
        <p className="section__description">
          The site ships with a three-tier layout so teams can tell stories, ship demos, and operate the platform without
          juggling separate tools.
        </p>
      </div>
      <div className="layers">
        {layers.map((layer, index) => (
          <div key={layer.name} className="layer">
            <span className="layer__index">0{index + 1}</span>
            <div className="layer__content">
              <h3>{layer.name}</h3>
              <p>{layer.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
