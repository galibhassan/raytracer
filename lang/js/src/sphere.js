class Sphere {
    constructor({center, radius, material}){
        this._center = center;
        this._radius = radius;
        this._material = material;
    };
    get type(){return "geometry"}

    get center(){
        return this._center
    }
    get radius(){
        return this._radius
    }
    get material(){
        return this._material;
    }
}

module.exports = Sphere
