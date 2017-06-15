# AuctionPlatform
A smartcontract Dapp with a web based UI that keeps track of contract data by adding it into blocks to be mined on a test network.
## Setup
1. [Nodejs](https://nodejs.org/en/) (v6.10.0 or greater)— a Javascript runtime for easily building fast and scalable network applications
2. Npm (v4.3.0 or greater) — Node.js’ package ecosystem. If you already have NodeJs you can simply type: npm update into your terminal.
3. [Solidity Compiler](https://solidity.readthedocs.io/en/develop/installing-solidity.html)(v0.4.8 or greater) — `$ npm install -g solc` This is the compiler for smart contract language. You need this to compile all .sol files. *If you have a mac, I HIGHLY recommend installing homebrew and following the installation steps here. Also note that if this is your first time downloading solidity this download can take upwards of 20 mins so be patient.*
4. [Truffle Framework](http://truffleframework.com/docs/getting_started/installation) (v3.1.2 or greater) — `$ npm install -g truffle` note the -g tag installs truffle globally so don’t worry about being in any specific directory. Truffle is a development framework for Ethereum that has built in smart contract compilation, linking, and deployment.
5. [Testrpc](https://github.com/ethereumjs/testrpc) (v3.1.2 or greater) — `$ npm install -g ethereumjs-testrpc` This will be the blockchain on which contracts will be deployed and mined in testing. Specifically testrpc is an Ethereum client for testing and developing. It comes with the ability to play with accounts pre-filled with millions of dollars worth of Ether (sorry you can’t keep it) and customize everything from hostnames to gasPrice.

## Kovan Deployment
1. in a new terminal window enter `$ open -a Google\ Chrome --args --disable-web-security --user-data-dir`
   this disables the chrome browser security check that prevents the app from using the same
   port as the blockchain.
2. In a new terminal window `$ parity ui --chain=kovan --jsonrpc-apis personal,eth,net,web3` contract is at: 0x8a4f9c87e7066d02b4e97d7bc1e5bff31b96c715
3. In a new terminal window `$ cd smartcontractui`
4. `$ npm start`
5. you can now open `localhost:3000` if it does not happen automatically and view the Dapp UI

## Interface / Methods
### Active Contracts
Table of unpublished contracts. Clicking columns changes order by. Clicking rows shows all submitted bids to the contract and ability to publish contract with given contract ID number (cId) from the database and mines the contract on the connected blockchain. The mined contract is immutable and will be displayed in the Closed Contracts table
### New Contract
Creates a new contract with the specified Asset, Quantity, Price, and Time. The contract is submitted to the database and is open and able to be edited.
### Add Contract Field
Allows user to view and add multiple addition fields to an unpublished contract
### Edit Contract
Allows user to edit all aspects of a contract by its cID. Usage: enter in a cID, and wait a few seconds for fields to populate, then edit.
### Refresh
Refreshes the database once a contract or bid is added or closed.
### New Bid
Generates a new bid for the given cId. A bid consists of a Supplier, Price, and Time that a bidder is willing to bet.
### Closed Contracts Table
Table of contracts that have been published to the blockchain. Contracts are immutable and clicking on one will reveal all data about the contract as will as the closing buyer.


## Credits:
This smart contract was adapted from a tutorial by [Jordan Leigh](https://www.youtube.com/watch?v=3-XPBtAfcqo&list=PLV1JDFUtrXpGvu8QHL9b78WYNSJsYNZsb&index=2)..
