//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./MinionNFT.sol";
import "./RuneCredit.sol";

contract Game {
  address public immutable owner;
  bool public premium = false;
  uint256 public totalCounter = 0;
  mapping(address => uint) public userGreetingCounter;

  MinionNFT public minionNFT;
  RuneCredit public runeCredit;

  constructor(
    address _owner,
    address _minionNFTAddress,
    address _runeCreditAddress
  ) {
    owner = _owner;
    minionNFT = MinionNFT(_minionNFTAddress);
    runeCredit = RuneCredit(_runeCreditAddress);
  }

  modifier isOwner() {
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  function createMinion(string memory _tokenURI) public {
    minionNFT.mint(msg.sender, _tokenURI);
    runeCredit.mint(msg.sender, 10000000000000000000000);
  }

  function withdraw() public isOwner {
    (bool success, ) = owner.call{ value: address(this).balance }("");
    require(success, "Failed to send Ether");
  }


  receive() external payable {}
}
