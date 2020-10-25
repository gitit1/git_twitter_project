FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install node-sass@latest

RUN npm rebuild node-sass

RUN npm install

COPY . .

RUN npm run build