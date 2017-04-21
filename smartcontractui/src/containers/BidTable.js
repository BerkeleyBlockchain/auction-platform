import React, {Component} from 'react';
import _ from 'lodash';
import '../assets/css/App.css';
import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import BidModal from './BidModal.js';
import GetContractBidsModal from './GetContractBidsModal.js';

class BidTable extends Component {
	constructor(props) {
    super(props)
    this.state = {
        contractId: "",
        suppliers: "",
        prices: "",
        timesToComplete: "",
				interval: 0
    }
  }
  componentWillMount() {
    var data = smartContract.getBids();
    this.setState({
      contractId: String(data[0]).split(','),
      suppliers: String(data[1]).split(','),
      prices: String(data[2]).split(','),
      timesToComplete: String(data[3]).split(',')

    })
  }

	componentDidMount(){
    setInterval(function() {
        var data = smartContract.getBids()
        this.setState({
          contractId: String(data[0]).split(','),
          suppliers: String(data[1]).split(','),
          prices: String(data[2]).split(','),
          timesToComplete: String(data[3]).split(','),
          interval: this.state.interval + 1
        })
        this.render()
    }.bind(this), 5000);
  }

	render() {
    var TableRows = []

    _.each(this.state.contractId, (value, index) => {
      TableRows.push( {
          cId: ETHEREUM_CLIENT.toDecimal(this.state.contractId[index]),
          suppliers: ETHEREUM_CLIENT.toAscii(this.state.suppliers[index]),
          price: ETHEREUM_CLIENT.toDecimal(this.state.prices[index]),
          time : ETHEREUM_CLIENT.toDecimal(this.state.timesToComplete[index])
      }
        );
    });

    const columns = [{
    header: 'Contract Id',
    accessor: 'cId' // String-based value accessors!
    },{
    header: 'Supplier',
    accessor: 'suppliers' // String-based value accessors!
    },{
    header: 'Price',
    accessor: 'price' // String-based value accessors!
    },{
    header: 'Time to Complete',
    accessor: 'time' // String-based value accessors!
  }];
      return (
				<div>
					<h2 className="bloo">Bids</h2>
          <ReactTable data={TableRows} columns={columns} defaultPageSize={5}/>
					<GetContractBidsModal/>
					<BidModal/>
				</div>
      );
  }
}
export default BidTable;
