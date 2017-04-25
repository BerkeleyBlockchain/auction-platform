import React, {Component} from 'react';
import SingleInput from '../components/SingleInput';
import '../assets/css/App.css';

// import ContractTable from './ContractTable';
import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';
import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';


class AddFieldForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thing1: '',
            thing2: '',
            selection1: 'cid',
            selection2: 'extraField1',
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleThing1 = this.handleThing1.bind(this);
        this.handleThing2 = this.handleThing2.bind(this);
        this.handleSelection1 = this.handleSelection1.bind(this);
        this.handleSelection2 = this.handleSelection2.bind(this);
    }

    handleSelection1(val) {
        this.setState({selection1: val}, () => console.log('name:', this.state.selection1));
    }

    handleSelection2(val) {
        this.setState({selection2: val}, () => console.log('name:', this.state.selection2));
    }

    handleThing1(e) {
        this.setState({thing1: e.target.value}, () => console.log('name:', this.state.thing1));
    }

    handleThing2(e) {
        this.setState({thing2: e.target.value}, () => console.log('name:', this.state.thing2));
    }


    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            thing1: '',
            thing2: '',
            selection1: '',
            selection2: ''
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        // This is where you would call the web3 functions to make a new contract
        const formPayload = {
            thing1: this.state.thing1,
            thing2: this.state.thing2
        };
        smartContract.addField.sendTransaction(formPayload.thing1, formPayload.thing2, {
            from: ETHEREUM_CLIENT.eth.accounts[0],
            gas: 200000
        });

        console.log('Send this in a POST request:', formPayload);
        this.handleClearForm(e);
        //window.location.reload();
    }

    render() {
        var options = [
            {value: 'cid', label: 'ContractId'},
            {value: 'ef1', label: 'Additional Field'}
        ];

        return (
            <form className="container" onSubmit={this.handleFormSubmit}>
                <h5 className="bloo">Additional Field Form</h5>
                <table cellSpacing="10" cellPadding="10">
                    <tbody>
                    <tr>

                        <td style={{margin: 10, width: 250}}><Select
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
                            placeholder={''}/>
                        </td>
                    </tr>

                    <tr>

                        <td style={{margin: 10, width: 250}}><Select
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
                            inputType={'text'}
                            title={'Additional   '}
                            name={'name'}
                            controlFunc={this.handleThing2}
                            content={this.state.thing2}
                            placeholder={''}/>
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
                    onClick={this.handleClearForm}>Clear
                </button>
            </form>
        );
    }
}

export default AddFieldForm;
