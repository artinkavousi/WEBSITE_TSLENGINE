export default function AIAssistants() {
  const assistants = [
    {
      focus: "Navigation & control",
      name: "UX Copilot",
      summary:
        "Floating assistant that interprets plain language into module commands, viewport jumps, and preset swaps.",
      capabilities: [
        "Context window scoped to the active scene graph",
        "Voice, chat, and command palette entry points",
        "Guardrails that preview mutations before execution",
      ],
    },
    {
      focus: "Content & docs",
      name: "Knowledge Curator",
      summary:
        "RAG-backed researcher compiling module docs, changelog references, and visual examples into instant briefs.",
      capabilities: [
        "Embeds synced from Contentlayer and module metadata",
        "Citation trails linking back to source MDX and repos",
        "Offline-ready bundles for on-prem deployments",
      ],
    },
    {
      focus: "Builder ops",
      name: "Launch Builder",
      summary:
        "Authenticated agent that stages diffs, opens PRs, and schedules releases while tracking approvals.",
      capabilities: [
        "SSO-gated flows mapped to role-based permissions",
        "Preview sandboxes spun up directly from the canvas",
        "Deployment scorecards feeding back observability data",
      ],
    },
  ];

  return (
    <section className="section" id="ai" aria-labelledby="ai-title">
      <div className="section__header">
        <span className="section__kicker">AI copilots</span>
        <h2 id="ai-title" className="section__title">
          Assistants wired to the engine workflow
        </h2>
        <p className="section__description">
          Each assistant ships with scoped knowledge, clear guardrails, and interfaces designed for shader teams, producers, and
          operators to collaborate inside Website v1.1.
        </p>
      </div>
      <div className="assistant-grid">
        {assistants.map((assistant) => (
          <article key={assistant.name} className="assistant-card">
            <header className="assistant-card__header">
              <span className="assistant-card__tag">{assistant.focus}</span>
              <h3 className="assistant-card__title">{assistant.name}</h3>
            </header>
            <p className="assistant-card__summary">{assistant.summary}</p>
            <ul className="assistant-card__list">
              {assistant.capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
