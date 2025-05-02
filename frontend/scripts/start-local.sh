#!/bin/sh

# Define variáveis de ambiente para o ambiente local
export NEXT_PUBLIC_GRAPHQL_HOST=localhost
export NEXT_PUBLIC_GRAPHQL_PORT=3000
export NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/graphql
export NEXT_PUBLIC_SCHEMA_CHECK_INTERVAL=5000

echo "🔄 Iniciando monitoramento do schema GraphQL..."
node scripts/schema-watcher.js &
SCHEMA_WATCHER_PID=$!

echo "⏳ Buscando schema do backend local..."
echo "📡 Tentando conectar em: $NEXT_PUBLIC_GRAPHQL_URL"

# Tenta acessar o backend algumas vezes antes de desistir
MAX_RETRIES=10
COUNT=0
CONNECTED=false

while [ $COUNT -lt $MAX_RETRIES ]; do
  if curl -s -o /dev/null -w "%{http_code}" $NEXT_PUBLIC_GRAPHQL_URL | grep -q "200"; then
    CONNECTED=true
    break
  fi
  echo "⏳ Aguardando o backend estar disponível... (tentativa $((COUNT+1))/$MAX_RETRIES)"
  COUNT=$((COUNT+1))
  sleep 2
done

if [ "$CONNECTED" = true ]; then
  echo "✅ Backend encontrado! Gerando tipos a partir do schema..."
  npm run generate-schema
  
  echo "🚀 Iniciando o frontend..."
  npm run dev
else
  echo "❌ Não foi possível conectar ao backend após $MAX_RETRIES tentativas."
  echo "👉 Certifique-se de que o backend está rodando em $NEXT_PUBLIC_GRAPHQL_URL"
  kill $SCHEMA_WATCHER_PID
  exit 1
fi

trap "kill $SCHEMA_WATCHER_PID" EXIT 