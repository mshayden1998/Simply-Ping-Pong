// Get canvas, set width and height, get context
const canvas = document.querySelector('#game_canvas');
canvas.width = 1280;
canvas.height = 720;
const ctx = canvas.getContext('2d', { alpha: false });

let xTimes = 0;
const xTimeValue = 150;
let message = '';
// Conviniance variables
const canvasWidHalf = canvas.width / 2;
const canvasHeiHalf = canvas.height / 2;
// Ball variables
const ballRadius = 8;
let ballX = canvasWidHalf;
let ballY = canvasHeiHalf;
let xDir = 5;
let yDir = -5;
// Player variables
const playerX = 10;
let playery = canvasHeiHalf;
let playerScore = 0;
// A.I. variables
const aiX = canvas.width - 20;
let aiY = canvasHeiHalf;

function warningMessage() {
	ctx.fillStyle = 'red';
	ctx.font = '22px Tahoma';
	ctx.textAlign = 'center';
	ctx.fillText(message, canvasWidHalf, canvasHeiHalf);
}

function drawBall(x, y) {
	ctx.beginPath();
	ctx.fillStyle = 'white';
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fill();
	ctx.closePath();
}

const txtX = 20;
const txtY = 68;
function drawScore() {
	ctx.fillStyle = 'yellow';
	ctx.font = '64px Tahoma';
	ctx.textAlign = 'left';
	ctx.fillText(playerScore, txtX, txtY);
	ctx.textAlign = 'right';
	ctx.fillText(playerScore, canvas.width - 2*txtX, txtY);
}

function drawFrame() {
	// To clear the frame before draws something
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (xTimes > 0 && message != '') {
		warningMessage();
		xTimes--;
	}

	drawBall(ballX, ballY);

	// To bounce the ball inside the canvas
	if (ballX+xDir > canvas.width-ballRadius || ballX+xDir < ballRadius) {
		xDir = -xDir;
	}
	if (ballY+yDir > canvas.height-ballRadius || ballY+yDir < ballRadius) {
		yDir = -yDir;
	}
	// Corner easter egg
	if (ballX <= (2 + ballRadius) && ballY >= canvas.height - (ballRadius+2)) {
		xTimes = xTimeValue;
		message = 'I SWEAR I SAW IT! AND IT WAS BEAUTIFUL!';
	}
	if (ballX < canvasWidHalf) {
		xTimes = xTimeValue;
		message = 'Left side is the player\'s side';
	}

	// To move the ball every frame
	ballX += xDir;
	ballY += yDir;
	ctx.font = '14px Arial';
	ctx.textAlign = 'left'
	ctx.fillText('x:' + (ballX - ballRadius) + 'y: ' + (ballY - ballRadius), 10, 20)

	drawScore();
}

setInterval(drawFrame, 10);