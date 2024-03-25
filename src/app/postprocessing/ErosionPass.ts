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
      vertexShader: copyShader.vertexShader,
      fragmentShader: copyShader.fragmentShader,
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
    renderer.render(this.renderScene, this.renderCamera);
  }
}

export { ErosionPass };
