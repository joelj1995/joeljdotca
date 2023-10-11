# CICD

This current iteration of deployment automation targets Ubuntu-based Linux hosts (provided by Linode in my case). Most of the heavy lifting is being done by Ansible playbooks, with PowerShell scripts providing some glue. This was developed and tested using Ubuntu running in Windows Subsystem for Linux with the following software versions:

Ansible Core 2.15.4

PowerShell 7.3.7

Ubuntu 22.04.2

## Key Files

### Ansible-Inventory-WORLD1.yml

Inventory of web servers and load balancers. Although this is an Ansible inventory file, the PowerShell scripts will also parse the hosts to dynamically generate the load balancer configuration.

### PS-Connect-Az-Account.ps1

Authenticate with Azure using the token stored in your environment variables (see setup steps). Should be executed before running the below scripts.

### PS-Deploy-{SLOT}.ps1

Deploy the local build to the target slot on each web server. You should have run `npm run build:ssr` in `/blog-app` first.

### PS-Activate-{SLOT}.ps1

Direct traffic to the target slot. You should have just deployed something there using the previous script.

## Setup

Some setup is required before the automation scripts can be executed.

### Ansible

Follow the Ansible installation steps that apply to your system.

### PowerShell

Follow the PowerShell installation steps that apply to your system. Also install the Azure module:

`Install-Module -Name Az -Repository PSGallery -Force`

### Azure Service Principle

A [Service Principle](https://learn.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#register-an-application-with-azure-ad-and-create-a-service-principal) should be created so that PS can authenticate with a token. The Service Principle should have the Key Vault Secrets User role on the Key Vault.

### Azure Credentials

Environment variables are used to store the Azure Service Principle token. They are as follows:

JJ_AZ_SECRET: Azure Secret Value

JJ_AZ_APP_ID: Azure Application ID

JJ_AZ_TENANT_ID: Azure Tenant ID

In a WSL context, make sure to export these globally from the Linux Shell. WSL doesn't appear to be able to read the Windows variables.

## Key Import 

We need to to some CLI nastiness in order to import multiple lines.

`PS C:\Users\colte\OneDrive\Desktop> $RawSecret =  Get-Content "key.crt" -Raw`

`PS C:\Users\colte\OneDrive\Desktop> $SecureSecret = ConvertTo-SecureString -String $RawSecret -AsPlainText -Force`

`PS C:\Users\colte\OneDrive\Desktop> $secret = Set-AzKeyVaultSecret -VaultName "joeljcakeys" -Name "joeljca-2022-chained-crt" -SecretValue $SecureSecret`

`PS C:\Users\colte\OneDrive\Desktop> $RawSecret =  Get-Content "key.rsa" -Raw`

`PS C:\Users\colte\OneDrive\Desktop> $SecureSecret = ConvertTo-SecureString -String $RawSecret -AsPlainText -Force`

`PS C:\Users\colte\OneDrive\Desktop> $secret = Set-AzKeyVaultSecret -VaultName "joeljcakeys" -Name "joeljca-2022-rsa" -SecretValue $SecureSecret`
`