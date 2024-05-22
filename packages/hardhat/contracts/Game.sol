//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./ERC6551Registry.sol";
import "./MinionNFT.sol";
import "./RuneCredit.sol";
import "./StaminaPoint.sol";
import "./MagicPoint.sol";
import "./DefensePoint.sol";
import "./Items.sol";

contract Game {
  ERC6551Registry public registry;
  MinionNFT public minionNFT;
  RuneCredit public runeCredit;
  StaminaPoint public staminaPoint;
  MagicPoint public magicPoint;
  DefensePoint public defensePoint;
  Items public items;

  address public immutable owner;
  bool public premium = false;
  uint256 public totalCounter = 0;
  mapping(address => address) public activeMinion;
  mapping(address => uint256) public usedStaminaPoints;
  mapping(address => uint256) public restCoolDown;
  mapping(address => bool) public isRest;

  uint256 public constant COOLDOWNTIME = 100;

  constructor(
    address _owner,
    address _registryAddress,
    address _minionNFTAddress,
    address _runeCreditAddress,
    address _staminaPointAddress,
    address _magicPointAddress,
    address _defensePointAddress,
    address _itemAddress
  ) {
    owner = _owner;
    registry = ERC6551Registry(_registryAddress);
    minionNFT = MinionNFT(_minionNFTAddress);
    runeCredit = RuneCredit(_runeCreditAddress);
    staminaPoint = StaminaPoint(_staminaPointAddress);
    magicPoint = MagicPoint(_magicPointAddress);
    defensePoint = DefensePoint(_defensePointAddress);
    items = Items(_itemAddress);
  }

  modifier isOwner() {
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  modifier hasEnoughSP(uint256 amount) {
    address minionAddress = activeMinion[msg.sender];
    uint256 usedAmount = usedStaminaPoints[minionAddress] + amount;
    uint256 spAmount = staminaPoint.balanceOf(minionAddress);
    require(usedAmount * 1000000000000000000 <= spAmount, "Not not SP");
    _;
  }

  function getActiveMinion(address _owner) public view returns (address) {
    return activeMinion[_owner];
  }

  function getStaminaPointsLeft(address _owner) public view returns (uint256) {
    uint256 currentStaminaPoints = staminaPoint.balanceOf(_owner) - (usedStaminaPoints[_owner] * 1000000000000000000);
    return currentStaminaPoints / 1000000000000000000;
  }

  function getIsRest(address _owner) public view returns (bool) {
    address minionAddress = activeMinion[_owner];
    return isRest[minionAddress];
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
    activeMinion[msg.sender] = tba;
    if (staminaPoint.balanceOf(tba) == 0) {
      staminaPoint.mint(tba, 100000000000000000000);
    }
    if (magicPoint.balanceOf(tba) == 0) {
      magicPoint.mint(tba, 10000000000000000000);
    }
    if (defensePoint.balanceOf(tba) == 0) {
      defensePoint.mint(tba, 10000000000000000000);
    }
  }

  function trainMinion(uint8 _trainType) public hasEnoughSP(20){
    address minionAddress = activeMinion[msg.sender];
    usedStaminaPoints[minionAddress] += 20;
    if (_trainType == 1) {
      staminaPoint.mint(minionAddress, 1000000000000000000);
    }
    else if (_trainType == 2) {
      magicPoint.mint(minionAddress, 1000000000000000000);
    }
    else if (_trainType == 3) {
      defensePoint.mint(minionAddress, 1000000000000000000);
    }
  }

  function buyItem(uint _itemID) public {
    uint256 cost = items.price(_itemID - 1);
    runeCredit.burn(msg.sender, cost * 1000000000000000000);
    items.mintItem(msg.sender, _itemID);
  }

  function useFoodItem() public {
    items.burnItem(msg.sender, 1);
    address minionAddress = activeMinion[msg.sender];
    if (usedStaminaPoints[minionAddress] >= 20) {
      usedStaminaPoints[minionAddress] -= 20;
    } else {
      usedStaminaPoints[minionAddress] = 0;
    }
  }

  function usePotionItem(uint8 _potionType) public {
    items.burnItem(msg.sender, _potionType);
    address minionAddress = activeMinion[msg.sender];
    if (_potionType == 2) {
      staminaPoint.mint(minionAddress, 1000000000000000000);
    }
    else if (_potionType == 3) {
      magicPoint.mint(minionAddress, 1000000000000000000);
    }
  }

  function restMinion() public {
    address minionAddress = activeMinion[msg.sender];
    restCoolDown[minionAddress] = block.timestamp;
    isRest[minionAddress] = true;
  }

  function wakeUpMinion() public {
    address minionAddress = activeMinion[msg.sender];
    require(block.timestamp > restCoolDown[minionAddress] + COOLDOWNTIME, "Your minion is not awake yet");
    isRest[minionAddress] = false;
    usedStaminaPoints[minionAddress] = 0;
  }

  function withdraw() public isOwner {
    (bool success, ) = owner.call{ value: address(this).balance }("");
    require(success, "Failed to send Ether");
  }

  receive() external payable {}
}
