// scripts/index.js
const web3 = require('web3')

async function main (callback) {
    try {
      // Our code will go here

      let acc = await web3.eth.getAccounts();
      console.log('-------------');
      const accounts = await web3.accounts;
      console.log(accounts);
    } catch (error) {
      console.log('--------error-------');
      console.error(error);
    }
};

main();