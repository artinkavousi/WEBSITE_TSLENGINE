// Curl Noise visualization
import * as THREE from 'three';
import type { EngineModule, ModuleContext } from '../../core/types';

interface CurlNoiseParams {
  scale: number;
  speed: number;
  curlStrength: number;
  color: string;
}

const curlNoiseModule: EngineModule<CurlNoiseParams> = {
  id: 'noise/curl',

  meta: {
    id: 'noise/curl',
    label: 'Curl Noise',
    description: 'Divergence-free curl noise for fluid-like motion',
    category: 'Noise',
    tags: ['noise', 'curl', 'fluid', 'procedural', 'shader'],
  },

  caps: {
    kind: 'scene',
    backends: ['webgpu', 'webgl'],
    requiresCompute: false,
    requiresStorage: false,
  },

  defaultParams: {
    scale: 1.5,
    speed: 1.0,
    curlStrength: 2.0,
    color: '#00ffaa',
  },

  schema: {
    jsonSchema: {
      type: 'object',
      properties: {
        scale: {
          type: 'number',
          description: 'Noise scale',
          minimum: 0.1,
          maximum: 5,
        },
        speed: {
          type: 'number',
          description: 'Animation speed',
          minimum: 0,
          maximum: 5,
        },
        curlStrength: {
          type: 'number',
          description: 'Curl effect strength',
          minimum: 0,
          maximum: 10,
        },
        color: {
          type: 'string',
          description: 'Line color',
        },
      },
    },
  },

  async init(ctx: ModuleContext, params: CurlNoiseParams) {
    // Create particle system for curl visualization
    const particleCount = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    // Initialize random positions
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 4;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: params.color,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);

    (ctx as any).points = points;
    (ctx as any).geometry = geometry;
    (ctx as any).material = material;
    (ctx as any).time = 0;
  },

  async mount(ctx: ModuleContext) {
    const points = (ctx as any).points;
    if (points) {
      ctx.root.add(points);
    }
  },

  update(ctx: ModuleContext, dt: number, params: CurlNoiseParams) {
    const points = (ctx as any).points;
    const geometry = (ctx as any).geometry as THREE.BufferGeometry;
    const material = (ctx as any).material as THREE.PointsMaterial;

    (ctx as any).time += dt * params.speed;
    const time = (ctx as any).time;

    if (geometry) {
      const positions = geometry.attributes.position.array as Float32Array;

      // Simple curl noise simulation
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];

        // Curl noise approximation
        const curl = params.curlStrength * 0.01;
        positions[i] += Math.sin(y * params.scale + time) * curl;
        positions[i + 1] += Math.cos(x * params.scale + time) * curl;
        positions[i + 2] += Math.sin(x * params.scale + y * params.scale + time) * curl * 0.5;

        // Wrap particles
        if (Math.abs(positions[i]) > 2) positions[i] *= -0.95;
        if (Math.abs(positions[i + 1]) > 2) positions[i + 1] *= -0.95;
        if (Math.abs(positions[i + 2]) > 2) positions[i + 2] *= -0.95;
      }

      geometry.attributes.position.needsUpdate = true;
    }

    if (material) {
      material.color.set(params.color);
    }

    if (points) {
      points.rotation.y += dt * 0.1;
    }

    return true;
  },

  unmount(ctx: ModuleContext) {
    const points = (ctx as any).points;
    if (points) {
      ctx.root.remove(points);
    }
  },

  dispose(ctx: ModuleContext) {
    const geometry = (ctx as any).geometry;
    const material = (ctx as any).material;

    if (geometry) geometry.dispose();
    if (material) material.dispose();

    (ctx as any).points = null;
    (ctx as any).geometry = null;
    (ctx as any).material = null;
    (ctx as any).time = null;
  },
};

export default curlNoiseModule;

