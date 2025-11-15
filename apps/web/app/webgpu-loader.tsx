'use client';

import Script from 'next/script';
import { useState } from 'react';

/**
 * Loads three.webgpu.js as a global script
 * This makes WebGPURenderer available at window.THREE
 */
export function WebGPULoader({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Script
        src="/vendor/three.webgpu.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('✅ three.webgpu.js loaded globally');
          setIsLoaded(true);
        }}
        onError={(e) => {
          console.error('❌ Failed to load three.webgpu.js:', e);
          setIsLoaded(true); // Render anyway to allow fallback
        }}
      />
      {children}
    </>
  );
}

