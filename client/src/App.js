import logo from './logo.svg';
import './App.css';
import Web3 from "web3"
import React, {useEffect, useState} from 'react'
const FALLBACK_WEB3_PROVIDER = 'http://0.0.0.0:8545';








const displayGreeting = async (greeting, contract) => {
  greeting = await contract.methods.sayHello().call();
  return greeting;
};

const updateGreeting = (greeting, contract, accounts) => {
  let input;
  $("#input").on("change", (e) => {
    input = e.target.value;
  });
  $("#form").on("submit", async (e) => {
    e.preventDefault();
    await contract.methods
      .updateGreeting(input)
      .send({ from: accounts[0], gas: 40000 });
    displayGreeting(greeting, contract);
  });
};

// async function greetingApp() {
//   const web3 = await getWeb3();
//   const accounts = await web3.eth.getAccounts();
//   const contract = await getContract(web3);
//   let greeting;

//   displayGreeting(greeting, contract);
//   updateGreeting(greeting, contract, accounts);
// }

// greetingApp();

function App() {

  const [web3, setWeb3] = useState();
  const [greeting, setGreeting] = useState();


  const getContract = async (web3) => {

    const data = {};
    // eslint-disable-next-line no-const-assign
    data = require('../../build/contracts/Greeting.json');
  
    const netId = await web3.eth.net.getId();
    const deployedNetwork = data.networks[netId];
    const greeting = new web3.eth.Contract(
      data.abi,
      deployedNetwork && deployedNetwork.address
    );
    return greeting;
  };


  const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          FALLBACK_WEB3_PROVIDER
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Infura/Local web3.");
        resolve(web3);
      }
    });
  });

  useEffect( () =>{
    async function get_web3 () {
      await getWeb3();
    }
    setWeb3(get_web3()); 
    setGreeting((getContract(web3);
  }, [])

  


  return (
    <div className="App">
      
    </div>
  );
}

export default App;
