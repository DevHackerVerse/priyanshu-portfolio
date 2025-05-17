// src/components/ParticleBackground.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Scene setup
  useEffect(() => {
    // Store a reference to the current DOM node to avoid React warning
    const currentMount = mountRef.current;
    if (!currentMount) return;
    
    // Initialize Three.js components
    const scene = new THREE.Scene();
    
    // Set up responsive sizing
    const getWindowDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      return { width, height };
    };
    
    const { width, height } = getWindowDimensions();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 20;
    
    // Create renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    // Clean up any existing canvas
    if (currentMount.firstChild) {
      currentMount.removeChild(currentMount.firstChild);
    }
    
    // Append canvas to DOM
    currentMount.appendChild(renderer.domElement);
    
    // Create particles
    const createParticleSystem = () => {
      // Determine particle count based on screen size and performance
      const particleCount = width < 768 ? 1000 : 2000;
      
      // Particle geometry
      const particlesGeometry = new THREE.BufferGeometry();
      const particlePositions = [];
      const particleSizes = [];
      const particleColors = [];
      
      // Primary color in RGB format (FF4C29)
      const primaryColor = new THREE.Color(0xff4c29);
      const secondaryColor = new THREE.Color(0x3a1e1e);
      
      // Generate random particles
      for (let i = 0; i < particleCount; i++) {
        // Position: random within a sphere
        const x = (Math.random() - 0.5) * 50;
        const y = (Math.random() - 0.5) * 50;
        const z = (Math.random() - 0.5) * 30 - 10; // Keep z mostly negative (behind camera)
        
        particlePositions.push(x, y, z);
        
        // Size: random between 0.1 and 0.5
        particleSizes.push(Math.random() * 0.4 + 0.1);
        
        // Color: interpolate between primary and secondary color
        const color = new THREE.Color().lerpColors(
          primaryColor, 
          secondaryColor, 
          Math.random()
        );
        
        particleColors.push(color.r, color.g, color.b);
      }
      
      // Add attributes to geometry
      particlesGeometry.setAttribute(
        'position', 
        new THREE.Float32BufferAttribute(particlePositions, 3)
      );
      particlesGeometry.setAttribute(
        'size', 
        new THREE.Float32BufferAttribute(particleSizes, 1)
      );
      particlesGeometry.setAttribute(
        'color', 
        new THREE.Float32BufferAttribute(particleColors, 3)
      );
      
      // Create particle shader material
      const particlesMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          
          void main() {
            // Create a soft circular particle
            float distance = length(gl_PointCoord - vec2(0.5, 0.5));
            if (distance > 0.5) discard;
            
            // Apply radial gradient for soft edges
            float alpha = 1.0 - smoothstep(0.3, 0.5, distance);
            gl_FragColor = vec4(vColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      
      // Create particle system
      const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
      return particleSystem;
    };
    
    // Create the particles
    const particles = createParticleSystem();
    scene.add(particles);
    
    // Add soft light to enhance the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Create connection lines between nearby particles
    const createConnectionLines = () => {
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xff4c29,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending
      });
      
      const lineGeometry = new THREE.BufferGeometry();
      const positions = particles.geometry.attributes.position.array;
      const linePositions = [];
      const connectionDistance = 5; // Max distance for connecting particles
      
      // Limit the number of connections for performance
      const maxConnections = width < 768 ? 500 : 1000;
      let connections = 0;
      
      // Check for particles that are close to each other
      for (let i = 0; i < positions.length; i += 3) {
        const x1 = positions[i];
        const y1 = positions[i + 1];
        const z1 = positions[i + 2];
        
        for (let j = i + 3; j < positions.length; j += 3) {
          // Skip if we've reached max connections
          if (connections >= maxConnections) break;
          
          const x2 = positions[j];
          const y2 = positions[j + 1];
          const z2 = positions[j + 2];
          
          // Calculate distance between particles
          const distance = Math.sqrt(
            (x2 - x1) * (x2 - x1) + 
            (y2 - y1) * (y2 - y1) + 
            (z2 - z1) * (z2 - z1)
          );
          
          // Connect if close enough
          if (distance < connectionDistance) {
            linePositions.push(x1, y1, z1);
            linePositions.push(x2, y2, z2);
            connections++;
          }
        }
      }
      
      lineGeometry.setAttribute(
        'position', 
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
      
      return new THREE.LineSegments(lineGeometry, lineMaterial);
    };
    
    // Add connection lines
    const connectionLines = createConnectionLines();
    scene.add(connectionLines);
    
    // Mouse interaction
    const mouse = new THREE.Vector2();
    const mouseSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 5);
    
    // Update mouse position
    const handleMouseMove = (event) => {
      // Convert mouse position to normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Convert to world coordinates
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      mouseSphere.center.copy(camera.position).add(dir.multiplyScalar(distance));
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation variables
    let rotationSpeed = 0.0005;
    const particlePositions = particles.geometry.attributes.position;
    const particleSizes = particles.geometry.attributes.size;
    const originalPositions = particlePositions.array.slice();
    const originalSizes = particleSizes.array.slice();
    
    // Track animation frame ID for cleanup
    let animationId;
    
    // Animate the scene
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Rotate particles slowly
      particles.rotation.y += rotationSpeed;
      particles.rotation.x += rotationSpeed * 0.5;
      
      // Particle movement based on mouse position
      const positions = particlePositions.array;
      const sizes = particleSizes.array;
      
      for (let i = 0; i < positions.length; i += 3) {
        const i1 = i / 3;
        
        // Original position
        const originalX = originalPositions[i];
        const originalY = originalPositions[i + 1];
        const originalZ = originalPositions[i + 2];
        
        // Create point from original position
        const point = new THREE.Vector3(originalX, originalY, originalZ);
        
        // Apply rotation to get current position
        point.applyQuaternion(particles.quaternion);
        
        // Distance from mouse
        const distanceToMouse = mouseSphere.center.distanceTo(point);
        
        // If close to mouse, push particles away
        if (distanceToMouse < mouseSphere.radius) {
          // Direction from mouse to particle
          const direction = new THREE.Vector3();
          direction.subVectors(point, mouseSphere.center).normalize();
          
          // Push factor based on distance (stronger when closer)
          const pushFactor = 1 - distanceToMouse / mouseSphere.radius;
          
          // Apply push effect (in the particle's local space)
          const particleWorldPos = new THREE.Vector3(
            positions[i], 
            positions[i + 1], 
            positions[i + 2]
          );
          
          particleWorldPos.add(direction.multiplyScalar(pushFactor * 0.5));
          
          // Update position
          positions[i] = particleWorldPos.x;
          positions[i + 1] = particleWorldPos.y;
          positions[i + 2] = particleWorldPos.z;
          
          // Increase size when close to mouse
          sizes[i1] = originalSizes[i1] * (1 + pushFactor);
        } else {
          // Gradually return to original position and size
          positions[i] = originalPositions[i];
          positions[i + 1] = originalPositions[i + 1];
          positions[i + 2] = originalPositions[i + 2];
          sizes[i1] = originalSizes[i1];
        }
      }
      
      particlePositions.needsUpdate = true;
      particleSizes.needsUpdate = true;
      
      // Render the scene
      renderer.render(scene, camera);
    };
    
    // Handle window resize
    const handleResize = () => {
      const { width, height } = getWindowDimensions();
      
      // Update camera aspect ratio
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      // Update renderer size
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();
    
    // Mark as loaded
    setIsLoaded(true);
    
    // Cleanup function
    return () => {
      // Stop animation loop
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      // Remove event listeners
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Dispose resources
      if (particles) {
        particles.geometry.dispose();
        particles.material.dispose();
        scene.remove(particles);
      }
      
      if (connectionLines) {
        connectionLines.geometry.dispose();
        connectionLines.material.dispose();
        scene.remove(connectionLines);
      }
      
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);
  
  return (
    <div className="absolute inset-0 z-0">
      {/* Background gradient */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.95), rgba(9, 9, 11, 0.98))',
          zIndex: -1
        }}
      ></div>
      
      {/* Three.js container */}
      <div 
        ref={mountRef}
        className={`absolute inset-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ zIndex: 0 }}
      ></div>
      
      {/* Loading indicator (shows until particles are loaded) */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ParticleBackground;