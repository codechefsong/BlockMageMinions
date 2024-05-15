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
  mapping(address => address) public activeMinion;
  mapping(address => uint256) public usedStaminaPoints;

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

  function getActiveMinion(address _owner) public view returns (address) {
    return activeMinion[_owner];
  }

  function getStaminaPointsLeft(address _owner) public view returns (uint256) {
    uint256 currentStaminaPoints = staminaPoint.balanceOf(_owner) - (usedStaminaPoints[_owner] * 1000000000000000000);
    return currentStaminaPoints / 1000000000000000000;
  }

  function createMinion(string calldata _tokenURI) public {
    minionNFT.mint(msg.sender, _tokenURI);
    runeCredit.mint(msg.sender, 10000000000000000000000);
  }

   function createTBA(
    uint256 _chainId,
    uint256 _salt,
    uint256 _tokenId,
    bytes calldata _initData
  ) public {
    address tba = registry.createAccount(address(registry), _chainId, address(minionNFT), _tokenId, _salt, _initData);
    staminaPoint.mint(tba, 100000000000000000000);
    activeMinion[msg.sender] = tba;
  }

  function withdraw() public isOwner {
    (bool success, ) = owner.call{ value: address(this).balance }("");
    require(success, "Failed to send Ether");
  }


  receive() external payable {}
}
