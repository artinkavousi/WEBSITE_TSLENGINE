# Phase 1 — Preparation, Research & Foundations

Phase 1 ensures every dependency, workflow, and knowledge asset needed for the WebGPU-first engine
and website is ready before writing production code. Activities are grouped into thematic workstreams
with deliverables, responsible roles, and references back to the source specifications.

## 1. Research & Knowledge Capture
- **Three.js r181 WebGPU/TSL updates**: extract renderer, material, and node changes vs r180; summarise
  compatibility considerations for WebGPU contexts, NodeMaterial updates, and TSL helper APIs.
- **TSL patterns**: catalogue shader node graphs, decorator usage, and parameter schema examples described
  in the comprehensive guide (sections 3.1–3.5) and unified proposal (engine module taxonomy).
- **MaterialX bridge landscape**: review the proposal’s expectations, compare with current Three.js
  support, and note required gaps for import/export workflows.
- **Device capability matrix**: create table of adapter/device limits (maxBindGroups, maxBufferSize, etc.)
  across target browsers and GPUs; inform adaptive quality strategies later.
- **AI assistant guardrails**: research best practices for sandboxing UX Copilot and Builder Agent to align
  with section 6 of the architecture guide.

## 2. Repository & Tooling Decisions
- Confirm monorepo layout (`packages/tsl-kit`, `apps/web`, shared configs) and workspace tooling (pnpm,
  TurboRepo) as recommended in both source docs.
- Select linting/formatting/testing stack: ESLint + TypeScript ESLint, Prettier, Vitest for unit tests,
  Playwright for WebGPU/visual tests, and Biome optional evaluation.
- Establish commit conventions (Conventional Commits), branch policy (phase branches), and PR requirements
  for Builder Agent workflows.
- Draft CI blueprint covering install, build, lint, test, type-check, and bundle size reporting.

## 3. Documentation & Decision Records
- Create ADR templates; schedule ADRs for renderer fallback strategy, schema decorators, AI assistant
  permissions, resource management patterns, and content pipeline technology choices.
- Outline documentation structure (e.g., `/docs/architecture`, `/docs/modules`, `/docs/adr`).
- Prepare knowledge base index referencing RESOURCES repo examples for direct porting.

## 4. Asset & Resource Preparation
- Audit `RESOURCES/` directories to flag priority modules for porting (particles, postFX, materials, LABS).
- Inventory available assets (HDRIs, models, textures) and conversion requirements (KTX2, Draco).
- Define storage locations for generated assets (e.g., `apps/web/public/assets/*`).

## 5. Environment Setup & Validation
- Configure baseline Node version, PNPM version, and browsers required for WebGPU testing.
- Draft developer onboarding guide (tool installation, GPU prerequisites, feature flag instructions).
- Verify WebGPU availability across Chromium, Firefox Nightly, and Safari Tech Preview; note fallback
  requirements and feature detection strategy.

## Deliverables & Exit Criteria
- Research summaries documented and shared with engineering/design leads.
- Repository scaffolding plan, tooling selections, and CI blueprint approved.
- ADRs created for identified decisions and at least the renderer fallback ADR ratified.
- Asset catalogue and porting priority list agreed.
- Onboarding checklist drafted; test devices/browsers confirmed for later phases.

Progression to Phase 2 requires sign-off from engineering, design, and product stakeholders that the
foundation is solid and all critical unknowns are addressed.
