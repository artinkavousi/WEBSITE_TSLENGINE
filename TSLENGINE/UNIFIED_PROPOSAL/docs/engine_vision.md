# 🌌 TSL/WebGPU/MaterialX Engine — Vision & Scope

## 1. High-Level Vision

Build a **self-contained, plug-and-play WebGPU/TSL/MaterialX engine** on top of **Three.js r181+** that ships with a **rich library of pre-built modules, effects, components, and utilities**—covering **materials, lighting, post-FX, fields, physics, simulations, and math/algorithms**—to enable **rapid prototyping and production-grade deployment** of high-performance 3D web experiences.

The engine should be:

- **Out-of-the-box ready**  
  Drop it into any Three.js/WebGPU project and get advanced visuals immediately.

- **Modular & composable**  
  Each component works **independently**, but is designed to **snap together** into larger pipelines.

- **Extensible by design**  
  Easy to add **custom nodes, modules, effects, pipelines, sims** and any future feature without fighting the core.

- **Agent-friendly**  
  Clear APIs and conventions so AI/coding agents can reliably assemble, modify, and debug scenes and pipelines.

---

## 2. Core Goals

### 2.1 Self-Contained Engine

- No project-specific spaghetti.
- Single, documented **entry point** (e.g. `createEngineContext()` / `TSLEngine.init()`).
- Works in any Three.js r181+ WebGPU app with minimal bootstrapping and sane defaults.

### 2.2 Plug-and-Play Modules

- Everything is shipped as **TSL nodes, node graphs, and utilities**, not one-off hacks.
- Modules can be **mixed & matched**: materials, post-FX stacks, lighting setups, physics solvers, and fields.
- Good defaults and presets: “one-line setups” for common scenarios.

### 2.3 Production-Ready

- Stable, versioned APIs with change log.
- Sensible performance defaults:
  - Resolution scaling & quality presets
  - Fallbacks (WebGL / reduced quality where possible)
- Built-in debug hooks and profiling helpers.

### 2.4 Rapid Prototyping

- High-level helpers such as:
  - `createPBRScene()`
  - `addFluidSimLayer()`
  - `attachPostFXPipeline("cinematic")`
- Integrated param metadata so UIs (Tweakpane, custom dashboards) can be generated automatically.
- Example presets and demo scenes to show recommended wiring.

### 2.5 Extensibility

- Everything is based on **documented node + module patterns**.
- Adding a new module (material, effect, sim, field) means:
  - Implement a standard interface
  - Register it with the appropriate registry
- Clear separation between:
  - **Core engine** (pipeline, lifecycle, infra)
  - **Modules** (materials, post-FX, fields, sims, utilities)
  - **Integrations** (UI, agents, app-specific glue)

---

## 3. Module Categories & Namespaces

The engine exposes multiple **namespaces and registries** for different concerns.  
Each registry is introspectable and agent/UI-friendly.

### 3.1 Materials & Shading

**Goal:** Ready-to-use TSL node materials for the majority of real projects.

**Subcategories:**

- **PBR Material Library**
  - Metal/rough, clearcoat, sheen, transmission, thin-film
  - Car-paint, skin, fabric, hair, emissive/glow

- **Stylized / NPR**
  - Toon, cel, hatching, comic/ink outline
  - Matcap, gradient ramp, halftone

- **Procedural Surfaces**
  - Noise-based: Perlin, Simplex, Worley, FBM stacks
  - Marble, wood, stone, lava, clouds, brushed metals

- **MaterialX Bridge**
  - MaterialX → TSL graph translation / compatibility layer
  - Import/export utilities, graph reconstruction helpers

**Namespace example:**

- `engine.materials.*`
- `MaterialRegistry`

---

### 3.2 Lighting & Environment

**Goal:** Good lighting is always one preset away.

**Components:**

- **Lighting Presets**
  - Studio, cinematic, HDRI outdoor, night city, sci-fi interior
  - Auto key/fill/rim balances

- **Environment Pipelines**
  - HDRI loading, prefiltering, reflection probes
  - Sky models, atmosphere, time-of-day gradients

- **Shadow & GI Helpers**
  - Soft shadows, contact shadows, AO/SSAO/SSDO variants
  - Light probe helpers and baking utilities where feasible

**Namespace example:**

- `engine.lighting.*`
- `engine.environment.*`

---

### 3.3 Post-Processing & FX

**Goal:** A **stackable library** of post-FX pipelines.

**Core FX:**

- Bloom (multiple flavors)
- Tone mapping, color grading, LUTs
- DOF (bokeh), motion blur, vignette, grain
- Chromatic aberration, lens distortion

**Advanced / Stylized FX:**

- Glitch, datamosh, CRT, analog film
- Heat haze, refraction, god rays, volumetric fog
- Comic, watercolor, pixelation, posterization

**FX Pipelines:**

- Named stacks, e.g.:
  - `"cinematic"`, `"game"`, `"neon_futuristic"`, `"film"`  
- Node-based composition with easy insertion/removal of stages.

**Namespace example:**

- `engine.postfx.*`
- `PostFXRegistry`

---

### 3.4 Fields, Volumes & Space

**Goal:** A unified layer for everything “field-based”.

**Components:**

- **Scalar & Vector Fields**
  - Flow fields, turbulence, velocity fields
  - Signed distance fields (SDFs)

- **Volume Utilities**
  - Voxel grids, density fields, 3D textures
  - Sampling helpers for fog, volumetric light, materials

- **SDF / Raymarching**
  - Primitive SDFs: spheres, boxes, gyroids, fractals
  - Boolean ops, smooth blends, modifiers
  - Raymarching pipelines compatible with TSL/WebGPU

**Namespace example:**

- `engine.fields.*`
- `engine.volumes.*`

---

### 3.5 Physics, Sims & Dynamics

**Goal:** Ready-to-use **TSL/compute-powered sims**.

**Components:**

- **Particle Systems**
  - GPU particles: emitters, updaters, renderers
  - Presets for sparks, dust, rain, snow, trails, embers, flocking

- **Fluid-ish Systems**
  - 2D/3D templates for smoke, ink, water surface
  - Patterns inspired by MLS-MPM, SPH, FLIP approaches (within WebGPU scope)

- **Softbody / Deformers**
  - Simple mass-spring nets, cloth-like behavior, jiggle
  - Geometry modifiers: wave, swirl, twist, noise, growth

- **Forces & Constraints**
  - Gravity, wind, turbulence, attractors/repulsors, vortices
  - Basic collision approximations and constraints

**Namespace example:**

- `engine.sims.*`
- `SimRegistry`

---

### 3.6 Math, Algorithms & Utility Nodes

**Goal:** Make complex math **reusable, documented, and discoverable**.

**Components:**

- **Core Math**
  - Vector/matrix ops, transforms, quaternions
  - Smooth min/max, remap, clamp, step/smoothstep, easing

- **Noise & Patterns**
  - Multiple noise families (Perlin, Simplex, Worley, curl noise)
  - Patterns for grids, tiles, spirals, polar maps, etc.

- **Color & LUT Tools**
  - Color spaces, LUT sampling, palette nodes, blend modes

- **Timing & Events**
  - Time, delta, oscillators, envelopes, beat-sync, triggers

**Namespace example:**

- `engine.math.*`
- `MathRegistry` (or as utility module set)

---

### 3.7 Engine Infrastructure & Integration

**Goal:** A clean, centralized engine that everything plugs into.

**Components:**

- **Engine Context**
  - `TSLEngineContext` or `EngineContext` with:
    - Renderer/adapters
    - Pipelines
    - Registries
    - Resource caches

- **Registries**
  - `MaterialRegistry`, `PostFXRegistry`, `FieldRegistry`, `SimRegistry`, `MathRegistry`
  - Introspectable for UIs and agents

- **Config & Presets**
  - JSON/YAML-friendly schemas for presets and pipelines
  - Quality levels, performance profiles, device capability detection

- **Debug & Dev Tools**
  - Visualizers (buffers, fields, volumes)
  - Logging hooks and error-aware init

---

### 3.8 Agent / UI / App Hooks

**Goal:** Let AI coders & UIs drive the engine sanely.

- Stable programmatic API, e.g.:
  - `engine.addModule("postfx", "bloom", { intensity: 1.4 })`
  - `engine.createMaterial("neon_glass", { color: "#00ffcc" })`

- Introspection:
  - Parameter schemas (type, min, max, step, enum options)
  - Module metadata (tags, categories, dependencies)

---

## 4. High-Level Requirements Summary

- **Self-contained**
  - Single core engine entry point; minimal assumptions about host app.

- **Plug-and-play**
  - Modules can be used standalone or as part of a pipeline.

- **Pre-built, curated library**
  - Materials, FX, fields, sims, math—organized into clear namespaces.

- **Extensible**
  - Documented patterns for adding new modules:
    - Materials, sims, post-FX, fields, utilities.

- **Production-ready**
  - Performance tuning, presets, versioning, debug tools.

- **Rapid prototyping**
  - One-liner helpers and example scenes ready for copy-paste.

Alright, let’s brute-force the taxonomy for your dream engine 😈
Here’s a **maxed-out proposal** of all categories, modules, groups, and components you can have for a **TSL/WebGPU/MaterialX engine** on Three r181+.

Think of this as your **master menu** – you won’t build all at once, but nothing important will be “unthought of”.

---
# 🌌 TSL/WebGPU/MaterialX Engine — Module Map

> Master checklist of all planned **categories, modules, systems, and components**  
> for the self-contained, plug-and-play **TSL/WebGPU/MaterialX** engine on **Three.js r181+**.

Use this file as:
- A **roadmap** (what exists vs what’s missing)
- A **design map** (how modules relate)
- A **guide for agents** (what they can build/extend)

---

## 0. High-Level Architecture Layers

- [ ] Core Engine & Runtime
- [ ] Rendering & Pipelines (WebGPU / TSL)
- [ ] Materials / Shading / MaterialX
- [ ] Lighting & Environment
- [ ] Geometry, Mesh & Space
- [ ] Fields, Volumes, SDF
- [ ] Particles & VFX Systems
- [ ] Physics & Simulation
- [ ] Animation, Motion & Time
- [ ] Post-Processing & Image FX
- [ ] Math, Noise, Algorithms & TSL Utility Library
- [ ] I/O, Assets & Formats
- [ ] Debug, Profiling & Introspection
- [ ] UI, Control Panels & Presets
- [ ] Integration, Agents & API Surface
- [ ] Templates, Example Scenes & Blueprints

---

## 1. Core Engine & Runtime (`/engine/core`)

- [ ] **Engine Context & Lifecycle**
  - [ ] `EngineContext` / `createEngineContext()`
  - [ ] Subsystem registry (materials, FX, sims, fields, etc.)
  - [ ] Render loop (update/tick/render phases)
  - [ ] Capability detection (WebGPU/WebGL fallback, feature sets)
- [ ] **Resource Management**
  - [ ] GPU buffer manager
  - [ ] Texture manager (2D/3D/cubemap/array)
  - [ ] Sampler manager
  - [ ] Pipeline cache (render + compute)
- [ ] **Scene & Layer System**
  - [ ] Logical render layers (`BACKGROUND`, `WORLD`, `VFX`, `UI`)
  - [ ] Pass registry (geometry, shadow, depth/normal, post-FX)
- [ ] **Time & Scheduling**
  - [ ] Global time & delta
  - [ ] Fixed-step vs variable-step clocks
  - [ ] Timer/tween scheduler
  - [ ] Adaptive quality hooks (frame budget hints)

---

## 2. Rendering & Pipeline (`/engine/rendering`)

- [ ] **WebGPU Renderer Wrapper**
  - [ ] WebGPURenderer integration
  - [ ] Swapchain / canvas management
  - [ ] Multi-target framebuffers (G-buffers, velocity, etc.)
- [ ] **Render Pipelines**
  - [ ] Forward+ pipeline
  - [ ] Deferred / clustered (if implemented)
  - [ ] Hybrid pipeline (forward+ with G-buffer taps)
- [ ] **TSL Integration**
  - [ ] Node material factory
  - [ ] Shared BRDF / BSDF library (TSL nodes)
  - [ ] Node graph cache / reuse
- [ ] **MaterialX Bridge**
  - [ ] MaterialX → TSL graph translator
  - [ ] Node mapping library (MaterialX → TSL)
  - [ ] (Optional) TSL → MaterialX export helpers

---

## 3. Materials & Shading (`/engine/modules/materials`)

- [ ] **Core PBR Library**
  - [ ] Standard / physical PBR
  - [ ] Clearcoat, sheen, subsurface, transmission, thin-film
  - [ ] Fabric shaders (velvet, satin, denim, silk)
  - [ ] Skin shader (SSS approx, micro-normal layers)
  - [ ] Hair/fur approximation
- [ ] **Stylized / NPR**
  - [ ] Toon materials (steps/ramps/outlines)
  - [ ] Matcap
  - [ ] Ink, crosshatch, halftone
  - [ ] Posterized gradient materials
- [ ] **Emissive / FX Materials**
  - [ ] Neon glass, emissive outlines
  - [ ] Holographic, glitch surfaces
  - [ ] Fresnel-driven rim/glow materials
- [ ] **Procedural Surfaces**
  - [ ] Noise-based marble, wood, stone, lava, terrain, clouds
  - [ ] Edge wear, cavity dirt, grunge masks
- [ ] **Layered & Blend Materials**
  - [ ] Layer stack system
  - [ ] Blend modes (add, multiply, overlay, etc.)
  - [ ] Triplanar mapping node
  - [ ] Decal system (projected decals, stickers)

---

## 4. Lighting & Environment (`/engine/modules/lighting`)

- [ ] **Light Types**
  - [ ] Directional, point, spot lights
  - [ ] Area light approximations (rect, tube)
  - [ ] IES profile approximations
- [ ] **Lighting Models**
  - [ ] Physically-based punctual lighting
  - [ ] Image-based lighting (IBL)
  - [ ] Area light BRDF approximations
- [ ] **Environment Handling**
  - [ ] HDRI loading & prefiltering
  - [ ] Procedural sky (time-of-day, gradients)
  - [ ] Reflection probes / local IBL
- [ ] **Shadows**
  - [ ] Shadow mapping (PCF/PCSS/VSM/ESM variants)
  - [ ] Cascaded shadow maps
  - [ ] Contact shadows (screen-space / projected)
- [ ] **GI Approximations**
  - [ ] SSAO / HBAO-like
  - [ ] SSGI approximation
  - [ ] Light probe blending

---

## 5. Geometry, Mesh & Space (`/engine/modules/geometry`)

- [ ] **Geometry Utils**
  - [ ] Parametric primitives (rounded box, capsule, superquadric, etc.)
  - [ ] Geometry modifiers (bend, twist, taper, noise-based displacement)
  - [ ] LOD helper system
- [ ] **Mesh Data Pipelines**
  - [ ] Tangent/bitangent generation
  - [ ] UV generation helpers
  - [ ] Curvature / thickness approximations
- [ ] **Deformation**
  - [ ] Skeletal skinning support (GPU-friendly)
  - [ ] Morph target blending
  - [ ] Procedural deformations (breathing, pulsing, wobble)
- [ ] **Instancing & Batching**
  - [ ] Instanced mesh utilities
  - [ ] GPU-driven instance transforms
  - [ ] Per-instance attributes (color, random, custom)

---

## 6. Fields, Volumes & SDF (`/engine/modules/fields`)

- [ ] **Scalar & Vector Fields**
  - [ ] 2D/3D fields (velocity, density, temp, pressure)
  - [ ] Field sampling nodes (value, gradient, curl, divergence)
- [ ] **Noise Fields**
  - [ ] Perlin / Simplex / Worley / FBM
  - [ ] Curl noise / turbulence fields
- [ ] **Volumes**
  - [ ] 3D density textures
  - [ ] Voxel/sparse grid helpers
  - [ ] Volume sampling for fog, clouds, smoke
- [ ] **Signed Distance Fields (SDF)**
  - [ ] Primitive SDFs (sphere, box, capsule, gyroid, etc.)
  - [ ] Boolean ops & smooth blends
  - [ ] SDF-based masks & deformers
- [ ] **Raymarching Pipelines**
  - [ ] Generic raymarch node
  - [ ] Lighting/SH in SDF volumes
  - [ ] Quality controls (max steps, eps, etc.)

---

## 7. Particles & VFX Systems (`/engine/modules/particles`)

- [ ] **Base GPU Particle Framework**
  - [ ] Particle buffers (pos/vel/age/life)
  - [ ] Spawn/emit/update modules
  - [ ] Render modules (sprite/mesh/ribbon)
- [ ] **Emitters**
  - [ ] Point, sphere, box, cone, mesh surface
  - [ ] Burst & continuous
  - [ ] Event-driven emitters (on events/audio)
- [ ] **Forces**
  - [ ] Gravity, wind, drag
  - [ ] Vortex, radial attraction/repulsion
  - [ ] Noise/turbulence forces
  - [ ] Field-driven forces (from `/fields`)
- [ ] **Render Modes**
  - [ ] Sprites/billboards
  - [ ] Stretched / velocity-aligned
  - [ ] Mesh particles
  - [ ] Trails & ribbons
- [ ] **FX Presets**
  - [ ] Sparks, embers, explosions
  - [ ] Rain, snow, dust
  - [ ] Magic/energy trails, portals, sci-fi FX

---

## 8. Physics & Simulation (`/engine/modules/physics`)

- [ ] **Basic Dynamics**
  - [ ] Simple rigid kinematics & collision approximations
  - [ ] Constraints (distance/spring)
- [ ] **Cloth & Softbody Approx**
  - [ ] Mass-spring cloth grid
  - [ ] Simple softbody blobs / lattices
  - [ ] Jiggly accessories (secondary motion)
- [ ] **Fluid-Like Systems**
  - [ ] 2D fluid sim template (ink/smoke)
  - [ ] Pressure solver node(s)
  - [ ] Advection, diffusion, vorticity confinement nodes
- [ ] **Crowd / Boids / Swarm**
  - [ ] Boids core (separation, alignment, cohesion)
  - [ ] Steering behaviors (seek, flee, wander, follow path)
  - [ ] Obstacle avoidance nodes

---

## 9. Animation, Motion & Time (`/engine/modules/animation`)

- [ ] **Time Nodes**
  - [ ] Global/local time nodes
  - [ ] Time scaling & warping
- [ ] **Parametric Motion**
  - [ ] Oscillators (sin/tri/square/noise)
  - [ ] Easing functions (ease in/out, elastic, bounce)
  - [ ] Noise-driven motion
- [ ] **Curves & Keyframes**
  - [ ] Scalar/vector curves
  - [ ] Parameter animation tracks (materials/FX/sims)
- [ ] **Path & Camera Animation**
  - [ ] Spline-following
  - [ ] Orbit/rail cameras
  - [ ] Target tracking / look-at
- [ ] **Audio-Reactive (Optional)**
  - [ ] Audio analysis (amplitude & simple bands)
  - [ ] Mapping audio → parameters

---

## 10. Post-Processing & Image FX (`/engine/modules/postfx`)

- [ ] **Core Chain**
  - [ ] Tone-mapping operators
  - [ ] Exposure / white balance
  - [ ] Color grading (LUT-based & parametric)
- [ ] **Cinematic FX**
  - [ ] Bloom (multi-scale)
  - [ ] DOF (bokeh)
  - [ ] Motion blur (velocity-based)
  - [ ] Vignette, grain, chromatic aberration
- [ ] **Stylized FX**
  - [ ] Edge detect / outlines
  - [ ] Posterization
  - [ ] Halftone / comic
  - [ ] Pixelation / retro
- [ ] **Distortion & Warps**
  - [ ] Heat haze / refraction
  - [ ] Ripple, shockwave
  - [ ] Glitch suite (channels, blocks, tearing)
- [ ] **FX Pipelines**
  - [ ] `cinematicDefault` pipeline
  - [ ] `neonArcade` pipeline
  - [ ] `comicBook` pipeline
  - [ ] `retroCRT` pipeline
  - [ ] Runtime stack edit API

---

## 11. Math, Noise & Utility Library (`/engine/modules/math`)

- [ ] **Core Math Nodes**
  - [ ] Scalars, vectors, matrices
  - [ ] Dot, cross, reflect, refract
  - [ ] Clamp, saturate, remap, smoothstep
- [ ] **Coordinate Systems**
  - [ ] World/view/local/tangent transforms
  - [ ] Polar & spherical coordinate helpers
- [ ] **Noise & Patterns**
  - [ ] Perlin, Simplex, Worley, FBM composer
  - [ ] Tileable noise variants
  - [ ] Pattern generators (stripes, checker, grids, spirals)
- [ ] **Color Utilities**
  - [ ] Color spaces (RGB/HSV/HSL, linear/sRGB)
  - [ ] Gradient ramps & palettes
  - [ ] Blend mode nodes
- [ ] **Algorithms & Helpers**
  - [ ] Hash functions for pseudo-random
  - [ ] Sampling patterns (Poisson-ish, blue-noise-ish)
  - [ ] Curve shaping (bias/gain, S-curves)

---

## 12. I/O, Assets & Formats (`/engine/io`)

- [ ] **Geometry & Scenes**
  - [ ] GLTF/GLB helpers
  - [ ] Draco / mesh compression integration
  - [ ] Lazy-load asset manager
- [ ] **Textures**
  - [ ] HDR/EXR/PNG/JPEG/KTX2 loaders
  - [ ] Mip & prefiltering tools
  - [ ] Texture atlases / arrays
- [ ] **Presets & Configs**
  - [ ] JSON/YAML engine config loader
  - [ ] Save/load material/FX/sim presets
  - [ ] Export/import engine scene configs
- [ ] **MaterialX I/O**
  - [ ] Load MaterialX documents
  - [ ] Map to TSL graphs
  - [ ] (Optional) Export back to MaterialX

---

## 13. Debug, Profiling & Introspection (`/engine/debug`)

- [ ] **Debug Visualizations**
  - [ ] G-buffer viewers (normals, depth, roughness, motion, AO)
  - [ ] Overlays: light volumes, shadow cascades, probes
- [ ] **Profiling**
  - [ ] Frame time breakdown
  - [ ] GPU timing queries (where possible)
  - [ ] Overdraw approximations
- [ ] **Logging & Diagnostics**
  - [ ] Engine logger (levels, tags)
  - [ ] Validation & warning system
  - [ ] Self-test scenes / quick checks
- [ ] **Introspection**
  - [ ] Registries: list materials/FX/fields/sims
  - [ ] Parameter reflection metadata (type, range, category)

---

## 14. UI, Control Panels & Presets (`/engine/ui`)

- [ ] **UI Integration Layer**
  - [ ] Tweakpane/dat.GUI/custom-panel adapter
  - [ ] Unified parameter schema (type, min, max, step, groups)
- [ ] **Preset Manager**
  - [ ] Save/load presets at runtime
  - [ ] Presets for:
    - [ ] Materials
    - [ ] PostFX stacks
    - [ ] Lighting setups
    - [ ] Camera rigs
- [ ] **Layouts**
  - [ ] Dev layout (debug heavy)
  - [ ] Artist layout (visual-centric)
  - [ ] Director layout (camera/mood/exposure only)

---

## 15. Integration, Agents & API (`/engine/api`)

- [ ] **High-Level Engine API**
  - [ ] `engine.createScenePreset(name, options)`
  - [ ] `engine.addPostFX(name, options)`
  - [ ] `engine.createMaterial(name, options)`
  - [ ] Lifecycle hooks (before/after frame, resize, etc.)
- [ ] **Agent-Friendly Schemas**
  - [ ] JSON schema / descriptors for:
    - [ ] Materials
    - [ ] FX stacks
    - [ ] Sims
    - [ ] Fields
- [ ] **Host Framework Integration**
  - [ ] Plain JS/ESM bootstrap
  - [ ] React/Next wrappers (optional)
  - [ ] Messaging hooks (postMessage/WebSocket etc., optional)

---

## 16. Templates, Examples & Blueprints (`/engine/examples`)

- [ ] **Starter Scenes**
  - [ ] Minimal PBR + HDRI scene
  - [ ] Toon/NPR showcase
  - [ ] Neon / futuristic corridor
  - [ ] Volumetric fog & lights
  - [ ] Particles + PostFX showcase
- [ ] **Blueprints**
  - [ ] Portfolio hero scene
  - [ ] Game-level style scene
  - [ ] Audio-reactive performance scene
  - [ ] Data-visualization scene
- [ ] **Test Scenes**
  - [ ] Light stress test (many lights)
  - [ ] Particle stress test
  - [ ] Heavy post-FX stack test
  - [ ] Visual regression baselines

---

# 📁 Suggested Folder Structure

Below is a proposed folder layout mapping this module map to the filesystem.

```txt
/engine
  /core
    engineContext.ts
    loop.ts
    resources.ts
    layers.ts
    time.ts

  /rendering
    rendererWebGPU.ts
    pipelines/
      forwardPlus.ts
      deferred.ts
      hybrid.ts
    tsl/
      tslIntegration.ts
      brdfLibrary.ts
    materialx/
      materialxBridge.ts
      materialxToTSLMap.ts

  /modules
    /materials
      index.ts
      pbr/
      npr/
      emissive/
      procedural/
      layered/
    /lighting
      lights/
      environment/
      shadows/
      gi/
    /geometry
      primitives/
      modifiers/
      instancing/
      deformation/
    /fields
      scalarVector/
      noiseFields/
      volumes/
      sdf/
      raymarch/
    /particles
      core/
      emitters/
      forces/
      renderers/
      presets/
    /physics
      basic/
      clothSoftbody/
      fluids/
      crowd/
    /animation
      timeNodes/
      motion/
      curves/
      camera/
      audioReactive/
    /postfx
      core/
      cinematic/
      stylized/
      distortions/
      pipelines/
    /math
      core/
      coordinates/
      noise/
      patterns/
      color/
      algorithms/

  /io
    assets/
    textures/
    presets/
    materialx/

  /debug
    views/
    profiling/
    logging/
    introspection/

  /ui
    panels/
    layouts/
    presetManager.ts

  /api
    engineAPI.ts
    schemas/

  /examples
    starter/
    blueprints/
    tests/
