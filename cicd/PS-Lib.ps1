function InvokeAndCheck($Cmd) {
    Invoke-Expression $($Cmd + '; if(-not $?){ throw "Invocation Error" }')
}