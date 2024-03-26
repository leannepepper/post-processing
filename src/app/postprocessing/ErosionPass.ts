import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import {
  AdditiveBlending,
  Camera,
  Color,
  DoubleSide,
  HalfFloatType,
  Matrix4,
  MeshDepthMaterial,
  NoBlending,
  Object3D,
  RGBADepthPacking,
  Scene,
  ShaderMaterial,
  UniformsUtils,
  Vector2,
  Vector3,
  WebGLRenderTarget,
  WebGLRenderer,
} from "three";
import {
  Pass,
  FullScreenQuad,
} from "three/examples/jsm/postprocessing/Pass.js";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";

class ErosionPass extends Pass {
  renderScene: Scene;
  renderCamera: Camera;
  resolution: Vector2;
  selectedObjects: Object3D[];
  fsQuad: FullScreenQuad;
  copyUniforms: any;
  materialCopy: ShaderMaterial;

  constructor(
    resolution: Vector2,
    scene: Scene,
    camera: Camera,
    selectedObjects: Object3D[]
  ) {
    super();

    this.renderScene = scene;
    this.renderCamera = camera;
    this.selectedObjects = selectedObjects !== undefined ? selectedObjects : [];
    this.resolution =
      resolution !== undefined
        ? new Vector2(resolution.x, resolution.y)
        : new Vector2(256, 256);

    this.fsQuad = new FullScreenQuad(undefined);

    // copy material
    const copyShader = CopyShader;
    this.copyUniforms = UniformsUtils.clone(copyShader.uniforms);
    this.materialCopy = new ShaderMaterial({
      uniforms: this.copyUniforms,
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
            // Simple condition to alternate pixels based on screen position
            if (mod(gl_FragCoord.x + gl_FragCoord.y, 2.0) < 1.0) {
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color
            } else {
                gl_FragColor = color;
            }
        }
    `,
      blending: NoBlending,
      depthTest: false,
      depthWrite: false,
    });
  }

  render(
    renderer: WebGLRenderer,
    writeBuffer: WebGLRenderTarget,
    readBuffer: WebGLRenderTarget,
    deltaTime: number,
    maskActive: boolean
  ) {
    // Update the uniforms of your materialCopy if necessary. For instance:
    this.materialCopy.uniforms["tDiffuse"].value = readBuffer.texture;

    // Set fsQuad material to the custom shader material
    this.fsQuad.material = this.materialCopy;

    // Ensure you're rendering to the correct target: either the writeBuffer or the screen.
    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    }
  }
}

export { ErosionPass };
