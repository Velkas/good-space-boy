class Bullet {

    constructor(pos, angle) {
        this.pos    = createVector(pos.x, pos.y);
        this.vel    = p5.Vector.fromAngle(angle);
        this.maxSpeed = 8;
        this.size   = 1;

    }

    render() {
        this.update();
        
        enemiesCnv.push();
        enemiesCnv.stroke(255, 255, 0, 255);
        enemiesCnv.strokeWeight(this.size);
        enemiesCnv.ellipse(this.pos.x, this.pos.y, this.size);
        enemiesCnv.pop();
    }

    update() {
        this.vel.mult(this.maxSpeed);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
    }

    offscreen() {
        // if (this.pos.x > width || this.pos.x < 0) {
        //   return true;
        // }
        // if (this.pos.y > height || this.pos.y < 0) {
        //   return true;
        // }
        // return false;

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
}