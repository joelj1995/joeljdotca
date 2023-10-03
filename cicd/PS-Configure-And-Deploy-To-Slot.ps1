[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][string] $RepoRootPath,
    [Parameter(Mandatory=$true)][string] $InventoryFile,
    [Parameter(Mandatory=$true)][string] $Slot,
    [Parameter(Mandatory=$true)][string] $RootPassword
)

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
$Cmd = "ansible-playbook -i $InventoryFile $RepoRootPath/cicd/Ansible-Playbook-Configure-Web.yml --extra-vars `"root_password=$RootPassword`""

Write-Host $Cmd.Replace($RootPassword, '***')

Invoke-Expression $Cmd

# Deploy to Hosts
$Cmd = "ansible-playbook -i $InventoryFile $RepoRootPath/cicd/Ansible-Playbook-Deploy-Web.yml --extra-vars `"root_password=$RootPassword slot_port=$Port slot=$Slot`""

Write-Host $Cmd.Replace($RootPassword, '***')

Invoke-Expression $Cmd