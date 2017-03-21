import React, {Component} from 'react';
import SingleInput from '../components/SingleInput';
import Web3 from 'web3';



class BiddingForm extends Component {
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
		var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

		var smartContractABI = [{"constant":false,"inputs":[{"name":"contractId","type":"uint256"}],"name":"getBids","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"address[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_asset","type":"bytes32"},{"name":"_quantity","type":"uint256"},{"name":"_targetPrice","type":"uint256"},{"name":"_targetTime","type":"uint256"}],"name":"addContract","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"contracts","outputs":[{"name":"contractId","type":"uint256"},{"name":"asset","type":"bytes32"},{"name":"quantity","type":"uint256"},{"name":"targetPrice","type":"uint256"},{"name":"targetTime","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getContracts","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"cid","type":"uint256"},{"name":"_supplier","type":"bytes32"},{"name":"_price","type":"uint256"},{"name":"_bidTime","type":"uint256"}],"name":"bid","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]
		var smartContractAddress = '0xd178648ba2b0a5f19b2829569311e201d6b6ef90'
		var smartContract = ETHEREUM_CLIENT.eth.contract(smartContractABI).at(smartContractAddress)

		const formPayload = {
			thing1: this.state.thing1,
			thing2: this.state.thing2,
			thing3: this.state.thing3,
			thing4: this.state.thing4
		};
		smartContract.addContract.sendTransaction(formPayload.thing1, formPayload.thing2, formPayload.thing3, formPayload.thing4, {from: ETHEREUM_CLIENT.eth.accounts[0], gas: 200000});

		console.log('Send this in a POST request:', formPayload);
		this.handleClearForm(e);
		window.location.reload();
	}
	render() {
		return (
			<form className="container" onSubmit={this.handleFormSubmit}>
				<h5>CONTRACT CREATION FORM</h5>
				<p>
				<SingleInput
					className="inputField"
					inputType={'text'}
					title={'Asset   '}
					name={'name'}
					controlFunc={this.handleThing1}
					content={this.state.thing1}
					placeholder={'Asset'} />
				</p>
				<p>
				<SingleInput
					className="inputfield"
					inputType={'number'}
					title={'Quantity   '}
					name={'name'}
					controlFunc={this.handleThing2}
					content={this.state.thing2}
					placeholder={'Quantity'} />
				</p>
				<p>
				<SingleInput
					className="inputfield"
					inputType={'number'}
					title={'Target Price   '}
					name={'name'}
					controlFunc={this.handleThing3}
					content={this.state.thing3}
					placeholder={'Target Price'} />
				</p>
				<p>
				<SingleInput
					className="inputfield"
					inputType={'number'}
					title={'Target Time   '}
					name={'name'}
					controlFunc={this.handleThing4}
					content={this.state.thing4}
					placeholder={'Target Time'} />
				</p>
				<input
					type="submit"
					className="submitButton"
					value="Submit"/>
				<button
					className="clear"
					onClick={this.handleClearForm}>Clear</button>
			</form>
		);
	}
}

export default FormContainer;
