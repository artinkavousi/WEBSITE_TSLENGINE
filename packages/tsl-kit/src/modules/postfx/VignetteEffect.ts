// Vignette Effect demonstration
import * as THREE from 'three';
import type { EngineModule, ModuleContext } from '../../core/types';

interface VignetteEffectParams {
  intensity: number;
  smoothness: number;
  color: string;
}

const vignetteEffectModule: EngineModule<VignetteEffectParams> = {
  id: 'postfx/vignette',

  meta: {
    id: 'postfx/vignette',
    label: 'Vignette Effect',
    description: 'Screen-space vignette darkening effect',
    category: 'Post-FX',
    tags: ['postfx', 'vignette', 'screen-space', 'effect'],
  },

  caps: {
    kind: 'scene',
    backends: ['webgpu', 'webgl'],
    requiresCompute: false,
    requiresStorage: false,
  },

  defaultParams: {
    intensity: 0.5,
    smoothness: 0.5,
    color: '#000000',
  },

  schema: {
    jsonSchema: {
      type: 'object',
      properties: {
        intensity: {
          type: 'number',
          description: 'Vignette darkness',
          minimum: 0,
          maximum: 1,
        },
        smoothness: {
          type: 'number',
          description: 'Edge softness',
          minimum: 0,
          maximum: 1,
        },
        color: {
          type: 'string',
          description: 'Vignette color',
        },
      },
    },
  },

  async init(ctx: ModuleContext, params: VignetteEffectParams) {
    // Create scene with vignette overlay
    // Central content
    const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
    const material = new THREE.MeshStandardMaterial({
      color: '#00ff88',
      roughness: 0.3,
      metalness: 0.7,
    });
    const torus = new THREE.Mesh(geometry, material);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight1 = new THREE.PointLight(0xff4400, 2, 20);
    pointLight1.position.set(3, 3, 3);
    const pointLight2 = new THREE.PointLight(0x0044ff, 2, 20);
    pointLight2.position.set(-3, -3, 3);

    // Vignette overlay (rendered as screen-space quad would be in full implementation)
    const vignetteGeo = new THREE.PlaneGeometry(10, 10);
    const vignetteMat = new THREE.ShaderMaterial({
      uniforms: {
        uIntensity: { value: params.intensity },
        uSmoothness: { value: params.smoothness },
        uColor: { value: new THREE.Color(params.color) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uIntensity;
        uniform float uSmoothness;
        uniform vec3 uColor;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv - 0.5;
          float dist = length(uv);
          float vignette = smoothstep(0.8, 0.8 - uSmoothness, dist);
          vignette = mix(1.0, vignette, uIntensity);
          
          gl_FragColor = vec4(uColor * (1.0 - vignette), 1.0 - vignette);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const vignetteMesh = new THREE.Mesh(vignetteGeo, vignetteMat);
    vignetteMesh.position.z = 2; // In front of camera

    (ctx as any).torus = torus;
    (ctx as any).geometry = geometry;
    (ctx as any).material = material;
    (ctx as any).ambientLight = ambientLight;
    (ctx as any).pointLight1 = pointLight1;
    (ctx as any).pointLight2 = pointLight2;
    (ctx as any).vignetteMesh = vignetteMesh;
    (ctx as any).vignetteGeo = vignetteGeo;
    (ctx as any).vignetteMat = vignetteMat;
    (ctx as any).time = 0;
  },

  async mount(ctx: ModuleContext) {
    const torus = (ctx as any).torus;
    const ambientLight = (ctx as any).ambientLight;
    const pointLight1 = (ctx as any).pointLight1;
    const pointLight2 = (ctx as any).pointLight2;
    const vignetteMesh = (ctx as any).vignetteMesh;

    if (torus) ctx.root.add(torus);
    if (ambientLight) ctx.root.add(ambientLight);
    if (pointLight1) ctx.root.add(pointLight1);
    if (pointLight2) ctx.root.add(pointLight2);
    if (vignetteMesh) ctx.root.add(vignetteMesh);
  },

  update(ctx: ModuleContext, dt: number, params: VignetteEffectParams) {
    const torus = (ctx as any).torus;
    const vignetteMat = (ctx as any).vignetteMat as THREE.ShaderMaterial;

    (ctx as any).time += dt;
    const time = (ctx as any).time;

    if (torus) {
      torus.rotation.x += dt * 0.5;
      torus.rotation.y += dt * 0.7;
    }

    if (vignetteMat && vignetteMat.uniforms) {
      vignetteMat.uniforms.uIntensity.value = params.intensity;
      vignetteMat.uniforms.uSmoothness.value = params.smoothness;
      vignetteMat.uniforms.uColor.value.set(params.color);
    }

    return true;
  },

  unmount(ctx: ModuleContext) {
    const torus = (ctx as any).torus;
    const ambientLight = (ctx as any).ambientLight;
    const pointLight1 = (ctx as any).pointLight1;
    const pointLight2 = (ctx as any).pointLight2;
    const vignetteMesh = (ctx as any).vignetteMesh;

    if (torus) ctx.root.remove(torus);
    if (ambientLight) ctx.root.remove(ambientLight);
    if (pointLight1) ctx.root.remove(pointLight1);
    if (pointLight2) ctx.root.remove(pointLight2);
    if (vignetteMesh) ctx.root.remove(vignetteMesh);
  },

  dispose(ctx: ModuleContext) {
    const geometry = (ctx as any).geometry;
    const material = (ctx as any).material;
    const vignetteGeo = (ctx as any).vignetteGeo;
    const vignetteMat = (ctx as any).vignetteMat;
    const ambientLight = (ctx as any).ambientLight;
    const pointLight1 = (ctx as any).pointLight1;
    const pointLight2 = (ctx as any).pointLight2;

    if (geometry) geometry.dispose();
    if (material) material.dispose();
    if (vignetteGeo) vignetteGeo.dispose();
    if (vignetteMat) vignetteMat.dispose();
    if (ambientLight) ambientLight.dispose();
    if (pointLight1) pointLight1.dispose();
    if (pointLight2) pointLight2.dispose();

    (ctx as any).torus = null;
    (ctx as any).geometry = null;
    (ctx as any).material = null;
    (ctx as any).vignetteMesh = null;
    (ctx as any).vignetteGeo = null;
    (ctx as any).vignetteMat = null;
    (ctx as any).ambientLight = null;
    (ctx as any).pointLight1 = null;
    (ctx as any).pointLight2 = null;
    (ctx as any).time = null;
  },
};

export default vignetteEffectModule;

