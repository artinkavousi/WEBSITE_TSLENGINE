# 🚀 Quick Start Guide

**Get up and running with the TSL/WebGPU Engine project in 10 minutes**

---

## 📖 What is This?

This is a **quick reference** for developers who want to jump straight into implementation without reading 100+ pages of documentation.

**If you're new:** Start here, then dive into specific docs as needed.  
**If you're experienced:** This is your cheat sheet.

---

## 🎯 Project At a Glance

### What We're Building

1. **TSL-Kit Engine** — A TSL/WebGPU module library (like Three.js + RxJS + shadertoy)
2. **LABS Website** — Interactive showcase with 30+ demos (like Maxime Heckel's blog + Fragments Supply)

### Stack

**Engine:** Three.js r181+, TypeScript, Rollup  
**Website:** Next.js 14, R3F, Tailwind, MDX, Tweakpane

### Timeline

**20 weeks** (5 phases) to go from zero to deployed

---

## 📂 Where Everything Lives

```
/
├── TSLENGINE/UNIFIED_PROPOSAL/     ← Planning docs (you are here)
├── packages/tsl-kit/               ← Engine (will be created)
├── LABS/web/                       ← Website (will be created)
└── RESOURCES/                      ← Source material (existing)
    ├── REPOSITORIES/               ← Code to port from
    │   ├── portfolio examples/     ← Priority 1-3 sources
    │   └── TSLwebgpuExamples/      ← Priority 4-5 sources
    └── DOCS/                       ← Reference docs
```

---

## 🗺️ Documentation Map

| Need to... | Read this... | Time |
|-----------|--------------|------|
| **Understand the vision** | `README.md` → `SUMMARY.md` | 15 min |
| **See the big picture** | `UNIFIED_ENGINE_PROPOSAL.md` (Sections 1-2) | 30 min |
| **Start coding** | `IMPLEMENTATION_ROADMAP.md` (Phase 0) | 20 min |
| **Port a module** | `PORT_MAPPING.md` + `RESOURCE_INVENTORY.md` | 10 min |
| **Find a specific module** | `RESOURCE_INVENTORY.md` (use Ctrl+F) | 2 min |

---

## ⚡ 5-Minute Orientation

### 1. Project Goals

**Engine:**
- 50+ TSL/WebGPU modules (noise, materials, post-FX, particles, physics)
- Drop-in library for any Three.js project
- Agent-friendly JSON schemas

**Website:**
- 30+ interactive LABS showcasing each module
- Schema-driven controls (Tweakpane)
- MDX documentation

### 2. How It Works

```ts
// Engine (simple API)
import { createEngineContext, registerAllEngineModules } from 'tsl-kit'

const engine = createEngineContext({ renderer, scene, camera })
registerAllEngineModules(engine)
engine.attachPostFXPipeline("cinematic")
```

```tsx
// LABS (schema-driven)
const pbrBasicLab: LabSchema = {
  engineConfig: { materials: { metalness: 0.7, roughness: 0.2 } },
  controls: [{ path: 'materials.metalness', label: 'Metalness', ... }]
}
// → Automatically creates Tweakpane UI + MDX docs
```

### 3. Port Philosophy

✅ **Direct port** — Copy working code as-is  
❌ **Don't rewrite** — Only adapt imports/types

**Why:** Minimize bugs, ship faster

---

## 🏁 Getting Started (Phase 0)

### Week 1: Setup Monorepo

```bash
# 1. Initialize workspace
mkdir -p packages/tsl-kit LABS/web
pnpm init

# 2. Create workspace config
echo "packages:\n  - 'packages/*'\n  - 'LABS/*'" > pnpm-workspace.yaml

# 3. Setup Engine package
cd packages/tsl-kit
pnpm init
pnpm add -D typescript @types/node rollup @rollup/plugin-typescript
pnpm add three

# 4. Setup LABS site
cd ../../LABS/web
pnpx create-next-app@latest . --typescript --tailwind --app
pnpm add contentlayer next-contentlayer @react-three/fiber @react-three/drei zustand
```

### Week 2: Core Engine Skeleton

```bash
cd packages/tsl-kit

# Create folder structure
mkdir -p engine/core engine/modules engine/rendering

# Create core files
touch engine/core/types.ts
touch engine/core/registry.ts
touch engine/core/context.ts
```

**In `types.ts`:**

```ts
export type EngineModuleKind = 'material' | 'postfx' | 'field' | 'sim' | 'math'

export interface EngineModule<TConfig = any, THandle = any> {
  meta: {
    id: string
    kind: EngineModuleKind
    label: string
    params?: Array<{ name: string; type: string; default: any }>
  }
  create: (ctx: any, config?: TConfig) => THandle
}
```

**See:** `PORT_MAPPING.md` for complete TypeScript templates

---

## 📦 First Module Port (Week 3)

### Step-by-Step: Port Perlin Noise

**1. Find source file:**

```bash
# Location in RESOURCES:
RESOURCES/REPOSITORIES/portfolio examples/fragments-boilerplate-main/src/tsl/noise/perlin_noise_3d.ts
```

**2. Copy to target:**

```bash
cd packages/tsl-kit
mkdir -p engine/modules/math/noise
cp "../../RESOURCES/.../perlin_noise_3d.ts" "engine/modules/math/noise/perlinNoise3d.ts"
```

**3. Fix imports:**

```ts
// Before
import { vec3, Fn } from 'three/tsl'
import { mod289 } from './common'

// After (adjust relative paths)
import { vec3, Fn } from 'three/tsl'
import { mod289 } from './common' // stays same if copied
```

**4. Wrap in EngineModule:**

```ts
import { EngineModule } from '../../../core/types'
import { perlinNoise3d } from './impl'

export const perlinNoiseModule: EngineModule = {
  meta: {
    id: 'math.perlinNoise3d',
    kind: 'math',
    label: 'Perlin Noise 3D',
    params: [
      { name: 'scale', type: 'number', default: 1.0, min: 0.01, max: 10 }
    ]
  },
  create: (ctx, config) => perlinNoise3d
}
```

**5. Test:**

```bash
pnpm build
# Should compile without errors
```

**See:** `PORT_MAPPING.md` Section "Port Workflow" for complete template

---

## 🧪 Create First LABS Showcase

### Setup Schema

```ts
// LABS/web/app/labs/math/noise-gallery/schema.ts
export const noiseGalleryLab: LabSchema = {
  id: 'math/noise-gallery',
  title: 'Noise Gallery',
  engineConfig: {
    noise: { type: 'perlin', scale: 1.0, octaves: 4 }
  },
  controls: [
    {
      path: 'noise.scale',
      label: 'Scale',
      type: 'number',
      min: 0.01,
      max: 10,
      step: 0.01
    }
  ]
}
```

### Create MDX Page

```mdx
<!-- LABS/web/app/labs/math/noise-gallery/page.mdx -->
import { LabPage } from '@/layouts/LabPage'
import { noiseGalleryLab } from './schema'

<LabPage schema={noiseGalleryLab}>

# Noise Gallery

Explore different noise algorithms used for procedural generation.

**Perlin Noise** is a gradient noise function widely used in computer graphics.

</LabPage>
```

**See:** `docs/LAB showcase implementation.md` for complete LABS structure

---

## 🔍 Finding Modules to Port

### Use Resource Inventory

```bash
# Open RESOURCE_INVENTORY.md
# Use Ctrl+F to search, e.g.:
- "perlin" → find Perlin noise
- "bloom" → find bloom effect
- "sdf" → find SDF shapes
```

### Priority Order

1. **Week 3-5:** Noise, SDF, math (foundation)
2. **Week 6-8:** Post-FX, materials (visible results)
3. **Week 9-11:** Particles, compute (impressive demos)
4. **Week 12-14:** Advanced materials (polish)
5. **Week 15-17:** Physics, fluids (advanced)
6. **Week 18-20:** Extras, deploy

---

## 📋 Cheat Sheet

### Common Commands

```bash
# Build engine
cd packages/tsl-kit && pnpm build

# Start LABS dev
cd LABS/web && pnpm dev

# Type check
pnpm typecheck

# Test
pnpm test
```

### Import Patterns

```ts
// Three.js r181 imports
import { Fn, vec3, uv } from 'three/tsl'
import { WebGPURenderer } from 'three/webgpu'
import { MeshStandardNodeMaterial } from 'three/webgpu'

// Engine imports
import { EngineModule, EngineContext } from '@/engine/core/types'
import { perlinNoise3d } from '@/engine/modules/math/noise'
```

### File Naming

- **TypeScript:** `camelCase.ts` (e.g., `perlinNoise3d.ts`)
- **React:** `PascalCase.tsx` (e.g., `LabPage.tsx`)
- **MDX:** `kebab-case.mdx` (e.g., `noise-gallery.mdx`)

---

## 🆘 Common Issues

### "Module not found: three/tsl"

**Fix:** Check Three.js r181+ installed and imports correct

```bash
pnpm add three@latest
```

### "Type error in Fn()"

**Fix:** Ensure using `Fn` from `three/tsl`, not custom implementation

```ts
import { Fn } from 'three/tsl' // ✅
```

### "React component not rendering"

**Fix:** Check R3F Canvas is setup with WebGPU renderer

```tsx
<Canvas gl={async (canvas) => {
  const renderer = new WebGPURenderer({ canvas })
  await renderer.init()
  return renderer
}}>
```

---

## 📚 Further Reading

### By Topic

**Architecture:** `UNIFIED_ENGINE_PROPOSAL.md` Section 3  
**Modules:** `RESOURCE_INVENTORY.md`  
**Porting:** `PORT_MAPPING.md`  
**Timeline:** `IMPLEMENTATION_ROADMAP.md`  
**LABS:** `docs/LAB showcase implementation.md`

### By Phase

**Phase 0:** `IMPLEMENTATION_ROADMAP.md` Weeks 1-2  
**Phase 1:** `IMPLEMENTATION_ROADMAP.md` Weeks 3-5 + `PORT_MAPPING.md` Section "Phase 1"  
**Phase 2:** Similar pattern for each phase

---

## ✅ Quick Checklist

Before you start coding:

- [ ] Read this Quick Start
- [ ] Skim `SUMMARY.md`
- [ ] Read `IMPLEMENTATION_ROADMAP.md` Phase 0
- [ ] Setup your dev environment
- [ ] Clone the repo (or init new)
- [ ] Install dependencies

Ready to port your first module:

- [ ] Find module in `RESOURCE_INVENTORY.md`
- [ ] Check port details in `PORT_MAPPING.md`
- [ ] Copy source file
- [ ] Fix imports
- [ ] Wrap in `EngineModule`
- [ ] Test compilation
- [ ] Create LABS showcase

---

## 🎉 You're Ready!

**Next Steps:**

1. **Start Phase 0:** Setup monorepo (Week 1)
2. **Create skeleton:** Engine types + registry (Week 2)
3. **Port first module:** Perlin noise (Week 3, Day 1)

**Good luck and have fun! 🚀**

---

**Document:** Quick Start Guide  
**Last Updated:** November 13, 2024  
**Version:** 1.0



