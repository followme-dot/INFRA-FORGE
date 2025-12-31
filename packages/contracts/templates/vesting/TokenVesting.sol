// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title TokenVesting
 * @dev Token vesting contract with cliff and linear vesting
 * @author INFRA Dev·Tech
 */
contract TokenVesting is Ownable, ReentrancyGuard {
    IERC20 public token;

    struct VestingSchedule {
        uint256 totalAmount;
        uint256 startTime;
        uint256 cliffDuration;
        uint256 vestingDuration;
        uint256 releasedAmount;
        bool revocable;
        bool revoked;
    }

    mapping(address => VestingSchedule) public vestingSchedules;

    // Events
    event VestingScheduleCreated(
        address indexed beneficiary,
        uint256 amount,
        uint256 startTime,
        uint256 cliffDuration,
        uint256 vestingDuration
    );
    event TokensReleased(address indexed beneficiary, uint256 amount);
    event VestingRevoked(address indexed beneficiary);

    constructor(address _token) Ownable(msg.sender) {
        require(_token != address(0), "TokenVesting: Invalid token address");
        token = IERC20(_token);
    }

    /**
     * @dev Create vesting schedule
     */
    function createVestingSchedule(
        address beneficiary,
        uint256 amount,
        uint256 cliffDuration,
        uint256 vestingDuration,
        bool revocable
    ) external onlyOwner {
        require(beneficiary != address(0), "TokenVesting: Invalid beneficiary");
        require(amount > 0, "TokenVesting: Amount must be > 0");
        require(
            vestingSchedules[beneficiary].totalAmount == 0,
            "TokenVesting: Schedule already exists"
        );

        vestingSchedules[beneficiary] = VestingSchedule({
            totalAmount: amount,
            startTime: block.timestamp,
            cliffDuration: cliffDuration,
            vestingDuration: vestingDuration,
            releasedAmount: 0,
            revocable: revocable,
            revoked: false
        });

        require(
            token.transferFrom(msg.sender, address(this), amount),
            "TokenVesting: Transfer failed"
        );

        emit VestingScheduleCreated(
            beneficiary,
            amount,
            block.timestamp,
            cliffDuration,
            vestingDuration
        );
    }

    /**
     * @dev Release vested tokens
     */
    function release() external nonReentrant {
        VestingSchedule storage schedule = vestingSchedules[msg.sender];
        require(schedule.totalAmount > 0, "TokenVesting: No vesting schedule");
        require(!schedule.revoked, "TokenVesting: Vesting revoked");

        uint256 vested = _vestedAmount(schedule);
        uint256 releasable = vested - schedule.releasedAmount;

        require(releasable > 0, "TokenVesting: No tokens to release");

        schedule.releasedAmount += releasable;

        require(token.transfer(msg.sender, releasable), "TokenVesting: Transfer failed");

        emit TokensReleased(msg.sender, releasable);
    }

    /**
     * @dev Revoke vesting schedule
     */
    function revoke(address beneficiary) external onlyOwner {
        VestingSchedule storage schedule = vestingSchedules[beneficiary];
        require(schedule.totalAmount > 0, "TokenVesting: No vesting schedule");
        require(schedule.revocable, "TokenVesting: Not revocable");
        require(!schedule.revoked, "TokenVesting: Already revoked");

        uint256 vested = _vestedAmount(schedule);
        uint256 refund = schedule.totalAmount - vested;

        schedule.revoked = true;

        if (refund > 0) {
            require(token.transfer(owner(), refund), "TokenVesting: Refund failed");
        }

        emit VestingRevoked(beneficiary);
    }

    /**
     * @dev Calculate vested amount
     */
    function _vestedAmount(VestingSchedule memory schedule)
        private
        view
        returns (uint256)
    {
        if (block.timestamp < schedule.startTime + schedule.cliffDuration) {
            return 0;
        }

        if (block.timestamp >= schedule.startTime + schedule.vestingDuration) {
            return schedule.totalAmount;
        }

        uint256 timeVested = block.timestamp - schedule.startTime;
        return (schedule.totalAmount * timeVested) / schedule.vestingDuration;
    }

    /**
     * @dev Get releasable amount for beneficiary
     */
    function getReleasableAmount(address beneficiary) external view returns (uint256) {
        VestingSchedule memory schedule = vestingSchedules[beneficiary];
        if (schedule.revoked) return 0;

        uint256 vested = _vestedAmount(schedule);
        return vested - schedule.releasedAmount;
    }
}
