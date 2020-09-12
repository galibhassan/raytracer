const Vec3 = require("./vec3");
const Ray = require("./ray");
const Sphere = require("./sphere");
const Light = require("./light");
const Triangle = require("./triangle")
const Scene = require("./scene")

const main = ({ nRows, nCols, cellWidth, cellHeight }) => {

    //const geometries = [];
    const scene = new Scene()

    const triangle = new Triangle({
        v1: new Vec3(-0.106471, 1.42532, -1.48764),
        v2: new Vec3(0.75429, -0.036959, -0.696204),
        v3: new Vec3(2.35817, 0.936471, -0.519295),
        material: {
            diffuse: "#3e7fb5"
        }
    })
    // geometries.push(triangle)
    scene.add(triangle)
    
    const triangle2 = new Triangle({
        v1: new Vec3(0, 2.5, -1.3),
        v2: new Vec3(-0.454532, 0, -1),
        v3: new Vec3(1.92302, 0.04895, -0.726603),
        material: {
            diffuse: "#bf382e"
        }
    })
    scene.add(triangle2)
    // geometries.push(triangle2)

    const triangle3 = new Triangle({
        v1: new Vec3(-1.24369, 2.03109, 0.578826),
        v2: new Vec3(0.113033, 0.231454, -0.19462),
        v3: new Vec3(1.3, 1.44637, -2.17365),
        material: {
            diffuse: "#bcc441"
        }
    })
    // geometries.push(triangle3)
    scene.add(triangle3)

    const light = new Light({
        position: new Vec3(-3, -1, 0.5),
        intensity: 7,
        color: { r: 255, g: 255, b: 255 }
    })
    scene.add(light)

    const cells = scene.render({nRows, nCols, cellWidth, cellHeight})
    console.log(cells)
    return {cells};

}

module.exports = main

// test