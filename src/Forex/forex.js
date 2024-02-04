document.addEventListener('DOMContentLoaded', function () {
  var accounts;

  var connectButton = document.getElementById('connectButton');

  var sendButton = document.getElementById('sendButton');
  var recipientAddressInput = document.getElementById('recipientAddress');
  var amountInput = document.getElementById('amountToSend');
  var networkSelect = document.getElementById('networkSelect');
  var switchNetworkButton = document.getElementById('switchNetworkButton');





  // Handle Connect button click event
  connectButton.addEventListener('click', function () {
    try {
      // Request account access if needed
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(function (result) {
          accounts = result;

          //  code for handling the connected wallet goes here
          var selectedAccount = accounts[0];
          alert('Connected to MetaMask with address: ' + selectedAccount);

          // Show the connected section
          connectButton.style.display = 'none';
          sendButton.style.display = 'block';
          switchNetworkButton.style.display='block';
        })
        .catch(function (error) {
          // Handle errors or user rejection
          console.error('Error connecting to MetaMask:', error.message);
        });
    } catch (error) {
      // Handle errors or user rejection
      console.error('Error connecting to MetaMask:', error.message);
    }
  });

  
                   //network switch

  // Handle Switch Network button click event
  switchNetworkButton.addEventListener('click', function () {
    try {
      var selectedNetwork = networkSelect.value;

      // Request to switch to the selected network
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: getChainId(selectedNetwork) }],
      })
        .then(function () {
          alert('Switched to ' + selectedNetwork + ' network');
        })
        .catch(function (error) {
          // Handle network switch errors
          console.error('Error switching network:', error.message);
        });
    } catch (error) {
      // Handle errors or user rejection
      console.error('Error switching network:', error.message);
    }
  });

  // Listen for chain changes (optional)
  window.ethereum.on('chainChanged', function (chainId) {
    // Handle chain changes if needed
    console.log('Chain changed:', chainId);
  });

  // Helper function to get chain ID from network name
  function getChainId(network) {
    switch (network) {  
      case 'mainnet':
        return '0x1';
      case 'goerli':
        return '0x5';
      case 'matic':
        return '0x89'; // Polygon (Matic) chain ID
      case 'arbitrum':
        return '0xa4b1'; // Arbitrum chain ID
      case 'optimism':
        return '0xa '; // Optimism chain ID
        case 'polygon_l2': 
        return '0x44d'; // Polygom L2

      default:
        return '0x1'; // Default to Mainnet
    }
  }
});