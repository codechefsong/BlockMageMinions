//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./ERC6551Registry.sol";
import "./MinionNFT.sol";
import "./RuneCredit.sol";
import "./StaminaPoint.sol";

contract Game {
  ERC6551Registry public registry;
  MinionNFT public minionNFT;
  RuneCredit public runeCredit;
  StaminaPoint public staminaPoint;

  address public immutable owner;
  bool public premium = false;
  uint256 public totalCounter = 0;
  mapping(address => uint) public userGreetingCounter;

  constructor(
    address _owner,
    address _registryAddress,
    address _minionNFTAddress,
    address _runeCreditAddress,
    address _staminaPointAddress
  ) {
    owner = _owner;
    registry = ERC6551Registry(_registryAddress);
    minionNFT = MinionNFT(_minionNFTAddress);
    runeCredit = RuneCredit(_runeCreditAddress);
    staminaPoint = StaminaPoint(_staminaPointAddress);
  }

  modifier isOwner() {
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  function createMinion(
    uint256 _chainId,
    uint256 _salt,
    string calldata _tokenURI
  ) public {
    uint256 tokenId = minionNFT.mint(msg.sender, _tokenURI);
    address tba = registry.account(address(registry), _chainId, address(minionNFT), tokenId, _salt);
    runeCredit.mint(msg.sender, 10000000000000000000000);
    staminaPoint.mint(tba, 1000000000000000000000);
  }

  function withdraw() public isOwner {
    (bool success, ) = owner.call{ value: address(this).balance }("");
    require(success, "Failed to send Ether");
  }


  receive() external payable {}
}