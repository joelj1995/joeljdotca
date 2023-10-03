$CICDPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRootPath = Split-Path -Parent $CICDPath

$Inventory = ansible-inventory -i $CICDPath/Ansible-Inventory-WORLD1.yml --list | ConvertFrom-Json

$WebHosts = $Inventory.web.hosts

$EnrichedWebHosts = $WebHosts | Select-Object @{name='host'; e={$_}}, @{name='ipv4'; e={$Inventory._meta.hostvars.$_.internal_ip4}}

$Blue = $EnrichedWebHosts | ForEach { return "    $($_.ipv4):1024 # $($_.Host)" } | Join-String -Separator "`n"
$Green = $EnrichedWebHosts | ForEach { return "    $($_.ipv4):1025 # $($_.Host)" } | Join-String -Separator "`n"

$BluePort = 1024;
$GreenPort = 1025;

$ConfigString =@'
upstream joeljcablue {
__BLUE__
}

upstream joeljcagreen {
__GREEN__
}
'@

Write-Host $ConfigString.replace('__BLUE__', $Blue).replace('__GREEN__', $Green)