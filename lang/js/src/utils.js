const Vec3 = require("./vec3");

const color = (ray, sphere, light) => {

    let t = doesHitSphere(ray, sphere);
    if (t != -1) {
        // return new Vec3(209 / 255, 92 / 255, 71 / 255) // red

        const vecAt_t = ray.pointAtParameter(t)
        // const sNormal_unNormalized = new Vec3(vecAt_t.x, vecAt_t.y, vecAt_t.z)
        const sNormal =
            sphere.center
                .subtractFrom(vecAt_t)
                .unitVector()

        // scale within [-1,1]
        const sNormalScaled =
            (new Vec3(sNormal.r + 1, sNormal.g + 1, sNormal.r + 1))
                .multiplyBy(0.5)


        // calculate unit s-p; s=light.position; p=intersection point (for ray and geometry)
        const sLightRay = vecAt_t.subtractFrom(light.position).unitVector()
        const lightIntensityProd =  sLightRay.innerProdWith(sNormal)
        const lightIntensityProdNormalized = lightIntensityProd / 3;

        console.log(lightIntensityProdNormalized)

        return new Vec3(
            - light.intensity * lightIntensityProdNormalized * sphere.material.diffuse.r/255,
            - light.intensity * lightIntensityProdNormalized * sphere.material.diffuse.g/255,
            - light.intensity * lightIntensityProdNormalized * sphere.material.diffuse.b/255,
        )
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
    
    /* const unitDirection = ray.getDirection().unitVector();
    t = 0.5 * (unitDirection.y + 1)
    const leftV =   (new Vec3(1, 1, 1)).multiplyBy(1-t)
    const rightV = (new Vec3(0.5, 0.7, 1)).multiplyBy(t)
    const output = leftV.addWith(rightV) */
    // const output = new Vec3(41 / 255, 115 / 255, 84 / 255) // green
    const output = new Vec3(.2,.2,0.2)
    return output;

}

const doesHitSphere = (ray, sphere) => {
    const o2c = sphere.center.subtractFrom(ray.origin); 

    // vector from ray.origin to sphere center

    const a = ray.direction.norm()
    const b = 2 * o2c.norm();
    const c = sphere.center.norm() - Math.pow(sphere.radius, 2);
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
        return -1
    } else {
        return (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a)
    }
}

const cramersRule3 = (A, B, C, I) => {
    const D = A.x * (B.y * C.z - C.y * B.z) + B.x * (C.y * A.z - A.y * C.z) + C.x * (A.y * B.z - B.y * A.z)
    const Da = I.x * (B.y * C.z - C.y * B.z) + B.x * (C.y * I.z - I.y * C.z) + C.x * (I.y * B.z - B.y * I.z)
    const Db = A.x * (I.y * C.z - C.y * I.z) + I.x * (C.y * A.z - A.y * C.z) + C.x * (A.y * I.z - I.y * A.z)
    const Dc = A.x * (B.y * I.z - I.y * B.z) + B.x * (I.y * A.z - A.y * C.z) + I.x * (A.y * B.z - B.y * A.z)

    return {
        a: Da / D,
        b: Db / D,
        c: Dc / D
    }
}

module.exports = { color, doesHitSphere, cramersRule3 }

// test
// const ray = new Ray(new Vec3(0,0,0), new Vec3(0,0,1))
/// console.log(color(ray))

