import Web3 from 'web3';
import React, {Component} from 'react';
import SingleInput from '../components/SingleInput';

const ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

var smartContractABI = [{"constant":true,"inputs":[{"name":"_cid","type":"uint256"}],"name":"getBid","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"contracts","outputs":[{"name":"contractId","type":"uint256"},{"name":"asset","type":"bytes32"},{"name":"quantity","type":"uint256"},{"name":"targetPrice","type":"uint256"},{"name":"targetTime","type":"uint256"},{"name":"extra","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getClosedContracts","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_cId","type":"uint256"},{"name":"_asset","type":"bytes32"},{"name":"_quantity","type":"uint256"},{"name":"_targetPrice","type":"uint256"},{"name":"_targetTime","type":"uint256"},{"name":"_extra","type":"bytes32"}],"name":"addContract","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_cid","type":"uint256"},{"name":"_supplier","type":"bytes32"},{"name":"_price","type":"uint256"},{"name":"_bidTime","type":"uint256"}],"name":"bid","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]
//kovan deployed at 0x8a4f9c87e7066d02b4e97d7bc1e5bff31b96c715
var smartContractAddress = '0x8a4f9c87e7066d02b4e97d7bc1e5bff31b96c715';


ETHEREUM_CLIENT.eth.defaultAccount = ETHEREUM_CLIENT.eth.accounts[0];
var smartContract = ETHEREUM_CLIENT.eth.contract(smartContractABI).at(smartContractAddress);

class EthereumClient extends Component {
  constructor() {
    super();
    this.state = {
      address : smartContractAddress
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount(){
    setInterval(function() {
      this.setState({ address: smartContractAddress});
      this.render();
    }.bind(this), 5000);
  }

  handleInput (value) {
    this.setState({ address: value.target.value }, () => console.log('name:', this.state.address));
  }

  handleFormSubmit (value) {
    value.preventDefault();
    this.setState({address: value.target.value});
    smartContractAddress = this.state.address;

    smartContract = ETHEREUM_CLIENT.eth.contract(smartContractABI).at(smartContractAddress);
  }
  /*

  */

  render() {
    return (
      <div>
      <h3 className="margin">Current Contract Address: {this.state.address}</h3>
      <form onSubmit={this.handleFormSubmit}>
        <table>
          <tr>
            <td><h3>Update Address</h3></td>

            <td><SingleInput
                className=""
                inputType={'text'}
                title={'Address'}
                name={'Address'}
                controlFunc={this.handleInput}
                content={this.state.address}
                placeholder={'Address (DO NOT MODIFY ABI)'} />
            </td>

            <td>
              <input
                type="submit"
                className="submitButton"
                value="Submit"/>
            </td>
          </tr>
        </table>
      </form>
      </div>);
  }
}

export {ETHEREUM_CLIENT, smartContract};