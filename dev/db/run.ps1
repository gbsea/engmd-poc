$Conf = Join-Path (Get-Location) ".env"

if (-Not (Test-Path $Conf)) {
    Write-Error "Error: $Conf not found. Please run 'npm run decrypt-env -- %passphrase%' to create it / decrypt it."
    exit 1
}

Get-Content $Conf | ForEach-Object {
    if ($_ -match '^\s*$' -or $_ -match '^\s*#') { return }
    $pair = $_ -split '=', 2
    if ($pair.Length -eq 2) {
        [System.Environment]::SetEnvironmentVariable($pair[0].Trim(), $pair[1].Trim(), 'Process')
    }
}

$pwdPath = (Get-Location).Path

docker run --rm `
 --name "$($Env:APP_ID)_dev_pg" `
 -e "POSTGRES_USER=$($Env:DB_USERNAME)" `
 -e "POSTGRES_PASSWORD=$($Env:DB_PASSWORD)" `
 -e "POSTGRES_DB=$($Env:DB_DATABASE)" `
 -v "$pwdPath\dev\db\seed\seed.sql:/docker-entrypoint-initdb.d/seed.sql" `
 -v "$pwdPath\dev\db\seed:/pgdump:rw" `
 -v "$pwdPath\dev\db\entrypoint.sh:/usr/local/bin/custom-entrypoint.sh" `
 --entrypoint /usr/local/bin/custom-entrypoint.sh `
 -p "$($Env:DB_PORT):5432" `
 postgres:16
