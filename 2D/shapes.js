class Shapes {
    constructor({ x, y, rotation = 0, alignment = "centre" }) {
        this.x = x;
        this.y = y;
        this.rotation = rotation; // In degrees
        this.alignment = alignment;
    }

    rotateDegrees(deg) {
        this.rotation += deg;
    }

    rotateRadians(rad) {
        this.rotation += rad * 180 / Math.PI;
    }

    translate(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    reflectX() {
        this.rotation = -this.rotation;
    }

    reflectY() {
        this.rotation = 180 - this.rotation;
    }

    toJSON() {
        return {
            x: this.x,
            y: this.y,
            rotation: this.rotation,
            alignment: this.alignment
        };
    }
}

class Rectangle extends Shapes {
    constructor({ x, y, width, height, rotation = 0, alignment = "centre" }) {
        super({ x, y, rotation, alignment });
        this.width = width;
        this.height = height;
    }

    vertices() {
        const w = this.width;
        const h = this.height;
    
        switch (this.alignment) {
            case "top-left":
                return [
                    [0, 0],
                    [w, 0],
                    [w, h],
                    [0, h]
                ];
            case "top-right":
                return [
                    [0, 0],
                    [-w, 0],
                    [-w, h],
                    [0, h]
                ];
            case "bottom-left":
                return [
                    [0, 0],
                    [w, 0],
                    [w, -h],
                    [0, -h]
                ];
            case "bottom-right":
                return [
                    [0, 0],
                    [-w, 0],
                    [-w, -h],
                    [0, -h]
                ];
            case "centre":
            case "center":
                return [
                    [-w / 2, -h / 2],
                    [ w / 2, -h / 2],
                    [ w / 2,  h / 2],
                    [-w / 2,  h / 2]
                ];
            default:
                throw new Error("Invalid alignment in Rectangle.vertices");
        }
    }

    worldVertices() {
        const angle = this.rotation * Math.PI / 180;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
    
        return this.vertices().map(([lx, ly]) => {
            // Rotate local vertex
            const rx = lx * cos - ly * sin;
            const ry = lx * sin + ly * cos;
    
            // Translate to world position
            return [this.x + rx, this.y + ry];
        });
    } 

    area() {
        return this.width * this.height;
    }

    perimeter() {
        return this.width * 2 + this.height * 2;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            width: this.width,
            height: this.height
        };
    }
}

class Circle extends Shapes {
    #_radius;
    constructor({ x, y, radius, rotation = 0, alignment = "centre" }) {
        super({ x, y, rotation, alignment });
        this.#_radius = radius;

        if (alignment !== "centre" && alignment !== "center") {
            throw new Error("Circles cannot have an alignment other than 'centre'/'center'");
        }
    }

    get diameter() {
        return this.#_radius * 2;
    }

    set diameter(dd) {
        this.#_radius = dd / 2
        return dd;
    }

    get radius() {
        return this.#_radius;
    }

    set radius(dr) {
        this.#_radius = dr;
    }

    area() {
        return Math.PI * this.#_radius * this.#_radius;
    }

    perimeter() {
        return 2 * Math.PI * this.#_radius;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            radius: this.#_radius
        };
    }
}