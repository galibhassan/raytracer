const { cramersRule3 } = require('./utils');
// const Vec3 = require('./vec3');
// const Ray = require('./ray');

class Triangle {
    constructor({ v1, v2, v3, material }) {
        this._v1 = v1;
        this._v2 = v2;
        this._v3 = v3;
        this._material = material;

    }
    get type(){return "geometry"}
    get v1() { return this._v1 }
    get v2() { return this._v2 }
    get v3() { return this._v3 }
    get material() { return this._material }

    get normal() {
        const v1v2 = this.v1.subtractFrom(this.v2)
        const v1v3 = this.v1.subtractFrom(this.v3)

        return v1v2.crossProdWith(v1v3)
    }

    getIntersectionPoint(ray) {
        const o = ray.getOrigin();
        const d = ray.getDirection();
        const numerator = (o.subtractFrom(this.v1)).innerProdWith(this.normal)
        const denominator = d.innerProdWith(this.normal)
        if (denominator !== 0) {
            // i.e. ray and plan are not parallel
            const t = numerator / denominator;
            if (t < 0) {
                // intersection point is behind the camera
                return null
            } else {
                return t
            }
        } else {
            // if numerator is zero
            return null;
        }
    }

    isHitByRay(ray) {
        const t = this.getIntersectionPoint(ray);
        if (t === null) {
            return null;
        }
        else {
            // check if the intersection point is inside the triangle
            const IntersectionPoint = ray.pointAtParameter(t)

            // weighted mean: aV1 + bV2 + cV3
            const { a, b, c } = cramersRule3(this.v1, this.v2, this.v3, IntersectionPoint)
            if (a > 0 && b > 0 && c > 0) {
                return t;
            } else {
                return null
            }
        }
    }
}

module.exports = Triangle;

// test
/* const triag = new Triangle({
    v1: new Vec3(0, 0, -1),
    v2: new Vec3(1, 0, -1),
    v3: new Vec3(0, 1, -1),
    material: {
        diffuse: "blue"
    }
})
const e = 0.5
const ray = new Ray(
    new Vec3(1 - e, 0.001, 0),
    new Vec3(0, 0, -1)
    )
console.log(triag)
console.log(ray)
console.log(triag.isHitByRay(ray))

*/