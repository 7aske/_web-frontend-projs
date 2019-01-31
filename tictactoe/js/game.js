let game;
class Game {
	constructor(player = 1, computer = 2) {
		this.board = {
			one: null,
			two: null,
			three: null,
			four: null,
			five: null,
			six: null,
			seven: null,
			eight: null,
			nine: null
		};
		this.pl = player;
		this.ai = computer;
		this.current = 1;
		this.fields = document.querySelectorAll('.field');
		this.fields.forEach(field => {
			field.addEventListener('click', event => {
				if (event.target.innerText == '') {
					this.click(event.target.id);
				}
			});
		});
		if (this.ai == this.current) {
			this.click(this.aiTurn());
		}
	}
	reset() {
		this.current = 1;
		this.board = {
			one: null,
			two: null,
			three: null,
			four: null,
			five: null,
			six: null,
			seven: null,
			eight: null,
			nine: null
		};
		this.fields.forEach(field => {
			field.innerText = '';
		});
		if (this.ai == this.current) {
			this.click(this.aiTurn());
		}
	}
	checkWin(board) {
		// 0 = draw
		// 1 = player wins
		// 2 = ai wins
		// -1 = game in progress
		let draw =
			this.board.one != null &&
			this.board.two != null &&
			this.board.three != null &&
			this.board.four != null &&
			this.board.five != null &&
			this.board.six != null &&
			this.board.seven != null &&
			this.board.eight != null &&
			this.board.nine != null;
		if (
			this.board.one == this.board.two &&
			this.board.two == this.board.three &&
			this.board.two != null
		) {
			return this.board.two;
		} else if (
			this.board.four == this.board.five &&
			this.board.five == this.board.six &&
			this.board.five != null
		) {
			return this.board.five;
		} else if (
			this.board.seven == this.board.eight &&
			this.board.eight == this.board.nine &&
			this.board.eight != null
		) {
			return board.eight;
		} else if (
			this.board.one == this.board.four &&
			this.board.four == this.board.seven &&
			this.board.four != null
		) {
			return this.board.four;
		} else if (
			this.board.two == this.board.five &&
			this.board.five == this.board.eight &&
			this.board.five != null
		) {
			return board.five;
		} else if (
			this.board.three == this.board.six &&
			this.board.six == this.board.nine &&
			this.board.six != null
		) {
			return this.board.six;
		} else if (
			this.board.one == this.board.five &&
			this.board.five == this.board.nine &&
			this.board.five != null
		) {
			return this.board.five;
		} else if (
			this.board.three == this.board.five &&
			this.board.five == this.board.seven &&
			this.board.five != null
		) {
			return this.board.five;
		} else if (draw) {
			return 0;
		} else {
			return -1;
		}
	}
	aiTurn() {
		let aiboard = this.board;
		let choice;
		let scores = {
			one: 1,
			two: 1,
			three: 1,
			four: 1,
			five: 1,
			six: 1,
			seven: 1,
			eight: 1,
			nine: 1
		};
		let lose = 700;
		let win = 1000;
		function legalMoves() {
			let array = [];
			for (let key in aiboard) {
				if (aiboard[key] == null) {
					array.push(key);
				}
			}
			return array;
		}
		let lm1 = legalMoves();
		lm1.forEach(field => {
			aiboard[field] = this.pl;
			if (this.checkWin(aiboard) == this.pl) {
				scores[field] += lose;
			}
			aiboard[field] = this.ai;
			if (this.checkWin(aiboard) == this.ai) {
				scores[field] += +Infinity;
			}
			let lm2 = legalMoves();
			lm2.forEach(field => {
				aiboard[field] = this.pl;
				if (this.checkWin(aiboard) == this.pl) {
					scores[field] += lose;
				}
				aiboard[field] = this.ai;
				if (this.checkWin(aiboard) == this.ai) {
					scores[field] += win;
				}
				let lm3 = legalMoves();
				lm3.forEach(field => {
					aiboard[field] = this.pl;
					if (this.checkWin(aiboard) == this.pl) {
						scores[field] += lose;
					}
					aiboard[field] = this.ai;
					if (this.checkWin(aiboard) == this.ai) {
						scores[field] += win;
					}
					let lm4 = legalMoves();
					lm4.forEach(field => {
						aiboard[field] = this.pl;
						if (this.checkWin(aiboard) == this.pl) {
							scores[field] += lose;
						}
						aiboard[field] = this.ai;
						if (this.checkWin(aiboard) == this.ai) {
							scores[field] += win;
						}
						let lm5 = legalMoves();
						lm5.forEach(field => {
							aiboard[field] = this.pl;
							if (this.checkWin(aiboard) == this.pl) {
								scores[field] += lose;
							}
							aiboard[field] = this.ai;
							if (this.checkWin(aiboard) == this.ai) {
								scores[field] += win;
							}
							let lm6 = legalMoves();
							lm6.forEach(field => {
								aiboard[field] = this.pl;
								if (this.checkWin(aiboard) == this.pl) {
									scores[field] += lose;
								}
								aiboard[field] = this.ai;
								if (this.checkWin(aiboard) == this.ai) {
									scores[field] += win;
								}
								aiboard[field] = null;
							});
							aiboard[field] = null;
						});
						aiboard[field] = null;
					});
					aiboard[field] = null;
				});
				aiboard[field] = null;
			});
			aiboard[field] = null;
		});
		console.table(scores);
		let highscore = 0;
		for (let score in scores) {
			if (scores[score] > highscore) {
				highscore = scores[score];
				choice = score;
			}
		}
		console.log(choice);
		return choice;
	}
	click(field) {
		this.board[field] = this.current;
		this.current = this.current == this.pl ? this.ai : this.pl;
		for (let key in this.board) {
			if (this.board[key] == 1) {
				document.getElementById(key).innerText = 'X';
			}
			if (this.board[key] == 2) {
				document.getElementById(key).innerText = 'O';
			}
		}
		switch (this.checkWin(this.board)) {
			case 1:
				modal.innerText = this.pl == 1 ? 'You win' : 'Computer wins';
				modal.style.filter = 'opacity(1)';
				setTimeout(() => {
					modal.style.filter = 'opacity(0)';
					this.reset();
				}, 1500);
				break;
			case 2:
				//alert('O wins!');
				modal.innerText = this.pl == 2 ? 'You win' : 'Computer wins';
				modal.style.filter = 'opacity(1)';
				setTimeout(() => {
					modal.style.filter = 'opacity(0)';
					this.reset();
				}, 1500);
				break;
			case 0:
				//alert('Draw!');
				modal.innerText = 'Draw';
				modal.style.filter = 'opacity(1)';
				setTimeout(() => {
					modal.style.filter = 'opacity(0)';
					this.reset();
				}, 1500);

				break;
			case -1:
				if (this.current == this.ai) {
					this.click(this.aiTurn());
				}
				break;
		}
	}
}

document.getElementById('x').addEventListener('click', event => {
	if (game == null || game == undefined) {
		game = new Game(1, 2);
	} else {
		game.pl = 1;
		game.ai = 2;
		game.reset();
	}
});
document.getElementById('o').addEventListener('click', event => {
	if (game == null || game == undefined) {
		game = new Game(2, 1);
	} else {
		game.pl = 2;
		game.ai = 1;
		game.reset();
	}
});
document.getElementById('reset').addEventListener('click', () => {
	game.reset();
});
let modal = document.getElementById('modal');
