import React, {Component} from 'react';
import _ from 'lodash';
import '../assets/css/App.css';
import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import ReactModal from 'react-modal';
import BidTable from './BidTable';
import ScrollLock from 'react-scrolllock';



class ClosedContractTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
        contractId: "",
        asset: "",
        qty: "",
        tPrice: "",
        tTime: "",
        ef1: [],
        extra: "",
        showBidModal: false,
        cId: "",
        supplier: "",
        time: "",
        price: "",
        interval : 0
    }
    this.handleOpenBidModal = this.handleOpenBidModal.bind(this);
    this.handleCloseBidModal = this.handleCloseBidModal.bind(this);
  }

  handleOpenBidModal () {
    this.setState({ showBidModal: true });
  }

  handleCloseBidModal () {
    this.setState({ showBidModal: false });
  }

  componentWillMount() {
    var data = smartContract.getClosedContracts()
    var bidData = smartContract.getBids()
    this.setState({
      contractId: String(data[0]).split(','),
      asset: String(data[1]).split(','),
      qty: String(data[2]).split(','),
      tPrice: String(data[3]).split(','),
      tTime: String(data[4]).split(','),
      extra: String(data[5]).split(','),
      cId: String(bidData[0]).split(','),
      supplier: String(bidData[1]).split(','),
      time: String(bidData[2]).split(','),
      price: String(bidData[3]).split(',')
    })
  }

  componentDidMount(){
    setInterval(function() {
        var data = smartContract.getClosedContracts()
        var bidData = smartContract.getBids()

        // var info = smartContract.getFieldByContractID(0)
        this.setState({
          contractId: String(data[0]).split(','),
          asset: String(data[1]).split(','),
          qty: String(data[2]).split(','),
          tPrice: String(data[3]).split(','),
          tTime: String(data[4]).split(','),
          extra: String(data[5]).split(','),
          cId: String(bidData[0]).split(','),
          supplier: String(bidData[1]).split(','),
          time: String(bidData[2]).split(','),
          price: String(bidData[3]).split(','),
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

    var bidStuff = []
    _.each(this.state.cId, (value, index) => {
      bidStuff.push( {
          cId: ETHEREUM_CLIENT.toDecimal(this.state.contractId[index]),
          supplier : ETHEREUM_CLIENT.toAscii(this.state.extra[index]),
          time : ETHEREUM_CLIENT.toDecimal(this.state.tTime[index]),
          price: ETHEREUM_CLIENT.toDecimal(this.state.tPrice[index])
          }
      );
    });

    const bidColumns = [{
      header: 'Id',
      accessor: 'cId' // String-based value accessors!
      },{
      header: 'Supplier',
      accessor: 'supplier' // String-based value accessors!
      },{
      header: 'Price',
      accessor: 'price' // String-based value accessors!
      },{
      header: 'Time to Complete',
      accessor: 'time' // String-based value accessors!
    }]
    // var cId = []
    // var supplier = []
    // var price = []
    // var time = []

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
           getTdProps={(state, rowInfo) => {
              return {
                onClick: e => {
                  this.handleOpenBidModal()
                  // console.log('hello: ', this.state.showBidModal)
                  // this.setState({ef1: rowInfo.rowValues})
                  // cId.push(rowInfo.rowValues.cId);
                  // console.log(cId)
                  // console.log('It was in this row:', rowInfo)
                  // console.log('specifics: ', rowInfo.rowValues.cId)
                }
              }
            }}
           data={TableRows}
           columns={columns}
           defaultPageSize={5}

          //  SubComponent={(row,state,rowInfo) => {
          //    return (
          //       <div className="bloo">
          //         {smartContract.getBids(rowInfo.rowValues.cId)}
          //       </div>
          //     )
          //   }}
          />
          <ReactModal
               isOpen={this.state.showBidModal}
               contentLabel="Bid Form"
               className="bloo">
               <ReactTable
                 data={bidStuff}
                 columns={bidColumns}
                 defaultPageSize={5}
                 />
               <button className="modalDone" onClick={this.handleCloseBidModal}>Done</button>
               <ScrollLock />
             </ReactModal>
       </div>
      );
  }
}
export default ClosedContractTable;
