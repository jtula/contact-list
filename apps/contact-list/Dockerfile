# Stage 1: build
FROM node:16.18-alpine3.15 AS development

WORKDIR /home/contacts-app/frontend

COPY ["package*.json", "nx.json", "decorate-angular-cli.js", "./"]

RUN npm config set fetch-retry-maxtimeout 1200000
RUN npm install
RUN npm install reflect-metadata tslib rxjs hbs
RUN npm install -g @angular/cli@12.0.0

COPY . .

RUN npm run build:all

EXPOSE 4200