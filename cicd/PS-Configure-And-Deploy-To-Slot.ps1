[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][string] $RepoRootPath,
    [Parameter(Mandatory=$true)][string] $InventoryFile,
    [Parameter(Mandatory=$true)][string] $Slot,
    [Parameter(Mandatory=$true)][string] $RootPassword
)

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
$Cmd = "ansible-playbook -i $InventoryFile $RepoRootPath/cicd/Ansible-Playbook-Web-Configure.yml --extra-vars `"root_password=$RootPassword`"" + ';$?'

Write-Host $Cmd.Replace($RootPassword, '***')

$Success = Invoke-Expression $Cmd
if (-not $Success){
    Write-Error "Command invocation failed"
}

# Deploy to Hosts
$Cmd = "ansible-playbook -i $InventoryFile $RepoRootPath/cicd/Ansible-Playbook-Web-Deploy.yml --extra-vars `"root_password=$RootPassword slot_port=$Port slot=$Slot`""  + ';$?'

Write-Host $Cmd.Replace($RootPassword, '***')

$Success = Invoke-Expression $Cmd
if (-not $Success){
    Write-Error "Command invocation failed"
}