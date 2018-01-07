class Enemy {

    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.acc = createVector();
        this.size = 20;
        this.health = 100;

        this.isAlive = true;
    }

    render() {
        if (!gm.paused) {
            this.update();
        }
        
        push();
        fill(map(this.health, 0, 100, 0, 255), 0, 0);
        noStroke();
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, this.size, this.size);
        pop();
    }

    update() {
        if (this.health <= 0) {
            this.isAlive = false;
        }
    }
}