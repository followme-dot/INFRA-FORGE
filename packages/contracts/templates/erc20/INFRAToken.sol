// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title INFRAToken
 * @dev ERC20 Token with burn, pause, and anti-bot features
 * @author INFRA Dev·Tech
 */
contract INFRAToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable {
    // Anti-bot protection
    mapping(address => uint256) private _lastTxBlock;
    bool public antiBotEnabled = true;

    // Events
    event AntiBotToggled(bool enabled);

    /**
     * @dev Constructor that gives msg.sender all of initial supply
     */
    constructor() ERC20("INFRA Token", "INFRA") Ownable(msg.sender) {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    /**
     * @dev Modifier to prevent bot transactions
     */
    modifier antiBot() {
        if (antiBotEnabled) {
            require(
                block.number > _lastTxBlock[msg.sender],
                "INFRAToken: Same block transfer detected"
            );
            _lastTxBlock[msg.sender] = block.number;
        }
        _;
    }

    /**
     * @dev Toggle anti-bot protection
     */
    function toggleAntiBot() external onlyOwner {
        antiBotEnabled = !antiBotEnabled;
        emit AntiBotToggled(antiBotEnabled);
    }

    /**
     * @dev Pause token transfers
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause token transfers
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Override transfer to include anti-bot
     */
    function transfer(address to, uint256 amount)
        public
        override
        antiBot
        returns (bool)
    {
        return super.transfer(to, amount);
    }

    /**
     * @dev Override transferFrom to include anti-bot
     */
    function transferFrom(address from, address to, uint256 amount)
        public
        override
        antiBot
        returns (bool)
    {
        return super.transferFrom(from, to, amount);
    }

    /**
     * @dev Required override for _update function
     */
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }
}
