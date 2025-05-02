FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

RUN chmod +x ./src/scripts/wait-for-db.sh && \
    sed -i 's/\r$//' ./src/scripts/wait-for-db.sh

RUN npm run generate-schema

RUN npm run build

EXPOSE 3000

CMD ["/bin/sh", "./src/scripts/wait-for-db.sh", "mysql", "npm", "run", "start:prod"]