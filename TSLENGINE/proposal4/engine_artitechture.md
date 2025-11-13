## 2️⃣ Engine Skeleton Structure

Recommended structure under `TSL-KIT`:

```txt
TSL-KIT/
  engine/
    core/
      context.ts
      registry.ts
      types.ts
    modules/
      materials/
        index.ts
      postfx/
        index.ts
      fields/
        index.ts
      sims/
        index.ts
      math/
        index.ts
    presets/
      index.ts
```

Now the TypeScript skeletons.

---

## 3️⃣ `engine/core/types.ts`

```ts
// TSL-KIT/engine/core/types.ts

export type EngineModuleKind =
  | "material"
  | "postfx"
  | "field"
  | "sim"
  | "math";

export type ParamType =
  | "number"
  | "int"
  | "boolean"
  | "vec2"
  | "vec3"
  | "vec4"
  | "color"
  | "enum"
  | "string";

export interface EngineParamSchema {
  name: string;
  label?: string;
  type: ParamType;
  default?: unknown;
  min?: number;
  max?: number;
  step?: number;
  options?: string[]; // for enums
  description?: string;
  group?: string; // for UI grouping
  hidden?: boolean;
}

export interface EngineModuleMeta {
  id: string;
  kind: EngineModuleKind;
  label?: string;
  description?: string;
  tags?: string[];
  category?: string;
  subcategory?: string;
  params?: EngineParamSchema[];
  // for future: dependencies, version, etc.
}

export interface EngineContext {
  // Core Three.js / WebGPU handles live here
  renderer: unknown;
  scene: unknown;
  camera: unknown;

  // Registry access
  registries: {
    registerModule: (module: EngineModule<any, any>) => void;
    getModuleById: (id: string) => EngineModule<any, any> | undefined;
    getModulesByKind: (kind: EngineModuleKind) => EngineModule<any, any>[];
  };

  // Generic key/value store for host-specific data
  data: Map<string, unknown>;
}

export interface EngineModule<TConfig = any, THandle = any> {
  meta: EngineModuleMeta;
  defaultConfig?: TConfig;
  create: (ctx: EngineContext, config?: Partial<TConfig>) => THandle;
  // optional destroy hook for cleanup
  destroy?: (ctx: EngineContext, handle: THandle) => void;
}
```

---

## 4️⃣ `engine/core/registry.ts`

```ts
// TSL-KIT/engine/core/registry.ts

import {
  EngineModule,
  EngineModuleKind,
  EngineModuleMeta,
} from "./types";

export class ModuleRegistry {
  private modulesById = new Map<string, EngineModule<any, any>>();
  private modulesByKind = new Map<EngineModuleKind, EngineModule<any, any>[]>();

  register(module: EngineModule<any, any>): void {
    const { id, kind } = module.meta;

    if (this.modulesById.has(id)) {
      console.warn(`[TSLEngine] Module with id "${id}" already registered, overriding.`);
    }

    this.modulesById.set(id, module);

    const list = this.modulesByKind.get(kind) ?? [];
    const existingIndex = list.findIndex((m) => m.meta.id === id);
    if (existingIndex >= 0) {
      list[existingIndex] = module;
    } else {
      list.push(module);
    }
    this.modulesByKind.set(kind, list);
  }

  getById<TConfig = any, THandle = any>(id: string):
    | EngineModule<TConfig, THandle>
    | undefined {
    return this.modulesById.get(id) as EngineModule<TConfig, THandle> | undefined;
  }

  getByKind(kind: EngineModuleKind): EngineModule<any, any>[] {
    return this.modulesByKind.get(kind) ?? [];
  }

  getMeta(filter?: { kind?: EngineModuleKind; tag?: string }): EngineModuleMeta[] {
    const all = Array.from(this.modulesById.values());
    return all
      .filter((m) => {
        if (filter?.kind && m.meta.kind !== filter.kind) return false;
        if (filter?.tag && !m.meta.tags?.includes(filter.tag)) return false;
        return true;
      })
      .map((m) => m.meta);
  }
}
```

---

## 5️⃣ `engine/core/context.ts`

```ts
// TSL-KIT/engine/core/context.ts

import { ModuleRegistry } from "./registry";
import { EngineContext, EngineModule } from "./types";

export interface EngineInitOptions {
  renderer: unknown; // Three.WebGPURenderer (typed later)
  scene: unknown;    // THREE.Scene
  camera: unknown;   // THREE.Camera
}

export class TSLEngine {
  private registry: ModuleRegistry;
  private ctx: EngineContext;

  constructor(opts: EngineInitOptions) {
    this.registry = new ModuleRegistry();

    this.ctx = {
      renderer: opts.renderer,
      scene: opts.scene,
      camera: opts.camera,
      registries: {
        registerModule: (module: EngineModule<any, any>) =>
          this.registry.register(module),
        getModuleById: (id) => this.registry.getById(id),
        getModulesByKind: (kind) => this.registry.getByKind(kind),
      },
      data: new Map<string, unknown>(),
    };
  }

  get context(): EngineContext {
    return this.ctx;
  }

  get modules() {
    return this.registry;
  }

  register(module: EngineModule<any, any>): void {
    this.registry.register(module);
  }

  listModules() {
    return this.registry.getMeta();
  }

  listModulesByKind(kind: EngineModule["meta"]["kind"]) {
    return this.registry.getMeta({ kind });
  }
}

export function createEngineContext(opts: EngineInitOptions): TSLEngine {
  return new TSLEngine(opts);
}
```

---

## 6️⃣ Module Entry Files

These are stubs that will later collect and register actual modules.
For now, they just export arrays + helper `register*Modules(engine)` functions.

### `engine/modules/materials/index.ts`

```ts
// TSL-KIT/engine/modules/materials/index.ts

import { EngineModule, EngineContext } from "../../core/types";
import { TSLEngine } from "../../core/context";

// Example placeholder material module
const basicPBRMaterial: EngineModule<{ color: string }, unknown> = {
  meta: {
    id: "material.basicPBR",
    kind: "material",
    label: "Basic PBR",
    description: "Placeholder PBR material using TSL.",
    tags: ["pbr", "placeholder"],
    category: "PBR",
    params: [
      {
        name: "color",
        type: "color",
        label: "Base Color",
        default: "#ffffff",
      },
    ],
  },
  defaultConfig: {
    color: "#ffffff",
  },
  create: (ctx: EngineContext, config) => {
    // TODO: wire TSL + Three.js material creation here
    void ctx;
    void config;
    return {};
  },
};

export const MATERIAL_MODULES: EngineModule<any, any>[] = [
  basicPBRMaterial,
];

export function registerMaterialModules(engine: TSLEngine): void {
  for (const module of MATERIAL_MODULES) {
    engine.register(module);
  }
}
```

---

### `engine/modules/postfx/index.ts`

```ts
// TSL-KIT/engine/modules/postfx/index.ts

import { EngineModule, EngineContext } from "../../core/types";
import { TSLEngine } from "../../core/context";

const bloomFX: EngineModule<{ intensity: number }, unknown> = {
  meta: {
    id: "postfx.bloom",
    kind: "postfx",
    label: "Bloom",
    description: "Placeholder bloom post-processing effect.",
    tags: ["postfx", "bloom"],
    category: "Core FX",
    params: [
      {
        name: "intensity",
        type: "number",
        label: "Intensity",
        default: 1.0,
        min: 0,
        max: 5,
        step: 0.1,
      },
    ],
  },
  defaultConfig: {
    intensity: 1.0,
  },
  create: (ctx: EngineContext, config) => {
    void ctx;
    void config;
    // TODO: hook into WebGPU post-processing chain
    return {};
  },
};

export const POSTFX_MODULES: EngineModule<any, any>[] = [bloomFX];

export function registerPostFXModules(engine: TSLEngine): void {
  for (const module of POSTFX_MODULES) {
    engine.register(module);
  }
}
```

---

### `engine/modules/fields/index.ts`

```ts
// TSL-KIT/engine/modules/fields/index.ts

import { EngineModule, EngineContext } from "../../core/types";
import { TSLEngine } from "../../core/context";

const curlNoiseField: EngineModule<{ scale: number }, unknown> = {
  meta: {
    id: "field.curlNoise",
    kind: "field",
    label: "Curl Noise Field",
    description: "Placeholder vector field based on curl noise.",
    tags: ["field", "noise", "vector"],
    category: "Vector Fields",
    params: [
      {
        name: "scale",
        type: "number",
        label: "Scale",
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
  create: (ctx: EngineContext, config) => {
    void ctx;
    void config;
    // TODO: implement TSL node graph for curl noise field
    return {};
  },
};

export const FIELD_MODULES: EngineModule<any, any>[] = [curlNoiseField];

export function registerFieldModules(engine: TSLEngine): void {
  for (const module of FIELD_MODULES) {
    engine.register(module);
  }
}
```

---

### `engine/modules/sims/index.ts`

```ts
// TSL-KIT/engine/modules/sims/index.ts

import { EngineModule, EngineContext } from "../../core/types";
import { TSLEngine } from "../../core/context";

const simpleParticleSim: EngineModule<{ maxParticles: number }, unknown> = {
  meta: {
    id: "sim.simpleParticles",
    kind: "sim",
    label: "Simple GPU Particle Sim",
    description: "Placeholder GPU particle simulation.",
    tags: ["sim", "particles"],
    category: "Particles",
    params: [
      {
        name: "maxParticles",
        type: "int",
        label: "Max Particles",
        default: 10000,
        min: 100,
        max: 500000,
        step: 100,
      },
    ],
  },
  defaultConfig: {
    maxParticles: 10000,
  },
  create: (ctx: EngineContext, config) => {
    void ctx;
    void config;
    // TODO: implement compute-based update & GPU buffers
    return {};
  },
};

export const SIM_MODULES: EngineModule<any, any>[] = [simpleParticleSim];

export function registerSimModules(engine: TSLEngine): void {
  for (const module of SIM_MODULES) {
    engine.register(module);
  }
}
```

---

### `engine/modules/math/index.ts`

```ts
// TSL-KIT/engine/modules/math/index.ts

import { EngineModule, EngineContext } from "../../core/types";
import { TSLEngine } from "../../core/context";

const smoothMinNode: EngineModule<{ k: number }, unknown> = {
  meta: {
    id: "math.smoothMin",
    kind: "math",
    label: "Smooth Min",
    description: "Reusable smooth-min node helper for SDF/field operations.",
    tags: ["math", "sdf"],
    category: "Core Math",
    params: [
      {
        name: "k",
        type: "number",
        label: "Blend Factor",
        default: 0.5,
        min: 0.0001,
        max: 10,
        step: 0.01,
      },
    ],
  },
  defaultConfig: {
    k: 0.5,
  },
  create: (ctx: EngineContext, config) => {
    void ctx;
    void config;
    // TODO: expose as a reusable TSL function/node
    return {};
  },
};

export const MATH_MODULES: EngineModule<any, any>[] = [smoothMinNode];

export function registerMathModules(engine: TSLEngine): void {
  for (const module of MATH_MODULES) {
    engine.register(module);
  }
}
```

---

## 7️⃣ `engine/presets/index.ts`

A tiny glue file that pulls everything together into “one call to register all”.

```ts
// TSL-KIT/engine/presets/index.ts

import { TSLEngine } from "../core/context";

import { registerMaterialModules } from "../modules/materials";
import { registerPostFXModules } from "../modules/postfx";
import { registerFieldModules } from "../modules/fields";
import { registerSimModules } from "../modules/sims";
import { registerMathModules } from "../modules/math";

export function registerAllEngineModules(engine: TSLEngine): void {
  registerMaterialModules(engine);
  registerPostFXModules(engine);
  registerFieldModules(engine);
  registerSimModules(engine);
  registerMathModules(engine);
}
```

---

## 8️⃣ How you’d actually use it (conceptually)

In your WebGPU scene bootstrap (later, when wired to Three/WebGPU/TSL):

```ts
// pseudo-code usage example

import { createEngineContext } from "./engine/core/context";
import { registerAllEngineModules } from "./engine/presets";

// after you create renderer, scene, camera:
const engine = createEngineContext({ renderer, scene, camera });

// register all built-in modules
registerAllEngineModules(engine);

// list modules for UI / agent
console.log(engine.listModules());
```

---
