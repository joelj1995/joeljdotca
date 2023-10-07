$ErrorActionPreference = "Stop"

$RootPassword = Get-AzKeyVaultSecret -VaultName "joeljcakeys" -Name "LinodeRootPasswordWorld1" -AsPlainText

Write-Host -ForegroundColor blue 'In Activate-BLUE'

$CICDPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRootPath = Split-Path -Parent $CICDPath

& ${CICDPath}/PS-Get-Certificate-2022.ps1 $RepoRootPath
$NginxConfigContent = & ${CICDPath}/PS-Generate-Nginx-Upstreams.ps1

Out-File -FilePath $RepoRootPath/tmp/joeljca.conf -InputObject $NginxConfigContent

$Cmd = "ansible-playbook -i ${CICDPath}/Ansible-Inventory-WORLD1.yml $RepoRootPath/cicd/Ansible-Playbook-Gateway-Configure.yml --extra-vars `"root_password=$RootPassword`"" + ';$?'

Write-Host $Cmd.Replace($RootPassword, '***')

$Success = Invoke-Expression $Cmd
if (-not $Success){
    Write-Error "Command invocation failed"
}

$Cmd = "ansible-playbook -i ${CICDPath}/Ansible-Inventory-WORLD1.yml $RepoRootPath/cicd/Ansible-Playbook-Gateway-Deploy.yml --extra-vars `"root_password=$RootPassword slot=blue`"" + ';$?'

Write-Host $Cmd.Replace($RootPassword, '***')

$Success = Invoke-Expression $Cmd
if (-not $Success){
    Write-Error "Command invocation failed"
}