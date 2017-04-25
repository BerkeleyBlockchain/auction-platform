import React, {Component} from 'react';
import _ from 'lodash';
import '../assets/css/App.css';
import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import ContractModal from './ContractModal';
import EditContractModal from './EditContractModal';
import CloseContractModal from './CloseContractModal';
import {client} from '../components/Requests';
import ReactModal from 'react-modal';
import ScrollLock from 'react-scrolllock';
import BidTile from './BidTile';


class ContractTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            TableRows: [],
            BidRows: [],
            cId: -1,
            ef1: [],
            extra: [],
            interval: 0,
            selectedBid: [],
            showBidModal: false
        };
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleOpenBidModal = this.handleOpenBidModal.bind(this);
        this.handleCloseBidModal = this.handleCloseBidModal.bind(this);
        this.handleSelectedBid = this.handleSelectedBid.bind(this);
        this.handleWinner = this.handleWinner.bind(this);
    }

    handleOpenBidModal(e) {
        var bidRows = [];
        var self = this;
        client.headers['cId'] = e;
        client.get('/bidById', function (err, res, body) {
            if (err == null) {
                for (var key in body) {
                    bidRows.push({
                        supplier: body[key]['supplier'],
                        time: body[key]['time'],
                        price: body[key]['price'],
                        date: Date(key['date']).toString()
                    });
                }
                self.setState({
                    BidRows: bidRows,
                    cId: e,
                    showBidModal: true
                });
            }
        });
    }

    handleCloseBidModal() {
        this.setState({showBidModal: false, selectedBid: []});
    }

    handleSelectedBid(e) {
        this.setState({selectedBid: e});
        console.log(e);
    }

    handleWinner(e) {
        smartContract.addBid.sendTransaction(this.state.cId,
            this.state.selectedBid.supplier,
            this.state.selectedBid.price,
            this.state.selectedBid.time,
            {from: ETHEREUM_CLIENT.eth.accounts[0], gas: 200000});
    }

    handleRefresh() {
        var self = this;
        var TableRows = [];
        client.get('/contracts/', function (err, res, body) {
            if (err == null) {
                for (var key in body) {
                    TableRows.push({
                        cId: body[key]['cId'],
                        asset: body[key]['asset'],
                        qty: body[key]['qty'],
                        time: body[key]['time'],
                        price: body[key]['price'],
                        date: Date(key['date']).toString(),
                        extra: body[key]['price']
                    });
                }
                self.setState({TableRows: TableRows});
            }
        });
        this.render();
    }

    componentWillMount() {
        var self = this;
        var TableRows = [];
        client.get('/contracts/', function (err, res, body) {
            if (err == null) {
                for (var key in body) {
                    TableRows.push({
                        cId: body[key]['cId'],
                        asset: body[key]['asset'],
                        qty: body[key]['qty'],
                        time: body[key]['time'],
                        price: body[key]['price'],
                        date: Date(key['date']).toString(),
                        extra: body[key]['price']
                    });
                }
                self.setState({TableRows: TableRows});
            }
        });
    }

    render() {
        const columns = [{
            header: 'Id',
            accessor: 'cId' // String-based value accessors!
        }, {
            header: 'Asset',
            accessor: 'asset' // String-based value accessors!
        }, {
            header: 'Quantity',
            accessor: 'qty' // String-based value accessors!
        }, {
            header: 'Price',
            accessor: 'price' // String-based value accessors!
        }, {
            header: 'Time to Complete',
            accessor: 'time' // String-based value accessors!
        }, {
            header: 'Date',
            accessor: 'date'
        }];
        const bidColumns = [{
            header: 'Supplier',
            accessor: 'supplier' // String-based value accessors!
        }, {
            header: 'Price',
            accessor: 'price' // String-based value accessors!
        }, {
            header: 'Time to Complete',
            accessor: 'time' // String-based value accessors!
        }, {
            header: 'Date',
            accessor: 'date'
        }];
        return (
            <div>
                <h2 className="bloo">Active Contracts</h2>
                <ReactTable
                    getTdProps={(state, rowInfo) => {
                        return {
                            onClick: e => {
                                console.log(rowInfo)
                                this.handleOpenBidModal(rowInfo.rowValues.cId)
                            }
                        }
                    }}
                    data={this.state.TableRows}
                    columns={columns}
                    defaultPageSize={5}
                />
                <ReactModal
                    isOpen={this.state.showBidModal}
                    contentLabel="Bids"
                    className="container">
                    <h2 className="bloo">Bids for Contract {this.state.cId}</h2>
                    <ReactTable
                        getTdProps={(bState, bRowInfo) => {
                            return {
                                onClick: e => {
                                    console.log(bRowInfo)
                                    this.handleSelectedBid(bRowInfo.rowValues)
                                }
                            }
                        }}
                        data={this.state.BidRows}
                        columns={bidColumns}
                        defaultPageSize={5}
                    />
                    <BidTile
                        supplier={this.state.selectedBid.supplier}
                        price={this.state.selectedBid.price}
                        date={this.state.selectedBid.date}
                        time={this.state.selectedBid.time}/>
                    <button className="modalDone" onClick={this.handleWinner}>Confirm Winner</button>
                    <button className="modalDone" onClick={this.handleCloseBidModal}>Done</button>
                    <ScrollLock/>
                </ReactModal>
                <button className="modalDone" onClick={this.handleRefresh}>Refresh Data</button>
                <CloseContractModal />
                <EditContractModal/>
                <ContractModal/>
            </div>
        );
    }
}
export default ContractTable;
