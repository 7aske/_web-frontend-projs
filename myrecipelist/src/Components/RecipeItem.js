import React, { Component } from 'react';

class RecipeItem extends Component {
	render() {
		return <li className="list-group-item">{this.props.ingredient}</li>;
	}
}

export default RecipeItem;
