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

EXPOSE 3000

CMD ["npm", "run", "dev"] 