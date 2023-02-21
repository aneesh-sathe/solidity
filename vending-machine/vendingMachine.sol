//SPDX-License-Identifer: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";


contract vendingMachine{
    mapping(string => uint256) public inventory;
    address public owner;
    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Unauthorized Access!");
        _;
        
    }

    function restock(string memory _item, uint256 _value) public onlyOwner returns(bool success){
        inventory[_item] = _value;
        return true;
    }

    function getInventory() public view{
        // WILL BE IMPLEMENTED IN THE FUTURE 
    }

    function purchase(string memory _item) public payable returns(bool success){
        require(msg.sender.balance >= inventory[_item], "Insufficicent Funds!");
        payable(owner).transfer(msg.value);
        delete inventory[_item];
        return true;

    }

    
}
