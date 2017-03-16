pragma solidity ^0.4.8;

contract SmartContract {

	Contract[] public contracts; //create array of people

	struct Contract { //create Person datatype
		bytes32 contractType; //hex because of fixed array size
		bytes32 owner;
		bytes32 supplier;
		bytes32 asset;
		uint quantity;
	}

	function addContract(bytes32 _contractType, bytes32 _owner, bytes32 _supplier, bytes32 _asset, uint _quantity) returns (bool success) {
		Contract memory newContract; //creates new struct and memory
		newContract.contractType = _contractType;
		newContract.owner = _owner;
		newContract.supplier = _supplier;
		newContract.asset = _asset;
		newContract.quantity = _quantity;

		contracts.push(newContract);//add elem to array
		return true;
	}

	function getContracts() constant returns (bytes32[], bytes32[], bytes32[], bytes32[], uint[]) {
		uint length = contracts.length;

		bytes32[] memory contractTypes = new bytes32[](length);
		bytes32[] memory owners = new bytes32[](length);
		bytes32[] memory suppliers = new bytes32[](length);
		bytes32[] memory assets = new bytes32[](length);
		uint[] memory quantities = new uint[](length);

		for (uint i = 0; i < contracts.length; i++) {
			Contract memory currentContract;
			currentContract = contracts[i];

			contractTypes[i] = currentContract.contractType;
			owners[i] = currentContract.owner;
			suppliers[i] = currentContract.supplier;
			assets[i] = currentContract.asset;
			quantities[i] = currentContract.quantity;
		}

		return (contractTypes, owners, suppliers, assets, quantities);
	}

}