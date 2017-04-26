pragma solidity ^0.4.8;
contract SmartContract {
    Contract[] public contracts; //array of open contracts

    //Bid[] public bids;
    mapping(uint => Bid) bidMap;
    uint bidTableContractId = 0;
    uint count; //number of contracts
    /*struct Date {
        uint day;
        uint month;
        uint year;
    }*/
    struct Contract { //create Contract datatype
        uint contractId;
        bytes32 asset;
        uint quantity;
        uint targetPrice;
        uint targetTime;
        bytes32 extra;
    }
    struct Bid {
        uint contractId;
        bytes32 supplier;
        address owner;
        uint price;
        uint bidTime;
    }

    function SmartContract() {
        count = 0;
    }

    function addContract(uint _cId, bytes32 _asset, uint _quantity, uint _targetPrice, uint _targetTime, bytes32 _extra) returns (bool success) {
        Contract memory newContract; //creates new struct and memory
        /*Date memory _date;*/
        newContract.contractId = _cId;
        newContract.asset = _asset;
        newContract.quantity = _quantity;
        newContract.targetPrice = _targetPrice;
        newContract.targetTime = _targetTime;
        newContract.extra = _extra;
        contracts.push(newContract);//add elem to array
        return true;
    }

    function bid(uint _cid, bytes32 _supplier, uint _price, uint _bidTime) returns (bool success) {
        Bid memory newBid;
        newBid.contractId = _cid;
        newBid.supplier = _supplier;
        newBid.price = _price;
        newBid.bidTime = _bidTime;
        newBid.owner = msg.sender;
        bidMap[_cid] = newBid;
        return true;
    }

    function getClosedContracts() constant returns (uint[], bytes32[], uint[], uint[], uint[], bytes32[]) {
        uint length = contracts.length;
        uint[] memory contractId = new uint[](length);
        bytes32[] memory asset = new bytes32[](length);
        uint[] memory qty = new uint[](length);
        uint[] memory targetPrice = new uint[](length);
        uint[] memory targetTime = new uint[](length);
        bytes32[] memory extraField1 = new bytes32[](length);

        for (uint i = 0; i < contracts.length; i++) {
            Contract memory currentContract;
            currentContract = contracts[i];

              contractId[i] = currentContract.contractId;
              asset[i] = currentContract.asset;
              qty[i] = currentContract.quantity;
              targetPrice[i] = currentContract.targetPrice;
              targetTime[i] = currentContract.targetTime;
              extraField1[i] = currentContract.extra;
        }
        return (contractId, asset, qty, targetPrice, targetTime, extraField1);
    }

    function getBid(uint _cid) constant returns (uint, bytes32, uint, uint){
        var bid = bidMap[_cid];
        uint contractId = bid.contractId;
        bytes32 supplier = bid.supplier;
        uint price = bid.price;
        uint timeToComplete = bid.bidTime;
        return (contractId, supplier, price, timeToComplete);
    }
}
