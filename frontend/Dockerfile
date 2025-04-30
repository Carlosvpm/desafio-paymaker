FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Construir a aplicação Next.js
RUN npm run build

# Expor a porta
EXPOSE 3000

# Iniciar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "dev"] 