# Frontend - CRUD de Usuários

Frontend para o sistema de CRUD de usuários desenvolvido com Next.js, TypeScript, Apollo Client e GraphQL.

## Configuração

### Pré-requisitos

- Node.js v16+
- Backend rodando em http://localhost:3000 (ou configurado nas variáveis de ambiente)

### Instalação

```bash
npm install
```

## Modos de Execução

### Desenvolvimento

Executa a aplicação no modo de desenvolvimento:

```bash
npm run dev
```

Este comando gera automaticamente os tipos GraphQL antes de iniciar o servidor Next.js.

### Build de Produção

```bash
npm run build
npm run start
```

## Geração de Tipos GraphQL

Os tipos TypeScript são gerados a partir do schema GraphQL do backend.

### Geração Manual

```bash
npm run generate
```

### Como Funciona

1. O comando `generate` conecta-se ao servidor GraphQL
2. Obtém o schema atual
3. Gera tipos TypeScript para queries, mutations e tipos do GraphQL
4. Cria hooks React Apollo para operações definidas

## Estrutura de Arquivos

```
frontend/
├── app/                 # Pages e rotas da aplicação
├── components/          # Componentes React
├── graphql/
│   ├── generated/       # Tipos e hooks gerados automaticamente
│   └── queries.ts       # Definições de queries e mutations
├── scripts/             # Scripts de automação
├── codegen.ts           # Configuração do GraphQL Code Generator
└── package.json         # Dependências e scripts
```

## Variáveis de Ambiente

Configure estas variáveis em um arquivo `.env.local`:

```
NEXT_PUBLIC_GRAPHQL_HOST=localhost
NEXT_PUBLIC_GRAPHQL_PORT=3000
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/graphql
```

## Solução de Problemas

### Tipos GraphQL não estão atualizados

1. Verifique se o backend está acessível
2. Execute manualmente `npm run generate`
3. Verifique se há erros na geração de tipos

### Queries GraphQL com erro

1. Verifique se os campos nas queries correspondem ao schema atual do backend
2. Regenere os tipos com `npm run generate`
