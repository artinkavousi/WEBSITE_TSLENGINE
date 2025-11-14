# Phase Gate Checklists & Acceptance Tests

Use these checklists to validate readiness before moving to the next phase. All items must be completed
or have approved exceptions with mitigation notes.

## Phase 1 Checklist — Preparation Complete
- [ ] Three.js r181 WebGPU/TSL delta report published.
- [ ] MaterialX bridge assessment and gap analysis documented.
- [ ] Device capability matrix compiled and shared.
- [ ] ADRs drafted and approved for renderer fallback, schema decorators, AI guardrails.
- [ ] Monorepo layout diagram reviewed; tooling stack decision recorded.
- [ ] Asset inventory and porting priority list finalised.
- [ ] Developer onboarding guide reviewed by engineering/product.

## Phase 2 Checklist — Core Skeleton Ready
- [ ] `pnpm install` and `turbo run build` succeed on clean machine.
- [ ] Engine package compiles to ESM + types; sample import works.
- [ ] Renderer auto-selects WebGPU/WebGL correctly (tested on representative devices).
- [ ] Zustand store manages module selection and params without runtime errors.
- [ ] Website shell renders persistent canvas and swap demo modules without reloads.
- [ ] Linting, type-checking, and unit tests pass in CI.
- [ ] Smoke test captures WebGPU and WebGL renders.

## Phase 3 Checklist — Engine Feature Complete
- [ ] Priority module families implemented with documentation and presets.
- [ ] Resource manager demonstrates correct allocation/disposal under stress test.
- [ ] Preset system saves, loads, imports, exports without data loss.
- [ ] Debug visualisers accessible and documented.
- [ ] Automated test coverage threshold met (target ≥ 80% critical paths).
- [ ] Performance benchmarks recorded for flagship scenes (WebGPU + WebGL fallback).

## Phase 4 Checklist — Launch Readiness
- [ ] Contentlayer pipeline builds content and templates without errors.
- [ ] UI overlays accessible (WCAG AA) and responsive behaviour validated.
- [ ] LABS showcase populated for all shipped modules.
- [ ] UX Copilot and Builder Agent deployed with monitoring and rate limits.
- [ ] Deployment pipeline produces successful staging & production releases.
- [ ] Lighthouse/axe/WebPageTest reports meet target scores; issues resolved.
- [ ] Security/privacy review signed off; legal documents published.
- [ ] Launch runbook and support handover completed.

Record evidence links (docs, tickets, dashboards) for each item to ensure traceability.
