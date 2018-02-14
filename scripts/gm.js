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
        uiCnv.push();
        uiCnv.fill(0, 0, 0, 200);
        uiCnv.rect(0, 0, width, height);

        uiCnv.fill(200, 0, 0, 255);
        uiCnv.stroke(0);
        uiCnv.strokeWeight(4);
        uiCnv.textSize(36);
        uiCnv.textAlign(CENTER);
        uiCnv.text('DEAD', width/2, height/2);
        uiCnv.pop();
    }

    renderPause() {
        uiCnv.push();
        uiCnv.fill(0, 0, 0, 150);
        uiCnv.rect(0, 0, width, height);

        uiCnv.fill(255);
        uiCnv.stroke(0);
        uiCnv.strokeWeight(2);
        uiCnv.textSize(36);
        uiCnv.textAlign(CENTER);
        uiCnv.text('PAUSED', width/2, height/2);
        uiCnv.pop();
    }

    renderTime() {
        uiCnv.push();
        uiCnv.fill(0, 0, 0, 150);
        uiCnv.noStroke();
        uiCnv.rect(width/2 - 36, 0, 72, 30);

        uiCnv.fill(255);
        uiCnv.stroke(0);
        uiCnv.strokeWeight(2);
        uiCnv.textAlign(CENTER);
        uiCnv.textSize(24);
        uiCnv.text(this.time, width/2, 24);
        uiCnv.pop();
    }

    renderFps() {
        uiCnv.push();
        uiCnv.fill(0, 0, 0, 150);
        uiCnv.noStroke();
        uiCnv.rect(8, height - 23, 50, 13);

        uiCnv.fill(255);
        uiCnv.stroke(0);
        uiCnv.strokeWeight(2);
        uiCnv.textAlign(LEFT);
        uiCnv.textSize(12);
        let fr = (frameCount % setFps === 0) ? frameRate().toFixed(0) : setFps;
        uiCnv.text('FPS: ' + fr, 10, height - 12);
        uiCnv.pop();
    }

    renderFinalScore() {
        uiCnv.push();
        uiCnv.fill(255);
        uiCnv.stroke(0);
        uiCnv.strokeWeight(4);
        uiCnv.textSize(48);
        uiCnv.textAlign(CENTER);
        uiCnv.text(this.score, width/2, height/2 - 60);
        uiCnv.pop();
    }

    renderScore() {
        uiCnv.push();
        uiCnv.fill(0, 0, 0, 150);
        uiCnv.noStroke();
        uiCnv.rect(8, height - 35, 95, 13);

        uiCnv.fill(255);
        uiCnv.stroke(0);
        uiCnv.strokeWeight(2);
        uiCnv.textAlign(LEFT);
        uiCnv.textSize(12);
        uiCnv.text('SCORE: ' + this.score, 10, height - 24);
        uiCnv.pop();
    }

    addDoms() {
        createP('');
        createDiv('Controls:');
        createDiv('Up         = Accelerate');
        createDiv('Down       = Decelerate');
        createDiv('Left/Right = Turn');
        createDiv('Space      = Shoot');
        // createDiv('LMB        = fire');
        // createDiv('RMB        = use bomb');
        createDiv('P          = pause game');
        createDiv('R          = reset game');
        // createDiv('U          = toggle UI');
        createP('Copyright © 2018 Scott McCaffree');
    }
}