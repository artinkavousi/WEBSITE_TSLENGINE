/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  webpack: (config, { isServer }) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    
    // WebGPU support - ensure proper module resolution
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'three/webgpu': 'three/examples/jsm/renderers/webgpu/WebGPURenderer.js',
      };
    }
    
    return config;
  },
};

export default nextConfig;

