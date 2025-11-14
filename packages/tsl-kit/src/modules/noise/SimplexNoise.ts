// Simplex Noise visualization
import * as THREE from 'three';
import type { EngineModule, ModuleContext } from '../../core/types';

interface SimplexNoiseParams {
  scale: number;
  speed: number;
  octaves: number;
  colorA: string;
  colorB: string;
}

const simplexNoiseModule: EngineModule<SimplexNoiseParams> = {
  id: 'noise/simplex',

  meta: {
    id: 'noise/simplex',
    label: 'Simplex Noise',
    description: 'Classic simplex noise visualization',
    category: 'Noise',
    tags: ['noise', 'simplex', 'procedural', 'shader'],
  },

  caps: {
    kind: 'scene',
    backends: ['webgpu', 'webgl'],
    requiresCompute: false,
    requiresStorage: false,
  },

  defaultParams: {
    scale: 2.0,
    speed: 0.5,
    octaves: 4,
    colorA: '#ff0080',
    colorB: '#0080ff',
  },

  schema: {
    jsonSchema: {
      type: 'object',
      properties: {
        scale: {
          type: 'number',
          description: 'Noise scale',
          minimum: 0.1,
          maximum: 10,
        },
        speed: {
          type: 'number',
          description: 'Animation speed',
          minimum: 0,
          maximum: 5,
        },
        octaves: {
          type: 'number',
          description: 'Number of octaves',
          minimum: 1,
          maximum: 8,
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

  async init(ctx: ModuleContext, params: SimplexNoiseParams) {
    const geometry = new THREE.PlaneGeometry(3, 3, 128, 128);

    // Simplex noise shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScale: { value: params.scale },
        uOctaves: { value: params.octaves },
        uColorA: { value: new THREE.Color(params.colorA) },
        uColorB: { value: new THREE.Color(params.colorB) },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uScale;
        
        varying vec2 vUv;
        varying float vNoise;

        // Simplex 2D noise (simplified version)
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                   -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
            dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vUv = uv;
          
          vec2 noiseCoord = uv * uScale + uTime * 0.1;
          float noise = snoise(noiseCoord) * 0.5 + 0.5;
          vNoise = noise;
          
          vec3 pos = position;
          pos.z = noise * 0.5;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        
        varying vec2 vUv;
        varying float vNoise;

        void main() {
          vec3 color = mix(uColorA, uColorB, vNoise);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
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

  update(ctx: ModuleContext, dt: number, params: SimplexNoiseParams) {
    const mesh = (ctx as any).mesh;
    const material = (ctx as any).material as THREE.ShaderMaterial;

    (ctx as any).time += dt * params.speed;
    const time = (ctx as any).time;

    if (mesh) {
      mesh.rotation.x = -Math.PI / 4;
    }

    if (material && material.uniforms) {
      material.uniforms.uTime.value = time;
      material.uniforms.uScale.value = params.scale;
      material.uniforms.uOctaves.value = Math.floor(params.octaves);
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

export default simplexNoiseModule;

