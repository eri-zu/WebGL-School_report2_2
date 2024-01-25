import {
  Color,
  BoxGeometry,
  MeshPhongMaterial,
  Group,
  SphereGeometry,
  DoubleSide,
} from "three";
import { Obj } from "./obj";

export class Objs {
  constructor() {
    this.group = new Group();
    this.meshArray = [];

    this.prevTime = 0;

    this.init();
    this.setEvents();
  }

  static get PARAM() {
    return {
      color1: new Color("rgba(247, 210, 156)"),
      color2: new Color("rgba(32, 146, 200)"),
      w1: 5,
      h1: 50,
    };
  }

  init() {
    const geometry1 = new BoxGeometry(
      Objs.PARAM.w1,
      Objs.PARAM.h1,
      Objs.PARAM.w1
    );
    const geometry2 = new SphereGeometry(5, 30, 5);
    const material1 = new MeshPhongMaterial({
      color: Objs.PARAM.color1,
      side: DoubleSide,
    });
    const material2 = new MeshPhongMaterial({
      color: Objs.PARAM.color2,
      side: DoubleSide,
    });

    for (let i = 0; i < 8; i++) {
      const obj = new Obj(
        geometry1,
        geometry2,
        material1,
        material2,
        Objs.PARAM.h1,
        i
      );
      this.meshArray.push(obj);
    }

    this.meshArray.forEach((el, i) => {
      this.group.add(el.group);
    });
  }

  onUpdate() {
    const now = Date.now();
    const time = (now - this.prevTime) / 1000; // 前フレームからの経過時間 0.17とか
    this.prevTime = now;

    this.meshArray.forEach((el, i) => {
      el.onUpdate(time);
    });

    this.group.rotation.x += time * 0.3;
    this.group.rotation.y += time * 0.3;
  }

  onResize(w, h) {}

  setEvents() {}
}
