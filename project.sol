// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Evaluation {
    address payable public administrator;
    uint256 public currentBalance;
    bool public isFrozen = false;

    event FundsDeposited(uint256 amount);
    event FundsWithdrawn(uint256 amount);

    constructor(uint initialBalance) payable {
        administrator = payable(msg.sender);
        currentBalance = initialBalance;
    }

    modifier only_Admin() {
        require(msg.sender == administrator, "UNAUTHORISED ACCESS");
        _;
    }

    modifier notFrozen() {
        require(!isFrozen, "This contract have been frozen");
        _;
    }

    function getCurrentBalance() public view returns (uint256) {
        return currentBalance;
    }

    function depositFunds(uint256 _amount) public payable only_Admin notFrozen {
        uint _previousBalance = currentBalance;

        // perform transaction
        currentBalance += _amount;

        assert(currentBalance == _previousBalance + _amount);

   
        emit FundsDeposited(_amount);
    }
    error InsufficientFunds(uint256 currentBalance, uint256 withdrawAmount);

    function withdrawFunds(uint256 _withdrawAmount) public only_Admin notFrozen {
        uint _previousBalance = currentBalance;
        if (currentBalance < _withdrawAmount) {
            revert InsufficientFunds({
                currentBalance: currentBalance,
                withdrawAmount: _withdrawAmount
            });
        }
        currentBalance -= _withdrawAmount;
        assert(currentBalance == (_previousBalance - _withdrawAmount));
        emit FundsWithdrawn(_withdrawAmount);
    }

    function transferAdminRights(address payable newAdmin) public only_Admin {
        require(newAdmin != address(0), "New administrator is the address");
        administrator = newAdmin;
    }

    function freezeContract() public only_Admin {
        isFrozen = true;
    }

    function unfreezeContract() public only_Admin {
        isFrozen = false;
    }
}
