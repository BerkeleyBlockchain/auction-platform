pragma solidity ^0.4.8;
contract SmartContract {
    Contract[] public openContracts; //array of open contracts
    Contract[] public closedContracts;

    //Bid[] public bids;
    mapping(uint => Bid[]) bidMap;
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
        bytes32[] ef1;
        bytes32 extra;
        /*bool closed;*/
        //bytes32 supplier;
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
    function addContract(bytes32 _asset, uint _quantity, uint _targetPrice, uint _targetTime) returns (bool success) {
        Contract memory newContract; //creates new struct and memory
        /*Date memory _date;*/
        newContract.contractId = count;
        newContract.asset = _asset;
        newContract.quantity = _quantity;
        newContract.targetPrice = _targetPrice;
        newContract.targetTime = _targetTime;

        bytes32 extraField1 = "";
        newContract.extra = extraField1;
        /*newContract.closed = false;*/
        /*_date.day = _day;
        _date.month = _month;
        _date.year = _year;*/
        //newContract.supplier = _supplier;
        /*newContract.date = _date;*/
        openContracts.push(newContract);//add elem to array
        count += 1;
        return true;
    }

    function closeContract(uint _cid) returns (bool success) {
      if (_cid > openContracts.length || _cid < 0) {
        throw;
      }
      uint index = 0;
      while (index <= openContracts.length) {
        if (openContracts[index].contractId == _cid){
          closedContracts.push(openContracts[index]);
          break;
        }
        index++;
      }

      openContracts[index] = openContracts[openContracts.length - 1];
      delete openContracts[openContracts.length-1];
      openContracts.length--;
      return true;
    }

    function addField(uint _cid, bytes32 _extraField) returns (bool success) {
      if (_cid > openContracts.length || _cid < 0) {
        throw;
      }
      bytes32 additional = "Additional Info";
      openContracts[_cid].extra = additional;
      openContracts[_cid].ef1.push(_extraField);
      return true;
    }

    function getFieldByContractID(uint _cid) constant returns (bytes32[]) {
      if (_cid > openContracts.length) {
        throw;
      }
      return openContracts[_cid].ef1;
    }

    function setBidTableContractId(uint _cid) returns (bool success) {
      if (_cid > openContracts.length || _cid < 0) {
        throw;
      }
      bidTableContractId = _cid;
      return true;
    }

    function bid(uint _cid, bytes32 _supplier, uint _price, uint _bidTime) returns (bool success) {
      if (_cid > openContracts.length || _cid < 0) {
        throw;
      }
        Bid memory newBid;
        newBid.contractId = _cid;
        newBid.supplier = _supplier;
        newBid.price = _price;
        newBid.bidTime = _bidTime;
        newBid.owner = msg.sender;
        bidMap[_cid].push(newBid);
        return true;
    }

    function getClosedContracts() constant returns (uint[], bytes32[], uint[], uint[], uint[], bytes32[]) {
        uint length = closedContracts.length;
        uint[] memory contractId = new uint[](length);
        bytes32[] memory asset = new bytes32[](length);
        uint[] memory qty = new uint[](length);
        uint[] memory targetPrice = new uint[](length);
        uint[] memory targetTime = new uint[](length);
        bytes32[] memory extraField1 = new bytes32[](length);
        /*bytes32[][] memory additionalInfo = new bytes32[][](length);*/
        //bytes32[] memory supplier = new bytes32[](length);
        /*Date[] memory date = new Date[](length);*/
        for (uint i = 0; i < closedContracts.length; i++) {
            Contract memory currentContract;
            currentContract = closedContracts[i];

            /*if (currentContract.closed) {*/
              contractId[i] = currentContract.contractId;
              asset[i] = currentContract.asset;
              qty[i] = currentContract.quantity;
              targetPrice[i] = currentContract.targetPrice;
              targetTime[i] = currentContract.targetTime;
              extraField1[i] = currentContract.extra;
            /*}*/
        }
        return (contractId, asset, qty, targetPrice, targetTime, extraField1);
    }

    function getOpenContracts() constant returns (uint[], bytes32[], uint[], uint[], uint[], bytes32[]) {
        uint length = openContracts.length;
        uint[] memory contractId = new uint[](length);
        bytes32[] memory asset = new bytes32[](length);
        uint[] memory qty = new uint[](length);
        uint[] memory targetPrice = new uint[](length);
        uint[] memory targetTime = new uint[](length);
        bytes32[] memory extraField1 = new bytes32[](length);
        /*bytes32[][] memory additionalInfo = new bytes32[][](length);*/
        //bytes32[] memory supplier = new bytes32[](length);
        /*Date[] memory date = new Date[](length);*/
        for (uint i = 0; i < openContracts.length; i++) {
            Contract memory currentContract;
            currentContract = openContracts[i];

            /*if (!currentContract.closed) {*/
              contractId[i] = currentContract.contractId;
              asset[i] = currentContract.asset;
              qty[i] = currentContract.quantity;
              targetPrice[i] = currentContract.targetPrice;
              targetTime[i] = currentContract.targetTime;
              extraField1[i] = currentContract.extra;
            /*}*/
        }
        return (contractId, asset, qty, targetPrice, targetTime, extraField1);
    }

    function getBids() constant returns (uint[], bytes32[], uint[], uint[]){
        uint length = bidMap[bidTableContractId].length;
        Bid[] bids = bidMap[bidTableContractId];
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
