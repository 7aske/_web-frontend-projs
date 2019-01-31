const mongoose = require('mongoose');
const shortid = require('shortid');

const recipeTemplate = new mongoose.Schema(
	{
		_id: {
			type: String,
			default: shortid.generate()
		},
		name: { type: String, required: true },
		ingredients: Array
	},
	{
		collection: 'recipes'
	}
);

module.exports = mongoose.model('Recipe', recipeTemplate);
