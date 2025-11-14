# Phase 4 — Website Experience, Content Pipeline & AI Assistants

Phase 4 extends the solid engine foundation into the full website experience described across the
source documents. The focus is on content, UX, AI tooling, deployment, and quality assurance so the
platform is launch-ready.

## 1. Content Pipeline & Templates
- Implement Contentlayer schema for MDX content (posts, case studies, labs documentation) with fields
  for template IDs, style tokens, module presets, and SEO metadata.
- Build template registry mapping `templateId` to R3F components that leverage engine modules and GSAP
  choreography (per architecture guide §4.5).
- Develop reusable layout primitives (glassmorphic panels, split views, hero sections) driven by design
  tokens defined in Phase 2.
- Configure Markdown/MDX plugins for syntax highlighting, diagram rendering, and frontmatter validation.

## 2. UI Shell & Navigation
- Finalise persistent canvas overlay structure: navigation, HUD, module orchestrator panel, labs index,
  and admin entry points.
- Implement responsive design strategy with motion-reduced variants and accessibility-compliant focus
  management.
- Integrate preset save/load UI, module search, and preset browsing experiences.

## 3. LABS Showcase & Documentation
- Populate `/labs/*` routes using module metadata from Phase 3; each page provides description, controls,
  presets, and usage notes.
- Embed golden render previews, interactive toggles, and code samples for each module.
- Automate documentation sync (e.g., generate MDX from module metadata via scripts).

## 4. AI Assistants & CMS Enhancements
- Implement UX Copilot widget with chat UI, context scoping, and limited command set (navigation,
  parameter adjustments) per proposal §6.1.
- Build Builder Agent admin dashboard with authentication, diff/preview workflows, and PR creation tools
  as described in proposal §6.2.
- Integrate RAG/vector store for docs and module references; support offline fallback dataset (proposal §6.3).
- Add CMS automation for content suggestions, module linking, and preset recommendations.

## 5. Deployment, Observability & Operations
- Configure deployment pipeline (Vercel/Cloudflare) with environment variables, feature flags, and asset
  optimisation.
- Implement monitoring hooks (Sentry, LogRocket, Web Vitals) and alerting thresholds.
- Document rollback procedures, staging environments, and smoke test scripts.

## 6. QA, Accessibility & Compliance
- Run Lighthouse, WebPageTest, and WebGPU performance profiling across target devices.
- Conduct accessibility audits (axe, manual keyboard/screen reader testing) and fix issues.
- Perform security review covering AI assistant endpoints, auth flows, and data handling.
- Finalise legal/compliance checks (privacy policy, terms, cookie management).

## Deliverables & Exit Criteria
- Website content complete with templates, LABS pages, and admin tooling.
- AI assistants operational with monitoring and guardrails.
- Deployment pipeline proven from main branch to production; rollback tested.
- All QA gates (performance, accessibility, security) passed with documented evidence.
- Launch runbook, support documentation, and post-launch metrics dashboard ready.

Phase 4 concludes the initial release. Plan for follow-up iterations (Phase 5+) to expand module library,
AI capabilities, and partner integrations based on post-launch feedback.
