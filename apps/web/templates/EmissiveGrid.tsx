'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface EmissiveGridProps {
  sceneProps?: {
    camera?: {
      fov?: number;
      position?: [number, number, number];
    };
    grid?: {
      size?: number;
      divisions?: number;
      thickness?: number;
    };
    glow?: {
      color?: string;
      intensity?: number;
      pulseSpeed?: number;
    };
    animation?: {
      waveSpeed?: number;
      waveHeight?: number;
    };
  };
}

export default function EmissiveGrid({ sceneProps }: EmissiveGridProps) {
  const { camera, grid, glow, animation } = sceneProps || {};
  const gridRef = useRef<THREE.LineSegments>(null);
  const time = useRef(0);
  
  const geometry = useMemo(() => {
    const size = grid?.size || 10;
    const divisions = grid?.divisions || 20;
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const colors: number[] = [];
    
    const color = new THREE.Color(glow?.color || '#00ffcc');
    
    // Create grid lines
    for (let i = 0; i <= divisions; i++) {
      const pos = (i / divisions - 0.5) * size;
      
      // Vertical lines
      vertices.push(-size / 2, 0, pos);
      vertices.push(size / 2, 0, pos);
      colors.push(color.r, color.g, color.b, color.r, color.g, color.b);
      
      // Horizontal lines
      vertices.push(pos, 0, -size / 2);
      vertices.push(pos, 0, size / 2);
      colors.push(color.r, color.g, color.b, color.r, color.g, color.b);
    }
    
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    return geo;
  }, [grid?.size, grid?.divisions, glow?.color]);
  
  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
  }, []);
  
  useFrame((state, dt) => {
    time.current += dt;
    
    if (gridRef.current) {
      const positions = gridRef.current.geometry.attributes.position.array as Float32Array;
      const waveSpeed = animation?.waveSpeed || 1.0;
      const waveHeight = animation?.waveHeight || 0.3;
      
      // Apply wave animation to Y coordinates
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        const dist = Math.sqrt(x * x + z * z);
        positions[i + 1] = Math.sin(dist - time.current * waveSpeed) * waveHeight;
      }
      
      gridRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Pulse opacity
      const pulseSpeed = glow?.pulseSpeed || 1.0;
      material.opacity = 0.6 + Math.sin(time.current * pulseSpeed) * 0.3;
    }
  });
  
  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={camera?.fov || 60}
        position={camera?.position || [0, 3, 8]}
        rotation={[-0.3, 0, 0]}
      />
      
      <ambientLight intensity={0.2} />
      
      <lineSegments ref={gridRef} geometry={geometry} material={material} />
      
      {/* Add some fog */}
      <fog attach="fog" args={['#000000', 5, 15]} />
      
      {/* Center glow sphere */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color={glow?.color || '#00ffcc'}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Emissive particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={50}
            array={new Float32Array(
              Array.from({ length: 150 }, (_, i) => {
                if (i % 3 === 1) return Math.random() * 2; // Y
                return (Math.random() - 0.5) * 10; // X, Z
              })
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={glow?.color || '#00ffcc'}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

