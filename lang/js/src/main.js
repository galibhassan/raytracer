const path = require("path");
const fs = require('fs');
const Vec3 = require("./vec3");
const Ray = require("./ray");
const Sphere = require("./sphere");
const { color, doesHitSphere } = require("./utils");



const main = () => {
    const cellSize = 10;
    const nCells = 10;

    nx = 2*cellSize*nCells;
    ny = 1*cellSize*nCells;

    const stream = fs.createWriteStream(
        path.resolve(__dirname, "output.ppm"),
        { flags: 'w' }
    )

    const header = 
`P3
${nx} ${ny}
255`
    stream.write(header)
    stream.write("\n")

    const sphere = new Sphere(new Vec3(0,0,-1), 0.5)

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
            stream.write(`${ir} ${ig} ${ib} `) 
        }
        stream.write("\n");
    }
    stream.end()
}

main()