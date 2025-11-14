# Phase 2: Core Engine & Essential Infrastructure — Detailed TODO

**Duration**: 3-4 weeks  
**Status**: Awaiting Phase 1 Completion  
**Goal**: Build fully working core WebGPU engine with essential modules

---

## 📋 Overview

Phase 2 focuses on:
- Implementing core engine architecture (lifecycle, registry, runner)
- Building renderer factory with WebGPU/WebGL fallback
- Creating resource management system
- Porting 10-15 essential modules (materials, noise, post-FX, particles, lighting)
- Building website core infrastructure (persistent canvas, state management)
- Setting up testing infrastructure

**Exit Criteria**:
- ✅ Core engine architecture complete and working
- ✅ 10-15 essential modules ported and tested
- ✅ Persistent canvas working across routes
- ✅ Module hot-swap working
- ✅ Schema-driven parameters working
- ✅ Unit and integration tests passing

---

## ⚙️ Section 1: Core Engine Architecture

### 1.1 Type Definitions & Interfaces

**File**: `packages/tsl-kit/src/core/types.ts`

- [ ] **Define ModuleContext interface**
  ```typescript
  export interface ModuleContext {
    scene: THREE.Scene;
    root: THREE.Object3D;          // Isolated container for this module
    renderer: THREE.WebGLRenderer | WebGPURenderer;
    capabilities: RendererCapabilities;
    events: ModuleEvents;
    getParam<T = any>(path: string): T;
    setParam(path: string, value: any): void;
  }
  ```

- [ ] **Define ModuleEvents interface**
  ```typescript
  export interface ModuleEvents {
    invalidate: () => void;
    onPresetSave?: (name: string, data: unknown) => void;
    onPresetLoad?: (name: string, data: unknown) => void;
  }
  ```

- [ ] **Define RendererCapabilities interface**
  ```typescript
  export interface RendererCapabilities {
    backend: 'webgpu' | 'webgl';
    computeShaders: boolean;
    storageBuffers: boolean;
    maxTextureSize: number;
    maxWorkgroupSize: [number, number, number];
    // ... more capability flags
  }
  ```

- [ ] **Define ModuleCapabilities interface**
  ```typescript
  export interface ModuleCapabilities {
    kind: 'scene' | 'postfx' | 'material' | 'sim' | 'utility';
    backends?: ('webgpu' | 'webgl')[];
    minVersion?: string;
    requiresCompute?: boolean;
    requiresStorage?: boolean;
  }
  ```

- [ ] **Define EngineModule interface**
  ```typescript
  export interface EngineModule<TParams = any> {
    id: string;                    // e.g., "particles/burst"
    meta: ModuleMetadata;
    caps: ModuleCapabilities;
    defaultParams: TParams;
    schema: ModuleSchema;
    
    // Lifecycle hooks
    init(ctx: ModuleContext, params: TParams): Promise<void> | void;
    mount(ctx: ModuleContext, params: TParams): Promise<void> | void;
    update?(ctx: ModuleContext, dt: number, params: TParams): boolean | void;
    unmount?(ctx: ModuleContext): void;
    dispose?(ctx: ModuleContext): void;
  }
  ```

- [ ] **Define ModuleMetadata interface**
  ```typescript
  export interface ModuleMetadata {
    id: string;
    label: string;
    description: string;
    category: string;
    tags: string[];
    author?: string;
    version?: string;
    thumbnail?: string;
  }
  ```

- [ ] **Define ModuleSchema interface**
  ```typescript
  export interface ModuleSchema {
    jsonSchema?: any;              // JSON Schema
    zod?: z.ZodObject<any>;       // Zod schema
  }
  ```

- [ ] **Define ModuleState enum**
  ```typescript
  export enum ModuleState {
    Unloaded = 'unloaded',
    Loading = 'loading',
    Loaded = 'loaded',
    Mounted = 'mounted',
    Error = 'error',
  }
  ```

- [ ] **Export all types from index**
  ```typescript
  // packages/tsl-kit/src/core/index.ts
  export * from './types'
  export * from './registry'
  export * from './runner'
  export * from './context'
  ```

### 1.2 Module Registry

**File**: `packages/tsl-kit/src/core/registry.ts`

- [ ] **Implement ModuleRegistry class**
  ```typescript
  export class ModuleRegistry {
    private modules = new Map<string, EngineModule>();
    
    register<T>(module: EngineModule<T>): void {
      // Validate module
      this.validateModule(module);
      
      // Check for duplicates
      if (this.modules.has(module.id)) {
        throw new Error(`Module "${module.id}" already registered`);
      }
      
      // Register
      this.modules.set(module.id, module);
    }
    
    unregister(id: string): boolean {
      return this.modules.delete(id);
    }
    
    get(id: string): EngineModule | undefined {
      return this.modules.get(id);
    }
    
    has(id: string): boolean {
      return this.modules.has(id);
    }
    
    list(): EngineModule[] {
      return Array.from(this.modules.values());
    }
    
    findByKind(kind: string): EngineModule[] {
      return this.list().filter(m => m.caps.kind === kind);
    }
    
    findByTag(tag: string): EngineModule[] {
      return this.list().filter(m => m.meta.tags.includes(tag));
    }
    
    findByCategory(category: string): EngineModule[] {
      return this.list().filter(m => m.meta.category === category);
    }
    
    private validateModule(module: EngineModule): void {
      if (!module.id) throw new Error('Module must have id');
      if (!module.meta) throw new Error('Module must have meta');
      if (!module.caps) throw new Error('Module must have caps');
      if (!module.defaultParams) throw new Error('Module must have defaultParams');
      if (typeof module.init !== 'function') {
        throw new Error('Module must have init function');
      }
      if (typeof module.mount !== 'function') {
        throw new Error('Module must have mount function');
      }
    }
  }
  ```

- [ ] **Create singleton instance**
  ```typescript
  export const moduleRegistry = new ModuleRegistry();
  ```

- [ ] **Write unit tests**
  - [ ] Test: Register module
  - [ ] Test: Reject duplicate registration
  - [ ] Test: Get module by id
  - [ ] Test: List all modules
  - [ ] Test: Find by kind
  - [ ] Test: Find by tag
  - [ ] Test: Find by category
  - [ ] Test: Validation errors

### 1.3 Module Runner

**File**: `packages/tsl-kit/src/core/runner.ts`

- [ ] **Implement ModuleRunner class**
  ```typescript
  export class ModuleRunner {
    private ctx: ModuleContext | null = null;
    private currentModule: EngineModule | null = null;
    private currentRoot: THREE.Object3D | null = null;
    private currentParams: any = null;
    private state: ModuleState = ModuleState.Unloaded;
    
    constructor(
      private scene: THREE.Scene,
      private renderer: THREE.WebGLRenderer | any,
      private capabilities: RendererCapabilities,
      private events: ModuleEvents
    ) {}
    
    async load(
      moduleId: string,
      params?: any,
      getParam?: <T>(path: string) => T,
      setParam?: (path: string, value: any) => void
    ): Promise<void> {
      // Unload previous module
      await this.unload();
      
      // Get module from registry
      const module = moduleRegistry.get(moduleId);
      if (!module) {
        throw new Error(`Module "${moduleId}" not found in registry`);
      }
      
      // Check capabilities
      this.checkCapabilities(module);
      
      // Set state
      this.state = ModuleState.Loading;
      
      // Create isolated root
      const root = new THREE.Object3D();
      root.name = `module-${module.id}`;
      
      // Create context
      this.ctx = {
        scene: this.scene,
        root,
        renderer: this.renderer,
        capabilities: this.capabilities,
        events: this.events,
        getParam: getParam || (() => undefined),
        setParam: setParam || (() => {}),
      };
      
      // Merge params
      const finalParams = { ...module.defaultParams, ...params };
      
      // Init module
      try {
        await module.init(this.ctx, finalParams);
      } catch (err) {
        this.state = ModuleState.Error;
        throw new Error(`Module init failed: ${err}`);
      }
      
      // Mount module
      try {
        await module.mount(this.ctx, finalParams);
      } catch (err) {
        this.state = ModuleState.Error;
        throw new Error(`Module mount failed: ${err}`);
      }
      
      // Add root to scene
      this.scene.add(root);
      
      // Store state
      this.currentModule = module;
      this.currentRoot = root;
      this.currentParams = finalParams;
      this.state = ModuleState.Mounted;
    }
    
    tick(dt: number): boolean {
      if (!this.ctx || !this.currentModule || this.state !== ModuleState.Mounted) {
        return false;
      }
      
      if (this.currentModule.update) {
        const needsInvalidate = this.currentModule.update(
          this.ctx,
          dt,
          this.currentParams
        );
        return !!needsInvalidate;
      }
      
      return false;
    }
    
    setParams(params: any): void {
      if (!this.currentParams) return;
      Object.assign(this.currentParams, params);
    }
    
    async unload(): Promise<void> {
      if (!this.ctx || !this.currentModule) return;
      
      // Unmount
      if (this.currentModule.unmount) {
        this.currentModule.unmount(this.ctx);
      }
      
      // Remove root from scene
      if (this.currentRoot) {
        this.scene.remove(this.currentRoot);
      }
      
      // Dispose
      if (this.currentModule.dispose) {
        this.currentModule.dispose(this.ctx);
      }
      
      // Clear state
      this.ctx = null;
      this.currentModule = null;
      this.currentRoot = null;
      this.currentParams = null;
      this.state = ModuleState.Unloaded;
    }
    
    dispose(): void {
      this.unload();
    }
    
    getState(): ModuleState {
      return this.state;
    }
    
    getCurrentModule(): EngineModule | null {
      return this.currentModule;
    }
    
    private checkCapabilities(module: EngineModule): void {
      // Check backend compatibility
      if (module.caps.backends) {
        if (!module.caps.backends.includes(this.capabilities.backend)) {
          throw new Error(
            `Module "${module.id}" requires ${module.caps.backends.join(' or ')} but got ${this.capabilities.backend}`
          );
        }
      }
      
      // Check compute shaders
      if (module.caps.requiresCompute && !this.capabilities.computeShaders) {
        throw new Error(`Module "${module.id}" requires compute shaders`);
      }
      
      // Check storage buffers
      if (module.caps.requiresStorage && !this.capabilities.storageBuffers) {
        throw new Error(`Module "${module.id}" requires storage buffers`);
      }
    }
  }
  ```

- [ ] **Write unit tests**
  - [ ] Test: Load module
  - [ ] Test: Hot-swap modules (unload → load)
  - [ ] Test: Tick updates module
  - [ ] Test: Set params
  - [ ] Test: Unload cleans up
  - [ ] Test: Capability check errors
  - [ ] Test: Module not found error

---

## 🎨 Section 2: Renderer & Graphics Backend

### 2.1 Renderer Factory

**File**: `packages/tsl-kit/src/rendering/factory.ts`

- [ ] **Implement capability detection**
  ```typescript
  export async function detectCapabilities(
    renderer: THREE.WebGLRenderer | any
  ): Promise<RendererCapabilities> {
    const isWebGPU = renderer.backend !== undefined;
    
    if (isWebGPU) {
      // WebGPU capabilities
      const adapter = await navigator.gpu?.requestAdapter();
      const limits = adapter?.limits;
      
      return {
        backend: 'webgpu',
        computeShaders: true,
        storageBuffers: true,
        maxTextureSize: limits?.maxTextureDimension2D || 8192,
        maxWorkgroupSize: [
          limits?.maxComputeWorkgroupSizeX || 256,
          limits?.maxComputeWorkgroupSizeY || 256,
          limits?.maxComputeWorkgroupSizeZ || 64,
        ],
      };
    } else {
      // WebGL capabilities
      const gl = renderer.getContext();
      
      return {
        backend: 'webgl',
        computeShaders: false,
        storageBuffers: false,
        maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
        maxWorkgroupSize: [0, 0, 0],
      };
    }
  }
  ```

- [ ] **Implement renderer factory**
  ```typescript
  import { WebGPURenderer } from 'three/webgpu';
  import { WebGLRenderer, ACESFilmicToneMapping, SRGBColorSpace } from 'three';
  
  export interface RendererOptions {
    canvas?: HTMLCanvasElement;
    antialias?: boolean;
    alpha?: boolean;
    forceBackend?: 'webgpu' | 'webgl';
  }
  
  export async function createRenderer(
    options: RendererOptions = {}
  ): Promise<{
    renderer: THREE.WebGLRenderer | any;
    capabilities: RendererCapabilities;
  }> {
    const { canvas, antialias = true, alpha = false, forceBackend } = options;
    
    // Determine backend
    const useWebGPU =
      forceBackend === 'webgpu' ||
      (forceBackend !== 'webgl' && (navigator as any)?.gpu);
    
    let renderer: THREE.WebGLRenderer | any;
    
    if (useWebGPU) {
      try {
        renderer = new WebGPURenderer({
          canvas,
          antialias,
          alpha,
        });
        
        // WebGPU requires async init
        await renderer.init();
        
        // Configure
        (renderer as any).toneMapping = ACESFilmicToneMapping;
        (renderer as any).toneMappingExposure = 1.0;
        
        console.log('✅ WebGPU renderer initialized');
      } catch (err) {
        console.warn('⚠️ WebGPU init failed, falling back to WebGL:', err);
        renderer = createWebGLRenderer({ canvas, antialias, alpha });
      }
    } else {
      renderer = createWebGLRenderer({ canvas, antialias, alpha });
    }
    
    // Detect capabilities
    const capabilities = await detectCapabilities(renderer);
    
    return { renderer, capabilities };
  }
  
  function createWebGLRenderer(options: {
    canvas?: HTMLCanvasElement;
    antialias?: boolean;
    alpha?: boolean;
  }): THREE.WebGLRenderer {
    const renderer = new WebGLRenderer({
      canvas: options.canvas,
      antialias: options.antialias,
      alpha: options.alpha,
    });
    
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    
    console.log('✅ WebGL renderer initialized');
    
    return renderer;
  }
  ```

- [ ] **Write integration test**
  - [ ] Test: WebGPU renderer creation (if available)
  - [ ] Test: WebGL fallback
  - [ ] Test: Capability detection

### 2.2 Resource Management

**File**: `packages/tsl-kit/src/core/resources.ts`

- [ ] **Implement ResourceManager class**
  ```typescript
  export class ResourceManager {
    private textures = new Map<string, THREE.Texture>();
    private geometries = new Map<string, THREE.BufferGeometry>();
    private materials = new Map<string, THREE.Material>();
    private refCounts = new Map<string, number>();
    
    registerTexture(id: string, texture: THREE.Texture): void {
      this.textures.set(id, texture);
      this.refCounts.set(id, 1);
    }
    
    registerGeometry(id: string, geometry: THREE.BufferGeometry): void {
      this.geometries.set(id, geometry);
      this.refCounts.set(id, 1);
    }
    
    registerMaterial(id: string, material: THREE.Material): void {
      this.materials.set(id, material);
      this.refCounts.set(id, 1);
    }
    
    incrementRef(id: string): void {
      const count = this.refCounts.get(id) || 0;
      this.refCounts.set(id, count + 1);
    }
    
    decrementRef(id: string): void {
      const count = this.refCounts.get(id) || 0;
      if (count <= 1) {
        this.dispose(id);
      } else {
        this.refCounts.set(id, count - 1);
      }
    }
    
    dispose(id: string): void {
      const texture = this.textures.get(id);
      if (texture) {
        texture.dispose();
        this.textures.delete(id);
      }
      
      const geometry = this.geometries.get(id);
      if (geometry) {
        geometry.dispose();
        this.geometries.delete(id);
      }
      
      const material = this.materials.get(id);
      if (material) {
        material.dispose();
        this.materials.delete(id);
      }
      
      this.refCounts.delete(id);
    }
    
    disposeAll(): void {
      for (const id of this.textures.keys()) {
        this.dispose(id);
      }
      for (const id of this.geometries.keys()) {
        this.dispose(id);
      }
      for (const id of this.materials.keys()) {
        this.dispose(id);
      }
    }
    
    getMemoryUsage(): {
      textures: number;
      geometries: number;
      materials: number;
    } {
      return {
        textures: this.textures.size,
        geometries: this.geometries.size,
        materials: this.materials.size,
      };
    }
  }
  
  export const resourceManager = new ResourceManager();
  ```

- [ ] **Write unit tests**
  - [ ] Test: Register and dispose texture
  - [ ] Test: Register and dispose geometry
  - [ ] Test: Register and dispose material
  - [ ] Test: Reference counting
  - [ ] Test: Dispose all
  - [ ] Test: Memory usage reporting

---

## 🧩 Section 3: Essential Engine Modules (10-15 modules)

### 3.1 Materials (3 modules)

#### Module 1: Standard PBR Material

**File**: `packages/tsl-kit/src/modules/materials/pbr-standard.ts`

- [ ] **Port from portfolio examples**
  - Source: `portfolio-main/src/utils/webgpu/materials/standard.ts`
  
- [ ] **Define schema**
  ```typescript
  import { z } from 'zod';
  
  export const PBRStandardSchema = z.object({
    baseColor: z.string().default('#34d399'),
    metalness: z.number().min(0).max(1).default(0.2),
    roughness: z.number().min(0).max(1).default(0.35),
    emissive: z.string().default('#000000'),
    emissiveIntensity: z.number().min(0).max(10).default(0),
  });
  
  export type PBRStandardParams = z.infer<typeof PBRStandardSchema>;
  ```

- [ ] **Implement module**
  ```typescript
  export const PBRStandard: EngineModule<PBRStandardParams> = {
    id: 'materials/pbr-standard',
    meta: {
      id: 'materials/pbr-standard',
      label: 'Standard PBR',
      description: 'Standard PBR material with metalness/roughness workflow',
      category: 'Materials',
      tags: ['material', 'pbr', 'metalness', 'roughness'],
    },
    caps: {
      kind: 'material',
      backends: ['webgpu', 'webgl'],
    },
    defaultParams: PBRStandardSchema.parse({}),
    schema: {
      zod: PBRStandardSchema,
    },
    
    init: async (ctx, params) => {
      // Create material
      // Create test mesh
      // Store in context or module state
    },
    
    mount: (ctx, params) => {
      // Add mesh to root
    },
    
    update: (ctx, dt, params) => {
      // Update material properties
      return true; // Invalidate
    },
    
    unmount: (ctx) => {
      // Remove mesh from root
    },
    
    dispose: (ctx) => {
      // Dispose material and geometry
    },
  };
  ```

- [ ] **Write visual test**
- [ ] **Create LAB page** (`LABS/materials/pbr-standard`)

#### Module 2: Emissive/Glow Material

**File**: `packages/tsl-kit/src/modules/materials/emissive-glow.ts`

- [ ] Port from portfolio examples
- [ ] Define schema (color, intensity, fresnel power)
- [ ] Implement module
- [ ] Write visual test
- [ ] Create LAB page

#### Module 3: Iridescent Material

**File**: `packages/tsl-kit/src/modules/materials/iridescent.ts`

- [ ] Port thin-film interference shader
- [ ] Define schema (thickness, ior, base color)
- [ ] Implement module
- [ ] Write visual test
- [ ] Create LAB page

### 3.2 Noise/Math (4 modules)

#### Module 4: Simplex Noise 3D

**File**: `packages/tsl-kit/src/modules/math/simplex-noise-3d.ts`

- [ ] Port from `portfolio-main/src/utils/webgpu/nodes/noise/simplexNoise3d.ts`
- [ ] Define schema (scale, offset)
- [ ] Implement module
- [ ] Write unit test
- [ ] Create LAB page

#### Module 5: Curl Noise

- [ ] Port curl noise implementation
- [ ] Define schema (turbulence params)
- [ ] Implement module
- [ ] Write unit test
- [ ] Create LAB page

#### Module 6: Voronoi/Worley

- [ ] Port Voronoi pattern
- [ ] Define schema (cell density, distance function)
- [ ] Implement module
- [ ] Write unit test
- [ ] Create LAB page

#### Module 7: FBM (Fractional Brownian Motion)

- [ ] Port FBM compositor
- [ ] Define schema (octaves, lacunarity, gain)
- [ ] Implement module
- [ ] Write unit test
- [ ] Create LAB page

### 3.3 Post-FX (3 modules)

#### Module 8: Bloom (Multi-Scale)

**File**: `packages/tsl-kit/src/modules/postfx/bloom.ts`

- [ ] Port from portfolio or postprocessing library
- [ ] Define schema (intensity, radius, threshold)
- [ ] Implement module
- [ ] Write visual test
- [ ] Create LAB page

#### Module 9: Vignette

- [ ] Port vignette effect
- [ ] Define schema (darkness, offset)
- [ ] Implement module
- [ ] Write visual test
- [ ] Create LAB page

#### Module 10: Chromatic Aberration

- [ ] Port CA effect
- [ ] Define schema (offset, radial distortion)
- [ ] Implement module
- [ ] Write visual test
- [ ] Create LAB page

### 3.4 Particles (2 modules)

#### Module 11: Basic GPU Particles

**File**: `packages/tsl-kit/src/modules/particles/basic-gpu.ts`

- [ ] Port from `tsl-compute-particles`
- [ ] Define schema (count, size, velocity)
- [ ] Implement module
- [ ] Write visual test
- [ ] Create LAB page

#### Module 12: Particle Emitter (Point)

- [ ] Create simple point emitter
- [ ] Define schema (emission rate, lifetime)
- [ ] Implement module
- [ ] Write visual test
- [ ] Create LAB page

### 3.5 Lighting (2 modules)

#### Module 13: HDRI Environment

**File**: `packages/tsl-kit/src/modules/lighting/hdri-environment.ts`

- [ ] Port HDRI loader and IBL setup
- [ ] Define schema (exposure, rotation)
- [ ] Implement module
- [ ] Write visual test
- [ ] Create LAB page

#### Module 14: Ambient + Directional Light

- [ ] Create light setup module
- [ ] Define schema (intensity, color, direction)
- [ ] Implement module
- [ ] Write visual test
- [ ] Create LAB page

### 3.6 Module Registration

**File**: `packages/tsl-kit/src/modules/index.ts`

- [ ] Export all modules
- [ ] Create auto-registration function
  ```typescript
  import { moduleRegistry } from '../core/registry';
  import { PBRStandard } from './materials/pbr-standard';
  // ... import all modules
  
  export function registerAllModules(): void {
    moduleRegistry.register(PBRStandard);
    // ... register all modules
  }
  
  export const allModules = [
    PBRStandard,
    // ... list all modules
  ];
  ```

---

## 🌐 Section 4: Website Core Infrastructure

### 4.1 Persistent Canvas Shell

**File**: `apps/web/app/layout.tsx`

- [ ] **Create root layout with persistent canvas**
  ```tsx
  import { ThreeRoot } from '@/components/webgpu/ThreeRoot';
  import { UiOverlay } from '@/components/ui/UiOverlay';
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
          <ThreeRoot />
          <UiOverlay>{children}</UiOverlay>
        </body>
      </html>
    );
  }
  ```

**File**: `apps/web/components/webgpu/ThreeRoot.tsx`

- [ ] **Implement ThreeRoot component**
  ```tsx
  'use client';
  
  import { Canvas } from '@react-three/fiber';
  import { createRenderer } from '@tsl-kit/engine/rendering';
  import { useEngineStore } from '@/lib/store';
  import { Scene } from './Scene';
  
  export function ThreeRoot() {
    const backend = useEngineStore((s) => s.backend);
    
    return (
      <div className="fixed inset-0 -z-10">
        <Canvas
          gl={async (canvas) => {
            const { renderer } = await createRenderer({
              canvas: canvas as HTMLCanvasElement,
              forceBackend: backend === 'auto' ? undefined : backend,
            });
            return renderer;
          }}
          frameloop="demand"
          shadows
        >
          <Scene />
        </Canvas>
      </div>
    );
  }
  ```

**File**: `apps/web/components/webgpu/Scene.tsx`

- [ ] **Implement Scene component**
  ```tsx
  'use client';
  
  import { useFrame, useThree } from '@react-three/fiber';
  import { useEffect, useRef } from 'react';
  import { ModuleRunner } from '@tsl-kit/engine/core';
  import { useEngineStore } from '@/lib/store';
  
  export function Scene() {
    const { scene, gl, invalidate } = useThree();
    const runnerRef = useRef<ModuleRunner | null>(null);
    
    const activeModuleId = useEngineStore((s) => s.activeModuleId);
    const moduleParams = useEngineStore((s) => s.moduleParams);
    const getParam = useEngineStore((s) => s.getParam);
    const setParam = useEngineStore((s) => s.setParam);
    
    // Initialize runner
    useEffect(() => {
      if (!runnerRef.current) {
        runnerRef.current = new ModuleRunner(
          scene,
          gl,
          { backend: 'webgpu', computeShaders: true, storageBuffers: true, maxTextureSize: 8192, maxWorkgroupSize: [256, 256, 64] }, // TODO: detect
          { invalidate }
        );
      }
      
      return () => {
        runnerRef.current?.dispose();
      };
    }, [scene, gl, invalidate]);
    
    // Load module
    useEffect(() => {
      if (!runnerRef.current || !activeModuleId) return;
      
      runnerRef.current.load(activeModuleId, moduleParams, getParam, setParam);
    }, [activeModuleId, getParam, setParam]);
    
    // Update loop
    useFrame((state, dt) => {
      if (runnerRef.current) {
        const needsInvalidate = runnerRef.current.tick(dt);
        if (needsInvalidate) {
          invalidate();
        }
      }
    });
    
    return null;
  }
  ```

**File**: `apps/web/components/ui/UiOverlay.tsx`

- [ ] **Create glassmorphic overlay**
  ```tsx
  export function UiOverlay({ children }: { children: React.ReactNode }) {
    return (
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    );
  }
  ```

### 4.2 State Management (Zustand)

**File**: `apps/web/lib/store.ts`

- [ ] **Create Zustand store**
  ```typescript
  import { create } from 'zustand';
  import { devtools, persist } from 'zustand/middleware';
  
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
    getParam: (path: string) => any;
    savePreset: (name: string) => void;
    loadPreset: (name: string) => void;
  }
  
  export const useEngineStore = create<EngineStore>()(
    devtools(
      persist(
        (set, get) => ({
          // State
          backend: 'auto',
          fpsCap: 60,
          activeModuleId: null,
          moduleParams: {},
          presets: {},
          
          // Actions
          selectModule: (id, params = {}) => {
            set({ activeModuleId: id, moduleParams: params });
          },
          
          setParam: (path, value) => {
            set((state) => {
              const newParams = { ...state.moduleParams };
              setNestedValue(newParams, path, value);
              return { moduleParams: newParams };
            });
          },
          
          getParam: (path) => {
            const params = get().moduleParams;
            return getNestedValue(params, path);
          },
          
          savePreset: (name) => {
            const { activeModuleId, moduleParams } = get();
            if (!activeModuleId) return;
            
            set((state) => ({
              presets: {
                ...state.presets,
                [name]: { moduleId: activeModuleId, params: moduleParams },
              },
            }));
          },
          
          loadPreset: (name) => {
            const preset = get().presets[name];
            if (!preset) return;
            
            set({
              activeModuleId: preset.moduleId,
              moduleParams: preset.params,
            });
          },
        }),
        { name: 'engine-store' }
      )
    )
  );
  
  // Helper functions
  function setNestedValue(obj: any, path: string, value: any): void {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  }
  
  function getNestedValue(obj: any, path: string): any {
    const keys = path.split('.');
    let current = obj;
    for (const key of keys) {
      if (current === undefined || current === null) {
        return undefined;
      }
      current = current[key];
    }
    return current;
  }
  ```

- [ ] **Write unit tests**
  - [ ] Test: Select module
  - [ ] Test: Set param
  - [ ] Test: Get param
  - [ ] Test: Save preset
  - [ ] Test: Load preset
  - [ ] Test: Nested param paths

### 4.3 Basic Pages

**File**: `apps/web/app/page.tsx`

- [ ] **Create home page**
  ```tsx
  'use client';
  
  import { useEffect } from 'react';
  import { useEngineStore } from '@/lib/store';
  
  export default function HomePage() {
    const selectModule = useEngineStore((s) => s.selectModule);
    
    useEffect(() => {
      // Load a default module
      selectModule('materials/pbr-standard');
    }, [selectModule]);
    
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="glass rounded-xl p-8">
          <h1 className="text-4xl font-bold">TSL-KIT Engine</h1>
          <p className="mt-4 text-lg">WebGPU-powered engine with 150+ modules</p>
        </div>
      </div>
    );
  }
  ```

**File**: `apps/web/app/labs/page.tsx`

- [ ] **Create LABS index page**
  ```tsx
  export default function LabsPage() {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold">LABS</h1>
        <p className="mt-4">Module showcases and experiments</p>
        
        <div className="mt-8 grid grid-cols-3 gap-4">
          <a href="/labs/materials">Materials</a>
          <a href="/labs/lighting">Lighting</a>
          <a href="/labs/postfx">Post-FX</a>
          <a href="/labs/particles">Particles</a>
        </div>
      </div>
    );
  }
  ```

**File**: `apps/web/app/labs/materials/pbr-standard/page.tsx`

- [ ] **Create module showcase page**
  ```tsx
  'use client';
  
  import { useEffect } from 'react';
  import { useEngineStore } from '@/lib/store';
  
  export default function PBRStandardPage() {
    const selectModule = useEngineStore((s) => s.selectModule);
    
    useEffect(() => {
      selectModule('materials/pbr-standard');
    }, [selectModule]);
    
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold">Standard PBR Material</h1>
        <p className="mt-4">Standard PBR material with metalness/roughness workflow</p>
      </div>
    );
  }
  ```

---

## 🧪 Section 5: Testing Infrastructure

### 5.1 Unit Tests

**File**: `packages/tsl-kit/src/core/__tests__/registry.test.ts`

- [ ] Write tests for ModuleRegistry

**File**: `packages/tsl-kit/src/core/__tests__/runner.test.ts`

- [ ] Write tests for ModuleRunner

**File**: `apps/web/lib/__tests__/store.test.ts`

- [ ] Write tests for Zustand store

### 5.2 Integration Tests

**File**: `apps/web/e2e/canvas-persistence.spec.ts`

- [ ] **Test: Canvas persists across route changes**
  ```typescript
  import { test, expect } from '@playwright/test';
  
  test('canvas persists across route changes', async ({ page }) => {
    await page.goto('/');
    
    // Get canvas element
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    
    // Get canvas WebGL context ID (should remain same)
    const contextId = await canvas.evaluate((c: HTMLCanvasElement) => {
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      return gl ? (gl as any).id : null;
    });
    
    // Navigate to another page
    await page.goto('/labs');
    
    // Canvas should still exist
    await expect(canvas).toBeVisible();
    
    // Context ID should be the same
    const newContextId = await canvas.evaluate((c: HTMLCanvasElement) => {
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      return gl ? (gl as any).id : null;
    });
    
    expect(newContextId).toBe(contextId);
  });
  ```

**File**: `apps/web/e2e/module-loading.spec.ts`

- [ ] **Test: Module loads and updates**

---

## ✅ Phase 2 Completion Checklist

### Core Engine
- [ ] All type definitions complete
- [ ] ModuleRegistry implemented and tested
- [ ] ModuleRunner implemented and tested
- [ ] Renderer factory implemented and tested
- [ ] ResourceManager implemented and tested

### Essential Modules
- [ ] 3 materials ported and tested
- [ ] 4 noise/math modules ported and tested
- [ ] 3 post-FX modules ported and tested
- [ ] 2 particle modules ported and tested
- [ ] 2 lighting modules ported and tested
- [ ] All modules registered in registry

### Website Infrastructure
- [ ] Persistent canvas working
- [ ] Route transitions preserve canvas
- [ ] Zustand store implemented and tested
- [ ] Scene resolution working
- [ ] Basic pages created
- [ ] LAB pages created for all modules

### Testing
- [ ] Unit tests passing (80%+ coverage)
- [ ] Integration tests passing
- [ ] Visual tests passing
- [ ] No memory leaks

---

## 🚦 Phase 2 Sign-Off

**Criteria for moving to Phase 3:**
1. ✅ Core engine architecture complete and stable
2. ✅ 10-15 essential modules ported and tested
3. ✅ Persistent canvas validated in production
4. ✅ Module hot-swap working
5. ✅ All tests passing
6. ✅ No critical bugs

**Sign-off**: ________________  
**Date**: ________________

---

**Next Phase**: [Phase 3 TODO](./PHASE_3_TODO.md) — Extended Engine & Module Library

