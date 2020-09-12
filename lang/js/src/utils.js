const Vec3 = require("./vec3");

const cramersRule3 = (A, B, C, I) => {
  const D =
    A.x * (B.y * C.z - C.y * B.z) +
    B.x * (C.y * A.z - A.y * C.z) +
    C.x * (A.y * B.z - B.y * A.z);
  const Da =
    I.x * (B.y * C.z - C.y * B.z) +
    B.x * (C.y * I.z - I.y * C.z) +
    C.x * (I.y * B.z - B.y * I.z);
  const Db =
    A.x * (I.y * C.z - C.y * I.z) +
    I.x * (C.y * A.z - A.y * C.z) +
    C.x * (A.y * I.z - I.y * A.z);
  const Dc =
    A.x * (B.y * I.z - I.y * B.z) +
    B.x * (I.y * A.z - A.y * C.z) +
    I.x * (A.y * B.z - B.y * A.z);

  return {
    a: Da / D,
    b: Db / D,
    c: Dc / D,
  };
};

module.exports = { cramersRule3 };

// test
