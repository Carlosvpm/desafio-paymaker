#!/bin/sh

echo "🔄 Iniciando monitoramento do schema GraphQL..."
node scripts/schema-watcher.js &
SCHEMA_WATCHER_PID=$!

echo "⏳ Aguardando o backend estar pronto..."
sleep 5

echo "🔍 Gerando tipos iniciais..."
npm run codegen

echo "🚀 Iniciando o frontend..."
npm run dev

trap "kill $SCHEMA_WATCHER_PID" EXIT 