// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MinionNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  mapping(address => Minion[]) public userMinion;

  constructor() ERC721("Block Mage Minions", "BMM") {}
  
  struct Minion {
    uint256 id;
    string url;
  }

  function mint(address _to, string memory _tokenURI) public returns (uint256) {
    uint256 newItemId = _tokenIds.current();
    _mint(_to, newItemId);
    _setTokenURI(newItemId, _tokenURI);

     userMinion[_to].push(Minion(newItemId, _tokenURI));
    _tokenIds.increment();
    return newItemId;
  }

  function getMyNFTs(address _owner) public view returns (Minion[] memory){
    return userMinion[_owner];
  }
}
