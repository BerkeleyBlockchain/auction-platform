import React, {Component} from 'react';
import Web3 from 'web3';
import _ from 'lodash';
import '../assets/css/App.css';
import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';

class ContractTable extends Component {
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
      );
  }
}
export default ContractTable;
