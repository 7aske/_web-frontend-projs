import React, { Component } from 'react';
import ErrorMsg from './ErrorMsg';
import shortid from 'shortid';
class AddRecipe extends Component {
	constructor() {
		super();
		this.inputs = [];
		this.ingredientCount = 0;
		this.initialState = {
			name: '',
			ingredients: {},
			inputs: [],
			newRecipe: {},
			errors: []
		};
		this.state = {
			name: '',
			ingredients: {},
			inputs: [],
			newRecipe: {},
			errors: []
		};
	}
	clearErrors() {
		this.setState({
			errors: []
		});
	}
	onChange(e) {
		const state = this.state;
		if (e.target.name === 'name') {
			state.name = e.target.value;
		} else {
			state.ingredients[e.target.name] = e.target.value;
		}

		this.setState(state);
	}
	addIngredient() {
		this.inputs.push(
			<div key={this.ingredientCount}>
				<input
					name={'ingredient' + this.ingredientCount}
					type="text"
					onChange={this.onChange.bind(this)}
					className="form-control d-inline-block mr-2 w-75"
					placeholder="Ingredient"
				/>
				<button
					type="button"
					className="btn btn-danger mb-1"
					onClick={this.removeIngredient.bind(this)}
				>
					X
				</button>
			</div>
		);
		this.ingredientCount++;
		this.setState({ inputs: this.inputs });
	}
	removeIngredient(e) {
		let name = e.target.previousSibling.attributes.name.value;
		let id = name.match(/[0-9]/gi).join('');
		let state = this.state;
		delete state.ingredients[name];
		let obj = state.inputs.find(object => {
			return object.key === id;
		});
		state.inputs.splice(state.inputs.indexOf(obj), 1);
		this.setState(state);
	}
	addRecipe(e) {
		let ingredients = [];
		let name = this.state.name;
		if (name !== '') {
			for (let key in this.state.ingredients) {
				if (this.state.ingredients[key] !== '') {
					ingredients.push(this.state.ingredients[key]);
				}
			}
			if (ingredients.length < 1) {
				this.setState({
					errors: <ErrorMsg errorText="Add at least one ingerdient" />
				});
			} else {
				this.setState(
					{
						newRecipe: {
							_id: shortid.generate(),
							name: name,
							ingredients: ingredients
						}
					},
					() => {
						this.props.newRecipe(this.state.newRecipe);
						this.inputs = [];
						this.setState(this.initialState);
					}
				);
			}
		} else {
			this.setState({
				errors: <ErrorMsg errorText="Name is required" />
			});
		}
		e.preventDefault();
	}
	render() {
		return (
			<div
				className="modal fade"
				id="AddRecipe"
				tabIndex="-1"
				role="dialog"
				aria-hidden="true"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Add recipe</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								onClick={this.clearErrors.bind(this)}
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							{this.state.errors}
							<form
								method="post"
								onSubmit={this.addRecipe.bind(this)}
							>
								<div className="form-group">
									<input
										onChange={this.onChange.bind(this)}
										type="text"
										className="form-control"
										placeholder="Recipe name"
										name="name"
										value={this.state.name}
									/>
								</div>
								<div id="ingredients" className="form-group">
									{this.state.inputs}
								</div>
								<div className="form-group">
									<button
										type="button"
										className="btn btn-info"
										onClick={this.addIngredient.bind(this)}
									>
										Add ingredient
									</button>
								</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-secondary"
										data-dismiss="modal"
										onClick={this.clearErrors.bind(this)}
									>
										Close
									</button>
									<button
										type="submit"
										className="btn btn-primary"
										onClick={this.clearErrors.bind(this)}
									>
										Add recipe
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddRecipe;
