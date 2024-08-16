import React, { Component } from 'react';
import './App.css';

export default class Index extends React.Component {
	constructor(props) {
		super(props);

		this.state = { error: null, isLoaded: false, items: [] };
		this.state = {
			selectedTagsBefore: undefined,
			selectedTagsAfter: undefined,
			textIn: undefined,
			textOut: undefined
		};

		this.handleChangeSelectedTagsBefore = this.handleChangeSelectedTagsBefore.bind(this);
		this.handleChangeSelectedTagsAfter = this.handleChangeSelectedTagsAfter.bind(this);
		this.handleChangeTextIn = this.handleChangeTextIn.bind(this);
		this.generateOutput = this.generateOutput.bind(this);
		this.shortCutP = this.shortCutP.bind(this);
		this.shortCutLI = this.shortCutLI.bind(this);

	}

	handleChangeSelectedTagsBefore (event) {
		let tmp = event.target.value;
		this.setState({selectedTagsBefore: tmp});
	}

	handleChangeSelectedTagsAfter (event) {
		let tmp = event.target.value;
		this.setState({selectedTagsAfter: tmp});
	}

	handleChangeTextIn (event) {
		let tmp = event.target.value;
		this.setState({textIn: tmp});
	}

	generateOutput () {
		let str = this.state.textIn;
		let output = "";
		let tmp;
		if (str !== undefined) {
			if (str.length > 0) {
				let arr = [];
				arr = str.split(/\r?\n/);
				let i;
				for (i=0; i<arr.length; i++) {
					tmp = this.state.selectedTagsBefore + arr[i] + this.state.selectedTagsAfter + "\r\n";
					if (arr[i].length > 0) {
						output += tmp;
					}
				}
				this.setState({textOut: output});
			}
		}
	}
	
	shortCutP () {
		let tmpO = "<p>";
		let tmpC = "</p>";
		this.setState({selectedTagsBefore: tmpO, selectedTagsAfter: tmpC});
	}
	
	shortCutLI () {
		let tmpO = "<li>";
		let tmpC = "</li>";
		this.setState({selectedTagsBefore: tmpO, selectedTagsAfter: tmpC});
	}
	
	componentDidMount() {

	}

	render () {
		let error = this.state.error;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else {
			return (
				<div className="App">
					<p>Before:</p>
					<input type="text" onChange={this.handleChangeSelectedTagsBefore} value={this.state.selectedTagsBefore} />
					<p><button onClick={this.shortCutP}>P</button> | <button onClick={this.shortCutLI}>LI</button></p>
					<p>After:</p>
					<input type="text" onChange={this.handleChangeSelectedTagsAfter} value={this.state.selectedTagsAfter} />
					<p>&nbsp;</p>
					<p>Input:</p>
					<textarea onChange={this.handleChangeTextIn} value={this.state.textIn} />
					<p><button onClick={this.generateOutput}>Generate</button></p>
					<p>Output:</p>
					<textarea value={this.state.textOut} />
				</div>
			)
		}
	}
}
