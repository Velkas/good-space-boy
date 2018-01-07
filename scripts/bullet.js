class Bullet {

    constructor(x, y) {
        this.pos    = createVector(x, y);
        this.vel    = createVector();
        this.acc    = createVector();
        this.maxSpd = 2;
        this.size   = 2;
    }

    render() {
        this.update();
        
        //push();
        stroke(255, 255, 0, 255);
        strokeWeight(this.size * 5);
        ellipse(this.pos.x, this.pos.y, this.size);
        //pop();
    }

    update() {

    }

    offscreen() {
        return (this.pos.y >= height + this.size || 
                this.pos.y <= height - this.size ||
                this.pos.x >= width + this.size || 
                this.pos.x <= width - this.size);
    }
}