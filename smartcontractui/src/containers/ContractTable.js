import React, {Component} from 'react';
import Web3 from 'web3';
import _ from 'lodash';
import '../assets/css/App.css';



var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

var smartContractABI = [{"constant":false,"inputs":[{"name":"contractId","type":"uint256"}],"name":"getBids","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"address[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_asset","type":"bytes32"},{"name":"_quantity","type":"uint256"},{"name":"_targetPrice","type":"uint256"},{"name":"_targetTime","type":"uint256"}],"name":"addContract","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"contracts","outputs":[{"name":"contractId","type":"uint256"},{"name":"asset","type":"bytes32"},{"name":"quantity","type":"uint256"},{"name":"targetPrice","type":"uint256"},{"name":"targetTime","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getContracts","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"cid","type":"uint256"},{"name":"_supplier","type":"bytes32"},{"name":"_price","type":"uint256"},{"name":"_bidTime","type":"uint256"}],"name":"bid","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]
var smartContractAddress = '0x142ee72935a7b66633cde625b00f4f78377c2d61'
var smartContract = ETHEREUM_CLIENT.eth.contract(smartContractABI).at(smartContractAddress)

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
