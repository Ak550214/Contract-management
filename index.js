import { useState, useEffect } from "react";
import { ethers } from "ethers";
import assessmentABI from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [wallet, setWallet] = useState(undefined);
  const [userAccount, setUserAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [userBalance, setUserBalance] = useState(undefined);
  const [newAdministrator, setNewAdministrator] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [contractFrozen, setContractFrozen] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contractABI = assessmentABI.abi;

  const initializeWallet = async () => {
    if (window.ethereum) {
      setWallet(window.ethereum);
    }

    if (wallet) {
      const accounts = await wallet.request({ method: "eth_accounts" });
      handleUserAccount(accounts);
    }
  };

  const handleUserAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Connected account: ", accounts[0]);
      setUserAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectUserAccount = async () => {
    if (!wallet) {
      alert('MetaMask is required to connect');
      return;
    }

    const accounts = await wallet.request({ method: 'eth_requestAccounts' });
    handleUserAccount(accounts);

    initializeContract();
  };

  const initializeContract = () => {
    const provider = new ethers.providers.Web3Provider(wallet);
    const signer = provider.getSigner();
    const deployedContract = new ethers.Contract(contractAddress, contractABI, signer);

    setContract(deployedContract);
  };

  const fetchBalance = async () => {
    if (contract) {
      const balance = await contract.getBalance();
      setUserBalance(ethers.utils.formatEther(balance));
    }
  };

  const depositFunds = async () => {
    if (contract) {
      let transaction = await contract.deposit(ethers.utils.parseEther(transactionAmount));
      await transaction.wait();
      fetchBalance();
    }
  };

  const withdrawFunds = async () => {
    if (contract) {
      let transaction = await contract.withdraw(ethers.utils.parseEther(transactionAmount));
      await transaction.wait();
      fetchBalance();
    }
  };

  const changeOwnership = async () => {
    if (contract) {
      let transaction = await contract.transferOwnership(newAdministrator);
      await transaction.wait();
    }
  };

  const freezeContract = async () => {
    if (contract) {
      let transaction = await contract.freezeContract();
      await transaction.wait();
      setContractFrozen(true);
    }
  };

  const unfreezeContract = async () => {
    if (contract) {
      let transaction = await contract.unfreezeContract();
      await transaction.wait();
      setContractFrozen(false);
    }
  };

  const renderUserInterface = () => {
    if (!wallet) {
      return <p>Please install MetaMask to use this application.</p>
    }

    if (!userAccount) {
      return <button onClick={connectUserAccount}>Connect MetaMask Wallet</button>
    }

    if (userBalance === undefined) {
      fetchBalance();
    }

    return (
      <div>
        <p>Account: {userAccount}</p>
        <p>Balance: {userBalance} ETH</p>
        <input
          type="text"
          placeholder="Amount (ETH)"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
        />
        <button onClick={depositFunds}>Deposit</button>
        <button onClick={withdrawFunds}>Withdraw</button>
        <br /><br />
        <input
          type="text"
          placeholder="New administrator address"
          value={newAdministrator}
          onChange={(e) => setNewAdministrator(e.target.value)}
        />
        <button onClick={changeOwnership}>Change Ownership</button>
        <br /><br />
        <button onClick={freezeContract} disabled={contractFrozen}>Freeze Contract</button>
        <button onClick={unfreezeContract} disabled={!contractFrozen}>Unfreeze Contract</button>
      </div>
    );
  };

  useEffect(() => {
    initializeWallet();
  }, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Smart Contract Interface!</h1></header>
      {renderUserInterface()}
      <style jsx>{`
        .container {
          text-align: center;
          margin: 0 auto;
          padding: 20px;
          max-width: 1000px;
          background-image: url('https://cdn.gencraft.com/prod/user/a0ae7548-5a92-4720-87fa-546a2865cf98/8d5c3ca7-69e0-4aee-bfe6-1773f0f8533a/image/image1_0.jpg?Expires=1718603189&Signature=J4ThUKMXmkyAtj~ucITG5xluEcMTDhb2kaA~rbfRqVYB3ejY97K32R~UNeI-S4feHQZpBupRuGppoFT-g9FawmAZ5WfPzI~UlKoT9l1K7f9lxA3h5J5NsCT-e7Zy8v6B3nbmXlqLm-Mz3mMrBkXED6n4tws5QO5Gcx9teoaYigtFzaiLTqLSVzOwBmoFOALngkwVYnejf0f1denP-uNxzhH6r~S6GSohMdMKTt-0gFAGTP4pprlxe5e~AGHntXRtoeYVAbBoQiijlNWIUlkgocwmiDKwx8tYBOxUqs8nZo-UbBiqtg~JZUvYChwV-5Q8oAvg7eLmr9gSNEoDi2GBVg__&Key-Pair-Id=K3RDDB1TZ8BHT8');
          background-size: cover;
          background-position: center;
          height: 80vh;
          color: white;
          font-family: 'Algerian';
        }
      `}</style>
    </main>
  );
}
