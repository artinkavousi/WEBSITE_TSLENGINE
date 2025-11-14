# WEBSITE TSL Engine — Four-Phase Implementation Roadmap

This roadmap translates the merged architecture guidance from `WEBSITEv1.1tsl_kit_web_gpu_engine_engine_first_website_comprehensive_architecture_implementation_guide_r_181.md` and the unified `proposalchat.md` into a pragmatic delivery sequence. Each phase ends with clear exit criteria so the team only advances once a fully functional layer is validated. The plan assumes a PNPM-managed monorepo targeting Three.js r181+ with WebGPU-first rendering and automated fallbacks.

---

## Phase 1 — Foundations, Research & Environment Readiness
**Goal:** Eliminate unknowns, align on standards, and scaffold all supporting infrastructure before writing application code.

### Key Workstreams
- **Knowledge & Standards Update**
  - Digest Three.js r181 changelog with focus on WebGPURenderer/TSL changes versus r180.
  - Review latest WebGPU spec updates (Chrome 128+, Firefox Nightly, Safari TP) and required polyfills.
  - Catalogue TSL additions (node material changes, new decorators) from official docs and Three.js examples.
  - Evaluate MaterialX → TSL conversion references and GPU profiling tools mentioned in the guides.
- **Repository & Tooling Preparation**
  - Finalize PNPM workspace layout: `packages/tsl-kit`, `apps/web`, shared configs (`tsconfig`, lint, prettier, turbo`, `vitest` setup).
  - Configure strict TypeScript settings, ESLint with Three/WebGPU plugins, Storybook/ Ladle for module previews.
  - Set up CI skeleton (GitHub Actions/Turborepo cache) covering lint, type-check, unit tests, minimal integration test runner.
- **Research Assets & Documentation**
  - Extract module taxonomy from the guide into machine-readable registries (YAML/JSON) for future automation.
  - Index RESOURCES (examples, docs) for RAG ingestion; define embeddings pipeline for the AI assistants.
  - Produce architectural decision records summarizing renderer strategy, fallback policy, and module lifecycle contract.

### Deliverables & Exit Criteria
- Approved architecture briefing with updated spec notes.
- Repository bootstrapped with workspace configs, shared linting/testing suites, and CI dry-run green.
- Knowledge base compiled (internal docs + research logs) covering WebGPU/TSL deltas and tooling decisions.
- Resource indices validated (e.g., `resources/catalog.json`).

---

## Phase 2 — Core Engine Skeleton & Primary Integration
**Goal:** Deliver a minimal but functional TSL-KIT engine package and website shell that exercises the persistent canvas, proving WebGPU+TSL integration.

### Key Workstreams
- **Engine Package (`packages/tsl-kit`)**
  - Implement lifecycle interfaces (`EngineModule`, `ModuleContext`, registry, runner) exactly as defined in the comprehensive guide.
  - Scaffold core services: renderer factory (WebGPU + WebGL fallback), resource manager, event bus, parameter schema decorators.
  - Provide first reference modules (e.g., `modules/scenes/basicScene`, `modules/materials/standardPBR`, `modules/postfx/tonemap`).
  - Establish testing harness: Vitest/unit tests for lifecycle, Playwright/Happy DOM smoke for renderer boot.
- **Website Shell (`apps/web`)**
  - Create persistent canvas root (`EngineRoot.tsx`) with R3F + WebGPU binding.
  - Implement Zustand store slice for engine state and connect to engine runner adapters.
  - Add placeholder Orchestrator UI (Tweakpane bridge) reading schemas from active module.
  - Configure route structure (Next.js App Router) with engine-first layout and simple MDX overlay page.
- **Dev Experience & Observability**
  - Integrate logging, performance stats overlay, and hot-module reload pipeline for modules.
  - Add story-driven smoke page under `/labs/core-smoke` verifying module swap, parameter edits, fallback toggles.

### Deliverables & Exit Criteria
- Core engine package published locally (build + tests pass) and consumed by the web app.
- Website demonstrates persistent canvas with ability to hot-swap at least two engine modules.
- Automated tests cover lifecycle basics and rendering boot.
- Developer instructions drafted for contributing new modules.

---

## Phase 3 — Feature Expansion & Module Library Completion
**Goal:** Flesh out the comprehensive module taxonomy, extend tooling, and solidify advanced features before marketing site work begins.

### Key Workstreams
- **Module Library Build-Out**
  - Port prioritized module sets: materials (PBR + NPR), post-processing chains, lighting suites, particles/fields, physics, templates.
  - Implement schema-driven presets (JSON) and auto-generated docs for each module.
  - Introduce MaterialX bridge, buffer/texture loaders (KTX2, DRACO), and async asset pipeline.
- **Advanced Rendering & Simulation Enhancements**
  - Add pipeline options (Forward+, deferred toggle), dynamic resolution, adaptive quality controls.
  - Integrate compute passes for particles/fluids, leveraging WebGPU compute pipelines.
  - Implement fallback heuristics (device capability detection, degrade gracefully to WebGL).
- **AI Assistants & CMS Infrastructure**
  - Set up RAG index service, implement UX Copilot API endpoints, and admin Builder agent flow (diff + PR gating).
  - Wire Contentlayer/MDX schemas for knowledge base, link module metadata to docs.
- **Quality & Performance**
  - Expand automated test coverage (unit, integration, visual regression, GPU feature toggles).
  - Add profiling tools, frame capture scripts, and CI gating on performance budgets.

### Deliverables & Exit Criteria
- Module registry meets minimum viable coverage targets (per taxonomy) with docs and presets.
- Advanced renderer features operational with automated fallback coverage.
- AI assistant endpoints functioning behind auth with RAG knowledge base seeded.
- CI pipeline enforcing quality bars (tests, lint, bundle size, performance budgets).

---

## Phase 4 — Full Website Experience & Launch Readiness
**Goal:** Build the remaining website pages, marketing content, LABS showcases, admin dashboards, and finalize launch operations.

### Key Workstreams
- **Website Content & UX**
  - Develop marketing pages (Home, Portfolio, Services, About) using templates + MDX overlays.
  - Populate LABS section with interactive demos for flagship modules, including preset selectors and performance metrics.
  - Craft admin dashboard for managing AI assistants, content approvals, and module analytics.
  - Implement accessibility and internationalization (a11y audit, locale routing).
- **Operational Readiness**
  - Finalize CMS workflows (Contentlayer → MDX pipeline, asset management in `public/`).
  - Polish SEO, structured data, Open Graph imagery, analytics, consent management.
  - Harden security posture (headers, rate limiting, auth policies for admin tools).
  - Prepare deployment automations (Vercel/Cloudflare scripts, environment config, rollback plan).
- **Validation & Launch**
  - Run end-to-end tests covering user journeys, admin flows, AI assistant interactions.
  - Execute load testing for critical pages and WebGPU fallback validation on supported browsers/devices.
  - Compile launch checklist (acceptance criteria, monitoring setup, incident response playbook).

### Deliverables & Exit Criteria
- All public routes content-complete with responsive, accessible UX layered on the persistent canvas.
- LABS + admin experiences demonstrating engine capabilities and governance workflows.
- Deployment pipeline verified with staged rollout and monitoring dashboards.
- Final sign-off package (docs, tests, metrics) confirming launch readiness.

---

## Cross-Phase Governance
- **Phase Gates:** Advancement contingent on documented sign-off meeting exit criteria.
- **Documentation:** Maintain living ADRs, module specs, and testing evidence per phase.
- **Tooling:** Turborepo pipelines separate package/app tasks; caching strategies optimized by Phase 2.
- **Risk Management:** Track open risks in issue tracker with mitigation plans tied to phases.
- **AI Collaboration:** Builder agent limited to PR workflows with human review per guide directives.

This roadmap ensures each layer of the engine-first experience is production-ready before the next begins, keeping fidelity with the comprehensive architecture guidance while providing space for iterative validation.
