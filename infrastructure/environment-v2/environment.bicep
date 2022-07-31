param location string = resourceGroup().location

var environmentName = 'joeljcav2'

resource wordpressVM 'Microsoft.Storage/storageAccounts@2021-09-01' = {
  name: '${environmentName}wpnfs'
  location: location
  sku: {
    name: 'Premium_LRS'
  }
  kind: 'FileStorage'
  properties: {
    accessTier: 'Hot'
  }
}
