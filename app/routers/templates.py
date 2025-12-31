from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()


class Template(BaseModel):
    id: str
    name: str
    description: str
    category: str
    code: str
    language: str = "solidity"
    security_score: int = 100


# Mock templates
TEMPLATES = [
    Template(
        id="erc20-basic",
        name="ERC-20 Token",
        description="Standard ERC-20 token with mint and burn functions",
        category="tokens",
        security_score=95,
        code="""// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor() ERC20("MyToken", "MTK") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}"""
    ),
    Template(
        id="erc721-nft",
        name="ERC-721 NFT Collection",
        description="NFT collection with royalties and metadata",
        category="nft",
        security_score=98,
        code="""// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function tokenURI(uint256 tokenId)
        public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, ERC721URIStorage) returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}"""
    ),
    Template(
        id="staking-basic",
        name="Staking Contract",
        description="Token staking with rewards",
        category="defi",
        security_score=92,
        code="""// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Staking is ReentrancyGuard, Ownable {
    IERC20 public stakingToken;
    uint256 public rewardRate = 100;

    mapping(address => uint256) public stakes;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public lastUpdateTime;

    constructor(address _stakingToken) Ownable(msg.sender) {
        stakingToken = IERC20(_stakingToken);
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Cannot stake 0");
        updateReward(msg.sender);
        stakingToken.transferFrom(msg.sender, address(this), amount);
        stakes[msg.sender] += amount;
    }

    function withdraw(uint256 amount) external nonReentrant {
        require(stakes[msg.sender] >= amount, "Insufficient stake");
        updateReward(msg.sender);
        stakes[msg.sender] -= amount;
        stakingToken.transfer(msg.sender, amount);
    }

    function claimReward() external nonReentrant {
        updateReward(msg.sender);
        uint256 reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        stakingToken.transfer(msg.sender, reward);
    }

    function updateReward(address account) internal {
        if (stakes[account] > 0) {
            rewards[account] += (block.timestamp - lastUpdateTime[account])
                * stakes[account] * rewardRate / 1e18;
        }
        lastUpdateTime[account] = block.timestamp;
    }
}"""
    ),
]


@router.get("/", response_model=List[Template])
async def list_templates():
    """
    Get all available contract templates
    """
    return TEMPLATES


@router.get("/{template_id}", response_model=Template)
async def get_template(template_id: str):
    """
    Get specific template by ID
    """
    for template in TEMPLATES:
        if template.id == template_id:
            return template
    raise HTTPException(status_code=404, detail="Template not found")


@router.get("/category/{category}")
async def get_templates_by_category(category: str):
    """
    Get templates by category
    """
    return [t for t in TEMPLATES if t.category == category]
