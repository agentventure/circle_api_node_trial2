# Circle Developer-Controlled Wallets Tutorial

This tutorial demonstrates how to use **Circle's Developer-Controlled Wallets API** to create and manage cryptocurrency transactions on the Polygon Amoy testnet.

> **Note**: This tutorial is specifically for Circle's **Developer-Controlled Wallets** product, not User-Controlled Wallets. Developer-Controlled Wallets give you full programmatic control over wallet operations through Circle's APIs.

## 📚 Based on Official Circle Documentation

This tutorial follows the official Circle Interactive Quickstart guide:
**[Circle Developer-Controlled Wallets Quickstart](https://developers.circle.com/interactive-quickstarts/dev-controlled-wallets)**

The implementation includes all the key features from the official quickstart:
- ✅ Wallet Set Creation
- ✅ Wallet Creation  
- ✅ Transaction Creation
- ✅ Transaction Monitoring

## Prerequisites

1. **Circle Developer Account** - Sign up at [Circle Developer Console](https://console.circle.com/)
2. **API Credentials** - Get your API Key and Entity Secret from Circle
3. **Node.js** - Version 16 or higher
4. **Existing Wallet** - You need a pre-existing wallet ID with MATIC funds for transactions

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root with your Circle credentials and transaction parameters:

```env
# Circle API Credentials (Required)
CIRCLE_API_KEY=TEST_API_KEY:your_api_key_here
CIRCLE_ENTITY_SECRET=your_entity_secret_here

# Transaction Parameters (Required for transaction creation)
WALLET_ID=your_wallet_id_here
DESTINATION_ADDRESS=0xa46549048f48b1ea335e612f5c6171b132d42130
TOKEN_ID=token_id_from_get_balance_function
AMOUNT=0.001
```

### 3. Update Configuration
- Replace `your_api_key_here` with your actual Circle API key
- Replace `your_entity_secret_here` with your actual Circle entity secret
- Replace `your_wallet_id_here` with an existing wallet ID that has MATIC funds
- Modify `DESTINATION_ADDRESS` and `AMOUNT` as needed

## Running the Tutorial

### Start the Transaction Demo
```bash
npm start
```

This will:
1. Create a token transaction using your environment variables
2. Display transaction details
3. List all transactions for the specified wallet

## What the Tutorial Does

### Current Features (Active)
- ✅ **Transaction Creation**: Creates token transactions on Polygon Amoy testnet
- ✅ **Transaction Monitoring**: Gets transaction details by ID
- ✅ **Transaction History**: Lists all transactions for a wallet
- ✅ **Environment Configuration**: Uses `.env` file for all parameters

### Available Features (Commented Out)
- 🔧 **Wallet Set Creation**: Creates new wallet sets (commented out)
- 🔧 **Wallet Creation**: Creates new wallets within sets (commented out)
- 🔧 **Wallet Management**: Retrieves wallet details and lists all wallets (commented out)

To enable wallet creation features, uncomment the relevant sections in the `main()` function.

## API Functions Available

### Transaction Functions
- `createTransaction(walletId, destinationAddress, amount)` - Creates a new transaction
- `getTransaction(transactionId)` - Gets transaction details by ID
- `listTransactions(walletId)` - Lists transactions for a specific wallet

### Wallet Functions (Available but commented out)
- `createWalletSet()` - Creates a new wallet set
- `createWallet(walletSetId)` - Creates a wallet in a specific set
- `getWallet(walletId)` - Retrieves wallet details by ID
- `listWallets()` - Lists all wallets in your account

## Expected Output

When you run `npm start`, you should see:

```
=== Circle Dev-Controlled Wallets Tutorial ===

=== Creating Transaction ===
Using Wallet ID: your_wallet_id
Destination Address: 0xa46549048f48b1ea335e612f5c6171b132d42130
Amount: 0.001 MATIC
Creating a new transaction...
Transaction created successfully:
{
  "id": "transaction_id_here",
  "state": "INITIATED"
}
Transaction ID: transaction_id_here

=== Getting Transaction Details ===
Transaction details: { ... }

=== Listing Wallet Transactions ===
Transactions list: { ... }
```

## Troubleshooting

### Common Issues

1. **"Please set WALLET_ID, DESTINATION_ADDRESS, and AMOUNT in your .env file"**
   - Ensure all required environment variables are set in `.env`

2. **"Transaction creation failed: Insufficient funds"**
   - Your wallet needs MATIC tokens on Polygon Amoy testnet
   - Get testnet MATIC from a faucet

3. **"API parameter invalid"**
   - Check that your API key and entity secret are correct
   - Ensure the wallet ID exists and belongs to your account

### Getting Testnet MATIC
- Use Polygon Amoy testnet faucets to get test MATIC tokens
- Send testnet MATIC to your wallet address before running transactions

## Technical Details

### Blockchain Network
- **Network**: Polygon Amoy (testnet)
- **Native Token**: MATIC
- **Fee Level**: HIGH (for faster processing)

### Dependencies
- `@circle-fin/developer-controlled-wallets` - Official Circle SDK
- `axios` - HTTP client
- `dotenv` - Environment variable management
- `uuid` - UUID generation for idempotency keys

### Security Best Practices
- ✅ Never commit your `.env` file to version control
- ✅ Keep your API keys and entity secret secure
- ✅ Use testnet for development and testing
- ✅ Validate all input parameters before API calls

## Next Steps

1. **Enable Wallet Creation**: Uncomment wallet creation sections to test full workflow
2. **Add More Tokens**: Modify `TOKEN_ID` to test other supported tokens
3. **Production Setup**: Switch to mainnet credentials for production use
4. **Error Handling**: Enhance error handling for production applications

## Support

- [Circle Developer Documentation](https://developers.circle.com/)
- [Circle Developer Console](https://console.circle.com/)
- [Polygon Amoy Testnet Info](https://polygon.technology/)