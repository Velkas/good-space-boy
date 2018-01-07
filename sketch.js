let cnv;
let player;
let enemies = [];
let bullets = [];
let gm;
let resetBtn;
let fpsBtn;

let setFps = 60;
let hq = true;

// debug buttons
let dbgKill;
let dbgGod;
let dbgShip;

function setup() {
	removeElements();
	if (cnv) {
		cnv.remove(0);
	}

	cnv = createCanvas(800, 600);
	cnv.attribute('id', 'game');
	cnv.attribute('style', 'cursor: crosshair');
	frameRate(setFps);

	gm = new GameManager();
	fpsBtn 		= createCheckbox('High Quality', true);
	resetBtn 	= createButton('Reset');
	dbgKill 	= createButton('kill')
	dbgGod 		= createButton('God');
	dbgShip		= createSelect();

	dbgShip.option('base');
	dbgShip.option('cruiser');
	dbgShip.changed(function() { player = new Player(player.pos.x, player.pos.y, dbgShip.value()) });

	resetBtn.mousePressed(setup);
	dbgGod.mousePressed(toggleGod);
	fpsBtn.changed(toggleQuality);
	dbgKill.mousePressed(function() { player.health = 0; });

	bullets = [];
	enemies = [];
	player = new Player(width/2, height/2);

	for (let y = 0; y < height/10; y+=10) {
		for (let x = 0; x < width/10; x+=10) {
			let bullet = new Bullet(x, y);
			bullets.push(bullet);
		}
	}

	for (let i = 0; i < 10; i++) {
		enemies.push(new Enemy(i * 20 + 10, i * 20 + 10));
	}

	gm.addDoms();
}

function input() {
	if (keyIsDown(' ')) {
		if (frameRate % setFps === 0) {
			console.log('shoot');
		}
	}

	if (keyIsDown(UP_ARROW)) {
		player.isMoving = true;
	} else {
		player.isMoving = false;
	}

	if (keyIsDown(LEFT_ARROW)) {
		player.setRotation(-player.turnSpeed);
	}
	
	if (keyIsDown(RIGHT_ARROW)) {
		player.setRotation(player.turnSpeed);
	} 
	
	if (!keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW) ||
		keyIsDown(RIGHT_ARROW) && keyIsDown(LEFT_ARROW)) {
		player.setRotation(0);
	}
}

function draw() {
	background(30, 255);

	input();

	if (!gm.paused) {
		for (let b in bullets) {
			if (!bullets[b].offscreen()) {
				bullets[b].render();
			} else {
				bullets.splice(b, 1);
			}
		}
	}

	for (let e in enemies) {
		enemies[e].render();
	}

	player.render();

	gm.render();
}

function pause() {
	gm.paused = !gm.paused;

	if (gm.paused) {
		cnv.attribute('style', 'cursor: default');
	} else {
		cnv.attribute('style', 'cursor: crosshair');
	}
}

function toggleQuality() {
	hq = !hq;
	if (hq) {
		setFps = 60;
	} else {
		setFps = 30;
	}
	frameRate(setFps);
}

function toggleGod() {
	player.god = !player.god;
	if (player.god) {
		dbgKill.attribute('disabled', true);
	} else {
		dbgKill.removeAttribute('disabled');
	}
}

function keyTyped() {
	switch (key) {
		case 'p':
			pause();
			break;
		case 'r':
			setup();
			break;
		default:
			break;
	}
}