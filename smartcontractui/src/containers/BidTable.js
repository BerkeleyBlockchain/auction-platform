import React, {Component} from 'react';
import _ from 'lodash';
import '../assets/css/App.css';
import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';
import BidRow from '../components/BidRow';

class BidTable extends Component {
	constructor(props) {
    super(props)
    this.state = {
        contractId: "",
        suppliers: "",
        prices: "",
        timesToComplete: ""
    };
  }

  componentWillMount() {
    var data = smartContract.getBids(this.props.getContractID);
    this.setState({
      contractId: String(data[0]).split(','),
      suppliers: String(data[1]).split(','),
      prices: String(data[2]).split(','),
      timesToComplete: String(data[3]).split(',')
    })
  }

	rows() {
		var TableRows = []

    _.each(this.state.contractId, (value, index) => {
			var input = {
				contractId: ETHEREUM_CLIENT.toDecimal(this.state.contractId[index]),
        suppliers: ETHEREUM_CLIENT.toAscii(this.state.suppliers[index]),
        prices: ETHEREUM_CLIENT.toDecimal(this.state.prices[index]),
        timesToComplete: ETHEREUM_CLIENT.toDecimal(this.state.timesToComplete[index])
			};
			console.log(input);
			return <BidRow contractId={input.contractId} suppliers={input.contractId} prices={input.prices} timesToComplete={input.timesToComplete} />
    });
	}

  render() {

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
							{this.rows()}
		        </tbody>
		     </table>
	    );
	}
}
export default BidTable;
