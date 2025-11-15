import Link from "next/link";
import { allLabs } from "contentlayer/generated";

export default function LabsShowcase() {
  const labs = allLabs
    .filter((lab) => lab.featured)
    .sort((a, b) => a.homeOrder - b.homeOrder)
    .slice(0, 3);

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
        {labs.length > 0 ? (
          labs.map((lab) => (
            <article key={lab.title} className="lab-card">
              <header className="lab-card__header">
                <span className="lab-card__badge">{lab.status}</span>
                <h3 className="lab-card__title">{lab.title}</h3>
              </header>
              <p className="lab-card__summary">{lab.summary}</p>
              <dl className="lab-card__meta" aria-label="Lab metadata">
                <div>
                  <dt>Template</dt>
                  <dd>{lab.templateId}</dd>
                </div>
                <div>
                  <dt>Presets</dt>
                  <dd>{lab.modulePresets.join(", ")}</dd>
                </div>
              </dl>
              <Link className="lab-card__link" href={lab.url}>
                View lab brief
              </Link>
            </article>
          ))
        ) : (
          <p className="labs-empty">Labs are being prepped for launch. Check back soon.</p>
        )}
      </div>
      <div className="labs-cta">
        <Link className="button button--secondary" href="/labs">
          Explore all labs
        </Link>
      </div>
    </section>
  );
}
