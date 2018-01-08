class Bullet {

    constructor(pos, angle) {
        this.pos    = createVector(pos.x, pos.y);
        this.vel    = p5.Vector.fromAngle(angle);
        this.maxSpeed = 8;
        this.size   = 1;
    }

    render() {
        this.update();
        
        push();
        stroke(255, 255, 0, 255);
        strokeWeight(this.size);
        ellipse(this.pos.x, this.pos.y, this.size);
        pop();
    }

    update() {
        this.vel.mult(this.maxSpeed);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
    }

    offscreen() {
        if (this.pos.x > width || this.pos.x < 0) {
          return true;
        }
        if (this.pos.y > height || this.pos.y < 0) {
          return true;
        }
        return false;
    }
}