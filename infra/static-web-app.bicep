@description('Name of the Static Web App')
param staticWebAppName string

@description('Location for the Static Web App')
param location string

resource staticWebApp 'Microsoft.Web/staticSites@2022-09-01' = {
  name: staticWebAppName
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    repositoryUrl: ''
    branch: 'main'
    buildProperties: {
      appLocation: '/'
      apiLocation: ''
      outputLocation: '/dist'
      appBuildCommand: 'npm run build'
      apiBuildCommand: ''
      skipAppBuild: false
    }
    templateProperties: {
      isGitHubActionEnabled: true
    }
  }
}

output staticWebAppId string = staticWebApp.id
output staticWebAppDefaultHostname string = staticWebApp.properties.defaultHostname
