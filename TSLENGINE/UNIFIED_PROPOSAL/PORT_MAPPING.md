# TSL/WebGPU Engine — Port Mapping Table

**Version:** 1.0  
**Date:** November 13, 2024  
**Purpose:** Detailed source → target mapping for every module to be ported

---

## How to Use This Document

This table provides **exact file paths** for:
1. **Source File** — Where the module currently lives
2. **Target File** — Where it will live in `/packages/tsl-kit`
3. **Dependencies** — What other modules it needs
4. **Modifications** — What needs to change during porting

**Color Code:**
- 🔥 **Phase 1** (Weeks 3-5): Foundation
- 🟡 **Phase 2** (Weeks 6-8): Post-FX & Materials
- 🟢 **Phase 3** (Weeks 9-11): Compute & Particles
- 🔵 **Phase 4** (Weeks 12-14): Advanced Materials
- 🟣 **Phase 5** (Weeks 15-17): Physics & Sims
- ⚫ **Phase 6** (Weeks 18-20): Polish & Extras

---

## 🔥 Phase 1: Foundation (Weeks 3-5)

### Noise Modules

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 1.1 | `RESOURCES/REPOSITORIES/portfolio examples/fragments-boilerplate-main/src/tsl/noise/common.ts` | `/packages/tsl-kit/engine/modules/math/noise/common.ts` | `three/tsl` | None | 0.5 |
| 1.2 | `.../fragments-boilerplate-main/src/tsl/noise/perlin_noise_3d.ts` | `/packages/tsl-kit/engine/modules/math/noise/perlinNoise3d.ts` | `common.ts`, `three/tsl` | None | 0.5 |
| 1.3 | `.../fragments-boilerplate-main/src/tsl/noise/simplex_noise_3d.ts` | `/packages/tsl-kit/engine/modules/math/noise/simplexNoise3d.ts` | `common.ts`, `three/tsl` | None | 0.5 |
| 1.4 | `.../fragments-boilerplate-main/src/tsl/noise/simplex_noise_4d.ts` | `/packages/tsl-kit/engine/modules/math/noise/simplexNoise4d.ts` | `common.ts`, `three/tsl` | None | 0.5 |
| 1.5 | `.../fragments-boilerplate-main/src/tsl/noise/curl_noise_3d.ts` | `/packages/tsl-kit/engine/modules/math/noise/curlNoise3d.ts` | `common.ts`, `three/tsl` | None | 0.5 |
| 1.6 | `.../fragments-boilerplate-main/src/tsl/noise/curl_noise_4d.ts` | `/packages/tsl-kit/engine/modules/math/noise/curlNoise4d.ts` | `common.ts`, `three/tsl` | None | 0.5 |
| 1.7 | `.../fragments-boilerplate-main/src/tsl/noise/fbm.ts` | `/packages/tsl-kit/engine/modules/math/noise/fbm.ts` | `common.ts`, noise modules, `three/tsl` | None | 0.5 |
| 1.8 | `.../fragments-boilerplate-main/src/tsl/noise/turbulence.ts` | `/packages/tsl-kit/engine/modules/math/noise/turbulence.ts` | `common.ts`, noise modules, `three/tsl` | None | 0.5 |

**Subtotal:** 8 modules, 4 hours

**Post-Port Actions:**
- Create `/packages/tsl-kit/engine/modules/math/noise/index.ts` exporting all noise functions
- Wrap each in `EngineModule` interface
- Add param schemas (scale, octaves, etc.)

---

### SDF Modules

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 2.1 | `.../fragments-boilerplate-main/src/tsl/utils/sdf/shapes.ts` | `/packages/tsl-kit/engine/modules/fields/sdf/shapes.ts` | `three/tsl` | None | 1.5 |
| 2.2 | `.../fragments-boilerplate-main/src/tsl/utils/sdf/operations.ts` | `/packages/tsl-kit/engine/modules/fields/sdf/operations.ts` | `three/tsl` | None | 1.5 |

**Subtotal:** 2 modules, 3 hours

**Post-Port Actions:**
- Create `/packages/tsl-kit/engine/modules/fields/sdf/index.ts`
- Wrap shapes and operations
- Add param schemas (size, radius, smoothing)

---

### Math Utilities

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 3.1 | `.../fragments-boilerplate-main/src/tsl/utils/math/complex.ts` | `/packages/tsl-kit/engine/modules/math/core/complex.ts` | `three/tsl` | None | 0.5 |
| 3.2 | `.../fragments-boilerplate-main/src/tsl/utils/math/coordinates.ts` | `/packages/tsl-kit/engine/modules/math/coordinates/transforms.ts` | `three/tsl` | None | 0.5 |
| 3.3 | `.../fragments-boilerplate-main/src/tsl/utils/function/screen_aspect_uv.ts` | `/packages/tsl-kit/engine/modules/math/coordinates/screenAspectUV.ts` | `three/tsl` | None | 0.5 |

**Subtotal:** 3 modules, 1.5 hours

---

### Phase 1 Total

**Modules:** 13  
**Hours:** 8.5  
**Dependencies:** `three/tsl` only

---

## 🟡 Phase 2: Post-FX & Materials (Weeks 6-8)

### Post-Processing Effects

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 4.1 | `.../fragments-boilerplate-main/src/tsl/post_processing/vignette_effect.ts` | `/packages/tsl-kit/engine/modules/postfx/cinematic/vignette.ts` | `three/tsl` | None | 1 |
| 4.2 | `.../fragments-boilerplate-main/src/tsl/post_processing/grain_texture_effect.ts` | `/packages/tsl-kit/engine/modules/postfx/cinematic/grain.ts` | `three/tsl` | None | 1 |
| 4.3 | `.../fragments-boilerplate-main/src/tsl/post_processing/pixellation_effect.ts` | `/packages/tsl-kit/engine/modules/postfx/stylized/pixellation.ts` | `three/tsl` | None | 1 |
| 4.4 | `.../fragments-boilerplate-main/src/tsl/post_processing/canvas_weave_effect.ts` | `/packages/tsl-kit/engine/modules/postfx/stylized/canvasWeave.ts` | `three/tsl` | None | 1 |
| 4.5 | `.../fragments-boilerplate-main/src/tsl/post_processing/lcd_effect.ts` | `/packages/tsl-kit/engine/modules/postfx/stylized/lcd.ts` | `three/tsl` | None | 1 |
| 4.6 | `.../fragments-boilerplate-main/src/tsl/post_processing/speckled_noise_effect.ts` | `/packages/tsl-kit/engine/modules/postfx/stylized/speckledNoise.ts` | `three/tsl` | None | 1 |

**Subtotal:** 6 modules, 6 hours

---

### Color & Utility

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 5.1 | `.../fragments-boilerplate-main/src/tsl/utils/color/cosine_palette.ts` | `/packages/tsl-kit/engine/modules/math/color/cosinePalette.ts` | `three/tsl` | None | 0.5 |
| 5.2 | `.../fragments-boilerplate-main/src/tsl/utils/color/tonemapping.ts` | `/packages/tsl-kit/engine/modules/postfx/core/toneMappingOps.ts` | `three/tsl` | None | 0.5 |
| 5.3 | `.../fragments-boilerplate-main/src/tsl/utils/function/bloom.ts` | `/packages/tsl-kit/engine/modules/postfx/cinematic/bloom.ts` | `three/tsl` | None | 1 |

**Subtotal:** 3 modules, 2 hours

---

### Core Infrastructure from portfolio-main

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 6.1 | `.../portfolio-main/src/app/lab/BaseExperience.ts` | `/packages/tsl-kit/engine/core/BaseExperience.ts` | `three/webgpu`, `stats-gl`, `tweakpane` | Remove app-specific logic | 2 |
| 6.2 | `.../portfolio-main/src/utils/webgpu/Pointer.ts` | `/packages/tsl-kit/engine/core/Pointer.ts` | `three` | None | 1 |

**Subtotal:** 2 modules, 3 hours

---

### Phase 2 Total

**Modules:** 11  
**Hours:** 11  

---

## 🟢 Phase 3: Compute & Particles (Weeks 9-11)

### Compute Patterns from portfolio-main

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 7.1 | `.../portfolio-main/src/app/lab/attractor-collisions/webgpu/demo.ts` | `/packages/tsl-kit/engine/modules/sims/particles/attractors.ts` | `three/webgpu`, `three/tsl` | Extract compute logic, remove demo scaffolding | 3 |
| 7.2 | `.../portfolio-main/src/app/lab/flow-field/webgpu/demo.ts` | `/packages/tsl-kit/engine/modules/sims/particles/flowField.ts` | `three/webgpu`, `three/tsl` | Extract compute logic | 3 |
| 7.3 | `.../portfolio-main/src/app/lab/particles-twist/webgpu/demo.ts` | `/packages/tsl-kit/engine/modules/sims/particles/twist.ts` | `three/webgpu`, `three/tsl` | Extract compute logic | 3 |
| 7.4 | `.../portfolio-main/src/app/lab/fbo-particles/useGPGPU.tsx` | `/packages/tsl-kit/engine/modules/sims/particles/gpgpu.ts` | `three`, `@react-three/fiber` | Convert from React hook to plain class | 3 |

**Subtotal:** 4 modules, 12 hours

---

### Particle Systems from TSLwebgpuExamples

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 8.1 | `.../TSLwebgpuExamples/three.js-tsl-particles-system-master/src/**/*.js` | `/packages/tsl-kit/engine/modules/particles/systems/basic.ts` | `three/webgpu`, `three/tsl` | Convert to TypeScript | 3 |
| 8.2 | `.../TSLwebgpuExamples/tsl-compute-particles/src/*.js` | `/packages/tsl-kit/engine/modules/particles/systems/compute.ts` | `three/webgpu`, `three/tsl` | Extract from demo, convert to TS | 3 |

**Subtotal:** 2 modules, 6 hours

---

### Phase 3 Total

**Modules:** 6  
**Hours:** 18  

---

## 🔵 Phase 4: Advanced Materials & Lighting (Weeks 12-14)

### tsl-textures Foundation

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 9.1 | `.../tsl-textures-main/src/tsl-utils.js` | `/packages/tsl-kit/engine/modules/math/tslUtils.ts` | `three/tsl` | Convert to TypeScript | 4 |

**Subtotal:** 1 module, 4 hours

---

### Procedural Materials (High Priority from tsl-textures)

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 10.1 | `.../tsl-textures-main/src/wood.js` | `/packages/tsl-kit/engine/modules/materials/procedural/wood.ts` | `tslUtils.ts`, `three/tsl` | Convert to TS | 2 |
| 10.2 | `.../tsl-textures-main/src/marble.js` | `/packages/tsl-kit/engine/modules/materials/procedural/marble.ts` | `tslUtils.ts`, `three/tsl` | Convert to TS | 2 |
| 10.3 | `.../tsl-textures-main/src/rust.js` | `/packages/tsl-kit/engine/modules/materials/procedural/rust.ts` | `tslUtils.ts`, `three/tsl` | Convert to TS | 2 |
| 10.4 | `.../tsl-textures-main/src/clouds.js` | `/packages/tsl-kit/engine/modules/materials/procedural/clouds.ts` | `tslUtils.ts`, `three/tsl` | Convert to TS | 2 |

**Subtotal:** 4 modules, 8 hours

---

### Pattern Modules (from tsl-textures)

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 11.1 | `.../tsl-textures-main/src/voronoi-cells.js` | `/packages/tsl-kit/engine/modules/math/patterns/voronoi.ts` | `tslUtils.ts`, `three/tsl` | Convert to TS | 2 |
| 11.2 | `.../tsl-textures-main/src/grid.js` | `/packages/tsl-kit/engine/modules/math/patterns/grid.ts` | `tslUtils.ts`, `three/tsl` | Convert to TS | 2 |
| 11.3 | `.../tsl-textures-main/src/circles.js` | `/packages/tsl-kit/engine/modules/math/patterns/circles.ts` | `tslUtils.ts`, `three/tsl` | Convert to TS | 2 |

**Subtotal:** 3 modules, 6 hours

---

### Lighting from portfolio-main

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 12.1 | `.../fragments-boilerplate-main/src/tsl/utils/lighting.ts` | `/packages/tsl-kit/engine/modules/lighting/helpers/lighting.ts` | `three/tsl` | None | 1 |
| 12.2 | New | `/packages/tsl-kit/engine/modules/lighting/lights/directional.ts` | `three/webgpu` | Create from scratch | 1 |
| 12.3 | New | `/packages/tsl-kit/engine/modules/lighting/lights/point.ts` | `three/webgpu` | Create from scratch | 1 |
| 12.4 | New | `/packages/tsl-kit/engine/modules/lighting/lights/spot.ts` | `three/webgpu` | Create from scratch | 1 |

**Subtotal:** 4 modules, 4 hours

---

### Advanced Materials from portfolio-main

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 13.1 | New (based on examples) | `/packages/tsl-kit/engine/modules/materials/pbr/basicPBR.ts` | `three/webgpu` | Create from Three.js MeshStandardNodeMaterial | 2 |
| 13.2 | New (based on examples) | `/packages/tsl-kit/engine/modules/materials/pbr/advancedPBR.ts` | `three/webgpu` | Extend with clearcoat, transmission | 2 |
| 13.3 | New (based on examples) | `/packages/tsl-kit/engine/modules/materials/npr/toon.ts` | `three/tsl` | Create toon ramp material | 2 |

**Subtotal:** 3 modules, 6 hours

---

### Phase 4 Total

**Modules:** 15  
**Hours:** 28  

---

## 🟣 Phase 5: Physics & Sims (Weeks 15-17)

### Fluid Simulations

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 14.1 | `.../TSLwebgpuExamples/Splash-main/mls-mpm/*.wgsl` | `/packages/tsl-kit/engine/modules/physics/fluids/mlsMpm.ts` | `three/webgpu` | Convert WGSL to TSL compute nodes | 4 |
| 14.2 | `.../portfolio-main/src/app/lab/infinite-water/webgpu/demo.ts` | `/packages/tsl-kit/engine/modules/physics/fluids/water.ts` | `three/webgpu`, `three/tsl` | Extract water sim logic | 4 |
| 14.3 | `.../TSLwebgpuExamples/fluidglass-main/src/**/*.js` | `/packages/tsl-kit/engine/modules/materials/glass/fluid.ts` | `three/tsl` | Extract material logic | 4 |

**Subtotal:** 3 modules, 12 hours

---

### Soft Body & Wind

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 15.1 | `.../TSLwebgpuExamples/softbodies-master/src/**/*.js` | `/packages/tsl-kit/engine/modules/physics/softbody/basic.ts` | `three/webgpu` | Extract physics logic | 3 |
| 15.2 | `.../TSLwebgpuExamples/breeze-main/src/**/*.js` | `/packages/tsl-kit/engine/modules/physics/wind/breeze.ts` | `three/webgpu` | Extract wind sim | 3 |

**Subtotal:** 2 modules, 6 hours

---

### Phase 5 Total

**Modules:** 5  
**Hours:** 18  

---

## ⚫ Phase 6: Polish & Extras (Weeks 18-20)

### Utility Library (three-pinata)

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 16.1 | `.../TSLwebgpuExamples/three-pinata-main/lib/**/*.ts` | `/packages/tsl-kit/engine/modules/math/pinata/*.ts` | `three/tsl` | Port useful utilities | 6 |

**Subtotal:** 5 modules (estimated), 6 hours

---

### Additional Procedural Textures

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 17.1 | `.../tsl-textures-main/src/planet.js` | `/packages/tsl-kit/engine/modules/materials/procedural/planet.ts` | `tslUtils.ts`, `three/tsl` | Convert to TS | 1.5 |
| 17.2 | `.../tsl-textures-main/src/gas-giant.js` | `/packages/tsl-kit/engine/modules/materials/procedural/gasGiant.ts` | `tslUtils.ts`, `three/tsl` | Convert to TS | 1.5 |
| 17.3 | `.../tsl-textures-main/src/stars.js` | `/packages/tsl-kit/engine/modules/materials/procedural/stars.ts` | `tslUtils.ts`, `three/tsl` | Convert to TS | 1.5 |
| 17.4 | `.../tsl-textures-main/src/concrete.js` | `/packages/tsl-kit/engine/modules/materials/procedural/concrete.ts` | `tslUtils.ts`, `three/tsl` | Convert to TS | 1.5 |
| 17.5 | `.../tsl-textures-main/src/cork.js` | `/packages/tsl-kit/engine/modules/materials/procedural/cork.ts` | `tslUtils.ts`, `three/tsl` | Convert to TS | 1.5 |
| 17.6 | `.../tsl-textures-main/src/tiger-fur.js` | `/packages/tsl-kit/engine/modules/materials/procedural/fur.ts` | `tslUtils.ts`, `three/tsl` | Convert to TS | 1.5 |
| 17.7 | `.../tsl-textures-main/src/satin.js` | `/packages/tsl-kit/engine/modules/materials/fabric/satin.ts` | `tslUtils.ts`, `three/tsl` | Convert to TS | 1.5 |
| 17.8 | `.../tsl-textures-main/src/neon-lights.js` | `/packages/tsl-kit/engine/modules/materials/emissive/neon.ts` | `tslUtils.ts`, `three/tsl` | Convert to TS | 1.5 |
| 17.9 | `.../tsl-textures-main/src/caustics.js` | `/packages/tsl-kit/engine/modules/lighting/effects/caustics.ts` | `tslUtils.ts`, `three/tsl` | Convert to TS | 2 |
| 17.10 | `.../tsl-textures-main/src/bricks.js` | `/packages/tsl-kit/engine/modules/math/patterns/bricks.ts` | `tslUtils.ts`, `three/tsl` | Convert to TS | 1.5 |

**Subtotal:** 10 modules, 15 hours

---

### Advanced Post-FX

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 18.1 | `.../TSLwebgpuExamples/ssgi-ssr-painter/src/*.js` | `/packages/tsl-kit/engine/modules/postfx/advanced/ssgi.ts` | `three/webgpu` | Extract SSGI implementation | 4 |
| 18.2 | `.../TSLwebgpuExamples/ssr-gtao-keio/src/*.js` | `/packages/tsl-kit/engine/modules/postfx/advanced/ssrGtao.ts` | `three/webgpu` | Extract SSR + GTAO | 4 |

**Subtotal:** 2 modules, 8 hours

---

### Raymarching

| # | Source | Target | Dependencies | Modifications | Hours |
|---|--------|--------|--------------|---------------|-------|
| 19.1 | `.../TSLwebgpuExamples/raymarching-tsl-main/src/**/*.jsx` | `/packages/tsl-kit/engine/modules/fields/raymarch/basic.ts` | `three/tsl` | Extract raymarch logic, convert to TS | 4 |

**Subtotal:** 1 module, 4 hours

---

### Phase 6 Total

**Modules:** 18  
**Hours:** 33  

---

## 📊 Grand Total

| Phase | Modules | Hours | Priority |
|-------|---------|-------|----------|
| **Phase 1** | 13 | 8.5 | 🔥 Foundation |
| **Phase 2** | 11 | 11 | 🟡 Post-FX & Materials |
| **Phase 3** | 6 | 18 | 🟢 Compute & Particles |
| **Phase 4** | 15 | 28 | 🔵 Advanced Materials |
| **Phase 5** | 5 | 18 | 🟣 Physics & Sims |
| **Phase 6** | 18 | 33 | ⚫ Polish & Extras |
| **TOTAL** | **68** | **116.5** | |

---

## 🛠️ Port Workflow (Standard Process)

For each module port:

### 1. Pre-Port Checklist

- [ ] Read source file completely
- [ ] Identify all dependencies
- [ ] Check license compatibility
- [ ] Note any Three.js API usage (check r181 compatibility)
- [ ] Understand module purpose and use cases

### 2. Port Execution

```bash
# 1. Copy file
cp "RESOURCES/.../source.ts" "packages/tsl-kit/engine/modules/.../target.ts"

# 2. Update imports
# Change: import { ... } from '@/tsl/...'
# To:     import { ... } from '../../../math/noise/...'
# Or:     import { ... } from '../../..'

# 3. Check Three.js imports
# Ensure using 'three/tsl' or 'three/webgpu' correctly

# 4. Add module interface
```

### 3. Wrap in EngineModule

```ts
// Example template
import { EngineModule } from '../../core/types'
import { myFunctionNode } from './impl'

export const myModule: EngineModule = {
  meta: {
    id: 'category.moduleName',
    kind: 'math', // or 'material', 'postfx', 'field', 'sim'
    label: 'My Module',
    description: 'What it does',
    tags: ['noise', 'procedural'],
    category: 'Noise',
    params: [
      {
        name: 'scale',
        type: 'number',
        label: 'Scale',
        default: 1.0,
        min: 0.01,
        max: 10,
        step: 0.01,
      },
    ],
  },
  defaultConfig: {
    scale: 1.0,
  },
  create: (ctx, config) => {
    return myFunctionNode(config.scale)
  },
}
```

### 4. Test

```bash
# Import in test file
import { myModule } from './moduleName'

# Verify compiles
pnpm build

# Test in LABS
```

### 5. Documentation

- Add JSDoc comments
- Update module index.ts
- Create LABS showcase page (if Phase 2+)

---

## ⚠️ Common Pitfalls & Solutions

### Import Path Issues

**Problem:** `import { uv } from 'three/tsl'` not found  
**Solution:** Check Three.js r181 exports, may need `import { uv } from 'three/nodes'`

### Fn() Usage

**Problem:** `Fn` not working as expected  
**Solution:** Ensure using `Fn` from `three/tsl`, not custom implementation

### React-Specific Code

**Problem:** Porting React component with hooks  
**Solution:** Extract pure logic, convert hooks to classes or functions

### WGSL to TSL Conversion

**Problem:** WGSL compute shader needs TSL equivalent  
**Solution:** Use `tslFn`, `compute`, `storage`, and buffer nodes from Three.js r181

---

## 📝 Port Tracking Template

Use this for each module:

```markdown
## Module: [name]

**Source:** [path]  
**Target:** [path]  
**Phase:** [1-6]  
**Status:** [ ] Not Started / [ ] In Progress / [x] Complete  
**Hours Estimated:** [X]  
**Hours Actual:** [Y]  

**Dependencies:**
- [dep1]
- [dep2]

**Modifications Made:**
- Changed imports from X to Y
- Converted JS to TS
- Wrapped in EngineModule

**Issues Encountered:**
- [issue 1]
- [issue 2]

**Testing:**
- [ ] Compiles without errors
- [ ] LABS showcase created
- [ ] Documented in MDX

**Committed:** [commit hash]
```

## 📁 Source Repository Index

| Repository | Path | Focus | Primary Use Cases |
| --- | --- | --- | --- |
| **fragments-boilerplate-main** | `RESOURCES/REPOSITORIES/portfolio examples/fragments-boilerplate-main` | Canonical WebGPU/TSL helpers (noise, SDF, post-FX) | Phase 1-2 math + post-processing ports |
| **portfolio-main** | `RESOURCES/REPOSITORIES/portfolio examples/portfolio-main` | Production WebGPU labs (compute particles, flows, lighting) | Phase 2-3 compute + advanced lighting |
| **TSLwebgpuExamples** | `RESOURCES/REPOSITORIES/TSLwebgpuExamples` | Stand-alone demos (fluids, raymarching, particles, SSR/SSGI) | Phase 3-6 physics, advanced FX, raymarch |
| **tsl-textures-main** | `RESOURCES/REPOSITORIES/portfolio examples/tsl-textures-main` | Procedural textures + pattern library | Phase 4-6 procedural materials/patterns |
| **three.js-r181** | `RESOURCES/three.js-r181` | Vanilla reference for nodes + renderer APIs | Validation of imports + WebGPU API surface |

> Keep this table updated whenever a new upstream repository is cloned into `RESOURCES/REPOSITORIES/`.

---

## 🔗 Shared Utility Modules to Port First

1. **Module Registry Helpers**  
   - **Source:** `fragments-boilerplate-main/src/tsl/utils/module.js`  
   - **Target:** `packages/tsl-kit/src/core/registryHelpers.ts`  
   - **Reason:** Normalizes registration boilerplate used by most imported modules.

2. **Parameter Schema Builders**  
   - **Source:** `portfolio-main/src/utils/schema/controls.ts`  
   - **Target:** `packages/tsl-kit/src/core/schema/controls.ts`  
   - **Reason:** Used by LABS + admin UI; keeps slider definitions consistent.

3. **Buffer & Texture Pools**  
   - **Source:** `portfolio-main/src/utils/webgpu/bufferPool.ts`  
   - **Target:** `packages/tsl-kit/src/rendering/resources/bufferPool.ts`  
   - **Reason:** Required before compute simulators (Phases 3-5) can share GPU memory.

4. **Renderer Adapters**  
   - **Source:** `TSLwebgpuExamples/three-pinata-main/lib/src/core/RendererController.ts`  
   - **Target:** `packages/tsl-kit/src/rendering/controllers/rendererController.ts`  
   - **Reason:** Abstracts WebGPU/WebGL fallback; needed as soon as labs integrate dynamic modules.

Document these foundational ports in the Phase 1 tracker so downstream module owners can assume a stable API.

---

## 🧪 Validation Checklist by Module Type

| Module Type | Minimal Tests | Additional QA Hooks |
| --- | --- | --- |
| **Math / Noise** | Vitest snapshot against known seeds; ensures determinism | Add LABS plot comparing CPU vs GPU noise |
| **Post-FX** | Visual regression via Playwright screenshot diff (`apps/web/.playwright-mcp/*`) | Performance budget (<0.5 ms @ 1440p) recorded in docs |
| **Materials** | Render sphere + plane scenes, compare shading to source repo | Shader lint + reflection probe sanity check |
| **Particles / Compute** | Headless step test (100 frames) to ensure buffers stay bounded | GPU memory telemetry export for admin dashboard |
| **Physics / Fluids** | Deterministic seeds for 60-frame capture; evaluate stability | Profiling run logged in `LABS/materials/*.mdx` |
| **Raymarch / Fields** | Signed distance evaluations vs expected iso-values | Tweakpane schema verifying every exposed parameter |

Check these boxes inside each module's tracking entry before flipping the status to ✅ Complete.

---

## 📆 Phase Readiness Checklist

| Phase | Prerequisites | What to Verify Before Starting |
| --- | --- | --- |
| 🔥 Phase 1 | `RESEARCH/README.md` todos, `TSLENGINE/plans/phase-todos.md` | Research docs created, foundational utilities (below) assigned |
| 🟡 Phase 2 | Noise/SDF/math packages merged, CI green | Module registry helpers + schema builders live; `packages/tsl-kit` exports versioned |
| 🟢 Phase 3 | Renderer adapters + buffer pools merged, LABS smoke scene working | GPU telemetry + headless tests wired into `pnpm test` |
| 🔵 Phase 4 | Procedural + lighting APIs stable, admin UI reading schemas | Contentlayer + CMS ingestion ready to showcase new materials |
| 🟣 Phase 5 | Physics test harness + profiling docs drafted | Compute budget + memory pool instrumentation committed |
| ⚫ Phase 6 | Website + AI assistants feature-complete | Regression suite + screenshot baselines captured in `.playwright-mcp/` |

Gate every kickoff with a quick review of this table so downstream work does not block on missing infrastructure.

---

## 🗂️ Module Claim Workflow

1. **Claim** — Add your name + status emoji beside the row in this document (or cross-link to an issue).  
2. **Branch** — `git checkout -b feat/phaseX/<module-name>` to keep refs consistent.  
3. **Port & Test** — Follow the workflow template above, ensuring Vitest + LABS checks are run locally.  
4. **Document** — Update the relevant section (e.g., `PORT_MAPPING.md`, `TSLENGINE/plans/phase-todos.md`, LABS doc).  
5. **Review** — Open a PR with links to screenshots/recordings and the updated tracker row.  
6. **Merge & Tag** — After approval, merge and increment `packages/tsl-kit` version if the public API changed.

This cycle keeps module ownership visible and ties every PR back to the planning artifacts.

---


---

**End of Port Mapping**


