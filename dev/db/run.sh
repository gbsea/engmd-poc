#!/bin/bash

CONF=${PWD}/.env

if [ -f "$CONF" ]; then
    source "$CONF" else
else
    echo "Error: $CONF not found. Please run 'npm run decrypt-env -- %passphrase%' to create it / decrypt it."
    exit 1
fi

docker run --rm \
 --name ${APP_ID}_dev_pg \
 -e POSTGRES_USER=${DB_USERNAME} \
 -e POSTGRES_PASSWORD=${DB_PASSWORD} \
 -e POSTGRES_DB=${DB_DATABASE} \
 -v ${PWD}/dev/db/seed/seed.sql:/docker-entrypoint-initdb.d/seed.sql \
 -v ${PWD}/dev/db/seed:/pgdump:rw \
 -v ${PWD}/dev/db/entrypoint.sh:/usr/local/bin/custom-entrypoint.sh \
 --entrypoint /usr/local/bin/custom-entrypoint.sh \
 -p ${DB_PORT}:5432 \
 postgres:16
