//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StaminaPoint is ERC20 {
    address[] public list;
    
    constructor() ERC20("Stamina Point", "SP") {}

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
        list.push(account);
    }
}
