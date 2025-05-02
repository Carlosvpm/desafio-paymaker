FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache bash curl

COPY package*.json ./
COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

RUN npm install

COPY . .

RUN mkdir -p graphql/generated
RUN chmod +x scripts/start-docker.sh scripts/start-local.sh

EXPOSE 3000

# Usa o script que verifica o backend e gera o schema
CMD ["npm", "run", "dev:docker"] 