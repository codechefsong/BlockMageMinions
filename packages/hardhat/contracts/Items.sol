// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Items is ERC1155 {
    uint256 public constant Food = 1;
    uint256 public constant StaminaPotion= 2;
    uint256 public constant MagicPotion= 3;
    uint256 public constant DefensePotion= 4;

    uint256[] public price = [1, 10, 50, 50];

    constructor() ERC1155("") {
    }

    function getPrices() public view returns(uint256[] memory) {
        return price;
    }

    function mintItem(address _account, uint256 _id) public {
        if (_id == 1) _mint(_account, Food, 1, "");
        else if (_id == 2) _mint(_account, StaminaPotion, 1, "");
        else if (_id == 3) _mint(_account, MagicPotion, 1, "");
        else if (_id == 4) _mint(_account, DefensePotion, 1, "");
    }

    function burnItem(address _account, uint256 _id) public {
        if (_id == 1) _burn(_account, Food, 1);
        else if (_id == 2) _burn(_account, StaminaPotion, 1);
        else if (_id == 3) _burn(_account, MagicPotion, 1);
        else if (_id == 4) _burn(_account, DefensePotion, 1);
    }
}
