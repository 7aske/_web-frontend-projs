import React, { Component } from 'react';
import Request from './Components/Request';
import Recipe from './Components/Recipe';
import AddRecipe from './Components/AddRecipe';
import './App.css';
const url = new URL(window.location).origin + '/api/recipes';
class App extends Component {
	constructor() {
		super();
		this.recipes = [];
		this.state = {
			recipes: []
		};
	}

	componentWillMount() {
		let request = new Request('get', url, null);
		request
			.send()
			.then(result => {
				let recipes = JSON.parse(result.response);
				this.recipes = recipes;
				this.update();
			})
			.catch(err => console.log(err));
	}
	update() {
		let recipes = this.recipes.map((recipe, index) => {
			return (
				<Recipe
					key={index}
					index={recipe._id}
					recipe={recipe}
					removeRecipe={this.removeRecipe.bind(this)}
				/>
			);
		});
		this.setState({
			recipes: recipes
		});
		console.log(this.state.recipes);
	}
	removeRecipe(index) {
		let obj = this.recipes.find(() => {
			return this.props.index === index;
		});
		this.recipes.splice(this.recipes.indexOf(obj), 1);
		let request = new Request(
			'delete',
			url,
			JSON.stringify({ _id: index }),
			{
				title: 'Content-type',
				content: 'application/json'
			}
		);
		request
			.send()
			.then(result => {})
			.catch(err => console.log(err));
		this.update();
	}
	addRecipe(recipe) {
		this.recipes.push(recipe);
		let request = new Request('post', url, JSON.stringify(recipe), {
			title: 'Content-type',
			content: 'application/json'
		});
		request
			.send()
			.then(result => {
				this.update();
			})
			.catch(err => console.log(err));
	}
	render() {
		return (
			<div>
				<button
					type="button"
					className="btn btn-info AddRecipe"
					data-toggle="modal"
					data-target="#AddRecipe"
				>
					Add recipe
				</button>
				<AddRecipe newRecipe={this.addRecipe.bind(this)} />
				{this.state.recipes}
			</div>
		);
	}
}

export default App;
