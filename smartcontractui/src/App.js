import React, { Component } from 'react';
import logo from './assets/img/favicon.png';
import './assets/css/App.css';
import Web3 from 'web3';
import _ from 'lodash';
import './assets/css/telegrafico.ttf';

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

var smartContractABI = [{"constant":false,"inputs":[{"name":"_contractType","type":"bytes32"},{"name":"_owner","type":"bytes32"},{"name":"_supplier","type":"bytes32"},{"name":"_asset","type":"bytes32"},{"name":"_quantity","type":"uint256"}],"name":"addContract","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"contracts","outputs":[{"name":"contractType","type":"bytes32"},{"name":"owner","type":"bytes32"},{"name":"supplier","type":"bytes32"},{"name":"asset","type":"bytes32"},{"name":"quantity","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getContracts","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"}]
var smartContractAddress = '0xf6cd71fa2faa6392229091d3c625dd0bf3c6361c'
var smartContract = ETHEREUM_CLIENT.eth.contract(smartContractABI).at(smartContractAddress)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contractTypes: "",
      owners: "",
      suppliers: "",
      assets: "",
      quantities: "",
    }
  }
  componentWillMount() {
    var data = smartContract.getContracts()
    this.setState({
      contractTypes: String(data[0]).split(','),
      owners: String(data[1]).split(','),
      suppliers: String(data[2]).split(','),
      assets: String(data[3]).split(','),
      quantities: String(data[4]).split(',')

    })
  }

  render() {
    var TableRows = []

    _.each(this.state.contractTypes, (value, index) => {
      TableRows.push(
        <tr>
          <td>{ETHEREUM_CLIENT.toAscii(this.state.contractTypes[index])}</td>
          <td>{ETHEREUM_CLIENT.toAscii(this.state.owners[index])}</td>
          <td>{ETHEREUM_CLIENT.toAscii(this.state.suppliers[index])}</td>
          <td>{ETHEREUM_CLIENT.toAscii(this.state.assets[index])}</td>
          <td>{this.state.quantities[index]}</td>
        </tr>            
        )
    })
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>ACTIVE SMART CONTRACTS</h2>
        </div>
        <div className="leftNavbar"></div>
        <style>{"table{border:1px solid black;}"}</style>
        <div className="Aligner">
          <table>
            <thead>
              <tr>
                <th>Contract Type</th>
                <th>Owner</th>
                <th>Supplier</th>
                <th>Asset</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {TableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
