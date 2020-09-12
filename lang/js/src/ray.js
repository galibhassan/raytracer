const Vec3 = require("./vec3");
class Ray {
  constructor(origin, direction) {
    this.origin = origin; // Vec3
    this.direction = direction; // Vec3
  }

  getOrigin() {
    return this.origin;
  }
  getDirection() {
    return this.direction;
  }

  pointAtParameter(t) {
    return this.origin.addWith(this.direction.multiplyBy(t));
  }
}

module.exports = Ray;

// test
// ray = new Ray(new Vec3(0,0,0), new Vec3(1, 1, 1))
// console.log(ray.direction.unitVector())
