const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const shortid = require('shortid');
const Recipes = require('./RecipeModel');
router.get('/', (req, res) => {
	res.send('Hello World');
});

router.get('/recipes', (req, res) => {
	Recipes.find({})
		.exec()
		.then(result => res.send(result))
		.catch(err => console.log(err));
});
router.post('/recipes', (req, res) => {
	console.log(req.body);
	const recipe = new Recipes({
		_id: req.body._id,
		name: req.body.name,
		ingredients: req.body.ingredients
	});
	recipe
		.save()
		.then(result => res.sendStatus(201))
		.catch(err => console.log('Error'));
});
router.delete('/recipes', (req, res) => {
	Recipes.findByIdAndRemove({ _id: req.body._id })
		.exec()
		.then(result => console.log(result))
		.catch(err => console.log(err));
});
module.exports = router;
