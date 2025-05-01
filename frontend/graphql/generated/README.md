# Tipos Gerados Automaticamente do GraphQL

Este diretório contém tipos TypeScript gerados automaticamente a partir do schema GraphQL do backend.

## Como funciona

1. Um script monitor (`scripts/schema-watcher.js`) observa continuamente o schema GraphQL do backend via introspection.
2. Quando detecta mudanças no schema, o GraphQL Code Generator é executado automaticamente.
3. Isso gera tipos TypeScript, hooks e operações baseados no schema atual.

## Benefícios

- **Consistência de tipo:** Os tipos no frontend estão sempre alinhados com o backend
- **Detecção precoce de erros:** Erros de tipo são capturados durante o desenvolvimento
- **Autocompletar e IntelliSense:** Seu editor sugere campos e propriedades válidos

## Diretório gerado

Este diretório contém:

- Tipos TypeScript para todas as queries, mutations e tipos definidos no schema
- Hooks React Apollo para cada operação GraphQL
- Helpers para trabalhar com o schema GraphQL

## Importante

- **Não edite manualmente** os arquivos neste diretório
- Eles são gerados automaticamente e serão sobrescritos
- Defina suas queries e mutations em arquivos `.ts` separados no diretório `/graphql`

## Execução manual

Se precisar gerar os tipos manualmente:

```bash
npm run codegen
```

Para monitorar as mudanças no schema e gerar tipos automaticamente:

```bash
npm run schema:watch
```
