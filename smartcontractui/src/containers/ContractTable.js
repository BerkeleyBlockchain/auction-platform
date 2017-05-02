import React, {Component} from "react";
import "../assets/css/App.css";
import {ETHEREUM_CLIENT, smartContract} from "../components/EthereumSetup";
import "react-table/react-table.css";
import {client} from "../components/Requests";
import {Card, CardHeader, CardTitle,CardActions,
    CardText,CardSubtitle,Button, Toolbar,
    ToolbarRow, Grid, Cell, Display4, Textfield} from 'react-mdc-web';
import 'material-components-web/dist/material-components-web.min.css';
import _ from 'lodash';

class ContractTable extends Component {
    constructor(props) {
        super(props);
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
        let bidRows = [];
        let self = this;
        client.headers['cId'] = e;
        client.get('/bidById', function (err, res, body) {
            if (err === null) {
                for (let key in body) {
                    bidRows.push({
                        supplier: body[key]['supplier'],
                        time: body[key]['time'],
                        price: body[key]['price'],
                        date: body[key]['date']
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
        smartContract.bid.sendTransaction(
            this.state.cId,
            this.state.selectedBid.supplier,
            this.state.selectedBid.price,
            this.state.selectedBid.time,
            {from: ETHEREUM_CLIENT.eth.accounts[0], gas: 200000});

        client.headers['cId'] = this.state.cId;
        client.get('/contractById', function (err, res, body) {
            // console.log(body);
            let qty = parseInt(body.qty, 10);
            let price = parseInt(body.price, 10);
            let time = parseInt(body.time, 10);
            smartContract.addContract.sendTransaction(body.cId, body.asset, qty, price, time, body.extra, {
                from: ETHEREUM_CLIENT.eth.accounts[0],
                gas: 200000
            });
        });

        client.headers['cId'] = this.state.cId;
        client.get('/closeContract', function (err, res, body) {
            return console.log(body)
        });
    }

    handleRefresh() {
        let self = this;
        let TableRows = [];
        client.get('/contracts/', function (err, res, body) {
            if (err === null) {
                for (let key in body) {
                    TableRows.push({
                        cId: body[key]['cId'],
                        asset: body[key]['asset'],
                        qty: body[key]['qty'],
                        time: body[key]['time'],
                        price: body[key]['price'],
                        date: body[key]['date'],
                        extra: body[key]['price']
                    });
                }
                self.setState({TableRows: TableRows});
            }
        });
        this.render();
    }

    render() {

        let self = this;
        let TableRows = [];
        client.get('/contracts/', function (err, res, body) {
            if (err === null) {
                for (let key in body) {
                    TableRows.push({
                        cId: body[key]['cId'],
                        asset: body[key]['asset'],
                        qty: body[key]['qty'],
                        time: body[key]['time'],
                        price: body[key]['price'],
                        date: body[key]['date'],
                        extra: body[key]['price']
                    });
                }
                self.setState({TableRows: TableRows});
            }
        });

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
                <Grid>
                    {this.state.TableRows.map((item) => {
                        return (<Cell col={3}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contract {item.cId}</CardTitle>
                                    <CardSubtitle>{item.asset}</CardSubtitle>
                                </CardHeader>

                                <CardText>
                                    <p>{item.qty} Units</p>
                                    <p>${item.price}</p>
                                    <p>{item.qty} Days</p>
                                    <p>Created on: {item.date}</p>
                                </CardText>

                                <CardActions>
                                    <Button compact primary>Bid</Button>
                                    <Button compact>Edit</Button>
                                    <Button compact>Close</Button>
                                </CardActions>
                            </Card>
                        </Cell>);
                    })}
                </Grid>
            </div>
        );
    }
}
export default ContractTable;
