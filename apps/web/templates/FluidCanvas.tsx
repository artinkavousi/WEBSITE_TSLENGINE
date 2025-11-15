'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';

interface FluidCanvasProps {
  sceneProps?: {
    fluid?: {
      resolution?: number;
      viscosity?: number;
      diffusion?: number;
    };
    colors?: {
      primary?: string;
      secondary?: string;
      background?: string;
    };
    interaction?: {
      forceRadius?: number;
      forceStrength?: number;
    };
  };
}

export default function FluidCanvas({ sceneProps }: FluidCanvasProps) {
  const { fluid, colors } = sceneProps || {};
  const planeRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);
  
  // Simple gradient shader for fluid-like effect
  const shaderMaterial = useRef(
    new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(colors?.primary || '#ff00ff') },
        uColor2: { value: new THREE.Color(colors?.secondary || '#00ffff') },
        uResolution: { value: new THREE.Vector2(1, 1) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec2 uResolution;
        varying vec2 vUv;
        
        void main() {
          vec2 uv = vUv;
          
          // Fluid-like distortion
          float distortion = sin(uv.x * 5.0 + uTime) * cos(uv.y * 5.0 + uTime * 0.5) * 0.1;
          uv.x += distortion;
          uv.y += distortion * 0.5;
          
          // Color mixing
          float mix_factor = sin(uv.x * 3.0 + uTime) * cos(uv.y * 3.0 - uTime * 0.7) * 0.5 + 0.5;
          vec3 color = mix(uColor1, uColor2, mix_factor);
          
          // Add some glow
          float glow = pow(1.0 - length(uv - 0.5) * 1.5, 2.0) * 0.3;
          color += vec3(glow);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    })
  );
  
  useFrame((state, dt) => {
    time.current += dt;
    shaderMaterial.current.uniforms.uTime.value = time.current;
    
    if (planeRef.current) {
      shaderMaterial.current.uniforms.uColor1.value.set(colors?.primary || '#ff00ff');
      shaderMaterial.current.uniforms.uColor2.value.set(colors?.secondary || '#00ffff');
    }
  });
  
  return (
    <>
      <OrthographicCamera
        makeDefault
        position={[0, 0, 1]}
        zoom={1}
      />
      
      <mesh ref={planeRef}>
        <planeGeometry args={[2, 2]} />
        <primitive object={shaderMaterial.current} attach="material" />
      </mesh>
    </>
  );
}

