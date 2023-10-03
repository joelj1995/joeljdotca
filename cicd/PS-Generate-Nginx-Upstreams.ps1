$CICDPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRootPath = Split-Path -Parent $CICDPath

$Inventory = ansible-inventory -i $CICDPath/Ansible-Inventory-WORLD1.yml --list | ConvertFrom-Json

$WebHosts = $Inventory.web.hosts

$ActiveWebHosts = $WebHosts | Select-Object -Property `
    @{name='host';   e={$_}}, 
    @{name='ipv4';   e={$Inventory._meta.hostvars.$_.internal_ip4}},
    @{name='ignore'; e={$Inventory._meta.hostvars.$_.inactive}} ` 
    | Where-Object { -not $_.ignore }

$Blue  = $ActiveWebHosts | ForEach { return "    server $($_.ipv4):1024; # $($_.Host)" } | Join-String -Separator "`n"
$Green = $ActiveWebHosts | ForEach { return "    server $($_.ipv4):1025; # $($_.Host)" } | Join-String -Separator "`n"

$ConfigString =@'
upstream joeljcablue {
__BLUE__
}

upstream joeljcagreen {
__GREEN__
}
'@

Write-Output $ConfigString.replace('__BLUE__', $Blue).replace('__GREEN__', $Green)