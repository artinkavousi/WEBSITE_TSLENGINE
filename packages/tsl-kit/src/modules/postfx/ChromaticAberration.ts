// Chromatic Aberration Effect demonstration
import * as THREE from 'three';
import type { EngineModule, ModuleContext } from '../../core/types';

interface ChromaticAberrationParams {
  offset: number;
  radialOffset: number;
  strength: number;
}

const chromaticAberrationModule: EngineModule<ChromaticAberrationParams> = {
  id: 'postfx/chromatic-aberration',

  meta: {
    id: 'postfx/chromatic-aberration',
    label: 'Chromatic Aberration',
    description: 'RGB color channel separation effect',
    category: 'Post-FX',
    tags: ['postfx', 'chromatic-aberration', 'glitch', 'effect'],
  },

  caps: {
    kind: 'scene',
    backends: ['webgpu', 'webgl'],
    requiresCompute: false,
    requiresStorage: false,
  },

  defaultParams: {
    offset: 0.005,
    radialOffset: 0.5,
    strength: 1.0,
  },

  schema: {
    jsonSchema: {
      type: 'object',
      properties: {
        offset: {
          type: 'number',
          description: 'RGB channel offset',
          minimum: 0,
          maximum: 0.02,
        },
        radialOffset: {
          type: 'number',
          description: 'Radial distortion amount',
          minimum: 0,
          maximum: 2,
        },
        strength: {
          type: 'number',
          description: 'Effect intensity',
          minimum: 0,
          maximum: 2,
        },
      },
    },
  },

  async init(ctx: ModuleContext, params: ChromaticAberrationParams) {
    // Create scene content with geometric shapes
    const group = new THREE.Group();

    // Center cube with shifting colors
    const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
    const cubeMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uOffset: { value: params.offset },
        uRadialOffset: { value: params.radialOffset },
        uStrength: { value: params.strength },
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
        uniform float uOffset;
        uniform float uRadialOffset;
        uniform float uStrength;
        
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
          vec2 uv = vUv;
          vec2 center = vec2(0.5);
          vec2 dir = uv - center;
          float dist = length(dir);
          dir = normalize(dir);
          
          // Radial chromatic aberration
          float aberration = uOffset * uRadialOffset * dist * uStrength;
          
          // Sample RGB channels with offset
          float r = step(0.5, uv.x + dir.x * aberration);
          float g = step(0.5, uv.x);
          float b = step(0.5, uv.x - dir.x * aberration);
          
          // Add animated color shift
          r += sin(uTime + vPosition.x) * 0.3 + 0.5;
          g += sin(uTime + vPosition.y + 2.0) * 0.3 + 0.5;
          b += sin(uTime + vPosition.z + 4.0) * 0.3 + 0.5;
          
          vec3 color = vec3(r, g, b);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
    
    const cube = new THREE.Mesh(cubeGeo, cubeMat);
    group.add(cube);

    // Orbiting spheres showing color separation
    const sphereGeo = new THREE.IcosahedronGeometry(0.3, 1);
    const spheres: THREE.Mesh[] = [];
    
    for (let i = 0; i < 6; i++) {
      const sphereMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(i / 6, 1, 0.5),
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      
      const angle = (i / 6) * Math.PI * 2;
      sphere.position.x = Math.cos(angle) * 2.5;
      sphere.position.z = Math.sin(angle) * 2.5;
      
      group.add(sphere);
      spheres.push(sphere);
    }

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);

    (ctx as any).group = group;
    (ctx as any).cube = cube;
    (ctx as any).spheres = spheres;
    (ctx as any).ambientLight = ambientLight;
    (ctx as any).cubeGeo = cubeGeo;
    (ctx as any).cubeMat = cubeMat;
    (ctx as any).sphereGeo = sphereGeo;
    (ctx as any).time = 0;
  },

  async mount(ctx: ModuleContext) {
    const group = (ctx as any).group;
    const ambientLight = (ctx as any).ambientLight;
    
    if (group) ctx.root.add(group);
    if (ambientLight) ctx.root.add(ambientLight);
  },

  update(ctx: ModuleContext, dt: number, params: ChromaticAberrationParams) {
    const group = (ctx as any).group;
    const cube = (ctx as any).cube;
    const spheres = (ctx as any).spheres as THREE.Mesh[];
    const cubeMat = (ctx as any).cubeMat as THREE.ShaderMaterial;

    (ctx as any).time += dt;
    const time = (ctx as any).time;

    if (group) {
      group.rotation.y += dt * 0.3;
    }

    if (cube) {
      cube.rotation.x += dt * 0.5;
      cube.rotation.y += dt * 0.7;
    }

    if (spheres) {
      spheres.forEach((sphere, i) => {
        sphere.position.y = Math.sin(time * 2 + i) * 0.5;
        sphere.rotation.x += dt * (i + 1);
      });
    }

    if (cubeMat && cubeMat.uniforms) {
      cubeMat.uniforms.uTime.value = time;
      cubeMat.uniforms.uOffset.value = params.offset;
      cubeMat.uniforms.uRadialOffset.value = params.radialOffset;
      cubeMat.uniforms.uStrength.value = params.strength;
    }

    return true;
  },

  unmount(ctx: ModuleContext) {
    const group = (ctx as any).group;
    const ambientLight = (ctx as any).ambientLight;
    
    if (group) ctx.root.remove(group);
    if (ambientLight) ctx.root.remove(ambientLight);
  },

  dispose(ctx: ModuleContext) {
    const cubeGeo = (ctx as any).cubeGeo;
    const cubeMat = (ctx as any).cubeMat;
    const sphereGeo = (ctx as any).sphereGeo;
    const spheres = (ctx as any).spheres as THREE.Mesh[];
    const ambientLight = (ctx as any).ambientLight;

    if (cubeGeo) cubeGeo.dispose();
    if (cubeMat) cubeMat.dispose();
    if (sphereGeo) sphereGeo.dispose();
    if (spheres) {
      spheres.forEach(sphere => (sphere.material as THREE.Material).dispose());
    }
    if (ambientLight) ambientLight.dispose();

    (ctx as any).group = null;
    (ctx as any).cube = null;
    (ctx as any).spheres = null;
    (ctx as any).ambientLight = null;
    (ctx as any).cubeGeo = null;
    (ctx as any).cubeMat = null;
    (ctx as any).sphereGeo = null;
    (ctx as any).time = null;
  },
};

export default chromaticAberrationModule;

