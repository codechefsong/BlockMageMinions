//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RuneCredit is ERC20 {
    address public immutable owner;
    mapping(address => bool) public adminList;

    constructor(address _owner) ERC20("Rune Credit", "RC") {
        owner = _owner;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    modifier isAdmin(address _owner) {
        require(adminList[_owner] == true, "Not the Admin");
        _;
    }


    function addAdmin(address account) public isOwner {
        adminList[account] = true;
    }

    function mint(address account, uint256 amount) public isAdmin(msg.sender) {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public isAdmin(msg.sender) {
        _burn(account, amount);
    }
}
