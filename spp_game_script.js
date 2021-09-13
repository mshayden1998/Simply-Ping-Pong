// Get canvas, set width and height, get context
const canvas = document.querySelector('#game_canvas');
canvas.width = 1280;
canvas.height = 720;
const ctx = canvas.getContext('2d', { alpha: false });

let upPressed = false;
let downPressed = false;
const txtX = 30;
const txtY = 30;
// Conviniance variables
const canvasWidHalf = canvas.width / 2;
const canvasHeiHalf = canvas.height / 2;
// Ball variables
const ballRadius = 8;
let ballX = canvasWidHalf;
let ballY = canvasHeiHalf;
let xDir = 7;
let yDir = -7;
// Characters variables
const characterWid = 10;
// Player variables
const playerX = 10;
let playerY = canvasHeiHalf;
let playerHei = 50;
let playerScore = 0;
let playerSpd = 5;
// A.I. variables
const aiX = canvas.width - 20;
let aiY = canvasHeiHalf;
let aiHei = 50;
let aiScore = 0;

function drawBall(x, y) {
	ctx.beginPath();
	ctx.fillStyle = 'white';
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fill();
	ctx.closePath();
}

function drawCharacters(color, posX, posY, sizeX, sizeY) {
	ctx.fillStyle = color;
	ctx.fillRect(posX, posY, sizeX, sizeY);
}

function drawScore(color, align, score, txtX) {
	ctx.fillStyle = color;
	ctx.font = '5rem Tahoma';
	ctx.textAlign = align;
	ctx.textBaseline = 'top';
	ctx.fillText(score, txtX, txtY);
}

function drawFrame() {
	// To clear the frame before draws something
	ctx.fillStyle = 'rgb(18, 18, 18)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// To move the player's character
	if (playerY+playerHei > 0 || playerY+playerHei < canvas.height) {
		if (upPressed) {
			playerY -= playerSpd;
		} else
		if (downPressed) {
			playerY += playerSpd;
		}
	}
	// Draw Player
	drawCharacters('#E64621', playerX, playerY, characterWid, playerHei);
	// Draw A.I.
	drawCharacters('#009962', aiX, aiY, characterWid, aiHei);

	drawBall(ballX, ballY);

	// To bounce the ball inside the canvas
	if (ballX+xDir > canvas.width-ballRadius || ballX+xDir < ballRadius) {
		xDir = -xDir;
	}
	if (ballY+yDir > canvas.height-ballRadius || ballY+yDir < ballRadius) {
		yDir = -yDir;
	}
	// To make the ball hit characters
	if (ballY+yDir > playerY-playerHei || ballY+yDir < playerY-playerHei) {
		if (ballX+xDir < playerX+characterWid) {
			xDir = -xDir;
		}
	}

	// To move the ball every frame
	ballX += xDir;
	ballY += yDir;

	drawScore('#E64621', 'left', playerScore, txtX);
	drawScore('#009962', 'right', aiScore, canvas.width - txtX);
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
	if (e.key == 'Up' || e.key == 'ArrowUp') {
		upPressed = true;
	}
	else if (e.key == 'Down' || e.key == 'ArrowDown') {
		downPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.key == 'Up' || e.key == 'ArrowUp') {
		upPressed = false;
	}
	else if (e.key == 'Down' || e.key == 'ArrowDown') {
		downPressed = false;
	}
}

setInterval(drawFrame, 10);