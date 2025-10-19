FROM node:20.19.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run generate

# Copy 200.html to index.html for proper SPA handling
RUN cp .output/public/200.html .output/public/index.html

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", ".output/public", "-l", "3000"]
