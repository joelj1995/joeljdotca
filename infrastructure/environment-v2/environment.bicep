param location string = resourceGroup().location

var environmentName = 'joeljcav2'

resource wordpressPublicIP 'Microsoft.Network/publicIPAddresses@2020-11-01' = {
  name: '${environmentName}wpip'
  location: location
  sku: {
    name: 'Basic'
  }
}

resource wordpressStorage 'Microsoft.Storage/storageAccounts@2021-09-01' = {
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
