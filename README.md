# Contract-management
# Function Frontend
A Interface to interact with an ATM-like smart contract on the Ethereum blockchain. Users can deposit and withdraw funds, transfer ownership, and manage the contract state.

## Description
In this project, we have integrated smart contract Assessment  with the front end. In the smart contract we created various functions like Deposit, Withdraw, transfer ownership,freezeContract, and unfreezeContract. The contract allows users to deposit and withdraw Ether, check their balance, transfer contract ownership, and freeze/unfreeze the contract. 
## Getting Started
### Executing program
After cloning the github, you will want to do the following to get the code operating on your computer.

1.Inside the project directory, in the terminal type: npm i

2.Open two additional terminals in your VS code

3.In the second terminal type: npx hardhat node

4.In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js

5.Back in the first terminal, enter npm run dev to launch the front-end.

6.After this, the project will be operating on your localhost. Typically at http://localhost:3000/.

After the execution of the undertaking, we can deposit, withdraw eth. Transfer the proprietorship to other owner and lock and unfreeze the contract.
```
function transferOwnership(address payable newOwner) public only_Admin {
        require(newOwner != address(0), "New owner is the zero address");
        owner = newOwner;
    } 
    function freezeContract() public only_Admin {
        frozen = true;
    }
    function unfreezeContract() public only_Admin {
        frozen = false;
    }
```
## Authors

Arpan Kumar
ironextreme5@@gmail.com

## License
This project is licensed under the MIT License - see the LICENSE.md file for details
