FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

RUN chmod +x ./wait-for-db.sh && \
    sed -i 's/\r$//' ./wait-for-db.sh

RUN npm run build

EXPOSE 3000

CMD ["/bin/sh", "./wait-for-db.sh", "mysql", "npm", "run", "start:prod"]