FROM node:16.18-alpine3.15 As development

ENV PORT=3333
ENV PORT_SSR=4000

EXPOSE ${PORT}

WORKDIR /usr/src/app

COPY ["package*.json", "nx.json", "./"]
# Sorry for increment retry-maxtimeout, ETECSA sucks!
RUN npm config set fetch-retry-maxtimeout 12000000
RUN npm install

COPY . .
RUN npm install -g @angular/cli 
RUN npm install -g @nrwl/cli@12.0.1

RUN nx build --prod
CMD nx serve api