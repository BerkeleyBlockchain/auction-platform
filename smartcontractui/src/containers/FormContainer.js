import React, {Component} from 'react';
import SingleInput from '../components/SingleInput';


class FormContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			thing1 : '',
			thing2 : '',
			thing3 : '',
			thing4 : ''
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
		this.handleThing1 = this.handleThing1.bind(this);
		this.handleThing2 = this.handleThing2.bind(this);
		this.handleThing3 = this.handleThing3.bind(this);
		this.handleThing4 = this.handleThing4.bind(this);
	}

	componentDidMount() {
	
	}

	handleThing1(e) {
		this.setState({ thing1: e.target.value }, () => console.log('name:', this.state.thing1));
	}

	handleThing2(e) {
		this.setState({ thing2: e.target.value }, () => console.log('name:', this.state.thing2));
	}

	handleThing3(e) {
		this.setState({ thing3: e.target.value }, () => console.log('name:', this.state.thing3));
	}

	handleThing4(e) {
		this.setState({ thing4: e.target.value }, () => console.log('name:', this.state.thing4));
	}

	handleClearForm(e) {
		e.preventDefault();
		this.setState({
			thing1: '',
			thing2: '',
			thing3: '',
			thing4: ''
		});
	}
	handleFormSubmit(e) {
		e.preventDefault();
		// This is where you would call the web3 functions to make a new contract
		//Get this shit done before sunday
		const formPayload = {
			thing1: this.state.thing1,
			thing2: this.state.thing2,
			thing3: this.state.thing3,
			thing4: this.state.thing4
		};

		console.log('Send this in a POST request:', formPayload);
		this.handleClearForm(e);
	}
	render() {
		return (
			<form className="container" onSubmit={this.handleFormSubmit}>
				<h5>Contract Creation Form</h5>
				<SingleInput
					inputType={'text'}
					title={'Thing 1'}
					name={'name'}
					controlFunc={this.handleThing1}
					content={this.state.thing1}
					placeholder={'Thing 1'} />
				<SingleInput
					inputType={'text'}
					title={'Thing 2'}
					name={'name'}
					controlFunc={this.handleThing2}
					content={this.state.thing2}
					placeholder={'Thing 2'} />
				<SingleInput
					inputType={'text'}
					title={'Thing 3'}
					name={'name'}
					controlFunc={this.handleThing3}
					content={this.state.thing3}
					placeholder={'Thing 3'} />
				<SingleInput
					inputType={'text'}
					title={'Thing 4'}
					name={'name'}
					controlFunc={this.handleThing4}
					content={this.state.thing4}
					placeholder={'Thing 4'} />
				<input
					type="submit"
					className="btn btn-primary float-right"
					value="Submit"/>
				<button
					className="btn btn-link float-left"
					onClick={this.handleClearForm}>Clear form</button>
			</form>
		);
	}
}

export default FormContainer;
