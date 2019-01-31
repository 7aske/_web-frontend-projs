import React, { Component } from 'react';

class ErrorMsg extends Component {
	constructor() {
		super();
		this.state = {
			errorText: ''
		};
	}
	componentDidMount() {
		this.setState({
			errorText: this.props.errorText
		});
	}
	render() {
		return <div className="alert alert-danger">{this.state.errorText}</div>;
	}
}
export default ErrorMsg;
