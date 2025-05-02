# Tipos GraphQL Gerados Automaticamente

Este diretório contém tipos TypeScript gerados automaticamente a partir do schema GraphQL do backend.

## Geração de Tipos

Os tipos são gerados utilizando o GraphQL Code Generator a partir do schema GraphQL do backend.

## Como Gerar Manualmente

Para gerar os tipos manualmente, execute:

```bash
npm run generate
```

Este comando:

1. Conecta-se ao servidor GraphQL (padrão: http://localhost:3000/graphql)
2. Obtém o schema atual
3. Gera o arquivo `graphql.ts` com todos os tipos TypeScript e hooks React Apollo

## Importante

- Não edite manualmente os arquivos neste diretório
- Arquivos são gerados automaticamente e serão sobrescritos
- O arquivo `graphql.ts` contém todos os tipos, queries, mutations e hooks gerados

## Uso nos Componentes

Importe os hooks gerados diretamente deste diretório:

```typescript
import {
  useGetUsersQuery,
  useCreateUserMutation,
} from "../graphql/generated/graphql";
```
