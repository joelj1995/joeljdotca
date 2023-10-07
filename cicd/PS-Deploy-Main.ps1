$ErrorActionPreference = "Stop"

$CICDPath = Split-Path -Parent $MyInvocation.MyCommand.Path

enum DeploymentSlot {
    blue
    green
}

enum NodeHeaderComponents {
    host
    slot
    version
}

function GetActiveSlot() {
    $SiteVersionHttpRes = Invoke-WebRequest -Uri https://www.joelj.ca/assets/version.txt
    $SiteVersionHttpResNodeHeader = $SiteVersionHttpRes.Headers."X-Origin-Node"
    $SiteActiveSlot = $SiteVersionHttpResNodeHeader.Split(" ")[[int][NodeHeaderComponents]::slot]
    if ($SiteActiveSlot.EndsWith("blue")) {
        return [DeploymentSlot]::blue
    }
    elseif ($SiteActiveSlot.EndsWith("green")) {
        return [DeploymentSlot]::green
    }
    else {
        throw "Could not detected active slot. Header: " + $SiteVersionHttpResNodeHeader
    }
}

$ActiveSlot = GetActiveSlot

if ($ActiveSlot -eq [DeploymentSlot]::blue) {
    Write-Host -ForegroundColor blue 'BLUE is the active slot.'
    Write-Host -ForegroundColor green 'GREEN is the deployment target.'
    & "${CICDPath}/PS-Deploy-GREEN.ps1"
    & "${CICDPath}/PS-Activate-GREEN.ps1"
}
elseif ($ActiveSlot -eq [DeploymentSlot]::green) {
    Write-Host -ForegroundColor green 'GREEN is the active slot.'
    Write-Host -ForegroundColor blue 'BLUE is the deployment target.'
    & "${CICDPath}/PS-Deploy-BLUE.ps1"
    & "${CICDPath}/PS-Activate-BLUE.ps1"
}
else {
    # logically this shouldn't happen but paranoia tends to pay off
    Writer-Error 'Slot not recognized: ' + $ActiveSlot
}

$ActiveSlotAfterDeploy = GetActiveSlot

if ($ActiveSlotAfterDeploy -eq $ActiveSlot) {
    Write-Error 'The active slot was unchanged after the deployment completed.'
}