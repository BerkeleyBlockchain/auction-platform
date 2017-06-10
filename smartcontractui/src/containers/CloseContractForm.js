import React, {Component} from 'react';
import SingleInput from '../components/SingleInput';
import '../assets/css/App.css';

// import ContractTable from './ContractTable';
import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';
import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
import {client} from '../components/Requests';


class CloseContractForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cId: '',
            selection1: 'cid',
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handlecId = this.handlecId.bind(this);
        this.handleSelection1 = this.handleSelection1.bind(this);
    }

    handleSelection1(val) {
        this.setState({selection1: val}, () => console.log('name:', this.state.selection1));
    }

    handlecId(e) {
        this.setState({cId: e.target.value}, () => console.log('name:', this.state.cId));
    }


    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            cId: '',
            asset: '',
            qty: '',
            price: '',
            time: '',
            extra: '',
            selection1: '',
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        // This is where you would call the web3 functions to make a new contract
        var formPayload = {
            cId: this.state.cId,
        };
        // var data = {};
        client.headers['cId'] = formPayload.cId;
        client.get('/contractById', function (err, res, body) {
            // console.log(body);
            var qty = parseInt(body.qty, 10);
            var price = parseInt(body.price, 10);
            var time = parseInt(body.time, 10);

            smartContract.addContract.sendTransaction(body.cId, body.asset, qty, price, time, body.extra, {
                from: ETHEREUM_CLIENT.eth.accounts[0],
                gas: 200000
            });
        });

        client.headers['cId'] = this.state.cId;
        client.get('/closeContract', function (err, res, body) {
            return console.log(body)
        });

        this.handleClearForm(e);
        //window.location.reload();
    }

    render() {
        var options = [
            {value: 'cid', label: 'ContractId'},
        ];

        return (
            <form className="container" onSubmit={this.handleFormSubmit}>
                <h5 className="bloo">Close Contract Form</h5>
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
                            controlFunc={this.handlecId}
                            content={this.state.cId}
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

export default CloseContractForm;
