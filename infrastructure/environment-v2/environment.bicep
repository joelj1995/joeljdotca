param location string = resourceGroup().location
param serviceUserName string = 'service'
param serviceUserPassword string
param initScriptRef string

var environmentName = 'joeljcav2'

resource wordpressPublicIP 'Microsoft.Network/publicIPAddresses@2020-11-01' = {
  name: '${environmentName}wpip'
  location: location
  sku: {
    name: 'Basic'
  }
}

resource wordpressVNET 'Microsoft.Network/virtualNetworks@2020-11-01' = {
  name: '${environmentName}vnet'
  location: location
  properties: {
    addressSpace: {
      addressPrefixes: ['10.0.0.0/16']
    }
    subnets: [{
      name: 'Default'
      properties: {
        addressPrefix: '10.0.0.0/24'
        delegations: []
        privateEndpointNetworkPolicies: 'Disabled'
        privateLinkServiceNetworkPolicies: 'Enabled'
      }
    }]
  }
}

resource wordpressVMNIC 'Microsoft.Network/networkInterfaces@2020-11-01' = {
  name: '${environmentName}wpnic'
  location: location
  properties: {
    ipConfigurations: [
      {
        name: 'privateEndpointIpConfig.386f15ad-5285-461b-90b1-1bf94d9288c3'
        properties: {
          privateIPAddress: '10.0.0.5'
          privateIPAllocationMethod: 'Dynamic'
          subnet: {
            id: '${wordpressVNET.id}/subnets/default'
          }
          primary: true
          privateIPAddressVersion: 'IPv4'
          publicIPAddress: {
            id: wordpressPublicIP.id
          }
        }
      }
    ]
    dnsSettings: {
      dnsServers: []
    }
    enableAcceleratedNetworking: false
    enableIPForwarding: false
  }
}

resource wordpressVM 'Microsoft.Compute/virtualMachines@2022-03-01' = {
  name: '${environmentName}wpvm'
  location: location
  properties: {
    hardwareProfile: {
      vmSize: 'Standard_DS1_v2'
    }
    storageProfile: {
      imageReference: {
        publisher: 'canonical'
        offer: '0001-com-ubuntu-server-focal'
        sku: '20_04-lts-gen2'
        version: 'latest'
      }
      osDisk: {
        osType: 'Linux'
        name: '${environmentName}wpvm_OsDisk_1_9869c5a33786441a9ae9d1bf06a3509d'
        createOption: 'FromImage'
        caching: 'ReadWrite'
        managedDisk: {
          storageAccountType: 'StandardSSD_LRS'
        }
        deleteOption: 'Delete'
        diskSizeGB: 30
      }
      dataDisks: []
    }
    osProfile: {
      computerName: '${environmentName}wpvm'
      adminUsername: serviceUserName
      adminPassword: serviceUserPassword
      linuxConfiguration: {
        disablePasswordAuthentication: false
        provisionVMAgent: true
        patchSettings: {
          patchMode: 'ImageDefault'
          assessmentMode: 'ImageDefault'
        }
      }
      secrets: []
      allowExtensionOperations: true
    }
    networkProfile: {
      networkInterfaces: [
        {
          id: wordpressVMNIC.id
          properties: {
            deleteOption: 'Detach'
          }
        }
      ]
    }
    diagnosticsProfile: {
      bootDiagnostics: {
        enabled: true
      }
    }
  }
}

resource wordpressVMInitScript 'Microsoft.Compute/virtualMachines/extensions@2020-12-01' = {
  name: '${environmentName}wpvminit'
  parent: wordpressVM
  location: location
  properties: {
    publisher: 'Microsoft.Azure.Extensions'
    type: 'CustomScript'
    typeHandlerVersion: '2.0'
    autoUpgradeMinorVersion: true
    settings: {
      fileUris: [
        'https://raw.githubusercontent.com/joelj1995/joeljdotca/${initScriptRef}/infrastructure/environment-v2/init-vm.sh'
      ]
      commandToExecute: 'sh init-vm.sh'
    }
  }
}
