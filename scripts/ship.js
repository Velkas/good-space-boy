class Ship {

    constructor(size, type) {
        this.speed      = 0.01;
        this.maxSpeed   = 5;
        this.turnSpeed  = 0.05;
        this.health     = 100;
        this.fireRate   = 4;
        this.hull       = this.getHull(size, type);

        return this;
    }

    getHull(size, type) {
        switch (type) {
            case 'base':
                return [
                    createVector(0, -size),
                    createVector(size/2, size),
                    createVector(0, size - size/3),
                    createVector(-size/2, size)
                ];
            case 'cruiser':
                return [
                    createVector(-size, -size),
                    createVector(size, -size),
                    createVector(size, size),
                    createVector(-size, size)
                ];
            default:
                return [
                    createVector(0, -size),
                    createVector(size/2, size),
                    createVector(0, size - size/3),
                    createVector(-size/2, size)
                ];
        }
    }
}