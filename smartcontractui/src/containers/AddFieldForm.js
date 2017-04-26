import React, {Component} from "react";
import SingleInput from "../components/SingleInput";
import "../assets/css/App.css";
import "react-select/dist/react-select.css";
import {client} from "../components/Requests";
import ReactTable from "react-table";


class AddFieldForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cId: '',
            data: '',
            selection1: 'cid',
            selection2: 'extraField1',
            field: []
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleThing1 = this.handleThing1.bind(this);
        this.handleThing2 = this.handleThing2.bind(this);
        this.handleSelection1 = this.handleSelection1.bind(this);
        this.handleSelection2 = this.handleSelection2.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }

    handleSelection1(val) {
        this.setState({selection1: val}, () => console.log('name:', this.state.selection1));
    }

    handleSelection2(val) {
        this.setState({selection2: val}, () => console.log('name:', this.state.selection2));
    }

    handleLoad(e) {
        e.preventDefault();
        let self = this;
        let fieldRows = [];
        client.headers['cId'] = this.state.cId;
        client.get('/fields', function(err, res, body){
            if (err === null) {
                for (let key in body) {
                    if (key !== null) {
                        fieldRows.push({
                            cId: body[key]['cId'],
                            extrafield: body[key]['extrafield']
                        });
                    }
                }
                self.setState({field: fieldRows});
            }
        });
    }

    handleThing1(e) {
        this.setState({cId: e.target.value}, () => console.log('name:', this.state.cId));
    }

    handleThing2(e) {
        this.setState({data: e.target.value}, () => console.log('name:', this.state.data));
    }


    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            cId: '',
            data: '',
            selection1: '',
            selection2: ''
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        // This is where you would call the web3 functions to make a new contract
        const formPayload = {
            cId: this.state.cId,
            extrafield: this.state.data
        };

        client.post('/fields', formPayload, function(err, res, body){
            return console.log(body);
        });


        console.log('Send this in a POST request:', formPayload);
        this.handleClearForm(e);
        //window.location.reload();
    }

    render() {
        const columns = [{
            header: 'Id',
            accessor: 'cId' // String-based value accessors!
        }, {
            header: 'Field',
            accessor: 'extrafield' // String-based value accessors!
        }];

        return (
            <form className="container" onSubmit={this.handleFormSubmit}>
                <h5 className="bloo">Additional Field Form</h5>
                <table cellSpacing="10" cellPadding="10">
                    <tbody>
                    <tr>
                        <td style={{margin: 10, width: 250}}><h6 className="bloo">Contract Id</h6></td>

                        <td><SingleInput
                            className="inputField"
                            inputType={'number'}
                            title={'contractId		'}
                            name={'name'}
                            controlFunc={this.handleThing1}
                            content={this.state.cId}
                            placeholder={''}/>
                        </td>

                        <td><button
                            className="submitButton"
                            onClick={this.handleLoad}>Load
                        </button></td>
                    </tr>

                    <tr>

                        <td style={{margin: 10, width: 250}}><h6 className="bloo">Additional Field</h6></td>

                        <td><SingleInput
                            className="inputfield"
                            inputType={'text'}
                            title={'Additional   '}
                            name={'name'}
                            controlFunc={this.handleThing2}
                            content={this.state.data}
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
                <h6 className="bloo">Existing Additional Data</h6>
                <ReactTable
                    data={this.state.field}
                    columns={columns}
                    defaultPageSize={5}/>
            </form>
        );
    }
}

export default AddFieldForm;
