import React, {Component} from 'react';
import Web3 from 'web3';
import _ from 'lodash';
import '../assets/css/App.css';
import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';

class BidTable extends Component {
	constructor(props) {
    super(props)
    this.state = {
        contractId: "",
        suppliers: "",
        prices: "",
        timesToComplete: "",
    }
  }
  componentWillMount() {
    var data = smartContract.getBids(0);
    this.setState({
      contractId: String(data[0]).split(','),
      suppliers: String(data[1]).split(','),
      prices: String(data[2]).split(','),
      timesToComplete: String(data[3]).split(',')

    })
  }

  render() {
    var TableRows = []

    _.each(this.state.contractId, (value, index) => {
      TableRows.push(
        <tr>
          <td>{ETHEREUM_CLIENT.toDecimal(this.state.contractId[index])}</td>
          <td>{ETHEREUM_CLIENT.toAscii(this.state.suppliers[index])}</td>
          <td>{ETHEREUM_CLIENT.toDecimal(this.state.prices[index])}</td>
          <td>{ETHEREUM_CLIENT.toDecimal(this.state.timesToComplete[index])}</td>
        </tr>
        )
    })
	    return (
	    	<table cellSpacing="10" cellPadding="10">
		        <thead>
		          <tr>
                <th>ContractID</th>
		            <th>Supplier</th>
		            <th>Bidding Price</th>
		            <th>Time to Complete</th>
		          </tr>
		        </thead>
		        <tbody>
		          {TableRows}
		        </tbody>
		     </table>
	    );
	}
}
export default BidTable;
