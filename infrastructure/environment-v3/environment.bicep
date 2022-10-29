param location string = resourceGroup().location
param sites_joeljca_name string = 'joeljca'

var appServicePlanName = toLower('AppServicePlan-joeljca')

resource appServicePlan 'Microsoft.Web/serverfarms@2020-06-01' = {
  name: appServicePlanName
  location: location
  properties: {
    reserved: true
  }
  sku: {
    name: 'S1'
  }
  kind: 'linux'
}

resource appService 'Microsoft.Web/sites@2022-03-01' = {
  name: 'wapp-joeljca'
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'NODE|18-lts'
    }
    hostNameSslStates: [
      {
        name: 'joelj.ca'
        sslState: 'SniEnabled'
        thumbprint: '890334030002371F6225DD88CF5E4F06D3455DB0'
        hostType: 'Standard'
      }
      {
        name: '${sites_joeljca_name}.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Standard'
      }
      {
        name: 'www.joelj.ca'
        sslState: 'SniEnabled'
        thumbprint: '890334030002371F6225DD88CF5E4F06D3455DB0'
        hostType: 'Standard'
      }
      {
        name: '${sites_joeljca_name}.scm.azurewebsites.net'
        sslState: 'Disabled'
        hostType: 'Repository'
      }
    ]
  }
}

resource sites_joeljca_name_www_joelj_ca 'Microsoft.Web/sites/hostNameBindings@2022-03-01' = {
  parent: appService
  name: 'www.joelj.ca'
  properties: {
    siteName: 'wapp-joeljca'
    hostNameType: 'Verified'
    sslState: 'SniEnabled'
    thumbprint: '890334030002371F6225DD88CF5E4F06D3455DB0'
  }
}

resource sites_joeljca_name_joelj_ca 'Microsoft.Web/sites/hostNameBindings@2022-03-01' = {
  parent: appService
  dependsOn: [sites_joeljca_name_www_joelj_ca]
  name: 'joelj.ca'
  properties: {
    siteName: 'wapp-joeljca'
    hostNameType: 'Verified'
    sslState: 'SniEnabled'
    thumbprint: '890334030002371F6225DD88CF5E4F06D3455DB0'
  }
}
