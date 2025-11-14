// PBR Material with TSL
import * as THREE from 'three';
import type { EngineModule, ModuleContext } from '../../core/types';

interface PBRMaterialParams {
  color: string;
  roughness: number;
  metalness: number;
  normalScale: number;
  emissiveIntensity: number;
  envMapIntensity: number;
}

const pbrMaterialModule: EngineModule<PBRMaterialParams> = {
  id: 'materials/pbr',

  meta: {
    id: 'materials/pbr',
    label: 'PBR Material',
    description: 'Physically-based rendering material with full TSL support',
    category: 'Materials',
    tags: ['material', 'pbr', 'physically-based', 'tsl'],
  },

  caps: {
    kind: 'material',
    backends: ['webgpu', 'webgl'],
    requiresCompute: false,
    requiresStorage: false,
  },

  defaultParams: {
    color: '#ffffff',
    roughness: 0.5,
    metalness: 0.5,
    normalScale: 1.0,
    emissiveIntensity: 0.0,
    envMapIntensity: 1.0,
  },

  schema: {
    jsonSchema: {
      type: 'object',
      properties: {
        color: {
          type: 'string',
          description: 'Base color',
        },
        roughness: {
          type: 'number',
          description: 'Surface roughness',
          minimum: 0,
          maximum: 1,
        },
        metalness: {
          type: 'number',
          description: 'Metallic property',
          minimum: 0,
          maximum: 1,
        },
        normalScale: {
          type: 'number',
          description: 'Normal map intensity',
          minimum: 0,
          maximum: 2,
        },
        emissiveIntensity: {
          type: 'number',
          description: 'Emissive light intensity',
          minimum: 0,
          maximum: 5,
        },
        envMapIntensity: {
          type: 'number',
          description: 'Environment map intensity',
          minimum: 0,
          maximum: 3,
        },
      },
    },
  },

  async init(ctx: ModuleContext, params: PBRMaterialParams) {
    // Create sphere geometry to showcase material
    const geometry = new THREE.IcosahedronGeometry(1, 4);

    // Create PBR material
    const material = new THREE.MeshStandardMaterial({
      color: params.color,
      roughness: params.roughness,
      metalness: params.metalness,
      envMapIntensity: params.envMapIntensity,
    });

    const mesh = new THREE.Mesh(geometry, material);

    // Add some lights to showcase PBR
    const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight1.position.set(5, 5, 5);

    const pointLight2 = new THREE.PointLight(0xff4444, 0.5, 100);
    pointLight2.position.set(-5, -5, 5);

    const pointLight3 = new THREE.PointLight(0x4444ff, 0.5, 100);
    pointLight3.position.set(0, 5, -5);

    // Store on context
    (ctx as any).mesh = mesh;
    (ctx as any).lights = [pointLight1, pointLight2, pointLight3];
    (ctx as any).geometry = geometry;
    (ctx as any).material = material;
  },

  async mount(ctx: ModuleContext) {
    const mesh = (ctx as any).mesh;
    const lights = (ctx as any).lights;

    if (mesh) {
      ctx.root.add(mesh);
    }

    if (lights) {
      lights.forEach((light: THREE.Light) => ctx.root.add(light));
    }
  },

  update(ctx: ModuleContext, dt: number, params: PBRMaterialParams) {
    const mesh = (ctx as any).mesh;
    const material = (ctx as any).material as THREE.MeshStandardMaterial;

    if (mesh) {
      mesh.rotation.y += dt * 0.5;
      mesh.rotation.x += dt * 0.2;
    }

    if (material) {
      material.color.set(params.color);
      material.roughness = params.roughness;
      material.metalness = params.metalness;
      material.envMapIntensity = params.envMapIntensity;
      material.emissiveIntensity = params.emissiveIntensity;
      material.needsUpdate = true;
    }

    return true;
  },

  unmount(ctx: ModuleContext) {
    const mesh = (ctx as any).mesh;
    const lights = (ctx as any).lights;

    if (mesh) {
      ctx.root.remove(mesh);
    }

    if (lights) {
      lights.forEach((light: THREE.Light) => ctx.root.remove(light));
    }
  },

  dispose(ctx: ModuleContext) {
    const geometry = (ctx as any).geometry;
    const material = (ctx as any).material;
    const lights = (ctx as any).lights;

    if (geometry) {
      geometry.dispose();
    }

    if (material) {
      material.dispose();
    }

    if (lights) {
      lights.forEach((light: THREE.Light) => light.dispose());
    }

    (ctx as any).mesh = null;
    (ctx as any).lights = null;
    (ctx as any).geometry = null;
    (ctx as any).material = null;
  },
};

export default pbrMaterialModule;

