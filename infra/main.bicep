targetScope = 'subscription'

@description('Name of the resource group')
param resourceGroupName string

@description('Location for the resources')
param location string = 'westus2'

@description('Name of the Static Web App (must be globally unique)')
param staticWebAppName string

resource resourceGroup 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: resourceGroupName
  location: location
}

module staticWebApp './static-web-app.bicep' = {
  name: 'staticWebAppDeployment'
  scope: resourceGroup
  params: {
    staticWebAppName: staticWebAppName
    location: location
  }
}
