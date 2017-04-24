import React, {Component} from 'react';
import _ from 'lodash';
import '../assets/css/App.css';
import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';
import ReactTable from 'react-table'
import 'react-table/react-table.css'


class ClosedContractTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
        contractId: "",
        asset: "",
        qty: "",
        tPrice: "",
        tTime: "",
        ef1: "",
        extra: "",
        interval : 0
    }
  }
  componentWillMount() {
    var data = smartContract.getClosedContracts()
    this.setState({
      contractId: String(data[0]).split(','),
      asset: String(data[1]).split(','),
      qty: String(data[2]).split(','),
      tPrice: String(data[3]).split(','),
      tTime: String(data[4]).split(','),
      extra: String(data[5]).split(',')
    })
  }

  componentDidMount(){
    setInterval(function() {
        var data = smartContract.getClosedContracts()
        // var info = smartContract.getFieldByContractID(0)
        this.setState({
          contractId: String(data[0]).split(','),
          asset: String(data[1]).split(','),
          qty: String(data[2]).split(','),
          tPrice: String(data[3]).split(','),
          tTime: String(data[4]).split(','),
          extra: String(data[5]).split(','),
          // ef1: String(info).split(','),
          interval: this.state.interval + 1
        })
        // console.log(ETHEREUM_CLIENT.toAscii(this.state.ef1[0]))
        this.render()
    }.bind(this), 5000);
  }

  render() {
    var TableRows = []

    _.each(this.state.contractId, (value, index) => {
      TableRows.push( {
          cId: ETHEREUM_CLIENT.toDecimal(this.state.contractId[index]),
          asset: ETHEREUM_CLIENT.toAscii(this.state.asset[index]),
          qty: ETHEREUM_CLIENT.toDecimal(this.state.qty[index]),
          price: ETHEREUM_CLIENT.toDecimal(this.state.tPrice[index]),
          time : ETHEREUM_CLIENT.toDecimal(this.state.tTime[index]),
          extra : ETHEREUM_CLIENT.toAscii(this.state.extra[index])
      }
        );
    });

    const columns = [{
    header: 'Contract Id',
    accessor: 'cId' // String-based value accessors!
    },{
    header: 'Asset',
    accessor: 'asset' // String-based value accessors!
    },{
    header: 'Quantity',
    accessor: 'qty' // String-based value accessors!
    },{
    header: 'Price',
    accessor: 'price' // String-based value accessors!
    },{
    header: 'Time to Complete',
    accessor: 'time' // String-based value accessors!
    },{
    header: 'Closed By',
    accessor: 'extra' // String-based value accessors!
  }];
      return (
        <div>
         <h2 className="bloo">Closed Contracts</h2>
         <ReactTable
           data={TableRows}
           columns={columns}
           defaultPageSize={5}
          //  SubComponent={(row) => {
          //    return (
          //       <div className="bloo">
          //         Additional Field: {ETHEREUM_CLIENT.toAscii(this.state.ef1[0])}
          //         <br></br>
          //         Additional Field: {ETHEREUM_CLIENT.toAscii(this.state.ef1[1])}
          //       </div>
          //     )
          //   }}
          />
       </div>
      );
  }
}
export default ClosedContractTable;
