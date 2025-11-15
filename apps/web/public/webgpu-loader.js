// WebGPU Loader - Imports three.js WebGPU from CDN and exposes WebGPURenderer globally
import * as THREE_WEBGPU from 'https://cdn.jsdelivr.net/npm/three@0.181.0/build/three.webgpu.js';

// Expose WebGPURenderer on window for client-side access
window.WebGPURenderer = THREE_WEBGPU.WebGPURenderer;
window.THREE_WEBGPU = THREE_WEBGPU;

console.log('✅ WebGPU loader: WebGPURenderer available', {
  hasWebGPURenderer: !!window.WebGPURenderer,
  exports: Object.keys(THREE_WEBGPU).slice(0, 20)
});

