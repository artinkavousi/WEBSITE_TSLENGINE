'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface GeometricShapesProps {
  sceneProps?: {
    camera?: {
      fov?: number;
      position?: [number, number, number];
    };
    sdf?: {
      shapeType?: 'sphere' | 'box' | 'torus';
      size?: number;
    };
    colors?: {
      primary?: string;
      secondary?: string;
    };
    animation?: {
      rotationSpeed?: number;
      morphSpeed?: number;
    };
  };
}

export default function GeometricShapes({ sceneProps }: GeometricShapesProps) {
  const { camera, colors, animation } = sceneProps || {};
  const groupRef = useRef<THREE.Group>(null);
  const time = useRef(0);
  
  useFrame((state, dt) => {
    time.current += dt;
    
    if (groupRef.current) {
      const rotSpeed = animation?.rotationSpeed || 1.0;
      groupRef.current.rotation.x += dt * rotSpeed * 0.5;
      groupRef.current.rotation.y += dt * rotSpeed;
      groupRef.current.rotation.z += dt * rotSpeed * 0.3;
      
      // Pulsate
      const morphSpeed = animation?.morphSpeed || 1.0;
      const scale = 1 + Math.sin(time.current * morphSpeed) * 0.1;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={camera?.fov || 50}
        position={camera?.position || [0, 0, 5]}
      />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} />
      
      <group ref={groupRef}>
        {/* Center sphere */}
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={colors?.primary || '#ff006e'}
            metalness={0.8}
            roughness={0.2}
            emissive={colors?.primary || '#ff006e'}
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Orbiting cubes */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2;
          const radius = 2;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle + time.current) * radius,
                Math.sin(angle * 2 + time.current) * 0.5,
                Math.sin(angle + time.current) * radius,
              ]}
              rotation={[time.current * 2, time.current * 3, time.current]}
            >
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshStandardMaterial
                color={colors?.secondary || '#00f5ff'}
                metalness={0.6}
                roughness={0.3}
                emissive={colors?.secondary || '#00f5ff'}
                emissiveIntensity={0.3}
              />
            </mesh>
          );
        })}
        
        {/* Wireframe sphere */}
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial
            color={colors?.primary || '#ff006e'}
            wireframe
            transparent
            opacity={0.2}
          />
        </mesh>
      </group>
    </>
  );
}

