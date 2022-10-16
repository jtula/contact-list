FROM node:16.18-alpine3.15 AS builder
WORKDIR /home/contacts-app
COPY ./dist/apps/contact-list .
COPY ["package*.json", "nx.json", "decorate-angular-cli.js", "./"]

RUN npm cache clean --force
RUN npm config set fetch-retry-maxtimeout 1200000

RUN npm install
RUN npm install reflect-metadata tslib rxjs hbs
RUN npm run build

FROM nginx:1.23.1-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/contact-list .
ENTRYPOINT ["nginx", "-g", "daemon off;"]