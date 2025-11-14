// Bloom Effect demonstration
import * as THREE from 'three';
import type { EngineModule, ModuleContext } from '../../core/types';

interface BloomEffectParams {
  strength: number;
  radius: number;
  threshold: number;
  color: string;
}

const bloomEffectModule: EngineModule<BloomEffectParams> = {
  id: 'postfx/bloom',

  meta: {
    id: 'postfx/bloom',
    label: 'Bloom Effect',
    description: 'Glowing bloom effect demonstration',
    category: 'Post-FX',
    tags: ['postfx', 'bloom', 'glow', 'effect'],
  },

  caps: {
    kind: 'scene',
    backends: ['webgpu', 'webgl'],
    requiresCompute: false,
    requiresStorage: false,
  },

  defaultParams: {
    strength: 2.0,
    radius: 0.5,
    threshold: 0.5,
    color: '#ffaa00',
  },

  schema: {
    jsonSchema: {
      type: 'object',
      properties: {
        strength: {
          type: 'number',
          description: 'Bloom intensity',
          minimum: 0,
          maximum: 5,
        },
        radius: {
          type: 'number',
          description: 'Bloom spread',
          minimum: 0,
          maximum: 2,
        },
        threshold: {
          type: 'number',
          description: 'Brightness threshold',
          minimum: 0,
          maximum: 1,
        },
        color: {
          type: 'string',
          description: 'Bloom color tint',
        },
      },
    },
  },

  async init(ctx: ModuleContext, params: BloomEffectParams) {
    // Create multiple bright objects to demonstrate bloom
    const group = new THREE.Group();

    // Central bright sphere
    const sphereGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: params.color,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(sphere);

    // Orbiting bright cubes
    const cubeGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const cubes: THREE.Mesh[] = [];

    for (let i = 0; i < 8; i++) {
      const cubeMat = new THREE.MeshBasicMaterial({
        color: params.color,
      });
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      
      const angle = (i / 8) * Math.PI * 2;
      cube.position.x = Math.cos(angle) * 2;
      cube.position.z = Math.sin(angle) * 2;
      
      group.add(cube);
      cubes.push(cube);
    }

    // Point lights for additional glow
    const lights: THREE.PointLight[] = [];
    for (let i = 0; i < 4; i++) {
      const light = new THREE.PointLight(params.color, params.strength, 10);
      const angle = (i / 4) * Math.PI * 2;
      light.position.x = Math.cos(angle) * 1.5;
      light.position.z = Math.sin(angle) * 1.5;
      group.add(light);
      lights.push(light);
    }

    (ctx as any).group = group;
    (ctx as any).sphere = sphere;
    (ctx as any).cubes = cubes;
    (ctx as any).lights = lights;
    (ctx as any).sphereGeo = sphereGeo;
    (ctx as any).cubeGeo = cubeGeo;
    (ctx as any).time = 0;
  },

  async mount(ctx: ModuleContext) {
    const group = (ctx as any).group;
    if (group) {
      ctx.root.add(group);
    }
  },

  update(ctx: ModuleContext, dt: number, params: BloomEffectParams) {
    const group = (ctx as any).group;
    const sphere = (ctx as any).sphere;
    const cubes = (ctx as any).cubes as THREE.Mesh[];
    const lights = (ctx as any).lights as THREE.PointLight[];

    (ctx as any).time += dt;
    const time = (ctx as any).time;

    if (group) {
      group.rotation.y += dt * 0.3;
    }

    // Update materials
    if (sphere) {
      (sphere.material as THREE.MeshBasicMaterial).color.set(params.color);
    }

    if (cubes) {
      cubes.forEach((cube, i) => {
        (cube.material as THREE.MeshBasicMaterial).color.set(params.color);
        cube.position.y = Math.sin(time * 2 + i * 0.5) * 0.3;
        cube.rotation.x += dt * 2;
        cube.rotation.y += dt * 3;
      });
    }

    // Update lights
    if (lights) {
      lights.forEach((light, i) => {
        light.color.set(params.color);
        light.intensity = params.strength * (1 + Math.sin(time * 2 + i) * 0.3);
        light.distance = 5 + params.radius * 5;
      });
    }

    return true;
  },

  unmount(ctx: ModuleContext) {
    const group = (ctx as any).group;
    if (group) {
      ctx.root.remove(group);
    }
  },

  dispose(ctx: ModuleContext) {
    const sphereGeo = (ctx as any).sphereGeo;
    const cubeGeo = (ctx as any).cubeGeo;
    const sphere = (ctx as any).sphere;
    const cubes = (ctx as any).cubes as THREE.Mesh[];
    const lights = (ctx as any).lights;

    if (sphereGeo) sphereGeo.dispose();
    if (cubeGeo) cubeGeo.dispose();
    if (sphere) (sphere.material as THREE.Material).dispose();
    if (cubes) {
      cubes.forEach(cube => (cube.material as THREE.Material).dispose());
    }
    if (lights) {
      lights.forEach((light: THREE.Light) => light.dispose());
    }

    (ctx as any).group = null;
    (ctx as any).sphere = null;
    (ctx as any).cubes = null;
    (ctx as any).lights = null;
    (ctx as any).sphereGeo = null;
    (ctx as any).cubeGeo = null;
    (ctx as any).time = null;
  },
};

export default bloomEffectModule;

