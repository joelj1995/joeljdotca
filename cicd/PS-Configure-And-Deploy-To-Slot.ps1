[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][string] $RepoRootPath,
    [Parameter(Mandatory=$true)][string] $InventoryFile,
    [Parameter(Mandatory=$true)][string] $Slot,
    [Parameter(Mandatory=$true)][string] $RootPassword,
    [Parameter(Mandatory=$true)][string] $NodeInsightsConnectionString
)

. $RepoRootPath/cicd/PS-Lib.ps1

$ErrorActionPreference = "Stop"

Write-Host 'In Configure-And-Deploy-To-Slot'

$Port = -1
if ($Slot -eq 'blue') {
    $Port = 1024
}
elseif ($Slot -eq 'green') {
    $Port = 1025
}
else {
    throw "$Slot is not a valid slot"
}

# Configure Hosts
$Cmd = "ansible-playbook -i $InventoryFile $RepoRootPath/cicd/Ansible-Playbook-Web-Configure.yml --extra-vars `"root_password=$RootPassword`""

Write-Host $Cmd.Replace($RootPassword, '***')

InvokeAndCheck $Cmd

# Deploy to Hosts
$Cmd = "ansible-playbook -i $InventoryFile $RepoRootPath/cicd/Ansible-Playbook-Web-Deploy.yml --extra-vars `"root_password=$RootPassword slot_port=$Port slot=$Slot node_insights_connection_string='$NodeInsightsConnectionString'`""

Write-Host $Cmd.Replace($RootPassword, '***').Replace($NodeInsightsConnectionString, '***');

InvokeAndCheck $Cmd