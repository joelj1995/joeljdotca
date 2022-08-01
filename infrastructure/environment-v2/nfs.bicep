param location string
param vnetID string
param environmentName string

var subnetRef = '${vnetID}/subnets/default'

resource premiumStorage 'Microsoft.Storage/storageAccounts@2021-09-01' = {
  name: '${environmentName}premiumstorage'
  location: 'canadaeast'
  sku: {
    name: 'Premium_LRS'
    tier: 'Premium'
  }
  kind: 'FileStorage'
  properties: {
    dnsEndpointType: 'Standard'
    defaultToOAuthAuthentication: false
    publicNetworkAccess: 'Enabled'
    allowCrossTenantReplication: false
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: true
    allowSharedKeyAccess: true
    largeFileSharesState: 'Enabled'
    networkAcls: {
      bypass: 'AzureServices'
      virtualNetworkRules: []
      ipRules: []
      defaultAction: 'Allow'
    }
    supportsHttpsTrafficOnly: false
    encryption: {
      requireInfrastructureEncryption: false
      services: {
        file: {
          keyType: 'Account'
          enabled: true
        }
        blob: {
          keyType: 'Account'
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
    accessTier: 'Hot'
  }
}

resource fileShare 'Microsoft.Storage/storageAccounts/fileServices@2021-09-01' = {
  parent: premiumStorage
  name: 'default'
  properties: {
    protocolSettings: {
      smb: {
        multichannel: {
          enabled: false
        }
      }
    }
    cors: {
      corsRules: []
    }
    shareDeleteRetentionPolicy: {
      enabled: false
      days: 0
    }
  }
}

resource privateEndpoint 'Microsoft.Network/privateEndpoints@2020-06-01' = {
  name: 'PrivateEndpoint1'
  location: location
  properties: {
    subnet: {
      id: subnetRef
    }
    privateLinkServiceConnections: [
      {
        properties: {
          privateLinkServiceId: premiumStorage.id
          groupIds: [
            'file'
          ]
        }
        name: 'PrivateEndpoint1'
      }
    ]
  }
}

resource privateDnsZones 'Microsoft.Network/privateDnsZones@2018-09-01' = {
  name: 'privatelink.blob.core.windows.net'
  location: 'global'
  properties: {}
}

resource privateDnsZoneLink 'Microsoft.Network/privateDnsZones/virtualNetworkLinks@2018-09-01' = {
  name: '${privateDnsZones.name}/${privateDnsZones.name}-link'
  location: 'global'
  properties: {
    registrationEnabled: false
    virtualNetwork: {
      id: vnetID
    }
  }
}

resource privateDnsZoneGroup 'Microsoft.Network/privateEndpoints/privateDnsZoneGroups@2020-06-01' = {
  name: '${privateEndpoint.name}/dnsgroupname'
  properties: {
    privateDnsZoneConfigs: [
      {
        name: 'config1'
        properties: {
          privateDnsZoneId: privateDnsZones.id
        }
      }
    ]
  }
}
