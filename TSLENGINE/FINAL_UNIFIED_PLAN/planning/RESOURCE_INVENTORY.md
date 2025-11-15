# TSL/WebGPU Engine — Resource Inventory

**Version:** 2.0  
**Date:** November 13, 2025  
**Purpose:** Complete catalog of available modules for porting from RESOURCES repositories

---

## 📊 Executive Summary

**Total Available Resources:**
- **28 source projects** across 3 main folders
- **210+ individual modules** ready to port
- **~280 hours** estimated porting effort (direct ports, minimal modifications)
- **150+ modules** selected for Phase 4 (core engine)

**Quality Rating System:**
- ⭐⭐⭐⭐⭐ Production-quality, well-documented, modern TSL
- ⭐⭐⭐⭐ Good quality, working examples, some documentation
- ⭐⭐⭐ Functional demos, may need cleanup
- ⭐⭐ Experimental, reference only

---

## 🔥 Priority 1: fragments-boilerplate-main (⭐⭐⭐⭐⭐)

**Source:** `RESOURCES/REPOSITORIES/portfolio examples/fragments-boilerplate-main`  
**License:** MIT  
**Three.js Version:** r180+  
**Quality:** ⭐⭐⭐⭐⭐ Clean, well-organized, modern TSL patterns

### Noise Modules (`/src/tsl/noise`) — 8 modules

| Module | File | Port Target | Priority | Effort |
|--------|------|-------------|----------|--------|
| Perlin Noise 3D | `perlin_noise_3d.ts` | `/math/noise/perlinNoise3d.ts` | 🔥 HIGH | 0.5h |
| Simplex Noise 3D | `simplex_noise_3d.ts` | `/math/noise/simplexNoise3d.ts` | 🔥 HIGH | 0.5h |
| Simplex Noise 4D | `simplex_noise_4d.ts` | `/math/noise/simplexNoise4d.ts` | 🔥 HIGH | 0.5h |
| Curl Noise 3D | `curl_noise_3d.ts` | `/math/noise/curlNoise3d.ts` | 🔥 HIGH | 0.5h |
| Curl Noise 4D | `curl_noise_4d.ts` | `/math/noise/curlNoise4d.ts` | 🔥 HIGH | 0.5h |
| FBM | `fbm.ts` | `/math/noise/fbm.ts` | 🔥 HIGH | 0.5h |
| Turbulence | `turbulence.ts` | `/math/noise/turbulence.ts` | 🔥 HIGH | 0.5h |
| Common | `common.ts` | `/math/noise/common.ts` | 🔥 HIGH | 0.5h |

**Total:** 8 modules, 4 hours

### SDF Modules (`/src/tsl/utils/sdf`) — 2 modules

| Module | File | Port Target | Priority | Effort |
|--------|------|-------------|----------|--------|
| SDF Shapes | `shapes.ts` (10+ primitives) | `/fields/sdf/shapes.ts` | 🔥 HIGH | 2h |
| SDF Operations | `operations.ts` | `/fields/sdf/operations.ts` | 🔥 HIGH | 1h |

**Total:** 2 modules, 3 hours

### Post-Processing (`/src/tsl/post_processing`) — 6 modules

| Module | File | Port Target | Priority | Effort |
|--------|------|-------------|----------|--------|
| Canvas Weave | `canvas_weave_effect.ts` | `/postfx/stylized/canvasWeave.ts` | 🟡 MEDIUM | 1h |
| Grain Texture | `grain_texture_effect.ts` | `/postfx/cinematic/grain.ts` | 🔥 HIGH | 1h |
| LCD Effect | `lcd_effect.ts` | `/postfx/stylized/lcd.ts` | 🟡 MEDIUM | 1h |
| Pixellation | `pixellation_effect.ts` | `/postfx/stylized/pixellation.ts` | 🔥 HIGH | 1h |
| Speckled Noise | `speckled_noise_effect.ts` | `/postfx/stylized/speckledNoise.ts` | 🟡 MEDIUM | 1h |
| Vignette | `vignette_effect.ts` | `/postfx/cinematic/vignette.ts` | 🔥 HIGH | 1h |

**Total:** 6 modules, 6 hours

### Utilities (`/src/tsl/utils`) — 10 modules

| Module | File | Port Target | Priority | Effort |
|--------|------|-------------|----------|--------|
| Cosine Palette | `color/cosine_palette.ts` | `/math/color/cosinePalette.ts` | 🟡 MEDIUM | 0.5h |
| Tone Mapping | `color/tonemapping.ts` | `/postfx/core/toneMappingOps.ts` | 🔥 HIGH | 1h |
| Bloom | `function/bloom.ts` | `/postfx/cinematic/bloom.ts` | 🔥 HIGH | 1h |
| Bloom Edge | `function/bloom_edge_pattern.ts` | `/postfx/cinematic/bloomEdge.ts` | 🟡 MEDIUM | 1h |
| Domain Index | `function/domain_index.ts` | `/math/patterns/domainIndex.ts` | 🟡 MEDIUM | 0.5h |
| Median 3 | `function/median3.ts` | `/math/algorithms/median.ts` | 🟢 LOW | 0.5h |
| Repeating Pattern | `function/repeating_pattern.ts` | `/math/patterns/repeating.ts` | 🟡 MEDIUM | 0.5h |
| Screen Aspect UV | `function/screen_aspect_uv.ts` | `/math/coordinates/screenAspectUV.ts` | 🟡 MEDIUM | 0.5h |
| Complex | `math/complex.ts` | `/math/core/complex.ts` | 🟢 LOW | 1h |
| Coordinates | `math/coordinates.ts` | `/math/coordinates/transforms.ts` | 🟡 MEDIUM | 1h |

**Total:** 10 modules, 8 hours

**PRIORITY 1 TOTAL:** 26 modules, 21 hours

---

## 🔥 Priority 2: portfolio-main (⭐⭐⭐⭐⭐)

**Source:** `RESOURCES/REPOSITORIES/portfolio examples/portfolio-main`  
**License:** Check LICENSE  
**Three.js Version:** WebGPU  
**Quality:** ⭐⭐⭐⭐⭐ Production-tested, modern patterns

### Core Infrastructure — 3 modules

| Module | File | Port Target | Priority | Effort |
|--------|------|-------------|----------|--------|
| BaseExperience | `BaseExperience.ts` | `/core/BaseExperience.ts` | 🔥 HIGH | 2h |
| Pointer Handler | `utils/webgpu/Pointer.ts` | `/core/Pointer.ts` | 🟡 MEDIUM | 1h |
| Compose Util | `utils/webgpu/nodes/compose.ts` | `/rendering/tsl/compose.ts` | 🟡 MEDIUM | 1h |

**Total:** 3 modules, 4 hours

### Compute Shader Examples — 4 modules

| Demo | File | Port Target | Priority | Effort |
|------|------|-------------|----------|--------|
| Attractor Collisions | `attractor-collisions/webgpu/demo.ts` | `/sims/particles/attractors.ts` | 🔥 HIGH | 3h |
| Flow Field | `flow-field/webgpu/demo.ts` | `/sims/particles/flowField.ts` | 🔥 HIGH | 3h |
| Particles Twist | `particles-twist/webgpu/demo.ts` | `/sims/particles/twist.ts` | 🔥 HIGH | 3h |
| FBO Particles | `fbo-particles/useGPGPU.tsx` | `/sims/particles/gpgpu.ts` | 🔥 HIGH | 3h |

**Total:** 4 modules, 12 hours

### Materials & Shaders — 7 modules

| Demo | File | Port Target | Priority | Effort |
|------|------|-------------|----------|--------|
| Fresnel | `features/fresnel.ts` | `/materials/effects/fresnel.ts` | 🟡 MEDIUM | 2h |
| Specular | `features/specular.ts` | `/lighting/effects/specular.ts` | 🟡 MEDIUM | 2h |
| Magic Wand | `magic-wand-cursor/webgpu/demo.ts` | `/materials/emissive/interactive.ts` | 🟢 LOW | 4h |
| Infinite Water | `infinite-water/webgpu/demo.ts` | `/physics/fluids/water.ts` | 🟡 MEDIUM | 4h |
| Nightingale Hover | `nightingale-hover-effect-recreated/webgpu/demo.ts` | `/materials/effects/hoverDisplace.ts` | 🟢 LOW | 4h |
| Diffuse | `utils/webgpu/nodes/lighting/diffuse.ts` | `/lighting/diffuse.ts` | 🔥 HIGH | 1h |
| Ambient | `utils/webgpu/nodes/lighting/ambient.ts` | `/lighting/ambient.ts` | 🔥 HIGH | 1h |

**Total:** 7 modules, 18 hours

### Noise Functions — 7 modules

| Module | File | Port Target | Priority | Effort |
|--------|------|-------------|----------|--------|
| Simplex 2D | `utils/webgpu/nodes/noise/simplexNoise2d.ts` | `/math/noise/simplexNoise2d.ts` | 🔥 HIGH | 0.5h |
| Simplex 3D | `utils/webgpu/nodes/noise/simplexNoise3d.ts` | (Already in P1) | - | - |
| Simplex 4D | `utils/webgpu/nodes/noise/simplexNoise4d.ts` | (Already in P1) | - | - |
| Curl 3D | `utils/webgpu/nodes/noise/curlNoise3d.ts` | (Already in P1) | - | - |
| Curl 4D | `utils/webgpu/nodes/noise/curlNoise4d.ts` | (Already in P1) | - | - |
| Classic Perlin | `utils/webgpu/nodes/noise/classicNoise3d.ts` | `/math/noise/classicNoise3d.ts` | 🔥 HIGH | 0.5h |
| Voronoi | `utils/webgpu/nodes/noise/voronoi.ts` | `/math/noise/voronoi.ts` | 🔥 HIGH | 1h |

**Total:** 3 NEW modules, 2 hours

### Helper Utilities — 5 modules

| Module | File | Port Target | Priority | Effort |
|--------|------|-------------|----------|--------|
| Smooth Min | `utils/webgpu/nodes/helpers/smooth-min.ts` | `/math/core/smoothMin.ts` | 🟡 MEDIUM | 0.5h |
| Smooth Mod | `utils/webgpu/nodes/helpers/smooth-mod.ts` | `/math/core/smoothMod.ts` | 🟡 MEDIUM | 0.5h |
| Remap | `utils/webgpu/nodes/helpers/remap.ts` | `/math/core/remap.ts` | 🔥 HIGH | 0.5h |
| Rotate 3D Y | `utils/webgpu/nodes/helpers/rotate-3d-y.ts` | `/math/transforms/rotate3dY.ts` | 🟡 MEDIUM | 0.5h |
| Compose | `utils/webgpu/nodes/helpers/compose.ts` | `/math/core/compose.ts` | 🟡 MEDIUM | 0.5h |

**Total:** 5 modules, 2.5 hours

**PRIORITY 2 TOTAL:** 22 modules, 38.5 hours

---

## 🟡 Priority 3: tsl-textures-main (⭐⭐⭐⭐⭐)

**Source:** `RESOURCES/REPOSITORIES/portfolio examples/tsl-textures-main`  
**License:** MIT  
**Three.js Version:** r180  
**Quality:** ⭐⭐⭐⭐⭐ Polished library, 53 textures

### Foundation (MUST PORT FIRST) — 1 module

| Module | File | Port Target | Priority | Effort |
|--------|------|-------------|----------|--------|
| TSL Utils | `tsl-utils.js` | `/math/tslUtils.ts` | 🔥 HIGH | 4h |

**Note:** This module provides foundational utilities used by ALL other textures

### Essential Textures (Phase 4) — 15 modules

| Texture | File | Port Target | Priority | Effort |
|---------|------|-------------|----------|--------|
| Wood | `wood.js` | `/materials/procedural/wood.ts` | 🔥 HIGH | 1.5h |
| Marble | `marble.js` | `/materials/procedural/marble.ts` | 🔥 HIGH | 1.5h |
| Rust | `rust.js` | `/materials/procedural/rust.ts` | 🔥 HIGH | 1h |
| Cork | `cork.js` | `/materials/procedural/cork.ts` | 🟡 MEDIUM | 1h |
| Concrete | `concrete.js` | `/materials/procedural/concrete.ts` | 🟡 MEDIUM | 1h |
| Clouds | `clouds.js` | `/materials/procedural/clouds.ts` | 🔥 HIGH | 1.5h |
| Turbulent Smoke | `turbulent-smoke.js` | `/materials/procedural/smoke.ts` | 🟡 MEDIUM | 1.5h |
| Planet | `planet.js` | `/materials/procedural/planet.ts` | 🟡 MEDIUM | 2h |
| Gas Giant | `gas-giant.js` | `/materials/procedural/gasGiant.ts` | 🟡 MEDIUM | 2h |
| Grid | `grid.js` | `/math/patterns/grid.ts` | 🔥 HIGH | 1h |
| Circles | `circles.js` | `/math/patterns/circles.ts` | 🟡 MEDIUM | 1h |
| Voronoi Cells | `voronoi-cells.js` | `/math/patterns/voronoi.ts` | 🔥 HIGH | 1.5h |
| Neon Lights | `neon-lights.js` | `/materials/emissive/neon.ts` | 🟡 MEDIUM | 1.5h |
| Caustics | `caustics.js` | `/lighting/effects/caustics.ts` | 🟡 MEDIUM | 2h |
| Water Drops | `water-drops.js` | `/materials/effects/waterDrops.ts` | 🟡 MEDIUM | 1.5h |

**Total:** 15 essential modules, 22 hours

### Additional Textures (Phase 6+) — 38 modules

**Organic Patterns:** Tiger Fur, Dalmatian Spots, Zebra Lines, Brain, Veins, Protozoa (6)  
**Space & Atmosphere:** Stars, Dyson Sphere (2)  
**Geometric:** Polka Dots, Circle Decor, Bricks, Roman Paving, Isolines, Isolayers (6)  
**Artistic:** Scream, Darth Maul, Cave Art (3)  
**Fabrics:** Satin, Crumpled Fabric, Camouflage (3)  
**Shapes:** Supersphere, Watermelon, Runny Eggs (3)  
**Noise:** Static Noise (1)  
**Transforms:** Rotator, Translator, Scaler, Melter (4)  
**Other:** Rough Clay, Karst Rock, etc. (10)

**Total:** 38 modules, 60 hours (deferred to Phase 6)

**PRIORITY 3 TOTAL:** 16 modules (Phase 4), 26 hours

---

## 🟡 Priority 4: TSLwebgpuExamples (⭐⭐⭐⭐)

**Source:** `RESOURCES/REPOSITORIES/TSLwebgpuExamples/*`  
**License:** Various  
**Quality:** ⭐⭐⭐⭐ Functional demos, good variety

### Particle Systems — 6 modules

| Project | Key Files | Port Target | Priority | Effort |
|---------|-----------|-------------|----------|--------|
| three.js-tsl-particles-system | `src/**/*.js` | `/particles/systems/basic.ts` | 🔥 HIGH | 3h |
| tsl-compute-particles | `src/*.js` | `/particles/systems/compute.ts` | 🔥 HIGH | 3h |
| tsl-particle-waves | `src/*.js` | `/particles/systems/waves.ts` | 🟡 MEDIUM | 3h |
| tsl-particles-of-a-thousand-faces | `src/**/*.tsx` | `/particles/systems/instanced.ts` | 🟡 MEDIUM | 3h |
| webgpu-tsl-linkedparticles | `src/**/*.tsx` | `/particles/systems/linked.ts` | 🟡 MEDIUM | 3h |
| webgputest-particlesSDF | `src/**/*.ts` | `/particles/systems/sdf.ts` | 🟡 MEDIUM | 3h |

**Total:** 6 modules, 18 hours

### Fluid Simulations — 4 modules

| Project | Key Files | Port Target | Priority | Effort |
|---------|-----------|-------------|----------|--------|
| Splash-main | `mls-mpm/*.wgsl`, `render/*.wgsl` | `/physics/fluids/mlsMpm.ts` | 🟡 MEDIUM | 4h |
| WaterBall-main | `*.wgsl` | `/physics/fluids/waterBall.ts` | 🟡 MEDIUM | 4h |
| fluidglass-main | `src/**/*.js`, `*.frag` | `/materials/glass/fluid.ts` | 🟡 MEDIUM | 4h |
| interactwave-main | `src/**/*.js`, `*.frag` | `/physics/fluids/interactiveWave.ts` | 🟡 MEDIUM | 4h |

**Total:** 4 modules, 16 hours

### Physics & Simulations — 3 modules

| Project | Key Files | Port Target | Priority | Effort |
|---------|-----------|-------------|----------|--------|
| softbodies-master | `src/**/*.js` | `/physics/softbody/basic.ts` | 🟡 MEDIUM | 3h |
| breeze-main | `src/**/*.js` | `/physics/wind/breeze.ts` | 🟡 MEDIUM | 3h |
| flow-master | `src/**/*.js` | `/physics/flow/basic.ts` | 🟡 MEDIUM | 3h |

**Total:** 3 modules, 9 hours

### Post-Processing & Effects — 3 modules

| Project | Key Files | Port Target | Priority | Effort |
|---------|-----------|-------------|----------|--------|
| singularity-master | `src/**/*.js` | `/postfx/pipelines/singularity.ts` | 🟢 LOW | 4h |
| ssgi-ssr-painter | `src/*.js` | `/postfx/advanced/ssgi.ts` | 🟢 LOW | 4h |
| ssr-gtao-keio | `src/*.js` | `/postfx/advanced/ssrGtao.ts` | 🟢 LOW | 4h |

**Total:** 3 modules, 12 hours (deferred to Phase 6)

### Raymarching & SDFs — 1 module

| Project | Key Files | Port Target | Priority | Effort |
|---------|-----------|-------------|----------|--------|
| raymarching-tsl-main | `src/**/*.jsx` | `/fields/raymarch/basic.ts` | 🟡 MEDIUM | 4h |

**Total:** 1 module, 4 hours

### Utility Libraries — 1 module

| Project | Key Files | Port Target | Priority | Effort |
|---------|-----------|-------------|----------|--------|
| three-pinata-main | `lib/**/*.ts` | `/math/pinata/*` | 🟡 MEDIUM | 6h |

**Total:** 1 module, 6 hours (deferred to Phase 6)

**PRIORITY 4 TOTAL (Phase 4):** 14 modules, 47 hours

---

## 📊 Summary by Phase

### Phase 4 Targets (Week 4-8)

| Source | Modules | Hours | Notes |
|--------|---------|-------|-------|
| fragments-boilerplate | 26 | 21 | Foundation (noise, SDF, post-FX) |
| portfolio-main | 22 | 38.5 | Infrastructure + compute |
| tsl-textures | 16 | 26 | Essential textures |
| TSLwebgpuExamples | 14 | 47 | Particles + physics |
| **TOTAL** | **78** | **132.5** | **Core engine modules** |

### Phase 6+ Targets (Week 18-20)

| Source | Modules | Hours | Notes |
|--------|---------|-------|-------|
| tsl-textures (remaining) | 38 | 60 | Additional textures |
| TSLwebgpuExamples (advanced) | 4 | 18 | SSGI, SSR, GTAO, singularity |
| three-pinata | 5 | 6 | Utility library |
| **TOTAL** | **47** | **84** | **Polish & extras** |

### Grand Total

| Category | Modules | Hours |
|----------|---------|-------|
| Phase 4 | 78 | 132.5 |
| Phase 6+ | 47 | 84 |
| **TOTAL** | **125** | **216.5** |

---

## 🎯 Recommended Port Order

### Week 4: Foundation (26 modules, 21 hours)

**From fragments-boilerplate:**
1. All noise modules (8 modules, 4 hours)
2. All SDF modules (2 modules, 3 hours)
3. Core utilities (10 modules, 8 hours)
4. Post-FX effects (6 modules, 6 hours)

### Week 5: Infrastructure (25 modules, 40.5 hours)

**From portfolio-main:**
1. BaseExperience + Pointer + Compose (3 modules, 4 hours)
2. Compute patterns (4 modules, 12 hours)
3. Materials & shaders (7 modules, 18 hours)
4. Noise NEW (3 modules, 2 hours)
5. Helper utilities (5 modules, 2.5 hours)

**From tsl-textures:**
1. TSL Utils foundation (1 module, 4 hours)

### Week 6: Materials (15 modules, 22 hours)

**From tsl-textures:**
1. Wood, marble, rust, cork, concrete (5 modules, 6 hours)
2. Clouds, smoke, planet, gas giant (4 modules, 7 hours)
3. Grid, circles, voronoi, neon, caustics, water drops (6 modules, 9 hours)

### Week 7: Particles (6 modules, 18 hours)

**From TSLwebgpuExamples:**
1. three.js-tsl-particles-system (3h)
2. tsl-compute-particles (3h)
3. tsl-particle-waves (3h)
4. tsl-particles-of-a-thousand-faces (3h)
5. webgpu-tsl-linkedparticles (3h)
6. webgputest-particlesSDF (3h)

### Week 8: Physics (8 modules, 31 hours)

**From TSLwebgpuExamples:**
1. Fluids: Splash, WaterBall, fluidglass, interactwave (4 modules, 16 hours)
2. Physics: softbodies, breeze, flow (3 modules, 9 hours)
3. Raymarching (1 module, 4 hours)

---

## 🔗 Dependency Map

```
Phase 4 Dependencies:

Week 4 (Foundation):
  fragments-boilerplate/noise → (no dependencies)
  fragments-boilerplate/sdf → (no dependencies)
  fragments-boilerplate/utilities → (no dependencies)

Week 5 (Infrastructure):
  portfolio-main/BaseExperience → (no dependencies)
  portfolio-main/compute → depends on BaseExperience
  tsl-textures/tsl-utils → (no dependencies, but required for Week 6)

Week 6 (Materials):
  tsl-textures/* → depends on tsl-utils (Week 5)
  tsl-textures/* → depends on noise (Week 4)

Week 7 (Particles):
  TSLwebgpuExamples/particles → depends on compute patterns (Week 5)

Week 8 (Physics):
  TSLwebgpuExamples/fluids → depends on compute patterns (Week 5)
  TSLwebgpuExamples/physics → depends on compute patterns (Week 5)
```

---

## 📝 Licensing & Attribution

**MIT Licensed (Confirmed):**
- fragments-boilerplate-main ✅
- tsl-textures-main ✅

**Check License (Action Required):**
- portfolio-main (likely personal/open source)
- blog.maximeheckel.com (likely personal/open source)
- TSLwebgpuExamples/* (various, check individual projects)

**Attribution Policy:**
- Maintain original LICENSE files with ported modules
- Add comments citing source:
  ```ts
  /**
   * Ported from: fragments-boilerplate-main/src/tsl/noise/perlin_noise_3d.ts
   * Original author: [Name]
   * License: MIT
   */
  ```

---

**End of Resource Inventory v2.0**

See [PORT_MAPPING.md](./PORT_MAPPING.md) for detailed source → target mapping.


