


// Check if MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
  window.web3 = new Web3(window.ethereum);
  window.ethereum.enable(); 
} else {
  alert("Please install Forex Pay to use this application.");
}

async function initiateTransaction() {
  try {
      const recipientAddress = document.getElementById('recipientAddress').value;
      const amount = document.getElementById('amountToSend').value;

     // Convert amount to wei (1 Ether = 1e18 wei)
     const amountWei = window.web3.utils.toWei(amount, 'ether');

     // Get the selected account from MetaMask
     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
     const senderAddress = accounts[0];

     // Create a transaction object
     const transactionObject = {
         to: recipientAddress,
         value: amountWei,
         from: senderAddress,
     };

     // Send the transaction
     const transactionHash = await window.web3.eth.sendTransaction(transactionObject);
     console.log(`Transaction sent: ${transactionHash}`);
     // Open a new window with the Etherscan transaction page
     const etherscanUrl = `https://goerli.etherscan.io/tx/${transactionHash}`;
     window.open(etherscanUrl, '_blank');

     alert(`Transaction sent successfully!\nTransaction Hash: ${transactionHash}`);
 } catch (error) {
     console.error(error);
     alert(`Error: ${error.message}`);
 }
}