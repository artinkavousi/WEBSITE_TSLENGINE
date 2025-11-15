'use client';

import { useEngineStore } from '@/lib/store';
import { createWebGPURenderer } from '@/lib/webgpu-renderer';
import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ModuleRunner, bloomEffectModule, chromaticAberrationModule, curlNoiseModule, emissiveMaterialModule, fbmNoiseModule, helloCubeModule, iridescentMaterialModule, moduleRegistry, pbrMaterialModule, simplexNoiseModule, tslTestModule, tslWaveMaterialModule, vignetteEffectModule, voronoiNoiseModule } from '@tsl-kit/engine';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function Scene() {
  const sceneRef = useRef<THREE.Scene>(null);
  const rendererRef = useRef<any>(null);
  const runnerRef = useRef<ModuleRunner | null>(null);
  const [isReady, setIsReady] = useState(false);

  const activeModuleId = useEngineStore((state) => state.activeModuleId);
  const moduleParams = useEngineStore((state) => state.moduleParams);
  const backend = useEngineStore((state) => state.backend);
  const getParam = useEngineStore((state) => state.getParam);
  const setParam = useEngineStore((state) => state.setParam);
  const setBackend = useEngineStore((state) => state.setBackend);
  const selectModule = useEngineStore((state) => state.selectModule);

  // Register all modules once
  useEffect(() => {
    // Only register if not already registered
    if (!moduleRegistry.has('test/hello-cube')) {
      // Register test modules
      moduleRegistry.register(helloCubeModule);
      moduleRegistry.register(tslTestModule);
      
      // Register material modules
      moduleRegistry.register(pbrMaterialModule);
      moduleRegistry.register(emissiveMaterialModule);
      moduleRegistry.register(iridescentMaterialModule);
      moduleRegistry.register(tslWaveMaterialModule);
      
      // Register noise modules
      moduleRegistry.register(simplexNoiseModule);
      moduleRegistry.register(curlNoiseModule);
      moduleRegistry.register(voronoiNoiseModule);
      moduleRegistry.register(fbmNoiseModule);
      
      // Register post-fx modules
      moduleRegistry.register(bloomEffectModule);
      moduleRegistry.register(vignetteEffectModule);
      moduleRegistry.register(chromaticAberrationModule);

      console.log(`✅ Registered ${moduleRegistry.size} modules (including TSL test)`);
    }

    // Load default module if none active
    if (!activeModuleId) {
      selectModule('test/hello-cube', helloCubeModule.defaultParams);
    }
  }, [activeModuleId, selectModule]);

  // Initialize renderer and runner
  useEffect(() => {
    let mounted = true;

    async function init() {
      if (!sceneRef.current) return;

      try {
        // Try WebGPU renderer first (client-side only)
        let renderer: any;
        let capabilities: any;
        
        try {
          const result = await createWebGPURenderer();
          renderer = result.renderer;
          capabilities = result.capabilities;
        } catch (webgpuError) {
          // Fallback to WebGL if WebGPU fails
          console.warn('⚠️ WebGPU failed, falling back to WebGL:', webgpuError);
          renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          });
          renderer.outputColorSpace = THREE.SRGBColorSpace;
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1.0;
          
          const gl = renderer.getContext();
          capabilities = {
            backend: 'webgl',
            computeShaders: false,
            storageBuffers: false,
            maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
            maxWorkgroupSize: [0, 0, 0],
          };
          console.log('✅ WebGL renderer initialized (fallback)');
        }

        if (!mounted) {
          renderer.dispose();
          return;
        }

        rendererRef.current = renderer;
        
        // Update store with detected backend
        setBackend(capabilities.backend);

        // Create module runner
        const runner = new ModuleRunner(
          sceneRef.current,
          renderer,
          capabilities,
          {
            invalidate: () => {
              // Request frame render - R3F handles this automatically
            },
            onModuleLoad: (id: string) => console.log('Module loaded:', id),
            onModuleUnload: (id: string) => console.log('Module unloaded:', id),
            onModuleError: (id: string, error: Error) =>
              console.error('Module error:', id, error),
          }
        );

        runnerRef.current = runner;
        setIsReady(true);

        console.log('✅ Engine initialized with', capabilities.backend);
      } catch (error) {
        console.error('Failed to initialize engine:', error);
      }
    }

    init();

    return () => {
      mounted = false;
      if (runnerRef.current) {
        runnerRef.current.dispose();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [backend, setBackend]);

  // Load/unload modules
  useEffect(() => {
    if (!isReady || !runnerRef.current) return;

    async function loadModule() {
      if (!runnerRef.current) return;

      if (activeModuleId) {
        try {
          await runnerRef.current.load(
            activeModuleId,
            moduleParams,
            getParam,
            setParam
          );
        } catch (error) {
          console.error('Failed to load module:', error);
        }
      } else {
        await runnerRef.current.unload();
      }
    }

    loadModule();
  }, [isReady, activeModuleId, getParam, setParam]);

  // Update module params in real-time (without reloading)
  useEffect(() => {
    if (!isReady || !runnerRef.current || !activeModuleId) return;
    
    // Update params without reloading
    runnerRef.current.setParams(moduleParams);
  }, [isReady, activeModuleId, moduleParams]);

  // Update loop
  useEffect(() => {
    if (!isReady || !runnerRef.current) return;

    let lastTime = performance.now();
    let frameId: number;

    function animate() {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (runnerRef.current) {
        runnerRef.current.tick(dt);
      }

      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isReady]);

  return (
    <>
      <scene ref={sceneRef} />
      
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={1}
        maxDistance={50}
      />

      {/* Grid helper */}
      <gridHelper args={[20, 20]} />
    </>
  );
}

function Loading() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial color="white" wireframe />
    </mesh>
  );
}

export default function PersistentCanvas() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas>
        <Suspense fallback={<Loading />}>
          <Scene />
        </Suspense>
        <Stats />
      </Canvas>
    </div>
  );
}

