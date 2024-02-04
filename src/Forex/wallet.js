  let web3;

          async function toggleWalletConnection() {
              try {
                  // Check if WalletConnect provider is available
                  if (window.ethereum) {
                      if (!web3) {
                          // Create a new Web3 instance using WalletConnect provider
                          web3 = new Web3(window.ethereum);

                          // Request account access
                          await window.ethereum.request({ method: 'eth_requestAccounts' });

                          // Get the connected accounts
                          const accounts = await web3.eth.getAccounts();

                          if (accounts.length > 0) {
                              // Display the first account (assuming only one account is connected)
                              const address = accounts[0];
                              // Update button text with short address
                              document.getElementById('wallet-connect').textContent = 'Connected: ' + address.substring(0, 8) + '...';
                          } else {
                              alert("No account connected.");
                          }
                      } else {
                          // Close the current session
                          await web3.currentProvider.close();
                          
                          // Clear the displayed address
                      

                          // Update button text
                          document.getElementById('wallet-connect').textContent = 'Connect Wallet';
                          web3 = null;
                      }
                  } else {
                      alert("WalletConnect is not available.");
                  }
              } catch (error) {
                  console.error(error);
                
              }
          }

          document.addEventListener('DOMContentLoaded', function () {
          var accounts;

          var networkSelect = document.getElementById('networkSelect');
          var switchNetworkButton = document.getElementById('switchNetworkButton');
        

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
