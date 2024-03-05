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

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      size.width / size.height,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("canvas")!,
    });

    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.position.z = 5;
    scene.add(camera);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    renderer.render(scene, camera);

    function animate() {
      renderer.render(scene, camera);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      requestAnimationFrame(animate);
    }

    animate();
    window.addEventListener("resize", () => onWindowResize(camera, renderer));

    return () => {
      window.removeEventListener("resize", () =>
        onWindowResize(camera, renderer)
      );
    };
  }, []);

  return (
    <main className={styles.main}>
      <canvas className={styles.webgl}></canvas>
    </main>
  );
}

function initScene(
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer
) {
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  camera.position.z = 5;
  scene.add(camera);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);

  scene.add(cube);
  renderer.render(scene, camera);

  function animate() {
    renderer.render(scene, camera);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    requestAnimationFrame(animate);
  }

  animate();
}

function onWindowResize(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) {
  console.log("Resizing window");

  // Update sizes
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  console.log(`New size: ${size.width} x ${size.height}`);

  // Update camera
  camera.aspect = size.width / size.height;
  console.log(`New camera aspect: ${camera.aspect}`);
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
