# React IMDB Clone - Azure Deployment

This project is a React-based IMDB clone that can be deployed to Azure Static Web App using Infrastructure as Code (Bicep) and GitHub Actions for CI/CD.

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

## GitHub Actions Setup

### Required Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

#### 1. AZURE_CREDENTIALS

Create a service principal and get the credentials:

```powershell
az ad sp create-for-rbac `
  --name "imdb-clone-sp" `
  --role Contributor `
  --scopes /subscriptions/YOUR_SUBSCRIPTION_ID `
  --sdk-auth
```

Copy the entire JSON output and paste it as the secret value for `AZURE_CREDENTIALS`.

#### 2. RESOURCE_GROUP_NAME

Set this to the name of the resource group you want to use (e.g., `imdb-clone-rg`).

#### 3. STATIC_WEB_APP_NAME

Choose a globally unique name for your Static Web App (e.g., `my-imdb-clone-12345`). Static Web App names must be unique across all Azure customers worldwide. Use a combination of your project name, a random number, or your username to ensure uniqueness.

**Important:** Do not use generic names like `imdb-clone` as they are likely already taken. Check availability by attempting to create the resource or use a unique identifier.

### Workflow Triggers

The deployment workflow runs automatically on:

- Pushes to the `main` branch
- Manual trigger via GitHub Actions UI

## Local Development

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
