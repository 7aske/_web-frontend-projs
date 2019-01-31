let game = document.getElementById('game');
let oX = game.offsetLeft;
let oY = game.offsetTop;
let objects = [];
let actor;
let gravity = -10;
let fps = 1000 / 60;
function collision(obj1, obj2) {
	let lr =
		(obj1.left > obj2.left && obj1.left < obj2.right) ||
		(obj1.right > obj2.left && obj1.right < obj2.right);
	let tb =
		(obj1.top < obj2.bottom && obj1.top > obj2.top) ||
		(obj1.bottom > obj2.top && obj1.bottom < obj2.bottom);

	if (lr && tb) {
		return true;
	} else {
		return false;
	}
}
function allCollision() {
	let result = false;
	objects.forEach(object => {
		if (collision(object, actor)) {
			result = true;
		}
		//console.log(object, result);
	});

	return result;
}
class Block {
	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.element = document.createElement('div');
		this.element.classList.add('block');
		game.appendChild(this.element);
	}
	display() {
		this.element.style.left = this.x + 'px';
		this.element.style.top = this.y + 'px';
		this.element.style.width = this.element.style.height = this.r + 'px';
	}
	get top() {
		return this.y;
	}
	get left() {
		return this.x;
	}
	get right() {
		return this.x + this.r;
	}
	get bottom() {
		return this.y + this.r;
	}
}
class Actor {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.h = 40;
		this.w = 20;
		this.vel = 0;
		this.speed = -5;
		this.jump = true;
		this.element = document.createElement('div');
		this.element.setAttribute('id', 'actor');
		game.appendChild(this.element);
		this.keys = {
			left: false,
			right: false
		};
		document.addEventListener('keydown', event => {
			this.keyDown(event.keyCode);
		});
		document.addEventListener('keyup', event => {
			this.keyUp(event.keyCode);
		});
		this.move();
	}
	keyDown(key) {
		if (key === 38) {
			if (this.jump) {
				this.vel = 20;
			}
		}
		if (key === 37) {
			this.keys.left = true;
		}
		if (key === 39) {
			this.keys.right = true;
		}
	}
	keyUp(key) {
		if (key === 38) {
			this.keys.up = false;
		}
		if (key === 37) {
			this.keys.left = false;
		}
		if (key === 39) {
			this.keys.right = false;
		}
	}
	move() {
		let moving = setInterval(() => {
			let objDown = document.elementFromPoint(
				oX + this.x + this.w / 2,
				oY + this.y + this.h + 1
			);
			let objLeft = document.elementFromPoint(
				oX + this.x - 1,
				oY + this.y + this.h / 4
			);
			let objLeft2 = document.elementFromPoint(
				oX + this.x - 1,
				oY + this.y + this.h / 4 * 3
			);
			let objRight = document.elementFromPoint(
				oX + this.x + this.w + 1,
				oY + this.y + this.h / 4
			);
			let objRight2 = document.elementFromPoint(
				oX + this.x + this.w + 1,
				oY + this.y + this.h / 4 * 3
			);
			let objTop = document.elementFromPoint(
				oX + this.x + this.w / 2,
				oY + this.y - 1
			);
			if (objTop.id != 'game') {
				this.vel = 0;
			}
			if (objDown.id == 'game') {
				this.y -= gravity;
				this.jump = false;
			} else {
				this.jump = true;
			}
			if (this.keys.left) {
				if (objLeft.id == 'game' && objLeft2.id == 'game') {
					this.x += this.speed;
				}
			}
			if (this.keys.right) {
				if (objRight.id == 'game' && objRight2.id == 'game') {
					this.x -= this.speed;
				}
			}
			if (this.vel > 0) {
				this.vel -= 0.5;
				this.y -= this.vel;
			}
		}, fps);
	}
	display() {
		this.element.style.left = this.x + 'px';
		this.element.style.top = this.y + 'px';
		this.element.style.width = this.w + 'px';
		this.element.style.height = this.h + 'px';
	}
	get top() {
		return this.y;
	}
	get left() {
		return this.x;
	}
	get right() {
		return this.x + this.w;
	}
	get bottom() {
		return this.y + this.h;
	}
}
function setup() {
	let r = 20;
	let x = 0;
	let x1 = 100;
	let x2 = 300;
	let x3 = 500;
	let x4 = 100;
	let x5 = 300;
	for (let i = 0; i < game.offsetWidth / 20; i++) {
		let y = game.offsetHeight - r;
		let b = new Block(x, y, r);
		x += r;
		objects.push(b);
	}
	for (let i = 0; i < 3; i++) {
		let y1 = game.offsetHeight - 3 * r;
		let b = new Block(x1, y1, r);
		x1 += r;
		objects.push(b);
	}
	for (let i = 0; i < 5; i++) {
		let y2 = game.offsetHeight - 6 * r;
		let b = new Block(x2, y2, r);
		x2 += r;
		objects.push(b);
	}
	for (let i = 0; i < 7; i++) {
		let y3 = game.offsetHeight - 10 * r;
		let b = new Block(x3, y3, r);
		x3 += r;
		objects.push(b);
	}
	for (let i = 0; i < 4; i++) {
		let y4 = game.offsetHeight - 16 * r;
		let b = new Block(x4, y4, r);
		x4 += r;
		objects.push(b);
	}
	for (let i = 0; i < 4; i++) {
		let y5 = game.offsetHeight - 14 * r;
		let b = new Block(x5, y5, r);
		x5 += r;
		objects.push(b);
	}
	actor = new Actor(30, 200);
}

function render() {
	objects.forEach(object => {
		object.display();
	});
	actor.display();
}

let renderProcess = setInterval(() => {
	render();
}, fps);
setup();
