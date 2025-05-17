// src/components/ModelViewer.jsx - Fixed version without unused imports
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ModelViewer = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Current ref value
    const currentRef = mountRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      currentRef.clientWidth / currentRef.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true  // Enable transparency
    });
    renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    currentRef.appendChild(renderer.domElement);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xff4c29, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create 3D object - Interactive Android mascot proxy
    const geometry = new THREE.SphereGeometry(1.2, 32, 32);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xff4c29,
      metalness: 0.3,
      roughness: 0.5,
      emissive: 0xff4c29,
      emissiveIntensity: 0.2
    });
    const sphere = new THREE.Mesh(geometry, material);
    
    // Add wireframe effect
    const wireframe = new THREE.WireframeGeometry(geometry);
    const line = new THREE.LineSegments(wireframe);
    line.material.color.set(0xff4c29);
    line.material.opacity = 0.2;
    line.material.transparent = true;
    sphere.add(line);
    
    scene.add(sphere);

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.01;
      
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentRef.contains(renderer.domElement)) {
        currentRef.removeChild(renderer.domElement);
      }
      scene.remove(sphere);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full rounded-lg"></div>;
};

export default ModelViewer;