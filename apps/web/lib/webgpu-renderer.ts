'use client';

/**
 * Client-side WebGPU renderer factory
 */

import type { RendererCapabilities } from '@tsl-kit/engine';
import * as THREE from 'three';

export interface WebGPURendererResult {
  renderer: any;
  capabilities: RendererCapabilities;
}

export async function createWebGPURenderer(): Promise<WebGPURendererResult> {
  console.log('🔄 Attempting WebGPU renderer creation...');
  
  // Check WebGPU availability
  if (!(navigator as any)?.gpu) {
    console.warn('⚠️ WebGPU not supported in this browser');
    throw new Error('WebGPU not supported in this browser');
  }

  console.log('✅ navigator.gpu detected');

  try {
    // Dynamic import WebGPU renderer from three/webgpu
    // Webpack alias resolves this to three/build/three.webgpu.js
    console.log('🔄 Importing WebGPURenderer from three/webgpu...');
    const WebGPU = await import('three/webgpu');
    const WebGPURenderer = (WebGPU as any).WebGPURenderer;

    if (!WebGPURenderer) {
      throw new Error('WebGPURenderer not found in three/webgpu module');
    }

    console.log('✅ WebGPURenderer class loaded successfully');

    // Create renderer instance
    const renderer = new WebGPURenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      forceWebGL: false,
    });

    console.log('🔄 Initializing WebGPU renderer...');
    // WebGPU requires async initialization
    await renderer.init();

    // Configure renderer
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // Detect capabilities
    const gpu = (navigator as any).gpu;
    const adapter = await gpu.requestAdapter();
    const limits = adapter?.limits || {};

    const capabilities: RendererCapabilities = {
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

    console.log('✅ WebGPU renderer initialized successfully');
    console.log('📊 WebGPU Backend:', renderer.backend);
    console.log('📊 WebGPU Capabilities:', capabilities);

    return { renderer, capabilities };
  } catch (error) {
    console.error('❌ WebGPU initialization failed:', error);
    throw error;
  }
}

