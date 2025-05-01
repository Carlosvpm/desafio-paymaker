#!/bin/sh

set -e

host="$1"
shift
cmd="$@"

until nc -z "$host" 3306; do
  >&2 echo "MySQL ainda não está disponível em $host:3306 - aguardando..."
  sleep 1
done

>&2 echo "MySQL está disponível em $host:3306 - executando comando"
exec $cmd 