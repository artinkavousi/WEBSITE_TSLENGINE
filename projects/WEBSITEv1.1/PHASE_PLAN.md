# WEBSITE v1.1 Delivery Roadmap (Four-Phase Structure)

This roadmap translates the combined guidance from the comprehensive architecture guide and
unified proposal into an actionable four-phase programme. Each phase culminates in a
self-contained, testable milestone that becomes the foundation of the subsequent work.

## Phase 1 — Research, Knowledge Acquisition & Repository Preparation
**Goal:** establish the prerequisites for a WebGPU-first TSL engine and engine-driven website.

- Deep-dive the Three.js r181 changelog and WebGPU/TSL updates; capture deltas vs r180.
- Catalogue reference implementations from the RESOURCES directory for porting (particles,
  materials, post-processing, physics, LABS showcases).
- Define tooling stack decisions (pnpm workspace, TurboRepo, ESLint/Prettier, Vitest, Playwright,
  Storybook alternative, Contentlayer).
- Produce architectural decision records (ADRs) for renderer fallback strategy, parameter schema
  decorator design, and AI assistant sandboxing.
- Prepare initial repository structure (`packages/`, `apps/`, `turbo.json`, `pnpm-workspace.yaml`).
- Draft research summaries for WebGPU device limits, TSL node graph patterns, and MaterialX bridges.

**Exit criteria:** knowledge base established, repo skeleton agreed, ADRs approved, external
references indexed, and tooling/CI selections finalised.

## Phase 2 — Core Engine Skeleton & Minimal Website Shell
**Goal:** deliver the first runnable slice: workspace tooling, engine package scaffolding, persistent
canvas shell, and a functioning WebGPU renderer with fallback.

- Scaffold `packages/tsl-kit` with core lifecycle, context, registry, and module contracts.
- Implement initial WebGPU renderer integration with Three.js (`WebGPURenderer`) plus WebGL fallback.
- Establish Zustand-based global store and route-to-module resolver.
- Create `apps/web` with Next.js (or equivalent) persistent canvas layout and placeholder routes.
- Implement schema-driven Orchestrator placeholder using mock JSON schema.
- Wire up initial tests (unit for core helpers, integration for module load/unload) and CI pipeline.

**Exit criteria:** repo installs with pnpm, engine package builds, website renders demo scene on
WebGPU devices and falls back gracefully to WebGL, tests and linting pass in CI.

## Phase 3 — Engine Feature Expansion & Module Library Build-Out
**Goal:** extend the engine to support the full feature matrix, including module categories,
resource management, presets, and tooling.

- Port high-priority modules across materials, lighting, post-FX, particles, fields, physics, and
  animation following the module contract.
- Implement resource manager (textures, buffers, pipelines) and preset storage system.
- Integrate MaterialX import/export adapters and establish ported example catalogue.
- Build debugging utilities (frame timings, G-buffer inspector, logger overlays).
- Expand automated testing to cover module lifecycle, shader generation, performance budgets, and
  golden image comparisons (Playwright/WebGPU harness).
- Document module taxonomy, default parameter sets, and presets.

**Exit criteria:** module registry hosts core catalogue with documentation, resource manager stable,
test coverage extends to critical paths, and performance budgets verified on representative hardware.

## Phase 4 — Full Website Experience, Content Pipeline & AI Assistants
**Goal:** complete the user-facing website, content workflows, LABS showcase, and AI-driven tooling.

- Implement MDX + Contentlayer content pipeline with template registry and style tokens.
- Build UI overlays: glassmorphic control panel, HUD, navigation, labs index, admin dashboard.
- Integrate AI assistants (UX Copilot widget + Admin Builder) with appropriate API guards and RAG.
- Populate LABS showcase pages for each module family with documentation and demos.
- Finalise deployment scripts (Vercel/Cloudflare), observability hooks, and rollback strategy.
- Run full accessibility, performance (Lighthouse), and cross-device QA, then prepare launch checklist.

**Exit criteria:** website feature-complete with content and AI assistants, all tests and QA checklists
passing, deployment pipeline verified, and launch documentation signed off.

## Cross-Cutting Concerns
- **Documentation:** maintain living docs (API references, module guides, ADRs) in `docs/` or
  equivalent workspace location.
- **Security & Compliance:** address permissions, sandboxing, and data protection early; update per
  phase as features grow.
- **Change Management:** track scope adjustments, record retrospectives after each phase, and keep
  backlog groomed for follow-up iterations.
- **Stakeholder Reviews:** schedule demos at phase exits, gather feedback, and incorporate into next
  phase backlog where appropriate.

Use this roadmap as the canonical source of truth for sequencing and to ensure that every milestone
is production-ready before advancing.
