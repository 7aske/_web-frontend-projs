const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const server = express();
const api = require('./api');

const port = process.env.PORT || 3001;
process.env.DBPASS = 'adminpass123';
const url = `mongodb+srv://admin:${
	process.env.DBPASS
}@cluster0-mcgte.mongodb.net/database`;
mongoose
	.connect(url)
	.then(result => console.log('Connected to database'))
	.catch(err => console.log(err));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use('/api', api);

//server.use(express.static('static'));

server.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(port, () => {
	console.log('Server running on port ' + port);
});
