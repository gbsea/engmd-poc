#!/bin/bash
set -e

# Function to perform pg_dumpall
perform_dump() {
 echo "Performing dump of local database..."
 pg_dump -U localdev -d $POSTGRES_DB --schema-only --no-owner > "/pgdump/_${POSTGRES_DB}_schema.sql"
 pg_dump -U localdev -d $POSTGRES_DB --data-only --disable-triggers --no-owner > "/pgdump/_${POSTGRES_DB}_data.sql"
 pg_dump -U localdev -d sessions --schema-only --create > /pgdump/_sessions_schema.sql
 cat "/pgdump/_${POSTGRES_DB}_schema.sql" "/pgdump/_${POSTGRES_DB}_data.sql" /pgdump/_sessions_schema.sql > /pgdump/seed.sql
 echo "Dump completed."
}

# Trap SIGTERM and SIGINT signals and call perform_dump
trap 'perform_dump' SIGTERM SIGINT

# Start PostgreSQL in the background
docker-entrypoint.sh postgres &

# Wait for PostgreSQL process to terminate
wait $!
