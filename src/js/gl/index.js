import { Scene, AxesHelper } from "three";
import { Renderer } from "./renderer";
import { Camera } from "./perspectiveCamera";
// import { Camera } from "./orthographicCamera";
import { Objs } from "./objs";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Light } from "./light";

export class Gl {
  constructor(wrap) {
    this.wrap = wrap;

    this.isHelper = false;

    this.init();
  }

  init() {
    this.canvas = this.wrap.querySelector("canvas");
    this.renderer = new Renderer(this.canvas);
    this.scene = new Scene();
    this.camera = new Camera();
    this.light = new Light();
    this.objs = new Objs();

    this.scene.add(this.light.instance);
    this.scene.add(this.objs.group);

    this.setUtility();
  }

  onUpdate() {
    if (this.controls) this.controls.update();
    this.objs.onUpdate();

    this.renderer.instance.render(this.scene, this.camera.instance);
  }

  onResize() {
    const w = this.wrap.clientWidth;
    const h = this.wrap.clientHeight;

    this.renderer.onResize(w, h);
    this.camera.onResize(w, h);
    this.objs.onResize(w, h);
  }

  setUtility() {
    // helper
    if (this.isHelper) {
      const axesBarLength = 600.0;
      this.axesHelper = new AxesHelper(axesBarLength);
      this.scene.add(this.axesHelper);
    }

    // orbit control
    this.controls = new OrbitControls(this.camera.instance, this.canvas);
  }
}
