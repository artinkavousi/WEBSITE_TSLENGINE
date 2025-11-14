// FBM (Fractional Brownian Motion) Noise visualization
import * as THREE from 'three';
import type { EngineModule, ModuleContext } from '../../core/types';

interface FBMNoiseParams {
  scale: number;
  speed: number;
  octaves: number;
  lacunarity: number;
  gain: number;
  colorA: string;
  colorB: string;
}

const fbmNoiseModule: EngineModule<FBMNoiseParams> = {
  id: 'noise/fbm',

  meta: {
    id: 'noise/fbm',
    label: 'FBM Noise',
    description: 'Fractional Brownian Motion - layered noise for natural patterns',
    category: 'Noise',
    tags: ['noise', 'fbm', 'fractal', 'procedural', 'shader'],
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
    octaves: 6,
    lacunarity: 2.0,
    gain: 0.5,
    colorA: '#8800ff',
    colorB: '#ff8800',
  },

  schema: {
    jsonSchema: {
      type: 'object',
      properties: {
        scale: {
          type: 'number',
          description: 'Base scale',
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
          description: 'Number of noise layers',
          minimum: 1,
          maximum: 8,
        },
        lacunarity: {
          type: 'number',
          description: 'Frequency multiplier per octave',
          minimum: 1.5,
          maximum: 4,
        },
        gain: {
          type: 'number',
          description: 'Amplitude multiplier per octave',
          minimum: 0.1,
          maximum: 1,
        },
        colorA: {
          type: 'string',
          description: 'Low value color',
        },
        colorB: {
          type: 'string',
          description: 'High value color',
        },
      },
    },
  },

  async init(ctx: ModuleContext, params: FBMNoiseParams) {
    const geometry = new THREE.PlaneGeometry(4, 4, 256, 256);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScale: { value: params.scale },
        uOctaves: { value: params.octaves },
        uLacunarity: { value: params.lacunarity },
        uGain: { value: params.gain },
        uColorA: { value: new THREE.Color(params.colorA) },
        uColorB: { value: new THREE.Color(params.colorB) },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uScale;
        uniform float uOctaves;
        uniform float uLacunarity;
        uniform float uGain;

        varying vec2 vUv;
        varying float vHeight;

        // Simplex noise function (simplified)
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

        // FBM function
        float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          float frequency = 1.0;
          
          for(int i = 0; i < 8; i++) {
            if(float(i) >= uOctaves) break;
            value += amplitude * snoise(p * frequency);
            frequency *= uLacunarity;
            amplitude *= uGain;
          }
          
          return value;
        }

        void main() {
          vUv = uv;
          
          vec2 pos = uv * uScale + vec2(uTime * 0.1, 0.0);
          float height = fbm(pos);
          vHeight = height * 0.5 + 0.5;
          
          vec3 newPos = position;
          newPos.z = height * 0.8;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;

        varying vec2 vUv;
        varying float vHeight;

        void main() {
          vec3 color = mix(uColorA, uColorB, vHeight);
          
          // Add contour lines
          float contour = fract(vHeight * 10.0);
          contour = smoothstep(0.45, 0.55, contour);
          color = mix(color, vec3(1.0), contour * 0.2);
          
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

  update(ctx: ModuleContext, dt: number, params: FBMNoiseParams) {
    const mesh = (ctx as any).mesh;
    const material = (ctx as any).material as THREE.ShaderMaterial;

    (ctx as any).time += dt * params.speed;
    const time = (ctx as any).time;

    if (mesh) {
      mesh.rotation.x = -Math.PI / 3;
      mesh.rotation.z += dt * 0.1;
    }

    if (material && material.uniforms) {
      material.uniforms.uTime.value = time;
      material.uniforms.uScale.value = params.scale;
      material.uniforms.uOctaves.value = Math.floor(params.octaves);
      material.uniforms.uLacunarity.value = params.lacunarity;
      material.uniforms.uGain.value = params.gain;
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

export default fbmNoiseModule;

