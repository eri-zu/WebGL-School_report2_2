import { Mesh, Group } from "three";
import { radian, randomInt } from "../../util/math";
import { Obj2 } from "./obj2";

export class Obj {
  constructor(geometry1, geometry2, material1, material2, h, i) {
    this.i = i;
    this.h = h;

    // rect
    this.rect = new Mesh(geometry1, material1);
    this.group = new Group();
    this.inner = new Group();

    // circle
    this.obj2 = new Obj2(geometry2, material2, this.i, this.h);

    // add
    this.group.add(this.inner);
    this.inner.add(this.rect, this.obj2.group);

    this.init();
    this.setEvents();
  }

  init() {
    const r = 250;
    this.group.position.y = Math.sin(radian((360 / 8) * this.i)) * r;
    this.group.position.x = Math.cos(radian((360 / 8) * this.i)) * r;

    const y = this.h * 0.5;

    if (this.i % 2 == 0) {
      this.rect.position.y -= y;
    }
  }

  onUpdate(time) {
    this.obj2.onUpdate(time);
    this.rotate(time);
  }

  rotate(time) {
    const deg = time * randomInt(1, 5);
    this.inner.rotation.z -= deg;
  }

  onResize(w, h) {}

  setEvents() {}
}
