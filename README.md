# AuctionPlatform
A smartcontract Dapp with a web based UI that keeps track of contract data by adding it into blocks to be mined on a test network.
## Setup
1. Ethereum Client (original uses testrpc) v3.0.3
2. Truffle v3.1.2
3. Npm 4.3.0 / Nodejs v6.10.0
4. [parity](https://github.com/paritytech/parity) v1.5.7 (one line install for mac recommended)

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
ill finish this later tbh
### Refresh
Refreshes the database once a contract is added or closed.
### New Bid
Generates a new bid for the given cId. A bid consists of a Supplier, Price, and Time that a bidder is willing to bet.


## Credits:
This smart contract was adapted from a tutorial by [Jordan Leigh](https://www.youtube.com/watch?v=3-XPBtAfcqo&list=PLV1JDFUtrXpGvu8QHL9b78WYNSJsYNZsb&index=2)..
