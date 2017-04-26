import React, {Component} from "react";
import SingleInput from "../components/SingleInput";
// import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';
import {client} from "../components/Requests";

var timestamp = require('time-stamp');

class BiddingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cId: '',
            supplier: '',
            price: '',
            time: ''
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handlecId = this.handlecId.bind(this);
        this.handlesupplier = this.handlesupplier.bind(this);
        this.handleprice = this.handleprice.bind(this);
        this.handletime = this.handletime.bind(this);
    }

    handlecId(e) {
        this.setState({cId: e.target.value}, () => console.log('name:', this.state.cId));
    }

    handlesupplier(e) {
        this.setState({supplier: e.target.value}, () => console.log('name:', this.state.supplier));
    }

    handleprice(e) {
        this.setState({price: e.target.value}, () => console.log('name:', this.state.price));
    }

    handletime(e) {
        this.setState({time: e.target.value}, () => console.log('name:', this.state.time));
    }

    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            cId: '',
            supplier: '',
            price: '',
            time: ''
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        // This is where you would call the web3 functions to make a new contract
        //Get this shit done before sunday

        const formPayload = {
            cId: this.state.cId,
            supplier: this.state.supplier,
            price: this.state.price,
            time: this.state.time,
            date: timestamp()
        };

        // uint cid, bytes32 _supplier, uint _price, uint _bidTime
        //smartContract.bid.sendTransaction(formPayload.cId, formPayload.supplier, formPayload.price, formPayload.time, {from: ETHEREUM_CLIENT.eth.accounts[1], gas: 200000});

        console.log('Send this in a POST request:', formPayload);
        client.post('bids/', formPayload, function (err, res, body) {
            return console.log(body, res);
        });
        this.handleClearForm(e);
        //window.location.reload();
    }

    render() {
        return (
            <form className="container" onSubmit={this.handleFormSubmit}>
                <h5 className="bloo">Bid Form</h5>
                <table cellSpacing="10" cellPadding="10">
                    <tbody>
                    <tr>

                        <td><label className="form-label">Contract Id</label></td>

                        <td><SingleInput
                            className="inputField"
                            inputType={'number'}
                            title={'Contract ID		'}
                            name={'name'}
                            controlFunc={this.handlecId}
                            content={this.state.cId}
                            placeholder={'Contract Id'}/>
                        </td>
                    </tr>

                    <tr>

                        <td><label className="form-label">Supplier</label></td>

                        <td><SingleInput
                            className="inputfield"
                            inputType={'text'}
                            title={'Supplier   '}
                            name={'name'}
                            controlFunc={this.handlesupplier}
                            content={this.state.supplier}
                            placeholder={'Supplier'}/>
                        </td>
                    </tr>
                    <tr>

                        <td><label className="form-label">Target Price</label></td>

                        <td><SingleInput
                            className="inputfield"
                            inputType={'text'}
                            title={'Target Price   '}
                            name={'name'}
                            controlFunc={this.handleprice}
                            content={this.state.price}
                            placeholder={'Target Price'}/>
                        </td>
                    </tr>
                    <tr>

                        <td><label className="form-label">Target Time</label></td>

                        <td><SingleInput
                            className="inputfield"
                            inputType={'text'}
                            title={'Target Time   '}
                            name={'name'}
                            controlFunc={this.handletime}
                            content={this.state.time}
                            placeholder={'Target Time'}/>
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
export default BiddingForm;
