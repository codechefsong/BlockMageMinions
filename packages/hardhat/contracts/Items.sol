// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Items is ERC1155 {
    uint256 public constant Food = 1;
    uint256 public constant StaminaPotion= 2;
    uint256 public constant MagicPotion= 3;
    uint256 public constant DefensePotion= 4;
    uint256 public constant Wood = 5;
    uint256 public constant Iron = 6;
    uint256 public constant Steel = 7;

    uint256[] public price = [1, 10, 50, 50];
    uint256[] public sellPrice = [10, 100, 1000];

    constructor() ERC1155("") {
    }

    function getPrices() public view returns(uint256[] memory) {
        return price;
    }

    function getSellPrices() public view returns(uint256[] memory) {
        return sellPrice;
    }

    function mintItem(address _account, uint256 _id) public {
        if (_id == 1) _mint(_account, Food, 1, "");
        else if (_id == 2) _mint(_account, StaminaPotion, 1, "");
        else if (_id == 3) _mint(_account, MagicPotion, 1, "");
        else if (_id == 4) _mint(_account, DefensePotion, 1, "");
    }

    function mintMaterials(address _account, uint256 _id, uint256 _amount) public {
        if (_id == 5) _mint(_account, Wood, _amount, "");
        else if (_id == 6) _mint(_account, Iron, _amount, "");
        else if (_id == 7) _mint(_account, Steel, _amount, "");
    }

    function burnItem(address _account, uint256 _id) public {
        if (_id == 1) _burn(_account, Food, 1);
        else if (_id == 2) _burn(_account, StaminaPotion, 1);
        else if (_id == 3) _burn(_account, MagicPotion, 1);
        else if (_id == 4) _burn(_account, DefensePotion, 1);
    }

    function burnMaterials(address _account, uint256 _id, uint256 _amount) public {
        if (_id == 5) _burn(_account, Wood, _amount);
        else if (_id == 6) _burn(_account, Iron, _amount);
        else if (_id == 7) _burn(_account, Steel, _amount);
    }
}
