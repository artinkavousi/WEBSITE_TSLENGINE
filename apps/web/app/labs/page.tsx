import Link from "next/link";
import type { Metadata } from "next";
import { allLabs } from "contentlayer/generated";

export const metadata: Metadata = {
  title: "Labs Library — TSL Kit Website v1.1",
  description:
    "Browse Website v1.1 labs that pair engine presets, templates, and observability rituals for launch readiness.",
};

export default function LabsIndexPage() {
  const labs = [...allLabs].sort((a, b) => a.homeOrder - b.homeOrder);

  return (
    <main className="labs-index" id="main">
      <header className="labs-index__header">
        <span className="section__kicker">Labs library</span>
        <h1>Guided experiences built on the Website v1.1 engine</h1>
        <p>
          Each lab bundles runtime templates, module presets, and enablement rituals so your teams can pilot Website v1.1 in a
          controlled environment before production rollout.
        </p>
      </header>
      <div className="labs-index__grid">
        {labs.map((lab) => (
          <article key={lab.slug} className="labs-index__card">
            <header>
              <span className="lab-card__badge">{lab.status}</span>
              <h2>
                <Link href={lab.url}>{lab.title}</Link>
              </h2>
              <p>{lab.summary}</p>
            </header>
            <dl className="labs-index__meta">
              <div>
                <dt>Template</dt>
                <dd>{lab.templateId}</dd>
              </div>
              <div>
                <dt>Style tokens</dt>
                <dd>{lab.styleTokens.join(", ")}</dd>
              </div>
              <div>
                <dt>Module presets</dt>
                <dd>{lab.modulePresets.join(", ")}</dd>
              </div>
            </dl>
            {lab.tags && lab.tags.length > 0 ? (
              <ul className="labs-index__tags" aria-label="Lab tags">
                {lab.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            ) : null}
            <Link className="lab-card__link" href={lab.url}>
              Open lab brief
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
