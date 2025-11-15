import { withContentlayer } from 'next-contentlayer2';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@tsl-kit/engine'],
  webpack: (config, { isServer }) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    
    // WebGPU support - three/webgpu is already exported in three@0.181+ package.json
    // No alias needed, just ensure transpilation
    
    return config;
  },
};

export default withContentlayer(nextConfig);

