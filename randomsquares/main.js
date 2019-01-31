class Vector {
	constructor(speed) {
		this.x = Math.ceil(Math.random() * speed) - speed / 2;
		this.y = Math.ceil(Math.random() * speed) - speed / 2;
	}
	normalize() {
		this.mag = Math.sqrt(this.x * this.x + this.y * this.y);
		this.x /= this.mag;
		this.y /= this.mag;
		return this;
	}
}
let boxes = [];
class Box {
	constructor(x, y) {
		this.size = Math.floor(Math.random() * 90) + 10;
		this.x = x - this.size / 2;
		this.y = y - this.size / 2;
		this.speed = 1 / this.size * 100;
		this.direction = new Vector(this.speed).normalize();
		console.log(this.direction);
		this.element = document.createElement('div');
		this.element.style.width = this.size + 'px';
		this.element.style.height = this.size + 'px';
		this.element.setAttribute('class', 'box');
		this.element.style.backgroundColor =
			'#' + Math.floor(Math.random() * 16777215).toString(16);
		document.body.appendChild(this.element);
		this.element.addEventListener('mouseover', e => {
			this.element.style.backgroundColor = this.color =
				'#' + Math.floor(Math.random() * 16777215).toString(16);
		});
	}
	get top() {
		return this.element.offsetTop;
	}
	get bot() {
		return this.element.offsetTop + this.size;
	}
	get left() {
		return this.element.offsetLeft;
	}
	get right() {
		return this.element.offsetLeft + this.size;
	}
	checkCol() {
		if (this.y > window.innerHeight - this.size) {
			this.direction.y = -this.direction.y;
			this.element.style.backgroundColor =
				'#' + Math.floor(Math.random() * 16777215).toString(16);
		}
		if (this.x > window.innerWidth - this.size) {
			this.direction.x = -this.direction.x;
			this.element.style.backgroundColor =
				'#' + Math.floor(Math.random() * 16777215).toString(16);
		}
		if (this.y < 0) {
			this.direction.y = -this.direction.y;
			this.element.style.backgroundColor =
				'#' + Math.floor(Math.random() * 16777215).toString(16);
		}
		if (this.x < 0) {
			this.direction.x = -this.direction.x;
			this.element.style.backgroundColor =
				'#' + Math.floor(Math.random() * 16777215).toString(16);
		}
		// if (boxes.length > 1) {
		// 	boxes.forEach(box => {
		// 		let topCollision =
		// 			(this.bot > box.top && this.bot < box.top) ||
		// 			(this.top < box.bot && this.top > box.top);
		// 		let sideCollision =
		// 			(this.right > box.left && this.right < box.right) ||
		// 			(this.left < box.right && this.left > box.left);
		// 		if (topCollision && sideCollision) {
		// 			this.element.style.backgroundColor = '#666666';
		// 			box.element.style.backgroundColor = '#666666';
		// 		} else {
		// 			this.element.style.backgroundColor = this.color;
		// 			box.element.style.backgroundColor = box.color;
		// 		}
		// 	});
		// }
	}
	move() {
		this.x += this.direction.x * this.speed;
		this.y += this.direction.y * this.speed;
		this.checkCol();
		this.element.style.left = this.x + 'px';
		this.element.style.top = this.y + 'px';
	}
}
for (let i = 0; i < 20; i++) {
	boxes.push(
		new Box(
			Math.floor(Math.random() * (window.innerWidth - 250) + 125),
			Math.floor(Math.random() * (window.innerHeight - 250) + 125)
		)
	);
}
document.addEventListener('click', e => {
	boxes.push(new Box(e.clientX, e.clientY));
});
let draw = () => {
	if (boxes.length > 0) {
		boxes.forEach(box => {
			box.move();
		});
	}
};
let render = setInterval(draw, 1000 / 60);
