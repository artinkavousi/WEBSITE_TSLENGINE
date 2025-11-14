'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createRenderer, ModuleRunner } from '@tsl-kit/engine';
import { useEngineStore } from '@/lib/store';

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

  // Initialize renderer and runner
  useEffect(() => {
    let mounted = true;

    async function init() {
      if (!sceneRef.current) return;

      try {
        // Create renderer
        const { renderer, capabilities } = await createRenderer({
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          forceBackend: backend === 'auto' ? undefined : backend,
        });

        if (!mounted) {
          renderer.dispose();
          return;
        }

        rendererRef.current = renderer;

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
  }, [backend]);

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
  }, [isReady, activeModuleId, moduleParams, getParam, setParam]);

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
      
      {!activeModuleId && (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      )}
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

