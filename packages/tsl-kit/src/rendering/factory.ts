// Renderer factory - WebGPU with automatic fallback
import * as THREE from 'three';
import type { RendererCapabilities } from '../core/types';

// Import WebGPU renderer and TSL from three.js r181+
// These are available at runtime but might not have full TypeScript types
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
 * Uses dynamic import to avoid SSR issues
 */
async function createWebGPURenderer(options: RendererOptions): Promise<WebGPURenderer> {
  // Check WebGPU availability
  if (!(navigator as any)?.gpu) {
    throw new Error('WebGPU not supported in this browser');
  }

  try {
    // Dynamic import WebGPU renderer
    // This avoids SSR issues and allows the module to load only when needed
    const WebGPU = await import('three/webgpu');
    const RendererClass = (WebGPU as any).WebGPURenderer;
    
    if (!RendererClass) {
      throw new Error('WebGPURenderer class not found in three/webgpu module');
    }

    // Create renderer instance
    const renderer = new RendererClass({
      canvas: options.canvas,
      antialias: options.antialias ?? true,
      alpha: options.alpha ?? false,
      powerPreference: options.powerPreference || 'high-performance',
      forceWebGL: false, // Explicitly use WebGPU
    });

    // WebGPU requires async initialization
    await renderer.init();

    // Configure renderer
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    console.log('✅ WebGPU renderer initialized successfully');
    console.log('📊 WebGPU Backend:', renderer.backend);

    return renderer;
  } catch (error) {
    console.error('Failed to load WebGPU renderer:', error);
    throw new Error(`WebGPU initialization failed: ${error instanceof Error ? error.message : String(error)}`);
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
 * Create a renderer - WebGPU first, WebGL fallback only if WebGPU fails
 * @param options - Renderer configuration options
 * @returns Renderer instance and capabilities
 */
export async function createRenderer(
  options: RendererOptions = {}
): Promise<RendererResult> {
  let renderer: WebGPURenderer | THREE.WebGLRenderer;
  let fallbackUsed = false;

  // Explicitly use WebGPU unless forced to WebGL
  const useWebGPU = options.forceBackend !== 'webgl';

  if (useWebGPU) {
    try {
      console.log('🔄 Attempting WebGPU initialization...');
      renderer = await createWebGPURenderer(options);
    } catch (error) {
      fallbackUsed = true;
      console.error('❌ WebGPU initialization failed:', error);
      console.warn('⚠️ Falling back to WebGL (WebGPU unavailable)');
      renderer = createWebGLRenderer(options);
    }
  } else {
    console.log('🔄 Using WebGL renderer (explicitly requested)');
    renderer = createWebGLRenderer(options);
  }

  // Detect capabilities
  const capabilities = await detectCapabilities(renderer);

  console.log('✅ Final renderer capabilities:', {
    backend: capabilities.backend,
    computeShaders: capabilities.computeShaders,
    storageBuffers: capabilities.storageBuffers,
    maxTextureSize: capabilities.maxTextureSize,
    fallbackUsed,
  });

  // Warn if WebGL fallback was used when WebGPU was expected
  if (fallbackUsed && options.forceBackend === 'webgpu') {
    console.warn('⚠️ WARNING: WebGPU was explicitly requested but is not available!');
  }

  return { renderer, capabilities };
}

/**
 * Check if WebGPU is available
 */
export function isWebGPUAvailable(): boolean {
  return !!(navigator as any)?.gpu;
}
