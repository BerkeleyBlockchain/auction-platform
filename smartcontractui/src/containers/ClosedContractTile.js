import React, {Component} from 'react';
import '../assets/css/App.css';

class ClosedContractTile extends Component {
    render() {
        return (
            <div className='square-box bloo'>
                <div className='square-content'>
                    <h3>Summary of Published Contract</h3>
                    <table>
                        <tr>
                            <td>Proposed Asset</td>
                            <td>{this.props.asset}</td>
                        </tr>
                        <tr>
                            <td>Proposed Quantity</td>
                            <td>{this.props.quantity}</td>
                        </tr>
                        <tr>
                            <td>Proposed Price</td>
                            <td>{this.props.tPrice}</td>
                        </tr>
                        <tr>
                            <td>Proposed Time</td>
                            <td>{this.props.tTime}</td>
                        </tr>
                        <tr>
                            <td>Signer Address</td>
                            <td>{this.props.extra}</td>
                        </tr>
                        <tr>
                            <td>Accepted Bid Supplier</td>
                            <td>{this.props.supplier}</td>
                        </tr>
                        <tr>
                            <td>Accepted Bid Price</td>
                            <td>{this.props.price}</td>
                        </tr>
                        <tr>
                            <td>Accepted Bid Time</td>
                            <td>{this.props.time}</td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default ClosedContractTile;
