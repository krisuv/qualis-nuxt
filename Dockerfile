FROM node:20.19.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run generate

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", ".output/public", "-l", "3000"]
