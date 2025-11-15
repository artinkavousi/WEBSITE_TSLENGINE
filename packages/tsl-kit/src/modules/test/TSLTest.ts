// Test module for TSL (Three Shading Language) with WebGPU
import * as THREE from 'three';
import type { EngineModule, ModuleContext } from '../../core/types';

interface TSLTestParams {
  color: string;
  frequency: number;
  amplitude: number;
}

const tslTestModule: EngineModule<TSLTestParams> = {
  id: 'test/tsl-shader',

  meta: {
    id: 'test/tsl-shader',
    label: 'TSL Shader Test',
    description: 'Test Three Shading Language with WebGPU',
    category: 'Test',
    tags: ['test', 'tsl', 'webgpu', 'shader'],
  },

  caps: {
    kind: 'scene',
    backends: ['webgpu', 'webgl'], // TSL works on both
    requiresCompute: false,
    requiresStorage: false,
  },

  defaultParams: {
    color: '#00ff88',
    frequency: 2.0,
    amplitude: 0.5,
  },

  schema: {
    jsonSchema: {
      type: 'object',
      properties: {
        color: {
          type: 'string',
          description: 'Base color',
        },
        frequency: {
          type: 'number',
          description: 'Wave frequency',
          minimum: 0.1,
          maximum: 10,
        },
        amplitude: {
          type: 'number',
          description: 'Wave amplitude',
          minimum: 0,
          maximum: 2,
        },
      },
    },
  },

  async init(ctx: ModuleContext, params: TSLTestParams) {
    // TSL will be loaded dynamically
    // For now, create a basic mesh with standard material
    // We'll upgrade to TSL material in the next step
    
    const geometry = new THREE.PlaneGeometry(2, 2, 32, 32);
    
    // For this initial test, use a standard material with vertex displacement
    // This will be replaced with TSL nodes in the conversion step
    const material = new THREE.MeshStandardMaterial({
      color: params.color,
      wireframe: false,
      flatShading: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    ctx.root.add(mesh);

    // Store for update
    (ctx.root as any).userData = {
      mesh,
      time: 0,
    };

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ctx.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    ctx.scene.add(directionalLight);
  },

  mount(ctx: ModuleContext, params: TSLTestParams) {
    console.log('TSL Test mounted with params:', params);
  },

  update(ctx: ModuleContext, dt: number, params: TSLTestParams): boolean {
    const userData = (ctx.root as any).userData;
    if (!userData) return false;

    userData.time += dt;
    const mesh = userData.mesh as THREE.Mesh;

    // Animate vertex positions to simulate TSL wave effect
    // This is a placeholder - real TSL will do this in shaders
    const geometry = mesh.geometry as THREE.PlaneGeometry;
    const positions = geometry.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const wave = Math.sin(x * params.frequency + userData.time) * 
                   Math.cos(y * params.frequency + userData.time) * 
                   params.amplitude;
      positions.setZ(i, wave);
    }
    
    positions.needsUpdate = true;
    geometry.computeVertexNormals();

    // Update material color
    (mesh.material as THREE.MeshStandardMaterial).color.set(params.color);

    return true; // Request redraw
  },

  dispose(ctx: ModuleContext) {
    ctx.root.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((mat) => mat.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
  },
};

export default tslTestModule;

