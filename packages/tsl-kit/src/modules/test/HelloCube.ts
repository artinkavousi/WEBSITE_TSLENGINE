// Test module: Hello Cube
import * as THREE from 'three';
import type { EngineModule, ModuleContext } from '../../core/types';

interface HelloCubeParams {
  color: string;
  rotationSpeed: number;
  scale: number;
}

const helloCubeModule: EngineModule<HelloCubeParams> = {
  id: 'test/hello-cube',
  
  meta: {
    id: 'test/hello-cube',
    label: 'Hello Cube',
    description: 'A simple rotating cube to test the engine',
    category: 'Test',
    tags: ['test', 'basic', 'geometry'],
  },

  caps: {
    kind: 'scene',
    backends: ['webgpu', 'webgl'],
    requiresCompute: false,
    requiresStorage: false,
  },

  defaultParams: {
    color: '#ff1744',
    rotationSpeed: 1.0,
    scale: 1.0,
  },

  schema: {
    jsonSchema: {
      type: 'object',
      properties: {
        color: {
          type: 'string',
          description: 'Cube color',
        },
        rotationSpeed: {
          type: 'number',
          description: 'Rotation speed',
          minimum: 0,
          maximum: 10,
        },
        scale: {
          type: 'number',
          description: 'Cube scale',
          minimum: 0.1,
          maximum: 5,
        },
      },
    },
  },

  async init(ctx: ModuleContext, params: HelloCubeParams) {
    // Create a cube mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: params.color,
      roughness: 0.5,
      metalness: 0.5,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.scale.setScalar(params.scale);

    // Store on context for later access
    (ctx as any).cube = cube;
  },

  async mount(ctx: ModuleContext) {
    const cube = (ctx as any).cube;
    if (cube) {
      ctx.root.add(cube);
    }
  },

  update(ctx: ModuleContext, dt: number, params: HelloCubeParams) {
    const cube = (ctx as any).cube;
    if (cube) {
      cube.rotation.x += dt * params.rotationSpeed;
      cube.rotation.y += dt * params.rotationSpeed * 0.7;
      cube.scale.setScalar(params.scale);
      (cube.material as THREE.MeshStandardMaterial).color.set(params.color);
    }
    return true; // Request frame update
  },

  unmount(ctx: ModuleContext) {
    const cube = (ctx as any).cube;
    if (cube) {
      ctx.root.remove(cube);
    }
  },

  dispose(ctx: ModuleContext) {
    const cube = (ctx as any).cube;
    if (cube) {
      cube.geometry.dispose();
      (cube.material as THREE.Material).dispose();
      (ctx as any).cube = null;
    }
  },
};

export default helloCubeModule;

