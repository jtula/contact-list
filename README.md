# Contact List App

Link to Github: https://github.com/jtula/contact-list  

## Good to know
- Nx monorepo support
- Api build with NestJS + Mongo
- Angular used in v14
- Tailwindcss

## How to run the Project
Command:  
`docker-compose up`

With npm:

 `npm install`
 
 `npm run serve:all`

 - Frontend: http://localhost:4200
 - API: http://localhost:3333/api/contacts
 - MONGO_URI=mongodb://admin:admin@mongodb:27017/contactdb


## Tests and code coverage
 `npm run test`
 
 `ng test --no-watch --code-coverage`


## Exposed Ports
 - 4200  : Angular app
 - 3333  : Api
 - 27017 : Mongo


## Lighthouse
![alt text](https://github.com/jtula/contact-list/blob/main/lighthouse.jpg?raw=true)



