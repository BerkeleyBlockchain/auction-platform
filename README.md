# AuctionPlatform
A smartcontract Dapp with a web based UI that keeps track of contract data by adding it into blocks to be mined on a test network. 
## Setup
1. Ethereum Client (original uses testrpc) v3.0.3
2. Truffle v3.1.2
3. Npm 4.3.0 / Nodejs v6.10.0
4. [parity](https://github.com/paritytech/parity) v1.5.7 (one line install for mac recommended)

## testrpc Deployment 
1. In a new terminal window `$ testrpc`
2. In a new terminal window `$ cd smartcontract`
3. `$ truffle compile` And `$ truffle migrate`
4. Once the contract is mined, copy and paste the contract address into `var smartContractAddress = '___'` in Components/EthereumSetup.js
5. In a new terminal window `$ cd smartcontractui`
6. `$ npm start`
7. you can now open `localhost:3000` if it does not happen automatically and view the Dapp UI

## Kovan Deployment 
1. In a new terminal window `$ parity ui --chain=kovan --jsonrpc-apis personal,eth,net,web3` contract is at: 0xEec9E9742774b47baAb33797E86778336b5F725c
2. in a new terminal window enter $ open -a Google\ Chrome --args --disable-web-security --user-data-dir
   this disables the chrome browser security check that prevents the app from using the same
   port as the blockchain. 
3. In a new terminal window `$ cd smartcontractui`
3. `$ npm start`
4. you can now open `localhost:3000` if it does not happen automatically and view the Dapp UI

## Interface / Methods
coming soon

### Credits:
This smart contract was adapted from a tutorial by [Jordan Leigh](https://www.youtube.com/watch?v=3-XPBtAfcqo&list=PLV1JDFUtrXpGvu8QHL9b78WYNSJsYNZsb&index=2)..
