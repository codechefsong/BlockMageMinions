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
  mapping(address => bool) public isClaim;
  address[] public currentRuneTrees;
  mapping(address => RuneTree) public addressToRuneTree;

  struct RuneTree {
    address owner;
    uint256 amount;
    uint256 startdate;
    uint256 defensePoint;
  }

  uint256 public constant COOLDOWNTIME = 100;

  event NewMaterial(address indexed owner, uint8 itemID, uint8 amount);
  event EaredCreditFromThief(address indexed owner, uint256 amount);

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
    require(minionAddress != address(0), "You need an active minion");
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

  function getCurrentRuneTrees() public view returns (address[] memory) {
    return currentRuneTrees;
  }

  function getUserRuneTree(address _owner) public view returns (RuneTree memory) {
    return addressToRuneTree[_owner];
  }

  function createMinion(string calldata _tokenURI) public {
    minionNFT.mint(msg.sender, _tokenURI);
    if (isClaim[msg.sender] == false) {
      runeCredit.mint(msg.sender, 10000000000000000000000);
      isClaim[msg.sender] = true;
    }
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

  function sellMaterial(uint _materialID) public {
    uint256 cost = items.sellPrice(_materialID - 1 - 4);
    runeCredit.mint(msg.sender, cost * 1000000000000000000);
    items.burnMaterials(msg.sender, _materialID, 1);
  }

  function useFoodItem() public {
    items.burnItem(msg.sender, 1);
    address minionAddress = activeMinion[msg.sender];
    if (usedStaminaPoints[minionAddress] >= 50) {
      usedStaminaPoints[minionAddress] -= 50;
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
    else if (_potionType == 4) {
      defensePoint.mint(minionAddress, 1000000000000000000);
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

  function gatherMaterials() public hasEnoughSP(50) {
    address minionAddress = activeMinion[msg.sender];
    usedStaminaPoints[minionAddress] += 50;

    uint256 randomNumber = uint256(keccak256(abi.encode(block.timestamp, msg.sender))) % 10;

    if (randomNumber > 8) {
      items.mintMaterials(msg.sender, 7, 1);
      emit NewMaterial(msg.sender, 7, 1);
    }
    else if (randomNumber > 5) {
      items.mintMaterials(msg.sender, 6, 1);
      emit NewMaterial(msg.sender, 6, 1);
    }
    else {
      items.mintMaterials(msg.sender, 5, 1);
      emit NewMaterial(msg.sender, 5, 1);
    }
  }

  function attackThief() hasEnoughSP(5) public {
    address minionAddress = activeMinion[msg.sender];
    uint256 defense = defensePoint.balanceOf(minionAddress) / 1000000000000000000;

    if (defense >= 45) {
      usedStaminaPoints[minionAddress] += 5;
    } else {
      uint256 cost = 50 - (defensePoint.balanceOf(minionAddress) / 1000000000000000000);
      usedStaminaPoints[minionAddress] += cost;
    }
    
    runeCredit.mint(msg.sender, magicPoint.balanceOf(minionAddress));
    emit EaredCreditFromThief(msg.sender, magicPoint.balanceOf(minionAddress));
  }

  function stakeAndCreateRuneTree(uint256 _amount) public {
    require(runeCredit.balanceOf(msg.sender) >= _amount, "Not enough rune credit");
    runeCredit.burn(msg.sender, _amount);

    address minionAddress = activeMinion[msg.sender];
    uint256 defense = defensePoint.balanceOf(minionAddress);
    
    currentRuneTrees.push(msg.sender);
    addressToRuneTree[msg.sender] = RuneTree(msg.sender, _amount,  block.timestamp, defense);
  }

  function attackTree(address _tree) hasEnoughSP(20) public {
    address minionAddress = activeMinion[msg.sender];
    uint256 damage;

    if (addressToRuneTree[_tree].defensePoint < magicPoint.balanceOf(minionAddress)) {
      damage = addressToRuneTree[_tree].defensePoint - magicPoint.balanceOf(minionAddress);
    } else{
      damage = 1000000000000000000;
    }

    addressToRuneTree[_tree].amount -= damage;
    
    runeCredit.mint(msg.sender, damage);
  }

  function withdraw() public isOwner {
    (bool success, ) = owner.call{ value: address(this).balance }("");
    require(success, "Failed to send Ether");
  }

  receive() external payable {}
}
