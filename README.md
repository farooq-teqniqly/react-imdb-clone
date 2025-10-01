# Cypto Dash App - Azure Deployment

Crypto Dash is a React-based crypto currency dashboard that can be deployed to Azure Static Web App using Infrastructure as Code (Bicep) and GitHub Actions for CI/CD.

## Prerequisites

- Azure CLI installed (`winget install Microsoft.AzureCLI` or download from Microsoft)
- Azure subscription
- GitHub repository with this code

## Manual Infrastructure Deployment

If you prefer to deploy the infrastructure manually before enabling CI/CD:

### 1. Login to Azure

```powershell
az login
```

### 2. Deploy Bicep Template

Replace `myResourceGroup` with your desired resource group name and `myUniqueAppName` with a globally unique Static Web App name:

```powershell
az deployment sub create `
  --name "swa-deployment-$(Get-Date -Format 'yyyyMMddHHmmss')" `
  --location westus2 `
  --template-file infra/main.bicep `
  --parameters resourceGroupName=myResourceGroup staticWebAppName=myUniqueAppName
```

This will create:

- Resource group (if it doesn't exist)
- Azure Static Web App with your specified unique name

## Manual App Deployment

After creating the infrastructure, you can deploy your app manually using PowerShell:

### Manual App Deployment Prerequisites

- Azure CLI logged in (`az login`)
- Static Web App already created (via Bicep or portal)
- Node.js and npm installed

### Deploy Using PowerShell Script

```powershell
# Run the deployment script with your parameters
.\deploy-app.ps1 -ResourceGroupName "your-resource-group" -StaticWebAppName "your-unique-app-name"
```

The script will:

1. Build your React application
2. Retrieve the deployment token from Azure
3. Create a deployment package
4. Upload it to your Static Web App
5. Display the live URL upon success

### Manual Deployment Steps

If you prefer to do it step-by-step:

```powershell
# 1. Build the app
npm run build

# 2. Get deployment token
$token = az staticwebapp secrets list --name "your-app-name" --resource-group "your-rg" --query "properties.apiKey" -o tsv

# 3. Create zip
Compress-Archive -Path "dist/*" -DestinationPath "dist.zip" -Force

# 4. Deploy
Invoke-WebRequest -Uri "https://$token@your-app-name.scm.azurewebsites.net/api/zipdeploy" -Method POST -InFile "dist.zip" -ContentType "application/zip"
```

## GitHub Actions Setup

### Required Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

#### 1. AZURE_CREDENTIALS

Create a service principal and get the credentials:

```powershell
az ad sp create-for-rbac `
  --name "crypto-dash-app-sp" `
  --role Contributor `
  --scopes /subscriptions/YOUR_SUBSCRIPTION_ID `
  --sdk-auth
```

Copy the entire JSON output and paste it as the secret value for `AZURE_CREDENTIALS`.

#### 2. RESOURCE_GROUP_NAME

Set this to the name of the resource group you want to use (e.g., `crypto-dash-rg`).

#### 3. STATIC_WEB_APP_NAME

Choose a globally unique name for your Static Web App (e.g., `my-crypto-dash-12345`). Static Web App names must be unique across all Azure customers worldwide. Use a combination of your project name, a random number, or your username to ensure uniqueness.

**Important:** Do not use generic names like `crypto-dash` as they are likely already taken. Check availability by attempting to create the resource or use a unique identifier.

#### 4. VITE_API_BASE_URL

Set this to the CoinGecko API base URL:

```text
https://api.coingecko.com/api/v3/coins/markets
```

#### 5. VITE_API_COIN_DETAILS_URL

Set this to the CoinGecko API coin details URL:

```text
https://api.coingecko.com/api/v3/coins
```

#### 6. VITE_API_KEY

Set this to your CoinGecko API key. Get your API key from:

1. Visit [CoinGecko API](https://www.coingecko.com/en/api)
2. Sign up for a free account
3. Generate an API key from your dashboard
4. Copy the API key and paste it as the secret value

**Note:** These environment variables are needed during the build process so Vite can embed them into your application bundle.

### Workflow Triggers

The deployment workflow runs automatically on:

- Pushes to the `main` branch
- Manual trigger via GitHub Actions UI

## Local Development

### Environment Variables

This project requires environment variables for the CoinGecko API. Create a `.env` file in the root directory:

```bash
VITE_API_BASE_URL="https://api.coingecko.com/api/v3/coins/markets"
VITE_API_COIN_DETAILS_URL="https://api.coingecko.com/api/v3/coins/"
VITE_API_KEY="Your Coin Gecko API Key"
```

### Running the Application

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The built files are output to the `dist/` directory.

## Architecture

- **Frontend**: React + Vite
- **Infrastructure**: Azure Static Web App (Free tier)
- **CI/CD**: GitHub Actions
- **IaC**: Azure Bicep
