'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleSwarmProps {
  sceneProps?: {
    camera?: {
      fov?: number;
      position?: [number, number, number];
    };
    lights?: {
      ambient?: number;
    };
    particles?: {
      count?: number;
      size?: number;
      color?: string;
      speed?: number;
    };
    forces?: Array<{
      type: 'vortex' | 'attract' | 'repel';
      strength?: number;
      position?: [number, number, number];
    }>;
  };
}

export default function ParticleSwarm({ sceneProps }: ParticleSwarmProps) {
  const { camera, lights, particles, forces } = sceneProps || {};
  const pointsRef = useRef<THREE.Points>(null);
  const time = useRef(0);
  
  // Generate particle positions and velocities
  const [positions, velocities] = useMemo(() => {
    const count = particles?.count || 5000;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Initial position - random sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = Math.random() * 3;
      
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
      
      // Initial velocity - slight random
      vel[i3] = (Math.random() - 0.5) * 0.1;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.1;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.1;
    }
    
    return [pos, vel];
  }, [particles?.count]);
  
  // Animation loop
  useFrame((state, dt) => {
    if (!pointsRef.current) return;
    
    time.current += dt;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const count = positions.length / 3;
    const speed = particles?.speed || 1.0;
    
    // Apply forces and update positions
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      
      // Apply vortex force
      if (forces && forces.length > 0) {
        forces.forEach((force) => {
          if (force.type === 'vortex') {
            const strength = force.strength || 2.0;
            velocities[i3] += -y * dt * strength * speed;
            velocities[i3 + 1] += x * dt * strength * speed;
            velocities[i3 + 2] += Math.sin(time.current + i * 0.1) * dt * strength * speed * 0.5;
          }
        });
      } else {
        // Default circular motion
        velocities[i3] += -y * dt * 2.0 * speed;
        velocities[i3 + 1] += x * dt * 2.0 * speed;
        velocities[i3 + 2] += Math.sin(time.current + i * 0.1) * dt * speed;
      }
      
      // Apply velocity damping
      velocities[i3] *= 0.99;
      velocities[i3 + 1] *= 0.99;
      velocities[i3 + 2] *= 0.99;
      
      // Update position
      positions[i3] += velocities[i3] * dt;
      positions[i3 + 1] += velocities[i3 + 1] * dt;
      positions[i3 + 2] += velocities[i3 + 2] * dt;
      
      // Keep particles within bounds
      const maxDist = 5;
      const dist = Math.sqrt(x * x + y * y + z * z);
      if (dist > maxDist) {
        const factor = maxDist / dist;
        positions[i3] *= factor;
        positions[i3 + 1] *= factor;
        positions[i3 + 2] *= factor;
        velocities[i3] *= -0.5;
        velocities[i3 + 1] *= -0.5;
        velocities[i3 + 2] *= -0.5;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={camera?.fov || 60}
        position={camera?.position || [0, 0, 8]}
      />
      
      <ambientLight intensity={lights?.ambient || 0.5} />
      
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={particles?.size || 0.02}
          color={particles?.color || '#00ffcc'}
          sizeAttenuation
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

