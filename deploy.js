//Explicit Hardhat Runtime Environment (HRE) Requirement:

//Including the Hardhat Runtime Environment explicitly is optional but can be useful.
//Useful for executing the script in a standalone context with the node <script> command.
//Launching Script with Hardhat:Scripts can also be launched using the npx hardhat run <script> command.
//Automatic Compilation:When using the npx hardhat run <script> command, Hardhat will automatically compile your contracts if they are not already compiled.
//Global Scope Enhancement:

//The npx hardhat run <script> command adds the Hardhat Runtime Environment's members to the global scope.
//This provides simple access to Hardhat's functionalities within the script.
//Script Execution:After compiling the contracts and adding the Hardhat Runtime Environment's members to the global scope, Hardhat executes the script.
const hre = require("hardhat");

async function main() {
  const initBalance = 1;
  const Assessment = await hre.ethers.getContractFactory("Assessment");
  const assessment = await Assessment.deploy(initBalance);
  await assessment.deployed();

  console.log(`A contract with balance of ${initBalance} eth deployed to ${assessment.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
