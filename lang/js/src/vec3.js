class Vec3 {
    constructor(e1, e2, e3) {
        this.e1 = e1;
        this.e2 = e2;
        this.e3 = e3;
    }

    get x() { return this.e1 }
    get y() { return this.e2 }
    get z() { return this.e3 }
    get r() { return this.e1 }
    get g() { return this.e2 }
    get b() { return this.e3 }

    norm() {
        return Math.pow(this.e1, 2) + Math.pow(this.e2, 2) + Math.pow(this.e3, 2);
    }

    length() {
        return Math.sqrt(this.norm())
    }

    addWith(otherVec3) {
        return new Vec3(
            this.e1 + otherVec3.e1,
            this.e2 + otherVec3.e2,
            this.e3 + otherVec3.e3,
        )
    }
    subtractFrom(otherVec3) {
        return new Vec3(
            - this.e1 + otherVec3.e1,
            - this.e2 + otherVec3.e2,
            - this.e3 + otherVec3.e3,
        )
    }

    multiplyBy(multiplier) {
        if (typeof multiplier === "number") {
            return new Vec3(
                this.e1 * multiplier,
                this.e2 * multiplier,
                this.e3 * multiplier,
            )
        } else {
            return new Vec3(
                this.e1 * multiplier.e1,
                this.e2 * multiplier.e2,
                this.e3 * multiplier.e3,
            )
        }
    }

    divideBy(divider) {
        if (typeof divider === "number") {
            return new Vec3(
                this.e1 / divider,
                this.e2 / divider,
                this.e3 / divider,
            )
        }
        return new Vec3(
            this.e1 / divider.e1,
            this.e2 / divider.e2,
            this.e3 / divider.e3,
        )
    }

    innerProdWith(otherVec3) {
        return this.e1 * otherVec3.e1
            + this.e2 * otherVec3.e2
            + this.e3 * otherVec3.e3;
    }

    unitVector() {
        return new Vec3(
            this.e1 / this.length(),
            this.e2 / this.length(),
            this.e3 / this.length()
        )
    }

    crossProdWith(otherVec3) {
        return new Vec3(
            this.y * otherVec3.z - this.z * otherVec3.y,
            this.z * otherVec3.x - this.x * otherVec3.z,
            this.x * otherVec3.y - this.y * otherVec3.x
        )
    }

}

module.exports = Vec3;



//test 
// const pos1 = new Vec3(1, 1, 1)
// const pos2 = new Vec3(2, 2, 2)
// const pos3 = new Vec3(1000, 0, 0)

// console.log(pos1.multiplyBy(20))