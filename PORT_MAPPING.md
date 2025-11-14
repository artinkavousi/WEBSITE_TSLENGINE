# Port Mapping — Source to Target Module Map

> **Purpose**: Map all 150+ modules from source repositories to target locations  
> **Status**: Phase 1 - Initial Structure  
> **Last Updated**: November 13, 2025

---

## Overview

This document maps source files from RESOURCES to target modules in `packages/tsl-kit/src/modules/`.

### Priority Levels
- 🔴 **High** - Essential for Phase 2 (core functionality)
- 🟡 **Medium** - Phase 3 (extended features)
- 🟢 **Low** - Phase 3 (nice-to-have)

### Status
- ⏳ **Pending** - Not yet ported
- 🚧 **In Progress** - Currently being ported
- ✅ **Complete** - Ported and tested

---

## Materials (30+ modules)

### Core PBR (8 modules) - 🔴 High Priority

| Source | Target | Priority | Status | Phase | Notes |
|--------|--------|----------|--------|-------|-------|
| `portfolio-main/src/utils/webgpu/materials/standard.ts` | `modules/materials/pbr-standard.ts` | 🔴 High | ⏳ Pending | Phase 2 | Standard PBR |
| `portfolio-main/src/utils/webgpu/materials/clearcoat.ts` | `modules/materials/pbr-clearcoat.ts` | 🔴 High | ⏳ Pending | Phase 3 | PBR + clearcoat |
| `portfolio-main/src/utils/webgpu/materials/sheen.ts` | `modules/materials/pbr-sheen.ts` | 🔴 High | ⏳ Pending | Phase 3 | PBR + sheen |
| `portfolio-main/src/utils/webgpu/materials/transmission.ts` | `modules/materials/pbr-transmission.ts` | 🔴 High | ⏳ Pending | Phase 3 | Glass/transmission |
| `portfolio-main/src/utils/webgpu/materials/subsurface.ts` | `modules/materials/pbr-subsurface.ts` | 🔴 High | ⏳ Pending | Phase 3 | SSS |
| `portfolio-main/src/utils/webgpu/materials/anisotropic.ts` | `modules/materials/pbr-anisotropic.ts` | 🔴 High | ⏳ Pending | Phase 3 | Anisotropic |
| Custom implementation | `modules/materials/car-paint.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | Car paint shader |
| Custom implementation | `modules/materials/fabric.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | Fabric material |

### Emissive/FX (8 modules) - 🔴 High Priority

| Source | Target | Priority | Status | Phase | Notes |
|--------|--------|----------|--------|-------|-------|
| `portfolio-main/src/utils/webgpu/materials/emissive.ts` | `modules/materials/emissive-glow.ts` | 🔴 High | ⏳ Pending | Phase 2 | Emissive + Fresnel |
| `portfolio-main/src/utils/webgpu/materials/iridescent.ts` | `modules/materials/iridescent.ts` | 🔴 High | ⏳ Pending | Phase 2 | Thin-film interference |
| Custom implementation | `modules/materials/neon-glass.ts` | 🔴 High | ⏳ Pending | Phase 3 | Neon glass |
| Custom implementation | `modules/materials/glitch.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | Glitch shader |
| Custom implementation | `modules/materials/fresnel-glow.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | Fresnel glow |
| Custom implementation | `modules/materials/pulse.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | Pulsing emissive |
| Custom implementation | `modules/materials/scanline.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | Scanline effect |
| Custom implementation | `modules/materials/matrix.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | Matrix rain |

---

## Noise & Math (10+ modules)

### Noise Functions (6 modules) - 🔴 High Priority

| Source | Target | Priority | Status | Phase | Notes |
|--------|--------|----------|--------|-------|-------|
| `portfolio-main/src/utils/webgpu/nodes/noise/simplexNoise3d.ts` | `modules/math/simplex-noise-3d.ts` | 🔴 High | ⏳ Pending | Phase 2 | 3D Simplex noise |
| `portfolio-main/src/utils/webgpu/nodes/noise/curlNoise.ts` | `modules/math/curl-noise.ts` | 🔴 High | ⏳ Pending | Phase 2 | Curl noise |
| `portfolio-main/src/utils/webgpu/nodes/noise/voronoi.ts` | `modules/math/voronoi.ts` | 🔴 High | ⏳ Pending | Phase 2 | Voronoi/Worley |
| `portfolio-main/src/utils/webgpu/nodes/noise/fbm.ts` | `modules/math/fbm.ts` | 🔴 High | ⏳ Pending | Phase 2 | FBM compositor |
| Custom implementation | `modules/math/perlin-noise.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | Perlin noise |
| Custom implementation | `modules/math/value-noise.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | Value noise |

---

## Post-Processing (20+ modules)

### Core Post-FX (5 modules) - 🔴 High Priority

| Source | Target | Priority | Status | Phase | Notes |
|--------|--------|----------|--------|-------|-------|
| `@react-three/postprocessing` or custom | `modules/postfx/bloom.ts` | 🔴 High | ⏳ Pending | Phase 2 | Multi-scale bloom |
| `portfolio-main` or custom | `modules/postfx/vignette.ts` | 🔴 High | ⏳ Pending | Phase 2 | Vignette effect |
| `portfolio-main` or custom | `modules/postfx/chromatic-aberration.ts` | 🔴 High | ⏳ Pending | Phase 2 | CA effect |
| Custom implementation | `modules/postfx/tone-mapping.ts` | 🔴 High | ⏳ Pending | Phase 3 | ACES, Filmic |
| Custom implementation | `modules/postfx/exposure.ts` | 🔴 High | ⏳ Pending | Phase 3 | Exposure control |

---

## Particles (18 modules)

### Core Particles (4 modules) - 🔴 High Priority

| Source | Target | Priority | Status | Phase | Notes |
|--------|--------|----------|--------|-------|-------|
| `TSLwebgpuExamples/tsl-compute-particles` | `modules/particles/basic-gpu.ts` | 🔴 High | ⏳ Pending | Phase 2 | Basic GPU particles |
| Custom implementation | `modules/particles/emitter-point.ts` | 🔴 High | ⏳ Pending | Phase 2 | Point emitter |
| Custom implementation | `modules/particles/updater.ts` | 🔴 High | ⏳ Pending | Phase 3 | Compute updater |
| Custom implementation | `modules/particles/renderer.ts` | 🔴 High | ⏳ Pending | Phase 3 | Instanced renderer |

---

## Lighting (12 modules)

### Lights & Environment (4 modules) - 🔴 High Priority

| Source | Target | Priority | Status | Phase | Notes |
|--------|--------|----------|--------|-------|-------|
| `portfolio-main` or `three.js-r181` | `modules/lighting/hdri-environment.ts` | 🔴 High | ⏳ Pending | Phase 2 | HDRI + IBL |
| `three.js-r181/examples` | `modules/lighting/directional-light.ts` | 🔴 High | ⏳ Pending | Phase 2 | Directional light |
| Custom implementation | `modules/lighting/procedural-sky.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | Physical sky |
| Custom implementation | `modules/lighting/reflection-probes.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | Reflection probes |

---

## Physics & Simulation (12 modules)

### Fluids (4 modules) - 🟡 Medium Priority

| Source | Target | Priority | Status | Phase | Notes |
|--------|--------|----------|--------|-------|-------|
| `TSLwebgpuExamples/breeze-main` | `modules/physics/fluid-2d-smoke.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | 2D smoke sim |
| `TSLwebgpuExamples/Splash-main` | `modules/physics/fluid-2d-water.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | 2D water sim |
| Custom implementation | `modules/physics/fluid-2d-ink.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | Ink/dye injection |
| `TSLwebgpuExamples/WaterBall-main` | `modules/physics/fluid-3d.ts` | 🟢 Low | ⏳ Pending | Phase 3 | 3D metaballs |

---

## Fields & SDF (16 modules)

### SDF Primitives (6 modules) - 🟡 Medium Priority

| Source | Target | Priority | Status | Phase | Notes |
|--------|--------|----------|--------|-------|-------|
| `TSLwebgpuExamples/raymarching-tsl-main` | `modules/fields/sdf-sphere.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | Sphere SDF |
| `TSLwebgpuExamples/raymarching-tsl-main` | `modules/fields/sdf-box.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | Box SDF |
| `TSLwebgpuExamples/raymarching-tsl-main` | `modules/fields/sdf-capsule.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | Capsule SDF |
| Custom implementation | `modules/fields/sdf-torus.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | Torus SDF |
| Custom implementation | `modules/fields/sdf-gyroid.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | Gyroid SDF |
| Custom implementation | `modules/fields/sdf-ops.ts` | 🟡 Medium | ⏳ Pending | Phase 3 | Boolean ops |

---

## Summary Statistics

| Category | Total Modules | High Priority | Medium Priority | Low Priority | Phase 2 | Phase 3 |
|----------|---------------|---------------|-----------------|--------------|---------|---------|
| Materials | 30+ | 16 | 12 | 2 | 3 | 27+ |
| Lighting | 12 | 2 | 8 | 2 | 2 | 10 |
| Post-FX | 20+ | 3 | 12 | 5+ | 3 | 17+ |
| Particles | 18 | 2 | 12 | 4 | 2 | 16 |
| Fields/SDF | 16 | 0 | 16 | 0 | 0 | 16 |
| Physics | 12 | 0 | 9 | 3 | 0 | 12 |
| Geometry | 10 | 0 | 4 | 6 | 0 | 10 |
| Animation | 8 | 0 | 6 | 2 | 0 | 8 |
| Math | 20 | 4 | 12 | 4 | 4 | 16 |
| I/O | 8 | 0 | 6 | 2 | 0 | 8 |
| Debug | 6 | 0 | 0 | 6 | 0 | 6 |
| **TOTAL** | **150+** | **27** | **97** | **36+** | **14** | **136+** |

---

## Notes

1. **Source Repositories**:
   - `portfolio-main` = `RESOURCES/REPOSITORIES/portfolio examples/portfolio-main/`
   - `TSLwebgpuExamples` = `RESOURCES/REPOSITORIES/TSLwebgpuExamples/`
   - `three.js-r181` = `RESOURCES/three.js-r181/examples/`

2. **Phase 2 Focus**: 14 essential modules (materials, noise, post-FX, particles, lighting)

3. **Phase 3 Expansion**: 136+ additional modules across all categories

4. **Custom Implementation**: Modules marked "Custom implementation" will be built from scratch using patterns learned from source repos

---

**Status**: Phase 1 - Mapping in Progress  
**Next Step**: Deep analysis of each source repository to complete detailed mappings

