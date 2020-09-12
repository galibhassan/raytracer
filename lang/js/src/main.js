const Vec3 = require("./vec3");
const Light = require("./light");
const Triangle = require("./triangle");
const Scene = require("./scene");

const main = ({ nRows, nCols, cellWidth, cellHeight }) => {
  const scene = new Scene();

  const triangle = new Triangle({
    v1: new Vec3(-0.106471, 1.42532, -1.48764),
    v2: new Vec3(0.75429, -0.036959, -0.696204),
    v3: new Vec3(2.35817, 0.936471, -0.519295),
    material: {
      diffuse: { r: 255, g: 0, b: 0 },
    },
  });
  scene.add(triangle);

  const triangle2 = new Triangle({
    v1: new Vec3(0, 2.5, -1.3),
    v2: new Vec3(-0.454532, 0, -1),
    v3: new Vec3(1.92302, 0.04895, -0.726603),
    material: {
      diffuse: { r: 255, g: 0, b: 0 },
    },
  });
  scene.add(triangle2);

  const triangle3 = new Triangle({
    v1: new Vec3(-1.24369, 2.03109, 0.578826),
    v2: new Vec3(0.113033, 0.231454, -0.19462),
    v3: new Vec3(1.3, 1.44637, -2.17365),
    material: {
      diffuse: { r: 255, g: 0, b: 0 },
    },
  });
  scene.add(triangle3);

  const light = new Light({
    position: new Vec3(-3, -1, 0.5),
    intensity: 0.5,
    color: { r: 255, g: 255, b: 255 },
  });
  scene.add(light);
  const light2 = new Light({
    position: new Vec3(3, 1, 0.5),
    intensity: 0.9,
    color: { r: 255, g: 255, b: 255 },
  });
  scene.add(light2);

  const cells = scene.render({ nRows, nCols, cellWidth, cellHeight });
  return { cells };
};

module.exports = main;

// test
// main({ nRows:10, nCols:10, cellWidth:10, cellHeight:10 })
