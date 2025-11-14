// Core type definitions for TSL-KIT engine
// TODO: Implement in Phase 2

import type * as THREE from 'three';

export interface ModuleContext {
  scene: THREE.Scene;
  root: THREE.Object3D;
  renderer: THREE.WebGLRenderer | any; // WebGPURenderer when available
  capabilities: RendererCapabilities;
  events: ModuleEvents;
  getParam<T = any>(path: string): T;
  setParam(path: string, value: any): void;
}

export interface ModuleEvents {
  invalidate: () => void;
  onPresetSave?: (name: string, data: unknown) => void;
  onPresetLoad?: (name: string, data: unknown) => void;
}

export interface RendererCapabilities {
  backend: 'webgpu' | 'webgl';
  computeShaders: boolean;
  storageBuffers: boolean;
  maxTextureSize: number;
  maxWorkgroupSize: [number, number, number];
}

export interface ModuleCapabilities {
  kind: 'scene' | 'postfx' | 'material' | 'sim' | 'utility';
  backends?: ('webgpu' | 'webgl')[];
  minVersion?: string;
  requiresCompute?: boolean;
  requiresStorage?: boolean;
}

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

export interface ModuleSchema {
  jsonSchema?: any;
  zod?: any;
}

export interface EngineModule<TParams = any> {
  id: string;
  meta: ModuleMetadata;
  caps: ModuleCapabilities;
  defaultParams: TParams;
  schema: ModuleSchema;
  
  init(ctx: ModuleContext, params: TParams): Promise<void> | void;
  mount(ctx: ModuleContext, params: TParams): Promise<void> | void;
  update?(ctx: ModuleContext, dt: number, params: TParams): boolean | void;
  unmount?(ctx: ModuleContext): void;
  dispose?(ctx: ModuleContext): void;
}

export const ModuleState = {
  Unloaded: 'unloaded',
  Loading: 'loading',
  Loaded: 'loaded',
  Mounted: 'mounted',
  Error: 'error',
} as const;

export type ModuleState = (typeof ModuleState)[keyof typeof ModuleState];

