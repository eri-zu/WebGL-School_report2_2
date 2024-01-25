import { Mesh, Group } from "three";

export class Obj2 {
  constructor(geometry2, material, i, h) {
    this.i = i;
    this.h = h;

    this.mesh = new Mesh(geometry2, material);
    this.group = new Group();

    this.group.add(this.mesh);
    this.deg = 0;

    this.init();
  }

  init() {
    const y = this.h * 0.5;

    if (this.i % 2 == 0) {
      this.group.position.y -= y;
    }
  }

  onUpdate(time) {
    this.deg += time;

    // console.log(deg);

    this.mesh.position.y = Math.sin(this.deg) * 50;
    this.mesh.position.x = Math.cos(this.deg) * 50;
    this.mesh.position.z = Math.cos(this.deg) * 50;
  }
}
