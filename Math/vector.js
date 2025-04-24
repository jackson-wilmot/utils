class Vector extends Array {
    constructor(...components) {
        super(...components);
    }

    get magnitude() {
        return Math.sqrt(this.reduce((accumulator, component) => accumulator += component ** 2, 0));
    }

    set magnitude(newMagnitude) {
        if (this.magnitude === 0) throw new Error("Vector is a zero vector");
        if (newMagnitude < 0) throw new Error("Magnitude cannot be negative");
        
        let unitVector = this.normalise();
        
        for (let i = 0; i < this.length; i++) {
            this[i] = unitVector[i] * newMagnitude;
        }
    }

    normalise() {
        const magnitude = this.magnitude;
        if (magnitude === 0) throw new Error("Cannot normalise a zero vector");
        return this.map(component => component / magnitude);
    }

    add(vector) {
        if (vector.length !== this.length) throw new Error("Vectors must have the same dimensions");

        return new Vector(...this.map((component, i) => component + vector[i]));
    }

    subtract(vector) {
        if (vector.length !== this.length) throw new Error("Vectors must have the same dimensions");

        return new Vector(...this.map((component, i) => component - vector[i]));
    }

    dotProduct(vector) {
        if (vector.length !== this.length) throw new Error("Vectors must have the same dimensions");
        
        return this.reduce((acc, component, i) => acc + component * vector[i], 0);
    }

    crossProduct(vector) {
        if (this.length !== 3 || vector.length !== 3) {
            throw new Error("Cross product is only defined for 3D vectors");
        }

        const [x1, y1, z1] = this;
        const [x2, y2, z2] = vector;

        return new Vector(
            y1 * z2 - z1 * y2,
            z1 * x2 - x1 * z2,
            x1 * y2 - y1 * x2
        );
    }

    scale(scalar) {
        return new Vector(...this.map(component => component * scalar));
    }

    equals(vector) {
        if (vector.length !== this.length) {
            return false;
        }

        return this.every((component, i) => component === vector[i]);
    }

    // static methods

    static zero(length) {
        return new Vector(...Array(length).fill(0));
    }

    static unit(length) {
        return new Vector(...Array(length).fill(1));
    }
}
