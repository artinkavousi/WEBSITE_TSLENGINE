// Renderer factory - WebGPU/WebGL with automatic fallback
import * as THREE from 'three';
import type { RendererCapabilities } from '../core/types';

export interface RendererOptions {
  canvas?: HTMLCanvasElement;
  antialias?: boolean;
  alpha?: boolean;
  powerPreference?: 'high-performance' | 'low-power' | 'default';
  forceBackend?: 'webgpu' | 'webgl';
}

export interface RendererResult {
  renderer: THREE.WebGLRenderer | any; // WebGPURenderer when available
  capabilities: RendererCapabilities;
}

/**
 * Detect renderer capabilities
 */
export async function detectCapabilities(
  renderer: THREE.WebGLRenderer | any
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
 * Create a WebGL renderer
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

  console.log('✅ WebGL renderer initialized');

  return renderer;
}

/**
 * Create a WebGPU renderer
 * NOTE: WebGPU support will be added in Phase 3 with proper three/webgpu integration
 */
async function createWebGPURenderer(options: RendererOptions): Promise<any> {
  // For Phase 2, WebGPU is not fully integrated yet
  // This will be properly implemented in Phase 3 with three/webgpu
  throw new Error('WebGPU not yet implemented - falling back to WebGL');
}

/**
 * Create a renderer with automatic WebGPU/WebGL fallback
 * @param options - Renderer configuration options
 * @returns Renderer instance and capabilities
 */
export async function createRenderer(
  options: RendererOptions = {}
): Promise<RendererResult> {
  let renderer: THREE.WebGLRenderer | any;

  // Determine which backend to use
  const useWebGPU =
    options.forceBackend === 'webgpu' ||
    (options.forceBackend !== 'webgl' && (navigator as any)?.gpu);

  if (useWebGPU) {
    try {
      renderer = await createWebGPURenderer(options);
    } catch (error) {
      console.warn('⚠️ WebGPU failed, falling back to WebGL:', error);
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

