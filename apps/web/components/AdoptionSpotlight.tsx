export default function AdoptionSpotlight() {
  const stories = [
    {
      org: "Nebula Forge",
      focus: "Live events",
      summary:
        "Broadcast-ready shader sets stream from Website v1.1 into a virtual production wall without ever pausing the canvas.",
      impact: "Cut scene swap time by 68% and launched nightly showcases across three continents.",
    },
    {
      org: "Orbit Labs",
      focus: "Research",
      summary:
        "ML teams pair engine presets with dataset explorers to validate generative materials in the actual runtime shell.",
      impact: "Shrank prototype feedback loops from weeks to hours with collaborative presets.",
    },
    {
      org: "Atlas Play",
      focus: "Gaming",
      summary:
        "A live service sandbox drives shader experiments across studio pods with audit-ready guardrails baked in.",
      impact: "Scaled to 12 production pods while keeping compliance exports one click away.",
    },
  ];

  const signals = [
    { label: "Render sessions this quarter", value: "24k" },
    { label: "Collaborators on board", value: "312" },
    { label: "Preset variants captured", value: "1.8k" },
  ];

  return (
    <section className="section" id="adoption" aria-labelledby="adoption-title">
      <div className="section__header">
        <span className="section__kicker">Adoption</span>
        <h2 id="adoption-title" className="section__title">
          Teams already living inside the Website v1.1 cockpit
        </h2>
        <p className="section__description">
          Studio leads, researchers, and partner agencies rely on the persistent canvas to keep iteration live in front of
          stakeholders. Here is what they are shipping.
        </p>
      </div>
      <div className="spotlight-grid">
        {stories.map((story) => (
          <article key={story.org} className="spotlight-card">
            <header className="spotlight-card__header">
              <span className="spotlight-card__focus">{story.focus}</span>
              <h3>{story.org}</h3>
            </header>
            <p className="spotlight-card__summary">{story.summary}</p>
            <p className="spotlight-card__impact">{story.impact}</p>
          </article>
        ))}
      </div>
      <dl className="spotlight-signals">
        {signals.map((signal) => (
          <div key={signal.label} className="spotlight-signal">
            <dt>{signal.value}</dt>
            <dd>{signal.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
