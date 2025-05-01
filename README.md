# CRUD de Usuários com NestJS, Next.js, GraphQL e MySQL

Este projeto é um CRUD (Create, Read, Update, Delete) completo de usuários utilizando tecnologias modernas:

- **Backend**: NestJS, TypeORM, GraphQL e MySQL
- **Frontend**: Next.js, Apollo Client, Tailwind CSS e React Hook Form
- **Infraestrutura**: Docker e Docker Compose

## Estrutura do Projeto

```
.
├── backend/                 # API NestJS com GraphQL
│   ├── src/                 # Código fonte do backend
│   │   ├── users/           # Módulo de usuários
│   │   │   ├── dto/         # Data Transfer Objects
│   │   │   ├── user.entity.ts  # Entidade de usuário
│   │   │   ├── users.module.ts # Módulo NestJS
│   │   │   ├── users.resolver.ts # Resolver GraphQL
│   │   │   └── users.service.ts  # Serviço de usuários
│   │   ├── config/          # Configurações e pipes personalizados
│   │   ├── types/           # Definições de tipos TypeScript
│   │   ├── app.module.ts    # Módulo principal
│   │   └── main.ts          # Ponto de entrada
│   ├── Dockerfile           # Docker para o backend
│   └── package.json         # Dependências do backend
├── frontend/                # Aplicação Next.js
│   ├── app/                 # Páginas da aplicação
│   ├── components/          # Componentes React
│   ├── graphql/             # Queries e tipos GraphQL
│   │   └── generated/       # Tipos TypeScript gerados automaticamente
│   ├── scripts/             # Scripts de automação e ferramentas
│   ├── Dockerfile           # Docker para o frontend
│   └── package.json         # Dependências do frontend
└── docker-compose.yml       # Configuração do Docker Compose
```

## Pré-requisitos

- Docker e Docker Compose instalados

## Como Executar

1. Clone o repositório:

   ```
   git clone [URL_DO_REPOSITÓRIO]
   cd desafio-paymaker
   ```

2. Inicie os containers com Docker Compose:

   ```
   docker-compose up -d
   ```

3. Acesse a aplicação:
   - Frontend: http://localhost:4000
   - GraphQL Playground: http://localhost:3000/graphql

## Sincronização de Schema GraphQL

O projeto possui uma funcionalidade de sincronização automática de tipos e schema GraphQL entre backend e frontend:

### Como funciona

1. Um script monitor (`frontend/scripts/schema-watcher.js`) observa continuamente o schema GraphQL do backend
2. Quando detecta alterações, executa automaticamente o GraphQL Code Generator
3. Os tipos TypeScript e hooks React atualizados são gerados no diretório `frontend/graphql/generated/`

### Benefícios

- **Consistência de tipo**: Garante que o frontend sempre esteja utilizando tipos que correspondem ao backend
- **Desenvolvimento ágil**: Não precisa executar manualmente scripts de atualização de tipos
- **Detecção precoce de erros**: Problemas de incompatibilidade de tipos são detectados imediatamente

### Comandos disponíveis

```bash
# Gerar tipos a partir do schema atual (manual)
cd frontend && npm run codegen

# Monitorar alterações no schema (inicia automaticamente com o projeto)
cd frontend && npm run schema:watch
```

## Problemas Corrigidos

Nesta versão, foram corrigidos vários problemas:

1. **Dependências do TypeScript**:

   - Adicionadas declarações de tipos para `class-validator` e `class-transformer`
   - Adicionada dependência `@nestjs/config` para gerenciamento de configurações

2. **Problema de execução do script wait-for-db.sh**:

   - Corrigido formato de linha do script shell
   - Atualizado Dockerfile para usar `/bin/sh` explicitamente para executar o script

3. **Problema com o build do frontend**:

   - Configurado para usar modo de desenvolvimento (`next dev`) em vez de produção
   - Corrigidos volumes para preservar os node_modules em volumes Docker nomeados

4. **Erros de validação GraphQL**:
   - Corrigida tipagem para o formatError no Apollo Server
   - Utilização adequada do GraphQLFormattedError

## Solução de Problemas

Se encontrar problemas ao iniciar os containers, tente as seguintes soluções:

1. **Limpar volumes e reconstruir**:

   ```bash
   docker-compose down -v
   docker-compose build --no-cache
   docker-compose up -d
   ```

2. **Verificar logs**:

   ```bash
   docker-compose logs backend
   docker-compose logs frontend
   docker-compose logs mysql
   ```

3. **Reconstruir container específico**:
   ```bash
   docker-compose build backend
   docker-compose build frontend
   ```

## Funcionalidades

- Listar todos os usuários
- Criar um novo usuário
- Editar um usuário existente
- Excluir um usuário

## Tecnologias Utilizadas

### Backend

- NestJS: Framework Node.js para criar aplicações server-side
- TypeORM: ORM para TypeScript e JavaScript
- GraphQL: Linguagem de consulta para APIs
- MySQL: Banco de dados relacional
- Class-validator: Validação baseada em decoradores

### Frontend

- Next.js: Framework React para aplicações web
- Apollo Client: Cliente GraphQL para React
- Tailwind CSS: Framework CSS utilitário
- React Hook Form: Biblioteca para formulários em React
- GraphQL Code Generator: Ferramenta para gerar tipos a partir do schema GraphQL

### Infraestrutura

- Docker: Plataforma para desenvolvimento, envio e execução de aplicações
- Docker Compose: Ferramenta para definir e executar aplicações Docker multi-container
