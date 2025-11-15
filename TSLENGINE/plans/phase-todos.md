# TSL Engine Website — Phase TODO Tracker

> **Purpose:** Single source of truth for phase status. Update this file whenever a phase starts, moves to review, or is accepted.

| Phase | Focus | Status | Notes |
| --- | --- | --- | --- |
| 1 | Foundation & Research | ⚠️ **Infrastructure complete — research docs pending** | Monorepo, packages, tooling, and CI are live (`pnpm-workspace.yaml`, `turbo.json`, `packages/tsl-kit`, `apps/web`). Need to finish the research dossier in `RESEARCH/`. |
| 2 | Core Engine & Infrastructure | ⏳ Not started | Depends on Phase 1 research hand-off + prioritized module list. |
| 3 | Extended Engine & Module Library | ⏳ Not started | Blocked by Phase 2 engine APIs and validated module scaffolding. |
| 4 | Website, AI, Deployment & Polish | ⏳ Not started | Blocked by Phase 2+3 deliverables. |

---

## Phase 1 — Foundation & Research

**Objective:** Complete all groundwork: monorepo, tooling, docs, and research so later phases can execute without friction.  
**Current status:** ✅ Monorepo + tooling done. 🚧 Research notebooks + inventories still pending.

### ✅ Completed Deliverables

- **Workspace & toolchain**
  - `pnpm-workspace.yaml`, root `package.json`, and `turbo.json` created and aligned with pnpm v9+.
  - Biome (`biome.json`), Vitest (`packages/tsl-kit/vitest.config.ts`), and Playwright (`apps/web/playwright.config.ts`) configs committed.
- **Engine package (`packages/tsl-kit`)**
  - TypeScript config + strict compiler options (`tsconfig.json`).
  - Core folders (`core`, `rendering`, `modules`, `utils`) plus stubs (`registry.ts`, `runner.ts`, etc.).
- **Website package (`apps/web`)**
  - Next.js 15 App Router app scaffolded with Tailwind, templates, LABS, content, and lib folders.
  - Project-level path aliases wired up (`tsconfig.json`) and Next config tuned for Three/WebGPU.
- **CI/CD + automation**
  - `.github/workflows/quality.yml` & `test.yml` cover lint/typecheck/unit tests (E2E pending enablement).
- **Planning artifacts**
  - `IMPLEMENTATION_PLAN_4PHASES.md`, `PHASE_1_TODO.md`, `PROJECT_SUMMARY.md`, `QUICK_REFERENCE.md`, and `PHASE_1_STATUS.md` published.
  - `PORT_MAPPING.md` seeded with priority buckets for first wave of modules.

### 🚧 Outstanding Items to Finish Phase 1

| Area | Required Work | Owner | Notes |
| --- | --- | --- | --- |
| Research notebooks | Create the 9 markdown files listed in `RESEARCH/README.md` (`threejs-r181-notes.md`, `portfolio-inventory.md`, etc.) with actionable findings. | Research | Currently only the index exists. |
| Source analysis | Capture summaries for portfolio, Fragments, and TSL examples, then link each to `PORT_MAPPING.md`. | Research → Engine | Mapping tables still show placeholder entries for most modules. |
| Testing guide | Author testing & workflow docs promised in Phase 1 exit criteria (`testing-guide.md`, `development-workflow.md`). | DevOps | Required before CI policies can gate future phases. |
| Acceptance review | Update `PHASE_1_STATUS.md` once research docs ship so the phase can be formally signed off. | PM | Status currently calls out “research pending.” |

### 📌 Immediate Next Actions

1. Draft each research file with headings + first wave of notes; link back to the corresponding sections in `IMPLEMENTATION_PLAN_4PHASES.md`.
2. Flesh out `PORT_MAPPING.md` with at least the Phase 2 essentials (10–15 core modules) tagged with concrete source references.
3. Capture testing + workflow guidance so CI policies are enforceable before Phase 2 coding starts.

When the four bullets above are checked off, mark Phase 1 as ✅ Complete here and in `PHASE_1_STATUS.md`, then green-light Phase 2 kickoff.

---

## Phase 2 — Core Engine & Essential Infrastructure

**Goal:** Ship a working WebGPU/TSL engine with renderer lifecycle, scene context, and 10–15 high-priority modules (materials, post-FX, noise, particles).  
**Dependencies:** Final Phase 1 research package, approved porting plan, testing guide.

### TODO Highlights
- Finalize core abstractions (`packages/tsl-kit/src/core/{context,registry,runner}.ts`).
- Stand up WebGPU renderer factory + fallback strategy in `rendering/factory.ts`.
- Implement prioritized modules from `PORT_MAPPING.md` (PBR, emissive, bloom, noise, GPU particles).
- Wire the engine into `apps/web` persistent canvas + initial LABS demos.
- Turn on CI gates (lint, typecheck, vitest) and add WebGPU smoke test.

---

## Phase 3 — Extended Engine & Module Library

**Goal:** Port the full 150+ module set (materials, physics, FX, AI helpers) and stabilize authoring tools.  
**Dependencies:** Stable Phase 2 APIs + telemetry to measure perf/regressions.

Key streams: advanced lighting, compute/physics suites, AI-driven builders, asset ingestion, and docs auto-generation.

---

## Phase 4 — Website, AI, Deployment & Polish

**Goal:** Build the engine-first marketing site, dual AI assistants, admin dashboard, and production deployment (Vercel/Cloudflare).  
**Dependencies:** Complete engine feature set, asset library, and governance tooling from Phases 2–3.

Focus: UX polish, CMS/content ingestion, analytics, CI/CD hardening, and customer-ready documentation.
