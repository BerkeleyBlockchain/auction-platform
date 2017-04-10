import React, {Component} from 'react';
import SingleInput from '../components/SingleInput';
import '../assets/css/App.css';

// import ContractTable from './ContractTable';
import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';
import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';


class FormContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			thing1 : '',
			thing2 : '',
			thing3 : '',
			thing4 : '',
			thing5 : '',
			selection1 : 'asset',
			selection2 : 'quantity',
			selection3 : 'price',
			selection4 : 'time',
			selection5 : 'extraField1',
			showEf1 : false
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
		this.handleThing1 = this.handleThing1.bind(this);
		this.handleThing2 = this.handleThing2.bind(this);
		this.handleThing3 = this.handleThing3.bind(this);
		this.handleThing4 = this.handleThing4.bind(this);
		this.handleThing5 = this.handleThing5.bind(this);
		this.handleSelection1 = this.handleSelection1.bind(this);
		this.handleSelection2 = this.handleSelection2.bind(this);
		this.handleSelection3 = this.handleSelection3.bind(this);
		this.handleSelection4 = this.handleSelection4.bind(this);
		this.handleSelection5 = this.handleSelection5.bind(this);

		this.handleOpenEf1 = this.handleOpenEf1.bind(this);
    this.handleCloseEf1 = this.handleCloseEf1.bind(this);
	}

	handleSelection1(val) {
		this.setState({ selection1: val }, () => console.log('name:', this.state.selection1));
	}

	handleSelection2(val) {
		this.setState({ selection2: val }, () => console.log('name:', this.state.selection2));
	}

	handleSelection3(val) {
		this.setState({ selection3: val }, () => console.log('name:', this.state.selection3));
	}

	handleSelection4(val) {
		this.setState({ selection4: val }, () => console.log('name:', this.state.selection4));
	}

	handleSelection5(val) {
		this.setState({ selection5: val }, () => console.log('name:', this.state.selection5));
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

	handleThing5(e) {
		this.setState({ thing5: e.target.value }, () => console.log('name:', this.state.thing5));
	}


	handleClearForm(e) {
		e.preventDefault();
		this.setState({
			thing1: '',
			thing2: '',
			thing3: '',
			thing4: '',
			thing5: '',
			selection1 : '',
			selection2 : '',
			selection3 : '',
			selection4 : '',
			selection5 : ''
		});
	}
	handleFormSubmit(e) {
		e.preventDefault();
		// This is where you would call the web3 functions to make a new contract
		const formPayload = {
			thing1: this.state.thing1,
			thing2: this.state.thing2,
			thing3: this.state.thing3,
			thing4: this.state.thing4,
		};
		smartContract.addContract.sendTransaction(formPayload.thing1, formPayload.thing2, formPayload.thing3, formPayload.thing4, {from: ETHEREUM_CLIENT.eth.accounts[0], gas: 200000});

		console.log('Send this in a POST request:', formPayload);
		this.handleClearForm(e);
		//window.location.reload();
	}

	handleOpenEf1 () {
    this.setState({ showEf1: true });
  }

  handleCloseEf1 () {
    this.setState({ showEf1: false });
  }

	handleSubmitEf1 (f) {
		f.preventDefault();
		const formPayload = {
			thing5: this.state.thing5
		};
		smartContract.addField.sendTransaction(0, formPayload.thing5, {from: ETHEREUM_CLIENT.eth.accounts[0], gas: 200000});
		console.log('Send this in a POST request:', formPayload);
		this.handleClearForm(f);
	}

	render() {
		var options = [
		  { value: 'asset', label: 'Asset' },
			{ value: 'quantity', label: 'Quantity' },
			{ value: 'price', label: 'Price' },
			{ value: 'time', label: 'Time to Complete' },
			{ value: 'ef1', label: 'Additional Field' }
		];

		return (
			<form className="container" onSubmit={this.handleFormSubmit}>
				<h5 className="bloo">Contract Creation Form</h5>
				<table cellSpacing="10" cellPadding="10">
					<tbody>
						<tr>

						  <td style={{margin : 10, width: 250}}><Select
										autofocus
										clearable={false}
						        name="form-field-name"
						        value={this.state.selection1}
						        options={options}
						        onChange={this.handleSelection1}
										autosize={true}
						                /></td>

						  <td><SingleInput
						  className="inputField"
						  inputType={'text'}
							title={'Asset Type		'}
						  name={'name'}
						  controlFunc={this.handleThing1}
						  content={this.state.thing1}
						  placeholder={''} />
						  </td>
						</tr>

						<tr>

							<td style={{margin : 10, width: 250}}><Select
 									autofocus
 									clearable={false}
 									name="form-field-name"
 									value={this.state.selection2}
 									options={options}
 									onChange={this.handleSelection2}
 									autosize={true}
 													/></td>

						  <td><SingleInput
						    className="inputfield"
						    inputType={'number'}
						    title={'Quantity   '}
						    name={'name'}
						    controlFunc={this.handleThing2}
						    content={this.state.thing2}
						    placeholder={''} />
						  </td>
						</tr>

						<tr>

							<td style={{margin : 10, width: 250}}><Select
 									 autofocus
 									 clearable={false}
 									 name="form-field-name"
 									 value={this.state.selection3}
 									 options={options}
 									 onChange={this.handleSelection3}
 									 autosize={true}
 													 /></td>


						  <td><SingleInput
						    className="inputfield"
						    inputType={'number'}
						    title={'Target Price   '}
						    name={'name'}
						    controlFunc={this.handleThing3}
						    content={this.state.thing3}
						    placeholder={''} />
						  </td>
						</tr>

						<tr>
							<td style={{margin : 10, width: 250}}><Select
 									 autofocus
 									 clearable={false}
 									 name="form-field-name"
 									 value={this.state.selection4}
 									 options={options}
 									 onChange={this.handleSelection4}
 									 autosize={true}
 													 /></td>

						  <td><SingleInput
						    className="inputfield"
						    inputType={'number'}
								title={'Target Time   '}
						    name={'name'}
						    controlFunc={this.handleThing4}
						    content={this.state.thing4}
						    placeholder={''} />
						  </td>
						</tr>

					</tbody>
				</table>
				<input
					type="submit"
					className="submitButton"
					value="Submit"/>
				<button
					className="submitButton"
					onClick={this.handleClearForm}>Clear</button>
			</form>
		);
	}
}

export default FormContainer;
