// Emissive Material with TSL
import * as THREE from 'three';
import type { EngineModule, ModuleContext } from '../../core/types';

interface EmissiveMaterialParams {
  color: string;
  emissiveColor: string;
  emissiveIntensity: number;
  pulseSpeed: number;
  pulseAmount: number;
}

const emissiveMaterialModule: EngineModule<EmissiveMaterialParams> = {
  id: 'materials/emissive',

  meta: {
    id: 'materials/emissive',
    label: 'Emissive Material',
    description: 'Self-illuminating material with pulsing animation',
    category: 'Materials',
    tags: ['material', 'emissive', 'glow', 'animated'],
  },

  caps: {
    kind: 'material',
    backends: ['webgpu', 'webgl'],
    requiresCompute: false,
    requiresStorage: false,
  },

  defaultParams: {
    color: '#222222',
    emissiveColor: '#00ffff',
    emissiveIntensity: 2.0,
    pulseSpeed: 2.0,
    pulseAmount: 0.5,
  },

  schema: {
    jsonSchema: {
      type: 'object',
      properties: {
        color: {
          type: 'string',
          description: 'Base color',
        },
        emissiveColor: {
          type: 'string',
          description: 'Emissive glow color',
        },
        emissiveIntensity: {
          type: 'number',
          description: 'Glow intensity',
          minimum: 0,
          maximum: 10,
        },
        pulseSpeed: {
          type: 'number',
          description: 'Pulse animation speed',
          minimum: 0,
          maximum: 10,
        },
        pulseAmount: {
          type: 'number',
          description: 'Pulse variation amount',
          minimum: 0,
          maximum: 1,
        },
      },
    },
  },

  async init(ctx: ModuleContext, params: EmissiveMaterialParams) {
    // Create torus geometry
    const geometry = new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16);

    // Create emissive material
    const material = new THREE.MeshStandardMaterial({
      color: params.color,
      emissive: params.emissiveColor,
      emissiveIntensity: params.emissiveIntensity,
      roughness: 0.2,
      metalness: 0.8,
    });

    const mesh = new THREE.Mesh(geometry, material);

    // Store on context
    (ctx as any).mesh = mesh;
    (ctx as any).geometry = geometry;
    (ctx as any).material = material;
    (ctx as any).time = 0;
  },

  async mount(ctx: ModuleContext) {
    const mesh = (ctx as any).mesh;
    if (mesh) {
      ctx.root.add(mesh);
    }
  },

  update(ctx: ModuleContext, dt: number, params: EmissiveMaterialParams) {
    const mesh = (ctx as any).mesh;
    const material = (ctx as any).material as THREE.MeshStandardMaterial;

    // Update time
    (ctx as any).time += dt;
    const time = (ctx as any).time;

    if (mesh) {
      mesh.rotation.y += dt * 0.3;
      mesh.rotation.x += dt * 0.15;
    }

    if (material) {
      // Update colors
      material.color.set(params.color);
      material.emissive.set(params.emissiveColor);

      // Pulse animation
      const pulse =
        1.0 +
        Math.sin(time * params.pulseSpeed) * params.pulseAmount;
      material.emissiveIntensity = params.emissiveIntensity * pulse;

      material.needsUpdate = true;
    }

    return true;
  },

  unmount(ctx: ModuleContext) {
    const mesh = (ctx as any).mesh;
    if (mesh) {
      ctx.root.remove(mesh);
    }
  },

  dispose(ctx: ModuleContext) {
    const geometry = (ctx as any).geometry;
    const material = (ctx as any).material;

    if (geometry) {
      geometry.dispose();
    }

    if (material) {
      material.dispose();
    }

    (ctx as any).mesh = null;
    (ctx as any).geometry = null;
    (ctx as any).material = null;
    (ctx as any).time = null;
  },
};

export default emissiveMaterialModule;

