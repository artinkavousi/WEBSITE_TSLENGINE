'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Sphere, Environment } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import * as THREE from 'three';

interface HeroGlassWaveProps {
  sceneProps?: {
    camera?: {
      fov?: number;
      position?: [number, number, number];
    };
    lights?: {
      ambient?: number;
      directional?: {
        position?: [number, number, number];
        intensity?: number;
      };
    };
    shader?: {
      baseColor?: string;
      transmission?: number;
      roughness?: number;
      metalness?: number;
      clearcoat?: number;
      ior?: number;
    };
    animation?: {
      rotationSpeed?: number;
      pulseSpeed?: number;
      pulseIntensity?: number;
    };
  };
}

export default function HeroGlassWave({ sceneProps }: HeroGlassWaveProps) {
  const { camera, lights, shader, animation } = sceneProps || {};
  const sphereRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);
  
  // Entrance animation
  useGSAP(() => {
    if (sphereRef.current) {
      gsap.from(sphereRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)',
      });
      
      gsap.from(sphereRef.current.rotation, {
        y: -Math.PI * 2,
        duration: 2,
        ease: 'power2.out',
      });
    }
  }, []);
  
  // Animation loop
  useFrame((state, dt) => {
    if (!sphereRef.current) return;
    
    time.current += dt;
    
    // Rotation
    const rotSpeed = animation?.rotationSpeed || 0.2;
    sphereRef.current.rotation.y += dt * rotSpeed;
    sphereRef.current.rotation.x = Math.sin(time.current * 0.5) * 0.1;
    
    // Pulse effect
    const pulseSpeed = animation?.pulseSpeed || 1.0;
    const pulseIntensity = animation?.pulseIntensity || 0.05;
    const pulse = 1 + Math.sin(time.current * pulseSpeed) * pulseIntensity;
    sphereRef.current.scale.set(pulse, pulse, pulse);
  });
  
  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={camera?.fov || 45}
        position={camera?.position || [0, 0, 5]}
      />
      
      <ambientLight intensity={lights?.ambient || 0.5} />
      <directionalLight
        position={lights?.directional?.position || [5, 5, 5]}
        intensity={lights?.directional?.intensity || 1}
        castShadow
      />
      
      {/* Environment for reflections */}
      <Environment preset="city" />
      
      {/* Glass sphere */}
      <Sphere ref={sphereRef} args={[1, 64, 64]}>
        <meshPhysicalMaterial
          color={shader?.baseColor || '#34d399'}
          transmission={shader?.transmission || 0.95}
          roughness={shader?.roughness || 0.05}
          metalness={shader?.metalness || 0}
          clearcoat={shader?.clearcoat || 1}
          clearcoatRoughness={0.1}
          ior={shader?.ior || 1.5}
          thickness={0.5}
          envMapIntensity={1}
          transparent
        />
      </Sphere>
      
      {/* Ambient particles (optional) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={new Float32Array(
              Array.from({ length: 300 }, () => (Math.random() - 0.5) * 10)
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#34d399" opacity={0.5} transparent />
      </points>
    </>
  );
}

