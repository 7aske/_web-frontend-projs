function Player(player) {
	this.mover;
	this.speed = 10;
	this.plNum = player;
	this.up = false;
	this.down = false;
	this.yPos = 200;
	this.move = function() {
		mover = setInterval(() => {
			if (this.up) {
				if (this.yPos - this.speed >= 0) {
					this.yPos += this.speed * -1;
				}
			}
			if (this.down) {
				if (this.yPos + this.speed <= 400) {
					this.yPos += this.speed;
				}
			}
		}, fps);
	};
	this.init = function() {
		let playerElement = document.createElement('div');
		playerElement.setAttribute('id', `player${player}`);
		board.appendChild(playerElement);
		this.move();
	};
	document.addEventListener('keydown', press);
	document.addEventListener('keyup', release);
}
function Ball() {
	this.mover;
	this.speed = 6;
	this.xSpeed = this.speed;
	this.ySpeed = this.speed;
	this.xPos = Math.random() * 400 + 100;
	this.yPos = Math.random() * 200 + 100;
	this.move = function() {
		mover = setInterval(() => {
			this.xPos += this.xSpeed;
			this.yPos += this.ySpeed;
			this.handleBounce();
			this.handleBatBounce();
		}, fps);
	};
	this.handleBounce = function() {
		if (this.yPos > 460) {
			this.ySpeed = this.speed * -1;
		}
		if (this.yPos < 0) {
			this.ySpeed = this.speed;
		}
		if (this.xPos < 0) {
			this.speed = 0;
			this.xSpeed = this.speed;
			this.ySpeed = this.speed;
			this.reset();
			game.score(2);
		}
		if (this.xPos > 620) {
			this.speed = 0;
			this.xSpeed = this.speed;
			this.ySpeed = this.speed;
			this.reset();
			game.score(1);
		}
	};
	this.handleBatBounce = function() {
		let bouncer = document.elementFromPoint(
			this.xPos + board.offsetLeft + 2 * this.xSpeed + 10,
			this.yPos + board.offsetTop + 2 * this.ySpeed + 10
		);
		if (bouncer) {
			if (bouncer.id == 'player1') {
				this.xSpeed = this.speed;
			}
			if (bouncer.id == 'player2') {
				this.xSpeed = this.speed * -1;
			}
		}
	};
	this.init = function() {
		let ballElement = document.createElement('div');
		ballElement.setAttribute('id', `ball`);
		board.appendChild(ballElement);
		setTimeout(() => {
			this.move();
		}, 1500);
	};
	this.reset = function() {
		this.xPos = Math.random() * 200 + 100;
		this.yPos = Math.random() * 100 + 100;
		setTimeout(() => {
			this.speed = 6;
			this.xSpeed = this.speed;
			this.ySpeed = this.speed;
		}, 2000);
	};
}
function press(event) {
	if (event.keyCode == 38) {
		player2.up = true;
	}
	if (event.keyCode == 40) {
		player2.down = true;
	}
	if (event.keyCode == 87) {
		player1.up = true;
	}
	if (event.keyCode == 83) {
		player1.down = true;
	}
}
function release(event) {
	if (event.keyCode == 38) {
		player2.up = false;
	}
	if (event.keyCode == 40) {
		player2.down = false;
	}
	if (event.keyCode == 87) {
		player1.up = false;
	}
	if (event.keyCode == 83) {
		player1.down = false;
	}
}
function Game() {
	this.player1Score = 0;
	this.player2Score = 0;
	this.init = function() {
		if (gameProgress != true) {
			gameProgress = true;
			ball = new Ball();
			ball.init();
			player1 = new Player(1);
			player1.init();
			player2 = new Player(2);
			player2.init();
			render = setInterval(() => {
				document.getElementById('player1').style.top = player1.yPos + 'px';
				document.getElementById('player2').style.top = player2.yPos + 'px';
				document.getElementById('ball').style.top = ball.yPos + 'px';
				document.getElementById('ball').style.left = ball.xPos + 'px';
			}, fps);
		}
	};
	this.score = function(player) {
		switch (player) {
			case 1:
				this.player1Score++;
				break;
			case 2:
				this.player2Score++;
				break;
		}
		scoreboard.innerHTML = `Player 1 - ${this.player1Score} : ${
			this.player2Score
		} - Player 2`;
	};
}
let game = new Game();
const fps = 1000 / 60;
let ball, player1, player2, render;
let gameProgress = false;
let board = document.getElementById('board');
let scoreboard = document.getElementById('scoreboard');

document.getElementById('start').addEventListener('click', game.init);
document.getElementById('stop').addEventListener('click', () => {
	location.reload();
});
