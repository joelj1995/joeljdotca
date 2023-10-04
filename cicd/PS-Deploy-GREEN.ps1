$RootPassword = Get-AzKeyVaultSecret -VaultName "joeljcakeys" -Name "LinodeRootPasswordWorld1" -AsPlainText

Write-Host 'In Deploy-GREEN'

$CICDPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRootPath = Split-Path -Parent $CICDPath

& "${CICDPath}/PS-Configure-And-Deploy-To-Slot.ps1" $RepoRootPath "${CICDPath}/Ansible-Inventory-WORLD1.yml" 'green'