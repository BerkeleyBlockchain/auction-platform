pragma solidity ^0.4.8;
contract SmartContract {
    Contract[] public contracts; //create array of contracts
    //Bid[] public bids;
    mapping(uint => Bid[]) bidMap;
    uint count;
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
        bytes32 supplier;
        /*Date date;*/
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
    function addContract(bytes32 _asset, uint _quantity, uint _targetPrice, uint _targetTime, bytes32 _supplier) returns (bool success) {
        Contract memory newContract; //creates new struct and memory
        /*Date memory _date;*/
        newContract.contractId = count;
        newContract.asset = _asset;
        newContract.quantity = _quantity;
        newContract.targetPrice = _targetPrice;
        newContract.targetTime = _targetTime;
        /*_date.day = _day;
        _date.month = _month;
        _date.year = _year;*/
        newContract.supplier = _supplier;
        /*newContract.date = _date;*/
        contracts.push(newContract);//add elem to array
        count += 1;
        return true;
    }
    function bid(uint cid, bytes32 _supplier, uint _price, uint _bidTime) returns (bool success) {
        Bid memory newBid;
        newBid.contractId = cid;
        newBid.supplier = _supplier;
        newBid.price = _price;
        newBid.bidTime = _bidTime;
        newBid.owner = msg.sender;
        bidMap[cid].push(newBid);
        return true;
    }
    function getContracts() constant returns (uint[], bytes32[], uint[], uint[], uint[], bytes32[]) {
        uint length = contracts.length;
        uint[] memory contractId = new uint[](length);
        bytes32[] memory asset = new bytes32[](length);
        uint[] memory qty = new uint[](length);
        uint[] memory targetPrice = new uint[](length);
        uint[] memory targetTime = new uint[](length);
        bytes32[] memory supplier = new bytes32[](length);
        /*Date[] memory date = new Date[](length);*/
        for (uint i = 0; i < contracts.length; i++) {
            Contract memory currentContract;
            currentContract = contracts[i];
            contractId[i] = currentContract.contractId;
            asset[i] = currentContract.asset;
            qty[i] = currentContract.quantity;
            targetPrice[i] = currentContract.targetPrice;
            targetTime[i] = currentContract.targetTime;
            supplier[i] = currentContract.supplier;
            /*date[i] = currentContract.date;*/
        }
        return (contractId, asset, qty, targetPrice, targetTime, supplier);
    }
    function getBids(uint contractId) constant returns (uint[], bytes32[], uint[], uint[]){
        uint length = bidMap[contractId].length;
        Bid[] bids = bidMap[contractId];
        uint[] memory contractIds = new uint[](length);
        bytes32[] memory suppliers = new bytes32[](length);
        uint[] memory prices = new uint[](length);
        uint[] memory timesToComplete = new uint[](length);
        for (uint i = 0; i < length; i++) {
            contractIds[i] = bids[i].contractId;
            suppliers[i] = bids[i].supplier;
            prices[i] = bids[i].price;
            timesToComplete[i] = bids[i].bidTime;
        }
        return (contractIds, suppliers, prices, timesToComplete);
    }
}
