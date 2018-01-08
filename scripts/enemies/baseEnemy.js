class Enemy {

    constructor(x, y, type) {
        this.pos        = createVector(x, y);
        this.vel        = createVector(0, 0);
        this.acc        = createVector();
        this.size       = 10;
        this.type       = type || 'base';

        this.ship       = new Ship(this.size, this.type);
        this.speed      = this.ship.speed;
        this.maxSpeed   = this.ship.maxSpeed;
        this.turnSpeed  = this.ship.turnSpeed;
        this.health     = this.ship.health;
        this.fireRate   = this.ship.fireRate;

        this.heading    = 0;
        this.rotation   = 0;

        this.isAlive    = true;
        this.isMoving   = false;
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
        this.offscreen();

        if (this.health <= 0 && !this.god) {
            this.health = 0;
            this.isAlive = false;
        }

        this.turn();

        this.vel.mult(0.99);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    applyForce(force) {
        let f = p5.Vector.fromAngle(force);
        f.mult(0.1);
        this.acc.add(f);
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