# CRUD de Usuários com NestJS, Next.js, GraphQL e MySQL

Sistema completo de CRUD de usuários com:

- **Backend**: NestJS, TypeORM, GraphQL e MySQL
- **Frontend**: Next.js, Apollo Client, Tailwind CSS
- **Infraestrutura**: Docker e Docker Compose

## Estrutura do Projeto

```
.
├── backend/                 # API NestJS com GraphQL
├── frontend/                # Aplicação Next.js
└── docker-compose.yml       # Configuração Docker
```

## Pré-requisitos

- Docker e Docker Compose instalados
- Node.js v16+ (para desenvolvimento local)

## Execução com Docker

1. Clone o repositório:

   ```
   git clone [URL_DO_REPOSITÓRIO]
   cd desafio-paymaker
   ```

2. Inicie os containers:

   ```
   docker-compose up -d
   ```

3. Acesse:
   - Frontend: http://localhost:4000
   - GraphQL Playground: http://localhost:3000/graphql

## Desenvolvimento Local

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Geração de Schema GraphQL

O frontend utiliza tipos TypeScript gerados a partir do schema GraphQL do backend.

### Geração Manual

```bash
cd frontend
npm run generate
```

Este comando:

1. Conecta-se ao backend GraphQL em http://localhost:3000/graphql
2. Obtém o schema atual
3. Gera tipos TypeScript e hooks React Apollo

## Comandos Úteis

### Backend

```bash
# Iniciar em desenvolvimento
npm run start:dev

# Construir para produção
npm run build

# Gerar schema manualmente
npm run generate-schema
```

### Frontend

```bash
# Iniciar em desenvolvimento (com geração de schema)
npm run dev

# Gerar schema GraphQL
npm run generate

# Build para produção
npm run build
```

## Solução de Problemas

### Schema GraphQL não atualizado

1. Verifique se o backend está rodando
2. Execute manualmente `cd frontend && npm run generate`
3. Verifique se há incompatibilidades entre as queries e o schema atual

### Problemas com Docker

```bash
# Limpar e reconstruir containers
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d

# Verificar logs
docker-compose logs backend
docker-compose logs frontend
```

## Funcionalidades

- Listar usuários
- Visualizar detalhes de um usuário
- Criar usuário
- Editar usuário
- Excluir usuário
