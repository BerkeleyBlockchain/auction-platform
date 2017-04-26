import React, {Component} from "react";
import _ from "lodash";
import "../assets/css/App.css";
import {ETHEREUM_CLIENT, smartContract} from "../components/EthereumSetup";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ReactModal from "react-modal";
import ScrollLock from "react-scrolllock";


class ClosedContractTable extends Component {
    constructor(props) {
        super(props);
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
            interval: 0
        };
        this.handleOpenBidModal = this.handleOpenBidModal.bind(this);
        this.handleCloseBidModal = this.handleCloseBidModal.bind(this);
    }

    handleOpenBidModal(e) {
        const bidData = smartContract.getBid(e);
        this.setState({
            showBidModal: true,
            cId: String(bidData[0]),
            supplier: ETHEREUM_CLIENT.toAscii(ETHEREUM_CLIENT.toHex(bidData[1])),
            price: String(bidData[2]),
            time: String(bidData[3])
        })
    }

    handleCloseBidModal() {
        this.setState({showBidModal: false});
    }

    componentWillMount() {
        const data = smartContract.getClosedContracts();
        this.setState({
            contractId: String(data[0]).split(','),
            asset: String(data[1]).split(','),
            qty: String(data[2]).split(','),
            tPrice: String(data[3]).split(','),
            tTime: String(data[4]).split(','),
            extra: String(data[5]).split(',')
        })
    }

    componentDidMount() {
        setInterval(function () {
            const data = smartContract.getClosedContracts();
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
            });
            this.render()
        }.bind(this), 5000);
    }

    render() {
        const TableRows = [];

        _.each(this.state.contractId, (value, index) => {
            TableRows.push({
                    cId: ETHEREUM_CLIENT.toDecimal(this.state.contractId[index]),
                    asset: ETHEREUM_CLIENT.toAscii(this.state.asset[index]),
                    qty: ETHEREUM_CLIENT.toDecimal(this.state.qty[index]),
                    price: ETHEREUM_CLIENT.toDecimal(this.state.tPrice[index]),
                    time: ETHEREUM_CLIENT.toDecimal(this.state.tTime[index]),
                    extra: ETHEREUM_CLIENT.toAscii(this.state.extra[index])
                }
            );
        });

        const bidStuff = [];
        _.each(this.state.cId, () => {
            bidStuff.push({
                    bcId: this.state.cId,
                    supplier: this.state.supplier,
                    btime: this.state.time,
                    bprice: this.state.price,
                }
            );
        });

        const bidColumns = [{
            header: 'Id',
            accessor: 'bcId' // String-based value accessors!
        }, {
            header: 'Supplier',
            accessor: 'supplier' // String-based value accessors!
        }, {
            header: 'Price',
            accessor: 'bprice' // String-based value accessors!
        }, {
            header: 'Time to Complete',
            accessor: 'btime' // String-based value accessors!
        }];

        const columns = [{
            header: 'Contract Id',
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
            header: 'Additional Info',
            accessor: 'extra' // String-based value accessors!
        }];
        return (
            <div>
                <h2 className="bloo">Closed Contracts</h2>
                <ReactTable
                    getTdProps={(state, rowInfo) => {
                        return {
                            onClick: e => {
                                console.log(rowInfo);
                                this.handleOpenBidModal(rowInfo.rowValues.cId)
                            }
                        }
                    }}
                    data={TableRows}
                    columns={columns}
                    defaultPageSize={5}
                />
                <ReactModal
                    isOpen={this.state.showBidModal}
                    contentLabel="Bid Form"
                    className="container">
                    <h2 className="bloo">Winning Bidder: {this.state.supplier}</h2>
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
