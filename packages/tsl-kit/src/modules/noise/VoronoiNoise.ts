// Voronoi noise visualization
import * as THREE from 'three';
import type { EngineModule, ModuleContext } from '../../core/types';

interface VoronoiNoiseParams {
  scale: number;
  speed: number;
  cells: number;
  colorA: string;
  colorB: string;
}

const voronoiNoiseModule: EngineModule<VoronoiNoiseParams> = {
  id: 'noise/voronoi',

  meta: {
    id: 'noise/voronoi',
    label: 'Voronoi Noise',
    description: 'Cellular voronoi pattern visualization',
    category: 'Noise',
    tags: ['noise', 'voronoi', 'cellular', 'procedural', 'shader'],
  },

  caps: {
    kind: 'scene',
    backends: ['webgpu', 'webgl'],
    requiresCompute: false,
    requiresStorage: false,
  },

  defaultParams: {
    scale: 3.0,
    speed: 0.3,
    cells: 8,
    colorA: '#ff4400',
    colorB: '#0044ff',
  },

  schema: {
    jsonSchema: {
      type: 'object',
      properties: {
        scale: {
          type: 'number',
          description: 'Pattern scale',
          minimum: 0.5,
          maximum: 10,
        },
        speed: {
          type: 'number',
          description: 'Animation speed',
          minimum: 0,
          maximum: 3,
        },
        cells: {
          type: 'number',
          description: 'Number of cells',
          minimum: 2,
          maximum: 16,
        },
        colorA: {
          type: 'string',
          description: 'First color',
        },
        colorB: {
          type: 'string',
          description: 'Second color',
        },
      },
    },
  },

  async init(ctx: ModuleContext, params: VoronoiNoiseParams) {
    const geometry = new THREE.SphereGeometry(1.2, 64, 64);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScale: { value: params.scale },
        uCells: { value: params.cells },
        uColorA: { value: new THREE.Color(params.colorA) },
        uColorB: { value: new THREE.Color(params.colorB) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uScale;
        uniform float uCells;
        uniform vec3 uColorA;
        uniform vec3 uColorB;

        varying vec2 vUv;
        varying vec3 vPosition;

        // Hash function for random
        vec2 hash2(vec2 p) {
          p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
          return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
        }

        // Voronoi distance
        float voronoi(vec2 x, float t) {
          vec2 n = floor(x);
          vec2 f = fract(x);

          float minDist = 8.0;
          
          for(int j = -1; j <= 1; j++) {
            for(int i = -1; i <= 1; i++) {
              vec2 g = vec2(float(i), float(j));
              vec2 o = hash2(n + g);
              o = 0.5 + 0.5 * sin(t + 6.2831 * o);
              vec2 r = g + o - f;
              float d = dot(r, r);
              minDist = min(minDist, d);
            }
          }
          
          return minDist;
        }

        void main() {
          vec2 uv = vUv * uScale;
          float dist = voronoi(uv * uCells, uTime);
          
          // Create cell pattern
          float pattern = smoothstep(0.0, 0.1, dist);
          vec3 color = mix(uColorA, uColorB, pattern);
          
          // Add some edge highlighting
          float edge = 1.0 - smoothstep(0.0, 0.05, dist);
          color += vec3(edge) * 0.3;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);

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

  update(ctx: ModuleContext, dt: number, params: VoronoiNoiseParams) {
    const mesh = (ctx as any).mesh;
    const material = (ctx as any).material as THREE.ShaderMaterial;

    (ctx as any).time += dt * params.speed;
    const time = (ctx as any).time;

    if (mesh) {
      mesh.rotation.y += dt * 0.2;
      mesh.rotation.x += dt * 0.1;
    }

    if (material && material.uniforms) {
      material.uniforms.uTime.value = time;
      material.uniforms.uScale.value = params.scale;
      material.uniforms.uCells.value = params.cells;
      material.uniforms.uColorA.value.set(params.colorA);
      material.uniforms.uColorB.value.set(params.colorB);
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

    if (geometry) geometry.dispose();
    if (material) material.dispose();

    (ctx as any).mesh = null;
    (ctx as any).geometry = null;
    (ctx as any).material = null;
    (ctx as any).time = null;
  },
};

export default voronoiNoiseModule;

