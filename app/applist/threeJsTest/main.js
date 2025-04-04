"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const ThreeScene = () => {
  useEffect(() => {
    const container = document.getElementById("three-container");

    // Create Scene
    const scene = new THREE.Scene();

    // Create Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5); // Move camera back

    // Create Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container?.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);


    // Load GLTF Model
    const loader = new GLTFLoader();
    let model;
    loader.load(
      "/3D/porsche.glb",
      (gltf) => {
        model = gltf.scene;
        model.scale.set(100, 100, 100); // Scale down the model
        model.position.set(0, 1, 0); // Move car upwards
        scene.add(model);

        // Apply textures to model
        model.traverse((child) => {
          if (child.isMesh) {
            const material = new THREE.MeshStandardMaterial({
              map: textures.color, // Base color texture
              normalMap: textures.normal, // Normal map for details
              roughnessMap: textures.roughness, // Roughness map for realism
            });
            child.material = material;
          }
        });
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (model) model.rotation.y += 0.01; // Rotate car
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container?.removeChild(renderer.domElement);
    };
  }, []);

  return <div id="three-container" className="w-screen h-screen" />;
};

export default ThreeScene;
