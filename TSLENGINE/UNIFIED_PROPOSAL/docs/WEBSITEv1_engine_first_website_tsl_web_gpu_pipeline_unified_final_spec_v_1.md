# Engine‑First Website + TSL/WebGPU Pipeline — Unified Final Spec (v1.0)

*A single, merged blueprint that blends your shared-chat website workflow with the WebGPU/TSL engine plan. Optimized for permanence, low cost, and rapid iteration with AI agents.*

---

## 0) Goals & Non‑Negotiables

- **Engine‑first UX:** One persistent R3F/Three canvas across the site; routes swap scenes without re-creating the renderer.
- **WebGPU‑first, WebGL fallback:** Three r180+ (or r181+) with **TSL** node materials. Auto‑fallback to WebGL when `navigator.gpu` is unavailable.
- **Schema‑driven control:** A single Zod/JSON‑schema source renders live Tweakpane controls and admin forms; presets are serializable JSON.
- **MDX CMS in Git:** Contentlayer‑typed posts/projects with 3D/GSAP templates chosen via frontmatter.
- **Two assistants:**
  - **UX Copilot** (safe UI tools) for navigation, parameter tweaks, and search.
  - **Builder Agent** (admin‑only) for draft → diff → confirm → PR (never push directly to `main`).
- **RAG hooks:** Repo/docs embeddings (pgvector / CF Vectorize), scoped by path.
- **Jamstack deploy:** Vercel **or** Cloudflare Pages (OpenNext). Free path available.
- **Guardrails:** All writes are dry‑run → diff → explicit confirm → PR; high‑impact ops require 2nd confirm.
- **Acceptance tests:** Playwright coverage for engine persistence, MDX templates, search, and agent tools.

---

## 1) Tech Stack (final)

- **App:** Next.js (App Router) • TypeScript • Tailwind + shadcn/ui • Framer Motion (lite)
- **3D:** three r180+ • @react-three/fiber (R3F) • Drei • react-postprocessing • **TSL** nodes
- **Renderer:** `WebGPURenderer` primary, `WebGLRenderer` fallback (custom gl factory in R3F)
- **State:** Zustand (engine params, scene routing)
- **Content:** MDX + Contentlayer
- **Animation:** GSAP (template timelines)
- **AI layer:** Vercel AI SDK (OpenAI/Claude ready) + optional **WebLLM** browser fallback
- **Search/Comments/Analytics:** Pagefind • Giscus • Cloudflare Web Analytics
- **RAG (optional):** Supabase Postgres + pgvector **or** Cloudflare Vectorize (adapter abstraction)
- **CI/CD:** GitHub Actions (quality, build, deploy) • Renovate • Changesets

---

## 2) High‑Level Architecture

```mermaid
flowchart LR
  A[Visitor] -- chat/UI --> UXC[UX Copilot]
  UXC -- tools --> S[Zustand Store]
  S --> R3F[Persistent R3F Canvas]
  R3F --> GPU[WebGPU/TSL | WebGL]

  subgraph Content
    MDX[MDX Posts & Projects]
    CL[Contentlayer]
    TPL[3D/GSAP Templates]
  end
  MDX --> CL --> APP[Next.js]
  TPL --> APP
  APP --> R3F

  subgraph Admin
    ADM[/Admin Dashboard/]
    BA[Builder Agent]
  end
  ADM -- schemas/presets --> S
  ADM --> BA
  BA -- dry‑run diffs --> REPO[(Git repo)]
  BA -- PR only --> GH[(GitHub)]
  GH --> CI[GitHub Actions]
  CI --> DEP[Vercel/Cloudflare Pages]

  PF[Pagefind] -.-> APP
  Giscus[Giscus] -.-> APP
  CFA[CF Analytics] -.-> APP
```

---

## 3) Repository Layout (authoritative)

```
app/
  layout.tsx                 # persistent canvas + overlay shell
  globals.css
  page.mdx                   # home as MDX overlay
  admin/page.tsx             # schema‑driven dashboard
  blog/[slug]/page.tsx       # post renderer with 3D template
  api/
    ux-assistant/route.ts    # safe UI tools (navigate, setParam, etc.)
    builder/route.ts         # admin agent (diff→confirm→PR)

components/
  ThreeRoot.tsx              # Canvas + renderer factory + scene resolver
  UiOverlay.tsx              # HUD/MDX shell
  AssistantClient.tsx        # chat widget (UX Copilot)
  AdminAgentPanel.tsx        # optional admin actions

scenes/
  home/Scene.tsx
  portfolio/Scene.tsx
  fluid/Scene.tsx            # seed demo (can swap to fluid later)
  index.ts                   # path → dynamic scene map

lib/
  scenes.ts                  # exported resolver
  store.ts                   # zustand engine state
  analytics.ts               # CF Analytics injector
  ai/
    providers.ts             # model router (OpenAI/Anthropic) + WebLLM
    rag.ts                   # embeddings adapter (pgvector/Vectorize)
  agents/
    ux-tools.ts              # navigate / setParam / toggleFX / loadScene
    admin-tools.ts           # draftPost / applyTemplate / confirmAndPR
    git-utils.ts             # slugify / diffPatch / openPR stubs
  admin/
    schemas.ts               # Zod schemas (creative + dev)
    schema-pane.ts           # JSON‑schema → Tweakpane renderer
  cms/
    contentlayer.config.ts   # typed MDX

content/
  posts/hello-webgpu.mdx
  projects/*

templates/
  registry.json              # id → component + schema keys
  HeroGlassWave.tsx          # sample 3D/GSAP hero

styles/
  tokens.json                # style tokens (color/motion)

scripts/
  postbuild-pagefind.mts     # build search index

public/
  og/*  models/*  textures/*  icons/*

.github/workflows/
  quality.yml  build.yml  (deploy.yml later)
```

---

## 4) Persistent Canvas & Renderer Strategy

- R3F `<Canvas gl={(canvas)=>customRenderer(canvas)} frameloop="demand" shadows>`.
- `customRenderer` tries `WebGPURenderer` (r180+) and gracefully falls back to `WebGLRenderer`.
- DPR clamp to 2.0; tone mapping ACES Filmic; sRGB output for WebGL fallback.
- Dynamic scene resolution via `usePathname()` + dynamic imports.
- **Performance:** instancing, lazy textures, invalidate on interaction/tween, dispose on unmount.

**Pitfall guard:** WebGPU needs async init; ensure renderer is ready before first frame (R3F’s `onCreated` or lazy Scene mount).

---

## 5) TSL/Node Materials (WebGPU‑ready)

- Prefer **MeshStandardNodeMaterial / MeshPhysicalNodeMaterial** with TSL nodes.
- Use `timerGlobal()`, `sin`, `mul`, `add`, `color`, `float` for simple animated emissive/diffuse graphs.
- House custom TSL utilities under `lib/shaders/tsl/*` (e.g., glow pulses, triplanar blend, noise, toon ramps).
- Post‑FX via `@react-three/postprocessing` (Bloom, ToneMapping, SMAA for WebGL path).

---

## 6) Admin Dashboard (Schema‑Driven)

- **Single source of truth:** Zod schemas → JSON Schema → Tweakpane live controls.
- **Creative schema:** material color/roughness/metalness, emissive pulse, bloom strength.
- **Dev schema:** renderer mode (webgpu/webgl/auto), maxFPS, debug toggles.
- **Presets:** pane.exportPreset() to JSON; save/load to localStorage and `/presets/*.json`.
- **“Suggest preset”** button can call UX Copilot/Builder Agent to propose tuned values.

---

## 7) Content Pipeline & Animated Templates

- Posts in `/content/posts/*.mdx` with frontmatter:
  - `templateId`, `styleId`, `sceneProps` (camera/lights/fx/shader params)
- **Template registry** maps `templateId` → React component file + per‑template schema hints.
- **Styles** hold color + motion tokens (theme + GSAP durations/easings).
- Post page loader resolves template & tokens and mounts R3F/TSL hero.
- **GSAP** used for intro/states; keep timelines scoped to the template component.

---

## 8) Assistants (Tools & Flows)

**UX Copilot** (public): safe tool calls only
- `navigate(path)` – route switch
- `setParam(key,value)` – write into Zustand; drives live scene
- `loadScene(id)`, `togglePostFX(name)` – optional
- `searchSite(query)` – Pagefind (or vector quick‑answers)

**Builder Agent** (admin‑only): repo actions with guardrails
- `draftPost({ title, brief, tags, templateId, styleId })` → returns diff
- `applyTemplate({ slug, sceneProps })` → returns diff
- `createAssets({ slug })` → renders OG/thumbs (optional)
- `confirmAndPR({ diffs, title })` → writes branch & opens PR

**Policies:**
- No direct writes to `main`.
- High‑impact ops (delete/move) require a **second** confirmation.
- Audit all tool invocations (user, time, args, result).

---

## 9) RAG & Knowledge

- Start simple (optional): embed `/content`, `/lib/shaders`, `/scenes` titles & docs.
- Store vectors in **pgvector** (Supabase) or **CF Vectorize**; keep an adapter in `lib/ai/rag.ts`.
- Retrieval scoped by path prefix; return citations in assistant replies.

---

## 10) Search, Comments, Analytics

- **Pagefind:** run in postbuild (`npx pagefind --site .next/static` or export dir) to generate static index.
- **Giscus:** mount on post pages; repo/category IDs via env.
- **CF Analytics:** beacon snippet injected from `lib/analytics.ts` (env‑driven).

---

## 11) Hosting & Cost Lanes

**$0 lane:**
- GitHub → Cloudflare Pages (static or via OpenNext). Use free *.pages.dev; add CF Analytics.

**Alt:**
- Vercel Hobby (native Next). Domain at Cloudflare Registrar (at cost).

**Large assets:** store under `/public`; consider Git LFS for heavy binaries.

---

## 12) CI/CD & Quality

- **quality.yml**: typecheck → lint (Biome) → unit tests (Vitest)
- **build.yml**: install → `next build` → Pagefind index
- **deploy.yml**: per host target (Vercel action or CF Pages)
- **Renovate** for deps; **Changesets** for versioning/changelog

---

## 13) ENV & Secrets (template)

```
OPENAI_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GITHUB_APP_ID=
GITHUB_APP_INSTALLATION_ID=
GITHUB_APP_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
NEXTAUTH_SECRET=
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPO_ID=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
NEXT_PUBLIC_CF_ANALYTICS_TOKEN=
```

---

## 14) Acceptance Tests (Playwright)

- **A1** Canvas persists across route changes; no context loss.
- **A2** `/labs/fluid` scene responds to Admin slider changes.
- **A3** MDX post renders; template mounts and animates.
- **A4** Pagefind returns seeded post; search UI navigates.
- **A5** UX Copilot can `navigate('/portfolio')` and `setParam('postfx.bloom', false)`.
- **A6** Builder Agent drafts a post → diff visible → PR opened (stub URL OK).
- **A7** ENV‑only secrets; zero hard‑coded keys; no console errors in prod build.
- **A8** Optional: WebLLM fallback toggle works offline.

---

## 15) Rollout Plan (7 steps)

1. **Scaffold & deps** (Next, Tailwind, R3F, Drei, postprocessing, Zustand, Contentlayer, GSAP, Tweakpane).
2. **Renderer shell** (WebGPU→WebGL fallback) + scene resolver.
3. **Admin dashboard** (schemas → Tweakpane) + preset save/load.
4. **MDX CMS** (Contentlayer) + `HeroGlassWave` template + seeded post.
5. **UX Copilot** API + chat widget; safe tools wired to store.
6. **Builder Agent** API + draft/PR flow (GitHub App wiring later).
7. **Pagefind & Giscus** + Actions CI + first deploy (Vercel/CF Pages).

---

## 16) Code Seeds (drop‑in excerpts)

**Renderer factory (R3F `gl` prop):**
```tsx
import { WebGPURenderer } from 'three/webgpu'
import { WebGLRenderer, ACESFilmicToneMapping, SRGBColorSpace } from 'three'

export function makeRenderer(canvas: HTMLCanvasElement) {
  if ((navigator as any)?.gpu) {
    const r = new WebGPURenderer({ canvas, antialias: true })
    ;(r as any).toneMapping = ACESFilmicToneMapping
    return r
  }
  const r = new WebGLRenderer({ canvas, antialias: true })
  r.outputColorSpace = SRGBColorSpace
  r.toneMapping = ACESFilmicToneMapping
  return r
}
```

**TSL glow pulse:**
```ts
import { MeshStandardNodeMaterial, timerGlobal, sin, mul, add, color, float } from 'three/tsl'
export function makeGlowPulseMaterial(hex = '#34d399') {
  const mat = new MeshStandardNodeMaterial()
  const t = timerGlobal()
  const pulse = add(float(0.5), mul(float(0.5), sin(mul(t, float(2.0)))))
  mat.colorNode = color(hex)
  mat.emissiveNode = color(hex).mul(pulse)
  return mat
}
```

**Zustand store (param writer):**
```ts
import { create } from 'zustand'
export const useStore = create<{ params:any; set:(path:string,v:any)=>void }>((set,get)=>({
  params:{ material:{ baseColor:'#34d399', metalness:0.2, roughness:0.35, emissivePulse:true }, postfx:{ bloom:true, bloomStrength:0.65 }, renderer:'auto', debugNormals:false, maxFPS:60 },
  set:(path,value)=>{ const p=structuredClone(get().params); const k=path.split('.'); let o:any=p; for(let i=0;i<k.length-1;i++) o=o[k[i]]??(o[k[i]]={}); o[k.at(-1)!]=value; set({params:p}) }
}))
```

---

## 17) Security & Privacy

- Admin routes gated (NextAuth/Clerk). Separate secrets per assistant.
- Rate‑limits on tool invocation; structured audit logs.
- Clear content usage policy (robots + AI usage manifest).

---

## 18) Next Actions

- Generate starter files (all paths above) **or** port into your existing repo.
- Wire GitHub App creds for PR creation.
- Add a second template (e.g., **MorphoGrid**) and a preset library.
- Decide RAG backend (pgvector vs Vectorize) and enable nightly embed job.

---

*End of unified spec.*

