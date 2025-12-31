// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title INFRANFT
 * @dev NFT Collection with royalties and metadata
 * @author INFRA Dev·Tech
 */
contract INFRANFT is ERC721, ERC721URIStorage, ERC721Royalty, Ownable {
    uint256 private _tokenIdCounter;
    uint256 public maxSupply;
    uint96 public royaltyFee = 500; // 5% in basis points

    // Events
    event NFTMinted(address indexed to, uint256 indexed tokenId, string uri);
    event RoyaltyFeeUpdated(uint96 newFee);

    constructor(
        string memory name,
        string memory symbol,
        uint256 _maxSupply
    ) ERC721(name, symbol) Ownable(msg.sender) {
        maxSupply = _maxSupply;
        _setDefaultRoyalty(msg.sender, royaltyFee);
    }

    /**
     * @dev Mint new NFT
     */
    function safeMint(address to, string memory uri) public onlyOwner {
        require(_tokenIdCounter < maxSupply, "INFRANFT: Max supply reached");

        uint256 tokenId = _tokenIdCounter++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit NFTMinted(to, tokenId, uri);
    }

    /**
     * @dev Batch mint multiple NFTs
     */
    function batchMint(address to, string[] memory uris) external onlyOwner {
        require(
            _tokenIdCounter + uris.length <= maxSupply,
            "INFRANFT: Would exceed max supply"
        );

        for (uint256 i = 0; i < uris.length; i++) {
            safeMint(to, uris[i]);
        }
    }

    /**
     * @dev Update royalty fee
     */
    function setRoyaltyFee(uint96 _royaltyFee) external onlyOwner {
        require(_royaltyFee <= 1000, "INFRANFT: Fee too high"); // Max 10%
        royaltyFee = _royaltyFee;
        _setDefaultRoyalty(owner(), royaltyFee);
        emit RoyaltyFeeUpdated(_royaltyFee);
    }

    /**
     * @dev Get total minted
     */
    function totalMinted() external view returns (uint256) {
        return _tokenIdCounter;
    }

    // Required overrides
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, ERC721Royalty)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
