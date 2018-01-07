class Player {

    constructor(x, y, type) {
        this.pos        = createVector(x, y);
        this.vel        = createVector(0, 0);
        this.size       = 10;
        this.type       = type || 'base';

        this.ship       = new Ship(this.size, this.type);
        this.speed      = this.ship.speed;
        this.turnSpeed  = this.ship.turnSpeed;
        this.health     = this.ship.health;
        this.fireRate   = this.ship.fireRate;

        this.heading    = 0;
        this.rotation   = 0;

        this.isAlive    = true;
        this.isMoving   = false;
        this.god        = false;
    }

    render() {
        if (!gm.paused) {
            this.update();
        }
        
        push();

        fill(map(this.health, 100, 0, 0, 255), map(this.health, 0, 100, 0, 150), 0);
        stroke(map(this.health, 100, 0, 0, 255), map(this.health, 0, 100, 0, 255), 0);
        strokeWeight(2);

        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);

        beginShape();
        for (let v of this.ship.hull) {
            vertex(v.x, v.y);
        }
        endShape(CLOSE);

        pop();
    }

    update() {
        if (this.health <= 0 && !this.god) {
            this.health = 0;
            this.isAlive = false;
        }

        if (this.god) {
            this.health = 100;
        }

        this.vel.limit(this.speed); 
        this.pos.add(this.vel);
        this.vel.mult(0.99);

        this.offscreen();
        this.turn();
        if (this.isMoving) {
            this.move();
        }
    }

    move() {
        let f = p5.Vector.fromAngle(this.heading);
        f.mult(0.9);
        this.vel.add(f);
    }

    offscreen() {
        if (this.pos.x > width + this.size) {
            this.pos.x = 0 - this.size;
        } else if (this.pos.x < 0 - this.size) {
            this.pos.x = width + this.size;
        }

        if (this.pos.y > height + this.size) {
            this.pos.y = 0 - this.size;
        } else if (this.pos.y < 0 - this.size) {
            this.pos.y = height + this.size;
        }
    }

    setRotation(a) {
        this.rotation = a;
      }
    
    turn() {
        this.heading += this.rotation;
    }
}

class Ship {

    constructor(size, type) {
        this.speed      = 2;
        this.turnSpeed  = 0.05;
        this.health     = 100;
        this.fireRate   = 10;
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