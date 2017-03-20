import React, { Component } from 'react';
import logo from './assets/img/Airbus-PNG-Picture.png';
import './assets/css/App.css';
import Web3 from 'web3';
import _ from 'lodash';
import './assets/css/aispec.ttf';
import FormContainer from './containers/FormContainer';


var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

var smartContractABI = [{"constant":false,"inputs":[{"name":"contractId","type":"uint256"}],"name":"getBids","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"address[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_asset","type":"bytes32"},{"name":"_quantity","type":"uint256"},{"name":"_targetPrice","type":"uint256"},{"name":"_targetTime","type":"uint256"}],"name":"addContract","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"contracts","outputs":[{"name":"contractId","type":"uint256"},{"name":"asset","type":"bytes32"},{"name":"quantity","type":"uint256"},{"name":"targetPrice","type":"uint256"},{"name":"targetTime","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getContracts","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"cid","type":"uint256"},{"name":"_supplier","type":"bytes32"},{"name":"_price","type":"uint256"},{"name":"_bidTime","type":"uint256"}],"name":"bid","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]
var smartContractAddress = '0xd178648ba2b0a5f19b2829569311e201d6b6ef90'
var smartContract = ETHEREUM_CLIENT.eth.contract(smartContractABI).at(smartContractAddress)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        contractId: "",
        asset: "",
        qty: "",
        tPrice: "",
        tTime: "",
    }
  }
  componentWillMount() {
    var data = smartContract.getContracts()
    this.setState({
      contractId: String(data[0]).split(','),
      asset: String(data[1]).split(','),
      qty: String(data[2]).split(','),
      tPrice: String(data[3]).split(','),
      tTime: String(data[4]).split(',')

    })
  }

  render() {
    var TableRows = []

    _.each(this.state.contractId, (value, index) => {
      TableRows.push(
        <tr>
          <td>{ETHEREUM_CLIENT.toDecimal(this.state.contractId[index])}</td>
          <td>{ETHEREUM_CLIENT.toAscii(this.state.asset[index])}</td>
          <td>{ETHEREUM_CLIENT.toDecimal(this.state.qty[index])}</td>
          <td>{ETHEREUM_CLIENT.toDecimal(this.state.tPrice[index])}</td>
          <td>{this.state.tTime[index]}</td>
        </tr>
        )
    })

    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="Aligner">
          <div className="left">
            <div className="formLeft">
              <FormContainer  />
            </div>
          </div>

        <div className="right">
          <div className="formRight">
            <style>{"table{border: 3px solid #ccc; padding: 0 20px 25px 20px; border-radius: 10px;}"}</style>
              <div className="table">
              <table cellSpacing="10" cellPadding="10">
                <thead>
                  <tr>
                    <th>Contract Id</th>
                    <th>Asset</th>
                    <th>Quantity</th>
                    <th>Target Price</th>
                    <th>Target Time</th>
                  </tr>
                </thead>

                <tbody>
                  {TableRows}
                </tbody>
              </table>
             </div>
            </div>
          </div>

        </div>
        </div>
    );
  }
}

export default App;
