/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  webpack: (config, { isServer }) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    
    // Handle three/webgpu optional import
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'three/webgpu': false,
      };
    }
    
    return config;
  },
};

export default nextConfig;

