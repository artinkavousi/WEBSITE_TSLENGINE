// Iridescent Material with custom shader
import * as THREE from 'three';
import type { EngineModule, ModuleContext } from '../../core/types';

interface IridescentMaterialParams {
  baseColor: string;
  shiftIntensity: number;
  fresnelPower: number;
  speed: number;
}

const iridescentMaterialModule: EngineModule<IridescentMaterialParams> = {
  id: 'materials/iridescent',

  meta: {
    id: 'materials/iridescent',
    label: 'Iridescent Material',
    description: 'Color-shifting iridescent material with fresnel effect',
    category: 'Materials',
    tags: ['material', 'iridescent', 'shader', 'fresnel', 'color-shift'],
  },

  caps: {
    kind: 'material',
    backends: ['webgpu', 'webgl'],
    requiresCompute: false,
    requiresStorage: false,
  },

  defaultParams: {
    baseColor: '#ff00ff',
    shiftIntensity: 2.0,
    fresnelPower: 3.0,
    speed: 0.5,
  },

  schema: {
    jsonSchema: {
      type: 'object',
      properties: {
        baseColor: {
          type: 'string',
          description: 'Base color',
        },
        shiftIntensity: {
          type: 'number',
          description: 'Color shift intensity',
          minimum: 0,
          maximum: 5,
        },
        fresnelPower: {
          type: 'number',
          description: 'Fresnel effect power',
          minimum: 0.5,
          maximum: 10,
        },
        speed: {
          type: 'number',
          description: 'Animation speed',
          minimum: 0,
          maximum: 5,
        },
      },
    },
  },

  async init(ctx: ModuleContext, params: IridescentMaterialParams) {
    // Create icosahedron geometry
    const geometry = new THREE.IcosahedronGeometry(1, 3);

    // Custom shader material for iridescence
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uBaseColor: { value: new THREE.Color(params.baseColor) },
        uShiftIntensity: { value: params.shiftIntensity },
        uFresnelPower: { value: params.fresnelPower },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uBaseColor;
        uniform float uShiftIntensity;
        uniform float uFresnelPower;

        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          // Fresnel effect
          vec3 viewDir = normalize(vViewPosition);
          float fresnel = pow(1.0 - dot(vNormal, viewDir), uFresnelPower);

          // Iridescent color shift
          float shift = fresnel + uTime * 0.5;
          vec3 color1 = vec3(1.0, 0.0, 0.5); // Magenta
          vec3 color2 = vec3(0.0, 0.5, 1.0); // Cyan
          vec3 color3 = vec3(0.5, 1.0, 0.0); // Yellow-green

          float mixValue = fract(shift);
          vec3 shiftColor;
          
          if (shift < 1.0) {
            shiftColor = mix(color1, color2, mixValue);
          } else if (shift < 2.0) {
            shiftColor = mix(color2, color3, mixValue);
          } else {
            shiftColor = mix(color3, color1, mixValue);
          }

          // Combine base color with iridescence
          vec3 finalColor = mix(uBaseColor, shiftColor, fresnel * uShiftIntensity * 0.5);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
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

  update(ctx: ModuleContext, dt: number, params: IridescentMaterialParams) {
    const mesh = (ctx as any).mesh;
    const material = (ctx as any).material as THREE.ShaderMaterial;

    // Update time
    (ctx as any).time += dt * params.speed;
    const time = (ctx as any).time;

    if (mesh) {
      mesh.rotation.y += dt * 0.4;
      mesh.rotation.x += dt * 0.2;
    }

    if (material && material.uniforms) {
      material.uniforms.uTime.value = time;
      material.uniforms.uBaseColor.value.set(params.baseColor);
      material.uniforms.uShiftIntensity.value = params.shiftIntensity;
      material.uniforms.uFresnelPower.value = params.fresnelPower;
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

export default iridescentMaterialModule;

