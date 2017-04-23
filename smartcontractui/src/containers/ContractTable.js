import React, {Component} from 'react';
import _ from 'lodash';
import '../assets/css/App.css';
import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import ContractModal from './ContractModal';
import AddFieldModal from './AddFieldModal';
import CloseContractModal from './CloseContractModal';
import {client} from '../components/Requests';


class ContractTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
        TableRows: [],
        ef1: [],
        extra: [],
        interval : 0
    };
  }

  componentWillMount() {
    var self = this;
    var TableRows = [];
    client.get('/contracts/', function(err, res, body) {
      if (err == null){
        for(var key in body) {
          TableRows.push ({
            cId: body[key]['cId'],
            asset: body[key]['asset'],
            qty: body[key]['qty'],
            time: body[key]['time'],
            price: body[key]['price'],
            date: Date(key['date']).toString()
          });
        }
        self.setState({TableRows : TableRows});
      }
    });
  }

  render() {
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
    header: 'Date',
    accessor: 'date'
  }/*,{
    header: 'Additional Field',
    accessor: 'extra' // String-based value accessors!
  }*/];
      return (
        <div>
         <h2 className="bloo">Active Contracts</h2>
         <ReactTable
           data={this.state.TableRows}
           columns={columns}
           defaultPageSize={5}
           SubComponent={(row) => {
             return (
                <div className="bloo">
                  Additional Field: {ETHEREUM_CLIENT.toAscii(this.state.ef1[0])}
                </div>
              )
            }}/>
         <CloseContractModal />
         <AddFieldModal/>
         <ContractModal/>
       </div>
      );
  }
}
export default ContractTable;
