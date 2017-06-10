import React, {Component} from 'react';
import _ from 'lodash';
import '../assets/css/App.css';
import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import ReactModal from 'react-modal';
import ScrollLock from 'react-scrolllock';
import ClosedContractTile from './ClosedContractTile';


class ClosedContractTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contractIdArr: "",
            assetArr: "",
            qtyArr: "",
            priceArr: "",
            timeArr: "",
            asset: "",
            qty: "",
            tPrice: "",
            tTime: "",
            extraArr: "",
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
        const bidData = smartContract.getBid(e.cId)
        this.setState({
            asset: e.asset,
            qty: e.qty,
            tPrice: e.price,
            tTime: e.time,
            extra: e.extra,
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
            contractIdArr: String(data[0]).split(','),
            assetArr: String(data[1]).split(','),
            qtyArr: String(data[2]).split(','),
            priceArr: String(data[3]).split(','),
            timeArr: String(data[4]).split(','),
            extraArr: String(data[5]).split(',')
        })
    }

    componentDidMount() {
        setInterval(function () {
            const data = smartContract.getClosedContracts()
            this.setState({
                contractIdArr: String(data[0]).split(','),
                assetArr: String(data[1]).split(','),
                qtyArr: String(data[2]).split(','),
                priceArr: String(data[3]).split(','),
                timeArr: String(data[4]).split(','),
                extraArr: String(data[5]).split(','),
                interval: this.state.interval + 1
            });
            this.render()
        }.bind(this), 5000);
    }

    render() {
        const TableRows = [];

        _.each(this.state.contractIdArr, (value, index) => {
            TableRows.push({
                    cId: ETHEREUM_CLIENT.toDecimal(this.state.contractIdArr[index]),
                    asset: ETHEREUM_CLIENT.toAscii(this.state.assetArr[index]),
                    qty: ETHEREUM_CLIENT.toDecimal(this.state.qtyArr[index]),
                    price: ETHEREUM_CLIENT.toDecimal(this.state.priceArr[index]),
                    time: ETHEREUM_CLIENT.toDecimal(this.state.timeArr[index]),
                    extra: ETHEREUM_CLIENT.toAscii(this.state.extraArr[index])
                }
            );
        });

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
            header: 'Signer Address',
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
                                this.handleOpenBidModal(rowInfo.rowValues)
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
                    className="container all-modal tablePad">
                    <h2 className="bloo">Winning Bidder: {this.state.supplier}</h2>
                    <ClosedContractTile
                        asset={this.state.asset}
                        quantity={this.state.qty}
                        tPrice={this.state.tPrice}
                        tTime={this.state.tTime}
                        extra={this.state.extra}
                        supplier={this.state.supplier}
                        price={this.state.price}
                        time={this.state.time}/>
                    <button className="modalDone" onClick={this.handleCloseBidModal}>Done</button>
                    <ScrollLock />
                </ReactModal>
            </div>
        );
    }
}
export default ClosedContractTable;
