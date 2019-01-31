const url = new URL(window.location).origin + `/api/leaderboard`;
let request = new Request(url, 'get');
request
	.send()
	.then(result => {
		let leaderboard = document.getElementById('leaderboard');
		console.log(result);
		let response = JSON.parse(result);
		let players = response.sort((a, b) => {
			return a.points < b.points;
		});
		players.forEach((e, i) => {
			leaderboard.innerHTML += `
			<div class="row">
				<div class="col-3 list-group-item text-center">
					${i + 1}. ${e.player}
				</div>
				<div class="col-3 list-group-item text-center">
					${e.length}
				</div>
				<div class="col-3 list-group-item text-center">
					${e.points}
				</div>
				<div class="col-3 list-group-item text-center">
					${e.time}
				</div>
			</div>
			`;
		});
	})
	.catch(err => {
		console.log(err);
	});
