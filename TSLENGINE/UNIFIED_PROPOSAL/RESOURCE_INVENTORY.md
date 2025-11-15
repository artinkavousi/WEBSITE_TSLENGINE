# TSL/WebGPU Engine — Resource Inventory

**Version:** 1.0  
**Date:** November 13, 2024  
**Purpose:** Complete catalog of available modules for porting from example repositories

---

## Overview

This document catalogs **all available TSL/WebGPU modules, utilities, and systems** discovered in the RESOURCES directories that are candidates for porting into the `tsl-kit` engine.

---

## 🔥 Priority 1: fragments-boilerplate-main

**Source:** `RESOURCES/REPOSITORIES/portfolio examples/fragments-boilerplate-main`  
**License:** Check LICENSE file  
**Three.js Version:** r180+  
**Quality:** ⭐⭐⭐⭐⭐ (Clean, well-organized, modern TSL)

### Directory Structure

```
src/tsl/
  /noise
  /post_processing
  /utils
    /color
    /function
    /lighting
    /math
    /sdf
```

### Noise Modules (`/src/tsl/noise`)

| Module | File | Description | Port Target |
|--------|------|-------------|-------------|
| **Perlin Noise 3D** | `perlin_noise_3d.ts` | Classic Perlin noise implementation | `/packages/tsl-kit/engine/modules/math/noise/perlinNoise3d.ts` |
| **Simplex Noise 3D** | `simplex_noise_3d.ts` | 3D simplex noise | `/packages/tsl-kit/engine/modules/math/noise/simplexNoise3d.ts` |
| **Simplex Noise 4D** | `simplex_noise_4d.ts` | 4D simplex noise (with time) | `/packages/tsl-kit/engine/modules/math/noise/simplexNoise4d.ts` |
| **Curl Noise 3D** | `curl_noise_3d.ts` | Divergence-free noise for fluids | `/packages/tsl-kit/engine/modules/math/noise/curlNoise3d.ts` |
| **Curl Noise 4D** | `curl_noise_4d.ts` | 4D curl noise | `/packages/tsl-kit/engine/modules/math/noise/curlNoise4d.ts` |
| **FBM** | `fbm.ts` | Fractional Brownian Motion composer | `/packages/tsl-kit/engine/modules/math/noise/fbm.ts` |
| **Turbulence** | `turbulence.ts` | Turbulence field generator | `/packages/tsl-kit/engine/modules/math/noise/turbulence.ts` |
| **Common** | `common.ts` | Shared utilities (mod289, permute, fade) | `/packages/tsl-kit/engine/modules/math/noise/common.ts` |

**Priority:** 🔥 HIGH — Foundation for procedural materials and fields

**Dependencies:** `three/tsl`

**Effort:** 4 hours (direct copy + import adjustments)

---

### SDF Modules (`/src/tsl/utils/sdf`)

| Module | File | Description | Port Target |
|--------|------|-------------|-------------|
| **SDF Shapes** | `shapes.ts` | 10+ primitive SDFs | `/packages/tsl-kit/engine/modules/fields/sdf/shapes.ts` |
| | | - `sdSphere`, `sdBox2d`, `sdBox3d` | |
| | | - `sdDiamond`, `sdHexagon`, `sdEquilateralTriangle` | |
| | | - `sdLine`, `sdRing`, `sdParallelogram` | |
| | | - `sdRhombus`, `sdTriangle` | |
| **SDF Operations** | `operations.ts` | Boolean ops, smooth blends, modifiers | `/packages/tsl-kit/engine/modules/fields/sdf/operations.ts` |

**Priority:** 🔥 HIGH — Essential for raymarching and procedural geometry

**Dependencies:** `three/tsl`

**Effort:** 3 hours

---

### Post-Processing Effects (`/src/tsl/post_processing`)

| Module | File | Description | Port Target |
|--------|------|-------------|-------------|
| **Canvas Weave** | `canvas_weave_effect.ts` | Canvas texture overlay | `/packages/tsl-kit/engine/modules/postfx/stylized/canvasWeave.ts` |
| **Grain Texture** | `grain_texture_effect.ts` | Film grain effect | `/packages/tsl-kit/engine/modules/postfx/cinematic/grain.ts` |
| **LCD Effect** | `lcd_effect.ts` | LCD screen simulation | `/packages/tsl-kit/engine/modules/postfx/stylized/lcd.ts` |
| **Pixellation** | `pixellation_effect.ts` | Pixelation/mosaic effect | `/packages/tsl-kit/engine/modules/postfx/stylized/pixellation.ts` |
| **Speckled Noise** | `speckled_noise_effect.ts` | Speckled noise overlay | `/packages/tsl-kit/engine/modules/postfx/stylized/speckledNoise.ts` |
| **Vignette** | `vignette_effect.ts` | Vignette darkening | `/packages/tsl-kit/engine/modules/postfx/cinematic/vignette.ts` |
| **Post Processing** | `post_processing.tsx` | React component wrapper | Reference for LABS implementation |

**Priority:** 🔥 HIGH — Ready-to-use post-FX

**Dependencies:** `three/tsl`, `three/webgpu`, `@react-three/fiber`

**Effort:** 6 hours (5 effects + pipeline integration)

---

### Utility Modules (`/src/tsl/utils`)

#### Color Utilities (`/utils/color`)

| Module | File | Description | Port Target |
|--------|------|-------------|-------------|
| **Cosine Palette** | `cosine_palette.ts` | Procedural color palette generator | `/packages/tsl-kit/engine/modules/math/color/cosinePalette.ts` |
| **Tone Mapping** | `tonemapping.ts` | Custom tone mapping ops | `/packages/tsl-kit/engine/modules/postfx/core/toneMappingOps.ts` |

#### Function Utilities (`/utils/function`)

| Module | File | Description | Port Target |
|--------|------|-------------|-------------|
| **Bloom** | `bloom.ts` | Bloom helper | `/packages/tsl-kit/engine/modules/postfx/cinematic/bloom.ts` |
| **Bloom Edge Pattern** | `bloom_edge_pattern.ts` | Edge-based bloom | `/packages/tsl-kit/engine/modules/postfx/cinematic/bloomEdge.ts` |
| **Domain Index** | `domain_index.ts` | Domain repetition | `/packages/tsl-kit/engine/modules/math/patterns/domainIndex.ts` |
| **Median 3** | `median3.ts` | Median filter | `/packages/tsl-kit/engine/modules/math/algorithms/median.ts` |
| **Repeating Pattern** | `repeating_pattern.ts` | Pattern repetition | `/packages/tsl-kit/engine/modules/math/patterns/repeating.ts` |
| **Screen Aspect UV** | `screen_aspect_uv.ts` | Aspect-corrected UVs | `/packages/tsl-kit/engine/modules/math/coordinates/screenAspectUV.ts` |

#### Math Utilities (`/utils/math`)

| Module | File | Description | Port Target |
|--------|------|-------------|-------------|
| **Complex** | `complex.ts` | Complex number ops | `/packages/tsl-kit/engine/modules/math/core/complex.ts` |
| **Coordinates** | `coordinates.ts` | Coordinate transforms | `/packages/tsl-kit/engine/modules/math/coordinates/transforms.ts` |

#### Lighting

| Module | File | Description | Port Target |
|--------|------|-------------|-------------|
| **Lighting** | `lighting.ts` | Lighting helpers | `/packages/tsl-kit/engine/modules/lighting/helpers/lighting.ts` |

**Priority:** 🟡 MEDIUM — Nice-to-have utilities

**Effort:** 8 hours total

---

### Scene Setup Components

| Component | File | Description | Use For |
|-----------|------|-------------|---------|
| **WebGPUScene** | `webgpu_scene.tsx` | R3F WebGPU renderer setup | LABS website reference |
| **WebGPUSketch** | `webgpu_sketch.tsx` | Fullscreen sketch component | LABS website reference |

**Priority:** 🟡 MEDIUM — Reference for LABS

**Effort:** 2 hours (adapt for LABS)

---

## 🔥 Priority 2: portfolio-main

**Source:** `RESOURCES/REPOSITORIES/portfolio examples/portfolio-main`  
**License:** Check LICENSE file  
**Three.js Version:** WebGPU  
**Quality:** ⭐⭐⭐⭐⭐ (Production-quality demos)

### Core Infrastructure

| Module | File | Description | Port Target |
|--------|------|-------------|-------------|
| **BaseExperience** | `BaseExperience.ts` | WebGPU renderer bootstrap | `/packages/tsl-kit/engine/core/BaseExperience.ts` |
| **WebGPUCanvas** | `WebGPUCanvas.tsx` | R3F WebGPU canvas | LABS reference |
| **Pointer** | `utils/webgpu/Pointer.ts` | Pointer interaction handler | `/packages/tsl-kit/engine/core/Pointer.ts` |

**Priority:** 🔥 HIGH — Foundation classes

**Effort:** 4 hours

---

### Compute Shader Examples

| Demo | File | Features | Port Target |
|------|------|----------|-------------|
| **Attractor Collisions** | `attractor-collisions/webgpu/demo.ts` | Compute-based particle attraction | `/packages/tsl-kit/engine/modules/sims/particles/attractors.ts` |
| **Flow Field** | `flow-field/webgpu/demo.ts` | Flow field particle system | `/packages/tsl-kit/engine/modules/sims/particles/flowField.ts` |
| **Particles Twist** | `particles-twist/webgpu/demo.ts` | Twisted particle system | `/packages/tsl-kit/engine/modules/sims/particles/twist.ts` |
| **FBO Particles** | `fbo-particles/useGPGPU.tsx` | GPGPU particle template | `/packages/tsl-kit/engine/modules/sims/particles/gpgpu.ts` |

**Priority:** 🔥 HIGH — Compute shader patterns

**Effort:** 12 hours (3 hours each)

---

### Material & Shader Examples

| Demo | File | Features | Port Target |
|------|------|----------|-------------|
| **TSL Custom Node Material** | `tsl-custom-node-material/demo.ts` | Custom TSL material pattern | Reference for material authoring |
| **Magic Wand Cursor** | `magic-wand-cursor/webgpu/demo.ts` | Interactive shader effects | `/packages/tsl-kit/engine/modules/materials/emissive/interactive.ts` |
| **Infinite Water** | `infinite-water/webgpu/demo.ts` | Water material + sim | `/packages/tsl-kit/engine/modules/physics/fluids/water.ts` |
| **Nightingale Hover** | `nightingale-hover-effect-recreated/webgpu/demo.ts` | Hover displacement | `/packages/tsl-kit/engine/modules/materials/effects/hoverDisplace.ts` |

**Priority:** 🟡 MEDIUM — Advanced material examples

**Effort:** 16 hours total

---

### GLSL Shaders (69 files)

**Location:** `src/app/**/*.glsl`

**Usage:** 
- Reference for WebGL fallback
- Inspiration for TSL translations
- MaterialX compatibility testing

**Priority:** 🟢 LOW — Reference only

**Effort:** N/A (reference)

---

### WebGPU Utilities

| Util | File | Description | Port Target |
|------|------|-------------|-------------|
| **Compose** | `utils/webgpu/nodes/compose.ts` | Node composition helpers | `/packages/tsl-kit/engine/rendering/tsl/compose.ts` |

**Priority:** 🟡 MEDIUM

**Effort:** 2 hours

---

## 🔥 Priority 3: blog.maximeheckel.com-main

**Source:** `RESOURCES/REPOSITORIES/portfolio examples/blog.maximeheckel.com-main`  
**License:** Check LICENSE file  
**Quality:** ⭐⭐⭐⭐ (Educational + Production)

### MDX Content (57 articles)

**Location:** `content/*.mdx`

**Key Articles:**
- `the-study-of-shaders-with-react-three-fiber.mdx`
- `field-guide-to-tsl-and-webgpu.mdx`
- `the-magical-world-of-particles-with-react-three-fiber-and-shaders.mdx`
- `moebius-style-post-processing.mdx`

**Use For:**
- LABS content structure inspiration
- TSL/WebGPU explanation patterns
- Interactive widget patterns

**Priority:** 🟡 MEDIUM — Content reference

**Effort:** 20 hours (adapt for LABS)

---

### Interactive Widgets (50+ components)

**Location:** `core/components/MDX/Widgets/*`

| Widget | File | Description | Use For |
|--------|------|-------------|---------|
| **Raymarching Visualizer** | `RaymarchingVisualizer/*` | Interactive raymarching | LABS `/fields/sdf-raymarch` |
| **Volumetric Raymarching** | `VolumetricRaymarchingVisualizer/*` | Volumetric rendering | LABS `/fields/volumetric` |
| **Sobel Visualizer** | `SobelVisualizer/*` | Edge detection | LABS `/postfx/edge-detect` |
| **Kuwahara Visualizer** | `KuwaharaVisualizer/*` | Kuwahara filter | LABS `/postfx/kuwahara` |
| **Dithering Visualizer** | `DitheringVisualizer/*` | Dithering effects | LABS `/postfx/dithering` |
| **Simple Compute** | `SimpleCompute/*` | Compute shader intro | LABS `/sims/compute-intro` |
| **Particle Compute** | `ParticleCompute/*` | Particle compute | LABS `/particles/compute` |

**Priority:** 🟡 MEDIUM — Widget patterns for LABS

**Effort:** 30 hours (port + adapt)

---

### TSL Features

| Feature | File | Description | Port Target |
|---------|------|-------------|-------------|
| **Fresnel** | `features/fresnel.ts` | Fresnel effect | `/packages/tsl-kit/engine/modules/materials/effects/fresnel.ts` |
| **Specular** | `features/specular.ts` | Specular lighting | `/packages/tsl-kit/engine/modules/lighting/effects/specular.ts` |

**Priority:** 🟡 MEDIUM

**Effort:** 4 hours

---

## 🟡 Priority 4: tsl-textures-main

**Source:** `RESOURCES/REPOSITORIES/portfolio examples/tsl-textures-main`  
**License:** MIT  
**Three.js Version:** r180  
**Quality:** ⭐⭐⭐⭐⭐ (Polished library, 53 textures)

### Procedural Textures (53 modules)

**Location:** `src/*.js`

#### Natural Materials

| Texture | File | Description | Port Target |
|---------|------|-------------|-------------|
| **Wood** | `wood.js` | Procedural wood grain | `/packages/tsl-kit/engine/modules/materials/procedural/wood.ts` |
| **Marble** | `marble.js` | Marble patterns | `/packages/tsl-kit/engine/modules/materials/procedural/marble.ts` |
| **Rust** | `rust.js` | Rust/corrosion | `/packages/tsl-kit/engine/modules/materials/procedural/rust.ts` |
| **Cork** | `cork.js` | Cork texture | `/packages/tsl-kit/engine/modules/materials/procedural/cork.ts` |
| **Concrete** | `concrete.js` | Concrete surface | `/packages/tsl-kit/engine/modules/materials/procedural/concrete.ts` |
| **Rough Clay** | `rough-clay.js` | Clay surface | `/packages/tsl-kit/engine/modules/materials/procedural/clay.ts` |
| **Karst Rock** | `karst-rock.js` | Rock formations | `/packages/tsl-kit/engine/modules/materials/procedural/rock.ts` |

#### Organic Patterns

| Texture | File | Description | Port Target |
|---------|------|-------------|-------------|
| **Tiger Fur** | `tiger-fur.js` | Animal fur patterns | `/packages/tsl-kit/engine/modules/materials/procedural/fur.ts` |
| **Dalmatian Spots** | `dalmatian-spots.js` | Spot patterns | `/packages/tsl-kit/engine/modules/materials/procedural/spots.ts` |
| **Zebra Lines** | `zebra-lines.js` | Stripe patterns | `/packages/tsl-kit/engine/modules/materials/procedural/stripes.ts` |
| **Brain** | `brain.js` | Brain-like patterns | `/packages/tsl-kit/engine/modules/materials/procedural/brain.ts` |
| **Reticular Veins** | `reticular-veins.js` | Vein patterns | `/packages/tsl-kit/engine/modules/materials/procedural/veins.ts` |
| **Protozoa** | `protozoa.js` | Cellular patterns | `/packages/tsl-kit/engine/modules/materials/procedural/cellular.ts` |

#### Atmospheric & Space

| Texture | File | Description | Port Target |
|---------|------|-------------|-------------|
| **Clouds** | `clouds.js` | Cloud formations | `/packages/tsl-kit/engine/modules/materials/procedural/clouds.ts` |
| **Turbulent Smoke** | `turbulent-smoke.js` | Smoke simulation | `/packages/tsl-kit/engine/modules/materials/procedural/smoke.ts` |
| **Planet** | `planet.js` | Planetary surfaces | `/packages/tsl-kit/engine/modules/materials/procedural/planet.ts` |
| **Gas Giant** | `gas-giant.js` | Gas giant atmospheres | `/packages/tsl-kit/engine/modules/materials/procedural/gasGiant.ts` |
| **Stars** | `stars.js` | Star fields | `/packages/tsl-kit/engine/modules/materials/procedural/stars.ts` |
| **Dyson Sphere** | `dyson-sphere.js` | Dyson sphere patterns | `/packages/tsl-kit/engine/modules/materials/procedural/dysonSphere.ts` |

#### Geometric & Abstract

| Texture | File | Description | Port Target |
|---------|------|-------------|-------------|
| **Grid** | `grid.js` | Grid patterns | `/packages/tsl-kit/engine/modules/math/patterns/grid.ts` |
| **Circles** | `circles.js` | Circle patterns | `/packages/tsl-kit/engine/modules/math/patterns/circles.ts` |
| **Polka Dots** | `polka-dots.js` | Polka dot patterns | `/packages/tsl-kit/engine/modules/math/patterns/polkaDots.ts` |
| **Circle Decor** | `circle-decor.js` | Decorative circles | `/packages/tsl-kit/engine/modules/math/patterns/circleDecor.ts` |
| **Bricks** | `bricks.js` | Brick patterns | `/packages/tsl-kit/engine/modules/math/patterns/bricks.ts` |
| **Roman Paving** | `roman-paving.js` | Paving patterns | `/packages/tsl-kit/engine/modules/math/patterns/paving.ts` |
| **Voronoi Cells** | `voronoi-cells.js` | Voronoi diagrams | `/packages/tsl-kit/engine/modules/math/patterns/voronoi.ts` |
| **Isolines** | `isolines.js` | Contour lines | `/packages/tsl-kit/engine/modules/math/patterns/isolines.ts` |
| **Isolayers** | `isolayers.js` | Layered isolines | `/packages/tsl-kit/engine/modules/math/patterns/isolayers.ts` |

#### Artistic & Special Effects

| Texture | File | Description | Port Target |
|---------|------|-------------|-------------|
| **Neon Lights** | `neon-lights.js` | Neon glow effects | `/packages/tsl-kit/engine/modules/materials/emissive/neon.ts` |
| **Caustics** | `caustics.js` | Water caustics | `/packages/tsl-kit/engine/modules/lighting/effects/caustics.ts` |
| **Water Drops** | `water-drops.js` | Water droplet effects | `/packages/tsl-kit/engine/modules/materials/effects/waterDrops.ts` |
| **Scream** | `scream.js` | "The Scream" style | `/packages/tsl-kit/engine/modules/materials/artistic/scream.ts` |
| **Darth Maul** | `darth-maul.js` | Face pattern | `/packages/tsl-kit/engine/modules/materials/artistic/facePaint.ts` |
| **Cave Art** | `cave-art.js` | Prehistoric art style | `/packages/tsl-kit/engine/modules/materials/artistic/caveArt.ts` |

#### Fabrics & Textiles

| Texture | File | Description | Port Target |
|---------|------|-------------|-------------|
| **Satin** | `satin.js` | Satin fabric | `/packages/tsl-kit/engine/modules/materials/fabric/satin.ts` |
| **Crumpled Fabric** | `crumpled-fabric.js` | Wrinkled fabric | `/packages/tsl-kit/engine/modules/materials/fabric/crumpled.ts` |
| **Camouflage** | `camouflage.js` | Camo patterns | `/packages/tsl-kit/engine/modules/materials/procedural/camo.ts` |

#### Noise & Utility

| Texture | File | Description | Port Target |
|---------|------|-------------|-------------|
| **Simplex Noise** | `simplex-noise.js` | Simplex noise | (Already have from fragments-boilerplate) |
| **Static Noise** | `static-noise.js` | TV static | `/packages/tsl-kit/engine/modules/math/noise/staticNoise.ts` |

#### Shape Textures (Displacement)

| Texture | File | Description | Port Target |
|---------|------|-------------|-------------|
| **Supersphere** | `supersphere.js` | Shape: supersphere | `/packages/tsl-kit/engine/modules/geometry/modifiers/supersphere.ts` |
| **Watermelon** | `watermelon.js` | Shape: watermelon | Example only |
| **Runny Eggs** | `runny-eggs.js` | Shape: runny eggs | Example only |

#### Utility Functions

| Module | File | Description | Port Target |
|--------|------|-------------|-------------|
| **TSL Utils** | `tsl-utils.js` | Core utilities | `/packages/tsl-kit/engine/modules/math/tslUtils.ts` |
| | | - `noised`, `vnoise`, `hsl`, `toHsl` | |
| | | - `dynamic`, `spherical`, `applyEuler` | |
| | | - `matRotX/Y/Z`, `matRotYXZ` | |
| | | - `matTrans`, `matScale` | |
| | | - `selectPlanar`, `overlayPlanar` | |
| | | - `normalVector`, `prepare`, `TSLFn` | |
| **Rotator** | `rotator.js` | Texture rotation | `/packages/tsl-kit/engine/modules/math/transforms/rotator.ts` |
| **Translator** | `translator.js` | Texture translation | `/packages/tsl-kit/engine/modules/math/transforms/translator.ts` |
| **Scaler** | `scaler.js` | Texture scaling | `/packages/tsl-kit/engine/modules/math/transforms/scaler.ts` |
| **Melter** | `melter.js` | Melting/dripping effect | `/packages/tsl-kit/engine/modules/materials/effects/melter.ts` |

**Priority:** 🟢 LOW-MEDIUM — Large library, pick essentials first

**Effort:** 
- High priority textures (10-15): 20 hours
- Full library (53): 80 hours

**Strategy:** 
1. Port tsl-utils.js first (foundation)
2. Port 10-15 most useful textures (wood, marble, rust, clouds, planet, voronoi, etc.)
3. Defer artistic/novelty textures (scream, darth-maul, etc.) to later phases

---

## 🟡 Priority 5: TSLwebgpuExamples (Various Projects)

**Source:** `RESOURCES/REPOSITORIES/TSLwebgpuExamples/*`  
**License:** Various (check individual projects)  
**Quality:** ⭐⭐⭐⭐ (Mixed, mostly demos)

### Fluid Simulations

| Project | Key Files | Features | Port Target |
|---------|-----------|----------|-------------|
| **Splash-main** | `mls-mpm/*.wgsl`, `render/*.wgsl` | MLS-MPM fluid sim (9 WGSL shaders) | `/packages/tsl-kit/engine/modules/physics/fluids/mlsMpm.ts` |
| **WaterBall-main** | `*.wgsl` | Water sphere sim (14 WGSL shaders) | `/packages/tsl-kit/engine/modules/physics/fluids/waterBall.ts` |
| **fluidglass-main** | `src/**/*.js`, `*.frag` | Fluid + glass materials | `/packages/tsl-kit/engine/modules/materials/glass/fluid.ts` |
| **interactwave-main** | `src/**/*.js`, `*.frag` | Interactive wave sim | `/packages/tsl-kit/engine/modules/physics/fluids/interactiveWave.ts` |

**Priority:** 🟡 MEDIUM — Unique fluid implementations

**Effort:** 16 hours (4 projects × 4 hours)

**Note:** WGSL shaders need conversion to TSL or kept as compute shaders

---

### Particle Systems

| Project | Key Files | Features | Port Target |
|---------|-----------|----------|-------------|
| **three.js-tsl-particles-system-master** | `src/**/*.js` | TSL particle system | `/packages/tsl-kit/engine/modules/particles/systems/basic.ts` |
| **tsl-compute-particles** | `src/*.js` | Compute-based particles | `/packages/tsl-kit/engine/modules/particles/systems/compute.ts` |
| **tsl-particle-waves** | `src/*.js` | Wave-based particles | `/packages/tsl-kit/engine/modules/particles/systems/waves.ts` |
| **tsl-particles-of-a-thousand-faces-main** | `src/**/*.tsx` | Instance particle system | `/packages/tsl-kit/engine/modules/particles/systems/instanced.ts` |
| **webgpu-tsl-linkedparticles-main** | `src/**/*.tsx` | Linked particles | `/packages/tsl-kit/engine/modules/particles/systems/linked.ts` |
| **webgputest-particlesSDF-main** | `src/**/*.ts` | SDF-based particles | `/packages/tsl-kit/engine/modules/particles/systems/sdf.ts` |

**Priority:** 🟡 MEDIUM — Variety of particle approaches

**Effort:** 18 hours (6 projects × 3 hours)

---

### Physics & Simulations

| Project | Key Files | Features | Port Target |
|---------|-----------|----------|-------------|
| **softbodies-master** | `src/**/*.js` | Soft body physics | `/packages/tsl-kit/engine/modules/physics/softbody/basic.ts` |
| **breeze-main** | `src/**/*.js` | Wind/breeze sim | `/packages/tsl-kit/engine/modules/physics/wind/breeze.ts` |
| **flow-master** | `src/**/*.js` | Flow simulation | `/packages/tsl-kit/engine/modules/physics/flow/basic.ts` |
| **Floaty-main** | Rust + TS + WGSL | WebAssembly physics | Reference only (too complex) |

**Priority:** 🟡 MEDIUM — Physics variety

**Effort:** 9 hours (3 projects × 3 hours)

---

### Raymarching & SDFs

| Project | Key Files | Features | Port Target |
|---------|-----------|----------|-------------|
| **raymarching-tsl-main** | `src/**/*.jsx` | Raymarching in TSL | `/packages/tsl-kit/engine/modules/fields/raymarch/basic.ts` |

**Priority:** 🟡 MEDIUM

**Effort:** 4 hours

---

### Post-Processing & Effects

| Project | Key Files | Features | Port Target |
|---------|-----------|----------|-------------|
| **singularity-master** | `src/**/*.js`, `static/**/*.js` | Post-FX pipeline | `/packages/tsl-kit/engine/modules/postfx/pipelines/singularity.ts` |
| **ssgi-ssr-painter** | `src/*.js` | SSGI + SSR | `/packages/tsl-kit/engine/modules/postfx/advanced/ssgi.ts` |
| **ssr-gtao-keio** | `src/*.js` | SSR + GTAO | `/packages/tsl-kit/engine/modules/postfx/advanced/ssrGtao.ts` |
| **threejs-gsap-liquid-morphology-slideshow** | `src/*.js` | GSAP + morphing | LABS reference (animation patterns) |

**Priority:** 🟢 LOW-MEDIUM — Advanced effects, may be complex

**Effort:** 12 hours (3 projects × 4 hours)

---

### Utility Libraries

| Project | Key Files | Features | Port Target |
|---------|-----------|----------|-------------|
| **three-pinata-main** | `lib/**/*.ts` | TSL utility library | `/packages/tsl-kit/engine/modules/math/pinata/*` |
| **tsl-webgpu-companion** | `*.html` | WebGPU helper examples | Reference only |
| **fragments-boilerplate-vanilla-main** | `src/**/*.js` | Vanilla JS boilerplate | Reference for non-React use |

**Priority:** 🟡 MEDIUM (three-pinata), 🟢 LOW (others)

**Effort:** 6 hours (three-pinata), 2 hours (others)

---

### Sandbox & Examples

| Project | Key Files | Features | Use For |
|---------|-----------|----------|---------|
| **three.js-tsl-sandbox-master** | 124 JS files, 59 JSON, 59 JPG | Large sandbox with many examples | Mine for specific patterns |
| **codrops-batchedmesh-main** | `src/**/*.ts` | BatchedMesh example | Reference for instancing |
| **roquefort-main** | `src/**/*.js` | Minimal WebGPU demo | Reference for minimal setup |
| **test-webgpu-master** | `src/**/*.js`, `*.wgsl` | WebGPU tests | Reference for WGSL patterns |

**Priority:** 🟢 LOW — Reference/inspiration

**Effort:** 10 hours (selective mining)

---

## 📊 Summary Statistics

### By Priority

| Priority | Projects | Modules | Estimated Hours |
|----------|----------|---------|-----------------|
| 🔥 HIGH | 3 | 60+ | 80 |
| 🟡 MEDIUM | 15 | 100+ | 150 |
| 🟢 LOW | 10 | 50+ | 50 |
| **TOTAL** | **28** | **210+** | **280** |

### By Category

| Category | Modules | Priority | Hours |
|----------|---------|----------|-------|
| **Noise & Math** | 30 | 🔥 HIGH | 20 |
| **SDF & Fields** | 15 | 🔥 HIGH | 10 |
| **Post-Processing** | 25 | 🔥 HIGH | 30 |
| **Materials** | 60 | 🟡 MEDIUM | 60 |
| **Particles** | 20 | 🟡 MEDIUM | 30 |
| **Physics/Sims** | 15 | 🟡 MEDIUM | 25 |
| **Lighting** | 10 | 🟡 MEDIUM | 15 |
| **Geometry** | 10 | 🟡 MEDIUM | 10 |
| **Utilities** | 25 | 🟢 LOW | 30 |
| **TOTAL** | **210** | | **230** |

---

## 📋 Recommended Port Order

### Phase 1: Foundation (Weeks 3-5)

**From fragments-boilerplate:**
- ✅ All noise modules (8 modules, 4 hours)
- ✅ All SDF modules (2 modules, 3 hours)
- ✅ Core utilities (coordinates, complex, lighting) (3 modules, 3 hours)

**Total:** 13 modules, 10 hours

---

### Phase 2: Post-FX & Materials (Weeks 6-8)

**From fragments-boilerplate:**
- ✅ All post-processing effects (6 modules, 6 hours)
- ✅ Color utilities (2 modules, 2 hours)

**From portfolio-main:**
- ✅ BaseExperience (1 module, 2 hours)
- ✅ Basic material patterns (2 modules, 4 hours)

**Total:** 11 modules, 14 hours

---

### Phase 3: Compute & Particles (Weeks 9-11)

**From portfolio-main:**
- ✅ Attractor collisions (1 module, 3 hours)
- ✅ Flow field (1 module, 3 hours)
- ✅ Particles twist (1 module, 3 hours)
- ✅ GPGPU base (1 module, 3 hours)

**From TSLwebgpuExamples:**
- ✅ three.js-tsl-particles-system (1 module, 3 hours)
- ✅ tsl-compute-particles (1 module, 3 hours)

**Total:** 6 modules, 18 hours

---

### Phase 4: Advanced Materials & Lighting (Weeks 12-14)

**From tsl-textures (selective):**
- ✅ tsl-utils (1 module, 4 hours)
- ✅ Wood, marble, rust, clouds (4 modules, 8 hours)
- ✅ Voronoi, grid, circles (3 modules, 6 hours)

**From portfolio-main:**
- ✅ Lighting helpers (2 modules, 4 hours)
- ✅ Advanced materials (3 modules, 6 hours)

**Total:** 13 modules, 28 hours

---

### Phase 5: Physics & Advanced Sims (Weeks 15-17)

**From TSLwebgpuExamples:**
- ✅ Splash-main (fluid sim) (1 module, 4 hours)
- ✅ softbodies-master (1 module, 3 hours)
- ✅ fluidglass-main (1 module, 4 hours)
- ✅ breeze-main (wind) (1 module, 3 hours)

**From portfolio-main:**
- ✅ Infinite water (1 module, 4 hours)

**Total:** 5 modules, 18 hours

---

### Phase 6: Polish & Remaining (Weeks 18-20)

**Remaining high-value modules:**
- ✅ three-pinata utilities (5 modules, 6 hours)
- ✅ Additional tsl-textures (10 modules, 15 hours)
- ✅ Advanced post-FX (SSGI, SSR) (2 modules, 8 hours)
- ✅ Raymarching (1 module, 4 hours)

**Total:** 18 modules, 33 hours

---

## 🎯 Core Set (Minimum Viable Engine)

For a **production-ready MVP**, focus on:

**Must-Have (50 modules, ~80 hours):**

✅ **Noise & Math** (10 modules):
- Perlin, Simplex, Curl noise
- FBM, turbulence
- SDF shapes & operations
- Coordinates, complex math

✅ **Post-Processing** (10 modules):
- Bloom, vignette, grain
- Tone mapping, color grading
- Pixellation, LCD
- Edge detection

✅ **Materials** (15 modules):
- Basic PBR, advanced PBR
- Toon, matcap (NPR)
- Neon glass, holographic
- Wood, marble, rust, clouds, planet

✅ **Particles** (5 modules):
- Base particle system
- Attractors, flow field
- Compute particles
- Emitter presets

✅ **Lighting** (5 modules):
- Directional, point, spot
- HDRI environment
- Shadow mapping

✅ **Physics** (5 modules):
- 2D fluid sim
- Simple cloth
- Boids/steering

**Total:** 50 modules, 80 hours (Phases 1-3)

---

## 📝 Licensing Notes

**MIT Licensed:**
- fragments-boilerplate-main ✅
- tsl-textures-main ✅

**Check License:**
- portfolio-main (likely personal/open)
- blog.maximeheckel.com (likely personal/open)
- TSLwebgpuExamples/* (various)

**Action:**
- Verify all licenses before porting
- Maintain attribution in comments
- Keep LICENSE files with ported modules

---

## 🔗 Dependency Map

```
fragments-boilerplate
├─> noise (foundation for materials/fields)
├─> sdf (foundation for raymarching)
└─> post-fx (self-contained)

portfolio-main
├─> BaseExperience (foundation for engine core)
├─> compute patterns (foundation for sims/particles)
└─> materials (depends on noise)

tsl-textures
├─> tsl-utils (foundation for all textures)
└─> textures (depends on noise, some depend on tsl-utils)

TSLwebgpuExamples
├─> particles (depends on compute patterns)
├─> fluids (depends on compute patterns)
└─> physics (depends on compute patterns)
```

**Port Order:**
1. fragments-boilerplate/noise → foundation
2. fragments-boilerplate/sdf → foundation
3. portfolio-main/BaseExperience → core
4. portfolio-main/compute → sims foundation
5. tsl-textures/tsl-utils → texture foundation
6. All other modules (can be parallel)

---

**End of Resource Inventory**



