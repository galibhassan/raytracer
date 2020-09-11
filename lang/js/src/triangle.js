const {cramersRule3} = require('./utils');
const Vec3 = require('./vec3');
const Ray = require('./ray');

class Triangle {
    constructor(v1, v2, v3) {
        this._v1 = v1;
        this._v2 = v2;
        this._v3 = v3;

    }

    get v1() { return this._v1 }
    get v2() { return this._v2 }
    get v3() { return this._v3 }

    get normal() {
        return this.v1.crossProdWith(this.v2)
    }

    getIntersectionPoint(ray) {
        const o = ray.getOrigin();
        const d = ray.getDirection();
        const numerator = (o.subtractFrom(this.v1)).innerProdWith(this.normal)
        const denominator = d.innerProdWith(this.normal)
        if (denominator !== 0) {
            // i.e. ray and plan are not parallel
            t = numerator / denominator;
            if (t < 0) {
                // intersection point is behind the camera
                return null
            } else {
                return t
            }
        }
    }

    doesRayHitTriangle(ray) {
        const t = this.getIntersectionPoint(ray);
        if( t === null) return false;

        // check if the intersection point is inside the triangle
        // I = intersection point
        I = ray.pointAtParameter(t)

        // weighted mean: aV1 + bV2 + cV3
        const {a,b,c} = cramersRule3(this.v1, this.v2, this.v3, I)
        if(a>0 && b>0 && c>0) {
            return true;
        } else {
            return false
        }
    }


}

// test 
const triag = new Triangle(
    new Vec3(0,0,0),
    new Vec3(0,1,0),
    new Vec3(1,0,0),
)

const ray = new Ray(
    new Vec3(0.1,0.1,1),
    new Vec3(0,0,-1)

)

console.log(triag.doesRayHitTriangle(ray))