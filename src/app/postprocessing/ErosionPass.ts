import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

class ErosionPass extends ShaderPass {
  constructor() {
    super({
      uniforms: {
        tDiffuse: { value: null },
      },
      vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
      fragmentShader: `
                uniform sampler2D tDiffuse;
                varying vec2 vUv;
                void main() {
                    vec4 color = texture2D(tDiffuse, vUv);
                    if (mod(gl_FragCoord.x + gl_FragCoord.y, 4.0) < 1.0) {
                        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color
                    } else {
                        gl_FragColor = color;
                    }
                }
            `,
    });
  }
}

export { ErosionPass };
