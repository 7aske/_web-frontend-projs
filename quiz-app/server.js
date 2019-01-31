const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const Player = require('./models/Player');

const port = process.env.PORT || 3000;
const dbpass = 'dbpass321';
const url = `mongodb+srv://admin:${dbpass}@cluster0-4shu3.mongodb.net/quiz`;
mongoose
	.connect(url)
	.then(result => {
		console.log('Connected to database');
	})
	.catch(err => {
		console.log(err);
	});
server.use(express.static(__dirname));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.get('/', (req, res) => {
	req.sendFile('index.html');
});
server.get('/leaderboard', (req, res) => {
	res.sendFile(path.join(__dirname, 'leaderboard.html'));
});
server.get('/api/leaderboard', (req, res) => {
	Player.find({})
		.exec()
		.then(players => {
			res.status(200).send(players);
		})
		.catch(err => {
			res.status(400).send('Error');
		});
});
server.post('/api/leaderboard', (req, res) => {
	console.log(req.body);
	const newPlayer = new Player({
		player: req.body.player,
		length: req.body.length,
		points: req.body.points,
		time: req.body.time
	});
	newPlayer
		.save()
		.then(() => {
			res.status(201).send('Saved');
		})
		.catch(err => {
			console.log(err);
		});
});
server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
