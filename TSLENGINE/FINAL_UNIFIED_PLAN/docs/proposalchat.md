# TSL/WebGPU Engine + Website — Final Unified Proposal v2.0

> **Comprehensive Development Plan**  
> **Last Updated:** November 13, 2025  
> **Status:** Ready for Implementation  
> **Target:** Three.js r181+ • WebGPU-first • TSL • Engine-First Website

---

## 🎯 Executive Summary

Build a **self-contained, plug-and-play TSL/WebGPU/MaterialX engine** on Three.js r181+ that powers an **engine-first website** with:

- **150+ pre-built modules** (materials, post-FX, particles, fields, compute, noise, lighting, SDFs)
- **Direct-port strategy** from working examples (no reinvention)
- **Engine-first UX**: Persistent R3F/Three canvas across all pages
- **Schema-driven architecture**: Single source of truth for engine config, UI controls, and MDX docs
- **Dual AI assistants**: UX Copilot (public) + Builder Agent (admin-only, with PR workflow)
- **RAG-powered knowledge**: Embeddings for repo/docs with scoped retrieval
- **Production-ready**: WebGPU→WebGL fallback, testing, CI/CD, $0 hosting path

---

## 🏗️ Architecture Overview

### Monorepo Structure

```txt
/
├── packages/
│   └── tsl-kit/                      # ← Self-contained engine
│       ├── engine/
│       │   ├── core/                 # Context, registry, types
│       │   ├── rendering/            # WebGPU/WebGL renderer
│       │   ├── modules/
│       │   │   ├── materials/        # PBR, NPR, emissive, procedural
│       │   │   ├── lighting/         # Lights, shadows, GI, HDRI
│       │   │   ├── postfx/           # Bloom, DOF, TAA, SSR, GTAO
│       │   │   ├── particles/        # GPU particles, emitters, forces
│       │   │   ├── fields/           # Noise, SDFs, volumes, raymarching
│       │   │   ├── physics/          # Cloth, fluids, boids
│       │   │   ├── geometry/         # Primitives, modifiers, instancing
│       │   │   ├── animation/        # Timelines, curves, audio-reactive
│       │   │   └── math/             # Noise, color, patterns, utilities
│       │   ├── io/                   # Loaders, presets, MaterialX I/O
│       │   ├── debug/                # Profiling, visualizers, logging
│       │   ├── ui/                   # Tweakpane/schema bridge
│       │   └── api/                  # High-level agent-friendly API
│       └── ported/                   # Direct ports from RESOURCES
│           ├── portfolio-examples/
│           ├── tsl-webgpu-examples/
│           └── three-r181-examples/
│
├── LABS/
│   └── web/                          # Engine-first website + showcases
│       ├── app/
│       │   ├── layout.tsx            # Persistent canvas + overlay shell
│       │   ├── page.mdx              # Home as MDX overlay
│       │   ├── admin/                # Schema-driven dashboard
│       │   ├── labs/                 # Per-module showcases
│       │   │   ├── materials/
│       │   │   ├── lighting/
│       │   │   ├── postfx/
│       │   │   ├── particles/
│       │   │   └── [...]
│       │   └── api/
│       │       ├── ux-assistant/     # Safe tools (navigate, setParam)
│       │       └── builder/          # Admin tools (draft, diff, PR)
│       ├── components/
│       │   ├── ThreeRoot.tsx         # Canvas + renderer factory
│       │   ├── UiOverlay.tsx         # HUD/MDX shell
│       │   ├── AssistantClient.tsx   # UX Copilot chat widget
│       │   └── AdminAgentPanel.tsx   # Builder Agent UI
│       ├── scenes/                   # Route-based 3D scenes
│       ├── templates/                # 3D/GSAP templates for MDX posts
│       ├── lib/
│       │   ├── store.ts              # Zustand engine state
│       │   ├── ai/                   # Model router, RAG adapter
│       │   └── agents/               # UX + admin tool implementations
│       ├── content/                  # MDX posts/projects
│       └── public/                   # Assets, models, textures
│
└── RESOURCES/                        # Source material (read-only)
    ├── REPOSITORIES/
    │   ├── portfolio examples/
    │   └── TSLwebgpuExamples/
    └── THREEJS_TSL_knowladge_DOCS/
```

---

## 🎨 Engine Module Categories (Complete Taxonomy)

### 1. Core Engine & Runtime (`/engine/core`)
- **EngineContext**: Centralized lifecycle, registries, resource management
- **Time & Scheduling**: Global time, fixed-step clocks, adaptive quality
- **Scene & Layer System**: Logical layers (background, world, VFX, UI)
- **Resource Management**: GPU buffers, textures, samplers, pipeline cache

### 2. Rendering & Pipelines (`/engine/rendering`)
- **WebGPU Renderer**: Async init, swapchain management, G-buffers
- **Pipelines**: Forward+, deferred (optional), hybrid
- **TSL Integration**: Node material factory, BRDF library, graph cache
- **MaterialX Bridge**: MaterialX ↔ TSL translation

### 3. Materials & Shading (`/engine/modules/materials`)

#### Core PBR Library
- Standard/physical PBR (clearcoat, sheen, subsurface, transmission, thin-film)
- Specialized shaders: fabric, skin (SSS), hair/fur, car-paint, iridescence
- Layered materials with blend modes

#### Stylized / NPR
- Toon (ramps, outlines), matcap, halftone, ink, posterization

#### Procedural Surfaces
- Noise-based: marble, wood, stone, lava, clouds, terrain
- Edge wear, cavity dirt, grunge masks

#### Emissive / FX Materials
- Neon glass, holographic, glitch surfaces, Fresnel-driven glow

### 4. Lighting & Environment (`/engine/modules/lighting`)
- **Light Types**: Directional, point, spot, area (rect/tube), IES profiles
- **Environment**: HDRI loading, prefiltering, procedural sky, reflection probes
- **Shadows**: PCF/PCSS/VSM/ESM, cascaded shadow maps, contact shadows
- **GI Approximations**: SSAO/HBAO, SSGI, light probes

### 5. Post-Processing & FX (`/engine/modules/postfx`)

#### Core Chain
- Tone-mapping (ACES, filmic), exposure, color grading (LUT + parametric)

#### Cinematic FX
- Bloom (multi-scale), DOF (bokeh), motion blur, vignette, grain, chromatic aberration

#### Stylized FX
- Edge detect/outlines, posterization, halftone, pixelation

#### Distortion & Warps
- Heat haze, ripple, shockwave, glitch suite

#### FX Pipelines (Presets)
- `cinematicDefault`, `neonArcade`, `comicBook`, `retroCRT`

### 6. Particles & VFX (`/engine/modules/particles`)
- **Base Framework**: GPU buffers (pos/vel/age/life), emit/update/render modules
- **Emitters**: Point, sphere, box, cone, mesh surface, burst/continuous
- **Forces**: Gravity, wind, drag, vortex, noise/turbulence, field-driven
- **Render Modes**: Sprites, velocity-aligned, mesh particles, trails/ribbons
- **Presets**: Sparks, embers, rain, snow, magic trails, sci-fi FX

### 7. Fields, Volumes & SDF (`/engine/modules/fields`)
- **Scalar/Vector Fields**: 2D/3D density, velocity, temperature, pressure
- **Noise Fields**: Perlin, Simplex, Worley, FBM, curl noise
- **Volumes**: 3D textures, voxel grids, fog/clouds sampling
- **SDF**: Primitives (sphere, box, capsule, gyroid), boolean ops, smooth blends
- **Raymarching**: Generic raymarch node, lighting in SDF volumes

### 8. Physics & Simulation (`/engine/modules/physics`)
- **Basic Dynamics**: Rigid kinematics, collision approximations, constraints
- **Cloth & Softbody**: Mass-spring grids, jiggly accessories
- **Fluids**: 2D/3D templates (smoke, ink, water), pressure solver, advection
- **Crowd**: Boids (separation, alignment, cohesion), steering behaviors

### 9. Geometry & Mesh (`/engine/modules/geometry`)
- **Primitives**: Rounded box, capsule, superquadric, parametric shapes
- **Modifiers**: Bend, twist, taper, noise displacement
- **Deformation**: Skeletal skinning, morph targets, procedural breathing/pulsing
- **Instancing**: Per-instance attributes, GPU-driven transforms

### 10. Animation & Motion (`/engine/modules/animation`)
- **Time Nodes**: Global/local time, scaling, warping
- **Parametric Motion**: Oscillators, easing functions, noise-driven
- **Curves**: Scalar/vector animation tracks
- **Camera**: Spline-following, orbit/rail, look-at
- **Audio-Reactive**: Amplitude/band analysis, parameter mapping

### 11. Math & Utility Library (`/engine/modules/math`)
- **Core Math**: Vector/matrix ops, dot/cross, reflect/refract, smoothstep, remap
- **Coordinate Systems**: Polar, spherical, tangent transforms
- **Noise & Patterns**: Tileable noise, grids, stripes, spirals
- **Color**: RGB/HSV/HSL, gradients, blend modes
- **Algorithms**: Hash functions, Poisson sampling, curve shaping

### 12. I/O & Assets (`/engine/io`)
- **Geometry**: GLTF/GLB, Draco compression, lazy-load manager
- **Textures**: HDR/EXR/KTX2, mip/prefiltering, atlases
- **Presets**: JSON/YAML config loader, save/load system
- **MaterialX**: Load documents, map to TSL, optional export

### 13. Debug & Profiling (`/engine/debug`)
- **Visualizations**: G-buffer viewers, light volumes, shadow cascades
- **Profiling**: Frame timing, GPU queries, overdraw approximation
- **Logging**: Levels, tags, validation warnings
- **Introspection**: Registry listing, parameter metadata

### 14. UI & Control (`/engine/ui`)
- **Panels**: Tweakpane/dat.GUI adapters, unified parameter schema
- **Preset Manager**: Save/load at runtime for materials, FX, lighting, cameras
- **Layouts**: Dev (debug-heavy), Artist (visual), Director (mood/exposure only)

### 15. Agent API (`/engine/api`)
- **High-Level API**: `engine.createScenePreset()`, `engine.addPostFX()`, `engine.createMaterial()`
- **JSON Schemas**: Zod-validated descriptors for materials, FX, sims, fields
- **Lifecycle Hooks**: before/after frame, resize, capability changes

---

## 🌐 Website Architecture (Engine-First)

### Persistent Canvas Pattern

**Core Principle**: One R3F/Three canvas persists across all routes; only scenes/overlays swap.

#### Implementation

```tsx
// app/layout.tsx
<html>
  <body>
    <ThreeRoot />           {/* ← Persistent canvas */}
    <UiOverlay>             {/* ← HUD + MDX shell */}
      {children}
    </UiOverlay>
    <AssistantClient />     {/* ← UX Copilot widget */}
  </body>
</html>
```

#### Renderer Factory (WebGPU → WebGL Fallback)

```tsx
// components/ThreeRoot.tsx
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

// Usage in R3F
<Canvas 
  gl={(canvas) => makeRenderer(canvas)} 
  frameloop="demand" 
  shadows
>
  <Scene />
</Canvas>
```

### Schema-Driven Control Flow

**Single Source of Truth**: Zod schemas → Tweakpane controls + MDX docs + engine config

#### Schema Definition

```ts
// lib/admin/schemas.ts
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

#### Tweakpane Bridge

```ts
// lib/admin/schema-pane.ts
import { Pane } from 'tweakpane'
import { zodToJsonSchema } from 'zod-to-json-schema'

export function createSchemaPane(schema: z.ZodObject<any>, state: any) {
  const pane = new Pane()
  const jsonSchema = zodToJsonSchema(schema)
  
  // Auto-generate Tweakpane controls from JSON schema
  // ...bind to state, emit onChange events
  
  return pane
}
```

### Dynamic Scene Resolution

```ts
// lib/scenes.ts
import { usePathname } from 'next/navigation'

const sceneMap = {
  '/': () => import('@/scenes/home/Scene'),
  '/portfolio': () => import('@/scenes/portfolio/Scene'),
  '/labs/fluid': () => import('@/scenes/fluid/Scene'),
}

export function useCurrentScene() {
  const path = usePathname()
  const loader = sceneMap[path] ?? sceneMap['/']
  return loader()
}
```

### Content Pipeline (MDX + Templates)

#### Post Frontmatter

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

#### Template Registry

```json
// templates/registry.json
{
  "HeroGlassWave": {
    "component": "./HeroGlassWave.tsx",
    "schemaKeys": ["camera", "lights", "fx", "shader"],
    "thumbnail": "/og/hero-glass-wave.png"
  }
}
```

---

## 🤖 AI Assistants Architecture

### UX Copilot (Public, Safe Tools)

**Purpose**: Help visitors navigate, explore, and control the experience

**Tool Set**:
- `navigate(path: string)` — Route switching
- `setParam(key: string, value: any)` — Write to Zustand; drives live scene
- `loadScene(id: string)` — Explicit scene swap
- `togglePostFX(name: string)` — Quick FX toggle
- `searchSite(query: string)` — Pagefind or RAG-powered quick answers

**Safety**: No file writes, no repo access; only reads from public state/content

### Builder Agent (Admin-Only, PR Workflow)

**Purpose**: Content creation, template application, asset generation with guardrails

**Tool Set**:
- `draftPost({ title, brief, tags, templateId, styleId })` → returns diff
- `applyTemplate({ slug, sceneProps })` → returns diff
- `createAssets({ slug })` → renders OG images/thumbnails (optional)
- `confirmAndPR({ diffs, title, description })` → writes branch, opens PR

**Policies**:
- **No direct writes to `main`** — always PR workflow
- **High-impact ops** (delete, move, bulk edits) require second confirmation
- **Audit log**: user, timestamp, tool call args, result status

**Implementation Pattern**:
```ts
// lib/agents/admin-tools.ts
export async function draftPost(args: DraftPostArgs) {
  // 1. Generate MDX from args
  // 2. Slugify title
  // 3. Create diff (patch format)
  // 4. Return { success, diff, preview }
  // → User reviews diff in UI
}

export async function confirmAndPR(args: ConfirmArgs) {
  // 1. Create branch from main
  // 2. Apply diffs
  // 3. Commit with descriptive message
  // 4. Open PR via GitHub API (GitHub App auth)
  // 5. Return { success, prUrl, branch }
}
```

---

## 🔍 RAG & Knowledge Base

### Strategy

**Embed**:
- `/content` (posts, projects)
- `/lib/shaders` (TSL modules)
- `/scenes` (scene descriptions)
- `/packages/tsl-kit/engine/modules` (API docs)

**Store**:
- **Option A**: Supabase Postgres + pgvector
- **Option B**: Cloudflare Vectorize (free tier-friendly)
- **Adapter**: `lib/ai/rag.ts` abstracts provider

**Retrieval**:
- Scoped by path prefix (`/content`, `/lib`, etc.)
- Return top-k chunks with citations
- Assistant replies include source links

**Example Query Flow**:
```ts
// User asks: "How do I use curl noise for particles?"
// 1. Embed query
// 2. Retrieve from `/lib/shaders` and `/scenes/particles`
// 3. Concatenate context + question → LLM
// 4. Return answer + citations (file paths, line numbers)
```

---

## 📦 Direct-Port Strategy (No Reinvention)

### Core Philosophy

**Port working code verbatim** — do NOT rewrite or "improve"; only adapt paths, types, and TSL glue.

### Source Repositories (Priority Order)

1. **Portfolio Examples** (Maxime Heckel) ⭐⭐⭐⭐⭐
   - `RESOURCES/REPOSITORIES/portfolio examples/portfolio-main/`
   - **30+ WebGPU experiments** with modern TSL patterns
   - Materials: clearcoat, sheen, anisotropy, iridescence
   - Noise: Simplex, Curl, Voronoi, Classic
   - Lighting: diffuse, ambient, fresnel, hemisphere
   - Particles: GPGPU, morphing, flow fields, collisions
   - Post-FX: TAA, bloom, vignette, chromatic aberration

2. **Fragments Boilerplate** ⭐⭐⭐⭐⭐
   - `RESOURCES/REPOSITORIES/portfolio examples/fragments-boilerplate-main/`
   - Clean WebGPU bootstrap pattern (use as host shell)
   - Framegraph architecture for post-FX pipelines
   - Proven R3F + WebGPU async init

3. **TSL WebGPU Examples** ⭐⭐⭐⭐
   - `RESOURCES/REPOSITORIES/TSLwebgpuExamples/`
   - Multiple working projects:
     - `breeze-main` — Fluid simulation (2D)
     - `flow-master` — Flow fields + particles
     - `Floaty-main` — WASM + WebGPU fluid
     - `fluidglass-main` — Glass refraction + distortion
     - `raymarching-tsl-main` — SDF raymarching
     - `softbodies-master` — Softbody physics
     - `Splash-main` — Water simulation
     - `tsl-compute-particles` — Pure compute particles
     - `three.js-tsl-particles-system-master` — Particle system
     - `WaterBall-main` — Metaball fluids

4. **Three.js r181 Official Examples** ⭐⭐⭐⭐
   - `RESOURCES/three.js-r181/examples/`
   - Canonical WebGPU patterns
   - TSL node material examples
   - Compute shader templates
   - Post-processing passes

### Port Process (Per Module)

1. **Identify**: Find working module in source repos
2. **Copy**: Place verbatim in `packages/tsl-kit/ported/<source>/<module>`
3. **Adapt**: Create thin adapter in `packages/tsl-kit/engine/modules/<category>`
   - Update import paths
   - Add TypeScript types
   - Wrap in `EngineModule` interface
   - Add Zod schema for params
   - Export `create()`, `dispose()`, metadata
4. **Test**: Golden image test (visual parity, ΔE < 2)
5. **Document**: Add to module registry, update docs

### Example Port

**Source**: `portfolio-main/src/utils/webgpu/nodes/noise/simplexNoise3d.ts`

**Target**: `packages/tsl-kit/engine/modules/math/noise/simplex3d.ts`

```ts
// Adapter (thin wrapper)
import { simplexNoise3d as _simplexNoise3d } from '@tsl-kit/ported/portfolio/noise/simplexNoise3d'
import { EngineModule } from '@tsl-kit/engine/core/types'
import { z } from 'zod'

const Simplex3DSchema = z.object({
  scale: z.number().default(1.0),
  offset: z.tuple([z.number(), z.number(), z.number()]).default([0, 0, 0]),
})

export const Simplex3DNoise: EngineModule = {
  meta: {
    id: 'math.noise.simplex3d',
    kind: 'math',
    label: '3D Simplex Noise',
    description: 'Classic 3D Simplex noise function (ported from portfolio-main)',
    category: 'Noise',
    tags: ['noise', 'procedural', 'simplex'],
    params: zodToParams(Simplex3DSchema),
  },
  defaultConfig: Simplex3DSchema.parse({}),
  create: (ctx, config) => {
    const validated = Simplex3DSchema.parse(config)
    return _simplexNoise3d(validated) // ← Original function, untouched
  },
}
```

---

## 🧪 Testing & Quality

### Testing Strategy

#### Unit Tests (Vitest)
- Core utilities, math functions, schema validation
- Target: 80%+ coverage

#### Integration Tests (Playwright)
- **A1**: Canvas persists across route changes; no context loss
- **A2**: `/labs/fluid` scene responds to Admin slider changes
- **A3**: MDX post renders; template mounts and animates
- **A4**: Pagefind returns seeded post; search UI navigates
- **A5**: UX Copilot can `navigate('/portfolio')` and `setParam('postfx.bloom', false)`
- **A6**: Builder Agent drafts a post → diff visible → PR opened (stub URL OK)
- **A7**: ENV-only secrets; zero hard-coded keys; no console errors in prod build

#### Visual Regression (Golden Images)
- **Method**: Playwright screenshots + pixelmatch
- **Tolerance**: ΔE < 2 (perceptual color difference)
- **Coverage**: Every ported module with visual output

#### Performance Tests
- **1080p target**: ≥60 FPS on RTX 2070-class GPU
- **Post chain budget**: ≤5ms GPU time
- **Particle stress**: 512² stable at 60 FPS
- **Fluid 2D**: 512² stable (feature-gated)

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/quality.yml
- name: Quality
  jobs:
    - typecheck (tsc --noEmit)
    - lint (Biome)
    - unit tests (Vitest)

# .github/workflows/build.yml
- name: Build
  jobs:
    - install deps (pnpm)
    - build engine (tsc)
    - build website (next build)
    - postbuild: Pagefind index

# .github/workflows/test.yml
- name: Integration
  jobs:
    - Playwright tests (acceptance suite)
    - Visual regression (golden images)

# .github/workflows/deploy.yml (conditional)
- name: Deploy
  jobs:
    - Vercel (if main branch) OR
    - Cloudflare Pages (if main branch)
```

---

## 🚀 Deployment & Hosting

### $0 Path (Recommended)

**Stack**:
- **Host**: Cloudflare Pages (static or OpenNext adapter)
- **Domain**: Free `*.pages.dev` subdomain
- **Analytics**: Cloudflare Web Analytics (free beacon)
- **Assets**: Serve from `/public` (consider Git LFS for large files)

**Workflow**:
1. Push to `main` → GitHub Actions build
2. Output to `out/` (Next.js static export) or `.vercel/output` (OpenNext)
3. Deploy to Cloudflare Pages via GitHub integration
4. Optional: Custom domain via Cloudflare Registrar (at cost)

### Alternative: Vercel Hobby

**Stack**:
- **Host**: Vercel Hobby (native Next.js support)
- **Domain**: Free `*.vercel.app` or custom domain
- **Analytics**: Vercel Analytics (free tier)

**Workflow**:
1. Push to `main` → Vercel auto-builds and deploys
2. Preview deployments for PRs

### Secrets Management

**Required ENV vars** (`.env.local` template):

```bash
# AI Models
OPENAI_API_KEY=
ANTHROPIC_API_KEY=  # Optional

# Database (if using Supabase)
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# GitHub App (for Builder Agent PR workflow)
GITHUB_APP_ID=
GITHUB_APP_INSTALLATION_ID=
GITHUB_APP_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Auth (NextAuth/Clerk)
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Comments (Giscus)
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPO_ID=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=

# Analytics
NEXT_PUBLIC_CF_ANALYTICS_TOKEN=
```

---

## 📋 Implementation Roadmap (7 Phases)

### Phase 1: Foundation (Week 1-2)

**Objective**: Scaffold + working renderer shell

#### Tasks
- [x] Create monorepo structure (`packages/tsl-kit`, `LABS/web`)
- [ ] Install deps: Three.js r181, R3F, Drei, postprocessing, Zustand, Contentlayer, GSAP, Tweakpane
- [ ] Implement `ThreeRoot.tsx` with WebGPU→WebGL fallback
- [ ] Create dynamic scene resolver
- [ ] Set up persistent canvas layout
- [ ] Port 1 scene from `fragments-boilerplate` as proof-of-concept
- [ ] Verify async WebGPU init (no "backend not initialized" warnings)

**Acceptance**:
- Canvas renders on `/`
- Routes switch without canvas re-creation
- WebGPU works in Chrome/Edge; WebGL fallback in Firefox

---

### Phase 2: Admin Dashboard + Schemas (Week 2-3)

**Objective**: Schema-driven control system

#### Tasks
- [ ] Define Zod schemas (Creative + Dev)
- [ ] Build JSON Schema → Tweakpane bridge
- [ ] Create Admin dashboard page (`/admin`)
- [ ] Implement preset save/load (localStorage)
- [ ] Wire Zustand store to schema params
- [ ] Add live controls for test scene

**Acceptance**:
- Tweakpane auto-generates from schema
- Changes update live scene in real-time
- Presets save/load correctly

---

### Phase 3: MDX CMS + Templates (Week 3-4)

**Objective**: Content pipeline with 3D/GSAP templates

#### Tasks
- [ ] Configure Contentlayer for MDX posts
- [ ] Create template registry (`templates/registry.json`)
- [ ] Build 1 reference template (`HeroGlassWave`)
- [ ] Implement post page loader with template resolver
- [ ] Seed 3 example posts with different templates
- [ ] Add GSAP timeline support in templates

**Acceptance**:
- `/blog/[slug]` renders MDX with correct template
- Template animates on mount (GSAP intro)
- Frontmatter sceneProps correctly applied

---

### Phase 4: Engine Module Porting (Week 4-8)

**Objective**: Port 150+ modules from RESOURCES

#### Priority Order

**Week 4-5: Materials + Noise**
- [ ] Port PBR materials (clearcoat, sheen, anisotropy, iridescence, transmission)
- [ ] Port noise functions (Simplex, Curl, Voronoi, Classic, Worley, FBM)
- [ ] Port triplanar mapping, fresnel, normal blending
- [ ] Create 10 material presets (Skin, CarPaint, Cloth, Glass, etc.)

**Week 5-6: Lighting + Post-FX**
- [ ] Port lighting utilities (diffuse, ambient, hemisphere, directional)
- [ ] Port HDRI loading + prefiltering
- [ ] Port shadow systems (PCF, PCSS, cascades)
- [ ] Port post-FX chain (ACES, Bloom, DOF, TAA, Vignette, Grain, Chromatic Aberration)
- [ ] Create 5 FX pipeline presets (Cinema, Neon, Comic, Retro, Clean)

**Week 6-7: Particles + Fields**
- [ ] Port GPU particle system (GPGPU, ping-pong buffers)
- [ ] Port emitters (point, sphere, box, cone, mesh surface)
- [ ] Port forces (gravity, wind, drag, vortex, noise)
- [ ] Port flow fields + curl noise integration
- [ ] Port 10 particle presets (sparks, rain, snow, magic trails, etc.)

**Week 7-8: Physics + Compute**
- [ ] Port cloth simulation (mass-spring)
- [ ] Port 2D fluid sim (advection, pressure, vorticity)
- [ ] Port softbody/boids basics
- [ ] Port SDFs (primitives, boolean ops, raymarching)
- [ ] Add compute shader escape hatch (WGSL nodes)

**Acceptance per Module**:
- Visual parity with source (ΔE < 2)
- Wrapped in `EngineModule` interface
- Zod schema defined
- Registered in module registry
- Documented in module map

---

### Phase 5: UX Copilot (Week 9)

**Objective**: Public AI assistant with safe tools

#### Tasks
- [ ] Set up Vercel AI SDK (OpenAI/Anthropic ready)
- [ ] Implement UX tools: `navigate`, `setParam`, `loadScene`, `togglePostFX`, `searchSite`
- [ ] Create chat widget UI (`AssistantClient.tsx`)
- [ ] Wire tools to Zustand store
- [ ] Add rate limiting + tool call audit
- [ ] Optional: WebLLM fallback for offline mode

**Acceptance**:
- Chat widget visible on all pages
- Tools execute correctly
- No file system or repo access
- Rate limits enforced

---

### Phase 6: Builder Agent + PR Workflow (Week 10)

**Objective**: Admin-only content creation with guardrails

#### Tasks
- [ ] Set up GitHub App auth (GITHUB_APP_ID, PRIVATE_KEY)
- [ ] Implement admin tools: `draftPost`, `applyTemplate`, `createAssets`, `confirmAndPR`
- [ ] Create dry-run diff preview UI
- [ ] Wire PR creation (branch, commit, open PR via GitHub API)
- [ ] Add second confirmation for high-impact ops
- [ ] Implement audit log (user, timestamp, args, result)

**Acceptance**:
- Admin can draft post via chat
- Diff preview shown before commit
- PR created successfully
- No direct writes to `main`
- Audit log records all actions

---

### Phase 7: RAG, Search, Analytics (Week 11-12)

**Objective**: Knowledge base + public utilities

#### Tasks
- [ ] Embed content + code (pgvector or Vectorize)
- [ ] Implement RAG adapter (`lib/ai/rag.ts`)
- [ ] Add scoped retrieval (by path prefix)
- [ ] Integrate Pagefind (postbuild script)
- [ ] Set up Giscus comments on post pages
- [ ] Add Cloudflare Analytics beacon
- [ ] Optional: audio-reactive params for select scenes

**Acceptance**:
- Assistant answers cite sources (file paths + lines)
- Pagefind returns correct results
- Giscus comments load on posts
- Analytics tracking works
- RAG responses include correct context

---

### Phase 8: Polish + Launch (Week 13-14)

**Objective**: Production-ready deployment

#### Tasks
- [ ] Full Playwright test suite (all acceptance tests passing)
- [ ] Visual regression baseline for 50+ key scenes
- [ ] Performance profiling + optimization pass
- [ ] Device capability detection + quality presets
- [ ] Error boundaries + fallback UI
- [ ] SEO: meta tags, OG images, sitemap, robots.txt
- [ ] Deploy to Cloudflare Pages (or Vercel)
- [ ] Set up CI/CD (quality, build, test, deploy workflows)
- [ ] Write launch docs (README, getting started, API reference)

**Acceptance**:
- All tests passing (unit, integration, visual)
- 60 FPS on target hardware
- Zero console errors in production
- SEO metadata complete
- Deployed and accessible publicly

---

## 📊 Success Metrics

### Technical
- **150+ engine modules** ported and working
- **80%+ test coverage** (unit + integration)
- **60 FPS @ 1080p** on RTX 2070-class GPU
- **Post-FX budget** ≤5ms GPU time
- **Zero production errors** in console
- **WebGPU + WebGL fallback** both functional

### UX
- **Persistent canvas** across all routes
- **Sub-100ms route transitions** (no canvas re-init)
- **Schema-driven controls** auto-generate from single source
- **AI assistants** respond correctly to natural language

### Content
- **10+ example posts** with different templates
- **50+ material/FX presets** ready to use
- **Comprehensive docs** (API, module map, getting started)
- **RAG-powered search** with source citations

### Deployment
- **$0 hosting** path available (Cloudflare Pages)
- **CI/CD pipeline** (quality, build, test, deploy)
- **Secrets management** (no hard-coded keys)
- **PR workflow** for Builder Agent (no direct main writes)

---

## 🎯 Next Actions (Immediate)

1. **Create monorepo structure** (`packages/tsl-kit`, `LABS/web`)
2. **Port baseline** from `fragments-boilerplate` (renderer + scene shell)
3. **Define schemas** (Creative + Dev) and wire Tweakpane bridge
4. **Port first 10 modules** (materials + noise) from portfolio examples
5. **Set up CI** (quality.yml: typecheck + lint + test)

---

## 📚 References

### Documentation
- [Three.js r181 Docs](https://threejs.org/docs/)
- [Three.js Examples (WebGPU)](https://threejs.org/examples/)
- [TSL Wiki](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language)
- [R3F v9 Migration (WebGPU)](https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide)
- [WebGPU Fundamentals](https://webgpufundamentals.org/)

### Source Repositories
- `RESOURCES/REPOSITORIES/portfolio examples/` (⭐⭐⭐⭐⭐)
- `RESOURCES/REPOSITORIES/TSLwebgpuExamples/` (⭐⭐⭐⭐)
- `RESOURCES/THREEJS_TSL_knowladge_DOCS/` (Three.js r181 knowledge base)

### Community
- [Three.js Discourse](https://discourse.threejs.org/)
- [R3F Discord](https://discord.gg/poimandres)
- [WebGPU Matrix Chat](https://matrix.to/#/#WebGPU:matrix.org)

---

## 🔒 Security & Privacy

### Admin Routes
- Gated with NextAuth or Clerk
- Separate API keys per assistant (UX vs Builder)
- Rate limits on tool invocation (prevent abuse)

### Audit Logs
- Structured logging for all agent actions
- Format: `{ user, timestamp, tool, args, result, duration }`
- Stored in database (Supabase or similar)

### Content Policy
- Clear `robots.txt` (allow indexing, but specify AI usage rules)
- AI usage manifest (if applicable)
- Giscus moderation settings (require GitHub auth)

---

## 📖 Appendix

### A. Engine Module Checklist

See [Engine Vision](./docs/engine_vision.md) for complete module map (300+ items across 16 categories)

### B. Repository Layout

See [Engine Architecture](./docs/engine_artitechture.md) for detailed folder structure

### C. LAB Showcase Structure

See [LAB Showcase Implementation](./docs/LAB showcase implementation.md) for per-category lab examples

### D. Port Mapping

See [Port Mapping](TSLENGINE/UNIFIED_PROPOSAL/PORT_MAPPING.md) for source → target mapping of all 150+ modules

### E. Resource Inventory

See [Resource Inventory](TSLENGINE/UNIFIED_PROPOSAL/RESOURCE_INVENTORY.md) for complete catalog of available modules in RESOURCES/

---

**End of Unified Proposal v2.0**

*Next Step: Begin Phase 1 (Foundation) — scaffold monorepo and implement renderer shell*
