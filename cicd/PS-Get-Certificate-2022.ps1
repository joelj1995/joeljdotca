[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][string] $RepoRootPath
)

$ErrorActionPreference = "Stop"

Get-AzKeyVaultSecret -VaultName "joeljcakeys" -Name "joeljca-2022-chained-crt" -AsPlainText | Out-File -Path $RepoRootPath/tmp/joeljca-2022.crt
Get-AzKeyVaultSecret -VaultName "joeljcakeys" -Name "joeljca-2022-rsa" -AsPlainText | Out-File -Path $RepoRootPath/tmp/joeljca-2022.rsa