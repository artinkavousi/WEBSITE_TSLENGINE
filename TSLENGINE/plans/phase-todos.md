# Phase-Aligned TODO & Validation Checklist

Use this checklist to manage progress throughout the four-phase roadmap. Tasks marked with `(*)` indicate deliverables that unlock the phase gate review. Keep the document updated as work is completed or re-scoped.

---

## Phase 1 — Foundations, Research & Environment Readiness
- [ ] Compile Three.js r181/r182 WebGPU + TSL change notes and summarize impacts on engine design (*).
- [ ] Review browser WebGPU implementation matrices (Chrome, Firefox, Safari) and document required feature flags/polyfills.
- [ ] Audit MaterialX → TSL translation paths and identify external repos/examples for reference.
- [ ] Produce knowledge base index: `RESOURCES/catalog.json` referencing key docs, examples, and assets.
- [ ] Create PNPM workspace scaffold with root configs (`tsconfig.base.json`, `.eslintrc.cjs`, `.prettierrc`, `turbo.json`, `pnpm-workspace.yaml`) (*).
- [ ] Configure CI pipeline skeleton (GitHub Actions) with lint + type-check + unit test jobs running against placeholders (*).
- [ ] Draft architectural decision records for renderer strategy, lifecycle contract, fallback policy, and AI assistant boundaries.
- [ ] Establish research log template and archive first sprint of findings.

## Phase 2 — Core Engine Skeleton & Primary Integration
- [ ] Implement core TypeScript interfaces/classes for `EngineModule`, `ModuleContext`, registry, runner, and event bus (*).
- [ ] Build renderer factory supporting WebGPU with WebGL fallback, including capability detection utilities (*).
- [ ] Add minimal module set: `scenes/basic`, `materials/standardPBR`, `postfx/tonemap` with JSON schema metadata.
- [ ] Create unit tests covering lifecycle transitions (init → mount → update → unmount → dispose).
- [ ] Scaffold `apps/web` persistent canvas (`EngineRoot.tsx`) and connect to engine runner via adapters (*).
- [ ] Implement Zustand store slice + Tweakpane-based Orchestrator with live parameter binding.
- [ ] Configure basic routes (`/`, `/labs/core-smoke`) showcasing hot-swapping modules.
- [ ] Document developer workflow for adding modules and running local smoke tests (*).

## Phase 3 — Feature Expansion & Module Library Completion
- [ ] Port prioritized module families (materials, lighting, postfx, particles, fields) with presets + docs (*).
- [ ] Implement compute-driven particle/field pipelines leveraging WebGPU compute shaders.
- [ ] Integrate MaterialX importer/exporter path and asset processing (KTX2, DRACO, HDRI preprocessing).
- [ ] Expand renderer features: Forward+/deferred toggles, adaptive quality controls, dynamic resolution.
- [ ] Introduce AI assistant services (UX Copilot + Builder) with RAG ingestion and authorization guardrails.
- [ ] Add comprehensive testing: visual regression for materials/postfx, integration tests for module swaps, API tests for assistants (*).
- [ ] Establish performance profiling workflow and baseline metrics for key scenes.
- [ ] Harden fallback heuristics with automated tests across WebGPU/WebGL pathways.

## Phase 4 — Full Website Experience & Launch Readiness
- [ ] Build marketing pages with MDX overlays and template-driven 3D presentations (Home, Portfolio, Services, About) (*).
- [ ] Populate LABS showcase with flagship modules, performance HUD, and preset switching UI.
- [ ] Implement admin dashboard for AI assistants, content approvals, and module analytics.
- [ ] Complete CMS workflow: Contentlayer schema, MDX authoring pipeline, asset pipeline automation.
- [ ] Perform accessibility audit (axe, keyboard nav) and resolve critical findings (*).
- [ ] Finalize SEO + analytics setup (sitemap, structured data, consent manager, telemetry routing).
- [ ] Configure deployment automation (Vercel/Cloudflare), environment secrets management, and rollback playbooks (*).
- [ ] Run full end-to-end and load tests across critical flows; sign off launch readiness document (*).

---

## Ongoing Governance Tasks
- [ ] Maintain ADRs and changelog per phase.
- [ ] Track risks/issues with owners and mitigation dates.
- [ ] Keep testing dashboard updated with latest run results.
- [ ] Review AI assistant prompts and permissions every release.

Update the checklist as tasks complete, adding links to PRs, test reports, or ADRs for traceability.
