[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][string] $RootPassword
)

Write-Host 'In Activate-GREEN'

$CICDPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRootPath = Split-Path -Parent $CICDPath

$Cmd = "ansible-playbook -i ${CICDPath}/Ansible-Inventory-WORLD1.yml $RepoRootPath/cicd/Ansible-Playbook-Configure-Gateway.yml --extra-vars `"root_password=$RootPassword`""

Write-Host $Cmd.Replace($RootPassword, '***')

Invoke-Expression $Cmd

$Cmd = "ansible-playbook -i ${CICDPath}/Ansible-Inventory-WORLD1.yml $RepoRootPath/cicd/Ansible-Playbook-Deploy-Gateway.yml --extra-vars `"root_password=$RootPassword slot=green`""

Write-Host $Cmd.Replace($RootPassword, '***')

Invoke-Expression $Cmd