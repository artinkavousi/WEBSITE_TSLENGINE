# TSL-KIT WebGPU Engine & Website — 4-Phase Implementation Plan

> **Project**: Engine-First Website with TSL/WebGPU Engine  
> **Target**: Three.js r181+ • WebGPU-first • TSL  
> **Date**: November 13, 2025  
> **Status**: Ready for Implementation

---

## 🎯 Project Vision

Build a **self-contained, plug-and-play TSL/WebGPU engine** on Three.js r181+ that powers an **engine-first website** with:
- **150+ pre-built modules** (materials, post-FX, particles, fields, compute, noise, lighting, SDFs)
- **Persistent R3F/Three canvas** across all pages
- **Schema-driven architecture** with auto-generated UI controls
- **Dual AI assistants** (UX Copilot + Builder Agent with PR workflow)
- **RAG-powered knowledge base**
- **Production-ready** with WebGPU→WebGL fallback, testing, CI/CD

---

## 📋 4-Phase Strategy Overview

### Phase 1: Foundation & Research (2-3 weeks)
**Goal**: Complete project setup, research, learning, and all preparatory work  
**Deliverable**: Fully configured monorepo with all dependencies, documentation, and research complete

### Phase 2: Core Engine & Essential Infrastructure (3-4 weeks)
**Goal**: Build fully working core WebGPU engine with essential modules  
**Deliverable**: Functional engine package with renderer, lifecycle system, and 10-15 core modules

### Phase 3: Extended Engine & Module Library (4-6 weeks)
**Goal**: Port all 150+ modules and complete engine features  
**Deliverable**: Complete engine library with all materials, post-FX, particles, physics, etc.

### Phase 4: Website, UI & Polish (3-4 weeks)
**Goal**: Build website pages, AI assistants, admin dashboard, and production deployment  
**Deliverable**: Fully deployed, production-ready website with all features

---

## 🔄 Phase Completion Criteria

Each phase MUST meet these criteria before proceeding:

### ✅ Phase Completion Checklist
- [ ] All planned features implemented
- [ ] All tests passing (unit + integration where applicable)
- [ ] No critical bugs or blockers
- [ ] Documentation updated
- [ ] Code reviewed and validated
- [ ] Deployable/testable build working
- [ ] Next phase dependencies clearly identified

---

## 📦 PHASE 1: Foundation & Research

**Duration**: 2-3 weeks  
**Focus**: Setup, research, learning, structure preparation

### 1.1 Project Structure Setup

#### Monorepo Architecture
```
root/
├── packages/
│   └── tsl-kit/                    # Portable engine (core package)
│       ├── src/
│       │   ├── core/              # Lifecycle, registry, context, types
│       │   ├── rendering/         # Renderer factory, backends
│       │   ├── modules/           # Engine modules (initially empty)
│       │   ├── utils/             # Math, buffers, helpers
│       │   └── index.ts           # Public API exports
│       ├── package.json
│       └── tsconfig.json
├── apps/
│   └── web/                        # Next.js website
│       ├── app/                   # App router pages
│       ├── components/            # React components
│       ├── lib/                   # Utilities, stores, AI
│       ├── public/                # Static assets
│       ├── content/               # MDX posts (Contentlayer)
│       ├── templates/             # 3D templates for MDX
│       ├── LABS/                  # Module showcases
│       ├── package.json
│       └── next.config.js
├── RESOURCES/                      # Source repositories (existing)
│   ├── REPOSITORIES/
│   │   ├── portfolio examples/
│   │   └── TSLwebgpuExamples/
│   ├── DOCS/
│   └── three.js-r181/
├── turbo.json                      # Turborepo config
├── pnpm-workspace.yaml
├── package.json                    # Root workspace
└── README.md
```

#### Tasks
- [ ] Create monorepo structure with `pnpm init` and workspace config
- [ ] Set up `packages/tsl-kit` with TypeScript configuration
- [ ] Set up `apps/web` with Next.js 14+ (App Router)
- [ ] Configure Turborepo for build orchestration
- [ ] Set up Git with `.gitignore`, `.gitattributes` (LFS for large assets)
- [ ] Create initial README.md with project overview

### 1.2 Research & Learning

#### Three.js r181+ WebGPU/TSL Deep Dive
- [ ] Study Three.js r181 WebGPU examples (official)
- [ ] Analyze TSL (Three Shading Language) node system
- [ ] Research WebGPURenderer vs WebGLRenderer differences
- [ ] Study async renderer initialization patterns
- [ ] Review compute shader capabilities and limitations
- [ ] Document WebGPU adapter capability detection

#### Source Repository Analysis
- [ ] **Portfolio Examples (Maxime Heckel)** — Catalog all 30+ WebGPU experiments
  - Materials: clearcoat, sheen, anisotropy, iridescence
  - Noise: Simplex, Curl, Voronoi, Classic
  - Lighting: diffuse, ambient, fresnel, hemisphere
  - Particles: GPGPU, morphing, flow fields
  - Post-FX: TAA, bloom, vignette, chromatic aberration
- [ ] **Fragments Boilerplate** — Extract R3F + WebGPU bootstrap pattern
- [ ] **TSL WebGPU Examples** — Document all working projects:
  - breeze-main (fluid 2D)
  - flow-master (flow fields)
  - raymarching-tsl-main (SDF)
  - tsl-compute-particles (compute)
  - WaterBall-main (metaballs)
- [ ] **Three.js r181 Examples** — Map canonical patterns
- [ ] Create **PORT_MAPPING.md** (source file → target module mapping)

#### Technology Stack Research
- [ ] React 18+ with Server Components
- [ ] Next.js 14+ App Router patterns
- [ ] R3F (React Three Fiber) v9 WebGPU support
- [ ] Zustand for state management
- [ ] Tweakpane for UI controls
- [ ] Zod for schema validation
- [ ] Contentlayer for MDX
- [ ] GSAP for animations
- [ ] Vercel AI SDK for assistants
- [ ] Playwright for E2E testing
- [ ] Vitest for unit testing

### 1.3 Dependency Installation & Configuration

#### Core Dependencies (packages/tsl-kit)
```json
{
  "dependencies": {
    "three": "^0.181.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "@types/three": "^0.181.0",
    "vitest": "^2.1.0"
  }
}
```

#### Website Dependencies (apps/web)
```json
{
  "dependencies": {
    "next": "^15.1.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "three": "^0.181.0",
    "@react-three/fiber": "^9.0.0",
    "@react-three/drei": "^9.119.0",
    "@react-three/postprocessing": "^2.16.0",
    "zustand": "^5.0.0",
    "tweakpane": "^4.0.5",
    "zod": "^3.24.0",
    "zod-to-json-schema": "^3.24.0",
    "contentlayer2": "^0.5.0",
    "next-contentlayer2": "^0.5.0",
    "gsap": "^3.12.0",
    "ai": "^4.0.0",
    "@ai-sdk/openai": "^1.0.0",
    "framer-motion": "^11.15.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "@types/react": "^18.3.0",
    "@types/three": "^0.181.0",
    "playwright": "^1.49.0",
    "vitest": "^2.1.0",
    "@biomejs/biome": "^1.9.0"
  }
}
```

#### Tasks
- [ ] Install all dependencies in both workspaces
- [ ] Configure TypeScript strict mode in both packages
- [ ] Set up Biome for linting and formatting
- [ ] Configure path aliases (`@/`, `@tsl-kit/`)
- [ ] Set up Vitest configuration
- [ ] Set up Playwright configuration
- [ ] Verify all packages resolve correctly

### 1.4 Documentation & Knowledge Base

#### Research Documentation
- [ ] Create `RESEARCH/` directory
- [ ] Document WebGPU capabilities and limitations
- [ ] Document TSL node patterns and best practices
- [ ] Create module porting guidelines
- [ ] Document testing strategies
- [ ] Create architecture decision records (ADRs)

#### API Documentation Structure
- [ ] Set up documentation framework
- [ ] Create module template documentation
- [ ] Document engine lifecycle patterns
- [ ] Create code style guide
- [ ] Document commit and PR conventions

### 1.5 Development Environment

#### Tooling Setup
- [ ] Configure VSCode settings and extensions
- [ ] Set up debug configurations
- [ ] Configure hot reload for both packages
- [ ] Set up dev server scripts
- [ ] Configure environment variables template

#### Git & Version Control
- [ ] Set up branch protection rules
- [ ] Configure commit message conventions
- [ ] Set up pre-commit hooks (lint, typecheck)
- [ ] Create PR templates
- [ ] Document git workflow

### 1.6 CI/CD Foundation

#### GitHub Actions Setup
- [ ] Create `.github/workflows/quality.yml` (typecheck + lint)
- [ ] Create `.github/workflows/test.yml` (unit tests)
- [ ] Configure caching for node_modules and build artifacts
- [ ] Set up workflow permissions
- [ ] Document CI/CD pipeline

---

## ⚙️ PHASE 2: Core Engine & Essential Infrastructure

**Duration**: 3-4 weeks  
**Focus**: Build fully working core WebGPU engine with essential modules

### 2.1 Core Engine Architecture (packages/tsl-kit)

#### Type Definitions & Interfaces
```typescript
// packages/tsl-kit/src/core/types.ts
export interface ModuleContext {
  scene: THREE.Scene;
  root: THREE.Object3D;          // Isolated container for this module
  renderer: THREE.WebGLRenderer | WebGPURenderer;
  events: {
    invalidate: () => void;
    onPresetSave?: (name: string, data: unknown) => void;
  };
  getParam<T = any>(path: string): T;
  setParam(path: string, value: any): void;
}

export interface ModuleCapabilities {
  kind: 'scene' | 'postfx' | 'material' | 'sim' | 'utility';
  backends?: ('webgpu' | 'webgl')[];
  minVersion?: string;
}

export interface EngineModule<TParams = any> {
  id: string;                    // e.g., "particles/burst"
  caps: ModuleCapabilities;
  defaultParams: TParams;
  schema: {
    jsonSchema?: any;
    zod?: any;
  };
  
  // Lifecycle hooks
  init(ctx: ModuleContext, params: TParams): Promise<void> | void;
  mount(ctx: ModuleContext, params: TParams): Promise<void> | void;
  update?(ctx: ModuleContext, dt: number, params: TParams): boolean | void;
  unmount?(ctx: ModuleContext): void;
  dispose?(ctx: ModuleContext): void;
}
```

#### Tasks
- [ ] Create core type definitions
- [ ] Implement `ModuleContext` interface
- [ ] Create `ModuleCapabilities` detection system
- [ ] Define parameter schema interfaces (Zod + JSON Schema)
- [ ] Document lifecycle contract

#### Module Registry
```typescript
// packages/tsl-kit/src/core/registry.ts
export class ModuleRegistry {
  register<T>(module: EngineModule<T>): void;
  get(id: string): EngineModule | undefined;
  list(): EngineModule[];
  findByKind(kind: string): EngineModule[];
}
```

#### Tasks
- [ ] Implement `ModuleRegistry` class
- [ ] Add module validation on registration
- [ ] Implement query methods (by kind, backend, etc.)
- [ ] Add module metadata caching
- [ ] Create registry singleton instance

#### Module Runner
```typescript
// packages/tsl-kit/src/core/runner.ts
export class ModuleRunner {
  async load(moduleId: string, params?: any): Promise<void>;
  tick(dt: number): boolean;  // Returns true if invalidation needed
  setParams(params: any): void;
  unload(): Promise<void>;
  dispose(): void;
}
```

#### Tasks
- [ ] Implement `ModuleRunner` class
- [ ] Handle async init with loading states
- [ ] Implement hot-swap (unmount old → init new)
- [ ] Add error handling and recovery
- [ ] Implement update loop with delta time
- [ ] Add performance monitoring hooks

### 2.2 Renderer & Graphics Backend

#### WebGPU/WebGL Renderer Factory
```typescript
// packages/tsl-kit/src/rendering/factory.ts
export async function createRenderer(
  canvas: HTMLCanvasElement,
  options?: RendererOptions
): Promise<THREE.WebGLRenderer | WebGPURenderer>
```

#### Tasks
- [ ] Implement renderer factory with WebGPU detection
- [ ] Handle async WebGPU initialization
- [ ] Implement WebGL fallback logic
- [ ] Add capability detection (compute, storage buffers, etc.)
- [ ] Configure tone mapping (ACES Filmic)
- [ ] Set up color space (SRGB)
- [ ] Add renderer resize handling
- [ ] Implement `frameloop="demand"` support

#### Backend Capability Detection
- [ ] Detect WebGPU availability (`navigator.gpu`)
- [ ] Query adapter limits (workgroup sizes, buffer sizes)
- [ ] Detect texture format support
- [ ] Detect compute shader support
- [ ] Create capability report interface
- [ ] Add fallback strategy for missing features

### 2.3 Resource Management

#### Resource Lifecycle
```typescript
// packages/tsl-kit/src/core/resources.ts
export class ResourceManager {
  registerTexture(id: string, texture: THREE.Texture): void;
  registerGeometry(id: string, geometry: THREE.BufferGeometry): void;
  registerMaterial(id: string, material: THREE.Material): void;
  dispose(id: string): void;
  disposeAll(): void;
}
```

#### Tasks
- [ ] Implement `ResourceManager` class
- [ ] Track GPU resources (textures, geometries, materials)
- [ ] Implement reference counting
- [ ] Add automatic disposal on unmount
- [ ] Create resource leak detector (dev mode)
- [ ] Add memory usage reporting

### 2.4 Essential Engine Modules (10-15 modules)

#### Category: Materials (3 modules)
1. **Standard PBR Material**
   - [ ] Port from portfolio examples
   - [ ] Add schema with color, metalness, roughness
   - [ ] Wrap in `EngineModule` interface
   - [ ] Add visual test

2. **Emissive/Glow Material**
   - [ ] Port emissive + Fresnel patterns
   - [ ] Add color, intensity, fresnel power params
   - [ ] Wrap and test

3. **Iridescent Material**
   - [ ] Port thin-film interference shader
   - [ ] Add thickness, ior, base color params
   - [ ] Wrap and test

#### Category: Noise/Math (4 modules)
4. **Simplex Noise 2D/3D**
   - [ ] Port from portfolio `simplexNoise3d.ts`
   - [ ] Add scale, offset params
   - [ ] Wrap and test

5. **Curl Noise**
   - [ ] Port curl noise implementation
   - [ ] Add turbulence params
   - [ ] Wrap and test

6. **Voronoi/Worley**
   - [ ] Port Voronoi pattern
   - [ ] Add cell density, distance function params
   - [ ] Wrap and test

7. **FBM (Fractional Brownian Motion)**
   - [ ] Port FBM compositor
   - [ ] Add octaves, lacunarity, gain params
   - [ ] Wrap and test

#### Category: Post-FX (3 modules)
8. **Bloom (Multi-Scale)**
   - [ ] Port from portfolio or postprocessing library
   - [ ] Add intensity, radius, threshold params
   - [ ] Wrap and test

9. **Vignette**
   - [ ] Port vignette effect
   - [ ] Add darkness, offset params
   - [ ] Wrap and test

10. **Chromatic Aberration**
    - [ ] Port CA effect
    - [ ] Add offset, radial distortion params
    - [ ] Wrap and test

#### Category: Particles (2 modules)
11. **Basic GPU Particles**
    - [ ] Port from tsl-compute-particles
    - [ ] Add count, size, velocity params
    - [ ] Wrap and test

12. **Particle Emitter (Point)**
    - [ ] Create simple point emitter
    - [ ] Add emission rate, lifetime params
    - [ ] Wrap and test

#### Category: Lighting (2 modules)
13. **HDRI Environment**
    - [ ] Port HDRI loader and IBL setup
    - [ ] Add exposure, rotation params
    - [ ] Wrap and test

14. **Ambient + Directional Light**
    - [ ] Create light setup module
    - [ ] Add intensity, color, direction params
    - [ ] Wrap and test

### 2.5 Website Core Infrastructure (apps/web)

#### Persistent Canvas Shell
```tsx
// apps/web/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThreeRoot />        {/* Persistent canvas */}
        <UiOverlay>
          {children}
        </UiOverlay>
      </body>
    </html>
  )
}
```

#### Tasks
- [ ] Create `ThreeRoot.tsx` with R3F Canvas
- [ ] Implement renderer factory integration
- [ ] Set up `frameloop="demand"`
- [ ] Add resize observer
- [ ] Create `UiOverlay` component (glassmorphic)
- [ ] Test route transitions (canvas persistence)

#### State Management (Zustand)
```typescript
// apps/web/lib/store.ts
interface EngineStore {
  // Engine slice
  backend: 'auto' | 'webgpu' | 'webgl';
  fpsCap: number;
  
  // Module slice
  activeModuleId: string | null;
  moduleParams: Record<string, any>;
  
  // UI slice
  presets: Record<string, any>;
  
  // Actions
  selectModule: (id: string, params?: any) => void;
  setParam: (path: string, value: any) => void;
  savePreset: (name: string) => void;
  loadPreset: (name: string) => void;
}
```

#### Tasks
- [ ] Create Zustand store with slices
- [ ] Implement parameter path utilities (get/set nested)
- [ ] Add preset save/load to localStorage
- [ ] Create React hooks (`useEngineStore`, `useModuleParams`)
- [ ] Add store devtools integration

#### Scene Resolution System
```typescript
// apps/web/lib/scenes.ts
export function useCurrentScene() {
  const pathname = usePathname()
  const moduleId = sceneRouteMap[pathname]
  return useEngineModule(moduleId)
}
```

#### Tasks
- [ ] Create route → module mapping
- [ ] Implement dynamic scene loader
- [ ] Add loading states
- [ ] Handle module errors gracefully
- [ ] Create default/fallback scene

#### Basic Pages
- [ ] Create home page (`app/page.tsx`) with simple scene
- [ ] Create about page
- [ ] Create `/labs` index page
- [ ] Create `/labs/materials/pbr` showcase page
- [ ] Create `/labs/particles/basic` showcase page

### 2.6 Testing Infrastructure

#### Unit Tests
- [ ] Test `ModuleRegistry` (register, get, list, query)
- [ ] Test `ModuleRunner` lifecycle (load, tick, unload)
- [ ] Test parameter utilities (get/set nested paths)
- [ ] Test resource manager (register, dispose, leak detection)
- [ ] Test store actions (selectModule, setParam, presets)

#### Integration Tests (Playwright)
- [ ] Test: Canvas renders on home page
- [ ] Test: Route change preserves canvas
- [ ] Test: WebGPU fallback to WebGL works
- [ ] Test: Module loads and updates on param change
- [ ] Test: Preset save/load cycle

---

## 🎨 PHASE 3: Extended Engine & Module Library

**Duration**: 4-6 weeks  
**Focus**: Port all 150+ modules and complete engine features

### 3.1 Materials Library (30+ modules)

#### Core PBR (8 modules)
- [ ] Standard PBR (clearcoat variant)
- [ ] Standard PBR (sheen variant)
- [ ] Standard PBR (transmission/glass)
- [ ] Standard PBR (subsurface scattering)
- [ ] Standard PBR (anisotropic)
- [ ] Car paint material
- [ ] Fabric material
- [ ] Skin material (SSS)

#### Stylized/NPR (6 modules)
- [ ] Toon shader (ramp-based)
- [ ] Matcap material
- [ ] Halftone shader
- [ ] Posterization material
- [ ] Ink/sketch material
- [ ] Cel-shaded with outlines

#### Procedural (8 modules)
- [ ] Marble procedural
- [ ] Wood grain procedural
- [ ] Stone/rock procedural
- [ ] Lava/magma material
- [ ] Cloud procedural
- [ ] Water surface material
- [ ] Terrain material (triplanar)
- [ ] Holographic material

#### Emissive/FX (8 modules)
- [ ] Neon glass material
- [ ] Glitch/digital material
- [ ] Fresnel glow material
- [ ] Pulsing emissive
- [ ] Scanline material
- [ ] Matrix rain material
- [ ] Energy shield material
- [ ] Iridescent (full featured)

### 3.2 Lighting & Environment (12 modules)

#### Light Types (5 modules)
- [ ] Point light (with shadows)
- [ ] Spot light (with IES profiles)
- [ ] Area light (rect)
- [ ] Area light (tube/line)
- [ ] Directional light (with cascaded shadows)

#### Environment (4 modules)
- [ ] HDRI loader + IBL
- [ ] Procedural sky (physical)
- [ ] Reflection probes
- [ ] Light probes (spherical harmonics)

#### Shadows (3 modules)
- [ ] PCF shadows
- [ ] PCSS (percentage-closer soft shadows)
- [ ] Contact shadows

### 3.3 Post-Processing (20+ modules)

#### Core Chain (5 modules)
- [ ] Tone mapping (ACES, Filmic, Reinhard)
- [ ] Exposure control
- [ ] Color grading (LUT)
- [ ] Color grading (parametric)
- [ ] Gamma correction

#### Cinematic FX (8 modules)
- [ ] Bloom (multi-scale) ✓ (from Phase 2)
- [ ] Depth of field (bokeh)
- [ ] Motion blur
- [ ] Vignette ✓ (from Phase 2)
- [ ] Film grain
- [ ] Chromatic aberration ✓ (from Phase 2)
- [ ] Lens distortion
- [ ] Anamorphic lens flares

#### Stylized FX (4 modules)
- [ ] Edge detection/outlines
- [ ] Posterization effect
- [ ] Halftone effect
- [ ] Pixelation/mosaic

#### Distortion (3 modules)
- [ ] Heat haze/ripple
- [ ] Shockwave distortion
- [ ] Glitch suite (RGB split, scanlines, blocks)

#### Pipeline Presets (4 presets)
- [ ] Cinematic Default (bloom + DOF + grain + vignette)
- [ ] Neon Arcade (bloom + CA + scanlines)
- [ ] Comic Book (outlines + halftone + posterize)
- [ ] Retro CRT (scanlines + CA + vignette + curvature)

### 3.4 Particles & VFX (18 modules)

#### Core Framework (4 modules)
- [ ] GPU particle buffer system ✓ (basic from Phase 2)
- [ ] Particle updater (compute shader)
- [ ] Particle renderer (instanced)
- [ ] Particle trail/ribbon renderer

#### Emitters (5 modules)
- [ ] Point emitter ✓ (from Phase 2)
- [ ] Sphere emitter
- [ ] Box emitter
- [ ] Cone emitter
- [ ] Mesh surface emitter

#### Forces (5 modules)
- [ ] Gravity force
- [ ] Wind force
- [ ] Drag force
- [ ] Vortex force
- [ ] Noise/turbulence force

#### Particle Presets (4 presets)
- [ ] Sparks/embers
- [ ] Rain
- [ ] Snow
- [ ] Magic trails

### 3.5 Fields, Volumes & SDF (16 modules)

#### Noise Fields (6 modules)
- [ ] Simplex 2D/3D ✓ (from Phase 2)
- [ ] Curl noise ✓ (from Phase 2)
- [ ] Voronoi ✓ (from Phase 2)
- [ ] FBM ✓ (from Phase 2)
- [ ] Perlin noise
- [ ] Value noise

#### SDF Primitives (6 modules)
- [ ] Sphere SDF
- [ ] Box SDF
- [ ] Capsule SDF
- [ ] Torus SDF
- [ ] Gyroid SDF
- [ ] SDF boolean ops (union, subtract, intersect)

#### Volumes & Raymarching (4 modules)
- [ ] 3D texture volume
- [ ] Fog/cloud volume
- [ ] Generic raymarcher
- [ ] Volumetric lighting

### 3.6 Physics & Simulation (12 modules)

#### Rigid Body (2 modules)
- [ ] Kinematic motion
- [ ] Simple collision detection

#### Cloth & Softbody (3 modules)
- [ ] Mass-spring cloth (2D grid)
- [ ] Softbody deformation
- [ ] Jiggle physics

#### Fluids (4 modules)
- [ ] 2D fluid (smoke)
- [ ] 2D fluid (ink/dye)
- [ ] 2D fluid (water)
- [ ] 3D fluid template (advanced)

#### Crowd (3 modules)
- [ ] Boids (separation)
- [ ] Boids (alignment)
- [ ] Boids (cohesion)

### 3.7 Geometry & Mesh (10 modules)

#### Primitives (4 modules)
- [ ] Rounded box
- [ ] Capsule
- [ ] Superquadric
- [ ] Parametric shapes

#### Modifiers (4 modules)
- [ ] Bend modifier
- [ ] Twist modifier
- [ ] Taper modifier
- [ ] Noise displacement

#### Deformation (2 modules)
- [ ] Skeletal skinning
- [ ] Morph targets

### 3.8 Animation & Motion (8 modules)

#### Time (2 modules)
- [ ] Global time node
- [ ] Local time node (scaled, warped)

#### Parametric Motion (3 modules)
- [ ] Oscillators (sin, triangle, square)
- [ ] Easing functions
- [ ] Noise-driven motion

#### Camera (2 modules)
- [ ] Spline-following camera
- [ ] Orbit/rail camera

#### Audio-Reactive (1 module)
- [ ] Audio analyzer + parameter mapper

### 3.9 Math & Utility Library (20 modules)

#### Core Math (5 modules)
- [ ] Vector operations (dot, cross, reflect, refract)
- [ ] Matrix operations
- [ ] Smoothstep/smoothmin/smoothmax
- [ ] Remap/clamp utilities
- [ ] Coordinate transforms (polar, spherical)

#### Color (4 modules)
- [ ] RGB ↔ HSV ↔ HSL conversions
- [ ] Color gradients
- [ ] Blend modes (screen, multiply, overlay, etc.)
- [ ] Color harmonies

#### Patterns (5 modules)
- [ ] Tileable noise
- [ ] Grid patterns
- [ ] Stripe patterns
- [ ] Spiral patterns
- [ ] Radial patterns

#### Algorithms (6 modules)
- [ ] Hash functions
- [ ] Poisson sampling
- [ ] Curve shaping (ease curves)
- [ ] Distance fields
- [ ] UV utilities (triplanar, spherical)
- [ ] Normal blending

### 3.10 I/O & Assets (8 modules)

#### Geometry Loaders (3 modules)
- [ ] GLTF/GLB loader
- [ ] Draco compression support
- [ ] Lazy-load manager

#### Texture Loaders (3 modules)
- [ ] HDR/EXR loader
- [ ] KTX2 loader
- [ ] Texture atlas system

#### Presets (2 modules)
- [ ] JSON preset loader/saver
- [ ] YAML preset loader/saver

### 3.11 Debug & Profiling (6 modules)

- [ ] G-buffer visualizer
- [ ] Light volume visualizer
- [ ] Shadow cascade visualizer
- [ ] Frame timing profiler
- [ ] GPU memory profiler
- [ ] Overdraw heatmap

### 3.12 Module Testing & Documentation

#### Per-Module Tasks (for each of 150+ modules)
- [ ] Visual parity test (golden image comparison, ΔE < 2)
- [ ] Parameter validation test
- [ ] Lifecycle test (init → mount → update → unmount → dispose)
- [ ] Create LAB showcase page (`/labs/<category>/<module>`)
- [ ] Generate API documentation
- [ ] Add to module registry

---

## 🌐 PHASE 4: Website, UI & Polish

**Duration**: 3-4 weeks  
**Focus**: Complete website, AI assistants, admin dashboard, production deployment

### 4.1 Content Pipeline & MDX

#### Contentlayer Configuration
```typescript
// apps/web/contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer2/source-files'

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
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

#### Tasks
- [ ] Configure Contentlayer for MDX
- [ ] Define `Post` document type
- [ ] Define `Project` document type
- [ ] Create MDX components library
- [ ] Set up rehype/remark plugins
- [ ] Add syntax highlighting

#### Template System
```tsx
// apps/web/templates/HeroGlassWave.tsx
export function HeroGlassWave({ sceneProps }: TemplateProps) {
  const { camera, lights, fx, shader } = sceneProps
  
  useGSAP(() => {
    // GSAP intro animation
  })
  
  return (
    <>
      <PerspectiveCamera {...camera} />
      <LightSetup {...lights} />
      <GlassMesh shader={shader} />
    </>
  )
}
```

#### Tasks
- [ ] Create template registry (`templates/registry.json`)
- [ ] Build 5 reference templates:
  - `HeroGlassWave` — Glass with wave distortion
  - `ParticleSwarm` — Interactive particle field
  - `FluidCanvas` — 2D fluid background
  - `GeometricShapes` — Animated SDF shapes
  - `EmissiveGrid` — Neon grid with glow
- [ ] Implement template resolver
- [ ] Add GSAP timeline support
- [ ] Create style token system (`styleId` → CSS vars)

#### MDX Post Pages
- [ ] Create `/blog/[slug]` page
- [ ] Implement template mounting
- [ ] Add reading progress bar
- [ ] Add table of contents
- [ ] Seed 10 example posts

### 4.2 Admin Dashboard & Schema-Driven UI

#### Zod Schema Definitions
```typescript
// apps/web/lib/admin/schemas.ts
export const CreativeSchema = z.object({
  material: z.object({
    baseColor: z.string().default('#34d399'),
    metalness: z.number().min(0).max(1).default(0.2),
    roughness: z.number().min(0).max(1).default(0.35),
    emissive: z.boolean().default(true),
  }),
  postfx: z.object({
    bloom: z.boolean().default(true),
    bloomStrength: z.number().min(0).max(2).default(0.65),
    vignette: z.boolean().default(true),
    vignetteIntensity: z.number().min(0).max(1).default(0.5),
  }),
  camera: z.object({
    fov: z.number().min(30).max(90).default(45),
    position: z.tuple([z.number(), z.number(), z.number()]).default([0, 2, 5]),
  }),
})

export const DevSchema = z.object({
  renderer: z.enum(['auto', 'webgpu', 'webgl']).default('auto'),
  maxFPS: z.number().int().min(30).max(144).default(60),
  debug: z.object({
    showNormals: z.boolean().default(false),
    showWireframe: z.boolean().default(false),
    showStats: z.boolean().default(false),
  }),
})
```

#### Tweakpane Bridge
```typescript
// apps/web/lib/admin/schema-pane.ts
export function createSchemaPane(
  schema: z.ZodObject<any>,
  state: any,
  onChange: (path: string, value: any) => void
) {
  const pane = new Pane({ title: 'Controls' })
  const jsonSchema = zodToJsonSchema(schema)
  
  // Auto-generate Tweakpane controls from JSON Schema
  Object.entries(jsonSchema.properties).forEach(([key, def]) => {
    addControlFromSchema(pane, key, def, state, onChange)
  })
  
  return pane
}
```

#### Tasks
- [ ] Create schema definitions (Creative + Dev)
- [ ] Implement `zodToJsonSchema` converter
- [ ] Build Tweakpane bridge (schema → controls)
- [ ] Create admin dashboard page (`/admin`)
- [ ] Wire controls to Zustand store
- [ ] Implement live preview
- [ ] Add preset save/load UI
- [ ] Add preset sharing (export/import JSON)

### 4.3 AI Assistants

#### UX Copilot (Public Assistant)

**Tool Set**:
```typescript
// apps/web/lib/agents/ux-tools.ts
export const uxTools = {
  navigate: tool({
    description: 'Navigate to a page',
    parameters: z.object({ path: z.string() }),
    execute: async ({ path }) => { router.push(path); return 'Navigated'; },
  }),
  
  setParam: tool({
    description: 'Set a parameter value',
    parameters: z.object({ key: z.string(), value: z.any() }),
    execute: async ({ key, value }) => { 
      useEngineStore.getState().setParam(key, value);
      return 'Parameter updated';
    },
  }),
  
  loadModule: tool({
    description: 'Load a different module/scene',
    parameters: z.object({ id: z.string() }),
    execute: async ({ id }) => {
      useEngineStore.getState().selectModule(id);
      return 'Module loaded';
    },
  }),
  
  togglePostFX: tool({
    description: 'Toggle a post-processing effect',
    parameters: z.object({ name: z.string(), enabled: z.boolean() }),
    execute: async ({ name, enabled }) => {
      useEngineStore.getState().setParam(`postfx.${name}`, enabled);
      return 'Effect toggled';
    },
  }),
  
  searchSite: tool({
    description: 'Search site content',
    parameters: z.object({ query: z.string() }),
    execute: async ({ query }) => {
      // Use Pagefind or RAG
      return results;
    },
  }),
}
```

#### Tasks
- [ ] Set up Vercel AI SDK
- [ ] Implement UX tools (navigate, setParam, loadModule, togglePostFX, searchSite)
- [ ] Create chat widget UI (`components/AssistantClient.tsx`)
- [ ] Add floating chat button
- [ ] Wire tools to Zustand store
- [ ] Add rate limiting (per-user token bucket)
- [ ] Add tool call audit logging
- [ ] Test assistant responses

#### Builder Agent (Admin-Only)

**Tool Set**:
```typescript
// apps/web/lib/agents/admin-tools.ts
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
      const slug = slugify(args.title);
      const mdx = generateMDX(args);
      const diff = createDiff('content/posts/' + slug + '.mdx', '', mdx);
      return { success: true, diff, preview: mdx };
    },
  }),
  
  applyTemplate: tool({
    description: 'Apply a template to an existing post',
    parameters: z.object({
      slug: z.string(),
      sceneProps: z.record(z.any()),
    }),
    execute: async (args) => {
      const oldContent = await readPost(args.slug);
      const newContent = updateFrontmatter(oldContent, { sceneProps: args.sceneProps });
      const diff = createDiff('content/posts/' + args.slug + '.mdx', oldContent, newContent);
      return { success: true, diff };
    },
  }),
  
  createAssets: tool({
    description: 'Generate OG images for a post',
    parameters: z.object({ slug: z.string() }),
    execute: async ({ slug }) => {
      // Render OG image using Playwright
      const imagePath = await renderOGImage(slug);
      return { success: true, path: imagePath };
    },
  }),
  
  confirmAndPR: tool({
    description: 'Confirm changes and create PR',
    parameters: z.object({
      diffs: z.array(z.object({ path: z.string(), patch: z.string() })),
      title: z.string(),
      description: z.string(),
    }),
    execute: async (args) => {
      const branch = `builder/${Date.now()}`;
      await createBranch(branch);
      await applyDiffs(args.diffs);
      await commit(args.title);
      const prUrl = await openPR(branch, args.title, args.description);
      return { success: true, prUrl, branch };
    },
  }),
}
```

#### Tasks
- [ ] Set up GitHub App auth (GITHUB_APP_ID, PRIVATE_KEY)
- [ ] Implement `draftPost` tool
- [ ] Implement `applyTemplate` tool
- [ ] Implement `createAssets` tool (OG image renderer)
- [ ] Implement `confirmAndPR` tool (GitHub API)
- [ ] Create admin agent panel UI (`components/AdminAgentPanel.tsx`)
- [ ] Add diff preview UI
- [ ] Add confirmation dialog
- [ ] Add audit log (database or file)
- [ ] Test PR creation workflow

### 4.4 RAG & Knowledge Base

#### Embedding Strategy
```typescript
// apps/web/lib/ai/rag.ts
export async function embedContent() {
  const docs = [
    ...await loadMDXFiles('content/'),
    ...await loadShaders('lib/shaders/'),
    ...await loadScenes('scenes/'),
    ...await loadModuleDocs('node_modules/@tsl-kit/'),
  ]
  
  for (const doc of docs) {
    const chunks = splitIntoChunks(doc.content, 512);
    const embeddings = await embed(chunks);
    await storeEmbeddings(doc.path, chunks, embeddings);
  }
}
```

#### Tasks
- [ ] Choose vector store (Supabase pgvector OR Cloudflare Vectorize)
- [ ] Implement embedding script
- [ ] Embed `/content` (posts, projects)
- [ ] Embed `/lib/shaders` (TSL modules)
- [ ] Embed `/scenes` (scene descriptions)
- [ ] Embed engine module docs
- [ ] Implement retrieval function (scoped by path prefix)
- [ ] Add citation formatting (file paths, line numbers)
- [ ] Wire RAG into assistants
- [ ] Add caching for repeated queries

### 4.5 Website Pages & Navigation

#### Core Pages
- [ ] Home page (`/`) — Hero with live WebGPU demo
- [ ] About page (`/about`) — Project overview
- [ ] Portfolio page (`/portfolio`) — Project grid with 3D previews
- [ ] Blog index (`/blog`) — Post list with search
- [ ] Blog post (`/blog/[slug]`) — MDX + template
- [ ] LABS index (`/labs`) — Module category grid
- [ ] LABS category (`/labs/[category]`) — Module list
- [ ] LABS module (`/labs/[category]/[module]`) — Live demo + docs
- [ ] Admin dashboard (`/admin`) — Schema-driven controls
- [ ] 404 page — Custom error with scene

#### Navigation
- [ ] Create navbar component (glassmorphic)
- [ ] Add route transitions (Framer Motion)
- [ ] Add loading states
- [ ] Add breadcrumbs
- [ ] Add footer with links

#### Search & Discovery
- [ ] Integrate Pagefind (postbuild script)
- [ ] Create search UI component
- [ ] Add keyboard shortcuts (Cmd+K)
- [ ] Add tag filtering
- [ ] Add category filtering

### 4.6 Comments & Community

#### Giscus Integration
```tsx
// apps/web/components/Comments.tsx
export function Comments({ slug }: { slug: string }) {
  return (
    <Giscus
      repo={process.env.NEXT_PUBLIC_GISCUS_REPO!}
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID!}
      category="General"
      categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!}
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      theme="dark"
    />
  )
}
```

#### Tasks
- [ ] Set up Giscus (GitHub Discussions)
- [ ] Create `Comments` component
- [ ] Add to post pages
- [ ] Configure moderation settings
- [ ] Test comment submission

### 4.7 SEO & Metadata

#### Meta Tags
- [ ] Generate Open Graph images (Playwright screenshots)
- [ ] Add structured data (JSON-LD)
- [ ] Create sitemap.xml generator
- [ ] Add robots.txt
- [ ] Configure meta tags per page
- [ ] Add Twitter cards

#### Performance
- [ ] Optimize images (next/image)
- [ ] Add lazy loading for heavy components
- [ ] Code-split modules and templates
- [ ] Add service worker (optional)
- [ ] Configure CDN caching headers

### 4.8 Analytics & Monitoring

#### Cloudflare Analytics
```tsx
// apps/web/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN && (
          <script 
            defer 
            src='https://static.cloudflareinsights.com/beacon.min.js' 
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN}"}`}
          />
        )}
      </head>
      <body>{children}</body>
    </html>
  )
}
```

#### Tasks
- [ ] Add Cloudflare Web Analytics beacon
- [ ] Add error tracking (Sentry or similar)
- [ ] Add performance monitoring (Web Vitals)
- [ ] Create admin analytics dashboard
- [ ] Add custom events (module loads, tool calls)

### 4.9 Deployment & CI/CD

#### GitHub Actions Workflows

**Quality Check**:
```yaml
# .github/workflows/quality.yml
name: Quality
on: [push, pull_request]
jobs:
  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
      - run: pnpm install
      - run: pnpm typecheck
  
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
      - run: pnpm install
      - run: pnpm lint
```

**Test Suite**:
```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
      - run: pnpm install
      - run: pnpm test:unit
  
  integration:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
      - run: pnpm install
      - run: pnpm playwright install --with-deps
      - run: pnpm test:e2e
```

**Build & Deploy**:
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
      - run: pnpm install
      - run: pnpm build
      - run: npx pagefind --site ./apps/web/out
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: tsl-engine
          directory: ./apps/web/out
```

#### Tasks
- [ ] Create GitHub Actions workflows (quality, test, deploy)
- [ ] Configure branch protection rules
- [ ] Set up secret management
- [ ] Add workflow badges to README
- [ ] Test full CI/CD pipeline

#### Cloudflare Pages Deployment
- [ ] Connect GitHub repo to Cloudflare Pages
- [ ] Configure build settings
- [ ] Add environment variables
- [ ] Configure custom domain (optional)
- [ ] Test deployment

### 4.10 Documentation & Polish

#### Documentation
- [ ] Update main README with getting started guide
- [ ] Create CONTRIBUTING.md
- [ ] Create API documentation (auto-generated)
- [ ] Create module showcase gallery
- [ ] Create video demos (optional)
- [ ] Write migration guide for existing projects

#### Polish
- [ ] Add loading skeletons
- [ ] Add error boundaries with fallback UI
- [ ] Add toast notifications
- [ ] Add keyboard shortcuts help modal
- [ ] Add accessibility improvements (ARIA labels, focus management)
- [ ] Test on multiple devices/browsers
- [ ] Performance audit (Lighthouse)
- [ ] Security audit (headers, CSP)

---

## ✅ Final Acceptance Criteria

### Technical Requirements
- [ ] All 150+ engine modules ported and working
- [ ] 80%+ test coverage (unit + integration)
- [ ] 60 FPS @ 1080p on RTX 2070-class GPU
- [ ] Post-FX budget ≤5ms GPU time
- [ ] Zero production errors in console
- [ ] WebGPU + WebGL fallback both functional
- [ ] No GPU memory leaks (heap stable after 100 module swaps)

### UX Requirements
- [ ] Persistent canvas across all routes (no re-init)
- [ ] Sub-100ms route transitions
- [ ] Schema-driven controls auto-generate from single source
- [ ] AI assistants respond correctly to natural language
- [ ] Rate limiting prevents abuse
- [ ] Admin dashboard functional with live preview

### Content Requirements
- [ ] 10+ example posts with different templates
- [ ] 50+ material/FX presets ready to use
- [ ] Comprehensive API documentation
- [ ] RAG-powered search with source citations
- [ ] Giscus comments working on posts

### Deployment Requirements
- [ ] Deployed to Cloudflare Pages (or Vercel)
- [ ] CI/CD pipeline passing (quality, build, test, deploy)
- [ ] Secrets management (no hard-coded keys)
- [ ] PR workflow for Builder Agent (no direct main writes)
- [ ] Analytics tracking functional
- [ ] SEO metadata complete (OG images, sitemap, robots.txt)

---

## 📊 Success Metrics

### Performance
- **Frame rate**: ≥60 FPS @ 1080p (target hardware)
- **Load time**: <3s to first render
- **Route transition**: <100ms (canvas persistence)
- **Post-FX budget**: ≤5ms GPU time

### Quality
- **Test coverage**: ≥80% (unit + integration)
- **Visual parity**: ΔE < 2 for all ported modules
- **Accessibility**: WCAG 2.1 AA compliant
- **Lighthouse score**: ≥90 (Performance, Accessibility, Best Practices, SEO)

### Content
- **Module count**: 150+ working modules
- **Preset count**: 50+ material/FX presets
- **Post count**: 10+ example posts
- **Template count**: 5+ 3D templates

---

## 🔄 Phase Dependencies & Blockers

### Phase 1 → Phase 2
- Monorepo structure must be complete
- All dependencies installed and configured
- Research documentation complete
- PORT_MAPPING.md created

### Phase 2 → Phase 3
- Core engine architecture working
- Module lifecycle system validated
- At least 10-15 essential modules ported
- Testing infrastructure in place

### Phase 3 → Phase 4
- All 150+ modules ported and tested
- Module registry complete
- LAB showcase pages created
- Engine package stable

### Phase 4 → Launch
- All pages implemented
- AI assistants working
- Admin dashboard complete
- CI/CD pipeline passing
- All acceptance criteria met

---

## 🚀 Next Steps

1. **Review this plan** with stakeholders
2. **Set up project tracking** (GitHub Projects or similar)
3. **Assign team members** to each phase
4. **Begin Phase 1** (Foundation & Research)
5. **Schedule weekly reviews** to track progress

---

**End of 4-Phase Implementation Plan**

*Ready to begin Phase 1. All subsequent phases depend on successful completion of prior phases.*

