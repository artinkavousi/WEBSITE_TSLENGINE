// Renderer factory - WebGPU with automatic fallback
import * as THREE from 'three';
import type { RendererCapabilities } from '../core/types';

// WebGPU renderer type (typed as any until proper types are available)
export type WebGPURenderer = any;

export interface RendererOptions {
  canvas?: HTMLCanvasElement;
  antialias?: boolean;
  alpha?: boolean;
  powerPreference?: 'high-performance' | 'low-power' | 'default';
  forceBackend?: 'webgpu' | 'webgl';
}

export interface RendererResult {
  renderer: WebGPURenderer | THREE.WebGLRenderer;
  capabilities: RendererCapabilities;
}

/**
 * Detect renderer capabilities
 */
export async function detectCapabilities(
  renderer: WebGPURenderer | THREE.WebGLRenderer
): Promise<RendererCapabilities> {
  const isWebGPU = renderer.backend !== undefined;

  if (isWebGPU) {
    // WebGPU capabilities
    try {
      const gpu = (navigator as any).gpu;
      if (!gpu) {
        throw new Error('WebGPU not available');
      }

      const adapter = await gpu.requestAdapter();
      if (!adapter) {
        throw new Error('No WebGPU adapter available');
      }

      const limits = adapter.limits;

      return {
        backend: 'webgpu',
        computeShaders: true,
        storageBuffers: true,
        maxTextureSize: limits.maxTextureDimension2D || 8192,
        maxWorkgroupSize: [
          limits.maxComputeWorkgroupSizeX || 256,
          limits.maxComputeWorkgroupSizeY || 256,
          limits.maxComputeWorkgroupSizeZ || 64,
        ],
      };
    } catch (error) {
      console.warn('Failed to detect WebGPU capabilities:', error);
      // Fallback to default values
      return {
        backend: 'webgpu',
        computeShaders: true,
        storageBuffers: true,
        maxTextureSize: 8192,
        maxWorkgroupSize: [256, 256, 64],
      };
    }
  } else {
    // WebGL capabilities
    const gl = renderer.getContext();

    return {
      backend: 'webgl',
      computeShaders: false,
      storageBuffers: false,
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxWorkgroupSize: [0, 0, 0],
    };
  }
}

/**
 * Create a WebGPU renderer using Three.js r181+
 */
async function createWebGPURenderer(options: RendererOptions): Promise<WebGPURenderer> {
  try {
    // Check WebGPU availability
    if (!(navigator as any)?.gpu) {
      throw new Error('WebGPU not supported in this browser');
    }

    // Try multiple import paths for Three.js WebGPU renderer
    let WebGPURendererClass;
    
    try {
      // Try three/addons path (standard for r181+)
      // @ts-ignore - Dynamic import path
      const module1 = await import('three/addons/renderers/webgpu/WebGPURenderer.js');
      WebGPURendererClass = (module1 as any).default || (module1 as any).WebGPURenderer;
    } catch (e1) {
      try {
        // Try three/webgpu path
        // @ts-ignore - Dynamic import path
        const module2 = await import('three/webgpu');
        WebGPURendererClass = (module2 as any).default || (module2 as any).WebGPURenderer;
      } catch (e2) {
        try {
          // Try direct three package export
          const module3 = await import('three');
          WebGPURendererClass = (module3 as any).WebGPURenderer;
        } catch (e3) {
          throw new Error(`Could not import WebGPURenderer from any known path. Errors: ${e1}, ${e2}, ${e3}`);
        }
      }
    }

    if (!WebGPURendererClass) {
      throw new Error('WebGPURenderer class not found in any module');
    }

    const renderer = new WebGPURendererClass({
      canvas: options.canvas,
      antialias: options.antialias ?? true,
      alpha: options.alpha ?? false,
      powerPreference: options.powerPreference || 'high-performance',
    });

    // WebGPU requires async initialization
    await renderer.init();

    // Configure renderer
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    console.log('✅ WebGPU renderer initialized');

    return renderer;
  } catch (error) {
    console.error('❌ WebGPU initialization failed:', error);
    throw error;
  }
}

/**
 * Create a WebGL renderer (fallback)
 */
function createWebGLRenderer(options: RendererOptions): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    canvas: options.canvas,
    antialias: options.antialias ?? true,
    alpha: options.alpha ?? false,
    powerPreference: options.powerPreference || 'high-performance',
  });

  // Configure renderer
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  console.log('✅ WebGL renderer initialized (fallback)');

  return renderer;
}

/**
 * Create a renderer - WebGPU first, WebGL fallback
 * @param options - Renderer configuration options
 * @returns Renderer instance and capabilities
 */
export async function createRenderer(
  options: RendererOptions = {}
): Promise<RendererResult> {
  let renderer: WebGPURenderer | THREE.WebGLRenderer;

  // Force WebGPU unless explicitly set to WebGL
  const useWebGPU = options.forceBackend !== 'webgl';

  if (useWebGPU) {
    try {
      renderer = await createWebGPURenderer(options);
    } catch (error) {
      console.warn('⚠️ WebGPU unavailable, falling back to WebGL');
      renderer = createWebGLRenderer(options);
    }
  } else {
    renderer = createWebGLRenderer(options);
  }

  // Detect capabilities
  const capabilities = await detectCapabilities(renderer);

  console.log('📊 Renderer capabilities:', capabilities);

  return { renderer, capabilities };
}

/**
 * Check if WebGPU is available
 */
export function isWebGPUAvailable(): boolean {
  return !!(navigator as any)?.gpu;
}
