import React, {Component} from "react";
import "../assets/css/App.css";

class BidTile extends Component {
    render() {
        return (
            <div className='square-box bloo'>
                <div className='square-content'>
                    <h3>Selected Winning Bid for Contract</h3>
                    <table>
                        <tr>
                            <td>Supplier</td>
                            <td>{this.props.supplier}</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>{this.props.price}</td>
                        </tr>
                        <tr>
                            <td>Time</td>
                            <td>{this.props.time}</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>{this.props.date}</td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default BidTile;
