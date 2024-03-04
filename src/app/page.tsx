"use client";
import { use, useEffect } from "react";
import styles from "./page.module.css";
import * as THREE from "three";

const size = {
  width: 0,
  height: 0,
};

export default function Home() {
  useEffect(() => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    initScene();
  }, []);

  return (
    <main className={styles.main}>
      <canvas className={styles.webgl}></canvas>
    </main>
  );
}

function initScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("canvas")!,
  });

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  camera.position.z = 5;

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);

  scene.add(cube);
  onWindowResize(camera, renderer);
  renderer.render(scene, camera);

  // function animate() {
  //   renderer.render(scene, camera);

  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;

  //   requestAnimationFrame(animate);
  // }

  // animate();

  window.addEventListener("resize", () => onWindowResize(camera, renderer));
}

function onWindowResize(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) {
  // Update sizes
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  // Update camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
