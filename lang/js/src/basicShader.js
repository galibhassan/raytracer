const Vec3 = require("./vec3");

class BasicShader {
  static shadePixel({ lights, geometry, hitPointCoord }) {
    
    let brightnessAccumulated = 0;

    lights.forEach((light) => {
      let backLightIndicator;
      const hitPointToLight = hitPointCoord.subtractFrom(light.position);
      const sNormal = geometry.normal;
      backLightIndicator = hitPointToLight.innerProdWith(sNormal);
      if (backLightIndicator <= 0) {
        // light is in the back side of the face
        // or, light ray is parallel
        // Do nothing.
      } else {
        const brightnessChunk =
          light.intensity *
          hitPointToLight.unitVector().innerProdWith(geometry.normal);
        brightnessAccumulated += brightnessChunk;
      }
    });
    const brightness = brightnessAccumulated / lights.length;
    const { r, g, b } = geometry.material.diffuse;

    const outR = parseInt(brightness * r);
    const outG = parseInt(brightness * g);
    const outB = parseInt(brightness * b);

    return `rgb(${outR}, ${outG}, ${outB})`;
  }
}

module.exports = BasicShader;
