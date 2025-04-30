FROM node:18-alpine

WORKDIR /app

# Instalar netcat para o script de espera
RUN apk add --no-cache netcat-openbsd

# Copiar arquivos de configuração de dependências
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar dependências 
RUN npm install

# Copiar o código-fonte
COPY . .

# Tornar o script de espera executável e corrigir line endings
RUN chmod +x ./wait-for-db.sh && \
    sed -i 's/\r$//' ./wait-for-db.sh

# Gerar o build
RUN npm run build

# Expor a porta
EXPOSE 3000

# Esperar pelo MySQL estar pronto e depois iniciar a aplicação
CMD ["/bin/sh", "./wait-for-db.sh", "mysql", "npm", "run", "start:prod"] 