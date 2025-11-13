# TSL/WebGPU Engine — Implementation Roadmap

**Version:** 2.0  
**Date:** November 13, 2025  
**Duration:** 14 weeks (7 phases)  
**Total Effort:** ~350 hours

---

## 📅 Timeline Overview

```
Week 1-2:   Phase 1 - Foundation (scaffold + renderer)
Week 2-3:   Phase 2 - Admin Dashboard (schema-driven controls)
Week 3-4:   Phase 3 - MDX CMS (content + templates)
Week 4-8:   Phase 4 - Module Porting (150+ modules)
Week 9:     Phase 5 - UX Copilot (public AI assistant)
Week 10:    Phase 6 - Builder Agent (admin AI + PR workflow)
Week 11-12: Phase 7 - RAG + Search (knowledge base)
Week 13-14: Phase 8 - Polish + Launch (production deploy)
```

---

## Phase 1: Foundation (Week 1-2)

### Objective
Scaffold monorepo + working WebGPU/WebGL renderer shell

### Deliverables
- ✅ Monorepo structure (`packages/tsl-kit`, `LABS/web`)
- ✅ WebGPU renderer with WebGL fallback
- ✅ Persistent canvas layout (no re-init on route change)
- ✅ Dynamic scene resolver
- ✅ Core engine types + registry system

### Tasks

#### Week 1: Monorepo Scaffold

**Day 1-2: Workspace Setup**
```bash
# Initialize workspace
mkdir -p packages/tsl-kit LABS/web
pnpm init
echo "packages:\n  - 'packages/*'\n  - 'LABS/*'" > pnpm-workspace.yaml
```

- [ ] Initialize pnpm workspace
- [ ] Create root `package.json` with workspace config
- [ ] Setup `.gitignore`, `.editorconfig`, `tsconfig.base.json`
- [ ] Configure Biome (linter + formatter)

**Day 3-4: Engine Package**
```bash
cd packages/tsl-kit
pnpm init
pnpm add three@latest
pnpm add -D typescript @types/node rollup
```

- [ ] Create `packages/tsl-kit/package.json`
- [ ] Setup `tsconfig.json`
- [ ] Create folder structure:
  ```
  /engine
    /core
    /rendering
    /modules
    /io
    /debug
    /ui
    /api
  /ported  # Direct ports from RESOURCES
  ```
- [ ] Setup Rollup for ESM/CJS builds

**Day 5: LABS Website**
```bash
cd LABS/web
pnpx create-next-app@latest . --typescript --tailwind --app
pnpm add contentlayer next-contentlayer @react-three/fiber @react-three/drei three zustand gsap tweakpane
```

- [ ] Create Next.js 14 app with App Router
- [ ] Install dependencies (R3F, Drei, Contentlayer, GSAP, Tweakpane)
- [ ] Setup Tailwind + shadcn/ui
- [ ] Configure Contentlayer

#### Week 2: Core Engine + Renderer

**Day 1-2: Core Types**

- [ ] Create `engine/core/types.ts`
  ```ts
  export type EngineModuleKind = 'material' | 'postfx' | 'field' | 'sim' | 'math'
  export interface EngineParamSchema { ... }
  export interface EngineModuleMeta { ... }
  export interface EngineContext { ... }
  export interface EngineModule<TConfig, THandle> { ... }
  ```

**Day 3: Registry System**

- [ ] Create `engine/core/registry.ts`
  - `ModuleRegistry` class
  - `register()`, `getById()`, `getByKind()`, `getMeta()`

- [ ] Create `engine/core/context.ts`
  - `TSLEngine` class
  - `createEngineContext()` factory

**Day 4-5: WebGPU Renderer + Persistent Canvas**

- [ ] Create `LABS/web/components/ThreeRoot.tsx`
- [ ] Implement renderer factory (WebGPU → WebGL fallback)
  ```tsx
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
- [ ] Create persistent canvas layout in `app/layout.tsx`
- [ ] Create dynamic scene resolver (`lib/scenes.ts`)
- [ ] Test basic scene render + route switching

### Acceptance Criteria

- [ ] Monorepo structure created
- [ ] Engine package compiles without errors
- [ ] LABS website runs (`pnpm dev`)
- [ ] Canvas renders on `/`
- [ ] Routes switch without canvas re-creation
- [ ] WebGPU works in Chrome/Edge; WebGL fallback in Firefox

---

## Phase 2: Admin Dashboard (Week 2-3)

### Objective
Schema-driven control system (Zod → Tweakpane → Engine)

### Deliverables
- ✅ Zod schemas (Creative + Dev)
- ✅ JSON Schema → Tweakpane bridge
- ✅ Admin dashboard page (`/admin`)
- ✅ Preset save/load (localStorage)
- ✅ Live controls for test scene

### Tasks

#### Week 2 (cont.): Schema Definition

**Day 1-2: Zod Schemas**

- [ ] Create `lib/admin/schemas.ts`
  ```ts
  import { z } from 'zod'

  export const CreativeSchema = z.object({
    material: z.object({
      baseColor: z.string().default('#34d399'),
      metalness: z.number().min(0).max(1).default(0.2),
      roughness: z.number().min(0).max(1).default(0.35),
      emissivePulse: z.boolean().default(true),
    }),
    postfx: z.object({
      bloom: z.boolean().default(true),
      bloomStrength: z.number().min(0).max(2).default(0.65),
    }),
  })

  export const DevSchema = z.object({
    renderer: z.enum(['auto', 'webgpu', 'webgl']).default('auto'),
    maxFPS: z.number().int().min(30).max(144).default(60),
    debugNormals: z.boolean().default(false),
  })
  ```

**Day 3: Tweakpane Bridge**

- [ ] Create `lib/admin/schema-pane.ts`
- [ ] Implement `zodToJsonSchema()` converter
- [ ] Create `createSchemaPane(schema, state)` function
- [ ] Auto-generate Tweakpane controls from JSON schema

#### Week 3: Admin Dashboard

**Day 1-2: Zustand Store**

- [ ] Create `lib/store.ts`
  ```ts
  import { create } from 'zustand'

  export const useStore = create<{ 
    params: any
    set: (path: string, value: any) => void 
  }>((set, get) => ({
    params: {
      material: { baseColor: '#34d399', metalness: 0.2, roughness: 0.35, emissivePulse: true },
      postfx: { bloom: true, bloomStrength: 0.65 },
      renderer: 'auto',
      debugNormals: false,
      maxFPS: 60,
    },
    set: (path, value) => {
      const p = structuredClone(get().params)
      const keys = path.split('.')
      let obj: any = p
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]] ?? (obj[keys[i]] = {})
      }
      obj[keys.at(-1)!] = value
      set({ params: p })
    },
  }))
  ```

**Day 3: Admin Page**

- [ ] Create `app/admin/page.tsx`
- [ ] Mount Tweakpane with schema bindings
- [ ] Wire to Zustand store
- [ ] Add preset save/load buttons

**Day 4-5: Integration Testing**

- [ ] Test Creative schema controls
- [ ] Test Dev schema controls
- [ ] Verify live updates in scene
- [ ] Test preset save/load (localStorage)

### Acceptance Criteria

- [ ] Tweakpane auto-generates from schema
- [ ] Changes update live scene in real-time
- [ ] Presets save/load correctly
- [ ] Admin dashboard accessible at `/admin`

---

## Phase 3: MDX CMS (Week 3-4)

### Objective
Content pipeline with 3D/GSAP templates

### Deliverables
- ✅ Contentlayer configured for MDX
- ✅ Template registry system
- ✅ 1 reference template (`HeroGlassWave`)
- ✅ 3 example posts with different templates
- ✅ GSAP timeline support

### Tasks

#### Week 3 (cont.): Contentlayer Setup

**Day 1-2: Contentlayer Config**

- [ ] Create `contentlayer.config.ts`
  ```ts
  import { defineDocumentType, makeSource } from 'contentlayer/source-files'

  export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `posts/**/*.mdx`,
    contentType: 'mdx',
    fields: {
      title: { type: 'string', required: true },
      templateId: { type: 'string', required: true },
      styleId: { type: 'string', required: false },
      sceneProps: { type: 'json', required: false },
    },
  }))

  export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Post],
  })
  ```

- [ ] Create `content/posts/` directory
- [ ] Test Contentlayer build

#### Week 4: Templates + Posts

**Day 1-2: Template Registry**

- [ ] Create `templates/registry.json`
  ```json
  {
    "HeroGlassWave": {
      "component": "./HeroGlassWave.tsx",
      "schemaKeys": ["camera", "lights", "fx", "shader"],
      "thumbnail": "/og/hero-glass-wave.png"
    }
  }
  ```

- [ ] Create `templates/HeroGlassWave.tsx`
  - R3F/TSL scene
  - GSAP intro timeline
  - Accept `sceneProps` from frontmatter

**Day 3: Post Page Loader**

- [ ] Create `app/blog/[slug]/page.tsx`
- [ ] Implement template resolver
  ```ts
  const template = await import(`@/templates/${post.templateId}`)
  ```
- [ ] Mount template with `sceneProps`
- [ ] Render MDX overlay

**Day 4-5: Seed Content**

- [ ] Create `content/posts/hello-webgpu.mdx`
  ```mdx
  ---
  title: "Exploring WebGPU Particles"
  templateId: "HeroGlassWave"
  styleId: "neon"
  sceneProps:
    camera: { fov: 45, position: [0, 2, 5] }
    lights: { preset: "studio" }
    fx: { bloom: true, bloomStrength: 1.2 }
    shader:
      emissiveColor: "#00ffcc"
      pulseSpeed: 2.0
  ---

  # Exploring WebGPU Particles

  This post demonstrates advanced GPU particle systems...
  ```

- [ ] Create 2 more example posts
- [ ] Test all posts render correctly

### Acceptance Criteria

- [ ] `/blog/[slug]` renders MDX with correct template
- [ ] Template animates on mount (GSAP intro)
- [ ] Frontmatter `sceneProps` correctly applied
- [ ] 3 posts seeded and working

---

## Phase 4: Module Porting (Week 4-8)

### Objective
Port 150+ modules from RESOURCES repositories

### Priority Order
See [PORT_MAPPING.md](./PORT_MAPPING.md) and [RESOURCE_INVENTORY.md](./RESOURCE_INVENTORY.md) for complete details.

### Week 4-5: Materials + Noise (40 modules)

#### Materials (25 modules)

**From portfolio-main:**
- [ ] PBR materials: clearcoat, sheen, anisotropy, iridescence, transmission (5 modules)
- [ ] Specialized: fabric, skin (SSS), hair/fur, car-paint (4 modules)
- [ ] Procedural surfaces: noise-based patterns (6 modules)

**From tsl-textures-main:**
- [ ] Procedural textures: wood, marble, rust, cork, concrete (5 modules)
- [ ] Organic patterns: fur, spots, stripes, veins (5 modules)

#### Noise (15 modules)

**From fragments-boilerplate-main:**
- [ ] Perlin Noise 3D
- [ ] Simplex Noise 3D, 4D
- [ ] Curl Noise 3D, 4D
- [ ] FBM, Turbulence
- [ ] Common utilities (mod289, permute, fade)

**From tsl-textures-main:**
- [ ] Additional noise variants (7 modules)

**Acceptance:**
- Visual parity with source (ΔE < 2)
- Wrapped in `EngineModule` interface
- Registered in module registry
- 10 material presets created

### Week 5-6: Lighting + Post-FX (35 modules)

#### Lighting (15 modules)

**From portfolio-main:**
- [ ] Light types: directional, point, spot, area (rect/tube) (4 modules)
- [ ] Lighting utilities: diffuse, ambient, fresnel, hemisphere (4 modules)
- [ ] Environment: HDRI loading, prefiltering, procedural sky (3 modules)
- [ ] Shadows: PCF/PCSS/VSM, cascaded shadow maps, contact shadows (4 modules)

#### Post-FX (20 modules)

**From fragments-boilerplate-main:**
- [ ] Cinematic: bloom, vignette, grain, chromatic aberration (4 modules)
- [ ] Stylized: pixellation, LCD, canvas weave, speckled noise (4 modules)
- [ ] Core: tone mapping, color grading, exposure (3 modules)

**From portfolio-main:**
- [ ] Advanced: TAA, DOF (bokeh), motion blur (3 modules)

**From TSLwebgpuExamples:**
- [ ] Experimental: SSGI, SSR, GTAO (3 modules, feature-flagged)

**Acceptance:**
- All post-FX effects working
- 5 FX pipeline presets (Cinema, Neon, Comic, Retro, Clean)
- Lighting presets functional (studio, cinematic, outdoor)

### Week 6-7: Particles + Fields (35 modules)

#### Particles (20 modules)

**From portfolio-main:**
- [ ] GPGPU base, attractors, flow field, twist (4 modules)

**From TSLwebgpuExamples:**
- [ ] three.js-tsl-particles-system (basic)
- [ ] tsl-compute-particles
- [ ] tsl-particle-waves
- [ ] webgpu-tsl-linkedparticles
- [ ] webgputest-particlesSDF
- [ ] Emitters: point, sphere, box, cone, mesh surface (5 modules)
- [ ] Forces: gravity, wind, drag, vortex, noise, field-driven (6 modules)
- [ ] Render modes: sprites, velocity-aligned, mesh, trails (4 modules)

#### Fields (15 modules)

**From fragments-boilerplate-main:**
- [ ] SDF shapes: 10+ primitives (sphere, box, capsule, etc.)
- [ ] SDF operations: boolean ops, smooth blends, modifiers
- [ ] Raymarching pipeline

**From TSLwebgpuExamples:**
- [ ] raymarching-tsl-main (advanced patterns)

**From portfolio-main:**
- [ ] Flow fields, vector fields

**Acceptance:**
- Particle systems render 10k+ particles at 60 FPS
- Forces affect particles correctly
- SDF raymarching functional
- 10 particle presets created

### Week 7-8: Physics + Compute (20 modules)

#### Physics (10 modules)

**From TSLwebgpuExamples:**
- [ ] softbodies-master: cloth simulation (mass-spring)
- [ ] Splash-main: MLS-MPM fluid sim
- [ ] WaterBall-main: water sphere sim
- [ ] fluidglass-main: fluid + glass materials
- [ ] interactwave-main: interactive wave sim
- [ ] breeze-main: wind/breeze sim
- [ ] flow-master: flow simulation

**From portfolio-main:**
- [ ] Infinite water: water material + sim
- [ ] Boids/steering basics

#### Compute (10 modules)

**From portfolio-main:**
- [ ] Compute shader patterns (FBO particles, etc.)
- [ ] Ping-pong storage textures

**From TSLwebgpuExamples:**
- [ ] WGSL shader templates
- [ ] Compute helper utilities

**Acceptance:**
- Fluid simulations running at 60 FPS
- Soft body physics stable
- Compute shaders working on GPU
- WGSL escape hatch available

### Acceptance Criteria (Phase 4 Overall)

- [ ] 150+ modules ported and working
- [ ] Visual parity with source (ΔE < 2)
- [ ] All modules registered in registry
- [ ] 50+ material/FX/particle presets
- [ ] Comprehensive module documentation

---

## Phase 5: UX Copilot (Week 9)

### Objective
Public AI assistant with safe tools

### Deliverables
- ✅ Vercel AI SDK setup (OpenAI/Anthropic)
- ✅ UX tools: `navigate`, `setParam`, `loadScene`, `togglePostFX`, `searchSite`
- ✅ Chat widget UI (`AssistantClient.tsx`)
- ✅ Rate limiting + audit logging
- ✅ Optional: WebLLM fallback

### Tasks

**Day 1-2: AI SDK Setup**

- [ ] Install Vercel AI SDK
  ```bash
  pnpm add ai @ai-sdk/openai @ai-sdk/anthropic
  ```
- [ ] Create `app/api/ux-assistant/route.ts`
- [ ] Configure model routing (OpenAI/Anthropic)
- [ ] Add rate limiting middleware

**Day 3: UX Tools**

- [ ] Create `lib/agents/ux-tools.ts`
  ```ts
  export const uxTools = {
    navigate: tool({
      description: 'Navigate to a different page',
      parameters: z.object({ path: z.string() }),
      execute: async ({ path }) => {
        // Trigger route change via Zustand or similar
      },
    }),
    setParam: tool({
      description: 'Set an engine parameter',
      parameters: z.object({
        key: z.string(),
        value: z.any(),
      }),
      execute: async ({ key, value }) => {
        useStore.getState().set(key, value)
      },
    }),
    // ... more tools
  }
  ```

**Day 4: Chat Widget**

- [ ] Create `components/AssistantClient.tsx`
- [ ] Implement chat UI (messages, input, tool call display)
- [ ] Wire to `/api/ux-assistant`
- [ ] Add to `app/layout.tsx`

**Day 5: Testing + Polish**

- [ ] Test all UX tools
- [ ] Test rate limiting
- [ ] Add audit logging
- [ ] Optional: integrate WebLLM fallback

### Acceptance Criteria

- [ ] Chat widget visible on all pages
- [ ] Tools execute correctly (navigate, setParam, etc.)
- [ ] No file system or repo access
- [ ] Rate limits enforced
- [ ] Audit log records all tool calls

---

## Phase 6: Builder Agent (Week 10)

### Objective
Admin-only content creation with PR workflow

### Deliverables
- ✅ GitHub App auth setup
- ✅ Admin tools: `draftPost`, `applyTemplate`, `createAssets`, `confirmAndPR`
- ✅ Dry-run diff preview UI
- ✅ PR creation workflow
- ✅ Second confirmation for high-impact ops
- ✅ Audit logging

### Tasks

**Day 1-2: GitHub App Setup**

- [ ] Create GitHub App (settings, permissions)
- [ ] Generate private key
- [ ] Add to `.env.local`:
  ```bash
  GITHUB_APP_ID=
  GITHUB_APP_INSTALLATION_ID=
  GITHUB_APP_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
  ```
- [ ] Install `@octokit/app`
- [ ] Test GitHub API connection

**Day 3: Admin Tools**

- [ ] Create `lib/agents/admin-tools.ts`
  ```ts
  export const adminTools = {
    draftPost: tool({
      description: 'Draft a new MDX post',
      parameters: z.object({
        title: z.string(),
        brief: z.string(),
        tags: z.array(z.string()),
        templateId: z.string(),
        styleId: z.string().optional(),
      }),
      execute: async (args) => {
        // Generate MDX from args
        // Create diff (patch format)
        // Return { success, diff, preview }
      },
    }),
    confirmAndPR: tool({
      description: 'Confirm changes and create PR',
      parameters: z.object({
        diffs: z.array(z.any()),
        title: z.string(),
        description: z.string(),
      }),
      execute: async (args) => {
        // Create branch from main
        // Apply diffs
        // Commit
        // Open PR via GitHub API
        // Return { success, prUrl, branch }
      },
    }),
    // ... more tools
  }
  ```

**Day 4: Diff Preview UI**

- [ ] Create `components/AdminAgentPanel.tsx`
- [ ] Implement diff viewer (react-diff-view or similar)
- [ ] Add confirmation buttons
- [ ] Wire to admin tools

**Day 5: Integration + Testing**

- [ ] Test draftPost → diff preview → PR workflow
- [ ] Test second confirmation for high-impact ops
- [ ] Verify audit logging
- [ ] Test PR opening on GitHub

### Acceptance Criteria

- [ ] Admin can draft post via chat
- [ ] Diff preview shown before commit
- [ ] PR created successfully
- [ ] No direct writes to `main`
- [ ] Audit log records all actions
- [ ] Second confirmation required for deletes/moves

---

## Phase 7: RAG + Search (Week 11-12)

### Objective
Knowledge base + public search utilities

### Deliverables
- ✅ Embeddings (pgvector or Vectorize)
- ✅ RAG adapter (`lib/ai/rag.ts`)
- ✅ Scoped retrieval (by path prefix)
- ✅ Pagefind integration
- ✅ Giscus comments
- ✅ Cloudflare Analytics

### Tasks

#### Week 11: RAG Setup

**Day 1-2: Embedding Strategy**

- [ ] Choose provider: Supabase pgvector OR Cloudflare Vectorize
- [ ] Install dependencies
  ```bash
  # If Supabase:
  pnpm add @supabase/supabase-js
  # If Vectorize:
  pnpm add @cloudflare/ai
  ```
- [ ] Create embedding script (`scripts/embed-content.ts`)
  - Embed `/content` (posts, projects)
  - Embed `/lib/shaders` (TSL modules)
  - Embed `/scenes` (scene descriptions)
  - Embed `/packages/tsl-kit/engine/modules` (API docs)

**Day 3: RAG Adapter**

- [ ] Create `lib/ai/rag.ts`
  ```ts
  export interface RAGAdapter {
    embed(text: string): Promise<number[]>
    search(query: string, filters?: { path?: string }): Promise<Chunk[]>
  }

  export function createRAGAdapter(provider: 'supabase' | 'vectorize'): RAGAdapter {
    // ...
  }
  ```

**Day 4-5: Assistant Integration**

- [ ] Add RAG to UX Copilot
  - Retrieve context for user questions
  - Include citations in responses
- [ ] Test scoped retrieval (by path prefix)
- [ ] Test citation links

#### Week 12: Search + Analytics

**Day 1-2: Pagefind**

- [ ] Create `scripts/postbuild-pagefind.mts`
  ```ts
  import { execSync } from 'child_process'
  execSync('npx pagefind --site .next/static')
  ```
- [ ] Add to `package.json`:
  ```json
  {
    "scripts": {
      "postbuild": "node scripts/postbuild-pagefind.mts"
    }
  }
  ```
- [ ] Create search UI component
- [ ] Test search results

**Day 3: Giscus**

- [ ] Create Giscus app on GitHub
- [ ] Get repo ID, category ID
- [ ] Add to `.env.local`:
  ```bash
  NEXT_PUBLIC_GISCUS_REPO=
  NEXT_PUBLIC_GISCUS_REPO_ID=
  NEXT_PUBLIC_GISCUS_CATEGORY_ID=
  ```
- [ ] Create `components/Comments.tsx`
- [ ] Mount on post pages

**Day 4: Cloudflare Analytics**

- [ ] Create CF Analytics site
- [ ] Get beacon token
- [ ] Add to `.env.local`:
  ```bash
  NEXT_PUBLIC_CF_ANALYTICS_TOKEN=
  ```
- [ ] Create `lib/analytics.ts`
  ```ts
  export function injectAnalytics() {
    if (!process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN) return
    const script = document.createElement('script')
    script.defer = true
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
    script.setAttribute('data-cf-beacon', `{"token": "${process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN}"}`)
    document.body.appendChild(script)
  }
  ```
- [ ] Call in `app/layout.tsx`

**Day 5: Integration Testing**

- [ ] Test RAG responses with citations
- [ ] Test Pagefind search
- [ ] Test Giscus comments
- [ ] Test analytics tracking

### Acceptance Criteria

- [ ] Assistant answers cite sources (file paths + lines)
- [ ] Pagefind returns correct results
- [ ] Giscus comments load on posts
- [ ] Analytics tracking works
- [ ] RAG responses include correct context

---

## Phase 8: Polish + Launch (Week 13-14)

### Objective
Production-ready deployment

### Deliverables
- ✅ Full Playwright test suite
- ✅ Visual regression baseline
- ✅ Performance profiling + optimization
- ✅ Error boundaries + fallback UI
- ✅ SEO metadata
- ✅ CI/CD pipeline
- ✅ Deployed site

### Tasks

#### Week 13: Testing + Performance

**Day 1-2: Playwright Tests**

- [ ] Create `e2e/` directory
- [ ] Write acceptance tests (see [TESTING_STRATEGY.md](./TESTING_STRATEGY.md)):
  - A1: Canvas persists across routes
  - A2: Admin sliders update scene
  - A3: MDX posts render with templates
  - A4: Pagefind search works
  - A5: UX Copilot tools execute
  - A6: Builder Agent drafts + PRs
  - A7: No hard-coded secrets
- [ ] Run full test suite

**Day 3: Visual Regression**

- [ ] Create golden image baseline (50+ key scenes)
- [ ] Setup pixelmatch comparison (ΔE < 2)
- [ ] Run visual regression suite

**Day 4-5: Performance**

- [ ] Profile rendering (Chrome DevTools, WebGPU Profiler)
- [ ] Optimize heavy modules
- [ ] Test 1080p @ 60 FPS (RTX 2070-class)
- [ ] Verify post-FX budget ≤5ms GPU

#### Week 14: Deploy + Launch

**Day 1-2: SEO + Metadata**

- [ ] Add meta tags to `app/layout.tsx`
  ```tsx
  export const metadata = {
    title: 'TSL/WebGPU Engine',
    description: 'Self-contained, plug-and-play TSL/WebGPU engine...',
    openGraph: { ... },
  }
  ```
- [ ] Generate OG images for posts (optional)
- [ ] Create `sitemap.xml`
- [ ] Create `robots.txt`

**Day 3: CI/CD Setup**

- [ ] Create `.github/workflows/quality.yml`
  ```yaml
  - name: Typecheck
    run: pnpm typecheck
  - name: Lint
    run: pnpm lint
  - name: Test
    run: pnpm test
  ```
- [ ] Create `.github/workflows/build.yml`
- [ ] Create `.github/workflows/deploy.yml`
- [ ] Test all workflows

**Day 4: Deploy**

- [ ] Build production bundle
  ```bash
  pnpm build
  ```
- [ ] Deploy to Cloudflare Pages (or Vercel)
- [ ] Test deployed site
- [ ] Verify SSL, DNS, analytics

**Day 5: Launch**

- [ ] Final smoke tests
- [ ] Write launch announcement
- [ ] Update README with live links
- [ ] Announce 🎉

### Acceptance Criteria

- [ ] All tests passing (unit, integration, visual)
- [ ] 60 FPS on target hardware
- [ ] Zero console errors in production
- [ ] SEO metadata complete
- [ ] Deployed and accessible publicly
- [ ] CI/CD pipeline working

---

## 📊 Progress Tracking

### Module Count by Phase

| Phase | Target Modules | Current | % Complete |
|-------|----------------|---------|------------|
| Phase 1 | Core (5) | 0 | 0% |
| Phase 2 | - | - | - |
| Phase 3 | - | - | - |
| Phase 4 | 150+ | 0 | 0% |
| Phase 5 | - | - | - |
| Phase 6 | - | - | - |
| Phase 7 | - | - | - |
| Phase 8 | - | - | - |
| **TOTAL** | **150+** | **0** | **0%** |

### Task Count by Phase

| Phase | Tasks | Completed | % Complete |
|-------|-------|-----------|------------|
| Phase 1 | 20 | 0 | 0% |
| Phase 2 | 15 | 0 | 0% |
| Phase 3 | 15 | 0 | 0% |
| Phase 4 | 150+ | 0 | 0% |
| Phase 5 | 10 | 0 | 0% |
| Phase 6 | 12 | 0 | 0% |
| Phase 7 | 15 | 0 | 0% |
| Phase 8 | 20 | 0 | 0% |
| **TOTAL** | **257+** | **0** | **0%** |

---

## 🎯 Key Milestones

- [ ] **Week 2:** Canvas rendering + scene switching
- [ ] **Week 3:** Admin dashboard functional
- [ ] **Week 4:** First MDX post with template
- [ ] **Week 8:** 150+ modules ported
- [ ] **Week 9:** UX Copilot working
- [ ] **Week 10:** Builder Agent PR workflow
- [ ] **Week 12:** RAG + search functional
- [ ] **Week 14:** Production deployed

---

## 🚨 Risk Management

### Technical Risks

| Risk | Mitigation | Owner |
|------|------------|-------|
| Three.js r181 API changes | Pin version, test early | Dev |
| Performance issues | Profile each phase | Dev |
| Scope creep | Stick to roadmap, defer extras | PM |
| WGSL → TSL conversion | Direct port first, convert later | Dev |

### Timeline Risks

| Risk | Mitigation | Owner |
|------|------------|-------|
| Underestimated porting | Buffer time in Phase 4 | PM |
| Blocked by dependencies | Parallel tracks when possible | Dev |
| Feature complexity | MVP first, enhance later | PM |

---

**End of Implementation Roadmap v2.0**

See [QUICK_START.md](../implementation/QUICK_START.md) to begin Phase 1.

