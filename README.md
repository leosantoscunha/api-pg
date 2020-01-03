# api-pg
# Descrição do Teste

## Features

- Upload CSV file to create clients in database
- Create new user and code by csv filename
- Get All clients by user code
- Update client
- Validate zipcode using lib cep-promise doing a VIACEP API and Correios API search
- Delete existing User by code
- When a user is deleted, all clients related to the user are also deleted.

## Structure

- All application related files are contained within the `src` folder.
- All test related files are contained within the `__test__` folder.
- The starting point of the application is the server.js as in the express default pattern, it's only responsability is start the app server.
- The application main file is contained in the app.js file, it's responsability is define the application flow, import routes, define global middlewares and initialize dependencies at application scope.
- The application uses queue to process and validate csv file data.
- The starting point of the queue is queue.js, as in the default expression, it is only responsibility to start the application process queue.
- Routes are contained in a separated file.
- Project style configuration files are present in the project's root folder.
- Application's configuration files, database related and external library files are contained in separated folders within the `src` folder also.
- Each layer of responsability of the application is represented by a folder within the `app` folder. Controllers, Schemas, Models, Middlewares, Jobs, Views, etc...

## API Docs
https://documenter.getpostman.com/view/3208859/SWLbAVhC

#

## Dependencies

- node version 12.7.0

- axios
- bee-queue
- cep-promise
- csv-parse
- dotenv
- express
- express-async-errors
- lodash
- multer
- pg
- redis
- sequelize
- sequelize-cli
- youch
- yup

## Install

Install project dependencies
`yarn install` or `npm install`

## Install Postgress
https://www.postgresqltutorial.com/postgresql-tutorial/install-postgresql/

## Install Redis
https://redislabs.com/get-started-with-redis/

## Run test
The tests use the SQLITE3
`yarn test`

## IMPORTANT! Before run project (*Don't need on test mode)

## Create database apipg
`CREATE DATABASE apipg;`

## Run migrations
`yarn sequelize db:migrate`

## Run 
## Start (Run in developmet mode)
Run main project
`yarn start`

Run queue project
`yarn queue`

#

## Install Docker

###### Linux
##### install Docker
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04


##### Instale o Docker Compose
https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04


###### Windows
##### Install tale Docker + Docker Compose
https://docs.docker.com/docker-for-windows/install/#about-windows-containers

#

## Build docker containers
run the command at the root of the project
`docker-compose up --build`

## Run docker postgres container migrations
`yarn sequelize db:migrate`

### Dev dependencies
- nodemon
- sucrase

### Dev dependencies for test mode
- sucrase/jest-plugin
- types/jest
- factory-girl
- faker
- jest
- sqlite3
- supertest

## Author
- Leonardo Cunha

