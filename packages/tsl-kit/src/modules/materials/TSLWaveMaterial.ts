// TSL Wave Material - Uses Three Shading Language for WebGPU
import * as THREE from 'three';
import type { EngineModule, ModuleContext } from '../../core/types';

interface TSLWaveMaterialParams {
  baseColor: string;
  waveFrequency: number;
  waveAmplitude: number;
  waveSpeed: number;
}

const tslWaveMaterialModule: EngineModule<TSLWaveMaterialParams> = {
  id: 'materials/tsl-wave',

  meta: {
    id: 'materials/tsl-wave',
    label: 'TSL Wave Material',
    description: 'Animated wave material using Three Shading Language',
    category: 'Materials',
    tags: ['material', 'tsl', 'webgpu', 'procedural', 'animation'],
  },

  caps: {
    kind: 'material',
    backends: ['webgpu', 'webgl'], // TSL works on both
    requiresCompute: false,
    requiresStorage: false,
  },

  defaultParams: {
    baseColor: '#4488ff',
    waveFrequency: 3.0,
    waveAmplitude: 0.3,
    waveSpeed: 1.0,
  },

  schema: {
    jsonSchema: {
      type: 'object',
      properties: {
        baseColor: {
          type: 'string',
          description: 'Base material color',
        },
        waveFrequency: {
          type: 'number',
          description: 'Wave frequency',
          minimum: 0.1,
          maximum: 10,
        },
        waveAmplitude: {
          type: 'number',
          description: 'Wave amplitude',
          minimum: 0,
          maximum: 2,
        },
        waveSpeed: {
          type: 'number',
          description: 'Animation speed',
          minimum: 0,
          maximum: 5,
        },
      },
    },
  },

  async init(ctx: ModuleContext, params: TSLWaveMaterialParams) {
    // TSL will be loaded dynamically when WebGPU is available
    // For now, use shader material with GLSL as fallback
    
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    let material: THREE.Material;
    
    if (ctx.capabilities.backend === 'webgpu') {
      try {
        // Try to load TSL
        console.log('🔄 Loading TSL for WebGPU material...');
        const TSL = await import('three/tsl');
        
        // TSL node-based material
        // This is a placeholder - real TSL implementation would use node graph
        console.log('✅ TSL loaded:', Object.keys(TSL).slice(0, 10));
        
        // For now, fall back to shader material until we fully implement TSL nodes
        material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            baseColor: { value: new THREE.Color(params.baseColor) },
            frequency: { value: params.waveFrequency },
            amplitude: { value: params.waveAmplitude },
          },
          vertexShader: `
            uniform float time;
            uniform float frequency;
            uniform float amplitude;
            varying vec3 vNormal;
            varying vec3 vPosition;
            
            void main() {
              vNormal = normalize(normalMatrix * normal);
              vPosition = position;
              
              // Wave displacement
              vec3 pos = position;
              float wave = sin(pos.x * frequency + time) * 
                          cos(pos.y * frequency + time * 0.5) * 
                          amplitude;
              pos += normal * wave;
              
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 baseColor;
            varying vec3 vNormal;
            varying vec3 vPosition;
            
            void main() {
              // Simple lighting
              vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
              float diff = max(dot(vNormal, lightDir), 0.0);
              
              vec3 color = baseColor * (0.3 + 0.7 * diff);
              gl_FragColor = vec4(color, 1.0);
            }
          `,
        });
        
        console.log('✅ TSL-compatible material created (shader fallback)');
      } catch (error) {
        console.warn('⚠️ TSL load failed, using standard material:', error);
        material = new THREE.MeshStandardMaterial({
          color: params.baseColor,
        });
      }
    } else {
      // WebGL fallback
      material = new THREE.MeshStandardMaterial({
        color: params.baseColor,
      });
    }

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
    directionalLight.position.set(2, 2, 2);
    ctx.scene.add(directionalLight);
  },

  mount(ctx: ModuleContext, params: TSLWaveMaterialParams) {
    console.log('TSL Wave Material mounted with backend:', ctx.capabilities.backend);
  },

  update(ctx: ModuleContext, dt: number, params: TSLWaveMaterialParams): boolean {
    const userData = (ctx.root as any).userData;
    if (!userData) return false;

    userData.time += dt * params.waveSpeed;
    const mesh = userData.mesh as THREE.Mesh;
    const material = mesh.material as THREE.ShaderMaterial;

    // Update uniforms if shader material
    if (material instanceof THREE.ShaderMaterial && material.uniforms) {
      material.uniforms.time.value = userData.time;
      material.uniforms.baseColor.value.set(params.baseColor);
      material.uniforms.frequency.value = params.waveFrequency;
      material.uniforms.amplitude.value = params.waveAmplitude;
    } else if (material instanceof THREE.MeshStandardMaterial) {
      // Standard material fallback
      material.color.set(params.baseColor);
    }

    // Rotate for visual interest
    mesh.rotation.y += dt * 0.2;

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

export default tslWaveMaterialModule;

