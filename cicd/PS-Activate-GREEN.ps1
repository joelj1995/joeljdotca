[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][string] $RootPassword
)

Write-Host 'In Activate-GREEN'

$CICDPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRootPath = Split-Path -Parent $CICDPath

$NginxConfigContent = & ${CICDPath}/PS-Generate-Nginx-Upstreams.ps1

Out-File -FilePath $RepoRootPath/tmp/joeljca.conf -InputObject $NginxConfigContent

$Cmd = "ansible-playbook -i ${CICDPath}/Ansible-Inventory-WORLD1.yml $RepoRootPath/cicd/Ansible-Playbook-Gateway-Configure.yml --extra-vars `"root_password=$RootPassword`""

Write-Host $Cmd.Replace($RootPassword, '***')

Invoke-Expression $Cmd

$Cmd = "ansible-playbook -i ${CICDPath}/Ansible-Inventory-WORLD1.yml $RepoRootPath/cicd/Ansible-Playbook-Gateway-Deploy.yml --extra-vars `"root_password=$RootPassword slot=green`""

Write-Host $Cmd.Replace($RootPassword, '***')

Invoke-Expression $Cmd