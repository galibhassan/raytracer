const objLoader = require("./loaders/objLoader");
const Vec3 = require("./vec3");
const Triangle = require("./triangle");

class WaveFrontOBJ {
  constructor(objFilePath) {
    this.objFilePath = objFilePath;
    this._triangles = [];
    this.material = { diffuse: { r: 0, g: 100, b: 170 } };
    this.getTriangles();
  }

  get triangles() {
    return this._triangles;
  }
  get type() {
    return "poly";
  }

  getTriangles() {
    // read .obj file
    const objData = objLoader(this.objFilePath);

    // make triangles
    const triangles = objData.faces.map((face) => {
      const v1Index = face.ibo_chunk[0];
      const v2Index = face.ibo_chunk[1];
      const v3Index = face.ibo_chunk[2];

      const vert_Arrayfied1 = objData.vertices[v1Index];
      const vert_Arrayfied2 = objData.vertices[v2Index];
      const vert_Arrayfied3 = objData.vertices[v3Index];

      const v1 = new Vec3(
        vert_Arrayfied1[0],
        vert_Arrayfied1[1],
        vert_Arrayfied1[2]
      );
      const v2 = new Vec3(
        vert_Arrayfied2[0],
        vert_Arrayfied2[1],
        vert_Arrayfied2[2]
      );
      const v3 = new Vec3(
        vert_Arrayfied3[0],
        vert_Arrayfied3[1],
        vert_Arrayfied3[2]
      );

      const normalIndex = face.vNormals_chunk[0];
      const vNormal_Arrayfied = objData.normals[normalIndex];
      const normal = new Vec3(
        vNormal_Arrayfied[0],
        vNormal_Arrayfied[1],
        vNormal_Arrayfied[2]
      ).multiplyBy(-1);
      

      const triangle = new Triangle({
        v1,
        v2,
        v3,
        normal,
        material: this.material,
      });

      return triangle;
    });

    this._triangles.push(...triangles);
  }
}

module.exports = WaveFrontOBJ;

// test
/* 
    const path = require("path");
    model = new WaveFrontOBJ(
        path.resolve(__dirname, 'loaders', 'samplemodel', 'polygonGeometry.obj')
    );

    console.log(model.triangles)
console.log(model.type)
*/
