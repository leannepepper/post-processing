"use client";
import { useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const gl = canvas?.getContext("webgl");

    if (!gl) {
      throw new Error("WebGL not supported");
    }

    gl.clearColor(1, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }, []);

  return (
    <main className={styles.main}>
      <canvas className={styles.webgl}></canvas>
    </main>
  );
}
