import Web3 from 'web3';

const ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

var smartContractABI = [{"constant":true,"inputs":[{"name":"contractId","type":"uint256"}],"name":"getBids","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"contracts","outputs":[{"name":"contractId","type":"uint256"},{"name":"asset","type":"bytes32"},{"name":"quantity","type":"bytes32"},{"name":"targetPrice","type":"bytes32"},{"name":"targetTime","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"cid","type":"uint256"},{"name":"_supplier","type":"bytes32"},{"name":"_price","type":"bytes32"},{"name":"_bidTime","type":"bytes32"}],"name":"bid","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_asset","type":"bytes32"},{"name":"_quantity","type":"bytes32"},{"name":"_targetPrice","type":"bytes32"},{"name":"_targetTime","type":"bytes32"}],"name":"addContract","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getContracts","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]
var smartContractAddress = '0x94c12afdff9ff334d4a750011dff6c63c6c74894';

const smartContract = ETHEREUM_CLIENT.eth.contract(smartContractABI).at(smartContractAddress);
export {ETHEREUM_CLIENT, smartContract};
