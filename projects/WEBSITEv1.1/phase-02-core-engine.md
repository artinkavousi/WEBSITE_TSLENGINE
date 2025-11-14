# Phase 2 — Core Engine Skeleton & Website Shell

Phase 2 delivers the first working system: the monorepo scaffolding, the `tsl-kit` engine package with
core lifecycle utilities, and the persistent website canvas that runs on WebGPU with WebGL fallback.

## 1. Workspace & Tooling Implementation
- Initialise `pnpm-workspace.yaml`, `turbo.json`, and shared config packages (ESLint, TS config).
- Configure CI pipeline (GitHub Actions or alternative) to run install, build, lint, type-check, and test
  jobs on pushes and PRs.
- Implement commit hooks using `husky`/`lefthook` to enforce formatting and linting locally.

## 2. Engine Package Scaffolding (`packages/tsl-kit`)
- Define TypeScript project references and output targets (ESM + type declarations).
- Implement core types:
  - `ModuleContext`, `EngineModule`, lifecycle events (ref. architecture guide §3.1).
  - `EngineStore` interfaces for params, presets, and backend selection.
- Build `ModuleRegistry` and `ModuleRunner` skeletons with hot-swap behaviour.
- Implement utilities for schema metadata (decorators, JSON schema conversion stubs).
- Add minimal logging and error handling infrastructure.
- Provide placeholder modules (e.g., `scenes/basic-hello-cube`) that exercise lifecycle calls.

## 3. Renderer Integration
- Wrap Three.js `WebGPURenderer` initialisation with capability detection and fallback to `WebGLRenderer`.
- Expose renderer configuration options (adapter selection, tone mapping, color spaces) through engine
  context.
- Implement basic render loop with `frameloop="demand"` semantics.
- Add tests verifying renderer selection logic and lifecycle (Vitest + mocked WebGPU API).

## 4. Global Store & Orchestrator Interfaces
- Implement a shared Zustand store that tracks active module, params, backend, and invalidation state.
- Create schema-driven parameter binding stubs (no UI yet) to prepare for Phase 3 orchestration features.
- Define serialization format for presets (JSON) and persist to memory for now.

## 5. Website Shell (`apps/web`)
- Scaffold Next.js (App Router) or chosen meta-framework with persistent layout in `app/layout.tsx`.
- Create `components/webgpu/EngineRoot.tsx` to host the R3F `<Canvas>` and attach engine hooks.
- Implement a placeholder `Orchestrator` panel that lists module metadata and allows selection.
- Add sample routes (`/`, `/labs`, `/labs/basic-hello-cube`) that confirm module swapping works without
  destroying renderer state.
- Integrate styling tokens (CSS variables or Tailwind config) aligned with glassmorphic design direction.

## 6. Testing & Quality Gates
- Unit tests for core engine utilities, registry swapping, and renderer fallback.
- Integration smoke test to render the demo scene and capture WebGPU/WebGL snapshots (Playwright or
  jest-environment-playwright if feasible).
- Linting and type-check scripts wired into CI.

## Deliverables & Exit Criteria
- `pnpm install` succeeds; workspace builds with `turbo run build`.
- Running the dev server renders the persistent canvas and allows swapping between placeholder modules.
- Renderer chooses WebGPU on capable devices and falls back to WebGL gracefully.
- Core engine package publishes type declarations and can be consumed by external sample.
- All configured tests and linting pass locally and in CI.

Approval at the end of Phase 2 confirms the foundation is executable and ready for feature expansion in
Phase 3.
