class Sphere {
    constructor(center, radius){
        this._center = center;
        this._radius = radius;
    };

    get center(){
        return this._center
    }
    get radius(){
        return this._radius
    }
}

module.exports = Sphere