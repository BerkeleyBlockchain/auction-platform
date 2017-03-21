import Web3 from 'web3';

const ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

var smartContractABI = [{"constant":true,"inputs":[{"name":"contractId","type":"uint256"}],"name":"getBids","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_asset","type":"bytes32"},{"name":"_quantity","type":"uint256"},{"name":"_targetPrice","type":"uint256"},{"name":"_targetTime","type":"uint256"}],"name":"addContract","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"contracts","outputs":[{"name":"contractId","type":"uint256"},{"name":"asset","type":"bytes32"},{"name":"quantity","type":"uint256"},{"name":"targetPrice","type":"uint256"},{"name":"targetTime","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getContracts","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"cid","type":"uint256"},{"name":"_supplier","type":"bytes32"},{"name":"_price","type":"uint256"},{"name":"_bidTime","type":"uint256"}],"name":"bid","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}];
var smartContractAddress = '0xfcc9f0b616d9fd50b42ceefd0a210462dbf0d3c6';

const smartContract = ETHEREUM_CLIENT.eth.contract(smartContractABI).at(smartContractAddress);
export {ETHEREUM_CLIENT, smartContract};
