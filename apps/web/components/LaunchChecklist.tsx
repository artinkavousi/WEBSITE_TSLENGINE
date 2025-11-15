export default function LaunchChecklist() {
  const tracks = [
    {
      title: "Deployment readiness",
      items: [
        "Vercel + Cloudflare pipeline with staged previews and rollbacks",
        "Environment secrets managed through SSO-backed vaults",
        "Edge caching tuned for WebGPU assets and progressive fallbacks",
      ],
    },
    {
      title: "Quality gates",
      items: [
        "Automated Lighthouse, axe, and WebGPU performance sweeps",
        "Golden render comparisons pinned to module presets",
        "Manual keyboard and screen reader runbooks signed off",
      ],
    },
    {
      title: "Operational playbooks",
      items: [
        "Launch day schedule with owner assignments and comms",
        "Incident response drills covering renderer, AI, and CMS",
        "Post-launch metrics dashboard wired to observability stack",
      ],
    },
  ];

  return (
    <section className="section" id="launch" aria-labelledby="launch-title">
      <div className="section__header">
        <span className="section__kicker">Launch readiness</span>
        <h2 id="launch-title" className="section__title">
          Runbooks that keep Website v1.1 production tight
        </h2>
        <p className="section__description">
          The platform ships with playbooks, automation, and monitoring so teams can promote releases and triage feedback
          without scrambling for context.
        </p>
      </div>
      <div className="checklist-grid">
        {tracks.map((track) => (
          <article key={track.title} className="checklist-card">
            <h3 className="checklist-card__title">{track.title}</h3>
            <ul className="checklist">
              {track.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
