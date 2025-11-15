# TSL/WebGPU Engine — Implementation Roadmap

**Version:** 1.0  
**Date:** November 13, 2024  
**Duration:** 20 weeks (5 phases)  
**Total Effort:** ~280 hours

---

## 📅 Timeline Overview

```
Week 1-2:   Phase 0 - Setup & Foundation
Week 3-5:   Phase 1 - Core TSL Modules
Week 6-8:   Phase 2 - Post-FX & Materials
Week 9-11:  Phase 3 - Compute & Particles
Week 12-14: Phase 4 - Advanced Materials & Lighting
Week 15-17: Phase 5 - Physics & Sims
Week 18-20: Phase 6 - Integration, Docs, Polish
```

---

## Phase 0: Setup & Foundation (Weeks 1-2)

### Goal
Project scaffolding, monorepo setup, core engine skeleton

### Deliverables
- ✅ Monorepo structure with pnpm workspaces
- ✅ `/packages/tsl-kit` package with TypeScript + Rollup
- ✅ `/LABS/web` Next.js site with Contentlayer
- ✅ Core engine types and registry system
- ✅ R3F WebGPU renderer setup in LABS

### Tasks

#### Week 1: Project Scaffolding

**Day 1-2: Monorepo Setup**
```bash
# Initialize workspace
mkdir -p packages/tsl-kit LABS/web
pnpm init
# Create workspace config
echo "packages:\n  - 'packages/*'\n  - 'LABS/*'" > pnpm-workspace.yaml
```

- [ ] Initialize pnpm workspace
- [ ] Create root `package.json` with workspace config
- [ ] Setup `.gitignore`, `.editorconfig`
- [ ] Configure TypeScript (`tsconfig.base.json`)

**Day 3-4: Engine Package**

```bash
cd packages/tsl-kit
pnpm init
pnpm add -D typescript @types/node rollup @rollup/plugin-typescript
pnpm add three
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
  ```
- [ ] Setup Rollup for ESM/CJS builds

**Day 5: LABS Website**

```bash
cd LABS/web
pnpx create-next-app@latest . --typescript --tailwind --app
pnpm add contentlayer next-contentlayer @react-three/fiber @react-three/drei three zustand
```

- [ ] Create Next.js 14 app with App Router
- [ ] Install dependencies (R3F, Drei, Contentlayer)
- [ ] Setup Tailwind + shadcn/ui
- [ ] Configure Contentlayer

#### Week 2: Core Engine Skeleton

**Day 1-2: Core Types**

- [ ] Create `engine/core/types.ts`
  ```ts
  export type EngineModuleKind = 'material' | 'postfx' | 'field' | 'sim' | 'math'
  export interface EngineParamSchema { ... }
  export interface EngineModuleMeta { ... }
  export interface EngineContext { ... }
  export interface EngineModule<TConfig, THandle> { ... }
  ```

**Day 3-4: Registry System**

- [ ] Create `engine/core/registry.ts`
  - `ModuleRegistry` class
  - `register()`, `getById()`, `getByKind()`, `getMeta()`
  
- [ ] Create `engine/core/context.ts`
  - `TSLEngine` class
  - `createEngineContext()` factory

**Day 5: R3F WebGPU Renderer**

- [ ] Create `LABS/web/components/EngineCanvas.tsx`
- [ ] Setup WebGPU renderer with WebGL fallback
- [ ] Test basic scene render

---

## Phase 1: Core TSL Modules (Weeks 3-5)

### Goal
Port noise, SDF, and math utilities from `fragments-boilerplate`

### Modules to Port
- 8 noise modules
- 2 SDF modules
- 3 math utility modules

### Deliverables
- ✅ 13 core modules in engine
- ✅ 3-5 LABS showcases
- ✅ Module registry system working
- ✅ First schema-driven UI

### Week 3: Noise Modules

**Day 1: Common utilities**
- [ ] Port `common.ts` (mod289, permute, fade, taylorInvSqrt)
- [ ] Create `engine/modules/math/noise/common.ts`
- [ ] Test imports

**Day 2: Perlin & Simplex**
- [ ] Port `perlin_noise_3d.ts`
- [ ] Port `simplex_noise_3d.ts`
- [ ] Port `simplex_noise_4d.ts`
- [ ] Wrap in `EngineModule` interface

**Day 3: Curl Noise**
- [ ] Port `curl_noise_3d.ts`
- [ ] Port `curl_noise_4d.ts`
- [ ] Test curl noise output

**Day 4: FBM & Turbulence**
- [ ] Port `fbm.ts`
- [ ] Port `turbulence.ts`
- [ ] Create `engine/modules/math/noise/index.ts`

**Day 5: LABS - Noise Gallery**
- [ ] Create `/labs/math/noise-gallery` schema
- [ ] Create MDX content
- [ ] Setup Tweakpane controls
- [ ] Test all noise functions

### Week 4: SDF & Math Utilities

**Day 1-2: SDF Shapes**
- [ ] Port `sdf/shapes.ts` (all 10+ shapes)
- [ ] Wrap in `EngineModule`
- [ ] Create param schemas

**Day 2-3: SDF Operations**
- [ ] Port `sdf/operations.ts`
- [ ] Test boolean ops

**Day 4: Math Utilities**
- [ ] Port `complex.ts`
- [ ] Port `coordinates.ts`
- [ ] Port `screen_aspect_uv.ts`

**Day 5: LABS - SDF Shapes**
- [ ] Create `/labs/fields/sdf-shapes` showcase
- [ ] Interactive selector for all shapes
- [ ] MDX documentation

### Week 5: Integration & Testing

**Day 1-2: Module Registration**
- [ ] Register all noise modules
- [ ] Register all SDF modules
- [ ] Register math utilities
- [ ] Test `engine.listModules()`

**Day 3: Color Utilities (early from Phase 2)**
- [ ] Port `cosine_palette.ts`
- [ ] Create `/labs/math/color-palettes` showcase

**Day 4-5: Polish & Documentation**
- [ ] Write JSDoc for all modules
- [ ] Test TypeScript compilation
- [ ] Build engine package
- [ ] Write Phase 1 summary doc

### Acceptance Criteria

- [ ] All 13 modules compile without errors
- [ ] All modules registered and discoverable
- [ ] 3-5 LABS pages working
- [ ] Tweakpane controls functional
- [ ] MDX content complete

---

## Phase 2: Post-FX & Materials (Weeks 6-8)

### Goal
Port post-processing effects, basic materials, core infrastructure

### Modules to Port
- 6 post-FX effects
- 2 color utilities
- BaseExperience class
- Pointer handler

### Deliverables
- ✅ 10+ post-FX modules
- ✅ 2 PBR materials
- ✅ BaseExperience foundation
- ✅ 5-7 LABS showcases

### Week 6: Post-Processing Effects

**Day 1: Cinematic FX**
- [ ] Port `vignette_effect.ts`
- [ ] Port `grain_texture_effect.ts`
- [ ] Port `bloom.ts`

**Day 2: Stylized FX**
- [ ] Port `pixellation_effect.ts`
- [ ] Port `canvas_weave_effect.ts`
- [ ] Port `lcd_effect.ts`

**Day 3: Additional FX**
- [ ] Port `speckled_noise_effect.ts`
- [ ] Port `tonemapping.ts`
- [ ] Create `postfx/index.ts`

**Day 4-5: LABS - Post-FX Showcases**
- [ ] Create `/labs/postfx/cinematic-stack`
- [ ] Create `/labs/postfx/pixellation`
- [ ] Create `/labs/postfx/vignette-grain`

### Week 7: Core Infrastructure

**Day 1-2: BaseExperience**
- [ ] Port from portfolio-main
- [ ] Remove app-specific code
- [ ] Adapt for engine package
- [ ] Create `/engine/core/BaseExperience.ts`

**Day 3: Pointer Handler**
- [ ] Port `Pointer.ts`
- [ ] Test pointer events

**Day 4-5: PBR Materials**
- [ ] Create `materials/pbr/basicPBR.ts`
- [ ] Create `materials/pbr/advancedPBR.ts` (clearcoat, transmission)
- [ ] Test with HDRI

### Week 8: Material LABS & Polish

**Day 1-2: Material Showcases**
- [ ] Create `/labs/materials/pbr-basic`
- [ ] Create `/labs/materials/pbr-advanced`

**Day 3: Post-FX Pipeline**
- [ ] Create `postfx/pipelines/cinematicDefault.ts`
- [ ] Combine bloom + vignette + grain + tone mapping
- [ ] Test pipeline

**Day 4-5: Integration Testing**
- [ ] Test all post-FX in pipeline
- [ ] Test materials with lighting
- [ ] Polish LABS UI

### Acceptance Criteria

- [ ] All post-FX effects working
- [ ] PBR materials render correctly
- [ ] BaseExperience can bootstrap scenes
- [ ] 5-7 LABS showcases complete

---

## Phase 3: Compute & Particles (Weeks 9-11)

### Goal
Port particle systems, compute shaders, flow fields

### Modules to Port
- 4 compute patterns (from portfolio-main)
- 2 particle systems (from TSLwebgpuExamples)

### Deliverables
- ✅ Particle system base
- ✅ 4 compute modules
- ✅ 4-6 LABS showcases

### Week 9: Compute Patterns

**Day 1-2: Attractor Collisions**
- [ ] Port from portfolio-main
- [ ] Extract compute shader logic
- [ ] Create `sims/particles/attractors.ts`

**Day 3: Flow Field**
- [ ] Port flow field demo
- [ ] Extract flow field compute
- [ ] Create `sims/particles/flowField.ts`

**Day 4: Particles Twist**
- [ ] Port particles twist
- [ ] Create `sims/particles/twist.ts`

**Day 5: GPGPU Base**
- [ ] Port FBO particles hook
- [ ] Convert from React to class
- [ ] Create `sims/particles/gpgpu.ts`

### Week 10: Particle Systems

**Day 1-2: Basic Particle System**
- [ ] Port three.js-tsl-particles-system
- [ ] Convert to TypeScript
- [ ] Create `particles/systems/basic.ts`

**Day 3-4: Compute Particles**
- [ ] Port tsl-compute-particles
- [ ] Create `particles/systems/compute.ts`

**Day 5: Particle Emitters**
- [ ] Create `particles/emitters/pointEmitter.ts`
- [ ] Create `particles/emitters/sphereEmitter.ts`

### Week 11: Forces & LABS

**Day 1-2: Particle Forces**
- [ ] Create `particles/forces/gravity.ts`
- [ ] Create `particles/forces/wind.ts`
- [ ] Create `particles/forces/vortex.ts`

**Day 3-5: LABS Showcases**
- [ ] Create `/labs/particles/sparks`
- [ ] Create `/labs/particles/flow-field`
- [ ] Create `/labs/particles/attractors`
- [ ] Create `/labs/physics/boids`

### Acceptance Criteria

- [ ] Compute shaders running on GPU
- [ ] Particle systems rendering 10k+ particles
- [ ] Forces affecting particles correctly
- [ ] 4-6 LABS showcases complete

---

## Phase 4: Advanced Materials & Lighting (Weeks 12-14)

### Goal
Full material library, lighting presets, procedural textures

### Modules to Port
- tsl-utils foundation
- 4 procedural materials
- 3 pattern modules
- 4 lighting modules
- NPR materials

### Deliverables
- ✅ 15 material/lighting modules
- ✅ Procedural texture library started
- ✅ 5-7 LABS showcases

### Week 12: tsl-textures Foundation

**Day 1-2: tsl-utils**
- [ ] Port `tsl-utils.js`
- [ ] Convert to TypeScript
- [ ] Test all utilities (noised, vnoise, hsl, etc.)

**Day 3-5: Procedural Materials**
- [ ] Port `wood.js` → `wood.ts`
- [ ] Port `marble.js` → `marble.ts`
- [ ] Port `rust.js` → `rust.ts`
- [ ] Port `clouds.js` → `clouds.ts`

### Week 13: Patterns & Lighting

**Day 1-2: Pattern Modules**
- [ ] Port `voronoi-cells.js`
- [ ] Port `grid.js`
- [ ] Port `circles.js`

**Day 3-5: Lighting System**
- [ ] Create `lighting/lights/directional.ts`
- [ ] Create `lighting/lights/point.ts`
- [ ] Create `lighting/lights/spot.ts`
- [ ] Create `lighting/environment/hdri.ts`
- [ ] Create lighting presets (studio, cinematic, outdoor)

### Week 14: NPR Materials & LABS

**Day 1-2: NPR Materials**
- [ ] Create `materials/npr/toon.ts`
- [ ] Create `materials/npr/matcap.ts`

**Day 3-5: LABS Showcases**
- [ ] Create `/labs/materials/npr-toon`
- [ ] Create `/labs/materials/procedural-wood`
- [ ] Create `/labs/lighting/studio-lighting`
- [ ] Create `/labs/lighting/hdr-sky`
- [ ] Create `/labs/math/patterns-gallery`

### Acceptance Criteria

- [ ] Procedural materials render correctly
- [ ] Lighting presets functional
- [ ] NPR materials working
- [ ] 5-7 LABS showcases complete

---

## Phase 5: Physics & Sims (Weeks 15-17)

### Goal
Fluid simulations, soft bodies, advanced physics

### Modules to Port
- 3 fluid simulations
- 2 physics modules

### Deliverables
- ✅ Fluid sim modules
- ✅ Soft body physics
- ✅ 4-5 LABS showcases

### Week 15: Fluid Simulations

**Day 1-2: MLS-MPM Fluid**
- [ ] Port Splash-main WGSL shaders
- [ ] Convert to TSL compute nodes
- [ ] Create `physics/fluids/mlsMpm.ts`

**Day 3-4: Water Simulation**
- [ ] Port infinite-water demo
- [ ] Extract water sim logic
- [ ] Create `physics/fluids/water.ts`

**Day 5: Fluid Glass Material**
- [ ] Port fluidglass-main
- [ ] Extract material logic
- [ ] Create `materials/glass/fluid.ts`

### Week 16: Soft Body & Wind

**Day 1-3: Soft Body Physics**
- [ ] Port softbodies-master
- [ ] Extract physics logic
- [ ] Create `physics/softbody/basic.ts`
- [ ] Test mass-spring system

**Day 4-5: Wind Simulation**
- [ ] Port breeze-main
- [ ] Create `physics/wind/breeze.ts`

### Week 17: LABS & Integration

**Day 1-3: LABS Showcases**
- [ ] Create `/labs/physics/fluids-2d`
- [ ] Create `/labs/physics/water-sim`
- [ ] Create `/labs/physics/softbody`
- [ ] Create `/labs/physics/wind`

**Day 4-5: Integration Testing**
- [ ] Test fluid sims with particles
- [ ] Test soft bodies with forces
- [ ] Performance profiling

### Acceptance Criteria

- [ ] Fluid simulations running at 60fps
- [ ] Soft body physics stable
- [ ] Wind affecting particles
- [ ] 4-5 LABS showcases complete

---

## Phase 6: Integration, Docs, Polish (Weeks 18-20)

### Goal
Finalize engine API, complete LABS, documentation, deploy

### Deliverables
- ✅ High-level engine API
- ✅ 30+ LABS complete
- ✅ Full documentation
- ✅ Deployed site

### Week 18: High-Level API & Extras

**Day 1-2: Engine API**
- [ ] Create `engine/api/engineAPI.ts`
- [ ] Implement helper methods:
  ```ts
  engine.createPBRScene()
  engine.addFluidSimLayer()
  engine.attachPostFXPipeline("cinematic")
  ```

**Day 3-5: Extra Modules**
- [ ] Port three-pinata utilities (select modules)
- [ ] Port additional tsl-textures (planet, gasGiant, stars, etc.)
- [ ] Port advanced post-FX (SSGI, SSR)

### Week 19: Documentation & LABS Completion

**Day 1-2: Engine Documentation**
- [ ] Write comprehensive README for `/packages/tsl-kit`
- [ ] Write getting started guide
- [ ] Write porting guide (how to add modules)
- [ ] Document all public APIs (JSDoc)

**Day 3-5: Complete LABS**
- [ ] Fill in missing LABS to reach 30+
- [ ] Polish all existing showcases
- [ ] Create home page navigation
- [ ] Setup Pagefind search

### Week 20: Polish & Deploy

**Day 1-2: LABS Polish**
- [ ] Add preset save/load system
- [ ] Add schema-driven admin panel
- [ ] Add UX Copilot (if time permits)
- [ ] Mobile responsive checks

**Day 3-4: Performance & Testing**
- [ ] Performance profiling
- [ ] Optimize heavy modules
- [ ] Run Playwright tests
- [ ] Fix any remaining bugs

**Day 5: Deploy**
- [ ] Build production bundles
- [ ] Deploy to Cloudflare Pages or Vercel
- [ ] Test deployed site
- [ ] Announce release 🎉

### Acceptance Criteria

- [ ] 50+ modules in engine
- [ ] 30+ LABS showcases
- [ ] Complete documentation
- [ ] Site deployed and live
- [ ] All tests passing

---

## 📊 Progress Tracking

### Module Count by Phase

| Phase | Target Modules | Current | % Complete |
|-------|----------------|---------|------------|
| Phase 0 | Core (3) | 0 | 0% |
| Phase 1 | 13 | 0 | 0% |
| Phase 2 | 11 | 0 | 0% |
| Phase 3 | 6 | 0 | 0% |
| Phase 4 | 15 | 0 | 0% |
| Phase 5 | 5 | 0 | 0% |
| Phase 6 | 18 | 0 | 0% |
| **TOTAL** | **68+** | **0** | **0%** |

### LABS Count by Phase

| Phase | Target LABS | Current | % Complete |
|-------|-------------|---------|------------|
| Phase 1 | 3-5 | 0 | 0% |
| Phase 2 | 5-7 | 0 | 0% |
| Phase 3 | 4-6 | 0 | 0% |
| Phase 4 | 5-7 | 0 | 0% |
| Phase 5 | 4-5 | 0 | 0% |
| Phase 6 | Remaining | 0 | 0% |
| **TOTAL** | **30+** | **0** | **0%** |

---

## 🎯 Key Milestones

- [ ] **Week 2:** Engine skeleton compiling
- [ ] **Week 5:** First 13 modules ported
- [ ] **Week 8:** Post-FX pipeline working
- [ ] **Week 11:** Particle systems functional
- [ ] **Week 14:** Material library substantial
- [ ] **Week 17:** Physics sims complete
- [ ] **Week 20:** Full system deployed

---

## 🚨 Risk Management

### Technical Risks

| Risk | Mitigation | Owner |
|------|------------|-------|
| Three.js r181 API changes | Use transpiler, test early | Dev |
| Performance issues | Profiling each phase | Dev |
| Scope creep | Stick to roadmap, defer extras | PM |
| WGSL → TSL conversion | Start simple, iterate | Dev |

### Timeline Risks

| Risk | Mitigation | Owner |
|------|------------|-------|
| Underestimated porting | Buffer time per phase | PM |
| Blocked by dependencies | Parallel tracks when possible | Dev |
| Feature complexity | MVP first, enhance later | PM |

---

## 📝 Weekly Check-In Template

```markdown
## Week [X] Check-In

**Phase:** [0-6]  
**Dates:** [start] - [end]

### Completed
- [x] Task 1
- [x] Task 2

### In Progress
- [ ] Task 3

### Blocked
- Issue description

### Next Week
- Task 1
- Task 2

### Metrics
- Modules ported: X
- LABS created: Y
- Hours spent: Z
```

---

**End of Implementation Roadmap**

---

## Quick Commands

```bash
# Start development
cd packages/tsl-kit && pnpm dev

# Build engine
cd packages/tsl-kit && pnpm build

# Start LABS site
cd LABS/web && pnpm dev

# Run tests
pnpm test

# Check types
pnpm typecheck
```



