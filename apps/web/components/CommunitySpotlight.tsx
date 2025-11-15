export default function CommunitySpotlight() {
  const stories = [
    {
      title: "Shader guild meetups",
      description:
        "Monthly deep dives pairing engine maintainers with artists to share presets, debugging techniques, and live performance rigs.",
      details: ["Hybrid broadcast with captioned archives", "Hands-on labs fuelled by the latest Website v1.1 builds", "Community-led showcase track"],
    },
    {
      title: "Partner residencies",
      description:
        "Embedded residencies drop core engineers into partner studios to co-design workflows, gather feedback, and export playbooks.",
      details: ["4-week onsite and virtual cohorts", "Outcome briefs documented in Contentlayer", "Shared roadmap reviews every Friday"],
    },
    {
      title: "Education alliance",
      description:
        "Universities and bootcamps receive starter curricula, sandbox credits, and mentorship to grow the next shader authors.",
      details: ["Curriculum kits refreshed quarterly", "Mentor office hours across timezones", "Scholarship fund for underrepresented builders"],
    },
  ];

  const signals = [
    { label: "Countries", value: "18" },
    { label: "Active contributors", value: "320" },
    { label: "Shared presets", value: "540" },
  ];

  return (
    <section className="section" id="community" aria-labelledby="community-title">
      <div className="section__header">
        <span className="section__kicker">Community</span>
        <h2 id="community-title" className="section__title">
          Builders shaping the Website v1.1 story together
        </h2>
        <p className="section__description">
          Stories, residencies, and education programs keep the TSL Kit ecosystem vibrant while feeding insights back into the
          engine roadmap.
        </p>
      </div>
      <div className="community-grid">
        <div className="community-stories">
          {stories.map((story) => (
            <article key={story.title}>
              <header>
                <h3>{story.title}</h3>
                <p>{story.description}</p>
              </header>
              <ul>
                {story.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <aside className="community-signals" aria-label="Community metrics">
          <h3>Pulse metrics</h3>
          <dl>
            {signals.map((signal) => (
              <div key={signal.label}>
                <dt>{signal.label}</dt>
                <dd>{signal.value}</dd>
              </div>
            ))}
          </dl>
          <p>
            Join our community syncs to share prototypes, learn from peers, and unlock co-marketing for your next Website v1.1
            launch.
          </p>
          <a className="button button--secondary" href="mailto:community@tsl-kit.dev?subject=Community%20interest">
            Join the community call
          </a>
        </aside>
      </div>
    </section>
  );
}
