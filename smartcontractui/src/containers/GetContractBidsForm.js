import React, {Component} from 'react';
import SingleInput from '../components/SingleInput';
import '../assets/css/App.css';
import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';
// import ContractTable from './ContractTable';
import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

class GetContractBidsForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			thing1 : '',
			selection1 : 'cid'
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
		this.handleThing1 = this.handleThing1.bind(this);
		this.handleSelection1 = this.handleSelection1.bind(this);
	}

	handleSelection1(val) {
		this.setState({ selection1: val }, () => console.log('name:', this.state.selection1));
	}

	handleThing1(e) {
		this.setState({ thing1: e.target.value }, () => console.log('name:', this.state.thing1));
	}


	handleClearForm(e) {
		e.preventDefault();
		this.setState({
			thing1: '',
			selection1 : ''
		});
	}
	handleFormSubmit(e) {
		e.preventDefault();
		// This is where you would call the web3 functions to make a new contract
		const formPayload = {
			thing1: this.state.thing1
		};
		//
		smartContract.setBidTableContractId.sendTransaction(formPayload.thing1, {from: ETHEREUM_CLIENT.eth.accounts[0], gas: 200000});

		console.log('Send this in a POST request:', formPayload);
		this.handleClearForm(e);
		//window.location.reload();
	}

	render() {
		var options = [
		  { value: 'cid', label: 'ContractId' },
		];

		return (
			<form className="container" onSubmit={this.handleFormSubmit}>
				<h5 className="bloo">Select which contract's bids appear in table</h5>
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
						  inputType={'number'}
							title={'contractId		'}
						  name={'name'}
						  controlFunc={this.handleThing1}
						  content={this.state.thing1}
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
export default GetContractBidsForm;
