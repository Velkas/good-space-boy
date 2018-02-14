let bgCnv;
let playerCnv;
let uiCnv;
let enemiesCnv;
let player;
let enemies = [];
let bullets = [];
let gm;
let resetBtn;
let fpsBtn;

let startingShip = 'base';

let setFps = 60;
let hq = true;

// debug buttons
let dbgKill;
let dbgGod;
let dbgShip;
let dbgHUp;
let dbgHDown;

function setup() {
	removeElements();
	if (bgCnv) {
		bgCnv.remove(0);
	}

	bgCnv = createCanvas(800, 600);
	playerCnv = createGraphics(800, 600);
	uiCnv = createGraphics(800, 600);
	enemiesCnv = createGraphics(800, 600);
	bgCnv.attribute('id', 'game');
	bgCnv.attribute('style', 'cursor: crosshair');
	frameRate(setFps);

	gm = new GameManager();
	fpsBtn = createCheckbox('High Quality', true);
	resetBtn = createButton('Reset');
	dbgShip = createSelect();
	dbgHDown = createButton('-10');
	dbgKill = createButton('kill');
	dbgGod = createButton('God');
	dbgHUp = createButton('+10');

	dbgShip.option('base');
	dbgShip.option('cruiser');
	dbgShip.option('default');
	dbgShip.changed(function () {
		player = new Player(player.pos.x, player.pos.y, dbgShip.value());
	});

	resetBtn.mousePressed(setup);
	dbgGod.mousePressed(toggleGod);
	fpsBtn.changed(toggleQuality);
	dbgKill.mousePressed(function () {
		player.health = 0;
	});
	dbgHUp.mousePressed(function () {
		player.health += 10
	});
	dbgHDown.mousePressed(function () {
		player.health -= 10
	});

	bullets = [];
	enemies = [];
	player = new Player(width / 2, height / 2);

	gm.addDoms();
}

function input() {
	if (keyIsDown(32)) {
		if (frameCount % player.fireRate == 0) {
			let bullet = new Bullet(player.pos, player.heading + player.rotation);
			bullets.push(bullet);
		}
	}

	if (keyIsDown(UP_ARROW)) {
		player.applyForce(player.heading);
	}

	if (keyIsDown(LEFT_ARROW)) {
		player.setRotation(-player.turnSpeed);
	}

	if (keyIsDown(RIGHT_ARROW)) {
		player.setRotation(player.turnSpeed);
	}

	if (keyIsDown(DOWN_ARROW)) {
		player.applyForce(-player.vel.mult(0.98));
	}

	if (!keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW) ||
		keyIsDown(RIGHT_ARROW) && keyIsDown(LEFT_ARROW)) {
		player.setRotation(0);
	}
}

function draw() {
	bgCnv.background(30);
	playerCnv.background(30, 50);
	enemiesCnv.clear();
	if (!player.god) { playerCnv.clear(); }
	uiCnv.clear();
	


	input();

	if (!gm.paused) {
		// TODO: Pool all bullets at start, reuse bullets
		// or just make ammo a thing
		for (let i = bullets.length - 1; i > 0; i--) {
			if (bullets.length < 200) {
				bullets[i].render();
			} else if (bullets.length >= 200) {
				bullets.splice(i, 1);

			}
		}

		for (let e of enemies) {
			e.render();
		}

		player.render();

		gm.render();

		image(bgCnv, 0, 0);
		image(enemiesCnv, 0, 0);
		image(playerCnv, 0, 0);
		image(uiCnv, 0, 0);

	}
}

function pause() {
	gm.paused = !gm.paused;

	if (gm.paused) {
		bgCnv.attribute('style', 'cursor: default');
	} else {
		bgCnv.attribute('style', 'cursor: crosshair');
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
		case 'b':
			if (!player.bombFired) {
				player.bombFired = true;
			}
			break;
		default:
			break;
	}
}