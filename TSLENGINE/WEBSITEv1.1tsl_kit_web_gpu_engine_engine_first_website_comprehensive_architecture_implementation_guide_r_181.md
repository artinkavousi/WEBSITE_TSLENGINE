# TSL‑KIT WebGPU Engine & Engine‑First Website — Comprehensive Architecture & Implementation Guide (r180+)

> **Status:** Final merged spec • **Scope:** Engine (package) + Website (app) + LABS + Admin + AI CMS + CI/CD • **Target:** Three.js r180+ (WebGPU/TSL, WebGL fallback)

---

## Table of Contents
1. Principles & Goals
2. Repository Layout (Monorepo)
3. Engine Architecture (TSL‑KIT)
   - 3.1 Module Contract (Typed Lifecycle)
   - 3.2 Context, Capabilities & Backends
   - 3.3 Registry & Runner (Hot‑Swap)
   - 3.4 Parameter Schemas & Decorators → Auto‑UI
   - 3.5 Resource Management & Disposal
4. Website Architecture (Engine‑First)
   - 4.1 Persistent Canvas Shell (R3F + WebGPU/TSL)
   - 4.2 Scene/Module Resolution per Route
   - 4.3 Glassmorphic Control‑Panel Orchestrator
   - 4.4 Content Pipeline (MDX + Contentlayer)
   - 4.5 Template System (R3F + GSAP + TSL)
   - 4.6 LABS Showcase (per‑module examples)
5. Global State & Presets (Single Zustand Store)
6. AI Assistants & CMS
   - 6.1 UX Copilot (UI‑scoped tools)
   - 6.2 Builder Agent (PR‑only, diff/confirm)
   - 6.3 RAG/Vector Store & Offline Fallback
7. Performance Playbook (WebGPU/WebGL)
8. Quality, Testing & CI/CD
9. Security, Permissions & Guardrails
10. Deployment (Vercel / Cloudflare)
11. Acceptance Criteria Checklist
12. Migration & Extensibility
13. Appendix: Type Definitions, Code Stubs, Diagrams
14. Glossary

---

## 1) Principles & Goals
- **Engine‑first:** One persistent renderer powers every page; content overlays as UI/MDX.
- **Hot‑swappable modules:** Each feature (sim, post‑FX, material, scene) is a self‑contained unit with a formal lifecycle.
- **Single source of truth:** One Zustand store manages params, active module, presets, and backend.
- **Schema‑driven UI:** Decorators/Zod → JSON Schema → auto‑generated Tweakpane controls.
- **Reuse across projects:** Engine ships as a versioned package (`packages/tsl‑kit`); app is a thin adapter.
- **Robust & maintainable:** TypeScript, explicit lifecycles, CI, tests, PR‑only changes via Builder Agent.
- **WebGPU‑first:** Prefer `WebGPURenderer` + TSL; fallback to WebGL automatically.

---

## 2) Repository Layout (Monorepo)
```
root/
  packages/
    tsl-kit/                       # portable engine (no Next.js/R3F assumptions)
      src/
        core/                      # lifecycle, registry, context, decorators, utils
        modules/                   # built-ins: particles, fluids, postfx, materials, scenes
        utils/                     # math, buffers, KTX2, Draco, WG size helpers
      package.json
  apps/
    web/
      app/
        components/webgpu/
          EngineRoot.tsx           # persistent Canvas + renderer factory + loop
          useEngineStore.ts        # single Zustand store (engine + UI slices)
          Orchestrator.tsx         # Tweakpane UI (schema → bindings)
          adapters.ts              # thin glue: store ↔ tsl-kit context
        (routes)                   # e.g., /, /portfolio, /labs/*, /admin
      LABS/                        # per‑module demo pages & docs
      content/                     # MDX posts & projects
      templates/                   # R3F+GSAP 3D article templates
      styles/                      # tokens (colors/motion)
      public/                      # models, textures (KTX2), og images
      cms/contentlayer.config.ts   # MDX schema
  turbo.json
  pnpm-workspace.yaml
```

**Folder aliases**
- `packages/tsl-kit` exports ESM modules: `core/*`, `modules/*`.
- `apps/web` consumes engine via workspace dependency.

---

## 3) Engine Architecture (TSL‑KIT)

### 3.1 Module Contract (Typed Lifecycle)
Each engine module implements a strict interface:

```ts
interface EngineModule<TParams> {
  id: string;                       // unique path-like id (e.g., "particles/burst")
  caps: { kind: 'scene'|'postfx'|'material'|'sim'|'utility'; backends?: ('webgpu'|'webgl')[] };
  defaultParams: TParams;           // serializable defaults used by store
  schema: { jsonSchema?: any; zod?: any }; // for auto UI

  init(ctx: ModuleContext, params: TParams): Promise<void>|void;      // allocate, create
  mount(ctx: ModuleContext, params: TParams): Promise<void>|void;     // attach to scene graph
  update?(ctx: ModuleContext, dt: number, params: TParams): boolean|void; // return true to invalidate
  unmount?(ctx: ModuleContext): void;                                  // detach
  dispose?(ctx: ModuleContext): void;                                  // free GPU resources
}
```

### 3.2 Context, Capabilities & Backends
`ModuleContext` carries only what modules need, no app dependencies:
- `scene`: shared Three scene; `root`: an **isolated Object3D** owned by the module.
- `renderer`: WebGPU or WebGL instance; modules can branch by `caps.backends`.
- `events.invalidate()`: request a redraw when frameloop is `"demand"`.
- `getParam/setParam(path,value)`: 2‑way binding to global store.

### 3.3 Registry & Runner (Hot‑Swap)
A `ModuleRegistry` collects modules. A `ModuleRunner` manages load/unload/tick:
- `load()`: unmount/disable previous → create new isolated `root` → `init`→`mount`.
- `tick(dt)`: call `update` and invalidate when needed.
- `setParams()`: update the active module params snapshot.

### 3.4 Parameter Schemas & Decorators → Auto‑UI
- Decorators mark class fields with control metadata (min/max/step, color, checkbox).
- `getJsonSchemaFrom(Class)`: converts metadata to JSON Schema.
- Or use a Zod schema; both compile to UI controls.

### 3.5 Resource Management & Disposal
- **Never** create/dispose in `update`. Allocate in `init`, release in `dispose`.
- Attach only `root` to scene; module owns all children.
- Reuse render targets & materials; share samplers; prefer instancing.

---

## 4) Website Architecture (Engine‑First)

### 4.1 Persistent Canvas Shell (R3F + WebGPU/TSL)
- `EngineRoot.tsx` creates the renderer: WebGPU if `navigator.gpu` present and backend ≠ force‑WebGL; otherwise WebGL.
- `frameloop="demand"`: redraw when modules signal an update (lower CPU/GPU).

### 4.2 Scene/Module Resolution per Route
- Route pages select a module (`selectModule(id, defaults)`) and mount the Orchestrator with that module’s schema.
- Global scene stays alive; swapping routes does not destroy GPU state.

### 4.3 Glassmorphic Control‑Panel Orchestrator
- Reads a module’s JSON Schema; generates Tweakpane controls dynamically.
- Writes changes back into the single store via `setParam(path, value)`.
- Saves/loads presets (JSON) per module.

### 4.4 Content Pipeline (MDX + Contentlayer)
- Posts/projects are typed with Contentlayer; frontmatter includes `templateId`, `styleId`, and `sceneProps`.
- MDX pages render 3D templates (R3F+TSL+GSAP) with values from frontmatter.

### 4.5 Template System (R3F + GSAP + TSL)
- Templates live in `apps/web/templates/*`; registry maps `templateId → component`.
- `style tokens` (colors/motion) are resolved by `styleId`.
- GSAP timelines choreograph intro/micro‑interactions.

### 4.6 LABS Showcase (per‑module examples)
- `apps/web/LABS/*` hosts a minimal page per module for QA, docs, and demos.
- These act like a Storybook for 3D systems.

---

## 5) Global State & Presets (Single Zustand Store)
- Slices: `engine` (backend, fpsCap), `module` (active id + params), `ui` (presets).
- Only the store writes to module params; modules read via `getParam`.
- Assistants, Orchestrator, and route pages operate against the same store.

---

## 6) AI Assistants & CMS

### 6.1 UX Copilot (UI‑Scoped Tools)
- In‑page assistant with **safe tools**: `navigate(path)`, `setParam(key,val)`, `loadModule(id)`, `togglePostFX(name)`.
- No repo keys, no file writes.

### 6.2 Builder Agent (PR‑only, diff/confirm)
- Admin‑only route exposes tools: `draftPost`, `applyTemplate`, `createAssets(OG)`, `openPR`.
- **Dry‑run → diff → confirm → PR**, never push to main.

### 6.3 RAG/Vector Store & Offline Fallback
- Embed `/content`, `/scenes`, `/lib/shaders` into pgvector (Supabase) or CF Vectorize.
- Offline assistant via WebLLM (browser, WebGPU). Toggle in settings.

---

## 7) Performance Playbook (WebGPU/WebGL)
- **Frameloop on demand**; only animate when needed; explicitly invalidate.
- **InstancedMesh** & single‑material batches; merge geometries where static.
- **KTX2/Basis** for textures; share samplers; clamp mips/lods.
- **Composer reuse** for post‑FX; avoid per‑frame allocations.
- **Adapter caps** (WebGPU): clamp workgroup sizes; pick compute paths accordingly.
- **Dynamic import** of modules/templates; code‑split heavy assets.
- **Perf HUD** in /admin (FPS, draw calls, GPU adapter info, pipelines).

---

## 8) Quality, Testing & CI/CD
- **Unit tests:** lifecycle sequencing, schema emission, param mutation.
- **Visual/E2E:** Playwright snapshots of LAB pages; thresholded diffs.
- **Lint/Format:** Biome or ESLint+Prettier; strict TS config.
- **CI (GitHub Actions):** typecheck → lint → unit → e2e → build. Separate job for package vs app.
- **Renovate + Changesets** for dependency updates and versioning.

---

## 9) Security, Permissions & Guardrails
- Builder Agent is admin‑gated; every write returns a diff and requires confirmation.
- PR‑only flow; protected main; high‑impact ops (delete/move) require second confirm.
- Audit log of tool calls (who/when/args) and PRs.

---

## 10) Deployment (Vercel / Cloudflare)
- **Vercel:** zero‑config Next deploy; env vars in project settings.
- **Cloudflare Pages (+OpenNext):** Next on Workers/Pages; add CF Analytics token.
- Domains via Cloudflare Registrar; HTTPS enforced; security headers.

---

## 11) Acceptance Criteria Checklist
1. Persistent canvas survives route changes; no context loss.
2. Selecting a module in a route mounts it; Orchestrator shows its controls.
3. Changes in the panel mutate params and are reflected visually.
4. MDX posts render chosen 3D template with `sceneProps` and style tokens.
5. Pagefind search returns seeded posts; Giscus loads on post pages.
6. UX Copilot can navigate and tweak params via tools.
7. Builder Agent drafts a post, shows diffs, and opens a PR.
8. CI passes: typecheck/lint/test/e2e/build.
9. WebGPU path works where available; clean WebGL fallback elsewhere.
10. No GPU leaks under repeated hot‑swaps (heap stable; resources disposed).

---

## 12) Migration & Extensibility
- **Adding a module:** implement lifecycle + schema; register in `packages/tsl-kit`; add a LAB page.
- **Composed modules:** a future `PipelineRunner` can mount multiple modules (sim→material→postfx) with a small scheduler.
- **Headless batch:** export a headless harness for server‑side thumbnails / OG image renders.

---

## 13) Appendix: Type Definitions, Code Stubs, Diagrams

### 13.1 Key Types (excerpt)
```ts
export type ModuleContext = {
  scene: THREE.Scene;
  root: THREE.Object3D;
  renderer: THREE.WebGLRenderer | any; // WebGPURenderer when available
  events: { invalidate: () => void; onPresetSave?: (n: string, d: unknown) => void };
  getParam<T=any>(path: string): T;
  setParam(path: string, value: any): void;
}
```

### 13.2 Example Module (Particles Burst)
```ts
class ParticleParams {
  @Control({ label: 'Count', min: 1e3, max: 2e5, step: 1e3 }) count = 5e4
  @Control({ label: 'Size', min: 0.2, max: 6, step: 0.1 })     size  = 1.5
  @Control({ label: 'Tint', view: 'color' })                   tint  = '#34d399'
  @Control({ label: 'Animate', view: 'checkbox' })             animate = true
}

export const ParticleBurst: EngineModule<ParticleParams> = { /* ... see body in spec */ }
```

### 13.3 Orchestrator Binding (excerpt)
```ts
const addBinding = (folder, path, def) => {
  const proxy = { value: readPath(useEngineStore.getState().params, path) }
  const bind = folder.addBinding(proxy, 'value', {/* min/max/step/color */})
  bind.on('change', ev => setParam(path, ev.value))
}
```

### 13.4 Mermaid Overview
```mermaid
flowchart LR
  User --> UI[Overlay/MDX]
  UI --> Store[Zustand]
  Store --> Engine[EngineRoot (R3F)]
  Engine --> Runner[ModuleRunner]
  Runner -->|init/mount/update| Mod[EngineModule]
  Mod --> Scene[Three Scene]
  subgraph CMS
    MDX[MDX Posts]
    CL[Contentlayer]
    Tpl[3D Templates]
  end
  MDX --> CL --> UI
  Tpl --> UI

  subgraph Admin
    Panel[Orchestrator]
    Builder[Builder Agent]
  end
  Panel --> Store
  Builder --> Repo[(Git Repo)]
  Repo --> PR[PR]
  PR --> CI[GitHub Actions]
  CI --> Deploy[Vercel/CF Pages]
```

---

## 14) Glossary
- **TSL (Three Shading Language):** Node‑based shader graph API that targets WebGPU/WGSL and WebGL/GLSL.
- **WebGPU Renderer:** Modern graphics backend in Three.js; requires `navigator.gpu`.
- **Frameloop="demand":** R3F mode that renders only when invalidated.
- **Preset:** JSON snapshot of a module’s params; saved/loaded by the Orchestrator.
- **RAG:** Retrieval‑augmented generation; fetches relevant docs/snippets for AI agents.

---

### Quick Start (Summary)
1) `pnpm -w add three @react-three/fiber @react-three/drei zustand tweakpane gsap` in web app; engine built in `packages/tsl-kit`.
2) Register modules in `packages/tsl-kit/src/modules/*` and export via `index.ts`.
3) Mount `EngineRoot` once; in each route call `selectModule(id, defaults)` and render `<Orchestrator schema={module.schema.jsonSchema} />`.
4) Write MDX posts with `templateId`, `styleId`, `sceneProps` and publish.
5) Use /admin for presets and module QA; Builder Agent for PR‑based content changes.

