let game = null;
let nQuestions = 5;
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

class Game {
	constructor(questions, player) {
		this.player = player;
		this.questions = questions;
		this.points = 0;
		this.lastId = -1;
		this.time = 0;
		$('#timer').text(this.timer);
		this.timer = setInterval(() => {
			$('#timer').text(this.time);
			this.time++;
		}, 1000);
	}

	render() {
		$('#currentPlayer').text(this.player);
		let questionsContainer = $('#questions .carousel-inner');
		this.questions.forEach((q, i) => {
			let answers = q.incorrect_answers;
			answers.push(q.correct_answer);
			let output = '';
			let shuffledAnswers = shuffle(answers);
			shuffledAnswers.forEach(a => {
				output += `
					<a href="#questions" onclick="game.handleClick(event)" data-id="${i}" role="button" data-slide="next">
						<li class="list-group-item">${a}</li>
					</a>
				`;
			});
			console.log(output);
			questionsContainer.append(`
				<div class="carousel-item">
					<div class="card text-center">
						<div class="card-header bg-secondary text-light">
						${i + 1}. ${q.question}
						</div>
						<div class="card-body p-5">
							<ul class="list-group">
							${output}
							</ul>
						</div>
						<div class="card-footer text-muted">
							${q.category} | ${q.difficulty}
						</div>
					</div>
				</div>
				`);
		});
		$('.carousel').carousel('pause');
		questionsContainer.append(`
			<div class="carousel-item">
				<div class="card">
					<div class="card-header bg-secondary text-light">
						<h2>End of quiz!</h2>
					</div>
					<div class="card-body">		
						<p>Congratulations <span id="resP"></span> you've achieved
						<span id="resPp"></span> points in <span id="resT"></span> seconds.</p>
					</div>
					<div class="card-footer">
                        <button class="btn btn-secondary" onclick="resetGame()">Play again</button>
                        <a href="leaderboard" class="btn btn-secondary">Leaderboard</a>
					</div>
				</div>
			</div>
		`);
		questionsContainer.children()[0].classList.add('active');
	}
	renderPoints() {
		$('#currentPoints').text(this.points);
	}
	handleClick(e) {
		let answer = e.target.parentElement.innerText;
		let id = e.target.parentElement.attributes['data-id'].value;
		console.log(id);
		if (id == this.questions.length - 1) {
			clearInterval(this.timer);
			let url = new URL(window.location).origin + '/api/leaderboard';
			const player = {
				player: this.player,
				length: this.questions.length,
				time: this.time + 1,
				points: this.points
			};
			console.log(player);
			let request = new Request(url, 'post', JSON.stringify(player), {
				'Content-type': 'application/json'
			});
			request
				.send()
				.then(result => {
					console.log(result);
				})
				.catch(err => {
					console.log(err);
				});
		}
		if (this.questions[id].correct_answer == answer && this.lastId != id) {
			console.log('Correct');
			this.points++;
			this.renderPoints();
			e.target.classList.add('bg-success');
		} else {
			e.target.classList.add('bg-danger');
		}
		$('#resP').text(this.player);
		$('#resPp').text(this.points);
		$('#resT').text(this.time + 1);
		this.lastId = id;
	}
}
function handlePlayerName(e) {
	e.preventDefault();
	let url = `https://opentdb.com/api.php?amount=${nQuestions}`;
	let gameContainer = $('#gameContainer');
	let playerSelect = $('#playerSelect');
	let player = $('#playerName').val();
	$('#errors').text('');
	if (player == '') {
		$('#errors').html(`
		<div class="alert alert-danger" role="alert">
			Name is required!
	  	</div>
		`);
	} else {
		let rq = new Request(url, 'get');
		rq.send()
			.then(result => {
				let response = JSON.parse(result).results;
				gameContainer.removeClass('invisible');
				playerSelect.addClass('invisible');
				game = new Game(response, player);
				game.render();
				console.log(game);
			})
			.catch(err => console.log(err));
	}
}
function resetGame() {
	location.reload();
}
$('.nSelect').on('click', function() {
	$('.nSelect').removeClass('active');
	$(this).addClass('active');
	nQuestions = this.innerText;
});
