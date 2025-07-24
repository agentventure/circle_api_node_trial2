require('dotenv').config();
const axios = require('axios');
const { initiateDeveloperControlledWalletsClient } = require('@circle-fin/developer-controlled-wallets');
const { v4: uuidv4 } = require('uuid');

// Circle API configuration
const CIRCLE_API_KEY = process.env.CIRCLE_API_KEY;
const CIRCLE_ENTITY_SECRET = process.env.CIRCLE_ENTITY_SECRET;
const BASE_URL = 'https://api.circle.com/v1/w3s';

// Initialize the Circle client
const circleClient = initiateDeveloperControlledWalletsClient({
  apiKey: CIRCLE_API_KEY,
  entitySecret: CIRCLE_ENTITY_SECRET
});

// Function to create a wallet set
async function createWalletSet() {
  try {
    console.log('Creating a new wallet set...');
    
    const response = await circleClient.createWalletSet({
      idempotencyKey: uuidv4(),
      name: `WalletSet-${Date.now()}`
    });

    console.log('Wallet set created successfully:');
    console.log(JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error('Error creating wallet set:', error.response?.data || error.message);
    throw error;
  }
}

// Function to create a wallet
async function createWallet(walletSetId) {
  try {
    console.log('Creating a new wallet...');
    
    const response = await circleClient.createWallets({
      idempotencyKey: uuidv4(),
      count: 1,
      blockchains: ['MATIC-AMOY'], // Using Polygon Amoy testnet
      walletSetId: walletSetId
    });

    console.log('Wallet created successfully:');
    console.log(JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error('Error creating wallet:', error.response?.data || error.message);
    throw error;
  }
}

// Function to get wallet details
async function getWallet(walletId) {
  try {
    console.log(`Getting wallet details for ID: ${walletId}`);
    
    const response = await circleClient.getWallet({
      id: walletId
    });

    console.log('Wallet details:');
    console.log(JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error('Error getting wallet:', error.response?.data || error.message);
    throw error;
  }
}

// Function to list all wallets
async function listWallets() {
  try {
    console.log('Listing all wallets...');
    
    const response = await circleClient.listWallets({});

    console.log('Wallets list:');
    console.log(JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error('Error listing wallets:', error.response?.data || error.message);
    throw error;
  }
}

// Function to create a transaction
async function createTransaction(walletId, destinationAddress, amount) {
  try {
    console.log('Creating a new transaction...');
    
    const tokenId = process.env.TOKEN_ID || 'MATIC'; // Use TOKEN_ID from env or default to MATIC
    
    const response = await circleClient.createTransaction({
      walletId: walletId,
      tokenId: tokenId,
      destinationAddress: destinationAddress,
      amounts: [amount],
      fee: {
        type: 'level',
        config: {
          feeLevel: 'HIGH'
        }
      }
    });

    console.log('Transaction created successfully:');
    console.log(JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error('Error creating transaction:', error.response?.data || error.message);
    throw error;
  }
}

// Function to get transaction details
async function getTransaction(transactionId) {
  try {
    console.log(`Getting transaction details for ID: ${transactionId}`);
    
    const response = await circleClient.getTransaction({
      id: transactionId
    });

    console.log('Transaction details:');
    console.log(JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error('Error getting transaction:', error.response?.data || error.message);
    throw error;
  }
}

// Function to list transactions for a wallet
async function listTransactions(walletId) {
  try {
    console.log(`Listing transactions for wallet ID: ${walletId}`);
    
    const response = await circleClient.listTransactions({
      walletIds: [walletId]
    });

    console.log('Transactions list:');
    console.log(JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error('Error listing transactions:', error.response?.data || error.message);
    throw error;
  }
}

// Main function to demonstrate the wallet operations
async function main() {
  try {
    // Check if API key and entity secret are configured
    if (!CIRCLE_API_KEY || !CIRCLE_ENTITY_SECRET) {
      console.error('Please set CIRCLE_API_KEY and CIRCLE_ENTITY_SECRET in your .env file');
      return;
    }

    console.log('=== Circle Dev-Controlled Wallets Tutorial ===\n');

    // COMMENTED OUT: Wallet creation parts
    // Step 1: Create a wallet set first
    // console.log('=== Creating Wallet Set ===');
    // const walletSetResponse = await createWalletSet();
    // const walletSetId = walletSetResponse.walletSet.id;
    // console.log(`Wallet Set ID: ${walletSetId}`);

    // Step 2: Create a new wallet using the wallet set
    // console.log('\n=== Creating Wallet ===');
    // const walletResponse = await createWallet(walletSetId);
    // const walletId = walletResponse.wallets[0].id;
    
    // console.log('\n=== Wallet Created ===');
    // console.log(`Wallet ID: ${walletId}`);

    // Step 3: Get wallet details
    // console.log('\n=== Getting Wallet Details ===');
    // await getWallet(walletId);

    // Step 4: List all wallets
    // console.log('\n=== Listing All Wallets ===');
    // await listWallets();

    // Step 5: Create a transaction using environment variables
    console.log('=== Creating Transaction ===');
    
    try {
      // Use environment variables for transaction parameters
      const walletId = process.env.WALLET_ID;
      const destinationAddress = process.env.DESTINATION_ADDRESS;
      const amount = process.env.AMOUNT;
      
      if (!walletId || !destinationAddress || !amount) {
        console.error('Please set WALLET_ID, DESTINATION_ADDRESS, and AMOUNT in your .env file');
        return;
      }
      
      console.log(`Using Wallet ID: ${walletId}`);
      console.log(`Destination Address: ${destinationAddress}`);
      console.log(`Amount: ${amount} MATIC`);
      
      const transactionResponse = await createTransaction(walletId, destinationAddress, amount);
      const transactionId = transactionResponse.id;
      
      console.log(`Transaction ID: ${transactionId}`);
      
      // Step 6: Get transaction details
      console.log('\n=== Getting Transaction Details ===');
      await getTransaction(transactionId);
      
    } catch (transactionError) {
      console.log('Transaction creation failed:', transactionError.message);
    }

    // Step 7: List transactions for the wallet
    console.log('\n=== Listing Wallet Transactions ===');
    const walletId = process.env.WALLET_ID;
    if (walletId) {
      await listTransactions(walletId);
    }

  } catch (error) {
    console.error('Tutorial failed:', error.message);
  }
}

// Run the tutorial
if (require.main === module) {
  main();
}

module.exports = {
  createWalletSet,
  createWallet,
  getWallet,
  listWallets,
  createTransaction,
  getTransaction,
  listTransactions
};