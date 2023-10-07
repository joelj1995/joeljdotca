Write-Host 'IN PS-Connect-AZ-Account.ps1'
$SecureStringPwd = $Env:JJ_AZ_SECRET | ConvertTo-SecureString -AsPlainText -Force
$AzPsCredential = New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $Env:JJ_AZ_APP_ID, $SecureStringPwd
Connect-AzAccount -ServicePrincipal -Credential $AzPsCredential -Tenant $Env:JJ_AZ_TENANT_ID