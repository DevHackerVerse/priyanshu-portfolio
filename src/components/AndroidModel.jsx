import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Custom shader material for the glow effect
const GlowShaderMaterial = shaderMaterial(
  { 
    color: new THREE.Color(0xFF7700), // Changed to dark orange
    glowIntensity: 1.5,
    time: 0 
  },
  // Vertex shader
  `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vViewPosition = cameraPosition - worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform vec3 color;
    uniform float glowIntensity;
    uniform float time;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    void main() {
      float rim = 1.0 - abs(dot(normalize(vViewPosition), vNormal));
      rim = pow(rim, 3.0) * glowIntensity;
      rim *= (sin(time * 2.0) * 0.1 + 0.9); // subtle pulsing
      gl_FragColor = vec4(color, rim);
    }
  `
);

extend({ GlowShaderMaterial });

const LightweightAndroidModel = () => {
  const androidRef = useRef();
  const glowRef = useRef();
  const [glowReady, setGlowReady] = useState(false);
  
  // Create a metallic material
  const androidMaterial = new THREE.MeshStandardMaterial({
    color: "#CCCCCC",
    metalness: 0.9,
    roughness: 0.2,
    envMapIntensity: 1.0
  });
  
  // Initialize glow material state
  useEffect(() => {
    const timer = setTimeout(() => {
      setGlowReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  useFrame((state) => {
    if (androidRef.current) {
      androidRef.current.rotation.y = state.clock.getElapsedTime() / 5;
    }
    
    // Safely update uniforms only when available
    if (glowReady && glowRef.current && glowRef.current.material && glowRef.current.material.uniforms) {
      glowRef.current.material.uniforms.time.value = state.clock.getElapsedTime();
    }
  });

  // Create a better Android model with more accurate proportions
  return (
    <>
      <group ref={androidRef} position={[0, 0, 0]}>
        {/* Body */}
        <mesh material={androidMaterial} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 1.2, 32]} />
        </mesh>
        
        {/* Head - half sphere */}
        <mesh material={androidMaterial} position={[0, 0.85, 0]}>
          <sphereGeometry args={[0.7, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        
        {/* Eyes */}
        <mesh position={[-0.3, 0.9, 0.5]} material={new THREE.MeshBasicMaterial({ color: "#FFFFFF" })}>
          <sphereGeometry args={[0.1, 16, 16]} />
        </mesh>
        <mesh position={[0.3, 0.9, 0.5]} material={new THREE.MeshBasicMaterial({ color: "#FFFFFF" })}>
          <sphereGeometry args={[0.1, 16, 16]} />
        </mesh>
        
        {/* Antennas */}
        <mesh material={androidMaterial} position={[-0.3, 1.2, 0]} rotation={[0, 0, Math.PI / 12]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 12]} />
        </mesh>
        <mesh material={androidMaterial} position={[0.3, 1.2, 0]} rotation={[0, 0, -Math.PI / 12]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 12]} />
        </mesh>
        
        {/* Arms */}
        <mesh material={androidMaterial} position={[-1.0, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.15, 0.5, 12, 24]} />
        </mesh>
        <mesh material={androidMaterial} position={[1.0, 0.2, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <capsuleGeometry args={[0.15, 0.5, 12, 24]} />
        </mesh>
        
        {/* Legs */}
        <mesh material={androidMaterial} position={[-0.3, -0.9, 0]} rotation={[0, 0, 0]}>
          <capsuleGeometry args={[0.15, 0.5, 12, 24]} />
        </mesh>
        <mesh material={androidMaterial} position={[0.3, -0.9, 0]} rotation={[0, 0, 0]}>
          <capsuleGeometry args={[0.15, 0.5, 12, 24]} />
        </mesh>
        
        {/* Glow effect - with explicit props to fix the undefined uniforms error */}
        <mesh ref={glowRef} scale={1.05}>
          {/* Body glow */}
          <cylinderGeometry args={[0.7, 0.7, 1.2, 32]} />
          <glowShaderMaterial 
            transparent 
            depthWrite={false} 
            side={THREE.BackSide} 
            color={new THREE.Color(0xFF7700)} 
            glowIntensity={1.5}
            time={0}
          />
        </mesh>
        
        <mesh scale={1.05} position={[0, 0.85, 0]}>
          {/* Head glow */}
          <sphereGeometry args={[0.7, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <glowShaderMaterial 
            transparent 
            depthWrite={false} 
            side={THREE.BackSide}
            color={new THREE.Color(0xFF7700)}
            glowIntensity={1.5}
            time={0}
          />
        </mesh>
      </group>
    </>
  );
};

const LightweightAndroidScene = () => {
  return (
    <>
      {/* No background color specified to allow transparency */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <ambientLight intensity={0.2} />
      <spotLight position={[5, 5, 5]} intensity={1} angle={0.3} penumbra={1} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <LightweightAndroidModel />
      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
};

export default LightweightAndroidScene;