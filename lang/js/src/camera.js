const Vec3 = require("./vec3")

class Camera {
    constructor({ location, rotation, viewportSize, pixelSize }) {
        this._location = location;
        this._rotation = rotation;
        this._viewportWidth = viewportSize.width;
        this._viewportHeight = viewportSize.height;
        this._pixelSize = pixelSize;

        this._pixelateViewPort()
    }

    get viewportWidth() { return this._viewportWidth }
    get viewportHeight() { return this._viewportHeight }
    get pixelWidth() { return this._pixelSize.width }
    get pixelHeight() { return this._pixelSize.height }
    get origin() { return this._location }

    _pixelateViewPort() {
        const { topleft, topright, bottomLeft, bottomRight } = this._getViewPortVertices();
        const viewport = []
        const hMax = parseInt(this.viewportWidth / this.pixelWidth)
        const vMax = parseInt(this.viewportHeight / this.pixelHeight)
        for (let i = 1; i < vMax + 2; i += 2) {
            for (let j = 1; j < hMax + 2; j += 2) {
                let currentPixelMidPoint = new Vec3(
                    topleft.x + j * (1 / 2) * this.pixelWidth,
                    topleft.y - i * (1 / 2) * this.pixelHeight,
                    0
                )

                let indexLeft = parseInt((i-1)/2);
                let indexRight = parseInt((j-1)/2);

                viewport.push(
                    {
                        pixid: `${indexLeft}_${indexRight}`,
                        pixMidPoint: currentPixelMidPoint
                    }
                )
            }
        }
        return viewport;
    }

    _getViewPortVertices() {
        const topleft = new Vec3(
            this.origin.x - (1 / 2) * this.viewportWidth,
            this.origin.y + (1 / 2) * this.viewportHeight,
            0
        );
        const topright = new Vec3(
            this.origin.x + (1 / 2) * this.viewportWidth,
            this.origin.y + (1 / 2) * this.viewportHeight,
            0
        );
        const bottomLeft = new Vec3(
            this.origin.x - (1 / 2) * this.viewportWidth,
            this.origin.y - (1 / 2) * this.viewportHeight,
            0
        );
        const bottomRight = new Vec3(
            this.origin.x + (1 / 2) * this.viewportWidth,
            this.origin.y - (1 / 2) * this.viewportHeight,
            0
        );

        return {
            topleft, topright,
            bottomLeft, bottomRight
        }
    }
}

// test
const camera = new Camera({
    location: new Vec3(0, 0, 0),
    rotation: new Vec3(0, 0, 0),
    viewportSize: { width: 10, height: 10 },
    pixelSize: { width: 5, height: 5 }
})
