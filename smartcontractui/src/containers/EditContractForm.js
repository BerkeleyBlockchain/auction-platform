import React, {Component} from 'react';
import SingleInput from '../components/SingleInput';
import '../assets/css/App.css';
import {client} from '../components/Requests';
// import ContractTable from './ContractTable';
//import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';
import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';


class EditContractForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cId: '',
            asset: '',
            time: '',
            price: '',
            qty: '',
            extra: '',
            selectionCId: 'cId',
            selection1: 'asset',
            selection2: 'quantity',
            selection3: 'price',
            selection4: 'time',
            selection5: 'extra',
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleAsset = this.handleAsset.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handleprice = this.handleprice.bind(this);
        this.handleQty = this.handleQty.bind(this);
        this.handleExtra = this.handleExtra.bind(this);
        this.handleCId = this.handleCId.bind(this);
        this.handleSelection1 = this.handleSelection1.bind(this);
        this.handleSelection2 = this.handleSelection2.bind(this);
        this.handleSelection3 = this.handleSelection3.bind(this);
        this.handleSelection4 = this.handleSelection4.bind(this);
        this.handleSelection5 = this.handleSelection5.bind(this);
    }

    handleSelectionCId(val) {
        this.setState({selectionCId: val}, () => console.log('name:', this.state.selectionCId));
    }

    handleSelection1(val) {
        this.setState({selection1: val}, () => console.log('name:', this.state.selection1));
    }

    handleSelection2(val) {
        this.setState({selection2: val}, () => console.log('name:', this.state.selection2));
    }

    handleSelection3(val) {
        this.setState({selection3: val}, () => console.log('name:', this.state.selection3));
    }

    handleSelection4(val) {
        this.setState({selection4: val}, () => console.log('name:', this.state.selection4));
    }

    handleSelection5(val) {
        this.setState({selection5: val}, () => console.log('name:', this.state.selection5));
    }

    handleCId(e) {
        this.setState({cId: e.target.value}, () => console.log('name:', this.state.cId));
        client.headers['cId'] = e.target.value;
        var self = this;
        client.get('contractById', function (err, res, body) {
            console.log(body.asset);
            console.log(body.price);
            console.log(body.time);
            console.log(body.qty);
            self.setState({
                asset: body.asset,
                price: body.price,
                time: body.time,
                qty: body.qty
            });
            console.log(self.state);
        });
    }

    handleAsset(e) {
        this.setState({asset: e.target.value}, () => console.log('name:', this.state.asset));
    }

    handleTime(e) {
        this.setState({time: e.target.value}, () => console.log('name:', this.state.time));
    }

    handleprice(e) {
        this.setState({price: e.target.value}, () => console.log('name:', this.state.price));
    }

    handleQty(e) {
        this.setState({qty: e.target.value}, () => console.log('name:', this.state.qty));
    }

    handleExtra(e) {
        this.setState({extra: e.target.value}, () => console.log('name:', this.state.extra));
    }


    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            asset: '',
            time: '',
            price: '',
            qty: '',
            extra: '',
            selection1: '',
            selection2: '',
            selection3: '',
            selection4: '',
            selection5: ''
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        // This is where you would call the web3 functions to make a new contract
        var formPayload = {
            asset: this.state.asset,
            time: this.state.time,
            price: this.state.price,
            qty: this.state.qty,
            date: Date.now(),
            extra: this.state.extra,
            cId: parseInt(this.state.cId, 10)
        }
        //smartContract.addContract.sendTransaction(formPayload.asset, formPayload.time, formPayload.price, formPayload.qty, {from: ETHEREUM_CLIENT.eth.accounts[0], gas: 200000});
        var self = this;
        client.post('/editContract', formPayload, function (err, res, body) {
            client.headers['cId'] = parseInt(self.state.cId, 10);
            client.get('/closeContract', formPayload, function (err, res, body) {
                return console.log(body, res);
            });
        });
        console.log('Send this in a POST request:', formPayload);
        this.handleClearForm(e);
        //window.location.reload();
    }


    render() {
        var options = [
            {value: 'cId', label: 'Contract Id'},
            {value: 'asset', label: 'Asset'},
            {value: 'quantity', label: 'Quantity'},
            {value: 'price', label: 'Price'},
            {value: 'time', label: 'Time to Complete'},
            {value: 'extra', label: 'Additional Field'}
        ];

        return (
            <form className="container" onSubmit={this.handleFormSubmit}>
                <h5 className="bloo">Contract Creation Form</h5>
                <table cellSpacing="10" cellPadding="10">
                    <tbody>
                    <tr>

                        <td style={{margin: 10, width: 250}}><Select
                            autofocus
                            clearable={false}
                            name="form-field-name"
                            value={this.state.selectionCId}
                            options={options}
                            onChange={this.handleSelectionCId}
                            autosize={true}
                        />
                        </td>

                        <td><SingleInput
                            className="inputField"
                            inputType={'number'}
                            title={'Contract Id		'}
                            name={'name'}
                            controlFunc={this.handleCId}
                            content={this.state.cId}
                            placeholder={''}/>
                        </td>
                    </tr>

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
                            inputType={'text'}
                            title={'Asset Type		'}
                            name={'name'}
                            controlFunc={this.handleAsset}
                            content={this.state.asset}
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
                            inputType={'number'}
                            title={'Quantity   '}
                            name={'name'}
                            controlFunc={this.handleTime}
                            content={this.state.time}
                            placeholder={''}/>
                        </td>
                    </tr>

                    <tr>

                        <td style={{margin: 10, width: 250}}><Select
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
                            controlFunc={this.handleprice}
                            content={this.state.price}
                            placeholder={''}/>
                        </td>
                    </tr>

                    <tr>
                        <td style={{margin: 10, width: 250}}><Select
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
                            controlFunc={this.handleQty}
                            content={this.state.qty}
                            placeholder={''}/>
                        </td>
                    </tr>

                    <tr>
                        <td style={{margin: 10, width: 250}}><Select
                            autofocus
                            clearable={false}
                            name="form-field-name"
                            value={this.state.selection5}
                            options={options}
                            onChange={this.handleSelection5}
                            autosize={true}
                        /></td>

                        <td><SingleInput
                            className="inputfield"
                            inputType={'text'}
                            title={'Extra Data   '}
                            name={'name'}
                            controlFunc={this.handleExtra}
                            content={this.state.extra}
                            placeholder={""}/>
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

export default EditContractForm;
