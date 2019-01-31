import React, { Component } from 'react';
import RecipeItem from './RecipeItem';

class Recipe extends Component {
	removeRecipe() {
		console.log(this);
		this.props.removeRecipe(this.props.index);
	}
	render() {
		this.ingredients = this.props.recipe.ingredients.map(
			(ingredient, index) => {
				return <RecipeItem key={index} ingredient={ingredient} />;
			}
		);
		return (
			<div className="Recipe text-center">
				<button
					className="btn btn-primary col-lg-11 col-md-11 col-sm-10"
					type="button"
					data-toggle="collapse"
					data-target={'#recipe' + this.props.index}
					aria-expanded="false"
					aria-controls={'recipe' + this.props.index}
				>
					{this.props.recipe.name}
				</button>
				<button
					className="btn btn-danger"
					onClick={this.removeRecipe.bind(this)}
				>
					X
				</button>
				<div className="collapse" id={'recipe' + this.props.index}>
					<ul className="list-group list-group-flush">
						{this.ingredients}
					</ul>
				</div>
			</div>
		);
	}
}

export default Recipe;
