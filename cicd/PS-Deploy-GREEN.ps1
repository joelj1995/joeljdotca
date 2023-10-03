[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][string] $RootPassword
)

Write-Host 'In Deploy-GREEN'

$CICDPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRootPath = Split-Path -Parent $CICDPath

& "${CICDPath}/PS-Configure-And-Deploy-To-Slot.ps1" $RepoRootPath "${CICDPath}/Ansible-Inventory-WORLD1.yml" 'green'