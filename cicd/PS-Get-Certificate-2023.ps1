[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][string] $RepoRootPath
)

$ErrorActionPreference = "Stop"

Get-AzKeyVaultSecret -VaultName "joeljcakeys" -Name "joeljca-2023-crt" -AsPlainText | Out-File -Path $RepoRootPath/tmp/joeljca-2023.crt
Get-AzKeyVaultSecret -VaultName "joeljcakeys" -Name "joeljca-2023-rsa" -AsPlainText | Out-File -Path $RepoRootPath/tmp/joeljca-2023.rsa