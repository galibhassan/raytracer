const Vec3 = require("./vec3");
const Ray = require("./ray");
const Sphere = require("./sphere");
const { color, doesHitSphere } = require("./utils");

const main = (nx, ny ) => {

    let cells = []

    const sphere = new Sphere(new Vec3(0, 0, -1), 0.5)
    


    const lowerLeftCorner = new Vec3(-2, -1, -1);
    const horizontal = new Vec3(4, 0, 0);
    const vertical = new Vec3(0, 2, 0);
    const origin = new Vec3(0, 0, 0);

    for (let j = ny - 1; j >= 0; j--) {
        for (let i = 0; i < nx; i++) {
            let u = i / nx;
            let v = j / ny;
            let ray = new Ray(
                origin,
                lowerLeftCorner
                    .addWith(
                        horizontal.multiplyBy(u)
                            .addWith(
                                vertical.multiplyBy(v)
                            )
                    )
            );
            let col = color(ray, sphere);
            let ir = parseInt(255.99 * col.r);
            let ig = parseInt(255.99 * col.g);
            let ib = parseInt(255.99 * col.b);

            cells.push(
                {
                    id: `${j}_${i}`,
                    color: `rgb(${ir}, ${ig}, ${ib})`
                }
            )
        }
    }

    return {
        cells
    }
}

module.exports = main
