import React, {Component} from 'react';
import _ from 'lodash';
import '../assets/css/App.css';
import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';
import BidRow from '../components/BidRow';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class BidTable extends Component {
	constructor(props) {
    super(props)
    this.state = {
        tableRows : [],
				contractId: "",
				suppliers: "",
				prices: "",
				timesToComplete: "",
		 };
  }

  componentWillMount() {
    var data = smartContract.getBids(this.props.getContractID);
		var TableRows = [];

		this.setState({
      contractId: String(data[0]).split(','),
      suppliers: String(data[1]).split(','),
      prices: String(data[2]).split(','),
      timesToComplete: String(data[3]).split(',')

    });

    _.each(this.state.contractId, (value, index) => {
			TableRows.push({
				contractId: ETHEREUM_CLIENT.toDecimal(this.state.contractId[index]),
        suppliers: ETHEREUM_CLIENT.toAscii(this.state.suppliers[index]),
        prices: ETHEREUM_CLIENT.toDecimal(this.state.prices[index]),
        timesToComplete: ETHEREUM_CLIENT.toDecimal(this.state.timesToComplete[index])
			});
 		});

		this.setState({ tableRows: TableRows});
		console.log(this.state);
  }

  render() {
			console.log(this.state.tableRows);
	    return (
				<BootstrapTable data={this.state.tableRows} striped hover>
				<TableHeaderColumn isKey dataField='contractId'>Contract Id</TableHeaderColumn>
				<TableHeaderColumn dataField='suppliers'>Suppliers</TableHeaderColumn>
        <TableHeaderColumn dataField='prices'>Prices</TableHeaderColumn>
				<TableHeaderColumn dataField='timesToComplete'>Time To Complete</TableHeaderColumn>
			</BootstrapTable>
	    );
	}
}
export default BidTable;
