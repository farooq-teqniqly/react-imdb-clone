param(
    [Parameter(Mandatory=$true)]
    [string]$ResourceGroupName,

    [Parameter(Mandatory=$true)]
    [string]$StaticWebAppName
)

Write-Host "Starting manual deployment to Azure Static Web App..." -ForegroundColor Green

# Check if Azure CLI is logged in
$account = az account show 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Error "Please login to Azure CLI first using 'az login'"
    exit 1
}

# Build the application
Write-Host "Building the application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed"
    exit 1
}

# Get deployment token
Write-Host "Retrieving deployment token..." -ForegroundColor Yellow
$token = az staticwebapp secrets list --name $StaticWebAppName --resource-group $ResourceGroupName --query "properties.apiKey" -o tsv
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to retrieve deployment token. Make sure the Static Web App exists and you have permissions."
    exit 1
}

# Create zip file
Write-Host "Creating deployment package..." -ForegroundColor Yellow
$zipPath = "dist.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}
Compress-Archive -Path "dist/*" -DestinationPath $zipPath -Force

# Deploy
Write-Host "Deploying to Azure Static Web App..." -ForegroundColor Yellow
$uri = "https://$token@$StaticWebAppName.scm.azurewebsites.net/api/zipdeploy"

try {
    $response = Invoke-WebRequest -Uri $uri -Method POST -InFile $zipPath -ContentType "application/zip" -TimeoutSec 300
    if ($response.StatusCode -eq 200) {
        Write-Host "Deployment successful!" -ForegroundColor Green

        # Get the app URL
        $appInfo = az staticwebapp show --name $StaticWebAppName --resource-group $ResourceGroupName --query "defaultHostname" -o tsv
        Write-Host "Your app is available at: https://$appInfo" -ForegroundColor Cyan
    } else {
        Write-Error "Deployment failed with status code: $($response.StatusCode)"
        exit 1
    }
} catch {
    Write-Error "Deployment failed: $($_.Exception.Message)"
    exit 1
} finally {
    # Clean up
    if (Test-Path $zipPath) {
        Remove-Item $zipPath -Force
    }
}

Write-Host "Manual deployment completed." -ForegroundColor Green
