import React, {Component} from "react";
import "../assets/css/App.css";
// import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';
import ReactTable from "react-table";
import "react-table/react-table.css";
import BidModal from "./BidModal.js";
import {client} from "../components/Requests";

class BidTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TableRows: [],
            interval: 0
        };
        this.updateTable = this.updateTable.bind(this);
    }

    componentDidMount() {
        const self = this;
        const TableRows = [];
        client.get('/bids/', function (err, res, body) {
            if (err === null) {
                for (let key in body) {
                    TableRows.push({
                        cId: body[key]['cId'],
                        supplier: body[key]['supplier'],
                        time: body[key]['time'],
                        price: body[key]['price'],
                        date: body[key]['date'],
                        extra: body[key]['price']
                    });
                }
                self.setState({TableRows: TableRows});
            }
        });
    }

    updateTable() {
        const self = this;
        const TableRows = [];
        client.get('/bids/', function (err, res, body) {
            if (err === null) {
                for (let key in body) {
                    TableRows.push({
                        cId: body[key]['cId'],
                        supplier: body[key]['supplier'],
                        time: body[key]['time'],
                        price: body[key]['price'],
                        date: body[key]['date'],
                        extra: body[key]['price']
                    });
                }
                self.setState({TableRows: TableRows});
            }
        });
        self.render();
    }

    render() {

        const columns = [{
            header: 'Id',
            accessor: 'cId' // String-based value accessors!
        }, {
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
                <h2 className="bloo">Bids</h2>
                <ReactTable data={this.state.TableRows} columns={columns} defaultPageSize={5}/>
                <button className="modal" onClick={this.updateTable}>Refresh Data</button>
                <BidModal/>
            </div>
        );
        //<GetContractBidsModal/> removed for the time being
    }
}
export default BidTable;
