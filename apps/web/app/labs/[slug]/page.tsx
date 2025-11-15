import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allLabs } from "contentlayer/generated";

import { MDXContent } from "@/apps/web/components/mdx/MDXContent";

const getLab = (slug: string) => allLabs.find((lab) => lab.slug === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return allLabs.map((lab) => ({ slug: lab.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const lab = getLab(params.slug);

  if (!lab) {
    return {};
  }

  return {
    title: lab.seoTitle ?? lab.title,
    description: lab.seoDescription ?? lab.summary,
  } satisfies Metadata;
}

export default function LabDetailPage({ params }: { params: { slug: string } }) {
  const lab = getLab(params.slug);

  if (!lab) {
    notFound();
  }

  return (
    <main className="lab-detail" id="main">
      <nav className="lab-detail__breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/labs">Labs</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{lab.title}</span>
      </nav>
      <header className="lab-detail__header">
        <span className="lab-card__badge">{lab.status}</span>
        <h1>{lab.title}</h1>
        <p>{lab.summary}</p>
      </header>
      <dl className="lab-detail__meta" aria-label="Lab metadata">
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
        {lab.tags && lab.tags.length > 0 ? (
          <div>
            <dt>Tags</dt>
            <dd>{lab.tags.join(", ")}</dd>
          </div>
        ) : null}
      </dl>
      <MDXContent code={lab.body.code} />
      <footer className="lab-detail__footer">
        <Link className="button" href="mailto:hello@tsl-kit.dev?subject=Lab%20feedback">
          Share lab feedback
        </Link>
        <Link className="button button--secondary" href="/labs">
          Back to labs
        </Link>
      </footer>
    </main>
  );
}
