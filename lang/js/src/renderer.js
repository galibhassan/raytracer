const Vec3 = require("./vec3");
const Ray = require("./ray");
const Sphere = require("./sphere");
const Light = require("./light");
const Triangle = require("./triangle")
const Camera = require('./camera')

const main = ({ nRows, nCols, cellWidth, cellHeight }) => {
    let cells = []
    const geometries = [];

    const triangle = new Triangle({
        v1: new Vec3(-0.106471, 1.42532, -1.48764),
        v2: new Vec3(0.75429, -0.036959, -0.696204),
        v3: new Vec3(2.35817, 0.936471, -0.519295),
        material: {
            diffuse: "blue"
        }
    })
    geometries.push(triangle)
    
    const triangle2 = new Triangle({
        v1: new Vec3(0, 2.5, -1.3),
        v2: new Vec3(0, 0, -1),
        v3: new Vec3(1.92302, 0.04895, -0.726603),
        material: {
            diffuse: "red"
        }
    })
    geometries.push(triangle2)

    const triangle3 = new Triangle({
        v1: new Vec3(-1.24369, 2.03109, 0.578826),
        v2: new Vec3(0.113033, 0.231454, -0.19462),
        v3: new Vec3(1.3, 1.44637, -2.17365),
        material: {
            diffuse: "green"
        }
    })
    geometries.push(triangle3)

    const light = new Light({
        position: new Vec3(-3, -1, 0.5),
        intensity: 7,
        color: { r: 255, g: 255, b: 255 }
    })


    const _viewportWidth = 10;
    const _pixelWidth = _viewportWidth / nCols;
    const _pixelHeight = _pixelWidth;

    const _viewportHeight = (_viewportWidth * nRows * cellHeight) / (cellWidth * nCols);

    const camera = new Camera({
        location: new Vec3(1, 1, 0),
        rotation: new Vec3(0, 0, 0),
        viewportSize: { width: _viewportWidth, height: _viewportHeight },
        pixelSize: { width: _pixelWidth, height: _pixelHeight }
    })

    // turn camera on!
    camera.castRaysFromEachPixel(geometries)

    // coloring
    camera.viewportPixels.forEach(pixel => {
        if (pixel.seenObjects.length > 0) {
            if(pixel.seenObjects.length>1){
                let nearestObjectIndex = pixel.seenObjects[0].geometryIndex
                let nearestObjectHitPoint = pixel.seenObjects[0].hitPoint

                for(let i=1; i<pixel.seenObjects.length; i++) {
                    if(pixel.seenObjects[i].hitPoint<nearestObjectHitPoint) {
                        nearestObjectHitPoint = pixel.seenObjects[i].hitPoint
                        nearestObjectIndex = pixel.seenObjects[i].geometryIndex
                    }
                }
                
                cells.push({
                    id: pixel.pixelId,
                    color: geometries[nearestObjectIndex].material.diffuse
                })

            } else {
                // if ray hits only one object
                let seenObjectIndex = pixel.seenObjects[0].geometryIndex
                const currentSeenObject =  geometries[seenObjectIndex];
                cells.push({
                    id: pixel.pixelId,
                    color: currentSeenObject.material.diffuse
                })
            }

        }
    })

    // console.log(camera.viewportPixels)

    return {
        cells
    }
}

module.exports = main

// test