const Camera = require("./camera");
const Vec3 = require("./vec3");
const BasicShader = require("./basicShader");

class Scene {
  constructor() {
    this._camera = null;
    this._geometries = [];
    this._lights = [];
  }
  get geometries() {
    return this._geometries;
  }
  get lights() {
    return this._lights;
  }

  add(node) {
    if (node.type === "camera") this._camera = node;
    if (node.type === "geometry") this._geometries.push(node);
    if (node.type === "light") this._lights.push(node);
  }

  render({ nRows, nCols, cellWidth, cellHeight }) {
    let cells = [];
    const _viewportWidth = 10;
    const _pixelWidth = _viewportWidth / nCols;
    const _pixelHeight = _pixelWidth;

    const _viewportHeight =
      (_viewportWidth * nRows * cellHeight) / (cellWidth * nCols);

    const camera = new Camera({
      location: new Vec3(1, 1, 0),
      rotation: new Vec3(0, 0, 0),
      viewportSize: { width: _viewportWidth, height: _viewportHeight },
      pixelSize: { width: _pixelWidth, height: _pixelHeight },
    });

    // turn camera on!
    camera.castRaysFromEachPixel(this.geometries);

    // coloring
    camera.viewportPixels.forEach((pixel) => {
      if (pixel.seenObjects.length > 0) {
        if (pixel.seenObjects.length > 1) {
          let nearestObjectIndex = pixel.seenObjects[0].geometryIndex;
          let nearestObjectHitPoint = pixel.seenObjects[0].hitPoint;

          for (let i = 1; i < pixel.seenObjects.length; i++) {
            if (pixel.seenObjects[i].hitPoint.t < nearestObjectHitPoint.t) {
              nearestObjectHitPoint = pixel.seenObjects[i].hitPoint;
              nearestObjectIndex = pixel.seenObjects[i].geometryIndex;
            }
          }

          cells.push({
            id: pixel.pixelId,
            color: BasicShader.shadePixel({
              lights: this.lights,
              geometry: this.geometries[nearestObjectIndex],
              hitPointCoord: nearestObjectHitPoint.coordinate,
            }),
          });
        } else {
          // if ray hits only one object
          let seenObjectIndex = pixel.seenObjects[0].geometryIndex;
          const currentSeenObject = this.geometries[seenObjectIndex];

          const { r, g, b } = currentSeenObject.material.diffuse;
          cells.push({
            id: pixel.pixelId,
            color: BasicShader.shadePixel({
              lights: this.lights,
              geometry: currentSeenObject,
              hitPointCoord: pixel.seenObjects[0].hitPoint.coordinate,
            }),
          });
        }
      }
    });

    return cells;
  }
}

module.exports = Scene;
