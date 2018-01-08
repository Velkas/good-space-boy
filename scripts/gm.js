class GameManager {
    
    constructor() {
        this.score      = 0;
        this.gameCount  = 0;
        this.time       = 0;

        this.paused     = false;
        this.showFps    = true;
        this.showScore  = true;
        this.showTime   = true;
    }

    update() {
        if (!this.paused) {
            if (player.isAlive) {
                if (frameCount % setFps === 0) {
                    this.time += 1;
                    if (this.time % 10 === 0) {
                        this.score += 100;
                    }
                }
            }
        }
    }

    render() {
        this.update();

        if (!this.paused && player.isAlive) {
            if (this.showFps)
                this.renderFps();
            if (this.showScore)
                this.renderScore();
            if (this.showTime)
                this.renderTime();
        }
    
        if (this.paused) {
            this.renderPause();
        }

        if (!player.isAlive) {
            this.renderDeath();
            this.renderFinalScore();
        }

        
    }

    renderDeath() {
        push();
        fill(0, 0, 0, 200);
        rect(0, 0, width, height);

        fill(200, 0, 0, 255);
        stroke(0);
        strokeWeight(4);
        textSize(36);
        textAlign(CENTER);
        text('DEAD', width/2, height/2);
        pop();
    }

    renderPause() {
        push();
        fill(0, 0, 0, 150);
        rect(0, 0, width, height);

        fill(255);
        stroke(0);
        strokeWeight(2);
        textSize(36);
        textAlign(CENTER);
        text('PAUSED', width/2, height/2);
        pop();
    }

    renderTime() {
        push();
        fill(0, 0, 0, 150);
        noStroke();
        rect(width/2 - 36, 0, 72, 30);

        fill(255);
        stroke(0);
        strokeWeight(2);
        textAlign(CENTER);
        textSize(24);
        text(this.time, width/2, 24);
        pop();
    }

    renderFps() {
        push();
        fill(0, 0, 0, 150);
        noStroke();
        rect(8, height - 23, 50, 13);

        fill(255);
        stroke(0);
        strokeWeight(2);
        textAlign(LEFT);
        textSize(12);
        let fr = (frameCount % setFps === 0) ? frameRate().toFixed(0) : setFps;
        text('FPS: ' + fr, 10, height - 12);
        pop();
    }

    renderFinalScore() {
        push();
        fill(255);
        stroke(0);
        strokeWeight(4);
        textSize(48);
        textAlign(CENTER);
        text(this.score, width/2, height/2 - 60);
        pop();
    }

    renderScore() {
        push();
        fill(0, 0, 0, 150);
        noStroke();
        rect(8, height - 35, 95, 13);

        fill(255);
        stroke(0);
        strokeWeight(2);
        textAlign(LEFT);
        textSize(12);
        text('SCORE: ' + this.score, 10, height - 24);
        pop();
    }

    addDoms() {
        createP('');
        createDiv('Controls:');
        createDiv('Up         = Accelerate');
        createDiv('Down       = Decelerate');
        createDiv('Left/Right = Turn');
        createDiv('LMB        = fire');
        createDiv('RMB        = use bomb');
        createDiv('P          = pause game');
        createDiv('R          = reset game');
        createDiv('U          = toggle UI');
        createP('Copyright © 2018 Scott McCaffree');
    }
}