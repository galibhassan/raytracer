class Light {
  constructor({ position, intensity, color }) {
    this._intensity = intensity;
    this._color = color;
    this._position = position;
  }
  get type() {
    return "light";
  }

  get color() {
    return this._color;
  }
  get intensity() {
    return this._intensity;
  }
  get position() {
    return this._position;
  }
}

module.exports = Light;
