class Vector extends Array {
    constructor(...components) {
        super(...components);
    }

    get magnitude() {
        return Math.sqrt(this.reduce((accumulator, component) => accumulator += component ** 2, 0));
    }

    set magnitude(newMagnitude) {
        if (this.magnitude === 0) throw new Error("Cannot set magnitude of Vector: Vector is a zero vector");
        
        let unitVector = this.normalise();
        
        for (let i = 0; i < this.length; i++) {
            this[i] = unitVector[i] * newMagnitude;
        }
    }

    normalise() {
        const magnitude = this.magnitude;
        return this.map(component => component / magnitude);
    }
}
