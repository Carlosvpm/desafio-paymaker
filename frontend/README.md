# Frontend - User CRUD

Este projeto é um frontend para o sistema de CRUD de usuários, utilizando Next.js, TypeScript, GraphQL e Apollo Client.

## Configuração de Ambientes

O projeto está configurado para rodar em dois ambientes diferentes:

### Ambiente Local

Quando você está desenvolvendo localmente e o backend está rodando diretamente na sua máquina:

```bash
npm run dev:local
```

### Ambiente Docker

Quando você está usando Docker Compose para rodar todo o stack:

```bash
npm run dev:docker
```

## Sistema de Atualização de Schema GraphQL

Este projeto implementa um sistema robusto para manter os tipos TypeScript sempre atualizados com o schema GraphQL do backend:

### Como Funciona

1. **Monitoramento Contínuo**: O script `schema-watcher.js` monitora continuamente alterações no schema GraphQL do backend.
2. **Detecção de Alterações**: Quando uma alteração é detectada, os tipos TypeScript são automaticamente regenerados.
3. **Geração Manual**: Você também pode gerar os tipos manualmente usando o comando `npm run generate:types`.

### Arquivos Importantes

- `codegen.yml`: Configuração do GraphQL Code Generator
- `scripts/schema-watcher.js`: Monitora alterações no schema do backend
- `scripts/generate-types.js`: Gera tipos TypeScript a partir do schema GraphQL
- `scripts/start-local.sh` e `scripts/start-docker.sh`: Scripts de inicialização para diferentes ambientes

### Variáveis de Ambiente

As variáveis de ambiente são definidas nos arquivos `.env.local` e `.env.development`:

- `NEXT_PUBLIC_GRAPHQL_HOST`: Host do servidor GraphQL
- `NEXT_PUBLIC_GRAPHQL_PORT`: Porta do servidor GraphQL
- `NEXT_PUBLIC_GRAPHQL_URL`: URL completa do endpoint GraphQL
- `NEXT_PUBLIC_SCHEMA_CHECK_INTERVAL`: Intervalo de verificação do schema (em milissegundos)

## Como Depurar

Se você encontrar problemas com a geração de tipos ou atualização do schema:

1. Verifique se o backend está acessível na URL configurada
2. Examine os arquivos de debug em `graphql/generated/schema-debug.json` e `schema.graphql`
3. Execute manualmente a geração de tipos com `npm run generate:types`

## Fluxo de Desenvolvimento

1. Inicie o backend: `cd backend && npm run start`
2. Inicie o frontend: `cd frontend && npm run dev:local`
3. O sistema automaticamente monitorará alterações no schema e regenerará os tipos
4. Após qualquer alteração no backend que afete o schema GraphQL, os tipos serão atualizados automaticamente
