const Vec3 = require("./vec3");

const color = (ray, sphere) => {

    if (doesHitSphere(ray, sphere)) {
        return new Vec3(209/255, 92/255, 71/255)
    }

    /* LERP sky
        const unitDirection = ray.direction.unitVector();
        const t = 0.5 * (unitDirection.y + 1);
    
        const output = new Vec3(1,1,1)
        .multiplyBy((1-t))
        .addWith(
            new Vec3(0.5, 0.7, 1.0)
            .multiplyBy(t)
        )
     */
    const output = new Vec3(41/255, 115/255, 84/255)
    return output

}

const doesHitSphere = (ray, sphere) => {
    const o2c = sphere.center.subtractFrom(ray.origin)
        ; // vector from ray.origin to sphere center

    const a = ray.direction.norm()
    const b = 2 * o2c.norm();
    const c = sphere.center.norm() - Math.pow(sphere.radius, 2);
    const discriminant = b * b - 4 * a * c;

    return discriminant > 0

}

module.exports = { color, doesHitSphere }



// test
// const ray = new Ray(new Vec3(0,0,0), new Vec3(0,0,1))
/// console.log(color(ray))

